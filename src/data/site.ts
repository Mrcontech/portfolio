/**
 * ---------------------------------------------------------------------------
 * ALL CONTENT LIVES HERE. Edit this file to change anything on the site.
 * ---------------------------------------------------------------------------
 * Content sourced from the live portfolio at mrcontech.vercel.app.
 *
 * TODO(you): two sections still need real input —
 *   1. `experience` is empty (the section hides itself until you add roles).
 *   2. Projects 4–8 have short descriptions inferred from their titles;
 *      replace them with real copy. Dates/status are marked TBC.
 */

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'twitter' | 'linkedin' | 'email' | 'instagram' | 'resume'
  /** renders as a <button> instead of an <a> (copy-to-clipboard style action) */
  asButton?: boolean
  copyValue?: string
  download?: boolean
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  logo: string
  logoClass?: string
  bullets: string[]
}

export interface SkillItem {
  name: string
  icon: string
  colorClass: string
}

export interface ProjectLink {
  label: 'Live' | 'GitHub'
  href: string
  variant: 'rainbow' | 'dark'
}

export interface Project {
  title: string
  date: string
  status: string
  description: string
  tags: string[]
  image: string
  video?: string
  links: ProjectLink[]
}

export interface ProjectTab {
  id: string
  label: string
  projects: Project[]
}

export const profile = {
  greeting: 'Hi, I’m',
  name: 'Okereke Excellence',
  verified: true,
  // Must stay on ONE line at 390px beside the avatar. Measured: the slot is
  // 209px there, and this renders at 179px. Keep any replacement under ~205px.
  tagline: 'engineer, founder, night-shipper',
  avatar: '/img/profile-avatar.png',
  avatarAlt: 'Okereke Excellence profile picture',
  ctaLabel: 'Book A Call!',
  ctaHref: 'https://cal.com/mrcontech',
}

/**
 * The intro paragraph is built from segments so inline brand icons and the
 * hand-drawn underline annotation land in the right places.
 */
export type BioSegment =
  | { kind: 'text'; value: string }
  | { kind: 'strong'; value: string }
  | { kind: 'annotated'; value: string }
  | { kind: 'tech'; value: string; icon: string }

export const bio: BioSegment[] = [
  { kind: 'text', value: 'I’m a ' },
  { kind: 'annotated', value: 'Full Stack Developer' },
  { kind: 'text', value: ' & SaaS/AI engineer with 3+ years shipping scalable web apps, and founder of ' },
  { kind: 'strong', value: 'Mrcontech' },
  { kind: 'text', value: '. I help founders turn ideas into seamless digital experiences, fast. I use ' },
  { kind: 'tech', value: 'Next.js', icon: 'nextjs' },
  { kind: 'text', value: ' and ' },
  { kind: 'tech', value: 'React', icon: 'react' },
  { kind: 'text', value: ' to build frontends, ' },
  { kind: 'tech', value: 'Node.js', icon: 'nodejs' },
  { kind: 'text', value: ' for backends, databases like ' },
  { kind: 'tech', value: 'PostgreSQL', icon: 'postgresql' },
  { kind: 'text', value: ' and ' },
  { kind: 'tech', value: 'Supabase', icon: 'supabase' },
  { kind: 'text', value: ', and I build AI features on the ' },
  { kind: 'tech', value: 'OpenAI', icon: 'openai' },
  { kind: 'text', value: ' and Claude APIs.' },
]

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/mrcontech', icon: 'github' },
  { label: 'Twitter', href: 'https://x.com/mrcontech', icon: 'twitter' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/okereke-excellence-723597361',
    icon: 'linkedin',
  },
  { label: 'Email', href: 'mailto:okerekeexcellence89@gmail.com', icon: 'email' },
  // Drop your CV at public/resume.pdf and this downloads it.
  { label: 'Resume', href: '/resume.pdf', icon: 'resume', download: true },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Mvpixel',
    role: 'Founder & SaaS Developer',
    period: 'March 2025 – Present',
    logo: '/img/mvpixel-logo.png',
    bullets: [
      'Run Mvpixel (mvpixel.vercel.app), a web development agency that takes startup ideas from concept to launched MVP in 21 days.',
      'Build and ship full-stack SaaS MVPs end to end for early-stage founders, covering scoping, architecture, development and deployment.',
      'Integrate AI features into client products with the OpenAI and Claude APIs, delivering intelligent automation and LLM-powered functionality.',
      'Ship real-time prototypes from day one, so founders iterate on working features instead of static mockups, then architect every build to handle real users from launch.',
      'Develop mobile experiences with React Native and browser tools with Chrome Extensions, and deliver clean codebases founders can maintain after launch.',
    ],
  },
  {
    company: 'Max Scott Property',
    role: 'Lead Technical Developer',
    period: 'April 2026 – Present',
    logo: '/img/maxscott-logo.svg',
    bullets: [
      'Lead technical developer, building and shipping several products across the property and supported-living space.',
      'Built the flagship product LeaseIQ (lease-iq.co), a leaseability and match engine that connects landlords with vetted supported-living care providers.',
      'Designed the provider intelligence layer that scores providers across multiple quality dimensions and keeps verified regulatory data current.',
      'Delivered the matching and lease-progression workflow now operating across England, Wales and Scotland.',
    ],
  },
  {
    company: 'AuditPulse',
    role: 'Founder',
    period: 'February 2026 – Present',
    logo: '/img/auditpulse-logo.png',
    bullets: [
      'Founded AuditPulse (audit-pulse2-0.vercel.app), an AI-powered website audit strategist that scans a site, tracks progress over time and benchmarks it against competitors.',
      'Built AI site scanning across Core Web Vitals, security, content gaps and broken links, surfacing prioritised, actionable fixes rather than raw data.',
      'Shipped the AI strategic assistant, fix-it checklists, historical trend charts and competitor battle mode.',
      'Added SWOT analysis, growth insights and premium PDF report export for client-ready deliverables.',
    ],
  },
  {
    company: 'Africonnect Global Ltd.',
    role: 'Software Developer',
    period: '2024 – 2025',
    logo: '/img/africonnect-logo.svg',
    bullets: [
      'Led full development of the core infrastructure powering the Africonnect platform, ensuring scalability and reliability across all services.',
      'Managed backend infrastructure and migrated the company to self-hosted services, reducing third-party dependency costs and improving deployment flexibility.',
      'Redesigned the company landing page end to end, achieving roughly a 50% increase in conversion rate through improved UX, messaging and optimised user flows.',
    ],
  },
]

export const skills: SkillItem[] = [
  { name: 'HTML', icon: 'html5', colorClass: 'text-orange-500' },
  { name: 'CSS', icon: 'css3', colorClass: 'text-blue-500' },
  { name: 'JavaScript', icon: 'javascript', colorClass: 'text-yellow-400' },
  { name: 'TypeScript', icon: 'typescript', colorClass: 'text-blue-600 dark:text-blue-400' },
  { name: 'React', icon: 'react', colorClass: 'text-sky-500' },
  { name: 'Next.js', icon: 'nextjs', colorClass: 'text-black dark:text-white' },
  { name: 'Tailwind CSS', icon: 'tailwind', colorClass: 'text-sky-400' },
  { name: 'Framer Motion', icon: 'framer', colorClass: 'text-neutral-800 dark:text-neutral-200' },
  { name: 'Shadcn', icon: 'shadcn', colorClass: 'text-neutral-800 dark:text-neutral-200' },
  { name: 'Node.js', icon: 'nodejs', colorClass: 'text-green-600' },
  { name: 'Express.js', icon: 'express', colorClass: 'text-gray-800 dark:text-gray-100' },
  { name: 'MongoDB', icon: 'mongodb', colorClass: 'text-green-500' },
  { name: 'MySQL', icon: 'mysql', colorClass: 'text-sky-700 dark:text-sky-400' },
  { name: 'PostgreSQL', icon: 'postgresql', colorClass: 'text-blue-700 dark:text-blue-400' },
  { name: 'Prisma', icon: 'prisma', colorClass: 'text-teal-600 dark:text-teal-300' },
  { name: 'Zustand', icon: 'zustand', colorClass: 'text-amber-700 dark:text-amber-500' },
  { name: 'Zod', icon: 'zod', colorClass: 'text-blue-600 dark:text-blue-400' },
  { name: 'Git', icon: 'git', colorClass: 'text-orange-600' },
  { name: 'GitHub', icon: 'githubMark', colorClass: 'text-black dark:text-white' },
  { name: 'Vercel', icon: 'vercel', colorClass: 'text-black dark:text-white' },
  { name: 'Postman', icon: 'postman', colorClass: 'text-orange-500' },
  { name: 'Java', icon: 'java', colorClass: 'text-red-500' },
  { name: 'Linux', icon: 'linux', colorClass: 'text-neutral-800 dark:text-neutral-200' },
  { name: 'pnpm', icon: 'pnpm', colorClass: 'text-amber-500' },
]

export const projectTabs: ProjectTab[] = [
  {
    id: 'web-apps',
    label: 'Web Apps',
    projects: [
      {
        title: 'AuraCargo',
        date: '2025',
        status: 'Completed',
        // NOTE: your resume lists this stack as Next.js/Node/PostgreSQL/Prisma,
        // while your portfolio site lists React/Firebase/Express/MongoDB.
        // Using the resume's. Tell me which is right.
        description:
          'Full-stack logistics MVP with comprehensive admin and user dashboards for end-to-end shipment tracking, management and reporting.',
        tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
        image: '/img/auracargo-dashboard.png',
        links: [{ label: 'Live', href: 'https://auracarg.vercel.app', variant: 'rainbow' }],
      },
      {
        title: 'Clueyflow AI',
        date: '2025',
        status: 'Completed',
        description:
          'Full-stack TTS and STT SaaS using AI for advanced text-to-speech and real-time speech-to-text, with fast conversion speeds and a clean user experience.',
        tags: ['Next.js', 'Node.js', 'OpenAI API', 'WebSockets', 'Tailwind CSS'],
        image: '/img/clueyflow-ai.png',
        links: [{ label: 'Live', href: 'https://clueyflow.vercel.app', variant: 'rainbow' }],
      },
      {
        title: 'Africonect',
        date: '2026',
        status: 'In Production',
        description:
          'Content marketing tailored for African businesses. An AI content platform that creates regionally relevant, multilingual content with culturally-aware validation.',
        tags: ['Next.js', 'OpenAI', 'TensorFlow', 'Python', 'React'],
        image: '/img/africonect.png',
        links: [{ label: 'Live', href: 'https://africonect.vercel.app', variant: 'rainbow' }],
      },
      {
        title: 'MPS AI',
        date: 'TBC',
        status: 'Completed',
        description: 'An AI-powered web application.\nReplace this with the real description.',
        tags: ['Next.js', 'React', 'TypeScript'],
        image: '/img/mps-ai.png',
        links: [{ label: 'Live', href: 'https://mps-ai.vercel.app', variant: 'rainbow' }],
      },
    ],
  },
  {
    id: 'web3',
    label: 'Web3',
    projects: [
      {
        title: 'DEJAK',
        date: 'TBC',
        status: 'Completed',
        description: 'An NFT platform.\nReplace this with the real description.',
        tags: ['Next.js', 'React', 'TypeScript'],
        image: '/img/dejak-nft.png',
        links: [{ label: 'Live', href: 'https://dejak.vercel.app', variant: 'rainbow' }],
      },
      {
        title: 'BadApe Club',
        date: 'TBC',
        status: 'Completed',
        description: 'An NFT collection site.\nReplace this with the real description.',
        tags: ['Next.js', 'React', 'Tailwind CSS'],
        image: '/img/badape-club.png',
        links: [{ label: 'Live', href: 'https://badape.vercel.app', variant: 'rainbow' }],
      },
      {
        title: 'CoinOrbit',
        date: 'TBC',
        status: 'Completed',
        description: 'A crypto platform.\nReplace this with the real description.',
        tags: ['Next.js', 'React', 'TypeScript'],
        image: '/img/coinorbit-crypto.png',
        links: [{ label: 'Live', href: 'https://coinorbit.vercel.app', variant: 'rainbow' }],
      },
    ],
  },
  {
    id: 'media',
    label: 'Media ✧',
    projects: [
      {
        title: 'Vixcz',
        date: 'TBC',
        status: 'Completed',
        description: 'A video platform.\nReplace this with the real description.',
        tags: ['Next.js', 'React', 'TypeScript'],
        image: '/img/vixcz-video.png',
        links: [{ label: 'Live', href: 'https://vixcz.vercel.app', variant: 'rainbow' }],
      },
    ],
  },
  {
    /**
     * From your resume. Descriptions and stacks are real; the preview images are
     * generated placeholders because these aren't on your portfolio site.
     * Drop real screenshots into public/img/ and update `image` to finish them.
     */
    id: 'saas-tools',
    label: 'SaaS & Tools',
    projects: [
      {
        title: 'AuditPulse',
        date: 'TBC',
        status: 'Completed',
        description:
          'AI-powered website audit copilot that scans for broken links, content gaps, performance issues, security vulnerabilities and market opportunities. Delivers prioritised, actionable insights with PDF export.',
        tags: ['Next.js', 'Node.js', 'Supabase', 'PostgreSQL', 'OpenAI API'],
        image: '/img/ph-auditpulse.svg',
        links: [],
      },
      {
        title: 'Tweetify',
        date: 'TBC',
        status: 'Completed',
        description:
          'Full-stack AI Twitter content planner that auto-generates 7 days of optimised tweet ideas per session, including hooks, thread structures and visual prompt suggestions tailored to your niche.',
        tags: ['Next.js', 'Supabase', 'OpenAI API', 'PostgreSQL', 'Tailwind CSS'],
        image: '/img/ph-tweetify.svg',
        links: [],
      },
      {
        title: 'Swiftx',
        date: 'TBC',
        status: 'Completed',
        description:
          'AI-powered Chrome extension that generates contextually relevant social media replies and repurposes content across platforms, helping creators grow engagement without manual effort.',
        tags: ['Chrome Extensions API', 'JavaScript', 'OpenAI API', 'REST APIs'],
        image: '/img/ph-swiftx.svg',
        links: [],
      },
      {
        title: 'Inspectlens',
        date: 'TBC',
        status: 'Completed',
        description:
          'Chrome extension giving developers one-click access to any site’s CSS, colour palette, typography, images, SVGs and animation files, turning UI inspection and asset extraction into a fast visual workflow.',
        tags: ['Chrome Extensions API', 'JavaScript', 'CSS'],
        image: '/img/ph-inspectlens.svg',
        links: [],
      },
      {
        title: 'Terrastay',
        date: 'TBC',
        status: 'Completed',
        description:
          'Mobile-first real estate marketplace connecting students with verified, campus-adjacent lodges. Features listing management, search filtering and landlord verification workflows.',
        tags: ['React Native', 'Node.js', 'MongoDB', 'REST APIs'],
        image: '/img/ph-terrastay.svg',
        links: [],
      },
    ],
  },
]

export const seeMore = { label: 'SEE MORE', href: 'https://github.com/mrcontech?tab=repositories' }

/** Toolbar booking flow: pick a date here, then hand off to Cal.com. */
export const booking = {
  title: 'Book a call',
  subtitle: '15 min intro, free',
  calUrl: 'https://cal.com/mrcontech/15min',
  note: 'Times are confirmed on Cal.com in your local timezone.',
}

/**
 * Toolbar music player. Swap `playlistId` for any Spotify playlist: open it in
 * Spotify, Share > Copy link, and take the id between /playlist/ and the '?'.
 */
export const music = {
  label: 'Now playing',
  playlistId: '0vvXsWCC9xrXsKd4FyS8kM',
  playlistUrl: 'https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM',
}

export const footer = {
  name: 'Okereke Excellence',
  roleLabel: 'Founder',
  orgLabel: 'Mrcontech',
  orgHref: 'https://mrcontech.vercel.app',
  tailBefore: '& building the ',
  tailItalic: 'future',
  tailAfter: ' ✧.',
  ctaLabel: 'Schedule a Meeting',
  ctaHref: 'https://cal.com/mrcontech',
  madeWith: 'Made with ♡',
  copyright: '© 2026 Okereke Excellence',
}

