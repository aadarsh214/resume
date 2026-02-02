import fs from 'fs';
import path from 'path';
import { SitemapGenerator } from '../sitemap/generator';

console.log('🔧 Using REAL SitemapGenerator class...');

// Define real pages for your portfolio
const portfolioPages = [
  {
    id: 'home',
    slug: '',
    title: 'Aadarsh Gupta - Full Stack Developer',
    description: 'Full-stack software engineer and AI builder',
    content: 'Portfolio homepage showcasing skills and experience',
    intent: 'navigational' as const,
    primaryKeywords: ['aadarsh gupta', 'full stack developer', 'software engineer'],
    supportingKeywords: ['portfolio', 'web development', 'ai builder'],
    category: 'portfolio',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'resume',
    slug: 'resume',
    title: 'Resume - Aadarsh Gupta',
    description: 'Professional experience and skills of Aadarsh Gupta',
    content: 'Detailed resume with work experience and technical skills',
    intent: 'navigational' as const,
    primaryKeywords: ['resume', 'cv', 'experience'],
    supportingKeywords: ['work history', 'skills', 'professional'],
    category: 'portfolio',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'work',
    slug: 'work',
    title: 'Projects - Aadarsh Gupta',
    description: 'Portfolio of software projects by Aadarsh Gupta',
    content: 'Showcase of web development and AI projects',
    intent: 'navigational' as const,
    primaryKeywords: ['projects', 'portfolio', 'work'],
    supportingKeywords: ['web development', 'software', 'applications'],
    category: 'portfolio',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'skills',
    slug: 'skill-wall',
    title: 'Skills - Aadarsh Gupta',
    description: 'Technical skills and expertise of Aadarsh Gupta',
    content: 'Comprehensive list of programming languages and technologies',
    intent: 'navigational' as const,
    primaryKeywords: ['skills', 'technologies', 'expertise'],
    supportingKeywords: ['programming', 'frameworks', 'tools'],
    category: 'portfolio',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'contact',
    slug: 'contact',
    title: 'Contact - Aadarsh Gupta',
    description: 'Get in touch with Aadarsh Gupta for collaborations',
    content: 'Contact information and professional inquiries',
    intent: 'transactional' as const,
    primaryKeywords: ['contact', 'hire', 'collaborate'],
    supportingKeywords: ['email', 'linkedin', 'professional'],
    category: 'portfolio',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  }
];

// Generate programmatic pages for scaling
const programmaticPages = [
  // Tutorial pages
  {
    id: 'react-hooks-tutorial',
    slug: 'tutorials/react-hooks-guide',
    title: 'Complete React Hooks Guide',
    description: 'Learn React Hooks from basics to advanced patterns',
    content: 'Comprehensive tutorial covering useState, useEffect, useContext and more',
    intent: 'informational' as const,
    primaryKeywords: ['react hooks', 'react tutorial', 'useState'],
    supportingKeywords: ['useEffect', 'useContext', 'custom hooks'],
    category: 'tutorials',
    template: 'how-to-guide',
    relatedPages: [],
    schemaType: 'HowTo' as const,
    lastModified: new Date()
  },
  {
    id: 'typescript-basics',
    slug: 'tutorials/typescript-basics',
    title: 'TypeScript Basics for Beginners',
    description: 'Learn TypeScript fundamentals and type safety',
    content: 'Introduction to TypeScript types, interfaces, and best practices',
    intent: 'informational' as const,
    primaryKeywords: ['typescript', 'types', 'javascript'],
    supportingKeywords: ['interfaces', 'generics', 'type safety'],
    category: 'tutorials',
    template: 'how-to-guide',
    relatedPages: [],
    schemaType: 'HowTo' as const,
    lastModified: new Date()
  },
  {
    id: 'nodejs-api',
    slug: 'tutorials/nodejs-api',
    title: 'Build REST API with Node.js',
    description: 'Create scalable REST APIs using Node.js and Express',
    content: 'Step-by-step guide to building production-ready APIs',
    intent: 'informational' as const,
    primaryKeywords: ['nodejs', 'api', 'express'],
    supportingKeywords: ['rest', 'backend', 'javascript'],
    category: 'tutorials',
    template: 'how-to-guide',
    relatedPages: [],
    schemaType: 'HowTo' as const,
    lastModified: new Date()
  },
  // Project showcase pages
  {
    id: 'realtime-project',
    slug: 'projects/realtime-collab-board',
    title: 'Realtime Collaboration Board',
    description: 'Real-time whiteboard with CRDT synchronization',
    content: 'Built with React, WebRTC, and Conflict-free Replicated Data Types',
    intent: 'transactional' as const,
    primaryKeywords: ['realtime', 'collaboration', 'whiteboard'],
    supportingKeywords: ['webrtc', 'crdt', 'react'],
    category: 'projects',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'ecommerce-project',
    slug: 'projects/ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Modern e-commerce platform with headless CMS',
    content: 'Built with Next.js, Node.js, PostgreSQL and Redis',
    intent: 'transactional' as const,
    primaryKeywords: ['ecommerce', 'platform', 'online store'],
    supportingKeywords: ['nextjs', 'headless cms', 'postgresql'],
    category: 'projects',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'devops-project',
    slug: 'projects/devops-dashboard',
    title: 'DevOps Dashboard',
    description: 'Unified dashboard for CI/CD analytics and monitoring',
    content: 'Built with React, Go, gRPC and Grafana integration',
    intent: 'transactional' as const,
    primaryKeywords: ['devops', 'dashboard', 'monitoring'],
    supportingKeywords: ['cicd', 'analytics', 'grafana'],
    category: 'projects',
    template: 'portfolio',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  // Skill category pages
  {
    id: 'frontend-skills',
    slug: 'skills/frontend',
    title: 'Frontend Development Skills',
    description: 'Expertise in modern frontend technologies and frameworks',
    content: 'React, TypeScript, Next.js, TailwindCSS and more',
    intent: 'navigational' as const,
    primaryKeywords: ['frontend', 'react', 'typescript'],
    supportingKeywords: ['nextjs', 'tailwindcss', 'javascript'],
    category: 'skills',
    template: 'resource-hub',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'backend-skills',
    slug: 'skills/backend',
    title: 'Backend Development Skills',
    description: 'Server-side development and API design expertise',
    content: 'Node.js, Express, Go, PostgreSQL and MongoDB',
    intent: 'navigational' as const,
    primaryKeywords: ['backend', 'nodejs', 'api'],
    supportingKeywords: ['express', 'postgresql', 'go'],
    category: 'skills',
    template: 'resource-hub',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  },
  {
    id: 'devops-skills',
    slug: 'skills/devops',
    title: 'DevOps and Infrastructure Skills',
    description: 'Cloud deployment and infrastructure automation',
    content: 'Docker, Kubernetes, AWS, CI/CD pipelines',
    intent: 'navigational' as const,
    primaryKeywords: ['devops', 'docker', 'kubernetes'],
    supportingKeywords: ['aws', 'cicd', 'infrastructure'],
    category: 'skills',
    template: 'resource-hub',
    relatedPages: [],
    schemaType: 'WebPage' as const,
    lastModified: new Date()
  }
];

// Combine all pages
const allPages = [...portfolioPages, ...programmaticPages];

// Create hub pages
const hubs = [
  {
    id: 'tutorial-hub',
    slug: 'tutorials',
    title: 'Programming Tutorials',
    description: 'Comprehensive tutorials for modern web development',
    category: 'tutorials',
    primaryKeywords: ['tutorials', 'programming', 'web development'],
    spokes: programmaticPages.filter(p => p.category === 'tutorials').map(p => p.id),
    schemaType: 'CollectionPage' as const,
    lastModified: new Date()
  },
  {
    id: 'project-hub',
    slug: 'projects',
    title: 'Project Portfolio',
    description: 'Showcase of software development projects',
    category: 'projects',
    primaryKeywords: ['projects', 'portfolio', 'showcase'],
    spokes: programmaticPages.filter(p => p.category === 'projects').map(p => p.id),
    schemaType: 'CollectionPage' as const,
    lastModified: new Date()
  },
  {
    id: 'skills-hub',
    slug: 'skills',
    title: 'Technical Skills',
    description: 'Comprehensive list of technical expertise',
    category: 'skills',
    primaryKeywords: ['skills', 'expertise', 'technologies'],
    spokes: programmaticPages.filter(p => p.category === 'skills').map(p => p.id),
    schemaType: 'CollectionPage' as const,
    lastModified: new Date()
  }
];

console.log('📊 Using SitemapGenerator class...');

// Create output directory
const outputDir = path.join(process.cwd(), 'public');
const sitemapsDir = path.join(outputDir, 'sitemaps');

if (!fs.existsSync(sitemapsDir)) {
  fs.mkdirSync(sitemapsDir, { recursive: true });
}

// Generate sitemaps using the actual SitemapGenerator class
console.log('🗺️ Generating sitemaps with SitemapGenerator...');

// Define static pages for main sitemap
const staticPages = [
  { path: '/', lastmod: new Date(), priority: 1.0 },
  { path: '/resume', lastmod: new Date(), priority: 0.9 },
  { path: '/work', lastmod: new Date(), priority: 0.8 },
  { path: '/skill-wall', lastmod: new Date(), priority: 0.7 },
  { path: '/contact', lastmod: new Date(), priority: 0.6 }
];

// Generate dynamic sitemaps
const sitemaps = SitemapGenerator.generateDynamicSitemap(allPages, hubs, staticPages);

// Generate main sitemap index
const sitemapIndex = SitemapGenerator.generateSitemapIndex(sitemaps);

// Save sitemap index
fs.writeFileSync(path.join(outputDir, 'sitemap-index.xml'), sitemapIndex);
console.log('✅ Created sitemap-index.xml using SitemapGenerator');

// Generate and save category sitemaps
const categories = [...new Set(allPages.map(page => page.category))];

categories.forEach(category => {
  const categoryPages = allPages.filter(page => page.category === category);
  const categoryHubs = hubs.filter(hub => hub.category === category);
  
  const categorySitemap = SitemapGenerator.generateCategorySitemap(category, categoryPages, categoryHubs);
  fs.writeFileSync(path.join(sitemapsDir, `${category}.xml`), categorySitemap);
  console.log(`✅ Created sitemaps/${category}.xml using SitemapGenerator`);
});

// Generate main sitemap
const mainSitemap = SitemapGenerator.generateMainSitemap(staticPages, categories);
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), mainSitemap);
console.log('✅ Created sitemap.xml using SitemapGenerator');

// Generate robots.txt
const robotsTxt = SitemapGenerator.generateRobotsTxt(sitemaps);
fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsTxt);
console.log('✅ Created robots.txt using SitemapGenerator');

// Calculate statistics
const stats = SitemapGenerator.calculateSitemapStats(allPages, hubs);

console.log('\n📈 SitemapGenerator Statistics:');
console.log(`   Total Pages: ${stats.totalPages}`);
console.log(`   Total Hubs: ${stats.totalHubs}`);
console.log(`   Total Categories: ${stats.totalCategories}`);
console.log(`   Estimated Sitemaps: ${stats.estimatedSitemaps}`);
console.log(`   Largest Category: ${stats.largestCategory}`);
console.log(`   Average Pages/Category: ${stats.averagePagesPerCategory}`);

console.log('\n🎉 SitemapGenerator Implementation Complete!');
console.log('✅ Used the actual SitemapGenerator class from src/seo/sitemap/generator.ts');
console.log('✅ Generated real production sitemaps');
console.log('✅ No demo bullshit - pure SEO infrastructure!');
