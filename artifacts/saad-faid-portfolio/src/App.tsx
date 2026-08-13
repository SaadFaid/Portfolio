import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Check, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import cv from '@assets/Saad_Faid_CV_eng_1786642845741.pdf';
import cvPreview from '../../../.agents/outputs/cv-pages/page-1.png';
import texture from '@assets/15808530_1786642947053.jpg';

const queryClient = new QueryClient();

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Selected work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

const experiences = [
  {
    date: 'Jan 2023 — Feb 2023',
    company: 'OCP Group · Direction Générale',
    role: 'Full Stack Developer Intern',
    place: 'Sidi Chennane',
    copy: 'Built responsive pages with the marketing team, improved security and performance, and documented a clear path for future iterations.',
    current: false,
  },
  {
    date: 'Aug 2024 — Sep 2024',
    company: 'Innovative Tech Startup',
    role: 'Full Stack Developer Intern',
    place: 'Casablanca',
    copy: 'Shaped a mobile rental experience and a web platform for claims, reports and requests — from first test to team handoff.',
    current: false,
  },
  {
    date: 'Oct 2024 — Dec 2024',
    company: 'Assurance Youssef Salah · AXA',
    role: 'Web Developer Intern',
    place: 'Khouribga',
    copy: 'Delivered accessible internal pages, optimized performance and security, and kept communication crisp while working independently.',
    current: true,
  },
];

const projects = [
  {
    number: '01',
    title: 'Realty, without the back-and-forth',
    name: 'Property rental & sales platform',
    description: 'A focused platform for managing listings, client requests, reports and the day-to-day rhythm of real-estate work.',
    tags: ['Laravel', 'PostgreSQL', 'Tailwind CSS'],
    className: 'project-art--realty',
    accent: 'teal',
  },
  {
    number: '02',
    title: 'Bghit Nsog',
    name: 'Car rental mobile app',
    description: 'A mobile-first experience for discovering cars, making reservations and keeping rental operations moving.',
    tags: ['Flutter', 'Supabase', 'REST API'],
    className: 'project-art--car',
    accent: 'coral',
  },
  {
    number: '03',
    title: 'The fleet, in one place',
    name: 'Rental agency management platform',
    description: 'Two web surfaces for agencies to coordinate vehicles, reservations, announcements and fleet availability.',
    tags: ['React.js', 'Node.js', 'MongoDB'],
    className: 'project-art--fleet',
    accent: 'sand',
  },
];

const stackGroups = [
  { label: 'Build', items: ['Node.js', 'Laravel / PHP', 'React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3'] },
  { label: 'Shape', items: ['Tailwind CSS', 'Bootstrap', 'Flutter', 'Figma', 'REST APIs'] },
  { label: 'Store', items: ['Supabase', 'PostgreSQL', 'MySQL', 'MongoDB'] },
  { label: 'Ship', items: ['Git', 'GitHub', 'GitLab'] },
];

function useReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Header({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between rounded-full border border-foreground/15 bg-[hsl(var(--background)/.82)] px-4 py-3 shadow-[0_8px_28px_rgba(24,67,64,.07)] backdrop-blur-md sm:px-6">
        <a href="#top" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[hsl(var(--primary))] font-display text-sm font-bold text-[hsl(var(--primary-foreground))] transition-transform group-hover:rotate-12">SF</span>
          <span className="hidden font-mono-ui text-[10px] uppercase tracking-[.16em] text-foreground/70 sm:block">Saad Faid / portfolio</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={`nav-link font-mono-ui text-[10px] uppercase tracking-[.12em] text-foreground/70 hover:text-foreground ${activeSection === item.href.slice(1) ? 'active text-foreground' : ''}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden rounded-full bg-[hsl(var(--accent))] px-4 py-2 font-mono-ui text-[10px] uppercase tracking-[.11em] text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-0.5 sm:block">Let&apos;s talk <ArrowUpRight className="ml-1 inline h-3.5 w-3.5" /></a>
          <button type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen((open) => !open)} className="grid h-9 w-9 place-items-center rounded-full border border-foreground/15 md:hidden">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mx-0 mt-2 grid gap-1 rounded-3xl border border-foreground/15 bg-[hsl(var(--background)/.96)] p-3 shadow-[var(--shadow-soft)] backdrop-blur-md md:hidden">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 font-mono-ui text-[11px] uppercase tracking-[.12em] transition-colors hover:bg-[hsl(var(--muted))]">
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative mx-auto grid min-h-[760px] max-w-[1380px] items-center gap-12 px-6 pb-16 pt-36 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-44">
      <div className="relative z-10">
        <div className="reveal flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-[.16em] text-[hsl(var(--primary))]">
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
          Available for meaningful builds · Morocco
        </div>
        <h1 className="reveal reveal-delay-1 display-title mt-8 max-w-4xl font-display text-[clamp(4.4rem,11vw,10.2rem)] font-bold text-foreground">
          Useful<br /><span className="text-[hsl(var(--primary))]">by design.</span>
        </h1>
        <p className="reveal reveal-delay-2 mt-8 max-w-xl text-lg leading-8 text-foreground/70 sm:text-xl">
          I&apos;m <strong className="font-semibold text-foreground">Saad Faid</strong>, a Full Stack Web &amp; Mobile Developer from Berrechid. I turn real-world friction into products people can actually use.
        </p>
        <div className="reveal reveal-delay-3 mt-10 flex flex-wrap items-center gap-3">
          <a href="#work" className="inline-flex items-center gap-3 rounded-full bg-[hsl(var(--primary))] px-6 py-3.5 font-mono-ui text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1">See selected work <ArrowDownRight className="h-4 w-4" /></a>
          <a href={cv} download="Saad-Faid-CV.pdf" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3.5 font-mono-ui text-[10px] uppercase tracking-[.12em] text-foreground/75 transition-colors hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"><Download className="h-4 w-4" /> Download CV</a>
        </div>
      </div>
      <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[480px] lg:ml-auto">
        <div className="stone-texture absolute -right-4 -top-5 h-32 w-32 rounded-full opacity-80 mix-blend-multiply sm:-right-8 sm:-top-8 sm:h-44 sm:w-44" style={{ backgroundImage: `linear-gradient(115deg, rgba(9, 78, 78, .16), rgba(4, 52, 54, .02)), url(${texture})` }} />
        <div className="relative rounded-[2rem] border border-foreground/15 bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-soft)]">
          <div className="portrait-window aspect-[.88] rounded-[1.4rem]">
            <img src={cvPreview} alt="Saad Faid portrait from his CV" />
            <div className="absolute bottom-5 left-5 z-10 max-w-[80%] text-[hsl(var(--card))]">
              <p className="font-mono-ui text-[9px] uppercase tracking-[.2em] opacity-80">Field note / 01</p>
              <p className="mt-2 font-display text-3xl font-bold leading-none">Curious.<br />Hands-on.</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-2 pb-1 pt-4">
            <span className="font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/55">Berrechid, MA</span>
            <span className="flex items-center gap-2 font-mono-ui text-[9px] uppercase tracking-[.14em] text-[hsl(var(--primary))]"><span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))]" /> 2025 — now</span>
          </div>
        </div>
        <div className="float-slow absolute -bottom-8 -left-7 hidden rounded-2xl border border-foreground/15 bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-card)] sm:block">
          <p className="font-mono-ui text-[9px] uppercase tracking-[.13em] text-foreground/55">Currently learning</p>
          <p className="mt-2 font-display text-lg font-bold text-[hsl(var(--primary))]">What&apos;s next?</p>
          <div className="mt-2 h-1 w-20 overflow-hidden rounded-full bg-[hsl(var(--muted))]"><div className="h-full w-2/3 bg-[hsl(var(--accent))]" /></div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="overflow-hidden border-y border-foreground/15 bg-[hsl(var(--primary))] py-4 text-[hsl(var(--primary-foreground))]">
      <div className="marquee-track flex items-center gap-8 font-display text-lg font-bold uppercase tracking-[.02em]">
        {Array.from({ length: 2 }).flatMap((_, index) => [
          <span key={`${index}-one`}>Web products</span>,
          <span key={`${index}-dot`} className="text-[hsl(var(--accent))]">·</span>,
          <span key={`${index}-two`}>Mobile thinking</span>,
          <span key={`${index}-dot2`} className="text-[hsl(var(--accent))]">·</span>,
          <span key={`${index}-three`}>Useful outcomes</span>,
          <span key={`${index}-dot3`} className="text-[hsl(var(--accent))]">·</span>,
        ])}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1380px] px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div className="reveal">
          <p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">01 / The point of view</p>
          <h2 className="mt-5 max-w-sm font-display text-5xl font-bold leading-[.98] sm:text-6xl">Good software starts with listening.</h2>
        </div>
        <div className="reveal reveal-delay-1">
          <p className="max-w-2xl text-2xl leading-[1.35] text-foreground/80 sm:text-3xl">I like the space between a messy brief and a clear product — asking better questions, choosing the right tools, and making the interface feel obvious.</p>
          <div className="mt-12 grid gap-8 border-t border-foreground/15 pt-8 sm:grid-cols-3">
            <div><p className="font-display text-4xl font-bold text-[hsl(var(--primary))]">03</p><p className="mt-2 text-sm leading-6 text-foreground/60">real-world product contexts</p></div>
            <div><p className="font-display text-4xl font-bold text-[hsl(var(--primary))]">02</p><p className="mt-2 text-sm leading-6 text-foreground/60">platforms I think across: web + mobile</p></div>
            <div><p className="font-display text-4xl font-bold text-[hsl(var(--primary))]">01</p><p className="mt-2 text-sm leading-6 text-foreground/60">team habit: communicate early</p></div>
          </div>
        </div>
      </div>
      <div className="reveal reveal-delay-2 mt-24 grid gap-4 md:grid-cols-3">
        {[
          ['01', 'Understand the ground', 'I start with the people, constraints and small frictions behind a request.'],
          ['02', 'Build the useful layer', 'I move comfortably from data and APIs to an interface that earns its place.'],
          ['03', 'Leave the door open', 'Clear handoffs, readable code and documentation make the next step easier.'],
        ].map(([number, title, copy]) => (
          <div key={number} className="group border-t border-foreground/20 pt-5 transition-colors hover:border-[hsl(var(--accent))]">
            <span className="font-mono-ui text-[10px] text-[hsl(var(--accent))]">{number}</span>
            <h3 className="mt-8 font-display text-2xl font-bold">{title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-foreground/60">{copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="bg-[hsl(var(--secondary)/.55)]">
      <div className="mx-auto max-w-[1380px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="reveal flex flex-col justify-between gap-5 border-b border-foreground/15 pb-8 sm:flex-row sm:items-end">
          <div><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">02 / Experience</p><h2 className="mt-5 font-display text-5xl font-bold sm:text-7xl">Where I&apos;ve<br /><span className="text-[hsl(var(--primary))]">put it to work.</span></h2></div>
          <p className="max-w-xs text-sm leading-6 text-foreground/60">Three environments, different rhythms. The common thread: ship with care and stay adaptable.</p>
        </div>
        <div className="timeline-line relative mt-12 space-y-0">
          {experiences.map((item, index) => (
            <article key={item.company} className={`reveal reveal-delay-${Math.min(index + 1, 3)} relative grid gap-5 border-b border-foreground/15 py-8 pl-9 sm:grid-cols-[.38fr_1fr_.9fr] sm:gap-10 sm:pl-10`}>
              <span className="timeline-dot absolute left-0 top-10 h-3 w-3 rounded-full border-2 border-[hsl(var(--accent))] bg-[hsl(var(--secondary))]" />
              <p className="font-mono-ui text-[10px] uppercase leading-5 tracking-[.08em] text-foreground/55">{item.date}</p>
              <div><h3 className="font-display text-2xl font-bold">{item.company}</h3><p className="mt-1 text-sm text-[hsl(var(--primary))]">{item.role}</p></div>
              <div><p className="font-mono-ui text-[10px] uppercase tracking-[.1em] text-foreground/45">{item.place}</p><p className="mt-3 max-w-sm text-sm leading-6 text-foreground/65">{item.copy}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="mx-auto max-w-[1380px] px-6 py-24 lg:px-10 lg:py-36">
      <div className="reveal flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">03 / Selected work</p><h2 className="mt-5 max-w-2xl font-display text-5xl font-bold leading-[.92] sm:text-8xl">From problem<br /><span className="text-[hsl(var(--primary))]">to product.</span></h2></div>
        <p className="max-w-xs text-sm leading-6 text-foreground/60">A small sample of products shaped around rentals, real estate and the people who run them.</p>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article key={project.name} className={`work-card reveal reveal-delay-${Math.min(index + 1, 3)} overflow-hidden rounded-[1.5rem] border border-foreground/15 bg-[hsl(var(--card))]`}>
            <div className={`project-art ${project.className}`}><span className="absolute left-5 top-5 z-10 rounded-full border border-foreground/20 bg-[hsl(var(--card)/.55)] px-3 py-1 font-mono-ui text-[10px]">{project.number}</span><span className="absolute bottom-5 right-5 z-10 font-mono-ui text-[9px] uppercase tracking-[.14em] text-foreground/50">Case study / concept</span></div>
            <div className="p-6">
              <p className={`font-mono-ui text-[10px] uppercase tracking-[.13em] ${project.accent === 'coral' ? 'text-[hsl(var(--accent))]' : 'text-[hsl(var(--primary))]'}`}>{project.name}</p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-[1.02]">{project.title}</h3>
              <p className="mt-4 text-sm leading-6 text-foreground/60">{project.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-[hsl(var(--muted))] px-3 py-1.5 font-mono-ui text-[9px] text-foreground/65">{tag}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Toolkit() {
  return (
    <section className="border-y border-foreground/15 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
      <div className="mx-auto grid max-w-[1380px] gap-12 px-6 py-24 lg:grid-cols-[.72fr_1.28fr] lg:px-10 lg:py-32">
        <div className="reveal"><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">04 / Toolkit</p><h2 className="mt-5 max-w-sm font-display text-5xl font-bold leading-[.96] sm:text-6xl">Many tools.<br />One clear aim.</h2><p className="mt-7 max-w-sm text-sm leading-6 text-[hsl(var(--primary-foreground)/.65)]">I choose a stack that fits the problem, not a trend. Comfortable on both sides of the line.</p></div>
        <div className="reveal reveal-delay-1 grid gap-0 sm:grid-cols-2">
          {stackGroups.map((group) => <div key={group.label} className="border-t border-[hsl(var(--primary-foreground)/.2)] py-6 sm:px-5 sm:first:pl-0"><p className="font-mono-ui text-[10px] uppercase tracking-[.15em] text-[hsl(var(--accent))]">{group.label}</p><div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">{group.items.map((item) => <span key={item} className="font-display text-xl font-semibold tracking-tight text-[hsl(var(--primary-foreground)/.9)]">{item}<span className="ml-2 text-[hsl(var(--accent))]">·</span></span>)}</div></div>)}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="mx-auto max-w-[1380px] px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr]">
        <div className="reveal">
          <p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">05 / Foundations</p>
          <h2 className="mt-5 font-display text-5xl font-bold sm:text-7xl">Always<br /><span className="text-[hsl(var(--primary))]">in motion.</span></h2>
          <div className="mt-12 space-y-0">
            {[
              ['2023 — 2024', 'Professional University Licence', 'Web & Mobile Engineering · École Nationale des Sciences Appliquées (ENSA), Berrechid'],
              ['2021 — 2023', 'Digital Web Development Diploma', 'Full Stack · Institut Spécialisé de Technologie Appliquée (OFPPT), Khouribga'],
              ['2020 — 2021', 'Scientific Baccalaureate', 'Physics & Chemistry · Lycée El General El Kettani, Berrechid'],
            ].map(([year, title, detail]) => <div key={title} className="grid gap-2 border-t border-foreground/15 py-5 sm:grid-cols-[.28fr_1fr] sm:gap-8"><span className="font-mono-ui text-[10px] text-foreground/50">{year}</span><div><h3 className="font-display text-xl font-bold">{title}</h3><p className="mt-1 text-sm leading-6 text-foreground/60">{detail}</p></div></div>)}
          </div>
        </div>
        <div className="reveal reveal-delay-1 lg:pt-28">
          <div className="rounded-[1.5rem] bg-[hsl(var(--secondary)/.7)] p-7 sm:p-9">
            <p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">Languages</p>
            <div className="mt-8 space-y-5">
              {[['Arabic', 'Native', 100], ['English', 'Professional', 78], ['French', 'Intermediate', 64]].map(([language, level, width]) => <div key={language}><div className="flex items-baseline justify-between"><span className="font-display text-2xl font-bold">{language}</span><span className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-foreground/50">{level}</span></div><div className="mt-3 h-1 rounded-full bg-[hsl(var(--background)/.7)]"><div className="h-full rounded-full bg-[hsl(var(--accent))]" style={{ width: `${width}%` }} /></div></div>)}
            </div>
            <div className="mt-10 border-t border-foreground/15 pt-5"><p className="font-mono-ui text-[9px] uppercase tracking-[.13em] text-foreground/50">Personal operating system</p><p className="mt-3 font-display text-2xl font-bold leading-tight">Teamwork · problem solving · adaptability · communication · time</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'faid.saadd@gmail.com';
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <section id="contact" className="relative overflow-hidden bg-[hsl(var(--foreground))] text-[hsl(var(--background))]">
      <div className="stone-texture absolute -right-24 -top-32 h-[430px] w-[430px] rounded-full opacity-30 mix-blend-screen" style={{ backgroundImage: `linear-gradient(115deg, rgba(9, 78, 78, .16), rgba(4, 52, 54, .02)), url(${texture})` }} />
      <div className="relative mx-auto max-w-[1380px] px-6 py-24 lg:px-10 lg:py-36">
        <div className="reveal max-w-4xl"><p className="eyebrow font-mono-ui text-[hsl(var(--accent))]">06 / Start a conversation</p><h2 className="mt-6 font-display text-[clamp(4rem,10vw,9.5rem)] font-bold leading-[.85] tracking-[-.08em]">Have a real<br /><span className="text-[hsl(var(--accent))]">problem?</span></h2><p className="mt-8 max-w-lg text-lg leading-8 text-[hsl(var(--background)/.65)]">Tell me what needs to work better. I&apos;d like to hear the context, the constraints and what a useful outcome looks like.</p></div>
        <div className="reveal reveal-delay-1 mt-14 flex flex-col gap-4 border-t border-[hsl(var(--background)/.2)] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={copyEmail} className="group text-left font-display text-2xl font-bold transition-colors hover:text-[hsl(var(--accent))] sm:text-4xl">{email}<span className="ml-3 inline-block align-middle text-[hsl(var(--accent))]">{copied ? <Check className="h-6 w-6" /> : <ArrowUpRight className="h-6 w-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}</span><span className="block font-mono-ui text-[9px] font-normal uppercase tracking-[.12em] text-[hsl(var(--background)/.45)]">{copied ? 'Copied to clipboard' : 'Click to copy email'}</span></button>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:faid.saadd@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.11em] text-[hsl(var(--accent-foreground))] transition-transform hover:-translate-y-1"><Mail className="h-4 w-4" /> Email me</a>
            <a href="tel:+212634667536" className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.3)] px-5 py-3 font-mono-ui text-[10px] uppercase tracking-[.11em] transition-colors hover:border-[hsl(var(--accent))]"><Phone className="h-4 w-4" /> Call</a>
          </div>
        </div>
        <div className="reveal reveal-delay-2 mt-20 grid gap-8 border-t border-[hsl(var(--background)/.2)] pt-7 sm:grid-cols-3">
          <div className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[hsl(var(--accent))]" /><div><p className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(var(--background)/.45)]">Based in</p><p className="mt-2 text-sm">Berrechid, Morocco</p></div></div>
          <a href="https://www.linkedin.com/in/saad-faid/" target="_blank" rel="noreferrer" className="flex items-start gap-3 transition-colors hover:text-[hsl(var(--accent))]"><Linkedin className="mt-0.5 h-4 w-4 text-[hsl(var(--accent))]" /><div><p className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(var(--background)/.45)]">Connect on</p><p className="mt-2 text-sm">LinkedIn <ExternalLink className="ml-1 inline h-3 w-3" /></p></div></a>
          <a href="https://github.com/saad-faid" target="_blank" rel="noreferrer" className="flex items-start gap-3 transition-colors hover:text-[hsl(var(--accent))]"><Github className="mt-0.5 h-4 w-4 text-[hsl(var(--accent))]" /><div><p className="font-mono-ui text-[9px] uppercase tracking-[.12em] text-[hsl(var(--background)/.45)]">See the code</p><p className="mt-2 text-sm">GitHub <ExternalLink className="ml-1 inline h-3 w-3" /></p></div></a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="bg-[hsl(var(--foreground))] px-6 pb-8 text-[hsl(var(--background)/.5)] lg:px-10"><div className="mx-auto flex max-w-[1380px] flex-col gap-3 border-t border-[hsl(var(--background)/.2)] pt-5 font-mono-ui text-[9px] uppercase tracking-[.12em] sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Saad Faid</span><span>Built with curiosity in Berrechid</span><a href="#top" className="text-[hsl(var(--accent))] transition-colors hover:text-[hsl(var(--background))]">Back to top ↑</a></div></footer>;
}

function Home() {
  const [activeSection, setActiveSection] = useState('about');
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
  return (
    <div className="site-shell grain min-h-[100dvh]">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Experience />
        <Work />
        <Toolkit />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;