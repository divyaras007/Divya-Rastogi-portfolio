/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';

// ============================================================================
// Constants & Portfolio Data
// ============================================================================

const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/divya-rastogi-162b7434b',
  email: 'heyitsmedivya01@gmail.com',
  // Replace with your personal GitHub profile URL when ready:
  github: 'https://github.com',
  githubDisplayLabel: '[Insert GitHub Link]',
};

type SkillCategory = 'all' | 'languages' | 'web' | 'concepts';

interface SkillItem {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'all'>;
  categoryLabel: string;
  index: string;
  summary: string;
  focusAreas: string[];
  practicalContext: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    categoryLabel: 'Programming Languages',
    index: '01',
    summary:
      'Object-oriented software architecture, core standard libraries, and modular backend/desktop system development.',
    focusAreas: ['Object-Oriented Design', 'Java Collections & Streams', 'System Tools & Backend Logic'],
    practicalContext:
      'Used to build structured Java-based software systems and utility tools through hands-on project implementation.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'Programming Languages',
    index: '02',
    summary:
      'Data Science & AI coursework foundations, rapid scripting, and modern AI agent framework experimentation.',
    focusAreas: ['Data Science & AI Foundations', 'AI Agent Frameworks', 'Automation & Scripting'],
    practicalContext:
      'Applied across B.Tech CSE (Data Science & AI) coursework and ongoing exploration of autonomous AI agent workflows.',
  },
  {
    id: 'html',
    name: 'HTML',
    category: 'web',
    categoryLabel: 'Web Technologies',
    index: '03',
    summary:
      'Semantic document structure, accessible markup standards, and clean component hierarchies for web interfaces.',
    focusAreas: ['Semantic HTML5', 'Accessible DOM Structure', 'UI Clones & Web Layouts'],
    practicalContext:
      'Forms the structural backbone for full-stack web applications and responsive interface clones.',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms (DSA)',
    category: 'concepts',
    categoryLabel: 'Core Concepts',
    index: '04',
    summary:
      'Analytical problem solving, algorithmic efficiency, and optimal data representation across software systems.',
    focusAreas: ['Arrays, Trees & Graphs', 'Sorting & Searching', 'Time & Space Complexity'],
    practicalContext:
      'Core computer science discipline underpinning efficient code execution in both Java and Python.',
  },
];

interface AboutHighlightCard {
  index: string;
  title: string;
  primary: string;
  secondary: string;
}

const ABOUT_CARDS: AboutHighlightCard[] = [
  {
    index: '01',
    title: 'Education',
    primary: '3rd Year B.Tech CSE (DS & AI)',
    secondary: 'Shri Ramswaroop Memorial University',
  },
  {
    index: '02',
    title: 'Location',
    primary: 'Lucknow, Uttar Pradesh',
    secondary: 'Open to Remote & On-site Opportunities',
  },
  {
    index: '03',
    title: 'Core Approach',
    primary: 'Learning by Building',
    secondary: 'UI Clones · Java Tools · Full-Stack Apps',
  },
  {
    index: '04',
    title: 'Current Focus',
    primary: 'AI Agent Frameworks & Cybersecurity',
    secondary: 'Full-Stack Web · Java Software Systems',
  },
];

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Me', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Contact', href: '#contact' },
];

// ============================================================================
// Main Portfolio Application
// ============================================================================

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [skillFilter, setSkillFilter] = useState<SkillCategory>('all');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('java');

  // Contact form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [emailCopied, setEmailCopied] = useState<boolean>(false);
  const [githubNotice, setGithubNotice] = useState<boolean>(false);

  // Interactive Hero Optical Lens state (inspired by reference design)
  const heroTitleRef = useRef<HTMLDivElement | null>(null);
  const [lensPos, setLensPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 28,
    y: 44,
    active: false,
  });

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'resume', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = id.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroTitleRef.current) return;
    const rect = heroTitleRef.current.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({
      x: Math.max(8, Math.min(92, xPercent)),
      y: Math.max(12, Math.min(88, yPercent)),
      active: true,
    });
  };

  const handleHeroMouseLeave = () => {
    setLensPos((prev) => ({ ...prev, active: false }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL_LINKS.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Please fill in your name, email address, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError('');
    setFormSubmitted(true);
  };

  const filteredSkills =
    skillFilter === 'all'
      ? SKILLS_DATA
      : SKILLS_DATA.filter((skill) => skill.category === skillFilter);

  const activeSkill =
    SKILLS_DATA.find((s) => s.id === selectedSkillId) || filteredSkills[0] || SKILLS_DATA[0];

  // Theme surface tokens (60-30-10 color discipline with #0f172a dark default, #f8fafc primary text, #38bdf8 electric blue accent)
  const themeClasses = isDark
    ? {
        canvas: 'bg-[#0f172a] text-[#f8fafc]',
        headerBg: 'bg-[#0f172a]/85 border-slate-800/80',
        surface: 'bg-[#162036]/90 border-slate-800/90',
        surfaceInteractive: 'bg-[#162036]/80 border-slate-800 hover:border-[#38bdf8]/50',
        mutedText: 'text-slate-400',
        subtleText: 'text-slate-300',
        divider: 'border-slate-800/80',
        inputBg: 'bg-[#0f172a] border-slate-700/90 text-[#f8fafc] placeholder:text-slate-500 focus:border-[#38bdf8]',
      }
    : {
        canvas: 'bg-[#f8fafc] text-[#0f172a]',
        headerBg: 'bg-[#f8fafc]/90 border-slate-200',
        surface: 'bg-white border-slate-200/90',
        surfaceInteractive: 'bg-white border-slate-200 hover:border-[#0284c7]/60',
        mutedText: 'text-slate-600',
        subtleText: 'text-slate-700',
        divider: 'border-slate-200',
        inputBg: 'bg-[#f8fafc] border-slate-300 text-[#0f172a] placeholder:text-slate-400 focus:border-[#0284c7]',
      };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${themeClasses.canvas}`}>
      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
      ===================================================================== */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 border-b backdrop-blur-md transition-colors duration-200 ${themeClasses.headerBg}`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="text-base sm:text-lg font-semibold tracking-tight hover:text-[#38bdf8] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38bdf8]"
          >
            Divya Rastogi
          </a>

          {/* Zone 2: 5 Single-line Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isCurrent = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38bdf8] ${
                    isCurrent
                      ? 'text-[#38bdf8]'
                      : isDark
                        ? 'text-slate-300 hover:text-[#f8fafc]'
                        : 'text-slate-600 hover:text-[#0f172a]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#38bdf8] transition-transform duration-150 origin-left ${
                      isCurrent ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions (Theme Toggle + Get In Touch CTA) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to high-contrast light theme' : 'Switch to dark slate theme'}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] ${
                isDark
                  ? 'border-slate-800 bg-[#162036] text-slate-300 hover:text-[#38bdf8] hover:border-[#38bdf8]/50'
                  : 'border-slate-200 bg-white text-slate-700 hover:text-[#0284c7] hover:border-slate-300'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#38bdf8] text-[#0f172a] hover:bg-[#7dd3fc] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
            >
              Get In Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className={`md:hidden w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-150 ${
                isDark
                  ? 'border-slate-800 bg-[#162036] text-slate-200 hover:border-[#38bdf8]/50'
                  : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-b px-5 py-5 transition-colors duration-150 ${
              isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-[#f8fafc] border-slate-200'
            }`}
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => {
                const isCurrent = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`py-2 text-base font-medium flex items-center justify-between border-b ${
                      themeClasses.divider
                    } ${isCurrent ? 'text-[#38bdf8]' : ''}`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#38bdf8]" />
                  </a>
                );
              })}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-[#38bdf8] text-[#0f172a] hover:bg-[#7dd3fc] transition-colors duration-150"
                >
                  Get In Touch
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* ===================================================================
            1. HERO SECTION (#home)
        =================================================================== */}
        <section
          id="home"
          className="relative min-h-screen pt-24 pb-12 sm:pt-28 sm:pb-16 flex flex-col justify-between overflow-hidden"
        >
          {/* Atmospheric Electric Blue Radial Glow (inspired by portfolio.webp) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div
              className={`absolute top-[10%] right-[-5%] w-[420px] h-[420px] sm:w-[620px] sm:h-[620px] rounded-full blur-[130px] transition-opacity duration-300 ${
                isDark ? 'bg-[#38bdf8]/18 opacity-100' : 'bg-[#38bdf8]/15 opacity-75'
              }`}
            />
            <div
              className={`absolute bottom-[8%] left-[10%] w-[320px] h-[320px] rounded-full blur-[120px] transition-opacity duration-300 ${
                isDark ? 'bg-blue-900/20 opacity-100' : 'bg-sky-200/40 opacity-60'
              }`}
            />
          </div>

          <div className="relative z-10 max-w-[1200px] w-full mx-auto px-5 sm:px-8 my-auto py-12 sm:py-16">
            {/* Quiet Editorial Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-[#38bdf8] mb-6">
              <span>Divya Rastogi</span>
              <span aria-hidden="true" className={themeClasses.mutedText}>
                ·
              </span>
              <span className={themeClasses.subtleText}>B.Tech CSE (Data Science &amp; AI)</span>
              <span aria-hidden="true" className={themeClasses.mutedText}>
                ·
              </span>
              <span className={themeClasses.mutedText}>Lucknow, India</span>
            </div>

            {/* Interactive Oversized Typographic Focal Anchor with Optical Glass Lens */}
            <div
              ref={heroTitleRef}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              className="relative select-none py-4 sm:py-6 cursor-default"
            >
              {/* Primary Hero Typography */}
              <h1
                className="font-semibold tracking-[-0.035em] leading-[0.98] text-[clamp(3rem,8.5vw,7.25rem)]"
                style={{ textWrap: 'balance' }}
              >
                <span className="block transition-transform duration-200 hover:translate-x-1">
                  Divya Rastogi
                </span>
                <span className="block mt-2 sm:mt-3 md:pl-[12%]">
                  <span className="font-serif-editorial italic font-normal text-[#38bdf8] pr-3 sm:pr-5">
                    Software
                  </span>
                  <span>Engineer</span>
                </span>
              </h1>

              {/* Optical Glass Magnifier Lens Overlay (Direct homage to uploaded portfolio.webp) */}
              <div
                aria-hidden="true"
                style={{
                  left: `${lensPos.x}%`,
                  top: `${lensPos.y}%`,
                }}
                className={`hidden md:flex pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-40 h-40 lg:w-48 lg:h-48 rounded-full border transition-transform duration-150 items-center justify-center overflow-hidden ${
                  isDark
                    ? 'border-white/30 bg-[#0f172a]/35 shadow-[0_0_50px_rgba(56,189,248,0.18)]'
                    : 'border-slate-400/50 bg-white/30 shadow-lg'
                } backdrop-blur-[2px] ${lensPos.active ? 'scale-105' : 'scale-100'}`}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#38bdf8]/15 via-transparent to-amber-400/15" />
                <span className="chromatic-text text-xs font-mono-tabular tracking-widest uppercase text-white/90">
                  {lensPos.active ? 'Full-Stack · Java' : 'Move Cursor'}
                </span>
              </div>
            </div>

            {/* Concise Value Proposition & Primary Actions */}
            <div className="mt-8 sm:mt-10 max-w-2xl md:ml-[12%]">
              <p className={`text-base sm:text-lg leading-relaxed ${themeClasses.subtleText}`}>
                Building full-stack web applications and Java-based software systems with a
                hands-on, learning-by-building philosophy — currently exploring cybersecurity and AI
                agent frameworks.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold bg-[#38bdf8] text-[#0f172a] hover:bg-[#7dd3fc] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                >
                  Get In Touch
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#resume"
                  onClick={(e) => scrollToSection(e, '#resume')}
                  className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold border transition-all duration-150 hover:-translate-y-0.5 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] ${
                    isDark
                      ? 'border-slate-700 bg-[#162036]/80 text-[#f8fafc] hover:border-[#38bdf8] hover:text-[#38bdf8]'
                      : 'border-slate-300 bg-white text-[#0f172a] hover:border-[#0284c7] hover:text-[#0284c7]'
                  }`}
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Metadata Bar (Matching portfolio.webp layout, Zero-Pill Unboxed Text) */}
          <div className="relative z-10 max-w-[1200px] w-full mx-auto px-5 sm:px-8 pt-8 border-t border-slate-800/60">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 text-xs leading-relaxed">
                <div>
                  <p className="font-semibold tracking-wide text-[#38bdf8]">
                    Full-Stack Web · Java Systems · DSA
                  </p>
                  <p className={`mt-1 ${themeClasses.mutedText}`}>
                    Expanding into Cybersecurity &amp; AI Agent Frameworks
                  </p>
                </div>
                <div>
                  <p className="font-semibold tracking-wide">Based in Lucknow, Uttar Pradesh</p>
                  <p className={`mt-1 ${themeClasses.mutedText}`}>
                    Open to Remote &amp; On-site Opportunities
                  </p>
                </div>
              </div>

              <a
                href="#about"
                onClick={(e) => scrollToSection(e, '#about')}
                aria-label="Scroll to About Me section"
                className={`inline-flex items-center gap-2 text-xs font-medium self-start sm:self-auto transition-colors duration-150 hover:text-[#38bdf8] ${themeClasses.mutedText}`}
              >
                <span>Scroll to explore</span>
                <ArrowDown className="w-4 h-4 text-[#38bdf8]" />
              </a>
            </div>
          </div>
        </section>

        {/* ===================================================================
            2. ABOUT ME SECTION (#about)
        =================================================================== */}
        <section
          id="about"
          className={`py-20 sm:py-28 border-t transition-colors duration-200 ${themeClasses.divider}`}
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Section Heading Column */}
              <div className="lg:col-span-4">
                <p className="font-mono-tabular text-xs font-medium text-[#38bdf8] mb-2">
                  01. Background &amp; Perspective
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  About Me
                </h2>
              </div>

              {/* Main Biography Prose Column */}
              <div className="lg:col-span-8">
                <p className="text-lg sm:text-xl leading-relaxed font-normal max-w-[68ch]">
                  I&apos;m a 3rd-year B.Tech CSE (Data Science &amp; AI) student at Shri Ramswaroop
                  Memorial University, Lucknow. I enjoy building full-stack web applications and
                  Java-based software systems, with a growing interest in cybersecurity. I like
                  learning by building — from UI clones to backend systems — and I&apos;m currently
                  expanding my skills in AI agent frameworks.
                </p>
              </div>
            </div>

            {/* 4 Structured Highlight Cards (Single-elevation, unboxed metadata) */}
            <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {ABOUT_CARDS.map((card) => (
                <article
                  key={card.index}
                  className={`p-6 rounded-xl border transition-all duration-150 hover:-translate-y-1 ${themeClasses.surfaceInteractive}`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-tabular text-[#38bdf8] mb-4">
                    <span>{card.index}</span>
                    <span className={themeClasses.mutedText}>{card.title}</span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight leading-snug">
                    {card.primary}
                  </h3>
                  <p className={`mt-2.5 text-xs leading-relaxed ${themeClasses.mutedText}`}>
                    {card.secondary}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================
            3. SKILLS SECTION (#skills)
        =================================================================== */}
        <section
          id="skills"
          className={`py-20 sm:py-28 border-t transition-colors duration-200 ${themeClasses.divider}`}
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="font-mono-tabular text-xs font-medium text-[#38bdf8] mb-2">
                  02. Core Competencies
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Technical Skills
                </h2>
              </div>

              {/* Interactive Category Filter Controls (Functional Buttons) */}
              <div
                role="tablist"
                aria-label="Filter skills by category"
                className={`inline-flex flex-wrap items-center gap-1 p-1 rounded-lg border ${themeClasses.surface}`}
              >
                {(
                  [
                    { id: 'all', label: 'All Skills' },
                    { id: 'languages', label: 'Programming Languages' },
                    { id: 'web', label: 'Web Technologies' },
                    { id: 'concepts', label: 'Core Concepts' },
                  ] as const
                ).map((tab) => {
                  const isActive = skillFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => {
                        setSkillFilter(tab.id);
                        const firstMatch =
                          tab.id === 'all'
                            ? SKILLS_DATA[0]
                            : SKILLS_DATA.find((s) => s.category === tab.id);
                        if (firstMatch) setSelectedSkillId(firstMatch.id);
                      }}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap ${
                        isActive
                          ? 'bg-[#38bdf8] text-[#0f172a] font-semibold'
                          : `${themeClasses.mutedText} hover:text-[#38bdf8]`
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Skill Cards Grid + Detailed Focus Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Skill Cards List */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredSkills.map((skill) => {
                  const isSelected = activeSkill.id === skill.id;
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => setSelectedSkillId(skill.id)}
                      className={`text-left p-6 rounded-xl border transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8] ${
                        isSelected
                          ? isDark
                            ? 'bg-[#1e293b] border-[#38bdf8]'
                            : 'bg-sky-50/70 border-[#0284c7]'
                          : themeClasses.surfaceInteractive
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono-tabular mb-3">
                        <span className="text-[#38bdf8]">{skill.index}</span>
                        <span className={themeClasses.mutedText}>{skill.categoryLabel}</span>
                      </div>

                      <h3 className="text-lg font-semibold tracking-tight group-hover:text-[#38bdf8]">
                        {skill.name}
                      </h3>

                      <p className={`mt-2 text-xs leading-relaxed ${themeClasses.mutedText}`}>
                        {skill.summary}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs font-medium text-[#38bdf8]">
                        <span>Inspect domain focus</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Skill Inspection Panel */}
              <div className={`lg:col-span-5 p-7 rounded-xl border ${themeClasses.surface}`}>
                <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#38bdf8]">
                  <span>{activeSkill.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSkill.categoryLabel}</span>
                </div>

                <h3 className="mt-2 text-xl sm:text-2xl font-semibold tracking-tight">
                  {activeSkill.name}
                </h3>

                <p className={`mt-3 text-sm leading-relaxed ${themeClasses.subtleText}`}>
                  {activeSkill.practicalContext}
                </p>

                <div className={`mt-6 pt-5 border-t ${themeClasses.divider}`}>
                  <p className="text-xs font-semibold tracking-wide text-[#38bdf8] mb-3">
                    Key Areas of Practice
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    {activeSkill.focusAreas.map((area, idx) => (
                      <div key={area} className="flex items-center justify-between py-1">
                        <span className={themeClasses.subtleText}>{area}</span>
                        <span className={`font-mono-tabular text-xs ${themeClasses.mutedText}`}>
                          0{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            4. RESUME / EXPERIENCE SECTION (#resume)
            Kept intentionally empty with the clean placeholder card stating:
            "Details coming soon..."
        =================================================================== */}
        <section
          id="resume"
          className={`py-20 sm:py-28 border-t transition-colors duration-200 ${themeClasses.divider}`}
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="mb-10">
              <p className="font-mono-tabular text-xs font-medium text-[#38bdf8] mb-2">
                03. Career &amp; Credentials
              </p>
              <h2
                className="text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Resume &amp; Experience
              </h2>
            </div>

            {/* Clean Placeholder Card as requested */}
            <div
              className={`p-12 sm:p-16 rounded-xl border border-dashed text-center transition-colors duration-150 ${themeClasses.surface}`}
            >
              <p className="font-serif-editorial italic text-2xl sm:text-3xl text-[#38bdf8]">
                Details coming soon...
              </p>
              <p className={`mt-2 text-xs sm:text-sm ${themeClasses.mutedText}`}>
                Work experience, internships, and downloadable resume details will be updated here.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            5. CONTACT SECTION (#contact)
        =================================================================== */}
        <section
          id="contact"
          className={`py-20 sm:py-28 border-t transition-colors duration-200 ${themeClasses.divider}`}
        >
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Direct Contact Info */}
              <div className="lg:col-span-5">
                <p className="font-mono-tabular text-xs font-medium text-[#38bdf8] mb-2">
                  04. Direct Channels
                </p>
                <h2
                  className="text-2xl sm:text-3xl font-semibold tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Let&apos;s Connect
                </h2>
                <p className={`mt-4 text-sm sm:text-base leading-relaxed ${themeClasses.subtleText}`}>
                  Whether you have an internship opportunity, software engineering role, or a
                  collaborative project in mind, feel free to reach out directly.
                </p>

                <div className={`mt-8 pt-8 border-t space-y-6 ${themeClasses.divider}`}>
                  {/* Direct Email Item */}
                  <div>
                    <p className={`text-xs ${themeClasses.mutedText}`}>Email Address</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3">
                      <a
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        className="text-sm sm:text-base font-medium hover:text-[#38bdf8] transition-colors duration-150 break-all"
                      >
                        {SOCIAL_LINKS.email}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors duration-150 whitespace-nowrap ${
                          emailCopied
                            ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                            : `${themeClasses.surfaceInteractive} ${themeClasses.mutedText}`
                        }`}
                      >
                        {emailCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Direct LinkedIn Item */}
                  <div>
                    <p className={`text-xs ${themeClasses.mutedText}`}>LinkedIn Profile</p>
                    <a
                      href={SOCIAL_LINKS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1.5 text-sm sm:text-base font-medium hover:text-[#38bdf8] transition-colors duration-150"
                    >
                      <span>linkedin.com/in/divya-rastogi-162b7434b</span>
                      <ArrowUpRight className="w-4 h-4 text-[#38bdf8]" />
                    </a>
                  </div>

                  {/* Location & Availability */}
                  <div>
                    <p className={`text-xs ${themeClasses.mutedText}`}>Location &amp; Status</p>
                    <p className="mt-1.5 text-sm sm:text-base font-medium">
                      Lucknow, Uttar Pradesh · Open to Remote &amp; On-site
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className={`p-6 sm:p-8 rounded-xl border ${themeClasses.surface}`}>
                  {formSubmitted ? (
                    <div className="py-6">
                      <div className="inline-flex items-center gap-2 text-xs font-mono-tabular text-[#38bdf8] mb-2">
                        <Check className="w-4 h-4" />
                        <span>Message Ready</span>
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight">
                        Thank you for reaching out, {formState.name}.
                      </h3>
                      <p className={`mt-2 text-sm leading-relaxed ${themeClasses.subtleText}`}>
                        Your message has been prepared. Click below to send it directly via your
                        email client to <span className="text-[#38bdf8]">{SOCIAL_LINKS.email}</span>,
                        or edit your message.
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <a
                          href={`mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(
                            `Portfolio Inquiry from ${formState.name}`
                          )}&body=${encodeURIComponent(
                            `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
                          )}`}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#38bdf8] text-[#0f172a] hover:bg-[#7dd3fc] transition-colors duration-150 whitespace-nowrap"
                        >
                          <Mail className="w-4 h-4" />
                          <span>Open in Mail Client</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            setFormSubmitted(false);
                            setFormState({ name: '', email: '', message: '' });
                          }}
                          className={`px-4 py-2.5 rounded-lg text-xs font-medium border transition-colors duration-150 whitespace-nowrap ${themeClasses.surfaceInteractive}`}
                        >
                          Send Another Message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs font-medium mb-2"
                          >
                            Name
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            required
                            value={formState.name}
                            onChange={(e) =>
                              setFormState((prev) => ({ ...prev, name: e.target.value }))
                            }
                            placeholder="Your full name"
                            className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors duration-150 ${themeClasses.inputBg}`}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs font-medium mb-2"
                          >
                            Email
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            required
                            value={formState.email}
                            onChange={(e) =>
                              setFormState((prev) => ({ ...prev, email: e.target.value }))
                            }
                            placeholder="you@example.com"
                            className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors duration-150 ${themeClasses.inputBg}`}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-xs font-medium mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          required
                          value={formState.message}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, message: e.target.value }))
                          }
                          placeholder="Tell me about your role, project, or question..."
                          className={`w-full px-4 py-3 rounded-lg border text-sm outline-none resize-y transition-colors duration-150 ${themeClasses.inputBg}`}
                        />
                      </div>

                      {formError && (
                        <p role="alert" className="text-xs font-medium text-rose-400">
                          {formError}
                        </p>
                      )}

                      <div className="pt-1 flex items-center justify-between gap-4">
                        <span className={`text-xs ${themeClasses.mutedText}`}>
                          Direct recipient: {SOCIAL_LINKS.email}
                        </span>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold bg-[#38bdf8] text-[#0f172a] hover:bg-[#7dd3fc] hover:-translate-y-0.5 transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38bdf8]"
                        >
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          6. FOOTER
      ===================================================================== */}
      <footer className={`py-10 border-t transition-colors duration-200 ${themeClasses.divider}`}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold tracking-tight">Divya Rastogi</p>
            <p className={`mt-1 text-xs ${themeClasses.mutedText}`}>
              &copy; {new Date().getFullYear()} Divya Rastogi. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* LinkedIn */}
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className={`inline-flex items-center gap-2 text-xs font-medium transition-colors duration-150 hover:text-[#38bdf8] ${themeClasses.subtleText}`}
            >
              <Linkedin className="w-4 h-4 text-[#38bdf8]" />
              <span>LinkedIn</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              aria-label="Send Email"
              className={`inline-flex items-center gap-2 text-xs font-medium transition-colors duration-150 hover:text-[#38bdf8] ${themeClasses.subtleText}`}
            >
              <Mail className="w-4 h-4 text-[#38bdf8]" />
              <span>{SOCIAL_LINKS.email}</span>
            </a>

            {/* GitHub ([Insert GitHub Link] placeholder ready for user customization) */}
            <div className="relative">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (SOCIAL_LINKS.github === 'https://github.com') {
                    e.preventDefault();
                    setGithubNotice((prev) => !prev);
                  }
                }}
                aria-label="GitHub Profile"
                className={`inline-flex items-center gap-2 text-xs font-medium transition-colors duration-150 hover:text-[#38bdf8] ${themeClasses.subtleText}`}
              >
                <Github className="w-4 h-4 text-[#38bdf8]" />
                <span>GitHub {SOCIAL_LINKS.githubDisplayLabel}</span>
              </a>

              {githubNotice && (
                <div
                  role="status"
                  className={`absolute bottom-full right-0 mb-2 w-64 p-3 rounded-lg border text-xs shadow-lg ${themeClasses.surface}`}
                >
                  <p className="font-medium text-[#38bdf8]">GitHub Placeholder Active</p>
                  <p className={`mt-1 ${themeClasses.mutedText}`}>
                    Update <code className="font-mono-tabular">SOCIAL_LINKS.github</code> in{' '}
                    <code className="font-mono-tabular">src/App.tsx</code> with your GitHub URL.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
