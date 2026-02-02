import type { ProgrammaticPage, HubPage } from '../core/types'
import { MetadataFactory } from '../core/metadata'
import { SchemaBuilder } from '../core/schema'
import { InternalLinkingEngine } from '../core/internal-linking'

export interface PageTemplate {
  id: string
  name: string
  intent: 'informational' | 'transactional' | 'navigational'
  schemaType: 'Article' | 'FAQPage' | 'Product' | 'WebPage' | 'HowTo'
  minWordCount: number
  minFaqCount: number
  requiredSections: string[]
  contentPattern: (data: any) => string
  metadataPattern: (data: any) => any
}

export class ProgrammaticPageGenerator {
  private static templates = new Map<string, PageTemplate>()
  private static pages: ProgrammaticPage[] = []
  private static hubs: HubPage[] = []

  static registerTemplate(template: PageTemplate): void {
    this.templates.set(template.id, template)
  }

  static generatePages(config: {
    template: string
    data: any[]
    category: string
    parentHub?: string
  }): ProgrammaticPage[] {
    const template = this.templates.get(config.template)
    if (!template) {
      throw new Error(`Template ${config.template} not found`)
    }

    const pages = config.data.map((item, index) => {
      const slug = this.generateSlug(item.title || item.name || `page-${index}`)
      
      const page: ProgrammaticPage = {
        id: `${config.category}-${slug}`,
        slug,
        title: item.title || item.name,
        description: item.description || this.generateDescription(item),
        content: template.contentPattern(item),
        intent: template.intent,
        primaryKeywords: item.primaryKeywords || this.extractKeywords(item.title || item.name),
        supportingKeywords: item.supportingKeywords || [],
        category: config.category,
        template: config.template,
        parentHub: config.parentHub,
        relatedPages: [],
        schemaType: template.schemaType,
        lastModified: new Date(),
        faqs: item.faqs || this.generateFaqs(item, template.minFaqCount),
        metadata: template.metadataPattern(item)
      }

      // Validate page quality
      this.validatePage(page, template)
      
      return page
    })

    this.pages.push(...pages)
    return pages
  }

  static generateHub(config: {
    id: string
    title: string
    description: string
    category: string
    primaryKeywords: string[]
    spokes: string[]
  }): HubPage {
    const hub: HubPage = {
      id: config.id,
      slug: this.generateSlug(config.title),
      title: config.title,
      description: config.description,
      category: config.category,
      primaryKeywords: config.primaryKeywords,
      spokes: config.spokes,
      schemaType: 'CollectionPage',
      lastModified: new Date()
    }

    this.hubs.push(hub)
    return hub
  }

  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  private static generateDescription(item: any): string {
    const fields = ['description', 'summary', 'overview', 'intro']
    for (const field of fields) {
      if (item[field]) {
        return item[field].substring(0, 160)
      }
    }
    return `Learn about ${item.title || item.name} and related topics.`
  }

  private static extractKeywords(title: string): string[] {
    const words = title.toLowerCase().split(/\s+/)
    const keywords: string[] = []
    
    // Extract meaningful keywords (filter out stop words)
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
    
    words.forEach(word => {
      if (word.length > 2 && !stopWords.includes(word)) {
        keywords.push(word)
      }
    })

    return keywords
  }

  private static generateFaqs(item: any, minCount: number): Array<{ question: string; answer: string }> {
    const faqs: Array<{ question: string; answer: string }> = []
    
    if (item.faqs) {
      return item.faqs
    }

    // Generate generic FAQs based on the item
    const title = item.title || item.name
    const description = item.description || ''

    if (minCount > 0) {
      faqs.push({
        question: `What is ${title}?`,
        answer: description || `${title} is a comprehensive solution designed to meet specific needs.`
      })
    }

    if (minCount > 1) {
      faqs.push({
        question: `How does ${title} work?`,
        answer: `${title} operates through a streamlined process that ensures optimal performance and user experience.`
      })
    }

    if (minCount > 2) {
      faqs.push({
        question: `What are the benefits of ${title}?`,
        answer: `${title} offers numerous advantages including improved efficiency, cost-effectiveness, and enhanced user satisfaction.`
      })
    }

    return faqs
  }

  private static validatePage(page: ProgrammaticPage, template: PageTemplate): void {
    const errors: string[] = []

    // Word count validation
    const wordCount = page.content.split(/\s+/).length
    if (wordCount < template.minWordCount) {
      errors.push(`Content too short: ${wordCount} words (minimum ${template.minWordCount})`)
    }

    // FAQ count validation
    const faqCount = page.faqs?.length || 0
    if (faqCount < template.minFaqCount) {
      errors.push(`Too few FAQs: ${faqCount} (minimum ${template.minFaqCount})`)
    }

    // Required sections validation
    template.requiredSections.forEach(section => {
      if (!page.content.toLowerCase().includes(section.toLowerCase())) {
        errors.push(`Missing required section: ${section}`)
      }
    })

    // Keyword overlap detection
    const allKeywords = [...page.primaryKeywords, ...page.supportingKeywords]
    if (allKeywords.length < 2) {
      errors.push('Insufficient keywords: need at least 2 primary or supporting keywords')
    }

    if (errors.length > 0) {
      throw new Error(`Page validation failed for ${page.title}: ${errors.join(', ')}`)
    }
  }

  static getPages(): ProgrammaticPage[] {
    return [...this.pages]
  }

  static getHubs(): HubPage[] {
    return [...this.hubs]
  }

  static getPagesByCategory(category: string): ProgrammaticPage[] {
    return this.pages.filter(page => page.category === category)
  }

  static getPagesByTemplate(template: string): ProgrammaticPage[] {
    return this.pages.filter(page => page.template === template)
  }

  static getPageBySlug(slug: string): ProgrammaticPage | undefined {
    return this.pages.find(page => page.slug === slug)
  }

  static getHubBySlug(slug: string): HubPage | undefined {
    return this.hubs.find(hub => hub.slug === slug)
  }

  static generateMetadata(page: ProgrammaticPage) {
    const baseMetadata = MetadataFactory.forProgrammaticPage({
      title: page.title,
      description: page.description,
      path: `/${page.slug}`,
      keywords: [...page.primaryKeywords, ...page.supportingKeywords],
      category: page.category,
      intent: page.intent,
      template: page.template,
      lastModified: page.lastModified
    })

    // Merge with page-specific metadata
    return {
      ...baseMetadata,
      ...page.metadata
    }
  }

  static generateSchema(page: ProgrammaticPage, hub?: HubPage) {
    const breadcrumbs = hub ? InternalLinkingEngine.generateBreadcrumbs(page, hub) : undefined
    return SchemaBuilder.compose(page, breadcrumbs)
  }

  static buildInternalLinkGraph(): Map<string, any[]> {
    return InternalLinkingEngine.buildLinkGraph(this.pages, this.hubs)
  }

  static getRelatedPages(page: ProgrammaticPage, limit: number = 5): ProgrammaticPage[] {
    return InternalLinkingEngine.generateRelatedPages(page, this.pages, limit)
  }

  static calculatePageAuthority(page: ProgrammaticPage): number {
    const linkGraph = this.buildInternalLinkGraph()
    return InternalLinkingEngine.calculatePageAuthority(page, linkGraph)
  }

  static reset(): void {
    this.pages = []
    this.hubs = []
    this.templates.clear()
  }
}
