import chapetaGeneric from '../../assets/chapeta/generic.webp';
import chapetaModels from '../../assets/chapeta/models.webp';
import chapetaScreenShot from '../../assets/chapeta/screen-shot.webp';
import chapetaSkills from '../../assets/chapeta/skills.webp';
import chapetaTool from '../../assets/chapeta/tool.webp';
import didImage1 from '../../assets/did/1.jpeg';
import didImage2 from '../../assets/did/2.jpeg';
import didImage3 from '../../assets/did/3.jpeg';
import didLogo from '../../assets/did/did.svg';
import fasteditImage1 from '../../assets/fastedit/1.jpeg';
import fasteditImage2 from '../../assets/fastedit/2.jpeg';
import fasteditImage3 from '../../assets/fastedit/3.jpeg';
import fasteditVideo from '../../assets/fastedit/main.webm?url';
import gepetaImage1 from '../../assets/gepeta/1.jpeg';
import gepetaImage2 from '../../assets/gepeta/2.jpeg';
import gepetaImage3 from '../../assets/gepeta/3.jpeg';
import gepetaImage4 from '../../assets/gepeta/4.jpeg';
import gepetaIcon from '../../assets/gepeta/icon.svg';
import gepetaVideo from '../../assets/gepeta/main.mp4?url';
import qedAgentPoster from '../../assets/qed/agent-poster.jpg';
import qedAgentVideo from '../../assets/qed/agent.mp4?url';
import qedLogo from '../../assets/qed/qed.svg';
import terragonImage1 from '../../assets/terragon/1.jpeg';
import terragonImage2 from '../../assets/terragon/2.jpg';
import terragonImage3 from '../../assets/terragon/3.jpg';
import terragonHeader from '../../assets/terragon/header.jpg';

export type ProjectMediaAsset = string | ImageMetadata;

export type ProjectMedia = {
  /** 'image' renders an optimized image, 'video' renders a poster that hydrates native video or an embedded provider on demand */
  type: 'image' | 'video';
  /** Local imported asset metadata or a remote/public URL. */
  src: ProjectMediaAsset;
  /** Poster frame for videos (optional) */
  poster?: ProjectMediaAsset;
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
  cover?: ProjectMediaAsset;
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
    summary: 'Instant AI everywhere on the Mac. One shortcut summons an agent that acts across apps, files, the terminal, and the screen — and drives a goal to completion while you stay in control.',
    highlights: [
      'Challenge: go past chat-in-a-box AI to a real agentic harness that takes a goal and accomplishes the mission on a live desktop.',
      'Role: built the SwiftUI/AppKit menu-bar app end to end — model routing across 100+ models, the agentic loop, tool orchestration (files, shell, AppleScript, screenshots, computer use), subagents, and graduated approvals.',
      'Result: a local-first agent spanning supervised to full autopilot, completing multi-step missions behind one keystroke.',
    ],
    details: ['SwiftUI/AppKit', 'Agentic loop + tool orchestration', 'Computer use & subagents', 'Local-first, graduated approvals'],
    accent: '#c79a45',
    cover: chapetaTool,
    coverBackground:
      'radial-gradient(circle at 18% 14%, rgba(199, 154, 69, 0.24), transparent 30%), radial-gradient(circle at 84% 18%, rgba(87, 70, 45, 0.18), transparent 34%), linear-gradient(135deg, #fbf7ef 0%, #f4ead8 48%, #ead7b7 100%)',
    rowBackground: 'transparent',
    media: [
      { type: 'image', src: chapetaTool, alt: 'Chapeta: AI tool execution workflow' },
      { type: 'image', src: chapetaGeneric, alt: 'Chapeta: macOS AI assistant' },
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
    status: 'Shipped product',
    summary: 'An AI life-tracking SaaS that turns messy personal inputs into structured finance, health, and productivity records users can search, analyze, and act on.',
    highlights: [
      'Challenge: make personal tracking effortless enough to become a daily habit.',
      'Role: built the AI extraction and routing core, then shaped the product flows around text, voice, images, spreadsheets, privacy, and dashboards.',
      'Result: a cross-platform product that structures records across 13 life aspects from text, voice, photos, and spreadsheets.',
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
    type: 'Last-mile media editor',
    status: 'Shipped product',
    summary: 'A local-first last-mile media editor for the file fixes that happen right before posting, sending, or publishing — convert, compress, trim, crop, redact, and export without uploading private files.',
    highlights: [
      'Challenge: help users finish the small but blocking media tasks that usually send them hunting across upload-based tools.',
      'Role: built the local editing engine for stills, animations, and short video, with fit-to-size export, presets, timeline tools, overlays, filters, blur/redaction, and batch flows.',
      'Result: a shipped privacy-first tool supporting 15 input families, 12 export formats, and 79 platform presets.',
    ],
    details: ['Last-mile media fixes', '100% client-side processing', '15 inputs / 12 exports', '79 platform presets'],
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
    summary: 'A VR game systems build that combined real-time interaction design, procedural gameplay, enemy behavior, and ML-backed gesture recognition.',
    highlights: [
      'Challenge: make hand-drawn VR gestures reliable enough to feel like part of the core combat loop.',
      'Role: built the gesture-recognition flow from raw 3D coordinate normalization through dataset preparation, CNN training, and runtime detection.',
      'Result: shipped and sold a fully functional VR game with core systems across input, interactions, combat, procedural levels, enemy AI, animation timing, and audio sync.',
    ],
    details: ['Unity + OpenXR', 'CNN gestures', '3D normalization', 'Procedural AI levels'],
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
    summary: 'An AI research automation workflow that turns grant discovery, eligibility checks, evidence gathering, and drafting into a repeatable product flow.',
    highlights: [
      'Challenge: convert a high-context editorial research process into software that can reason, gather evidence, and draft reliably.',
      'Role: owned the full product pipe across frontend workflows, backend orchestration, data flow, and the tool-backed AI engine.',
      'Result: repeatable research operations for discovery, fit checks, evidence collection, drafting, review, and application preparation.',
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
    summary: 'Production product engineering across D-ID Studio, Chat, Agents, and API-facing AI video surfaces used to create and integrate generative video workflows.',
    highlights: [
      'Challenge: build product foundations that could support multiple AI video surfaces as the platform expanded.',
      'Role: led delivery and integration work across frontend architecture, API-driven workflows, Studio creation tools, Chat experiences, Agents, and API contributions.',
      'Result: durable product foundations for core D-ID experiences that could evolve across creation, conversation, agents, and developer-facing workflows.',
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
