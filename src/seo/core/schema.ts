import type { ProgrammaticPage, HubPage, BreadcrumbItem } from './types'

export class SchemaBuilder {
  private static baseUrl = 'https://aadarsh.pro'

  static organization() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${this.baseUrl}/#org`,
      name: 'Aadarsh Gupta',
      url: this.baseUrl,
      logo: `${this.baseUrl}/brand-icon.svg`,
      sameAs: [
        'https://github.com/aadarsh214',
        'https://www.linkedin.com/in/aadarsh-gupta-b6735520a/'
      ]
    }
  }

  static person() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${this.baseUrl}/#person`,
      name: 'Aadarsh Gupta',
      url: this.baseUrl,
      jobTitle: 'Software Engineer and AI Builder',
      affiliation: { '@id': `${this.baseUrl}/#org` },
      sameAs: [
        'https://github.com/aadarsh214',
        'https://www.linkedin.com/in/aadarsh-gupta-b6735520a/'
      ],
      knowsAbout: [
        'Full-stack web development',
        'AI automation',
        'Prompt engineering',
        'Developer tools',
        'SaaS products'
      ]
    }
  }

  static website() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.baseUrl}/#website`,
      url: this.baseUrl,
      name: 'Aadarsh.pro – Portfolio of Aadarsh Gupta',
      publisher: { '@id': `${this.baseUrl}/#org` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.baseUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  }

  static article(page: ProgrammaticPage) {
    const base = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${this.baseUrl}/${page.slug}#article`,
      headline: page.title,
      description: page.description,
      url: `${this.baseUrl}/${page.slug}`,
      dateModified: page.lastModified.toISOString(),
      datePublished: page.lastModified.toISOString(),
      author: { '@id': `${this.baseUrl}/#person` },
      publisher: { '@id': `${this.baseUrl}/#org` },
      mainEntityOfPage: { '@id': `${this.baseUrl}/${page.slug}` }
    }

    if (page.faqs && page.faqs.length > 0) {
      return {
        ...base,
        mainEntity: page.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    }

    return base
  }

  static faqPage(page: ProgrammaticPage) {
    if (!page.faqs || page.faqs.length === 0) {
      return this.webPage(page)
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${this.baseUrl}/${page.slug}#faq`,
      url: `${this.baseUrl}/${page.slug}`,
      name: page.title,
      description: page.description,
      mainEntity: page.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  }

  static webPage(page: ProgrammaticPage) {
    return {
      '@context': 'https://schema.org',
      '@type': page.schemaType,
      '@id': `${this.baseUrl}/${page.slug}#webpage`,
      url: `${this.baseUrl}/${page.slug}`,
      name: page.title,
      description: page.description,
      dateModified: page.lastModified.toISOString(),
      isPartOf: { '@id': `${this.baseUrl}/#website` },
      about: page.primaryKeywords.map(keyword => ({
        '@type': 'Thing',
        name: keyword
      }))
    }
  }

  static breadcrumbList(breadcrumbs: BreadcrumbItem[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }
  }

  static hubPage(hub: HubPage, spokes: ProgrammaticPage[]) {
    return {
      '@context': 'https://schema.org',
      '@type': hub.schemaType,
      '@id': `${this.baseUrl}/${hub.slug}#hub`,
      url: `${this.baseUrl}/${hub.slug}`,
      name: hub.title,
      description: hub.description,
      dateModified: hub.lastModified.toISOString(),
      isPartOf: { '@id': `${this.baseUrl}/#website` },
      mainEntity: spokes.map(spoke => ({
        '@type': 'WebPage',
        name: spoke.title,
        url: `${this.baseUrl}/${spoke.slug}`,
        description: spoke.description
      })),
      about: hub.primaryKeywords.map(keyword => ({
        '@type': 'Thing',
        name: keyword
      }))
    }
  }

  static compose(page: ProgrammaticPage | HubPage, breadcrumbs?: BreadcrumbItem[]): any[] {
    const schemas: any[] = [this.organization(), this.person(), this.website()]

    if ('template' in page) {
      // ProgrammaticPage
      switch (page.schemaType) {
        case 'Article':
          schemas.push(this.article(page))
          break
        case 'FAQPage':
          schemas.push(this.faqPage(page))
          break
        default:
          schemas.push(this.webPage(page))
          break
      }
    } else {
      // HubPage - need spokes data
      schemas.push(this.hubPage(page, []))
    }

    if (breadcrumbs) {
      schemas.push(this.breadcrumbList(breadcrumbs))
    }

    return schemas
  }
}
