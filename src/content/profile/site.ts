export const profile = {
  initials: 'SH',
  name: 'Sagi Hammer',
  role: 'Hands-on Solutions Architect',
  headline: 'Hands-on Solutions Architect with 15+ years of experience delivering successful AI, SaaS, and immersive XR products from idea to production.',
  tagline: 'Engineer by mindset. Creator at heart.',
  email: 'contact@sagihammer.com',
  siteUrl: 'https://sagihammer.com',
  linkedin: 'https://www.linkedin.com/in/sagi-hammer-88980819a/',
  github: 'https://github.com/HaMMeRSI',
  resumePath: '/CV/',
};

export const profileSchema = {
  jobTitle: 'Hands-on Solutions Architect',
  knowsLanguage: ['Hebrew', 'English', 'Russian'],
  knowsAbout: [
    'Solutions architecture',
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
