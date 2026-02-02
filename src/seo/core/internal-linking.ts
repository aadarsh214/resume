import type { ProgrammaticPage, HubPage, InternalLink, BreadcrumbItem } from './types'

export class InternalLinkingEngine {
  private static baseUrl = 'https://aadarsh.pro'

  static generateBreadcrumbs(page: ProgrammaticPage, hub?: HubPage): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', url: this.baseUrl }
    ]

    if (hub) {
      breadcrumbs.push({
        name: hub.title,
        url: `${this.baseUrl}/${hub.slug}`
      })
    }

    breadcrumbs.push({
      name: page.title,
      url: `${this.baseUrl}/${page.slug}`
    })

    return breadcrumbs
  }

  static generateRelatedPages(
    currentPage: ProgrammaticPage,
    allPages: ProgrammaticPage[],
    maxLinks: number = 5
  ): ProgrammaticPage[] {
    const scored = allPages
      .filter(p => p.id !== currentPage.id)
      .map(page => ({
        page,
        score: this.calculateRelatednessScore(currentPage, page)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, maxLinks)

    return scored.map(s => s.page)
  }

  private static calculateRelatednessScore(page1: ProgrammaticPage, page2: ProgrammaticPage): number {
    let score = 0

    // Category match (highest weight)
    if (page1.category === page2.category) {
      score += 10
    }

    // Intent match
    if (page1.intent === page2.intent) {
      score += 5
    }

    // Template match
    if (page1.template === page2.template) {
      score += 3
    }

    // Keyword overlap
    const keywords1 = new Set([...page1.primaryKeywords, ...page1.supportingKeywords])
    const keywords2 = new Set([...page2.primaryKeywords, ...page2.supportingKeywords])
    const overlap = [...keywords1].filter(k => keywords2.has(k)).length
    score += overlap * 2

    // Same hub
    if (page1.parentHub === page2.parentHub && page1.parentHub) {
      score += 8
    }

    return score
  }

  static generateHubAndSpokeLinks(
    hub: HubPage,
    spokes: ProgrammaticPage[]
  ): InternalLink[] {
    const links: InternalLink[] = []

    // Hub to spokes (high weight)
    spokes.forEach(spoke => {
      links.push({
        from: hub.slug,
        to: spoke.slug,
        anchorText: spoke.title,
        type: 'navigation',
        weight: 10
      })
    })

    // Spokes back to hub (medium weight)
    spokes.forEach(spoke => {
      links.push({
        from: spoke.slug,
        to: hub.slug,
        anchorText: hub.title,
        type: 'breadcrumb',
        weight: 8
      })
    })

    // Cross-spoke linking within hub (lower weight)
    spokes.forEach(spoke => {
      const relatedSpokes = this.generateRelatedPages(spoke, spokes, 3)
      relatedSpokes.forEach(related => {
        links.push({
          from: spoke.slug,
          to: related.slug,
          anchorText: related.title,
          type: 'related',
          weight: 3
        })
      })
    })

    return links
  }

  static generateContextualLinks(
    content: string,
    pages: ProgrammaticPage[],
    maxLinks: number = 3
  ): InternalLink[] {
    const links: InternalLink[] = []
    const words = content.toLowerCase().split(/\s+/)
    
    pages.forEach(page => {
      const keywords = [
        ...page.primaryKeywords.map(k => k.toLowerCase()),
        ...page.supportingKeywords.map(k => k.toLowerCase())
      ]

      keywords.forEach(keyword => {
        const occurrences = words.filter(w => w.includes(keyword) || keyword.includes(w)).length
        if (occurrences > 0) {
          links.push({
            from: 'content',
            to: page.slug,
            anchorText: page.title,
            type: 'contextual',
            weight: occurrences
          })
        }
      })
    })

    return links
      .sort((a, b) => b.weight - a.weight)
      .slice(0, maxLinks)
  }

  static buildLinkGraph(pages: ProgrammaticPage[], hubs: HubPage[]): Map<string, InternalLink[]> {
    const graph = new Map<string, InternalLink[]>()

    // Initialize graph
    pages.forEach(page => {
      graph.set(page.slug, [])
    })
    hubs.forEach(hub => {
      graph.set(hub.slug, [])
    })

    // Add hub-and-spoke links
    hubs.forEach(hub => {
      const hubSpokes = pages.filter(p => p.parentHub === hub.id)
      const hubLinks = this.generateHubAndSpokeLinks(hub, hubSpokes)
      
      hubLinks.forEach(link => {
        const fromLinks = graph.get(link.from) || []
        fromLinks.push(link)
        graph.set(link.from, fromLinks)
      })
    })

    // Add cross-category contextual links
    pages.forEach(page => {
      const otherPages = pages.filter(p => p.id !== page.id)
      const contextualLinks = this.generateContextualLinks(page.content, otherPages, 2)
      
      contextualLinks.forEach(link => {
        const fromLinks = graph.get(page.slug) || []
        fromLinks.push(link)
        graph.set(page.slug, fromLinks)
      })
    })

    return graph
  }

  static calculatePageAuthority(
    page: ProgrammaticPage,
    linkGraph: Map<string, InternalLink[]>,
    iterations: number = 10
  ): number {
    const authorities = new Map<string, number>()
    
    // Initialize equal authority
    const allPages = Array.from(linkGraph.keys())
    allPages.forEach(slug => {
      authorities.set(slug, 1.0)
    })

    // PageRank-style iteration
    for (let i = 0; i < iterations; i++) {
      const newAuthorities = new Map<string, number>()
      
      allPages.forEach(slug => {
        let authority = 0.15 // Damping factor
        
        const incomingLinks = Array.from(linkGraph.values())
          .flat()
          .filter(link => link.to === slug)
        
        incomingLinks.forEach(link => {
          const fromAuthority = authorities.get(link.from) || 1.0
          const fromLinksCount = (linkGraph.get(link.from) || []).length
          authority += (0.85 * fromAuthority * link.weight) / fromLinksCount
        })
        
        newAuthorities.set(slug, authority)
      })
      
      authorities.clear()
      newAuthorities.forEach((value, key) => authorities.set(key, value))
    }

    return authorities.get(page.slug) || 1.0
  }
}
