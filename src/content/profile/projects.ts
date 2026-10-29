import chapetaGeneric from '../../assets/chapeta/generic.webp';
import chapetaModels from '../../assets/chapeta/models.webp';
import chapetaScreenShot from '../../assets/chapeta/screen-shot.webp';
import chapetaSkills from '../../assets/chapeta/skills.webp';
import chapetaTool from '../../assets/chapeta/tool.webp';
import didImage1 from '../../assets/did/1.jpeg';
import didImage2 from '../../assets/did/2.jpeg';
import didImage3 from '../../assets/did/3.jpeg';
import fasteditImage1 from '../../assets/fastedit/1.jpeg';
import fasteditImage2 from '../../assets/fastedit/2.jpeg';
import fasteditImage3 from '../../assets/fastedit/3.jpeg';
import fasteditVideo from '../../assets/fastedit/main.webm?url';
import gepetaImage1 from '../../assets/gepeta/1.jpeg';
import gepetaImage2 from '../../assets/gepeta/2.jpeg';
import gepetaImage3 from '../../assets/gepeta/3.jpeg';
import gepetaImage4 from '../../assets/gepeta/4.jpeg';
import gepetaVideo from '../../assets/gepeta/main.mp4?url';
import qedAgentPoster from '../../assets/qed/agent-poster.jpg';
import qedAgentVideo from '../../assets/qed/agent.mp4?url';
import terragonImage1 from '../../assets/terragon/1.jpeg';
import terragonImage2 from '../../assets/terragon/2.jpg';
import terragonImage3 from '../../assets/terragon/3.jpg';
import terragonHeader from '../../assets/terragon/header.jpg';
import timelionIcon from '../../assets/timelion/icon.svg';
import writorIcon from '../../assets/writor/icon.svg';

export type ProjectMedia = { type: 'image'; src: ImageMetadata; alt: string } | { type: 'video' | 'youtube'; src: string; poster: ImageMetadata; alt: string };

export type Project = {
  name: string;
  url?: string;
  slug: string;
  type: string;
  status: string;
  summary: string;
  highlights: string[];
  details: string[];
  /** Images first: the first item is the card's preview and its structured-data image. */
  media: [ProjectMedia, ...ProjectMedia[]];
};

export const projects: Project[] = [
  {
    name: 'Gepeta',
    url: 'https://gepeta.app',
    slug: 'gepeta',
    type: 'Life and money tracker',
    status: 'Live',
    summary: "Say what you bought, snap the receipt, or drop in the monthly sheet. It's recorded properly, and I know where every dollar goes in ten minutes a month.",
    highlights: [
      'The problem: forms make me want to quit. Every tracker I tried died within a week, and the spreadsheets were worse.',
      'The PaPP: AI turns text, voice, photos and spreadsheets into structured records across 13 parts of life, from spending to health.',
      'The outcome: my savings goal and its progress, visible at a glance. It grew from a PaPP into a product anyone can use.',
    ],
    details: ['Text, voice, photos, spreadsheets', '13 life aspects', 'Web + iOS', 'Live at gepeta.app'],
    media: [
      { type: 'image', src: gepetaImage1, alt: 'Gepeta: home screen with an AI prompt input' },
      { type: 'image', src: gepetaImage2, alt: 'Gepeta: extracting dinner details from a pizza photo' },
      { type: 'image', src: gepetaImage3, alt: 'Gepeta: financial analytics dashboard with budget progress bars' },
      { type: 'image', src: gepetaImage4, alt: 'Gepeta: spending analysis dashboard with category trend charts' },
      {
        type: 'video',
        src: gepetaVideo,
        poster: gepetaImage1,
        alt: 'Gepeta: product walkthrough',
      },
    ],
  },
  {
    name: 'Writor',
    url: 'https://writor.orcaryn.com',
    slug: 'writor',
    type: 'Writing editor',
    status: 'Release ready',
    summary: 'An essay editor with a teacher that marks my mistakes and never rewrites me. I built it to get better at English, my second language.',
    highlights: [
      'The problem: I draft with pen and paper and edit on the laptop. Moving the text over was a chore, and AI tools kept rewriting my English instead of teaching me.',
      "The PaPP: I snap a page with my phone and it lands in the editor, transcribed. A teacher chat points at what's weak and remembers what I keep getting wrong.",
      'The outcome: I get the feedback and do the rewrite myself, so the drafts stay mine.',
    ],
    details: ['Teacher, not ghostwriter', 'Desktop app', 'Drafts stay local', 'Bring your own model'],
    media: [{ type: 'image', src: writorIcon, alt: 'Writor: app icon' }],
  },
  {
    name: 'Chapeta',
    url: 'https://chapeta.net',
    slug: 'chapeta',
    type: 'Mac AI companion',
    status: 'Live, used every day',
    summary: 'An AI that works across my Mac, one shortcut away. Any model, my files, the web, and it makes images, video and audio.',
    highlights: [
      "The problem: chat AI couldn't touch my files, my apps or my screen, and the coding tools assumed I wanted to code.",
      'The PaPP: a native macOS app with 100+ models, files, the terminal, screenshots and computer use. I decide how much it may do alone.',
      "The outcome: the harness I use every day. It's also the one I recommend for building your first PaPP.",
    ],
    details: ['Native macOS', '100+ models', 'Files, terminal, screen', 'Approvals you set'],
    media: [
      { type: 'image', src: chapetaTool, alt: 'Chapeta: working with a macOS Finder window and desktop files' },
      { type: 'image', src: chapetaGeneric, alt: 'Chapeta: floating command bar on a Mac desktop' },
      { type: 'image', src: chapetaModels, alt: 'Chapeta: command bar ready for model and tool selection' },
      { type: 'image', src: chapetaSkills, alt: 'Chapeta: command bar with search, agent, and skills controls' },
      { type: 'image', src: chapetaScreenShot, alt: 'Chapeta: browser search results while the command bar stays active' },
    ],
  },
  {
    name: 'TimeLion',
    slug: 'timelion',
    type: 'Day timeline for macOS',
    status: 'Release ready',
    summary: 'A thin timeline of my day that floats above every window: my routine, my calendars and my breaks.',
    highlights: [
      'The problem: my calendar showed meetings, not the routine I try to keep, and I kept losing track of time.',
      'The PaPP: a bar with a red line for now, my routine kept apart from the calendar, and drag to change any block.',
      'The outcome: I see the whole day without opening anything, and a warning comes a few minutes before every block ends.',
    ],
    details: ['Native macOS', 'Routine + every calendar', 'Always in view', 'Drag to change'],
    media: [{ type: 'image', src: timelionIcon, alt: 'TimeLion: app icon' }],
  },
  {
    name: 'FastEdit',
    url: 'https://fastedit.net',
    slug: 'fastedit',
    type: 'Last-mile media editor',
    status: 'Shipped product',
    summary:
      'A local-first last-mile media editor for the file fixes that happen right before posting, sending, or publishing — convert, compress, trim, crop, redact, and export without uploading private files.',
    highlights: [
      'Challenge: help users finish the small but blocking media tasks that usually send them hunting across upload-based tools.',
      'Role: built the local editing engine for stills, animations, and short video, with fit-to-size export, presets, timeline tools, overlays, filters, blur/redaction, and batch flows.',
      'Result: a shipped privacy-first tool supporting 15 input families, 12 export formats, and 79 platform presets.',
    ],
    details: ['Last-mile media fixes', '100% client-side processing', '15 inputs / 12 exports', '79 platform presets'],
    media: [
      { type: 'image', src: fasteditImage1, alt: 'FastEdit: video editor with timeline clips and overlay controls' },
      { type: 'image', src: fasteditImage2, alt: 'FastEdit: image editor with export quality and format controls' },
      { type: 'image', src: fasteditImage3, alt: 'FastEdit: upload screen listing supported media formats' },
      {
        type: 'video',
        src: fasteditVideo,
        poster: fasteditImage1,
        alt: 'FastEdit: video editing timeline walkthrough',
      },
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
    media: [
      {
        type: 'video',
        src: qedAgentVideo,
        poster: qedAgentPoster,
        alt: 'Grant Agent: grant review workflow walkthrough',
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
    media: [
      { type: 'image', src: didImage1, alt: 'D-ID: Studio video library dashboard' },
      { type: 'image', src: didImage2, alt: 'D-ID: agent builder with avatar selection and chat preview' },
      { type: 'image', src: didImage3, alt: 'D-ID: API documentation quickstart dashboard' },
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
    media: [
      { type: 'image', src: terragonImage1, alt: 'Terragon: Symbol Of Magic: VR gameplay with hand-cast fire spells' },
      { type: 'image', src: terragonImage2, alt: 'Terragon: Symbol Of Magic: Symbol of Magic character cover art' },
      { type: 'image', src: terragonImage3, alt: 'Terragon: Symbol Of Magic: combat encounter with an enemy health bar' },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/nltFf7j5U-E',
        poster: terragonHeader,
        alt: 'Terragon: Symbol of Magic VR gameplay trailer',
      },
    ],
  },
];
