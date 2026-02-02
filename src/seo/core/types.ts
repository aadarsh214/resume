export interface OpenGraphImage {
  url: string
  width?: number
  height?: number
  alt?: string
  type?: string
}

export interface TwitterCard {
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  site?: string
  creator?: string
}

export interface ArticleMeta {
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface Metadata {
  title: string
  description: string
  url: string
  path: string
  canonical?: string
  type: 'website' | 'article' | 'product' | 'profile'
  keywords: string[]
  siteName: string
  locale: string
  noindex: boolean
  nofollow: boolean
  ogImage: OpenGraphImage
  twitter: TwitterCard
  article?: ArticleMeta
  breadcrumbs?: BreadcrumbItem[]
  lastModified?: Date
  priority: number
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

export interface ProgrammaticPage {
  id: string
  slug: string
  title: string
  description: string
  content: string
  intent: 'informational' | 'transactional' | 'navigational'
  primaryKeywords: string[]
  supportingKeywords: string[]
  category: string
  template: string
  parentHub?: string
  relatedPages: string[]
  schemaType: 'Article' | 'FAQPage' | 'Product' | 'WebPage' | 'HowTo' | 'CollectionPage'
  lastModified: Date
  faqs?: Array<{
    question: string
    answer: string
  }>
  metadata?: Partial<Metadata>
}

export interface HubPage {
  id: string
  slug: string
  title: string
  description: string
  category: string
  primaryKeywords: string[]
  spokes: string[]
  schemaType: 'WebPage' | 'CollectionPage'
  lastModified: Date
}

export interface InternalLink {
  from: string
  to: string
  anchorText: string
  type: 'navigation' | 'contextual' | 'breadcrumb' | 'related'
  weight: number
}
