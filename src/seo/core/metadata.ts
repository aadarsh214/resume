import type { Metadata } from './types'

export class MetadataFactory {
  private static baseUrl = 'https://aadarsh.pro'
  private static siteName = 'Aadarsh Gupta'
  private static defaultDescription = 'Full-stack software engineer and AI builder. View resume, projects, skills and ways to work together.'

  static create(pageConfig: Partial<Metadata>): Metadata {
    const {
      title,
      description,
      path = '/',
      type = 'website',
      keywords = [],
      canonical,
      noindex = false,
      nofollow = false,
      ogImage,
      article,
      breadcrumbs,
      lastModified,
      priority = 0.5,
      changeFreq = 'weekly'
    } = pageConfig

    const fullTitle = title ? `${title} – ${this.siteName}` : this.siteName
    const fullDescription = description || this.defaultDescription
    const canonicalUrl = canonical || `${this.baseUrl}${path}`

    return {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      path,
      canonical: canonicalUrl,
      type,
      keywords: [...keywords, 'software engineer', 'full stack developer', 'AI builder'],
      siteName: this.siteName,
      locale: 'en_US',
      noindex,
      nofollow,
      ogImage: ogImage || {
        url: `${this.baseUrl}/brand-icon.svg`,
        width: 1200,
        height: 630,
        alt: fullTitle
      },
      twitter: {
        card: 'summary_large_image',
        site: '@aadarsh214',
        creator: '@aadarsh214'
      },
      article,
      breadcrumbs,
      lastModified,
      priority,
      changeFreq
    }
  }

  static forProgrammaticPage(config: {
    title: string
    description: string
    path: string
    keywords?: string[]
    category?: string
    intent?: 'informational' | 'transactional' | 'navigational'
    template?: string
    lastModified?: Date
  }): Metadata {
    const { title, description, path, keywords = [], category, intent, template, lastModified } = config

    return this.create({
      title,
      description,
      path,
      keywords: [
        ...keywords,
        ...(category ? [category] : []),
        ...(intent ? [intent] : []),
        ...(template ? [template] : [])
      ],
      type: 'website',
      lastModified,
      priority: intent === 'navigational' ? 0.8 : intent === 'transactional' ? 0.7 : 0.6,
      changeFreq: intent === 'navigational' ? 'monthly' : 'weekly'
    })
  }
}
