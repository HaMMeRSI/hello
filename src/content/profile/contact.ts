import { profile } from './site';

export { profile };

export const contactChannels = [
  { id: 'email', label: 'email', value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
  { id: 'github', label: 'github', value: '@HaMMeRSI', href: profile.github, external: true },
  { id: 'linkedin', label: 'linkedin', value: 'Sagi Hammer', href: profile.linkedin, external: true },
  { id: 'cv', label: 'cv', value: 'The traditional document', href: profile.resumePath },
];
