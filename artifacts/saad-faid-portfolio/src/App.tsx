import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Contrast, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { type IconType } from 'react-icons';
import { SiAndroidstudio, SiBootstrap, SiCss, SiFigma, SiFirebase, SiFlutter, SiGit, SiGithub, SiGitlab, SiHtml5, SiJavascript, SiLaravel, SiMongodb, SiMysql, SiNodedotjs, SiPhp, SiPostgresql, SiReact, SiSupabase, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import cv from '@assets/Saad_Faid_CV_eng_1786642845741.pdf';
import profile from '@assets/profile_1786643597787.jpeg';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

type Theme = 'signal' | 'mono' | 'turquoise';
const themeLabels: Record<Theme, string> = {
  signal: 'Orange',
  mono: 'B&W',
  turquoise: 'Turquoise',
};
const nextTheme: Record<Theme, Theme> = {
  signal: 'mono',
  mono: 'turquoise',
  turquoise: 'signal',
};

const experiences = [
  { date: 'Jan 2023 — Feb 2023', company: 'OCP Group', detail: 'Direction Générale · Sidi Chennane', role: 'Full Stack Developer Intern', copy: 'Responsive pages, security and performance improvements, and documentation for future iterations.' },
  { date: 'Aug 2024 — Sep 2024', company: 'Innovative Tech Startup', detail: 'Casablanca', role: 'Full Stack Developer Intern', copy: 'A mobile apartment rental and sales experience, plus a web platform for claims, reports and requests.' },
  { date: 'Oct 2024 — Dec 2024', company: 'Assurance Youssef Salah', detail: 'AXA · Khouribga', role: 'Web Developer Intern', copy: 'Accessible internal pages with a focus on performance, security, and independent delivery.' },
];

type WorkFilter = 'all' | 'selected' | 'internship';
type Project = {
  number: string;
  title: string;
  name: string;
  description: string;
  tags: string[];
  category: Exclude<WorkFilter, 'all'>;
  art: string;
  image?: string;
  bg?: string;
  href?: string;
};

const projects: Project[] = [
  { number: '01', title: 'Bghit Nsog', name: 'Car rental mobile app', description: 'A mobile-first rental flow for discovering cars, making reservations, and keeping rental operations moving.', tags: ['Flutter', 'Supabase', 'REST APIs'], category: 'selected', art: 'project-art--car', image: '/images/bghit-nsog.png', bg: '#ff4d14', href: 'https://github.com/SaadFaid/bghit_nsog_landing_page' },
  { number: '02', title: 'A place to land', name: 'Apartment rental & sales mobile experience', description: 'An internship project shaped around browsing properties and making the next step in a rental or sale clearer.', tags: ['Flutter', 'Supabase', 'Figma'], category: 'internship', art: 'project-art--realty' },
  { number: '03', title: 'The fleet, in one place', name: 'Rental agency management platform', description: 'Web surfaces for agencies to coordinate vehicles, reservations, announcements, and fleet availability.', tags: ['React.js', 'Node.js', 'MongoDB'], category: 'selected', art: 'project-art--fleet', image: '/images/rental-car.png', bg: '#2e2e2e' },
  { number: '04', title: 'A clearer queue', name: 'Claims, reports & requests platform', description: 'An internship web platform for organizing claims, reports, and requests in one practical workspace.', tags: ['Laravel', 'PostgreSQL', 'Tailwind CSS'], category: 'internship', art: 'project-art--claims' },
  { number: '05', title: 'Goals Tracker', name: 'Personal goals & habits tracker', description: 'A focused tracker for setting goals, building habits, and keeping progress visible. Add targets, log progress, and stay on track.', tags: ['React', 'TypeScript', 'Tailwind CSS'], category: 'selected', art: 'project-art--goals', image: '/images/goals-tracker.png', bg: '#1b3a1b', href: 'https://github.com/SaadFaid/goals-tracker' },
  { number: '06', title: 'AI-Finance-Tracker', name: 'AI-assisted personal finance tracker', description: 'A finance tracker that pairs clean record-keeping with AI-powered insights on spending, budgets, and saving goals.', tags: ['React', 'Node.js', 'OpenAI', 'PostgreSQL'], category: 'selected', art: 'project-art--finance', image: '/images/ai-finance-tracker.png', bg: '#1a2e4a', href: 'https://github.com/SaadFaid/Finza-AI-Finance-Tracker' },
  { number: '07', title: 'Tchizu Shop', name: 'TypeScript-first e-commerce platform', description: 'A modular e-commerce platform with SSR-rendered storefronts, PostgreSQL persistence, and GraphQL across catalog and checkout.', tags: ['TypeScript', 'Express', 'React (SSR)', 'PostgreSQL', 'GraphQL'], category: 'selected', art: 'project-art--fleet', bg: '#1f2733', href: 'https://github.com/SaadFaid/tchizushop' },
  { number: '08', title: 'Clothing Store', name: 'E-commerce storefront', description: 'A full-featured fashion store: React + TypeScript + Vite frontend, an Express API, Supabase for auth and storage, and Stripe payments.', tags: ['React', 'TypeScript', 'Vite', 'Supabase', 'Stripe'], category: 'selected', art: 'project-art--realty', bg: '#dedbd3', href: 'https://github.com/SaadFaid/clothing-store-' },
  { number: '09', title: 'Loading Screen', name: 'FiveM server loading screen', description: 'A custom FiveM resource that replaces the stock loading screen with branded HTML/CSS/JS art and Lua bindings.', tags: ['JavaScript', 'Lua', 'HTML/CSS'], category: 'selected', art: 'project-art--goals', bg: '#1b3a1b', href: 'https://github.com/SaadFaid/loading-page' },
  { number: '10', title: 'YourAgency Digital', name: 'Agency portfolio website', description: 'A production-ready agency site with a black, white, and turquoise aesthetic, glassmorphism panels, and Framer Motion animations.', tags: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'], category: 'selected', art: 'project-art--finance', bg: '#1a2e4a', href: 'https://github.com/SaadFaid/Novavision-Digital' },
];

type Skill = { name: string; group: string; icon?: IconType };
const skills: Skill[] = [
  { name: 'HTML5', group: 'Frontend', icon: SiHtml5 },
  { name: 'CSS3', group: 'Frontend', icon: SiCss },
  { name: 'JavaScript', group: 'Frontend', icon: SiJavascript },
  { name: 'TypeScript', group: 'Frontend', icon: SiTypescript },
  { name: 'React.js', group: 'Frontend', icon: SiReact },
  { name: 'Tailwind CSS', group: 'Frontend', icon: SiTailwindcss },
  { name: 'Bootstrap', group: 'Frontend', icon: SiBootstrap },
  { name: 'Node.js', group: 'Backend', icon: SiNodedotjs },
  { name: 'Laravel', group: 'Backend', icon: SiLaravel },
  { name: 'PHP', group: 'Backend', icon: SiPhp },
  { name: 'Flutter (iOS / Android)', group: 'Mobile', icon: SiFlutter },
  { name: 'Android Studio', group: 'Mobile', icon: SiAndroidstudio },
  { name: 'Firebase', group: 'Mobile', icon: SiFirebase },
  { name: 'PostgreSQL', group: 'Data', icon: SiPostgresql },
  { name: 'MongoDB', group: 'Data', icon: SiMongodb },
  { name: 'MySQL', group: 'Data', icon: SiMysql },
  { name: 'Supabase', group: 'Data', icon: SiSupabase },
  { name: 'Figma', group: 'Workflow', icon: SiFigma },
  { name: 'Git', group: 'Workflow', icon: SiGit },
  { name: 'GitHub', group: 'Workflow', icon: SiGithub },
  { name: 'GitLab', group: 'Workflow', icon: SiGitlab },
  { name: 'REST APIs', group: 'Workflow' },
];

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Header({ activeSection, theme, onToggleTheme }: { activeSection: string; theme: Theme; onToggleTheme: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const upcomingTheme = nextTheme[theme];
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-7 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between border border-[hsl(var(--foreground)/.2)] bg-[hsl(var(--background)/.88)] px-4 py-3 backdrop-blur-md sm:px-5">
        <a href="#top" onClick={closeMenu} data-testid="link-logo" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center bg-[hsl(var(--accent))] font-mono-ui text-xs font-bold text-[hsl(var(--accent-foreground))] transition-transform group-hover:rotate-6">SF</span>
          <span className="font-mono-ui text-[10px] uppercase tracking-[.15em] text-foreground/70">Saad Faid <span className="text-[hsl(var(--accent))]">/</span> developer</span>
        </a>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`} className={`nav-link font-mono-ui text-[10px] uppercase tracking-[.12em] text-foreground/65 hover:text-foreground ${activeSection === item.href.slice(1) ? 'active text-foreground' : ''}`}>{item.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button type="button" aria-label={`Switch to ${themeLabels[upcomingTheme]} theme`} title={`Switch to ${themeLabels[upcomingTheme]} theme`} aria-pressed={theme !== 'signal'} data-testid="button-theme-toggle" onClick={onToggleTheme} className="inline-flex items-center gap-2 border border-foreground/20 px-3 py-2 font-mono-ui text-[9px] uppercase tracking-[.1em] text-foreground/70 transition-colors hover:border-[hsl(var(--accent))] hover:text-foreground">
            <Contrast className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{themeLabels[theme]}</span>
          </button>
          <a href="#contact" data-testid="link-header-contact" className="hidden items-center gap-2 bg-[hsl(var(--accent))] px-4 py-2.5 font-mono-ui text-[10px] uppercase tracking-[.11em] text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-0.5 sm:inline-flex">Let&apos;s talk <ArrowUpRight className="h-3.5 w-3.5" /></a>
          <button type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu" onClick={() => setMenuOpen((open) => !open)} className="grid h-9 w-9 place-items-center border border-foreground/20 lg:hidden">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mt-2 grid gap-px border border-foreground/20 bg-[hsl(var(--background)/.96)] p-2 backdrop-blur-md lg:hidden" aria-label="Mobile navigation">
          {navItems.map((item) => <a key={item.href} href={item.href} onClick={closeMenu} data-testid={`link-mobile-${item.label.toLowerCase()}`} className="px-4 py-3 font-mono-ui text-[10px] uppercase tracking-[.13em] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">{item.label}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative mx-auto grid min-h-[760px] max-w-[1440px] items-end gap-12 px-6 pb-20 pt-36 lg:grid-cols-[1.12fr_.88fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-48">
      <div className="relative z-10">
        <div className="reveal flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--accent))]"><span className="h-2 w-2 bg-[hsl(var(--accent))]" /> Berrechid, Morocco <span className="text-foreground/30">·</span> open to useful work</div>
        <h1 className="reveal reveal-delay-1 display-title mt-7 max-w-5xl font-display text-[clamp(3rem,9vw,8rem)] font-bold uppercase text-foreground">Build<br /><span className="text-[hsl(var(--accent))]">what matters.</span></h1>
        <div className="reveal reveal-delay-2 mt-9 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <p className="max-w-xl text-base leading-7 text-foreground/65 sm:text-lg">I&apos;m <strong className="text-foreground">Saad Faid</strong>, a Full Stack Web &amp; Mobile Developer. I work from the interface to the API, turning real-world friction into products people can use.</p>
          <a href="#work" data-testid="link-hero-work" className="group inline-flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.12em] text-foreground hover:text-[hsl(var(--accent))]">Scroll to selected work <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1" /></a>
        </div>
      </div>
      <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[460px] lg:ml-auto">
        <div className="absolute -right-4 -top-7 grid h-24 w-24 place-items-center border border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-center text-[hsl(var(--accent-foreground))] sm:-right-8 sm:-top-10 sm:h-32 sm:w-32"><span className="font-mono-ui text-[9px] uppercase leading-4 tracking-[.1em]">Full stack<br />web + mobile</span></div>
        <div className="border border-foreground/20 bg-[hsl(var(--card))] p-3">
          <div className="portrait-window aspect-[.84]">
            <img src={profile} alt="Portrait of Saad Faid" />
            <div className="absolute inset-x-5 bottom-5 z-10 flex items-end justify-between text-[hsl(var(--foreground))]"><div><p className="font-mono-ui text-[9px] uppercase tracking-[.18em] text-[hsl(var(--accent))]">Field note / 01</p><p className="mt-2 font-display text-3xl font-bold leading-none">Curious.<br />Hands-on.</p></div><span className="font-mono-ui text-[9px] text-foreground/50">SF—25</span></div>
          </div>
          <div className="flex items-center justify-between px-1 pt-4 font-mono-ui text-[9px] uppercase tracking-[.13em] text-foreground/50"><span>Developer profile</span><span className="flex items-center gap-2 text-[hsl(var(--accent))]"><i className="h-1.5 w-1.5 bg-[hsl(var(--accent))]" /> Available</span></div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return <div className="overflow-hidden border-y border-foreground/20 bg-[hsl(var(--accent))] py-3.5 text-[hsl(var(--accent-foreground))]"><div className="marquee-track flex items-center gap-8 font-mono-ui text-xs uppercase tracking-[.13em]">{Array.from({ length: 3 }).flatMap((_, index) => [<span key={`${index}-a`}>Interfaces</span>, <span key={`${index}-b`} className="text-[hsl(var(--accent-foreground)/.45)]">/</span>, <span key={`${index}-c`}>APIs</span>, <span key={`${index}-d`} className="text-[hsl(var(--accent-foreground)/.45)]">/</span>, <span key={`${index}-e`}>Mobile thinking</span>, <span key={`${index}-f`} className="text-[hsl(var(--accent-foreground)/.45)]">/</span>])}</div></div>;
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
        <div className="reveal"><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">01 / Point of view</p><h2 className="mt-5 max-w-lg font-display text-5xl font-bold uppercase leading-[.9] sm:text-6xl">Useful is a design choice.</h2></div>
        <div className="reveal reveal-delay-1"><p className="max-w-3xl text-2xl leading-[1.2] text-foreground/80 sm:text-4xl">The best work starts before the first line of code: understand the people, find the friction, then make the next step obvious.</p><div className="mt-14 grid gap-5 border-t border-foreground/20 pt-6 sm:grid-cols-3">{[['03', 'real-world contexts', 'OCP, insurance, and rental products.'], ['02', 'platforms in reach', 'Web systems and mobile experiences.'], ['01', 'way of working', 'Communicate early. Ship with care.']].map(([number, title, copy]) => <div key={title} className="orange-rule relative pt-5"><p className="font-display text-5xl font-bold text-[hsl(var(--accent))]">{number}</p><p className="mt-3 font-mono-ui text-[10px] uppercase tracking-[.1em] text-foreground/75">{title}</p><p className="mt-2 text-sm leading-6 text-foreground/50">{copy}</p></div>)}</div></div>
      </div>
      <div className="reveal reveal-delay-2 mt-24 grid gap-px border border-foreground/20 bg-foreground/20 md:grid-cols-3">{[['01', 'Understand the ground', 'Start with context, constraints, and the small frictions behind a request.'], ['02', 'Build the useful layer', 'Move comfortably from data and APIs to an interface that earns its place.'], ['03', 'Leave the door open', 'Readable code, clear handoffs, and documentation make the next step easier.']].map(([number, title, copy]) => <div key={number} className="group bg-[hsl(var(--background))] p-6 transition-colors hover:bg-[hsl(var(--secondary))] sm:p-8"><span className="font-mono-ui text-[10px] text-[hsl(var(--accent))]">{number}</span><h3 className="mt-16 font-display text-2xl font-bold uppercase">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-foreground/55">{copy}</p></div>)}</div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-[hsl(var(--secondary))]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="reveal flex flex-col justify-between gap-6 border-b border-foreground/20 pb-8 sm:flex-row sm:items-end"><div><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">02 / Experience</p><h2 className="mt-5 font-display text-5xl font-bold uppercase leading-[.86] sm:text-6xl">Where I&apos;ve<br /><span className="text-[hsl(var(--accent))]">put it to work.</span></h2></div><p className="max-w-xs text-sm leading-6 text-foreground/55">Three environments, different rhythms. The common thread: stay adaptable and build for the people on the other side.</p></div>
        <div className="timeline-line relative mt-12">{experiences.map((item, index) => <article key={item.company} className={`reveal reveal-delay-${Math.min(index + 1, 3)} relative grid gap-4 border-b border-foreground/20 py-8 pl-8 sm:grid-cols-[.34fr_.75fr_1fr] sm:gap-10 sm:pl-10`}><span className="timeline-dot absolute left-0 top-10 h-3 w-3 border-2 border-[hsl(var(--accent))] bg-[hsl(var(--secondary))]" /><p className="font-mono-ui text-[10px] uppercase leading-5 tracking-[.08em] text-foreground/50">{item.date}</p><div><h3 className="font-display text-2xl font-bold uppercase">{item.company}</h3><p className="mt-2 text-sm text-[hsl(var(--accent))]">{item.role}</p></div><div><p className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-foreground/45">{item.detail}</p><p className="mt-3 max-w-sm text-sm leading-6 text-foreground/58">{item.copy}</p></div></article>)}</div>
      </div>
    </section>
  );
}

function ProjectVisual({ art, image, bg }: { art: string; image?: string; bg?: string }) {
  const [imageBroken, setImageBroken] = useState(false);
  if (image && !imageBroken) {
    return <div className="project-art project-art--image" style={bg ? { background: bg } : undefined}><img src={image} alt="" onError={() => setImageBroken(true)} /></div>;
  }
  return <div className={`project-art ${art}`}><span className="project-art__signal project-art__signal--one" /><span className="project-art__signal project-art__signal--two" /><span className="project-art__signal project-art__signal--three" /></div>;
}

function Work() {
  const [filter, setFilter] = useState<WorkFilter>('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const filteredProjects = useMemo(() => filter === 'all' ? projects : projects.filter((project) => project.category === filter), [filter]);
  const activeProject = filteredProjects[activeIndex] ?? filteredProjects[0];
  const selectProject = (index: number) => setActiveIndex(index);
  const moveProject = (direction: number) => setActiveIndex((index) => (index + direction + filteredProjects.length) % filteredProjects.length);
  useEffect(() => setActiveIndex(0), [filter]);

  return (
    <section id="work" className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
      <div className="reveal flex flex-col gap-7 border-b border-foreground/20 pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">03 / Selected work</p><h2 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[.86] sm:text-7xl">From problem<br /><span className="text-[hsl(var(--accent))]">to product.</span></h2></div><p className="max-w-xs text-sm leading-6 text-foreground/55">A growing body of work around rentals, real estate, insurance, and the systems behind them.</p></div>
      <div className="reveal reveal-delay-1 mt-8 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">{(['all', 'selected', 'internship'] as WorkFilter[]).map((item) => <button key={item} type="button" aria-pressed={filter === item} data-testid={`button-filter-${item}`} onClick={() => setFilter(item)} className="filter-button border border-foreground/25 px-3 py-2 font-mono-ui text-[9px] uppercase tracking-[.12em] text-foreground/65">{item === 'all' ? 'All work' : item === 'selected' ? 'Selected work' : 'Internship work'}</button>)}</div><span className="font-mono-ui text-[10px] uppercase tracking-[.12em] text-foreground/45">{filteredProjects.length} entries / {activeProject?.number ?? '—'} spotlight</span></div>
      <div className="reveal reveal-delay-2 mt-8 grid items-start gap-5 lg:grid-cols-[1.1fr_.9fr]">
        {activeProject && <div className="grid-panel relative min-h-[480px] overflow-hidden border border-foreground/20 p-3"><ProjectVisual art={activeProject.art} image={activeProject.image} bg={activeProject.bg} /><div className="absolute inset-x-7 bottom-7 z-10 flex items-end justify-between gap-4"><div><p className="font-mono-ui text-[10px] uppercase tracking-[.13em] text-[hsl(var(--accent))]">Spotlight / {activeProject.number}</p><h3 className="mt-3 max-w-xl font-display text-3xl font-bold uppercase leading-[.9] text-foreground sm:text-5xl">{activeProject.title}</h3></div><div className="hidden items-center gap-2 sm:flex">{activeProject.href && <a href={activeProject.href} target="_blank" rel="noreferrer" data-testid={`link-spotlight-${activeProject.number}`} className="inline-flex items-center gap-2 border border-foreground/30 bg-[hsl(var(--background)/.75)] px-3 py-2 font-mono-ui text-[9px] uppercase tracking-[.12em] text-foreground/70 transition-colors hover:border-[hsl(var(--accent))] hover:text-foreground"><Github className="h-4 w-4" /> View on GitHub <ArrowUpRight className="h-3.5 w-3.5" /></a>}<button type="button" aria-label="Previous project" data-testid="button-project-previous" onClick={() => moveProject(-1)} className="grid h-10 w-10 place-items-center border border-foreground/30 bg-[hsl(var(--background)/.75)] transition-colors hover:border-[hsl(var(--accent))]"><ArrowLeft className="h-4 w-4" /></button><button type="button" aria-label="Next project" data-testid="button-project-next" onClick={() => moveProject(1)} className="grid h-10 w-10 place-items-center border border-foreground/30 bg-[hsl(var(--background)/.75)] transition-colors hover:border-[hsl(var(--accent))]"><ArrowRight className="h-4 w-4" /></button></div></div></div>}
        <div className="grid gap-3">{filteredProjects.map((project, index) => <button type="button" key={project.number} data-testid={`button-project-${project.number}`} onClick={() => selectProject(index)} className={`work-card text-left ${project.number === activeProject?.number ? 'is-active' : ''} border border-foreground/20 bg-[hsl(var(--card))] p-5`}><div className="flex items-start justify-between gap-4"><span className={`font-mono-ui text-[10px] ${project.number === activeProject?.number ? 'text-[hsl(var(--accent))]' : 'text-foreground/40'}`}>{project.number}</span><ArrowUpRight className={`h-4 w-4 transition-colors ${project.number === activeProject?.number ? 'text-[hsl(var(--accent))]' : 'text-foreground/30'}`} /></div><p className="mt-7 font-mono-ui text-[9px] uppercase tracking-[.13em] text-foreground/45">{project.name}</p><h3 className="mt-2 font-display text-2xl font-bold uppercase leading-none">{project.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-foreground/52">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="border border-foreground/15 px-2 py-1 font-mono-ui text-[9px] text-foreground/55">{tag}</span>)}</div></button>)}</div>
      </div>
    </section>
  );
}

function Toolkit() {
  const groups = ['Frontend', 'Backend', 'Mobile', 'Data', 'Workflow'];
  return (
    <section id="stack" className="border-y border-foreground/20 bg-[hsl(40_12%_72%)] text-[hsl(var(--background))]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="reveal flex flex-col justify-between gap-8 border-b border-[hsl(var(--background)/.22)] pb-10 lg:flex-row lg:items-end"><div><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">04 / Toolkit</p><h2 className="mt-5 max-w-3xl font-display text-5xl font-bold uppercase leading-[.87] sm:text-7xl">The stack<br /><span className="text-[hsl(var(--accent))]">behind the work.</span></h2></div><p className="max-w-sm text-sm leading-6 text-[hsl(var(--background)/.58)]">Recognizable tools, chosen for the problem in front of me. From structured data to the last interaction.</p></div>
        <div className="reveal reveal-delay-1 mt-10 grid grid-cols-2 gap-px border border-[hsl(var(--background)/.22)] bg-[hsl(var(--background)/.22)] sm:grid-cols-3 lg:grid-cols-5">{groups.map((group) => <div key={group} className="bg-[hsl(40_12%_62%)] p-4 sm:p-5"><p className="font-mono-ui text-[9px] uppercase tracking-[.15em] text-[hsl(var(--background))]">{group}</p><div className="mt-4 grid gap-2">{skills.filter((skill) => skill.group === group).map((skill) => { const Icon = skill.icon; return <div key={skill.name} className="skill-tile flex items-center gap-2 border border-[hsl(var(--background)/.16)] px-2.5 py-3 text-[hsl(var(--background)/.84)]" title={skill.name}>{Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : <span className="grid h-4 w-4 shrink-0 place-items-center border border-current font-mono-ui text-[7px]" aria-hidden="true">R</span>}<span className="font-mono-ui text-[9px] leading-3">{skill.name}</span></div>; })}</div></div>)}</div>
      </div>
    </section>
  );
}

function Foundations() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-16 lg:grid-cols-[1.08fr_.92fr]">
        <div className="reveal"><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">05 / Foundations</p><h2 className="mt-5 font-display text-5xl font-bold uppercase leading-[.86] sm:text-6xl">Keep<br /><span className="text-[hsl(var(--accent))]">moving.</span></h2><div className="mt-12">{[['2023 — 2024', 'Professional University Licence', 'Web & Mobile Engineering · ENSA, Berrechid'], ['2021 — 2023', 'Digital Web Development Diploma', 'Full Stack · OFPPT, Khouribga'], ['2020 — 2021', 'Scientific Baccalaureate', 'Physics & Chemistry · Lycée El General El Kettani, Berrechid']].map(([year, title, detail]) => <div key={title} className="grid gap-2 border-t border-foreground/20 py-5 sm:grid-cols-[.28fr_1fr] sm:gap-8"><span className="font-mono-ui text-[10px] text-foreground/45">{year}</span><div><h3 className="font-display text-xl font-bold uppercase">{title}</h3><p className="mt-1 text-sm leading-6 text-foreground/55">{detail}</p></div></div>)}</div></div>
        <div className="reveal reveal-delay-1 lg:pt-28"><div className="border border-foreground/20 bg-[hsl(var(--secondary))] p-7 sm:p-9"><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">Languages</p><div className="mt-8 space-y-6">{[['Arabic', 'Native', 100], ['English', 'Professional', 78], ['French', 'Intermediate', 64]].map(([language, level, width]) => <div key={language}><div className="flex items-baseline justify-between"><span className="font-display text-2xl font-bold uppercase">{language}</span><span className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-foreground/45">{level}</span></div><div className="mt-3 h-1 bg-[hsl(var(--background))]"><div className="h-full bg-[hsl(var(--accent))]" style={{ width: `${width}%` }} /></div></div>)}</div><div className="mt-10 border-t border-foreground/20 pt-5"><p className="font-mono-ui text-[9px] uppercase tracking-[.13em] text-foreground/45">Working style</p><p className="mt-3 font-display text-2xl font-bold uppercase leading-tight">Teamwork · problem solving · adaptability · communication · time</p></div></div></div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'faid.saadd@gmail.com';
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${email}`; }
  };
  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]">
      <div className="absolute right-[-8rem] top-[-8rem] h-[34rem] w-[34rem] rounded-full border-[70px] border-[hsl(var(--accent-foreground)/.13)]" />
      <div className="relative mx-auto max-w-[1440px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="reveal max-w-5xl"><p className="eyebrow font-mono-ui text-[hsl(var(--accent-foreground)/.68)]">06 / Start a conversation</p><h2 className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[.8] tracking-[-.09em]">Make it<br />work better.</h2><p className="mt-9 max-w-lg text-lg leading-8 text-[hsl(var(--accent-foreground)/.7)]">Tell me what needs to work better. I&apos;d like to hear the context, the constraints, and what a useful outcome looks like.</p></div>
        <div className="reveal reveal-delay-1 mt-14 flex flex-col gap-7 border-t border-[hsl(var(--accent-foreground)/.25)] pt-7 sm:flex-row sm:items-end sm:justify-between"><button type="button" onClick={copyEmail} data-testid="button-copy-email" className="group text-left font-display text-2xl font-bold uppercase transition-colors hover:text-[hsl(var(--accent-foreground)/.7)] sm:text-4xl">{email}<span className="ml-3 inline-block align-middle">{copied ? <Check className="inline h-6 w-6" /> : <ArrowUpRight className="inline h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}</span><span className="block font-mono-ui text-[9px] font-normal uppercase tracking-[.12em] text-[hsl(var(--accent-foreground)/.55)]">{copied ? 'Copied to clipboard' : 'Click to copy email'}</span></button><div className="flex flex-wrap gap-2"><a href={`mailto:${email}`} data-testid="link-email" className="inline-flex items-center gap-2 border border-[hsl(var(--accent-foreground)/.55)] px-4 py-3 font-mono-ui text-[10px] uppercase tracking-[.11em] transition-colors hover:bg-[hsl(var(--accent-foreground))] hover:text-[hsl(var(--accent))]"><Mail className="h-4 w-4" /> Email</a><a href="tel:+212634667536" data-testid="link-phone" className="inline-flex items-center gap-2 border border-[hsl(var(--accent-foreground)/.55)] px-4 py-3 font-mono-ui text-[10px] uppercase tracking-[.11em] transition-colors hover:bg-[hsl(var(--accent-foreground))] hover:text-[hsl(var(--accent))]"><Phone className="h-4 w-4" /> Call</a><a href={cv} download="Saad-Faid-CV.pdf" data-testid="link-download-cv" className="inline-flex items-center gap-2 bg-[hsl(var(--accent-foreground))] px-4 py-3 font-mono-ui text-[10px] uppercase tracking-[.11em] text-[hsl(var(--accent))] transition-transform hover:-translate-y-1"><Download className="h-4 w-4" /> CV</a></div></div>
        <div className="reveal reveal-delay-2 mt-20 grid gap-8 border-t border-[hsl(var(--accent-foreground)/.25)] pt-7 sm:grid-cols-3"><div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4" /><div><p className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(var(--accent-foreground)/.55)]">Based in</p><p className="mt-2 text-sm">Berrechid, Morocco</p></div></div><a href="https://www.linkedin.com/in/saad-faid/" target="_blank" rel="noreferrer" data-testid="link-linkedin" className="flex items-start gap-3 transition-opacity hover:opacity-65"><Linkedin className="mt-0.5 h-4 w-4" /><div><p className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(var(--accent-foreground)/.55)]">Connect on</p><p className="mt-2 text-sm">LinkedIn <ExternalLink className="ml-1 inline h-3 w-3" /></p></div></a><a href="https://github.com/SaadFaid" target="_blank" rel="noreferrer" data-testid="link-github" className="flex items-start gap-3 transition-opacity hover:opacity-65"><Github className="mt-0.5 h-4 w-4" /><div><p className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(var(--accent-foreground)/.55)]">See the code</p><p className="mt-2 text-sm">GitHub <ExternalLink className="ml-1 inline h-3 w-3" /></p></div></a></div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="bg-[hsl(var(--accent))] px-6 pb-8 text-[hsl(var(--accent-foreground)/.56)] lg:px-10"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-[hsl(var(--accent-foreground)/.25)] pt-5 font-mono-ui text-[9px] uppercase tracking-[.12em] sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Saad Faid</span><span>Built by Saad Faid</span><a href="#top" data-testid="link-back-top" className="transition-colors hover:text-[hsl(var(--accent-foreground))]">Back to top <ArrowUpRight className="ml-1 inline h-3 w-3" /></a></div></footer>;
}

function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [theme, setTheme] = useState<Theme>('mono');
  useEffect(() => {
    const storedTheme = window.localStorage.getItem('saad-theme');
    if (storedTheme === 'signal' || storedTheme === 'mono' || storedTheme === 'turquoise') {
      setTheme(storedTheme);
    }
  }, []);
  const toggleTheme = () => {
    setTheme((current) => {
      const next = nextTheme[current];
      window.localStorage.setItem('saad-theme', next);
      return next;
    });
  };
  useReveal();
  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, .2, .5] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className={`site-shell scanline grain min-h-[100dvh] ${theme === 'mono' ? 'mono-mode' : ''} ${theme === 'turquoise' ? 'turquoise-mode' : ''}`}><Header activeSection={activeSection} theme={theme} onToggleTheme={toggleTheme} /><main><Hero /><Ticker /><About /><Experience /><Work /><Toolkit /><Foundations /><Contact /></main><Footer /></div>;
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;