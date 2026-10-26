export const profile = {
  name: 'Sagi Hammer',
  headline: 'Sagi Hammer helps people solve their own problems with PaPPs, personal apps built with AI. Ten years a software engineer, now showing everyone else how to start.',
  tagline: 'Nothing fits you but you.',
  email: 'contact@sagihammer.com',
  siteUrl: 'https://sagihammer.com',
  linkedin: 'https://www.linkedin.com/in/sagi-hammer-88980819a/',
  github: 'https://github.com/HaMMeRSI',
};

export const profileSchema = {
  jobTitle: 'Software engineer and writer',
  knowsLanguage: ['Hebrew', 'English', 'Russian'],
  knowsAbout: [
    'Personal apps (PaPPs)',
    'Building software with AI',
    'AI for non-engineers',
    'Agentic AI systems',
    'Life and money tracking',
    'Habit systems',
    'Writing',
    'Software engineering',
    'TypeScript',
    'React',
  ],
  affiliation: [
    { '@type': 'Organization', name: 'Q.E.D Science' },
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
  { label: 'Start here', to: '/start' },
  { label: 'Writing', to: '/writing' },
  { label: 'My PaPPs', to: '/projects' },
  { label: 'Story', to: '/experience' },
  { label: 'Contact', to: '/contact' },
] as const;
