export interface DisciplineItem {
  id: string;
  label: string;
  headline: string;
  subline: string;
  stack: string;
  highlightProject: string;
  highlightUrl: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Mobile' | 'Full-Stack' | 'AI & ML' | '3D & Games';
  featured?: boolean;
  role: string;
  year: string;
  summary: string;
  impact: string[];
  stack: string[];
  links: {
    label: string;
    url: string;
    type: 'live' | 'github' | 'store' | 'model';
  }[];
  visualTheme: 'onyx' | 'funderaa' | 'fitfortis' | 'crossencoder' | 'neon' | 'aurum' | 'amazon' | 'portfolio';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const PROFILE = {
  name: 'Muhammad Tayyab',
  shortTitle: 'Software Engineer',
  roles: 'Software Engineer · Full-Stack Developer · Flutter / Mobile Developer',
  email: 'tayyabmu8@gmail.com',
  phone: '+92 333 8989667',
  github: 'https://github.com/ZapTayyab',
  linkedin: 'https://www.linkedin.com/in/muhammad-tayyab-524716314/',
  legacyPortfolio: 'https://zaptayyab.github.io/MyPortfolio/',
  resumePdf: '/assets/aistudio/final_resume_34ba35f8.pdf',
  summary:
    'Software Engineer building production web applications, cross-platform mobile apps, backend services, and AI evaluation workflows. Experienced in translating client requirements into responsive products, integrating cloud data and authentication, and verifying reliability with Cypress and Selenium.',
};

export const HERO_DISCIPLINES: DisciplineItem[] = [
  {
    id: 'mobile',
    label: 'FLUTTER & MOBILE',
    headline: 'Cross-Platform Apps on Google Play',
    subline: 'Flutter, Dart, React Native, Kotlin & Gradle build pipelines with Firebase cloud sync.',
    stack: 'Flutter · Dart · Kotlin · Firebase',
    highlightProject: 'Funderaa & Fitfortis',
    highlightUrl: 'https://play.google.com/store/apps/details?id=com.funderaa.app&pcampaignid=web_share',
  },
  {
    id: 'ai',
    label: 'AI EVALUATION',
    headline: 'LLM Safety, Robustness & Reranking',
    subline: 'Regression evaluation suites for LLM safety alongside trained Sentence Transformer cross-encoders.',
    stack: 'Onyx AI · Sentence Transformers · Cypress',
    highlightProject: 'Onyx AI Infrastructure',
    highlightUrl: 'https://github.com/ZapTayyab/Onyx-Ai',
  },
  {
    id: 'fullstack',
    label: 'FULL-STACK WEB',
    headline: 'End-to-End Web Platforms & APIs',
    subline: 'Responsive React frontends paired with Node.js, Express, PHP, SQL & MongoDB backends.',
    stack: 'React.js · Node.js · Express · MySQL',
    highlightProject: 'Aurum UAE & 8x Workflows',
    highlightUrl: 'https://zaptayyab.github.io/Aurum/',
  },
  {
    id: 'webgl',
    label: '3D & WEBGL',
    headline: 'Interactive Browser 3D & Motion',
    subline: 'Real-time JavaScript 3D game loops, Three.js spatial scenes, and choreographed GSAP motion.',
    stack: 'Three.js · GSAP · JavaScript · Canvas',
    highlightProject: 'Neon Star Saler',
    highlightUrl: 'https://neon-star-saler.vercel.app/',
  },
  {
    id: 'cloud',
    label: 'CLOUD & TESTING',
    headline: 'E2E Verification & Cloud Persistence',
    subline: 'Automated component and E2E testing with Cypress & Selenium; deployed via Docker, Vercel & Firebase.',
    stack: 'Cypress · Selenium · Docker · Firestore',
    highlightProject: 'View GitHub Profile',
    highlightUrl: 'https://github.com/ZapTayyab',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'onyx-ai',
    title: 'Onyx AI — LLM Evaluation Infrastructure',
    subtitle: 'AI Safety, Robustness & Regression Testing Platform',
    category: 'AI & ML',
    featured: true,
    role: 'Full-Stack Developer Intern (ZYNVEX SOL)',
    year: '2026',
    summary:
      'Contributed to an AI evaluation platform engineered for LLM safety, robustness checks, and automated regression workflows. Authored end-to-end and component verification suites using Cypress and Selenium.',
    impact: [
      'Structured LLM safety and robustness evaluation workflows for repeatable regression checks.',
      'Executed component and full end-to-end browser test coverage with Cypress and Selenium.',
      'Verified critical UI evaluation pipelines against edge-case prompt payloads.',
    ],
    stack: ['React.js', 'Node.js', 'Cypress', 'Selenium', 'LLM Evaluation'],
    links: [
      { label: 'View Repository', url: 'https://github.com/ZapTayyab/Onyx-Ai', type: 'github' },
    ],
    visualTheme: 'onyx',
  },
  {
    id: 'funderaa',
    title: 'Funderaa — Cross-Platform Investment App',
    subtitle: 'Blockchain-Powered Startup Funding Marketplace',
    category: 'Mobile',
    role: 'Solo Developer',
    year: '2025',
    summary:
      'Solo-engineered cross-platform mobile application connecting small businesses with prospective investors to support startup capital formation, shipped directly to Google Play.',
    impact: [
      'Designed and built the complete mobile client and backend integration as solo developer.',
      'Implemented blockchain-backed investment flows and real-time user authentication.',
      'Resolved Android Gradle/Kotlin release configuration and published to Google Play Store.',
    ],
    stack: ['Flutter', 'Dart', 'Firebase Auth', 'Firestore', 'Blockchain'],
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.funderaa.app&pcampaignid=web_share',
        type: 'store',
      },
    ],
    visualTheme: 'funderaa',
  },
  {
    id: 'cross-encoder',
    title: 'Cross-Encoder Reranking Model',
    subtitle: 'Semantic Search & Hard-Negative Text Pair Scoring',
    category: 'AI & ML',
    role: 'ML Engineer',
    year: '2026',
    summary:
      'Trained a cross-encoder neural architecture with Sentence Transformers to score query-document text pairs for high-precision semantic search and search-result reranking.',
    impact: [
      'Fine-tuned cross-encoder weights with hard-negative pair sampling for tighter relevance ranking.',
      'Published model weights and inference card openly on Hugging Face Hub.',
    ],
    stack: ['Sentence Transformers', 'Cross-Encoder', 'Semantic Search', 'Python'],
    links: [
      {
        label: 'Hugging Face Model',
        url: 'https://huggingface.co/Tayyab112/crossencoder-hardneg',
        type: 'model',
      },
    ],
    visualTheme: 'crossencoder',
  },
  {
    id: 'fitfortis',
    title: 'Fitfortis — Fitness Application',
    subtitle: 'Backend Architecture & Multi-Client Sync',
    category: 'Mobile',
    role: 'Backend Engineer',
    year: '2025',
    summary:
      'Contributed as backend engineer for a production fitness mobile application, structuring cloud data models, API routes, and repository organization for the engineering team.',
    impact: [
      'Architected backend services, data persistence schemas, and API endpoints.',
      'Coordinated project organization and integration workflows with frontend mobile teammates.',
      'Published live on Google Play Store.',
    ],
    stack: ['Node.js', 'REST APIs', 'Firebase', 'SQL', 'Project Architecture'],
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.dualfitness.app&pcampaignid=web_share',
        type: 'store',
      },
    ],
    visualTheme: 'fitfortis',
  },
  {
    id: 'neon-star-saler',
    title: 'Neon Star Saler — 3D Browser Game',
    subtitle: 'Interactive WebGL Gameplay & Visual Effects',
    category: '3D & Games',
    role: 'Game & Frontend Developer',
    year: '2026',
    summary:
      'Created a browser-based 3D game in JavaScript featuring responsive real-time gameplay mechanics, custom particle visual effects, and frame-rate performance tuning.',
    impact: [
      'Built interactive 3D gameplay loop, collision physics, and responsive player controls.',
      'Tuned rendering pipeline for smooth browser frame pacing and deployed live on Vercel.',
    ],
    stack: ['JavaScript', '3D Rendering', 'WebGL', 'Vercel'],
    links: [
      { label: 'Live Demo', url: 'https://neon-star-saler.vercel.app/', type: 'live' },
      { label: 'Source Code', url: 'https://github.com/ZapTayyab/Neon-star-saler', type: 'github' },
    ],
    visualTheme: 'neon',
  },
  {
    id: 'aurum',
    title: 'Aurum — UAE Business Platform',
    subtitle: 'International Enterprise Web Presence',
    category: 'Full-Stack',
    role: 'Full-Stack Developer',
    year: '2026',
    summary:
      'Developed the production business website for Aurum, an international enterprise based in the UAE, alongside custom web solution outreach for hospitality and restaurant teams.',
    impact: [
      'Translated international client brand requirements into a responsive commercial web interface.',
      'Delivered fast static edge hosting with structured service presentation.',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI/UX'],
    links: [
      { label: 'Live Website', url: 'https://zaptayyab.github.io/Aurum/', type: 'live' },
    ],
    visualTheme: 'aurum',
  },
  {
    id: 'amazon-clone',
    title: 'Amazon Clone — E-Commerce Web App',
    subtitle: '8x Careers Software Engineering Assessment',
    category: 'Full-Stack',
    role: 'Frontend & Workflow Engineer',
    year: '2026',
    summary:
      'Built an Amazon-style e-commerce storefront as a software engineering hiring assessment for 8x Careers, implementing responsive product discovery and core shopping workflows.',
    impact: [
      'Implemented cart state management, responsive catalog layouts, and checkout flow patterns.',
      'Delivered clean modular frontend code meeting strict assessment turnaround.',
    ],
    stack: ['JavaScript', 'HTML5', 'CSS3', 'E-Commerce Workflows'],
    links: [
      { label: 'Live Project', url: 'https://zaptayyab.github.io/amazon_clone/', type: 'live' },
    ],
    visualTheme: 'amazon',
  },
  {
    id: 'personal-portfolio-3d',
    title: 'Three.js & GSAP Interactive Portfolio',
    subtitle: 'Animated Spatial Web Showcase',
    category: '3D & Games',
    role: 'Creative Frontend Developer',
    year: '2025',
    summary:
      'Designed and deployed an animated developer portfolio combining Three.js WebGL scenes with GSAP timeline choreography.',
    impact: [
      'Combined custom Three.js canvas scenes with scroll-triggered GSAP motion.',
    ],
    stack: ['Three.js', 'GSAP', 'JavaScript', 'WebGL'],
    links: [
      { label: 'Live Portfolio', url: 'https://zaptayyab.github.io/MyPortfolio/', type: 'live' },
    ],
    visualTheme: 'portfolio',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'zynvex',
    role: 'Full-Stack Developer Intern',
    company: 'ZYNVEX SOL',
    location: 'Remote',
    period: '2026 – Present',
    bullets: [
      'Contributed to Onyx AI, an AI evaluation platform focused on LLM safety, robustness, and regression testing; performed end-to-end and component testing with Cypress and Selenium.',
      'Built an Amazon-style e-commerce clone as a software-engineering hiring assessment for 8x Careers, implementing responsive UI and core shopping workflows.',
      'Developed Neon Star Saler, a browser-based 3D game using JavaScript, with attention to interactive gameplay, visual effects, and performance.',
      'Developed the Aurum business website for an international UAE-based business and supported outreach to restaurant teams for custom website solutions.',
    ],
  },
  {
    id: 'freelance',
    role: 'Freelance Full-Stack & Mobile App Developer',
    company: 'Independent Practice',
    location: 'Remote',
    period: 'July 2024 – Present',
    bullets: [
      'Gather requirements from clients and deliver web and mobile solutions aligned with business needs.',
      'Build and test cross-platform applications with Flutter and Dart, including a student-management application designed to streamline data entry.',
      'Integrate Firebase Authentication and Firestore for sign-in and cloud data storage in mobile MVPs.',
      'Develop a proposal-generation system using PHP and MySQL to improve document turnaround time.',
      'Create responsive React.js landing pages and troubleshoot Android build issues involving Gradle and Kotlin.',
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Mobile Development',
    items: ['Flutter', 'Dart', 'React Native', 'Android', 'Kotlin', 'Gradle', 'Google Play Console'],
  },
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Three.js', 'GSAP', 'Responsive UI/UX'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'PHP', 'RESTful APIs', 'Authentication', 'Backend Integration'],
  },
  {
    category: 'Databases & Cloud',
    items: ['Firebase', 'Firestore', 'MongoDB', 'SQL', 'MySQL', 'Relational Databases', 'Cloud Storage'],
  },
  {
    category: 'Testing & Tooling',
    items: ['Cypress', 'Selenium', 'Git', 'GitHub', 'Docker Engine', 'XAMPP'],
  },
  {
    category: 'Deployment',
    items: ['Vercel', 'Netlify', 'Firebase Hosting'],
  },
  {
    category: 'AI / Machine Learning',
    items: ['LLM Evaluation & Regression Testing', 'Sentence Transformers', 'Cross-Encoder Training'],
  },
];
