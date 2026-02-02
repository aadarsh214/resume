const fs = require('fs');
const path = require('path');

// Simple demo without React dependencies
console.log('🚀 Initializing Programmatic SEO System...');

// Create sample data directly
const samplePages = [
  {
    id: 'tutorial-how-to-build-react',
    slug: 'how-to-build-react-component-library',
    title: 'How to Build a React Component Library',
    description: 'Learn the complete process of building a reusable React component library from scratch.',
    content: `# How to Build a React Component Library

## Introduction
Learn the complete process of building a reusable React component library from scratch.

## What You'll Need
- React knowledge
- TypeScript basics
- npm/yarn

## Step-by-Step Instructions
### Step 1: Setup
Initialize your project with TypeScript and React.

### Step 2: Create Components
Create your first component with proper TypeScript types.

### Step 3: Add Documentation
Add Storybook for component documentation.

### Step 4: Testing
Setup testing with Jest and React Testing Library.

### Step 5: Build Process
Configure build process with Rollup or Webpack.

### Step 6: Publish
Publish to npm with semantic versioning.

## Tips and Best Practices
- Use TypeScript for better type safety
- Document each component thoroughly
- Consider accessibility from the start
- Test components in isolation

## Conclusion
Congratulations! You've successfully learned how to build a React component library.`,
    intent: 'informational',
    primaryKeywords: ['react', 'component library', 'typescript'],
    supportingKeywords: ['storybook', 'testing', 'npm'],
    category: 'tutorials',
    template: 'how-to-guide',
    relatedPages: [],
    schemaType: 'HowTo',
    lastModified: new Date(),
    faqs: [
      {
        question: 'What is a React component library?',
        answer: 'A React component library is a collection of reusable React components that can be shared across projects.'
      },
      {
        question: 'Why use TypeScript for component libraries?',
        answer: 'TypeScript provides type safety, better IDE support, and self-documenting code for component libraries.'
      },
      {
        question: 'What tools do I need to build a component library?',
        answer: 'You need React, TypeScript, a build tool like Rollup or Webpack, testing framework like Jest, and documentation tool like Storybook.'
      }
    ]
  },
  {
    id: 'review-react-vs-vue',
    slug: 'react-vs-vue-comparison',
    title: 'React vs Vue: Which Framework to Choose in 2024',
    description: 'Comprehensive comparison between React and Vue to help you choose the right framework for your project.',
    content: `# React vs Vue: Which Framework to Choose in 2024

## Introduction
Choosing between React and Vue can be challenging. This comprehensive comparison will help you make an informed decision.

## Quick Overview
### React
A JavaScript library for building user interfaces with a component-based architecture.

### Vue
Progressive JavaScript framework for building user interfaces with excellent documentation.

## Detailed Comparison
| Feature | React | Vue |
|---------|-------|-----|
| Learning Curve | Medium | Easy |
| Performance | Excellent | Excellent |
| Bundle Size | Small | Small |
| Ecosystem | Large | Growing |

## Pros and Cons
### React
**Pros:**
- Large ecosystem
- Flexible
- Great performance

**Cons:**
- Requires additional libraries
- Opinionated about JSX

### Vue
**Pros:**
- Easy to learn
- Great documentation
- Versatile

**Cons:**
- Smaller ecosystem
- Less enterprise adoption

## Our Recommendation
For beginners, we recommend Vue due to its gentle learning curve. For large enterprise applications, React might be better due to its larger ecosystem.`,
    intent: 'transactional',
    primaryKeywords: ['react', 'vue', 'framework comparison'],
    supportingKeywords: ['frontend', 'javascript', 'web development'],
    category: 'reviews',
    template: 'comparison-page',
    relatedPages: [],
    schemaType: 'Article',
    lastModified: new Date(),
    faqs: [
      {
        question: 'Which is easier to learn, React or Vue?',
        answer: 'Vue is generally considered easier to learn due to its simpler syntax and excellent documentation.'
      },
      {
        question: 'Which has better performance, React or Vue?',
        answer: 'Both frameworks have excellent performance. The difference is usually negligible in real-world applications.'
      },
      {
        question: 'Which framework has more job opportunities?',
        answer: 'React currently has more job opportunities due to its larger market share and longer history.'
      },
      {
        question: 'Can I use both React and Vue in the same project?',
        answer: 'While technically possible, it\'s not recommended to use both frameworks in the same project due to complexity.'
      }
    ]
  }
];

const sampleHubs = [
  {
    id: 'tutorial-hub',
    slug: 'programming-tutorials',
    title: 'Programming Tutorials',
    description: 'Comprehensive tutorials for modern web development and programming',
    category: 'tutorials',
    primaryKeywords: ['tutorials', 'programming', 'web development', 'coding'],
    spokes: ['tutorial-how-to-build-react'],
    schemaType: 'CollectionPage',
    lastModified: new Date()
  }
];

// Generate sitemaps
console.log('🗺️ Generating sitemaps...');

function generateSitemapXML(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    ${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
    ${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
    ${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
  </url>`).join('\n')}
</urlset>`;
}

function generateSitemapIndex(sitemaps) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    ${sitemap.lastmod ? `<lastmod>${sitemap.lastmod}</lastmod>` : ''}
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

function generateRobotsTxt(sitemaps) {
  return `User-agent: *
Allow: /

# Content signals for search engines and AI systems
Content-signal: search=yes,ai-input=yes,ai-train=no

# Explicitly allow common AI answer bots to crawl for retrieval
User-agent: GPTBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

${sitemaps.map(sitemap => `Sitemap: ${sitemap.loc}`).join('\n')}
`;
}

const baseUrl = 'https://aadarsh.pro';
const staticPages = [
  { path: '/', priority: 1.0 },
  { path: '/resume', priority: 0.8 },
  { path: '/contact', priority: 0.7 },
  { path: '/work', priority: 0.8 }
];

// Create main sitemap entries
const mainEntries = staticPages.map(page => ({
  url: `${baseUrl}${page.path}`,
  changefreq: 'weekly',
  priority: page.priority
}));

// Add category sitemaps
const categories = [...new Set(samplePages.map(page => page.category))];
categories.forEach(category => {
  mainEntries.push({
    url: `${baseUrl}/sitemaps/${category}.xml`,
    changefreq: 'daily',
    priority: 0.9
  });
});

const mainSitemap = generateSitemapXML(mainEntries);

// Generate category sitemaps
const categorySitemaps = categories.map(category => {
  const categoryPages = samplePages.filter(page => page.category === category);
  const categoryHubs = sampleHubs.filter(hub => hub.category === category);
  
  const entries = [];
  
  // Add hub pages
  categoryHubs.forEach(hub => {
    entries.push({
      url: `${baseUrl}/${hub.slug}`,
      lastmod: hub.lastModified.toISOString(),
      changefreq: 'weekly',
      priority: 0.8
    });
  });
  
  // Add programmatic pages
  categoryPages.forEach(page => {
    entries.push({
      url: `${baseUrl}/${page.slug}`,
      lastmod: page.lastModified.toISOString(),
      changefreq: page.intent === 'navigational' ? 'monthly' : 'weekly',
      priority: page.intent === 'navigational' ? 0.7 : page.intent === 'transactional' ? 0.6 : 0.5
    });
  });
  
  return {
    loc: `${baseUrl}/sitemaps/${category}.xml`,
    content: generateSitemapXML(entries)
  };
});

// Create output directory
const outputDir = path.join(__dirname, '../../../dist/seo');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Save main sitemap
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), mainSitemap);
console.log('💾 Saved main sitemap');

// Save category sitemaps
categorySitemaps.forEach(sitemap => {
  const filename = sitemap.loc.split('/').pop();
  fs.writeFileSync(path.join(outputDir, filename), sitemap.content);
  console.log(`💾 Saved ${filename}`);
});

// Save sitemap index
const sitemapIndex = generateSitemapIndex([
  { loc: `${baseUrl}/sitemap.xml` },
  ...categorySitemaps
]);
fs.writeFileSync(path.join(outputDir, 'sitemap-index.xml'), sitemapIndex);
console.log('💾 Saved sitemap index');

// Save robots.txt
const robotsTxt = generateRobotsTxt([
  { loc: `${baseUrl}/sitemap-index.xml` }
]);
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt);
console.log('💾 Saved robots.txt');

// Save sample data
fs.writeFileSync(
  path.join(outputDir, 'sample-pages.json'),
  JSON.stringify(samplePages, null, 2)
);

fs.writeFileSync(
  path.join(outputDir, 'sample-hubs.json'),
  JSON.stringify(sampleHubs, null, 2)
);

// Calculate statistics
const stats = {
  totalPages: samplePages.length,
  totalHubs: sampleHubs.length,
  totalCategories: categories.length,
  estimatedSitemaps: categorySitemaps.length + 1,
  largestCategory: categories.reduce((max, cat) => {
    const count = samplePages.filter(p => p.category === cat).length;
    const maxCount = samplePages.filter(p => p.category === max).length;
    return count > maxCount ? cat : max;
  }),
  averagePagesPerCategory: Math.round(samplePages.length / categories.length)
};

console.log('\n📈 SEO System Statistics:');
console.log(`   Total Pages: ${stats.totalPages}`);
console.log(`   Total Hubs: ${stats.totalHubs}`);
console.log(`   Categories: ${stats.totalCategories}`);
console.log(`   Estimated Sitemaps: ${stats.estimatedSitemaps}`);
console.log(`   Largest Category: ${stats.largestCategory}`);
console.log(`   Average Pages/Category: ${stats.averagePagesPerCategory}`);

// Show sample page data
const samplePage = samplePages[0];
console.log('\n📄 Sample Page:');
console.log(`   Title: ${samplePage.title}`);
console.log(`   Slug: ${samplePage.slug}`);
console.log(`   Category: ${samplePage.category}`);
console.log(`   Intent: ${samplePage.intent}`);
console.log(`   Word Count: ${samplePage.content.split(/\s+/).length}`);
console.log(`   FAQ Count: ${samplePage.faqs.length}`);
console.log(`   Primary Keywords: ${samplePage.primaryKeywords.join(', ')}`);

console.log('\n🎉 SEO System Demo Complete!');
console.log(`📁 Check ${outputDir} for generated files:`);
console.log('   - sitemap.xml (main sitemap)');
console.log('   - sitemap-index.xml (sitemap index)');
console.log('   - robots.txt');
console.log('   - sample-pages.json');
console.log('   - sample-hubs.json');
console.log('   - Category-specific sitemaps');

console.log('\n🚀 To see the SEO system in action:');
console.log('   1. Run: npm run dev');
console.log('   2. Visit: http://localhost:5173');
console.log('   3. Check: http://localhost:5173/sitemap.xml');
console.log('   4. Check: http://localhost:5173/robots.txt');
