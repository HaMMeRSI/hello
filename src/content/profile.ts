import chapetaGeneric from '../assets/chapeta/generic.webp';
import chapetaMain from '../assets/chapeta/image.jpeg';
import chapetaModels from '../assets/chapeta/models.webp';
import chapetaScreenShot from '../assets/chapeta/screen-shot.webp';
import chapetaSkills from '../assets/chapeta/skills.webp';
import chapetaTool from '../assets/chapeta/tool.webp';
import didImage1 from '../assets/did/1.jpeg';
import didImage2 from '../assets/did/2.jpeg';
import didImage3 from '../assets/did/3.jpeg';
import didLogo from '../assets/did/did.svg';
import fasteditImage1 from '../assets/fastedit/1.jpeg';
import fasteditImage2 from '../assets/fastedit/2.jpeg';
import fasteditImage3 from '../assets/fastedit/3.jpeg';
import fasteditVideo from '../assets/fastedit/main.webm';
import gepetaImage1 from '../assets/gepeta/1.jpeg';
import gepetaImage2 from '../assets/gepeta/2.jpeg';
import gepetaImage3 from '../assets/gepeta/3.jpeg';
import gepetaImage4 from '../assets/gepeta/4.jpeg';
import gepetaIcon from '../assets/gepeta/icon.svg';
import gepetaVideo from '../assets/gepeta/main.mp4';
import qedAgentPoster from '../assets/qed/agent-poster.jpg';
import qedAgentVideo from '../assets/qed/agent.mp4';
import qedLogo from '../assets/qed/qed.svg';
import terragonImage1 from '../assets/terragon/1.jpeg';
import terragonImage2 from '../assets/terragon/2.jpg';
import terragonImage3 from '../assets/terragon/3.jpg';
import terragonHeader from '../assets/terragon/header.jpg';

export const profile = {
  initials: 'SH',
  name: 'Sagi Hammer',
  role: 'Software Engineer',
  headline: 'Senior full-stack engineer building AI products, product platforms, Web3 tools, and 3D/XR systems.',
  tagline: 'Engineer by mindset. Creator at heart.',
  email: 'contact@sagihammer.com',
  linkedin: 'https://www.linkedin.com/in/sagi-hammer-88980819a/',
  github: 'https://github.com/HaMMeRSI',
  resumePath: '/CV/',
};

export const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Skills', to: '/stack' },
  { label: 'Contact', to: '/contact' },
] as const;

export const proofPoints = [
  { value: '10+', label: 'years building software across defense, startups, and AI products' },
  { value: '3', label: 'D-ID product foundations: Studio, Chat, and Agents' },
  { value: '0 -> 1', label: 'founding engineer and CTO experience from architecture to launch' },
  { value: 'AI / XR / Web3', label: 'comfortable where product, systems, and new interfaces meet' },
];

export const experience = [
  {
    company: 'Independent Products',
    role: 'Founder / Builder',
    period: 'Present',
    eyebrow: 'Current builds',
    summary: 'Shipping products that turn agentic AI, local-first media, and life-tracking workflows into real user-facing tools.',
    points: [
      'Built Chapeta, a native macOS AI agent harness for models, tools, screenshots, files, terminal commands, AppleScript, subagents, and safety approvals.',
      'Built Gepeta, an AI life-tracking SaaS/PWA and iOS app that structures finance, health, and productivity records from text, voice, photos, and spreadsheets.',
      'Shipped FastEdit, a privacy-first browser media editor for local conversion, compression, cropping, trimming, batching, and export workflows.',
    ],
    stack: ['Agentic AI systems', 'Native macOS automation', 'Local-first architectures', 'WebAssembly media pipelines'],
  },
  {
    company: 'Q.E.D Science',
    role: 'Founding Engineer',
    period: 'May 2025 - 2026',
    eyebrow: 'AI product build',
    summary: 'Building the core product platform for editorial grant discovery, eligibility reasoning, evidence gathering, and application drafting.',
    points: [
      'Owned the full product pipe: frontend workflows, backend orchestration, data flow, and the AI engine in the middle.',
      'Built tool-backed AI workflows for grant discovery, fit checks, evidence collection, drafting, and review.',
      'Turned a complex research workflow into a repeatable product system with automation at the center.',
    ],
    stack: ['AI agents', 'Full-stack product', 'Tool orchestration', 'Research automation'],
  },
  {
    company: 'D-ID',
    role: 'Senior FullStack Engineer',
    period: '2021 - 2025',
    eyebrow: 'AI product scale',
    summary: 'Designed, developed, and led foundational work for core D-ID product experiences and API surfaces.',
    points: [
      'Helped build the foundations of Studio D-ID, Chat D-ID, and Agents D-ID.',
      'Led key projects from initiation through execution and long-term integration.',
      'Contributed to the D-ID API and product-facing engineering systems.',
    ],
    stack: ['React', 'TypeScript', 'APIs', 'AI products'],
  },
  {
    company: 'Reality Shift Ltd.',
    role: 'Co-Founder / CTO',
    period: '2020 - 2021',
    eyebrow: '3D and XR',
    summary: 'Co-founded a game and XR company focused on VR gameplay, procedural systems, and gesture recognition.',
    points: [
      'Developed the VR game Terragon: Symbol Of Magic.',
      'Worked on hand gesture recognition based on image processing and machine learning.',
      'Implemented random level generation, enemy AI, animation, and sound synchronization systems.',
    ],
    stack: ['Unity', 'OpenXR', 'Machine learning', 'Game AI'],
  },
  {
    company: 'Israeli Defense Forces',
    role: 'Software Architect',
    period: '2018 - 2020',
    eyebrow: 'Modernization',
    summary: 'Modernized legacy systems and led frontend architecture changes for large internal platforms.',
    points: [
      'Designed and implemented a scalable micro frontend architecture for a legacy monolith.',
      'Introduced webpack builds to an older TypeScript project.',
      'Led a gradual transition from AngularJS to React.',
    ],
    stack: ['Micro frontends', 'React', 'AngularJS', 'Webpack'],
  },
  {
    company: 'Israeli Defense Forces',
    role: 'Software Developer',
    period: '2014 - 2018',
    eyebrow: 'Early foundation',
    summary: 'Built web applications, mapping systems, and infrastructure components from scratch.',
    points: [
      'Developed multiple web app projects from the ground up.',
      'Built mapping solutions using ESRI and NEMI/NeWMI.',
      'Developed ASP.NET infrastructure to replace an existing WCF infrastructure.',
      'Built AngularJS directives and components for internal platforms.',
    ],
    stack: ['ASP.NET', 'AngularJS', 'ESRI', 'Mapping systems'],
  },
];

export type ProjectMedia = {
  /** 'image' renders an <img>, 'video' renders either a native video or an embedded video provider */
  type: 'image' | 'video';
  /** Path to the asset. Put files in /public and reference like '/projects/gepeta-1.png' */
  src: string;
  /** Poster frame for videos (optional) */
  poster?: string;
  /** Accessible description / caption */
  alt: string;
};

export type Project = {
  name: string;
  url?: string;
  /** Short, url-safe id used for placeholder + keys */
  slug: string;
  type: string;
  status: string;
  summary: string;
  highlights?: string[];
  details: string[];
  /** Accent color used for the preview placeholder + chips */
  accent: string;
  /** Optional dedicated cover image. Falls back to a branded placeholder. */
  cover?: string;
  /** Use 'contain' for logos, 'cover' for screenshots/photos. */
  coverFit?: 'cover' | 'contain';
  /** Optional custom cover card background. */
  coverBackground?: string;
  /** Optional subtle background for the full project row. */
  rowBackground?: string;
  /**
   * Gallery media. Add as many images/videos as you like; the UI shows an
   * in-place carousel with thumbnail selection and previous/next controls.
   * Example:
   *   media: [
   *     { type: 'image', src: '/projects/gepeta-1.png', alt: 'Dashboard' },
   *     { type: 'video', src: '/projects/gepeta-demo.mp4', poster: '/projects/gepeta-1.png', alt: 'Demo' },
   *   ]
   */
  media?: ProjectMedia[];
};

export const projects: Project[] = [
  {
    name: 'Chapeta',
    url: 'https://chapeta.net',
    slug: 'chapeta',
    type: 'Native macOS AI agent',
    status: 'Active product',
    summary: 'A full macOS agent harness for computer control: models, tools, screenshots, files, terminal commands, AppleScript, subagents, and approval-based automation behind one shortcut.',
    highlights: [
      'Built the SwiftUI/AppKit menu-bar UX: hotkey panel, tabs, local history, attachments, speech, themes, and model selection.',
      'Implemented the core agent primitives: tool orchestration, file ops, shell, app automation, web/screenshot context, subagents, cancellation, and safety approvals.',
    ],
    details: ['SwiftUI/AppKit', 'LLM tool orchestration', 'Safety approvals', 'Local-first macOS UX'],
    accent: '#c79a45',
    cover: chapetaMain,
    coverBackground:
      'radial-gradient(circle at 18% 14%, rgba(199, 154, 69, 0.24), transparent 30%), radial-gradient(circle at 84% 18%, rgba(87, 70, 45, 0.18), transparent 34%), linear-gradient(135deg, #fbf7ef 0%, #f4ead8 48%, #ead7b7 100%)',
    rowBackground: 'transparent',
    media: [
      { type: 'image', src: chapetaMain, alt: 'Chapeta: main product screen' },
      { type: 'image', src: chapetaGeneric, alt: 'Chapeta: macOS AI assistant' },
      { type: 'image', src: chapetaTool, alt: 'Chapeta: AI tool execution workflow' },
      { type: 'image', src: chapetaModels, alt: 'Chapeta: multi-model selection' },
      { type: 'image', src: chapetaSkills, alt: 'Chapeta: reusable skills workflow' },
      { type: 'image', src: chapetaScreenShot, alt: 'Chapeta: screenshot analysis workflow' },
    ],
  },
  {
    name: 'Gepeta',
    url: 'https://gepeta.app',
    slug: 'gepeta',
    type: 'AI life-tracking SaaS',
    status: 'Active build',
    summary: 'AI life tracker that turns text, voice, photos, and spreadsheets into structured finance, health, and productivity records users can query.',
    highlights: [
      'Built the LLM pipeline: router, extractor, tags, image/spreadsheet/bulk flows, and DynamoDB persistence.',
      'Shipped React/TanStack PWA + Capacitor iOS with Google OAuth, speech input, push, privacy mode, and analytics dashboards.',
    ],
    details: ['AI data extraction', '13 active life aspects', 'DynamoDB + typed schemas', 'PWA + Capacitor iOS'],
    accent: '#8b5cf6',
    cover: gepetaIcon,
    coverFit: 'contain',
    coverBackground:
      'radial-gradient(circle at 18% 14%, rgba(167, 139, 250, 0.24), transparent 30%), radial-gradient(circle at 84% 18%, rgba(251, 191, 36, 0.14), transparent 34%), radial-gradient(circle at 72% 86%, rgba(221, 214, 254, 0.30), transparent 36%), linear-gradient(135deg, #fffaf0 0%, #faf7ff 52%, #f1edff 100%)',
    rowBackground: 'transparent',
    media: [
      { type: 'image', src: gepetaImage1, alt: 'Gepeta: spending dashboard' },
      { type: 'image', src: gepetaImage2, alt: 'Gepeta: budget workflow' },
      {
        type: 'video',
        src: gepetaVideo,
        poster: gepetaImage1,
        alt: 'Gepeta: product walkthrough',
      },
      { type: 'image', src: gepetaImage3, alt: 'Gepeta: AI-assisted expense categorization' },
      { type: 'image', src: gepetaImage4, alt: 'Gepeta: monthly reports' },
    ],
  },
  {
    name: 'FastEdit',
    url: 'https://fastedit.net',
    slug: 'fastedit',
    type: 'Privacy-first browser editor',
    status: 'Shipped product',
    summary: 'Local-first browser editor for converting, compressing, cropping, trimming, blurring, batching, and exporting media without uploads.',
    highlights: [
      'Built a WebAssembly/browser media pipeline for images, PDFs, animations, and short video.',
      'Supports 15 input families, 12 export formats, 79 platform presets, fit-to-size encoding, compare view, and background removal.',
    ],
    details: ['100% client-side processing', '15 inputs / 12 exports', '79 platform presets', 'WebAssembly media pipeline'],
    accent: '#a3e635',
    cover: fasteditImage1,
    coverBackground:
      'radial-gradient(circle at 18% 14%, rgba(163, 230, 53, 0.28), transparent 30%), radial-gradient(circle at 82% 84%, rgba(236, 72, 153, 0.16), transparent 34%), linear-gradient(135deg, #050708 0%, #0b1110 48%, #141006 100%)',
    rowBackground: 'transparent',
    media: [
      {
        type: 'video',
        src: fasteditVideo,
        poster: fasteditImage1,
        alt: 'FastEdit: product walkthrough',
      },
      { type: 'image', src: fasteditImage1, alt: 'FastEdit: browser media editor' },
      { type: 'image', src: fasteditImage2, alt: 'FastEdit: local media export workflow' },
      { type: 'image', src: fasteditImage3, alt: 'FastEdit: platform presets' },
    ],
  },
  {
    name: 'Terragon: Symbol Of Magic',
    slug: 'terragon',
    type: 'VR game systems',
    status: 'Reality Shift',
    summary: 'Unity/OpenXR VR game systems plus an end-to-end CNN gesture pipeline for recognizing user-drawn hand input from raw 3D coordinates.',
    highlights: [
      'Built the gesture-recognition flow: raw 3D coordinate normalization, dataset preparation, CNN training, and runtime detection.',
      'Owned VR input, interactions, combat encounters, procedural levels, enemies, animation timing, and audio sync.',
    ],
    details: ['Unity + OpenXR', 'CNN gesture recognition', '3D coordinate normalization', 'Procedural levels + enemy AI'],
    accent: '#0ea5e9',
    cover: terragonHeader,
    coverBackground:
      'radial-gradient(circle at 24% 18%, rgba(250, 204, 21, 0.20), transparent 30%), radial-gradient(circle at 80% 82%, rgba(14, 165, 233, 0.24), transparent 34%), linear-gradient(135deg, #082f49 0%, #0f766e 52%, #164e63 100%)',
    rowBackground: 'transparent',
    media: [
      {
        type: 'video',
        src: 'https://www.youtube.com/watch?v=nltFf7j5U-E',
        poster: terragonHeader,
        alt: 'Terragon: VR gameplay trailer',
      },
      { type: 'image', src: terragonImage1, alt: 'Terragon: gameplay screenshot' },
      { type: 'image', src: terragonImage2, alt: 'Terragon: VR environment screenshot' },
      { type: 'image', src: terragonImage3, alt: 'Terragon: combat encounter screenshot' },
    ],
  },
  {
    name: 'Editorial Grant Agent',
    slug: 'grant-agent',
    type: 'AI research automation',
    status: 'Q.E.D Science',
    summary: 'End-to-end AI workflow for editorial grant discovery, eligibility screening, evidence gathering, and application drafting.',
    highlights: [
      'Owned the full pipe: frontend product flow, backend orchestration, data flow, and the AI engine in the middle.',
      'Built tool-backed AI workflows for discovery, fit checks, evidence collection, drafting, review, and repeatable research operations.',
    ],
    details: ['End-to-end product pipe', 'AI engine + tools', 'Eligibility reasoning', 'Draft automation'],
    accent: '#0f766e',
    cover: qedLogo,
    coverFit: 'contain',
    coverBackground:
      'radial-gradient(circle at 74% 22%, rgba(20, 184, 166, 0.28), transparent 32%), radial-gradient(circle at 18% 82%, rgba(240, 253, 250, 0.10), transparent 34%), linear-gradient(135deg, #061a1d 0%, #0b2f2c 48%, #123f3a 100%)',
    rowBackground: 'transparent',
    media: [
      {
        type: 'video',
        src: qedAgentVideo,
        poster: qedAgentPoster,
        alt: 'Grant Agent: workflow walkthrough',
      },
    ],
  },
  {
    name: 'D-ID Product Foundations',
    slug: 'd-id',
    type: 'AI video product engineering',
    status: 'Professional work',
    summary: 'Production engineering across D-ID Studio, Chat, Agents, and API-facing AI video product surfaces.',
    highlights: [
      'Helped build foundations for Studio creation tools, Chat experiences, and Agents.',
      'Led delivery and integration of frontend architecture and API-driven AI workflows.',
    ],
    details: ['AI video product UX', 'React/TypeScript', 'API integration', 'Product architecture at scale'],
    accent: '#ff7a1a',
    cover: didLogo,
    coverFit: 'contain',
    coverBackground:
      'radial-gradient(circle at 72% 34%, rgba(255, 122, 26, 0.30), transparent 28%), radial-gradient(circle at 28% 18%, rgba(255, 255, 255, 0.12), transparent 34%), linear-gradient(135deg, #08111f 0%, #111827 48%, #1f2937 100%)',
    rowBackground: 'transparent',
    media: [
      { type: 'image', src: didImage1, alt: 'D-ID: Studio product interface' },
      { type: 'image', src: didImage2, alt: 'D-ID: Chat product interface' },
      { type: 'image', src: didImage3, alt: 'D-ID: Agents product interface' },
    ],
  },
];

export const skillGroups = [
  {
    title: 'AI Engineer',
    summary: 'Built the Chapeta agent harness and works across LLM apps, RAG, tool use, orchestration, safety gates, and coding-agent workflows.',
    skills: [
      'LLM apps',
      'RAG',
      'Agentic workflows',
      'Tool/function calling',
      'Agent harnesses',
      'Subagents',
      'Context engineering',
      'Prompt engineering',
      'Evaluation',
      'Claude Code',
      'Codex',
      'Cursor',
    ],
  },
  {
    title: 'Frontend',
    summary: 'Interfaces, product surfaces, and frontend architecture that can evolve without locking teams into brittle code.',
    skills: ['React', 'SolidJS', 'Vue', 'AngularJS', 'Vite', 'TypeScript', 'Webpack'],
  },
  {
    title: 'Backend',
    summary: 'Service layers and integrations for products that need reliable workflows, API surfaces, and fast iteration.',
    skills: ['.NET Core', 'Node.js', 'Express.js', 'tRPC', 'REST API', 'GraphQL'],
  },
  {
    title: 'Cloud & delivery',
    summary: 'Practical cloud and delivery experience across startup and enterprise-style environments.',
    skills: ['AWS', 'Google Cloud', 'Azure', 'Git', 'SaaS', 'PaaS', 'IaaS'],
  },
  {
    title: '3D, XR, & games',
    summary: 'Interactive systems, game logic, procedural content, and spatial interfaces.',
    skills: ['Unity', 'OpenXR', 'Game AI', 'Procedural generation', 'Gesture recognition'],
  },
  {
    title: 'Blockchain & Web3',
    summary: 'Smart contracts, wallet analytics, RPC integrations, and product ideas around on-chain data.',
    skills: ['Solidity', 'Smart contracts', 'NFTs', 'Solana RPCs', 'Web3 providers'],
  },
];

export const education = [
  {
    school: 'The College of Management Academic',
    credential: 'B.Sc. in Computer Science',
    period: '2015 - 2018',
  },
  {
    school: 'Mamram Programming Course',
    credential: 'Programming course',
    period: '2014',
  },
];
