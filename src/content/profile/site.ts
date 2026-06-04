export const profile = {
  initials: 'SH',
  name: 'Sagi Hammer',
  role: 'Software Engineer',
  headline: 'Senior full-stack engineer building AI products, product platforms, Web3 tools, and 3D/XR systems.',
  tagline: 'Engineer by mindset. Creator at heart.',
  email: 'contact@sagihammer.com',
  siteUrl: 'https://sagihammer.com',
  linkedin: 'https://www.linkedin.com/in/sagi-hammer-88980819a/',
  github: 'https://github.com/HaMMeRSI',
  resumePath: '/CV/',
};

export const profileSchema = {
  jobTitle: 'Senior Full-Stack Software Engineer',
  knowsLanguage: ['Hebrew', 'English', 'Russian'],
  knowsAbout: [
    'Full-stack engineering',
    'AI product engineering',
    'Agentic AI systems',
    'Tool orchestration',
    'Product platforms',
    'SaaS',
    'Local-first media tools',
    'Web3 tools',
    '3D/XR systems',
    'TypeScript',
    'React',
    'Cloud architecture',
  ],
  worksFor: [{ '@type': 'Organization', name: 'Q.E.D Science' }],
  affiliation: [
    { '@type': 'Organization', name: 'D-ID' },
    { '@type': 'Organization', name: 'Reality Shift Ltd.' },
    { '@type': 'Organization', name: 'Israeli Defense Forces' },
  ],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'The College of Management Academic' },
    { '@type': 'EducationalOrganization', name: 'Mamram Programming Course' },
  ],
};

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/stack' },
  { label: 'Contact', to: '/contact' },
] as const;
