import type { ProgrammaticPage, HubPage } from '../core/types'

export class PerformanceOptimizer {
  private static cache = new Map<string, any>()
  private static cacheExpiry = new Map<string, number>()
  private static readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  // Memoized metadata generation
  static generateMetadataCached(page: ProgrammaticPage) {
    const cacheKey = `metadata-${page.id}`
    const cached = this.getFromCache(cacheKey)
    
    if (cached) {
      return cached
    }

    // Import dynamically to avoid circular dependencies
    const { ProgrammaticPageGenerator } = eval('require')('../data/page-generator')
    const metadata = ProgrammaticPageGenerator.generateMetadata(page)
    
    this.setCache(cacheKey, metadata)
    return metadata
  }

  // Memoized schema generation
  static generateSchemaCached(page: ProgrammaticPage, hub?: HubPage) {
    const cacheKey = `schema-${page.id}-${hub?.id || 'no-hub'}`
    const cached = this.getFromCache(cacheKey)
    
    if (cached) {
      return cached
    }

    const { SchemaBuilder, InternalLinkingEngine } = eval('require')('../core')
    const breadcrumbs = hub ? InternalLinkingEngine.generateBreadcrumbs(page, hub) : undefined
    const schema = SchemaBuilder.compose(page, breadcrumbs)
    
    this.setCache(cacheKey, schema)
    return schema
  }

  // Batch processing for large page sets
  static async processPagesBatch<T>(
    pages: ProgrammaticPage[],
    processor: (page: ProgrammaticPage) => T,
    batchSize: number = 100,
    delay: number = 10
  ): Promise<T[]> {
    const results: T[] = []
    
    for (let i = 0; i < pages.length; i += batchSize) {
      const batch = pages.slice(i, i + batchSize)
      
      // Process batch in parallel
      const batchResults = await Promise.all(
        batch.map(page => Promise.resolve(processor(page)))
      )
      
      results.push(...batchResults)
      
      // Small delay to prevent blocking main thread
      if (i + batchSize < pages.length) {
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    
    return results
  }

  // Lazy loading for expensive operations
  static createLazyLoader<T>(factory: () => Promise<T>): () => Promise<T> {
    let instance: T | null = null
    let loading: Promise<T> | null = null

    return async () => {
      if (instance) {
        return instance
      }

      if (loading) {
        return loading
      }

      loading = factory()
      instance = await loading
      loading = null
      
      return instance
    }
  }

  // Content compression for storage
  static compressContent(content: string): string {
    // Simple compression - remove extra whitespace and normalize
    return content
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim()
  }

  // Progressive enhancement for SEO data
  static getProgressiveSEOData(page: ProgrammaticPage) {
    return {
      // Critical data (above the fold)
      critical: {
        title: page.title,
        description: page.description,
        url: `/${page.slug}`,
        breadcrumbs: this.getBreadcrumbsSimple(page)
      },
      
      // Important data (first paint)
      important: {
        primaryKeywords: page.primaryKeywords,
        intent: page.intent,
        category: page.category
      },
      
      // Nice to have (after load)
      secondary: {
        supportingKeywords: page.supportingKeywords,
        relatedPages: page.relatedPages.slice(0, 3),
        faqs: page.faqs?.slice(0, 2)
      }
    }
  }

  private static getBreadcrumbsSimple(page: ProgrammaticPage) {
    return [
      { name: 'Home', url: '/' },
      { name: page.category, url: `/${page.category}` },
      { name: page.title, url: `/${page.slug}` }
    ]
  }

  // Cache management
  private static getFromCache(key: string): any | null {
    const expiry = this.cacheExpiry.get(key)
    if (!expiry || Date.now() > expiry) {
      this.cache.delete(key)
      this.cacheExpiry.delete(key)
      return null
    }
    return this.cache.get(key) || null
  }

  private static setCache(key: string, value: any): void {
    this.cache.set(key, value)
    this.cacheExpiry.set(key, Date.now() + this.CACHE_TTL)
  }

  static clearCache(): void {
    this.cache.clear()
    this.cacheExpiry.clear()
  }

  // Performance monitoring
  static measurePerformance<T>(
    operation: string,
    fn: () => T
  ): { result: T; duration: number } {
    const start = performance.now()
    const result = fn()
    const duration = performance.now() - start
    
    // Log slow operations
    if (duration > 100) {
      console.warn(`Slow SEO operation: ${operation} took ${duration.toFixed(2)}ms`)
    }
    
    return { result, duration }
  }

  // Bundle size optimization
  static getOptimizedExports() {
    return {
      // Core functionality (tree-shakable)
      core: {
        MetadataFactory: async () => (await import('../core/metadata')).MetadataFactory,
        SchemaBuilder: async () => (await import('../core/schema')).SchemaBuilder,
        InternalLinkingEngine: async () => (await import('../core/internal-linking')).InternalLinkingEngine
      },
      
      // Optional functionality (lazy loaded)
      optional: {
        PageGenerator: this.createLazyLoader(() => import('../data/page-generator')),
        SitemapGenerator: this.createLazyLoader(() => import('../sitemap/generator')),
        Templates: this.createLazyLoader(() => import('../templates'))
      }
    }
  }

  // Memory usage optimization
  static optimizeMemoryUsage(pages: ProgrammaticPage[]): ProgrammaticPage[] {
    return pages.map(page => ({
      ...page,
      // Limit array sizes to prevent memory bloat
      supportingKeywords: page.supportingKeywords.slice(0, 20),
      relatedPages: page.relatedPages.slice(0, 10),
      faqs: page.faqs?.slice(0, 10),
      
      // Compress content if too large
      content: page.content.length > 10000 
        ? this.compressContent(page.content) 
        : page.content
    }))
  }

  // Streaming sitemap generation for very large sites
  static async* generateSitemapStream(
    pages: ProgrammaticPage[],
    batchSize: number = 1000
  ): AsyncGenerator<string, void, unknown> {
    // XML header
    yield '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for (let i = 0; i < pages.length; i += batchSize) {
      const batch = pages.slice(i, i + batchSize)
      const batchEntries = batch.map(page => ({
        url: `https://aadarsh.pro/${page.slug}`,
        lastmod: page.lastModified.toISOString(),
        changefreq: page.intent === 'navigational' ? 'monthly' : 'weekly',
        priority: page.intent === 'navigational' ? 0.7 : page.intent === 'transactional' ? 0.6 : 0.5
      }))
      
      for (const entry of batchEntries) {
        yield `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>\n`
      }
    }
    
    // XML footer
    yield '</urlset>\n'
  }
}
