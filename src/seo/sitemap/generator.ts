import type { ProgrammaticPage, HubPage } from '../core/types'

export interface SitemapEntry {
  url: string
  lastmod?: string
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export interface SitemapIndex {
  sitemaps: Array<{
    loc: string
    lastmod?: string
  }>
}

export class SitemapGenerator {
  private static baseUrl = 'https://aadarsh.pro'
  private static maxUrlsPerSitemap = 50000

  static generateSitemapIndex(sitemaps: string[]): string {
    const index: SitemapIndex = {
      sitemaps: sitemaps.map(loc => ({
        loc: `${this.baseUrl}/${loc}`,
        lastmod: new Date().toISOString()
      }))
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${index.sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ''}
  </sitemap>`).join('\n')}
</sitemapindex>`
  }

  static generateCategorySitemap(
    category: string,
    pages: ProgrammaticPage[],
    hubs?: HubPage[]
  ): string {
    const entries: SitemapEntry[] = []

    // Add hub pages first (higher priority)
    if (hubs) {
      hubs
        .filter(hub => hub.category === category)
        .forEach(hub => {
          entries.push({
            url: `${this.baseUrl}/${hub.slug}`,
            lastmod: hub.lastModified.toISOString(),
            changefreq: 'weekly',
            priority: 0.8
          })
        })
    }

    // Add programmatic pages
    pages
      .filter(page => page.category === category)
      .forEach(page => {
        entries.push({
          url: `${this.baseUrl}/${page.slug}`,
          lastmod: page.lastModified.toISOString(),
          changefreq: page.intent === 'navigational' ? 'monthly' : 'weekly',
          priority: page.intent === 'navigational' ? 0.7 : page.intent === 'transactional' ? 0.6 : 0.5
        })
      })

    return this.generateSitemapXML(entries)
  }

  static generateMainSitemap(
    staticPages: Array<{ path: string; lastmod?: Date; priority?: number }>,
    categories: string[]
  ): string {
    const entries: SitemapEntry[] = []

    // Add static pages
    staticPages.forEach(page => {
      entries.push({
        url: `${this.baseUrl}${page.path}`,
        lastmod: page.lastmod?.toISOString(),
        changefreq: 'weekly',
        priority: page.priority || 0.5
      })
    })

    // Add category sitemaps as references (for large sites)
    if (categories.length > 0) {
      categories.forEach(category => {
        entries.push({
          url: `${this.baseUrl}/sitemaps/${category}.xml`,
          changefreq: 'daily',
          priority: 0.9
        })
      })
    }

    return this.generateSitemapXML(entries)
  }

  static generatePaginatedSitemap(
    pages: ProgrammaticPage[],
    _sitemapName: string,
    page: number = 1
  ): { sitemap: string; hasMore: boolean } {
    const startIndex = (page - 1) * this.maxUrlsPerSitemap
    const endIndex = startIndex + this.maxUrlsPerSitemap
    const pageEntries = pages.slice(startIndex, endIndex)

    const entries: SitemapEntry[] = pageEntries.map(page => ({
      url: `${this.baseUrl}/${page.slug}`,
      lastmod: page.lastModified.toISOString(),
      changefreq: page.intent === 'navigational' ? 'monthly' : 'weekly',
      priority: page.intent === 'navigational' ? 0.7 : page.intent === 'transactional' ? 0.6 : 0.5
    }))

    const sitemap = this.generateSitemapXML(entries)
    const hasMore = endIndex < pages.length

    return { sitemap, hasMore }
  }

  static generateDynamicSitemap(
    pages: ProgrammaticPage[],
    hubs: HubPage[],
    staticPages: Array<{ path: string; lastmod?: Date; priority?: number }> = []
  ): string[] {
    const sitemaps: string[] = []
    const categories = [...new Set(pages.map(page => page.category))]

    // Generate main sitemap
    sitemaps.push(this.generateMainSitemap(staticPages, categories))

    // Generate category-specific sitemaps
    categories.forEach(category => {
      const categoryPages = pages.filter(page => page.category === category)
      const categoryHubs = hubs.filter(hub => hub.category === category)
      
      if (categoryPages.length + categoryHubs.length <= this.maxUrlsPerSitemap) {
        sitemaps.push(`sitemaps/${category}.xml`)
      } else {
        // Large category needs pagination
        const totalPages = Math.ceil(categoryPages.length / this.maxUrlsPerSitemap)
        for (let i = 1; i <= totalPages; i++) {
          sitemaps.push(`sitemaps/${category}-page-${i}.xml`)
        }
      }
    })

    return sitemaps
  }

  private static generateSitemapXML(entries: SitemapEntry[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`
  }

  static generateRobotsTxt(sitemaps: string[]): string {
    return `User-agent: *
Allow: /

# Content signals for search engines and AI systems
# search    : building a search index and returning links/snippets
# ai-input  : using content as input for real-time answers (AEO)
# ai-train  : using content to train or fine-tune models
Content-signal: search=yes,ai-input=yes,ai-train=no

# Explicitly allow common AI answer bots to crawl for retrieval
User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

${sitemaps.map(sitemap => `Sitemap: ${this.baseUrl}/${sitemap}`).join('\n')}
`
  }

  static calculateSitemapStats(pages: ProgrammaticPage[], hubs: HubPage[]): {
    totalPages: number
    totalHubs: number
    totalCategories: number
    estimatedSitemaps: number
    largestCategory: string
    averagePagesPerCategory: number
  } {
    const categories = [...new Set(pages.map(page => page.category))]
    const categoryCounts = categories.map(category => ({
      category,
      count: pages.filter(page => page.category === category).length
    }))

    const largestCategory = categoryCounts.reduce((max, current) => 
      current.count > max.count ? current : max
    )

    const totalUrls = pages.length + hubs.length
    const estimatedSitemaps = Math.ceil(totalUrls / this.maxUrlsPerSitemap)

    return {
      totalPages: pages.length,
      totalHubs: hubs.length,
      totalCategories: categories.length,
      estimatedSitemaps,
      largestCategory: largestCategory.category,
      averagePagesPerCategory: Math.round(pages.length / categories.length)
    }
  }
}
