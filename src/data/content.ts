export type Social = { label: string; href: string };
export type Experience = { role: string; company: string; period: string; description: string };
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
    role: 'Senior Full Stack Engineer',
    company: 'Acme Corp',
    period: '2023 — Present',
    description:
      'Leading development of scalable web platforms, architecting micro frontends, and improving delivery pipelines.',
  },
  {
    role: 'Frontend Engineer',
    company: 'Pixel Labs',
    period: '2021 — 2023',
    description:
      'Built component libraries and design systems, enabling rapid, consistent product development.',
  },
  {
    role: 'Software Engineer',
    company: 'CloudNine',
    period: '2019 — 2021',
    description:
      'Developed APIs and services, optimized database queries, and implemented observability best practices.',
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
