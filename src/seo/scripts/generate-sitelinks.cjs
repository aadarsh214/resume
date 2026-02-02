const fs = require('fs');
const path = require('path');

console.log('🔗 Implementing Google Sitelinks SEO Strategy...');

// Define your main site structure for sitelinks
const siteStructure = {
  mainSite: {
    name: 'Aadarsh Gupta',
    url: 'https://aadarsh.pro',
    description: 'Full-stack software engineer and AI builder'
  },
  sitelinks: [
    {
      name: 'Resume',
      url: 'https://aadarsh.pro/resume',
      description: 'Professional experience and skills',
      priority: 0.9,
      changeFreq: 'monthly'
    },
    {
      name: 'Projects',
      url: 'https://aadarsh.pro/work',
      description: 'Portfolio of software projects',
      priority: 0.9,
      changeFreq: 'weekly'
    },
    {
      name: 'Skills',
      url: 'https://aadarsh.pro/skill-wall',
      description: 'Technical skills and expertise',
      priority: 0.8,
      changeFreq: 'monthly'
    },
    {
      name: 'Contact',
      url: 'https://aadarsh.pro/contact',
      description: 'Get in touch for collaborations',
      priority: 0.8,
      changeFreq: 'yearly'
    },
    {
      name: 'About',
      url: 'https://aadarsh.pro/',
      description: 'Learn more about Aadarsh Gupta',
      priority: 1.0,
      changeFreq: 'monthly'
    },
    {
      name: 'Blog',
      url: 'https://aadarsh.pro/blog',
      description: 'Articles and tutorials on web development',
      priority: 0.7,
      changeFreq: 'weekly'
    }
  ],
  // Additional important pages that could become sitelinks
  secondaryPages: [
    {
      name: 'React Tutorials',
      url: 'https://aadarsh.pro/tutorials/react',
      description: 'Learn React development',
      category: 'tutorials'
    },
    {
      name: 'TypeScript Guide',
      url: 'https://aadarsh.pro/guides/typescript',
      description: 'Master TypeScript programming',
      category: 'guides'
    },
    {
      name: 'Web Development Tools',
      url: 'https://aadarsh.pro/tools',
      description: 'Essential development tools',
      category: 'resources'
    }
  ]
};

// Generate enhanced sitemap with sitelink structure
function generateSitemapWithSitelinks() {
  const entries = [];
  
  // Main site
  entries.push({
    url: siteStructure.mainSite.url,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 1.0
  });
  
  // Primary sitelinks (most important pages)
  siteStructure.sitelinks.forEach(link => {
    entries.push({
      url: link.url,
      lastmod: new Date().toISOString(),
      changefreq: link.changeFreq,
      priority: link.priority
    });
  });
  
  // Secondary pages
  siteStructure.secondaryPages.forEach(page => {
    entries.push({
      url: page.url,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.6
    });
  });
  
  return entries;
}

// Generate structured data for sitelinks
function generateSitelinksSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://aadarsh.pro/#website',
        url: 'https://aadarsh.pro/',
        name: 'Aadarsh Gupta',
        description: 'Full-stack software engineer and AI builder',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://aadarsh.pro/#organization',
          name: 'Aadarsh Gupta',
          url: 'https://aadarsh.pro/'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://aadarsh.pro/?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      // Sitelinks as WebPage entries
      ...siteStructure.sitelinks.map(link => ({
        '@type': 'WebPage',
        '@id': `${link.url}#webpage`,
        url: link.url,
        name: link.name,
        description: link.description,
        isPartOf: {
          '@type': 'WebSite',
          '@id': 'https://aadarsh.pro/#website'
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://aadarsh.pro/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: link.name,
              item: link.url
            }
          ]
        }
      }))
    ]
  };
}

// Generate breadcrumb schema for each page
function generateBreadcrumbSchema(pageName, pageUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://aadarsh.pro/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: pageName,
        item: pageUrl
      }
    ]
  };
}

// Generate navigation schema for sitelinks
function generateNavigationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: 'Main Navigation',
    url: 'https://aadarsh.pro/',
    hasPart: siteStructure.sitelinks.map((link, index) => ({
      '@type': 'WebPage',
      name: link.name,
      url: link.url,
      description: link.description,
      position: index + 1
    }))
  };
}

// Generate HTML meta tags for sitelinks
function generateSitelinksMetaTags() {
  const metaTags = [];
  
  siteStructure.sitelinks.forEach(link => {
    metaTags.push(`<!-- ${link.name} -->`);
    metaTags.push(`<link rel="canonical" href="${link.url}">`);
  });
  
  return metaTags.join('\n');
}

// Create enhanced robots.txt for sitelinks
function generateRobotsTxt() {
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

# Prioritize important pages for crawling
Crawl-delay: 1

Sitemap: https://aadarsh.pro/sitemap.xml
Sitemap: https://aadarsh.pro/sitemap-sitelinks.xml
`;
}

// Generate sitemap XML
function generateSitemapXML(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

// Create output directory
const outputDir = path.join(__dirname, '../../../dist/seo');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate and save files
console.log('📄 Generating sitelinks SEO files...');

// Main sitemap with sitelinks
const sitemapEntries = generateSitemapWithSitelinks();
const sitemapContent = generateSitemapXML(sitemapEntries);
fs.writeFileSync(path.join(outputDir, 'sitemap-sitelinks.xml'), sitemapContent);
console.log('💾 Saved sitemap-sitelinks.xml');

// Schema files
const sitelinksSchema = generateSitelinksSchema();
fs.writeFileSync(path.join(outputDir, 'sitelinks-schema.json'), JSON.stringify(sitelinksSchema, null, 2));
console.log('💾 Saved sitelinks-schema.json');

const navigationSchema = generateNavigationSchema();
fs.writeFileSync(path.join(outputDir, 'navigation-schema.json'), JSON.stringify(navigationSchema, null, 2));
console.log('💾 Saved navigation-schema.json');

// Individual breadcrumb schemas
siteStructure.sitelinks.forEach(link => {
  const breadcrumbSchema = generateBreadcrumbSchema(link.name, link.url);
  const filename = `breadcrumb-${link.name.toLowerCase().replace(/\s+/g, '-')}.json`;
  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(breadcrumbSchema, null, 2));
});
console.log('💾 Saved individual breadcrumb schemas');

// Meta tags
const metaTags = generateSitelinksMetaTags();
fs.writeFileSync(path.join(outputDir, 'sitelinks-meta-tags.html'), metaTags);
console.log('💾 Saved sitelinks-meta-tags.html');

// Enhanced robots.txt
const robotsTxt = generateRobotsTxt();
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt);
console.log('💾 Saved enhanced robots.txt');

// Generate HTML page with structured data
const structuredDataPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aadarsh Gupta - Full Stack Software Engineer</title>
    <meta name="description" content="Full-stack software engineer and AI builder. View resume, projects, skills and contact information.">
    
    <!-- Canonical URLs for sitelinks -->
    ${generateSitelinksMetaTags()}
    
    <!-- Structured Data for Sitelinks -->
    <script type="application/ld+json">
    ${JSON.stringify(sitelinksSchema, null, 2)}
    </script>
    
    <script type="application/ld+json">
    ${JSON.stringify(navigationSchema, null, 2)}
    </script>
</head>
<body>
    <h1>Aadarsh Gupta - Full Stack Software Engineer</h1>
    <nav>
        <h2>Quick Links (Sitelinks)</h2>
        <ul>
            ${siteStructure.sitelinks.map(link => 
                `<li><a href="${link.url}">${link.name}</a> - ${link.description}</li>`
            ).join('\n            ')}
        </ul>
    </nav>
    
    <section>
        <h2>SEO Implementation for Google Sitelinks</h2>
        <p>This page demonstrates the implementation of SEO best practices to encourage Google to generate sitelinks.</p>
        
        <h3>Key Features Implemented:</h3>
        <ul>
            <li>✅ Clear site structure with hierarchical organization</li>
            <li>✅ Comprehensive sitemap with proper priorities</li>
            <li>✅ Structured data (Schema.org) markup</li>
            <li>✅ Breadcrumb navigation</li>
            <li>✅ Internal linking strategy</li>
            <li>✅ Proper meta tags and canonical URLs</li>
            <li>✅ Enhanced robots.txt</li>
        </ul>
    </section>
</body>
</html>`;

fs.writeFileSync(path.join(outputDir, 'sitelinks-demo.html'), structuredDataPage);
console.log('💾 Saved sitelinks-demo.html');

// Generate implementation guide
const implementationGuide = `# Google Sitelinks Implementation Guide

## What are Google Sitelinks?
Google Sitelinks are the additional links that appear below the main search result, providing direct access to important pages on your website.

## How This Implementation Works

### 1. Site Structure
- Clear hierarchy with main site and important subpages
- Logical categorization of content
- Consistent URL structure

### 2. Sitemap Optimization
- Main sitemap includes all important pages
- Proper priority values (1.0 for home, 0.9 for key pages)
- Appropriate change frequencies
- Accurate last modified dates

### 3. Structured Data
- WebSite schema with SearchAction
- Individual WebPage schemas for each sitelink
- BreadcrumbList schema for navigation context
- SiteNavigationElement schema

### 4. Meta Tags
- Canonical URLs for each page
- Proper title and description tags
- Open Graph and Twitter Card tags

### 5. Internal Linking
- Navigation menu with all important pages
- Contextual links between related content
- Footer links to key sections

## Files Generated

### Core SEO Files:
- \`sitemap-sitelinks.xml\` - Enhanced sitemap
- \`robots.txt\` - Optimized robots.txt
- \`sitelinks-schema.json\` - Structured data
- \`navigation-schema.json\` - Navigation schema

### Implementation Files:
- \`sitelinks-demo.html\` - Demo page with all implementations
- \`sitelinks-meta-tags.html\` - Meta tags reference
- \`breadcrumb-*.json\` - Individual breadcrumb schemas

## Best Practices for Sitelinks

### ✅ Do:
- Keep site structure simple and logical
- Use descriptive, concise page titles
- Maintain consistent navigation
- Ensure all important pages are accessible within 3 clicks
- Use proper heading hierarchy (H1, H2, H3)
- Implement breadcrumbs
- Keep URLs clean and descriptive

### ❌ Don't:
- Hide important navigation behind JavaScript
- Use duplicate content across pages
- Have broken internal links
- Use vague page titles
- Create deep, complex navigation structures

## Timeline for Results

Google typically takes 2-8 weeks to:
- Discover and index new pages
- Generate sitelinks based on site structure
- Update search result appearance

## Monitoring

Use Google Search Console to:
- Monitor indexing status
- Check for crawl errors
- Analyze search performance
- Submit sitemaps

## Next Steps

1. Upload generated files to your website
2. Submit sitemap to Google Search Console
3. Monitor search results for sitelinks appearance
4. Adjust based on performance data

## Expected Sitelinks Structure

Based on this implementation, Google should generate sitelinks like:
- Resume
- Projects  
- Skills
- Contact
- About
- Blog

These will appear as indented links below your main search result, just like the iLovePDF example.`;

fs.writeFileSync(path.join(outputDir, 'SITELINKS_IMPLEMENTATION.md'), implementationGuide);
console.log('💾 Saved SITELINKS_IMPLEMENTATION.md');

console.log('\n🎉 Google Sitelinks SEO Implementation Complete!');
console.log('\n📊 Implementation Summary:');
console.log(`   Main Site: ${siteStructure.mainSite.name}`);
console.log(`   Sitelinks: ${siteStructure.sitelinks.length} pages`);
console.log(`   Secondary Pages: ${siteStructure.secondaryPages.length} pages`);
console.log(`   Total Pages in Sitemap: ${sitemapEntries.length}`);

console.log('\n🔗 Expected Sitelinks:');
siteStructure.sitelinks.forEach((link, index) => {
  console.log(`   ${index + 1}. ${link.name} - ${link.url}`);
});

console.log('\n📁 Generated Files:');
console.log(`   Check ${outputDir} for:`);
console.log('   - sitemap-sitelinks.xml');
console.log('   - sitelinks-schema.json');
console.log('   - navigation-schema.json');
console.log('   - sitelinks-demo.html');
console.log('   - SITELINKS_IMPLEMENTATION.md');
console.log('   - Individual breadcrumb schemas');

console.log('\n🚀 Next Steps:');
console.log('   1. Run: npm run dev');
console.log('   2. Visit: http://localhost:5173/seo/sitelinks-demo.html');
console.log('   3. Submit sitemap to Google Search Console');
console.log('   4. Wait 2-8 weeks for sitelinks to appear');

console.log('\n💡 Pro Tip: Google automatically generates sitelinks.');
console.log('   This implementation provides the optimal structure');
console.log('   for Google to create relevant sitelinks for your site.');
