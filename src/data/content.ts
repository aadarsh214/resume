export type Social = { label: string; href: string };
export type Experience = {
  role: string;
  company: string;
  period: string;
  description?: string;
  logo: string; // public path to company logo
  bullets: string[];
  site?: string; // optional website or app domain
};
export type Project = { title: string; description: string; url: string; tech: string[] };

export const personal = {
  name: 'Aadarsh Gupta',
  title: 'Full Stack Developer & Designer',
  intro:
    "I'm a full-stack engineer focused on building elegant, performant web applications. I enjoy designing robust systems, crafting delightful UIs, and shipping reliable software end-to-end.",
};

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/aadarsh214' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/username' },
  { label: 'Email', href: 'mailto:aadarshgupta7828@gmail.com' },
];

export const experience: Experience[] = [
  {
    role: 'Frontend Engineer (Freelance)',
    company: 'Datasense LMS',
    period: 'Feb 2024 – Feb 2025',
    logo: '/assets/logos/datasense.svg',
    site: 'https://practice.datasenseai.com',
    bullets: [
      'Developed and maintained scalable AI-driven web applications for an advanced learning management system.',
      'Optimized API response times, improving load speed by 30%.',
      'Built reusable UI components using React.js, Next.js, and Tailwind CSS.',
      'Ensured cross-browser compatibility, accessibility, and performance optimization.',
      'Collaborated closely with backend engineers to streamline integrations and enhance user experience.',
    ],
  },
  {
    role: 'Frontend Developer (Freelance)',
    company: 'Battleground',
    period: '2023 – 2024',
    logo: '/assets/logos/battleground.svg',
    site: 'https://battleground.datasenseai.com',
    bullets: [
      'Designed an interactive real-time coding platform supporting SQL and Python environments.',
      'Integrated AI-powered analytics to provide intelligent user insights.',
      'Enhanced frontend efficiency by optimizing asset loading, caching, and rendering.',
      'Built structured, scalable UI components to maintain clean architecture and reusability.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Hitkarini Sabha Trust',
    period: '2025',
    logo: '/assets/logos/hitkarini.svg',
    site: 'https://hitkarini.com',
    bullets: [
      'Built a job board platform enabling role postings, candidate applications, and admin workflows.',
      'Developed an AI learning tutor app prototype with contextual assistance and progress tracking.',
      'Implemented responsive UI with React and Tailwind, integrating REST APIs securely.',
    ],
  },
  {
    role: 'Prompt Engineer',
    company: 'Outlier (Part-time)',
    period: 'Apr 2025 – Sep 2025 · Remote',
    logo: '/assets/logos/outlier.svg',
    bullets: [
      'Crafted and evaluated high-quality prompts and rubrics for AI tasks across domains.',
      'Iterated on instruction tuning datasets to improve output consistency and accuracy.',
      'Collaborated asynchronously to refine guidelines and test edge cases.',
    ],
  },
  {
    role: 'Freelance Product Designer & Developer',
    company: 'Self-employed',
    period: '2022 – 2023',
    logo: '/assets/logos/freelance.svg',
    bullets: [
      'Delivered premium landing pages and web apps with futuristic, iOS-inspired glassmorphic designs.',
      'Built modern React + Tailwind + shadcn/ui systems for design consistency and scalability.',
      'Created animated components using Rive and Framer for fluid, motion-based UI.',
      'Authored PRDs for SaaS and healthcare apps, including the Dental Management Web App.',
      'Consulted startups on payment gateways (Razorpay, Dodo) and affiliate setup strategies for global monetization.',
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'Realtime Collab Board',
    description: 'A low-latency whiteboard with CRDT sync and cursor presence for distributed teams.',
    url: 'https://example.com',
    tech: ['React', 'TypeScript', 'WebRTC', 'CRDT'],
  },
  {
    title: 'E-commerce Platform',
    description: 'Modular storefront with headless CMS and server-side rendering for blazing performance.',
    url: 'https://example.com',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'DevOps Dashboard',
    description: 'Unified dashboard for CI/CD analytics, cost insights, and incident response.',
    url: 'https://example.com',
    tech: ['React', 'Go', 'gRPC', 'Grafana'],
  },
  {
    title: 'Design System',
    description: 'Accessible component system with tokens, theming, and Figma integration.',
    url: 'https://example.com',
    tech: ['Storybook', 'Tailwind', 'TypeScript'],
  },
];

export const skills: string[] = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'Express', 'Go', 'Python', 'GraphQL',
  'REST', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'CI/CD',
  'Jest', 'Playwright', 'TailwindCSS', 'Design Systems'
];

export const skillDescriptions = {
  frontend:
    'Building modern, responsive interfaces with React, TypeScript, and design systems. Focus on accessibility, performance, and delightful interactions.',
  backend:
    'Designing reliable APIs and services using Node.js/Go with strong data modeling and observability. Emphasis on scalability and maintainability.',
  devops:
    'Automating deploys and infra with Docker/Kubernetes, CI/CD pipelines, and cloud-native best practices for robust operations.',
};
