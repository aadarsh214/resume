import type { PageTemplate } from '../data/page-generator'

export const templates: Record<string, PageTemplate> = {
  'how-to-guide': {
    id: 'how-to-guide',
    name: 'How-To Guide',
    intent: 'informational',
    schemaType: 'HowTo',
    minWordCount: 800,
    minFaqCount: 3,
    requiredSections: ['introduction', 'steps', 'conclusion'],
    contentPattern: (data: any) => `# ${data.title}

## Introduction
${data.introduction || `Learn how to ${data.title.toLowerCase()} with this comprehensive step-by-step guide.`}

## What You'll Need
${data.prerequisites ? data.prerequisites.map((item: string) => `- ${item}`).join('\n') : '- Basic understanding of the topic\n- Required tools and resources'}

## Step-by-Step Instructions
${data.steps ? data.steps.map((step: string, index: number) => `### Step ${index + 1}: ${step.split(':')[0]}\n${step.split(':')[1] || step}`).join('\n\n') : '### Step 1: Preparation\nBegin by preparing all necessary materials and understanding the requirements.\n\n### Step 2: Implementation\nFollow the main process carefully, ensuring each step is completed before moving to the next.\n\n### Step 3: Verification\nReview your work to ensure everything is working as expected.'}

## Tips and Best Practices
${data.tips ? data.tips.map((tip: string) => `- ${tip}`).join('\n') : '- Take your time and follow each step carefully\n- Don\'t hesitate to seek help if needed\n- Practice makes perfect'}

## Common Mistakes to Avoid
${data.mistakes ? data.mistakes.map((mistake: string) => `- ${mistake}`).join('\n') : '- Skipping steps without understanding them\n- Not preparing adequately\n- Ignoring safety precautions'}

## Conclusion
${data.conclusion || `Congratulations! You've successfully learned how to ${data.title.toLowerCase()}. Keep practicing and refining your skills.`}

## Additional Resources
${data.resources ? data.resources.map((resource: string) => `- ${resource}`).join('\n') : '- Official documentation\n- Community forums\n- Video tutorials'}`,
    metadataPattern: (data: any) => ({
      keywords: [...(data.keywords || []), 'tutorial', 'guide', 'how to', 'step by step'],
      article: {
        section: 'Tutorials',
        tags: ['how-to', 'tutorial', ...(data.tags || [])]
      }
    })
  },

  'comparison-page': {
    id: 'comparison-page',
    name: 'Comparison Page',
    intent: 'transactional',
    schemaType: 'Article',
    minWordCount: 1200,
    minFaqCount: 4,
    requiredSections: ['introduction', 'comparison', 'recommendation'],
    contentPattern: (data: any) => `# ${data.title}

## Introduction
${data.introduction || `Choosing between ${data.items?.join(' and ') || 'options'} can be challenging. This comprehensive comparison will help you make an informed decision.`}

## Quick Overview
${data.items ? data.items.map((item: string) => `### ${item}\n${data.descriptions?.[item] || `Key features and benefits of ${item}.`}`).join('\n\n') : '### Option A\nDescription of the first option with key features.\n\n### Option B\nDescription of the second option with key features.'}

## Detailed Comparison
${data.comparisonTable ? `
| Feature | ${data.items.join(' | ')} |
|---------|${data.items.map(() => '---').join('|')} |
${data.comparisonTable.map((row: any) => `| ${row.feature} | ${data.items.map((item: string) => row[item] || '-').join(' | ')} |`).join('\n')}
` : `
| Feature | Option A | Option B |
|---------|----------|----------|
| Price | $$ | $$$ |
| Ease of Use | High | Medium |
| Features | Basic | Advanced |
| Support | Email | 24/7 |
| Performance | Good | Excellent |
`}

## Pros and Cons
${data.items ? data.items.map((item: string) => `### ${item}

**Pros:**
${data.pros?.[item] ? data.pros[item].map((pro: string) => `- ${pro}`).join('\n') : '- Advantage 1\n- Advantage 2\n- Advantage 3'}

**Cons:**
${data.cons?.[item] ? data.cons[item].map((con: string) => `- ${con}`).join('\n') : '- Disadvantage 1\n- Disadvantage 2'}`).join('\n\n') : '### Option A\n**Pros:**\n- Pro 1\n- Pro 2\n\n**Cons:**\n- Con 1\n\n### Option B\n**Pros:**\n- Pro 1\n- Pro 2\n\n**Cons:**\n- Con 1'}

## Use Cases
${data.useCases ? data.useCases.map((useCase: any) => `### ${useCase.scenario}\n**Recommended:** ${useCase.recommended}\n**Reason:** ${useCase.reason}`).join('\n\n') : '### For Beginners\nRecommended option with gentle learning curve and good support.\n\n### For Advanced Users\nMore powerful option with advanced features and customization.'}

## Our Recommendation
${data.recommendation || `Based on our analysis, we recommend ${data.items?.[0] || 'Option A'} for most users due to its balance of features, price, and ease of use. However, your specific needs may vary.`}

## Final Verdict
${data.verdict || `Both options have their strengths. Consider your specific requirements, budget, and technical expertise when making your final decision. We suggest trying free trials or demos when available.`}`,
    metadataPattern: (data: any) => ({
      keywords: [...(data.keywords || []), 'comparison', 'vs', 'review', 'best', ...(data.items || [])],
      article: {
        section: 'Reviews',
        tags: ['comparison', 'review', ...(data.items || [])]
      }
    })
  },

  'resource-hub': {
    id: 'resource-hub',
    name: 'Resource Hub',
    intent: 'navigational',
    schemaType: 'WebPage',
    minWordCount: 600,
    minFaqCount: 2,
    requiredSections: ['introduction', 'resources', 'categories'],
    contentPattern: (data: any) => `# ${data.title}

## Introduction
${data.introduction || `Welcome to the comprehensive resource hub for ${data.category || 'this topic'}. Find everything you need in one organized location.`}

## Featured Resources
${data.featured ? data.featured.map((resource: any) => `### [${resource.title}](${resource.url})
${resource.description}
**Type:** ${resource.type || 'Article'} | **Difficulty:** ${resource.level || 'Beginner'}`).join('\n\n') : '### Getting Started Guide\nPerfect for beginners looking to understand the basics.\n\n### Advanced Tutorial\nDeep dive into complex topics and techniques.\n\n### Video Course\nVisual learning with step-by-step instructions.'}

## Resource Categories
${data.categories ? data.categories.map((category: any) => `### ${category.name}
${category.description}
${category.resources ? category.resources.map((resource: string) => `- ${resource}`).join('\n') : '- Resource 1\n- Resource 2\n- Resource 3'}`).join('\n\n') : '### Documentation\nOfficial guides and API references.\n\n### Tutorials\nStep-by-step learning materials.\n\n### Tools & Software\nRecommended software and online tools.\n\n### Community\nForums, discussion boards, and support groups.'}

## Learning Paths
${data.learningPaths ? data.learningPaths.map((path: any) => `### ${path.title}
${path.description}
**Duration:** ${path.duration || 'Self-paced'} | **Level:** ${path.level || 'All levels'}
**Steps:** ${path.steps ? path.steps.length : 0} steps`).join('\n\n') : '### Beginner Path\nStart with basics and gradually build your knowledge.\n\n### Advanced Path\nFor experienced users looking to deepen their expertise.'}

## Recent Updates
${data.updates ? data.updates.map((update: any) => `### ${update.title} (${update.date})
${update.summary}`).join('\n\n') : '### New Tutorial Added\nLearn the latest techniques with our updated guide.\n\n### Tool Recommendations Updated\nFresh list of recommended tools for 2024.'}

## Get Help
${data.help || `If you need assistance, check out our community forum or contact our support team. We're here to help you succeed.`}`,
    metadataPattern: (data: any) => ({
      keywords: [...(data.keywords || []), 'resources', 'hub', 'collection', 'guides', 'tutorials'],
      article: {
        section: 'Resources',
        tags: ['resources', 'hub', 'collection']
      }
    })
  },

  'location-page': {
    id: 'location-page',
    name: 'Location Page',
    intent: 'transactional',
    schemaType: 'WebPage',
    minWordCount: 700,
    minFaqCount: 3,
    requiredSections: ['introduction', 'services', 'contact'],
    contentPattern: (data: any) => `# ${data.title}

## Welcome to ${data.location || 'Our Location'}
${data.introduction || `Discover our comprehensive services available in ${data.location || 'your area'}. We're committed to serving the local community with excellence.`}

## Our Services in ${data.location || 'Your Area'}
${data.services ? data.services.map((service: any) => `### ${service.name}
${service.description}
**Starting at:** ${service.price || 'Contact for pricing'}
**Duration:** ${service.duration || 'Varies'}`).join('\n\n') : '### Service 1\nProfessional service tailored to your needs.\n\n### Service 2\nExpert solutions with guaranteed results.\n\n### Service 3\nComprehensive packages for all requirements.'}

## Why Choose Us in ${data.location || 'Your Area'}?
${data.benefits ? data.benefits.map((benefit: string) => `- ${benefit}`).join('\n') : '- Local expertise and knowledge\n- Personalized service\n- Competitive pricing\n- Fast response times\n- Proven track record'}

## Service Areas
${data.areas ? data.areas.map((area: string) => `- ${area}`).join('\n') : `- ${data.location || 'City Center'}\n- Surrounding neighborhoods\n- Metropolitan area`}

## Customer Testimonials
${data.testimonials ? data.testimonials.map((testimonial: any) => `### ${testimonial.name}
"${testimonial.quote}"
**Rating:** ${'⭐'.repeat(testimonial.rating || 5)}`).join('\n\n') : '### John D.\n"Excellent service and professional team. Highly recommended!"\n**Rating:** ⭐⭐⭐⭐⭐'}

## Pricing Information
${data.pricing || `Our pricing is competitive and transparent. Contact us for a personalized quote based on your specific needs.`}

## Contact Us
${data.contact ? `
**Address:** ${data.contact.address || '123 Main St, City, State 12345'}
**Phone:** ${data.contact.phone || '(555) 123-4567'}
**Email:** ${data.contact.email || 'info@example.com'}
**Hours:** ${data.contact.hours || 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'}
` : `
**Address:** 123 Main St, City, State 12345
**Phone:** (555) 123-4567
**Email:** info@example.com
**Hours:** Mon-Fri: 9AM-6PM, Sat: 10AM-4PM
`}

## Get Started
${data.cta || `Ready to get started? Contact us today for a free consultation and quote. We look forward to serving you in ${data.location || 'your area'}!`}`,
    metadataPattern: (data: any) => ({
      keywords: [...(data.keywords || []), data.location || 'local', 'services', 'near me', 'in area'],
      article: {
        section: 'Locations',
        tags: ['location', 'local', 'services']
      }
    })
  }
}

export function getTemplate(id: string): PageTemplate | undefined {
  return templates[id]
}

export function getAllTemplates(): PageTemplate[] {
  return Object.values(templates)
}
