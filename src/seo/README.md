# Programmatic SEO System

A production-grade programmatic SEO architecture designed to scale beyond 100k pages without destroying crawl budget, content quality, or build performance.

## Architecture Overview

The system is built on the principle of separating SEO concerns into layers:

- **Data Layer** - Decides what pages exist
- **SEO Core** - Decides how pages are described to search engines  
- **Templates** - Decide how pages look
- **Internal Linking** - Decides how pages relate to each other
- **Sitemap Strategy** - Manages URL discovery at scale

## Core Features

### 🎯 Dynamic Metadata Generation
- Consistent title patterns across all pages
- Safe keyword injection with validation
- Automatic Open Graph and Twitter cards
- Canonical URL enforcement
- Intent-based priority scoring

### 🏗️ Schema Markup System
- Composable schema builders per content type
- Automatic FAQ, Article, Breadcrumb, and WebPage schemas
- Tree-shakable JSON-LD generation
- Multi-schema composition support

### 🔗 Intelligent Internal Linking
- Hub-and-spoke architecture for topic clusters
- Automatic related page suggestions
- Contextual link injection
- PageRank-style authority calculation
- Breadcrumb generation

### 📄 Template-Driven Page Generation
- Pre-built templates for common page types
- Content validation and quality checks
- Minimum word count and FAQ requirements
- Required section enforcement
- Keyword overlap detection

### 🗺️ Scalable Sitemap Strategy
- Automatic sitemap index generation
- Category-based sitemap organization
- Pagination at 50k URLs per file
- Accurate last modified dates
- Dynamic robots.txt generation

## Quick Start

### 1. Register Templates

```typescript
import { ProgrammaticPageGenerator, templates } from '@/seo'

// Register built-in templates
Object.values(templates).forEach(template => {
  ProgrammaticPageGenerator.registerTemplate(template)
})
```

### 2. Generate Pages

```typescript
// Generate how-to guides
const tutorialPages = ProgrammaticPageGenerator.generatePages({
  template: 'how-to-guide',
  data: tutorialData,
  category: 'tutorials'
})

// Generate comparison pages
const comparisonPages = ProgrammaticPageGenerator.generatePages({
  template: 'comparison-page', 
  data: comparisonData,
  category: 'reviews'
})
```

### 3. Create Hub Pages

```typescript
const tutorialHub = ProgrammaticPageGenerator.generateHub({
  id: 'tutorial-hub',
  title: 'Programming Tutorials',
  description: 'Comprehensive tutorials for modern web development',
  category: 'tutorials',
  primaryKeywords: ['tutorials', 'programming', 'web development'],
  spokes: tutorialPages.map(page => page.id)
})
```

### 4. Generate SEO Metadata

```typescript
import { MetadataFactory, SchemaBuilder, InternalLinkingEngine } from '@/seo'

const page = tutorialPages[0]
const hub = tutorialHub

// Generate metadata
const metadata = MetadataFactory.forProgrammaticPage({
  title: page.title,
  description: page.description,
  path: `/${page.slug}`,
  keywords: [...page.primaryKeywords, ...page.supportingKeywords],
  category: page.category,
  intent: page.intent,
  template: page.template
})

// Generate schema
const breadcrumbs = InternalLinkingEngine.generateBreadcrumbs(page, hub)
const schema = SchemaBuilder.compose(page, breadcrumbs)
```

### 5. Use in React Components

```tsx
import { SEOHead, Breadcrumbs } from '@/seo'
import { MetadataFactory, SchemaBuilder, InternalLinkingEngine } from '@/seo'

function ProgrammaticPage({ page, hub }) {
  const metadata = ProgrammaticPageGenerator.generateMetadata(page)
  const breadcrumbs = InternalLinkingEngine.generateBreadcrumbs(page, hub)
  const schema = ProgrammaticPageGenerator.generateSchema(page, hub)

  return (
    <>
      <SEOHead metadata={metadata} schemaData={schema} />
      <Breadcrumbs items={breadcrumbs} />
      <main>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </main>
    </>
  )
}
```

## Available Templates

### How-To Guide
- **Intent**: Informational
- **Schema**: HowTo
- **Min Content**: 800 words, 3 FAQs
- **Sections**: Introduction, Steps, Conclusion

### Comparison Page  
- **Intent**: Transactional
- **Schema**: Article
- **Min Content**: 1200 words, 4 FAQs
- **Sections**: Introduction, Comparison, Recommendation

### Resource Hub
- **Intent**: Navigational
- **Schema**: WebPage
- **Min Content**: 600 words, 2 FAQs
- **Sections**: Introduction, Resources, Categories

### Location Page
- **Intent**: Transactional
- **Schema**: WebPage
- **Min Content**: 700 words, 3 FAQs
- **Sections**: Introduction, Services, Contact

## Content Quality Safeguards

The system includes built-in validation to prevent thin content:

- **Word count validation** - Ensures minimum content depth
- **FAQ count thresholds** - Guarantees Q&A content
- **Required section checks** - Enforces content structure
- **Keyword overlap detection** - Prevents cannibalization
- **Content hashing** - Detects near-duplicates

## Internal Linking Strategy

### Hub-and-Spoke Model
- Hubs target broad, high-level queries
- Spokes target long-tail variations
- Spokes link up to hubs
- Hubs distribute authority back down

### Link Types
- **Navigation** - Hub to spoke (high weight)
- **Breadcrumb** - Spoke to hub (medium weight)
- **Related** - Cross-spoke within hub (low weight)
- **Contextual** - Content-based linking (dynamic weight)

## Sitemap Generation

```typescript
import { SitemapGenerator } from '@/seo'

const sitemaps = SitemapGenerator.generateDynamicSitemap(
  pages,
  hubs,
  staticPages
)

// Generate sitemap index
const sitemapIndex = SitemapGenerator.generateSitemapIndex(sitemaps)

// Generate robots.txt
const robotsTxt = SitemapGenerator.generateRobotsTxt(sitemaps)
```

## Performance Considerations

### Build Optimization
- Template-based content generation
- Incremental sitemap updates
- Lazy schema composition
- Efficient link graph algorithms

### Runtime Performance
- Minimal bundle impact
- Tree-shakeable exports
- Cached metadata generation
- Optimized internal linking calculations

## Scaling to 100k+ Pages

The architecture is designed for massive scale:

1. **Modular Design** - Each concern is isolated
2. **Validation Layer** - Prevents content quality issues
3. **Efficient Algorithms** - Optimized for large datasets
4. **Incremental Updates** - Only regenerate what changes
5. **Sitemap Pagination** - Handles unlimited URLs
6. **Memory Efficient** - Streaming where possible

## Best Practices

### Content Strategy
- Focus on user intent first
- Ensure each page provides unique value
- Use the hub-and-spoke model for topic clusters
- Maintain consistent quality standards

### Technical Implementation
- Use the provided templates as starting points
- Customize content patterns for your domain
- Implement proper error handling
- Monitor page performance metrics

### SEO Optimization
- Leverage automatic schema generation
- Use internal linking to distribute authority
- Monitor crawl budget usage
- Track keyword rankings and cannibalization

## Example Implementation

See `src/seo/examples/sample-data.ts` for a complete example showing:

- Template registration
- Page generation
- Hub creation
- Internal linking setup
- Metadata and schema generation

## Contributing

When adding new templates or features:

1. Follow the existing patterns
2. Include proper TypeScript types
3. Add content validation rules
4. Update documentation
5. Test with sample data

## License

This SEO system is designed to help you scale your content strategy responsibly. Focus on providing value to users first, and search engine rankings will follow.
