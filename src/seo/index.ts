// Core SEO system exports
export { MetadataFactory } from './core/metadata'
export { SchemaBuilder } from './core/schema'
export { InternalLinkingEngine } from './core/internal-linking'
export type { 
  Metadata, 
  ProgrammaticPage, 
  HubPage, 
  InternalLink, 
  BreadcrumbItem,
  OpenGraphImage,
  TwitterCard,
  ArticleMeta
} from './core/types'

// Page generation exports
export { ProgrammaticPageGenerator } from './data/page-generator'
export type { PageTemplate } from './data/page-generator'

// Sitemap generation exports
export { SitemapGenerator } from './sitemap/generator'
export type { SitemapEntry, SitemapIndex } from './sitemap/generator'

// Template exports
export { templates, getTemplate, getAllTemplates } from './templates'

// Component exports
export { SEOHead } from './components/SEOHead'
export { Breadcrumbs, BreadcrumbSchema } from './components/Breadcrumbs'

// Example data exports
export { 
  generateSamplePages, 
  samplePages, 
  sampleHubs,
  sampleHowToGuides,
  sampleComparisons,
  sampleResources,
  sampleLocations
} from './examples/sample-data'
