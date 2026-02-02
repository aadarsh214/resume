import { ProgrammaticPageGenerator } from '../data/page-generator'
import { templates } from '../templates'

// Initialize the page generator with templates
Object.values(templates).forEach(template => {
  ProgrammaticPageGenerator.registerTemplate(template)
})

// Sample data for demonstration
export const sampleHowToGuides = [
  {
    title: 'How to Build a React Component Library',
    introduction: 'Learn the complete process of building a reusable React component library from scratch.',
    prerequisites: ['React knowledge', 'TypeScript basics', 'npm/yarn'],
    steps: [
      'Setup: Initialize your project with TypeScript and React',
      'Create your first component with proper TypeScript types',
      'Add Storybook for component documentation',
      'Setup testing with Jest and React Testing Library',
      'Configure build process with Rollup or Webpack',
      'Publish to npm with semantic versioning'
    ],
    tips: [
      'Use TypeScript for better type safety',
      'Document each component thoroughly',
      'Consider accessibility from the start',
      'Test components in isolation'
    ],
    keywords: ['react', 'component library', 'typescript', 'storybook']
  },
  {
    title: 'How to Optimize Website Performance',
    introduction: 'Master the techniques to make your website load faster and provide better user experience.',
    prerequisites: ['Basic web development', 'Understanding of browser rendering'],
    steps: [
      'Analyze current performance with Lighthouse',
      'Optimize images and assets',
      'Implement code splitting and lazy loading',
      'Minimize JavaScript and CSS bundles',
      'Add proper caching strategies',
      'Monitor performance continuously'
    ],
    tips: [
      'Focus on Core Web Vitals',
      'Use modern image formats like WebP',
      'Implement resource hints (preload, prefetch)',
      'Consider server-side rendering'
    ],
    keywords: ['performance', 'optimization', 'web vitals', 'caching']
  }
]

export const sampleComparisons = [
  {
    title: 'React vs Vue vs Angular: Which Framework to Choose in 2024',
    items: ['React', 'Vue', 'Angular'],
    descriptions: {
      'React': 'A JavaScript library for building user interfaces with a component-based architecture.',
      'Vue': 'Progressive JavaScript framework for building user interfaces with excellent documentation.',
      'Angular': 'Full-featured framework for building complex web applications with TypeScript.'
    },
    comparisonTable: [
      {
        feature: 'Learning Curve',
        'React': 'Medium',
        'Vue': 'Easy',
        'Angular': 'Hard'
      },
      {
        feature: 'Performance',
        'React': 'Excellent',
        'Vue': 'Excellent',
        'Angular': 'Good'
      },
      {
        feature: 'Bundle Size',
        'React': 'Small',
        'Vue': 'Small',
        'Angular': 'Large'
      }
    ],
    pros: {
      'React': ['Large ecosystem', 'Flexible', 'Great performance'],
      'Vue': ['Easy to learn', 'Great documentation', 'Versatile'],
      'Angular': ['Complete solution', 'TypeScript first', 'Enterprise-ready']
    },
    cons: {
      'React': ['Requires additional libraries', 'Opinionated about JSX'],
      'Vue': ['Smaller ecosystem', 'Less enterprise adoption'],
      'Angular': ['Steep learning curve', 'Verbose syntax']
    },
    keywords: ['react', 'vue', 'angular', 'framework comparison', 'frontend']
  }
]

export const sampleResources = [
  {
    title: 'Frontend Development Resource Hub',
    category: 'frontend',
    introduction: 'Comprehensive collection of frontend development resources, tools, and learning materials.',
    featured: [
      {
        title: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        description: 'Comprehensive documentation for web technologies',
        type: 'Documentation',
        level: 'All levels'
      },
      {
        title: 'CSS Tricks',
        url: 'https://css-tricks.com',
        description: 'Articles, guides, and tutorials about CSS',
        type: 'Blog',
        level: 'Intermediate'
      }
    ],
    categories: [
      {
        name: 'Documentation',
        description: 'Official documentation and references',
        resources: ['MDN Web Docs', 'React Docs', 'Vue Docs']
      },
      {
        name: 'Learning Platforms',
        description: 'Online courses and tutorials',
        resources: ['freeCodeCamp', 'Codecademy', 'Frontend Masters']
      }
    ],
    keywords: ['frontend', 'resources', 'documentation', 'learning']
  }
]

export const sampleLocations = [
  {
    title: 'Web Development Services in New York',
    location: 'New York',
    introduction: 'Professional web development services available throughout New York City and surrounding areas.',
    services: [
      {
        name: 'Custom Website Development',
        description: 'Tailored websites built to your specifications',
        price: 'Starting at $5,000',
        duration: '4-8 weeks'
      },
      {
        name: 'E-commerce Solutions',
        description: 'Complete online stores with payment integration',
        price: 'Starting at $8,000',
        duration: '6-12 weeks'
      }
    ],
    benefits: [
      'Local NYC development team',
      'In-person consultations available',
      'Understanding of local market',
      'Fast response times',
      'Ongoing support and maintenance'
    ],
    areas: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
    keywords: ['web development', 'new york', 'nyc', 'local services']
  }
]

// Generate sample pages
export function generateSamplePages() {
  // Generate how-to guides
  const howToPages = ProgrammaticPageGenerator.generatePages({
    template: 'how-to-guide',
    data: sampleHowToGuides,
    category: 'tutorials'
  })

  // Generate comparison pages
  const comparisonPages = ProgrammaticPageGenerator.generatePages({
    template: 'comparison-page',
    data: sampleComparisons,
    category: 'reviews'
  })

  // Generate resource hubs
  const resourcePages = ProgrammaticPageGenerator.generatePages({
    template: 'resource-hub',
    data: sampleResources,
    category: 'resources'
  })

  // Generate location pages
  const locationPages = ProgrammaticPageGenerator.generatePages({
    template: 'location-page',
    data: sampleLocations,
    category: 'locations'
  })

  // Generate sample hubs
  const tutorialHub = ProgrammaticPageGenerator.generateHub({
    id: 'tutorial-hub',
    title: 'Programming Tutorials',
    description: 'Comprehensive tutorials for modern web development and programming',
    category: 'tutorials',
    primaryKeywords: ['tutorials', 'programming', 'web development', 'coding'],
    spokes: howToPages.map(page => page.id)
  })

  const reviewHub = ProgrammaticPageGenerator.generateHub({
    id: 'review-hub',
    title: 'Software Reviews',
    description: 'In-depth comparisons and reviews of development tools and frameworks',
    category: 'reviews',
    primaryKeywords: ['reviews', 'comparisons', 'software', 'tools'],
    spokes: comparisonPages.map(page => page.id)
  })

  return {
    pages: [...howToPages, ...comparisonPages, ...resourcePages, ...locationPages],
    hubs: [tutorialHub, reviewHub]
  }
}

// Export generated data for use in components
export const { pages: samplePages, hubs: sampleHubs } = generateSamplePages()
