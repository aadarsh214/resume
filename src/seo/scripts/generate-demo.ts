import { 
  ProgrammaticPageGenerator, 
  SitemapGenerator,
  InternalLinkingEngine,
  templates,
  generateSamplePages
} from '../index'
// Remove React-specific imports for Node.js script
import fs from 'fs'
import path from 'path'

// Initialize the system
console.log('🚀 Initializing Programmatic SEO System...')

// Register templates
Object.values(templates).forEach(template => {
  ProgrammaticPageGenerator.registerTemplate(template)
})

// Generate sample pages
console.log('📄 Generating sample pages...')
const { pages, hubs } = generateSamplePages()

console.log(`✅ Generated ${pages.length} pages and ${hubs.length} hubs`)

// Generate internal linking graph
console.log('🔗 Building internal linking graph...')
const linkGraph = InternalLinkingEngine.buildLinkGraph(pages, hubs)
console.log(`✅ Built linking graph with ${linkGraph.size} nodes`)

// Generate sitemaps
console.log('🗺️ Generating sitemaps...')
const staticPages = [
  { path: '/', priority: 1.0 },
  { path: '/resume', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/work', priority: 0.8 }
]

const sitemaps = SitemapGenerator.generateDynamicSitemap(pages, hubs, staticPages)
console.log(`✅ Generated ${sitemaps.length} sitemaps`)

// Create output directory
const outputDir = path.join(process.cwd(), 'dist', 'seo')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Save sitemap index
const sitemapIndex = SitemapGenerator.generateSitemapIndex(sitemaps)
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapIndex)
console.log('💾 Saved sitemap index')

// Save individual sitemaps
sitemaps.forEach(sitemapPath => {
  const [category] = sitemapPath.split('/').slice(-1)
  if (category !== 'sitemap.xml') {
    const categoryPages = pages.filter(p => p.category === category.replace('.xml', ''))
    const categoryHubs = hubs.filter(h => h.category === category.replace('.xml', ''))
    const sitemapContent = SitemapGenerator.generateCategorySitemap(category.replace('.xml', ''), categoryPages, categoryHubs)
    fs.writeFileSync(path.join(outputDir, sitemapPath), sitemapContent)
  }
})

// Save robots.txt
const robotsTxt = SitemapGenerator.generateRobotsTxt(sitemaps)
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt)
console.log('💾 Saved robots.txt')

// Generate sample metadata and schema for demonstration
console.log('📊 Generating sample SEO data...')
const samplePage = pages[0]
const sampleHub = hubs[0]

const metadata = ProgrammaticPageGenerator.generateMetadata(samplePage)
const breadcrumbs = InternalLinkingEngine.generateBreadcrumbs(samplePage, sampleHub)
const schema = ProgrammaticPageGenerator.generateSchema(samplePage, sampleHub)

// Save sample SEO data
fs.writeFileSync(
  path.join(outputDir, 'sample-metadata.json'),
  JSON.stringify(metadata, null, 2)
)

fs.writeFileSync(
  path.join(outputDir, 'sample-schema.json'),
  JSON.stringify(schema, null, 2)
)

fs.writeFileSync(
  path.join(outputDir, 'sample-breadcrumbs.json'),
  JSON.stringify(breadcrumbs, null, 2)
)

// Calculate statistics
const stats = SitemapGenerator.calculateSitemapStats(pages, hubs)
console.log('\n📈 SEO System Statistics:')
console.log(`   Total Pages: ${stats.totalPages}`)
console.log(`   Total Hubs: ${stats.totalHubs}`)
console.log(`   Categories: ${stats.totalCategories}`)
console.log(`   Estimated Sitemaps: ${stats.estimatedSitemaps}`)
console.log(`   Largest Category: ${stats.largestCategory} (${pages.filter(p => p.category === stats.largestCategory).length} pages)`)
console.log(`   Average Pages/Category: ${stats.averagePagesPerCategory}`)

// Show sample page data
console.log('\n📄 Sample Page:')
console.log(`   Title: ${samplePage.title}`)
console.log(`   Slug: ${samplePage.slug}`)
console.log(`   Category: ${samplePage.category}`)
console.log(`   Intent: ${samplePage.intent}`)
console.log(`   Word Count: ${samplePage.content.split(/\s+/).length}`)
console.log(`   FAQ Count: ${samplePage.faqs?.length || 0}`)
console.log(`   Primary Keywords: ${samplePage.primaryKeywords.join(', ')}`)

console.log('\n🎉 SEO System Demo Complete!')
console.log(`📁 Check ${outputDir} for generated files:`)
console.log('   - sitemap.xml (main sitemap index)')
console.log('   - robots.txt')
console.log('   - sample-metadata.json')
console.log('   - sample-schema.json')
console.log('   - sample-breadcrumbs.json')
console.log('   - Category-specific sitemaps')
