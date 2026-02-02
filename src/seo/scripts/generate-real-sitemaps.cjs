const fs = require('fs');
const path = require('path');

console.log('🗺️ Generating REAL Production Sitemaps...');

// Real pages for your portfolio
const portfolioPages = [
  {
    url: 'https://aadarsh.pro/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: 'https://aadarsh.pro/resume',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.9
  },
  {
    url: 'https://aadarsh.pro/work',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: 'https://aadarsh.pro/skill-wall',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: 'https://aadarsh.pro/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.6
  }
];

// Generate programmatic pages for scaling
const programmaticPages = [
  // Tutorial pages
  {
    url: 'https://aadarsh.pro/tutorials/react-hooks-guide',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: 'https://aadarsh.pro/tutorials/typescript-basics',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: 'https://aadarsh.pro/tutorials/nodejs-api',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  // Project showcases
  {
    url: 'https://aadarsh.pro/projects/realtime-collab-board',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.6
  },
  {
    url: 'https://aadarsh.pro/projects/ecommerce-platform',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.6
  },
  {
    url: 'https://aadarsh.pro/projects/devops-dashboard',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.6
  },
  // Skill categories
  {
    url: 'https://aadarsh.pro/skills/frontend',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    url: 'https://aadarsh.pro/skills/backend',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    url: 'https://aadarsh.pro/skills/devops',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5
  }
];

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

// Generate sitemap index
function generateSitemapIndex(sitemaps) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.loc}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

// Create output directory
const outputDir = path.join(__dirname, '../../../public');
const sitemapsDir = path.join(outputDir, 'sitemaps');

if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

// Generate main sitemap
console.log('📄 Generating main sitemap...');
const mainSitemap = generateSitemapXML(portfolioPages);
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), mainSitemap);
console.log('✅ Updated public/sitemap.xml');

// Generate category sitemaps
console.log('📂 Generating category sitemaps...');

// Tutorials sitemap
const tutorialPages = programmaticPages.filter(p => p.url.includes('/tutorials/'));
const tutorialSitemap = generateSitemapXML(tutorialPages);
fs.writeFileSync(path.join(sitemapsDir, 'tutorials.xml'), tutorialSitemap);
console.log('✅ Created sitemaps/tutorials.xml');

// Projects sitemap
const projectPages = programmaticPages.filter(p => p.url.includes('/projects/'));
const projectSitemap = generateSitemapXML(projectPages);
fs.writeFileSync(path.join(sitemapsDir, 'projects.xml'), projectSitemap);
console.log('✅ Created sitemaps/projects.xml');

// Skills sitemap
const skillPages = programmaticPages.filter(p => p.url.includes('/skills/'));
const skillSitemap = generateSitemapXML(skillPages);
fs.writeFileSync(path.join(sitemapsDir, 'skills.xml'), skillSitemap);
console.log('✅ Created sitemaps/skills.xml');

// Generate sitemap index
console.log('📋 Generating sitemap index...');
const sitemapIndex = generateSitemapIndex([
  {
    loc: 'https://aadarsh.pro/sitemap.xml',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://aadarsh.pro/sitemaps/tutorials.xml',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://aadarsh.pro/sitemaps/projects.xml',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://aadarsh.pro/sitemaps/skills.xml',
    lastmod: new Date().toISOString().split('T')[0]
  }
]);

fs.writeFileSync(path.join(outputDir, 'sitemap-index.xml'), sitemapIndex);
console.log('✅ Created sitemap-index.xml');

// Update robots.txt
console.log('🤖 Updating robots.txt...');
const robotsTxt = `User-agent: *
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

Sitemap: https://aadarsh.pro/sitemap-index.xml
Sitemap: https://aadarsh.pro/sitemap.xml
`;

fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt);
console.log('✅ Updated public/robots.txt');

// Generate structured data for main pages
console.log('📊 Generating structured data...');

const structuredData = {
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
    {
      '@type': 'Person',
      '@id': 'https://aadarsh.pro/#person',
      name: 'Aadarsh Gupta',
      url: 'https://aadarsh.pro/',
      jobTitle: 'Software Engineer and AI Builder',
      sameAs: [
        'https://github.com/aadarsh214',
        'https://www.linkedin.com/in/aadarsh-gupta-b6735520a/'
      ]
    }
  ]
};

fs.writeFileSync(path.join(outputDir, 'structured-data.json'), JSON.stringify(structuredData, null, 2));
console.log('✅ Created structured-data.json');

// Statistics
console.log('\n📈 Sitemap Generation Summary:');
console.log(`   Main Pages: ${portfolioPages.length}`);
console.log(`   Tutorial Pages: ${tutorialPages.length}`);
console.log(`   Project Pages: ${projectPages.length}`);
console.log(`   Skill Pages: ${skillPages.length}`);
console.log(`   Total Pages: ${portfolioPages.length + programmaticPages.length}`);
console.log(`   Total Sitemaps: 4 (1 main + 3 category)`);

console.log('\n🔗 Generated Sitemap Structure:');
console.log('   sitemap-index.xml (main index)');
console.log('   ├── sitemap.xml (portfolio pages)');
console.log('   ├── sitemaps/tutorials.xml');
console.log('   ├── sitemaps/projects.xml');
console.log('   └── sitemaps/skills.xml');

console.log('\n📁 Files Updated:');
console.log('   public/sitemap.xml');
console.log('   public/sitemap-index.xml');
console.log('   public/robots.txt');
console.log('   public/sitemaps/tutorials.xml');
console.log('   public/sitemaps/projects.xml');
console.log('   public/sitemaps/skills.xml');
console.log('   public/structured-data.json');

console.log('\n🚀 Ready for Production!');
console.log('   1. Run: npm run build');
console.log('   2. Deploy to your server');
console.log('   3. Submit sitemap-index.xml to Google Search Console');

console.log('\n💡 This creates REAL sitemaps for your actual portfolio pages');
console.log('   No demo bullshit - just production-ready SEO infrastructure!');
