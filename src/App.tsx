/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  Menu, 
  X, 
  ArrowUpRight, 
  Terminal, 
  Download,
  Copy,
  Check,
  Instagram,
  Database,
  Award,
  Users,
  Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Define the static portfolio projects with authentic screenshots and description translated in Kazakh
interface Project {
  id: string;
  title: string;
  description: string;
  category: 'startup' | 'enactus' | 'all';
  tags: string[];
  image: string;
  imageAlt: string;
  tagline: string;
  link?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: '1',
    title: 'Janarym',
    tagline: 'Смарт-көзілдірік жобасы',
    description: 'Көру қабілеті нашар жандарға арналған смарт-көзілдірік жобасы. Мен бұл жерде Team Lead және Вице-капитан ретінде ұйымдастыру жұмыстарына жауаптымын.',
    category: 'startup',
    tags: ['ESP32', 'IoT', 'Team Lead', 'Enactus'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPWq7NGBYHy_VvanipVKmcSZ-eziuPv8nqC1oShLQtavpnMeGxG9Kn9s0ntjZzjVG2_A1pCFgmofYuWzi26y5EaI1EgVIerv3E69XuB5rzZN3qMwWKMwpHgOutcfuIS3fhucSqC5jJiIZfy0sOkIilffUBX4GV0QfOoFJ8EDMEXhe7PIjC3BPICEbXVmIKV4GIN9QuKI_BFPrlzzYxeZRstwNlCVBfSSF3T6JX_ouCc8CKotoQrO65bXCWw5LyHajbXtFUHzSUzUo',
    imageAlt: 'Janarym - смарт-көзілдірік стартапының логотипі мен интерфейс макеті',
    link: '#home'
  },
  {
    id: '2',
    title: 'FoodSave',
    tagline: 'Telegram Mini App',
    description: 'Тамақ қалдықтарын азайтуға арналған Telegram Mini App стартап идеясы.',
    category: 'startup',
    tags: ['Telegram Mini App', 'UI Design', 'Startup Idea'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAViFhjOjILVafGE5cznCY6-UO-ijCLGHy-Z6Zjt4Nl5zKPh_1aYK_arUoqRxgs5AintYBN5Pdyo972T5TxEtEKBUrPT4rMUVdePyQEq_btUiv6vwNxGO1ELd0lDX5F5B2DzdoI0wslP1OT9oN_Mg0Q4GGRTWh9lvK3-xNt7oWSEd4osdLxtPd1m8W8zeIResWRfkLkOfS1OkaMebeRHOCYnsRc-lL2tc1_peSuCVl72qiFsVaPGM5MIIb3fu3YSOlsp2IkbZgkIEE',
    imageAlt: 'FoodSave - тамақ қалдықтарын азайтуға көмектесетін қолданба логотипі',
    link: '#contact'
  },
  {
    id: '3',
    title: 'Enactus Early Stage 2026',
    tagline: 'Республикалық Сайыс',
    description: 'Enactus Early Stage 2026 республикалық сайысында командамызбен бірге қорғап, 2-орын алған алғашқы үлкен жетістігедіміз.',
    category: 'enactus',
    tags: ['Competition', 'Presentation', 'Pitch', '2nd Place'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGMyDGbWzYIv7yCUuBIfAwogxZ4t35Eie_5LolDvzCT6IUvbyRS1xWqcqvyrhiV_jXBR-BTrp4lk-YwY9WaScb9PyflQIREGO8q6x1_8E4WHRega7wiBFBav2mIacYV7JdjiqzVBo1MnwGZ-npOJ5X2JUBBiFE-AQGhC6sMp0Rdz9G-gzklnNvuTQ7qbhXkrlVwkyFMdWO0aZ-3uOElLrGhXhbi44OMxvrkxeVHC0Za8IrO8KQhzKud7x5raYD73-dgVjQ1Bt1G8c',
    imageAlt: 'Enactus командасының 3 мүшесі республикалық кубок ұстаған сәт',
    link: '#about'
  }
];

interface SkillDetails {
  title: string;
  desc: string;
  projectsCount: number;
}

const SKILLS_DETAILS: Record<string, SkillDetails> = {
  'HTML & CSS': { title: 'HTML & CSS', desc: 'Веб-әзірлеудің ең негізгі базалық деңгейі (оқу және қарапайым құрылымдар құру).', projectsCount: 1 },
  'Hardware (ESP32)': { title: 'Hardware (ESP32)', desc: 'Микроконтроллерлермен жұмыс істеудің алғашқы практикалық негіздері (ESP32-мен тәжірибе).', projectsCount: 1 },
  'Git & Deployment': { title: 'Git & Deployment', desc: 'Дайын репозиторийлерді деплой жасау және GitHub платформасын қолдану деңгейі.', projectsCount: 1 },
  'Python & JS': { title: 'Python & JS', desc: 'Бұл технологияларды әлі терең меңгермедім, қазіргі уақытта тек негіздерімен танысып, үйреніп жатырмын.', projectsCount: 1 }
};

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackText: string;
  className?: string;
  imgClassName?: string;
  fallbackBg?: string;
  icon?: React.ReactNode;
}

function ImageWithFallback({
  src,
  alt,
  fallbackText,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  fallbackBg = 'bg-neutral-800',
  icon
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden flex items-center justify-center select-none ${className}`}>
      {error || !src ? (
        <div className={`w-full h-full flex flex-col items-center justify-center font-mono text-[10px] font-bold text-white uppercase text-center p-1 ${fallbackBg}`}>
          {icon ? <div className="mb-0.5">{icon}</div> : null}
          <span>{fallbackText}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          className={imgClassName}
        />
      )}
    </div>
  );
}

export default function App() {
  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Tab/filter state for projects
  const [projectFilter, setProjectFilter] = useState<'all' | 'startup' | 'enactus'>('all');

  // Static URLs conforming to Akhmet's requirements
  const githubUrl = 'https://github.com/akhmet-dev';
  const resumeUrl = 'https://devportfolio.kz/resume/front-end-student.pdf';

  // Selected Skill interactive state
  const [selectedSkill, setSelectedSkill] = useState<string>('HTML & CSS');

  // Active section track (scroll spy)
  const [activeSection, setActiveSection] = useState<string>('home');

  // Resume Modal state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedResume, setCopiedResume] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for accuracy

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered projects list
  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (projectFilter === 'all') return true;
    return project.category === projectFilter;
  });

  // Copy email tooltip trigger
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('akhmet533@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Download generated resume file directly
  const handleDownloadResume = () => {
    const resumeText = `=====================================================
            АКМЕТ — ТҮЙІНДЕМЕ / RESUME
=====================================================

ЖЕКЕ АҚПАРАТ:
• Қала: Астана, Қазақстан
• Пошта: akhmet533@gmail.com
• GitHub: https://github.com/akhmet-dev
• Telegram: https://t.me/Akhmet_bei

КӘСІБИ ПРОФИЛЬ:
Астана IT Университеті Колледжінің 1-курс студенті және Enactus AITUC командасының белсенді Vice Chairman-ы. Негізгі қызығушылығым стартап идеяларды ұйымдастыруға, командалық жұмысқа және жобалардың тұжырымдамаларын құруға бағытталған. Технологияларды әлі де реалды деңгейде үйрену үстіндемін, бірақ нақты мәселелерді шешетін жобалар жасауға белсенді атсалысамын.

БІЛІМІ:
• Мамандығы: Ақпараттық технологиялар (Колледж студенті)
• Оқу орны: Astana IT University College (Astana IT University)
• Жылдары: 2025 — Қазіргі уақыт

МЕҢГЕРГЕН ДАҒДЫЛАР:
- HTML & CSS (Базалық деңгей)
- Hardware / ESP32 (Практикалық негіздері)
- Git & Deployment / GitHub
- Python & JS (Негіздерін белсенді үйренуде)

НЕГІЗГІ ЖОБАЛАР:
1. Janarym (Ақылды Көзілдірік Стартап)
   - Көру қабілеті шектеулі жандарға арналған ультрадыбыстық сенсорлар мен ESP32 негізіндегі ақылды құрал.
   
2. Enactus Смарт Белсенділік
   - Стартап-команданы дамыту, ұйымдастырушылық және бизнес презентациялар жасау.

-----------------------------------------------------
akhmet.dev © 2026. Барлық құқықтар қорғалған.
`;
    try {
      const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Akhmet_Resume.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Download failed, fallback to copy', e);
      navigator.clipboard.writeText(resumeUrl);
    }
    
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  return (
    <div className="min-h-screen bg-geist-surface text-geist-on-surface font-sans selection:bg-geist-blue selection:text-white flex flex-col relative overflow-x-hidden">
      
      {/* 1. Header with Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-geist-surface/85 backdrop-blur-md border-b border-border-subtle tracking-tight transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-geist-blue rounded-sm px-1">
            <ImageWithFallback 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaPrO2Pl7ZKOdKm5dEq2E_vgGeSjQ0nqN3UJ-IhRfAYpR5QetBnvEENz2bNI-nDkBttq70yoKkAFfE_-HP6w5Hg8Ztf5o4mvuXklXS8SxCoA-5SfZOsz85JxKCI3MN6uxgMF4o3UbnQic5bQG6StQ8TIVHxfKglQ3C9tG-yfL7bM8RoqgUz-hXKlEa-D1YfxYzdbGIbfpRoug7E6ChufrSRzkNVAbyhfsgsxjEQuw0OWD0ksR8Pt_jLQqW9i77QeSrpOHmTTGBCPY" 
              alt="Akhmet Avatar"
              fallbackText="A"
              fallbackBg="bg-gradient-to-tr from-geist-blue to-purple-600"
              className="w-7 h-7 rounded-full border border-white/20 group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-sans font-bold text-lg text-white tracking-tighter">
              akhmet.dev
            </span>
          </a>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { id: 'home', label: 'Басты бет' },
              { id: 'about', label: 'Мен туралы' },
              { id: 'skills', label: 'Дағдылар' },
              { id: 'projects', label: 'Жобалар' },
              { id: 'contact', label: 'Байланыс' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`font-sans text-xs uppercase tracking-widest font-medium py-1 border-b-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-geist-blue rounded-sm px-1 ${
                  activeSection === link.id
                    ? 'text-white border-white scale-100 opacity-100'
                    : 'text-geist-on-surface-variant hover:text-white border-transparent opacity-85'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Resume Request CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="bg-white hover:bg-geist-secondary active:bg-white text-black text-xs font-semibold px-4 py-2 rounded-sm border border-transparent transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus:ring-2 focus:ring-geist-blue focus:outline-none"
            >
              Түйіндеме
            </button>
          </div>

          {/* Mobile responsive toggler */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-geist-secondary p-1 focus:outline-none focus:ring-2 focus:ring-geist-blue rounded"
            aria-label="Навигация мәзірін ашу"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Scroll Progress Tiny Accent Line */}
        <div className="absolute bottom-0 left-0 h-[1.5px] bg-geist-blue transition-all duration-100" style={{
          width: `${typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0}%`
        }} />
      </header>

      {/* Mobile Drawer (with AnimatePresence) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="md:hidden fixed top-16 left-0 w-full bg-geist-surface-lowest border-b border-border-default z-40 px-6 py-6 flex flex-col gap-5 shadow-2xl"
          >
            {[
              { id: 'home', label: 'Басты бет' },
              { id: 'about', label: 'Мен туралы' },
              { id: 'skills', label: 'Дағдылар' },
              { id: 'projects', label: 'Жобалар' },
              { id: 'contact', label: 'Байланыс' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-sans text-sm uppercase tracking-widest font-medium py-2 transition-all block ${
                  activeSection === link.id
                    ? 'text-white border-l-2 border-geist-blue pl-3'
                    : 'text-geist-on-surface-variant hover:text-white pl-0'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsResumeOpen(true);
              }}
              className="bg-white text-black font-semibold text-xs py-3 rounded-sm text-center tracking-normal mt-2 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Түйіндеме жүктеу
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow flex flex-col">
        
        {/* 2. Home / Hero Section */}
        <section 
          id="home" 
          className="relative min-h-[80vh] flex flex-col justify-center items-center py-20 px-6 max-w-[1200px] mx-auto w-full border-b border-border-subtle"
        >
          {/* Geist Ambient Blur Gradient Background */}
          <div className="absolute top-[20%] right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-gradient-to-l from-geist-blue/15 to-transparent pointer-events-none rounded-full blur-[100px] md:blur-[180px] opacity-70 z-0" />
          <div className="absolute bottom-[10%] left-[-15%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-tr from-geist-surface-bright/20 to-transparent pointer-events-none rounded-full blur-[90px] md:blur-[150px] opacity-55 z-0" />

          <div className="w-full flex flex-col gap-6 items-start relative z-10 select-none">
            {/* Profile Avatar inside Hero with visual ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative w-20 h-20 rounded-full overflow-hidden border border-[rgba(255,255,255,0.4)] shadow-xl p-0.5 bg-geist-surface-lowest group"
            >
              <ImageWithFallback 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaPrO2Pl7ZKOdKm5dEq2E_vgGeSjQ0nqN3UJ-IhRfAYpR5QetBnvEENz2bNI-nDkBttq70yoKkAFfE_-HP6w5Hg8Ztf5o4mvuXklXS8SxCoA-5SfZOsz85JxKCI3MN6uxgMF4o3UbnQic5bQG6StQ8TIVHxfKglQ3C9tG-yfL7bM8RoqgUz-hXKlEa-D1YfxYzdbGIbfpRoug7E6ChufrSRzkNVAbyhfsgsxjEQuw0OWD0ksR8Pt_jLQqW9i77QeSrpOHmTTGBCPY" 
                alt="Ахмет"
                fallbackText="Ахмет"
                fallbackBg="bg-gradient-to-tr from-geist-blue via-indigo-900 to-purple-800 text-[10px] tracking-wide"
                icon={<Terminal size={20} className="text-white/80 animate-pulse" />}
                className="w-full h-full rounded-full"
                imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </motion.div>

            {/* Custom Pill Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-geist-surface-lowest border border-border-default rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-geist-blue animate-pulse"></span>
              <span className="font-mono text-[11px] text-geist-on-surface-variant font-medium uppercase tracking-widest pl-0.5">
                AITUC 1-курс студенті және Стартап Энтузиасы
              </span>
            </motion.div>

            {/* Main Header Display Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter leading-[1.1] max-w-4xl"
            >
              СӘЛЕМ, МЕН АХМЕТ!
            </motion.h1>

            {/* Subtext Paragraph */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-geist-on-surface-variant max-w-2xl font-light leading-relaxed leading-[1.6]"
            >
              Astana IT University College-де 1-курста оқимын. Технологиялар әлеміне енді қадам басып келе жатқан бастаушы әзірлеушімін. Қазіргі уақытта теориядан көрі практикалық стартап жобаларға көбірек көңіл бөлемін.
            </motion.p>

            {/* Project & Organization Logos row as requested */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="flex flex-col gap-3 py-2 w-full text-left"
            >
              <span className="font-mono text-[9px] text-geist-on-surface-variant uppercase tracking-widest font-semibold">
                Менің жобаларым мен ұйымдарымның логотиптері:
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {/* Janarym Logo Badge */}
                <div className="flex items-center gap-2.5 bg-geist-surface border border-border-default px-3.5 py-1.5 rounded-sm hover:border-geist-blue transition-all duration-300 group/badge">
                  <div className="w-5 h-5 rounded-full bg-geist-blue/10 flex items-center justify-center border border-geist-blue/20">
                    <Terminal size={10} className="text-geist-blue group-hover/badge:scale-110 transition-transform" />
                  </div>
                  <span className="font-sans text-xs font-medium text-white">Janarym</span>
                </div>

                {/* FoodSave Logo Badge */}
                <div className="flex items-center gap-2.5 bg-geist-surface border border-border-default px-3.5 py-1.5 rounded-sm hover:border-geist-blue transition-all duration-300 group/badge">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <Database size={10} className="text-emerald-500 group-hover/badge:scale-110 transition-transform" />
                  </div>
                  <span className="font-sans text-xs font-medium text-white">FoodSave</span>
                </div>

                {/* Enactus Logo Badge */}
                <div className="flex items-center gap-2.5 bg-geist-surface border border-border-default px-3.5 py-1.5 rounded-sm hover:border-geist-blue transition-all duration-300 group/badge">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                    <Award size={10} className="text-amber-500 group-hover/badge:scale-110 transition-transform" />
                  </div>
                  <span className="font-sans text-xs font-medium text-white">Enactus AITUC</span>
                </div>
              </div>
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <a
                href="#projects"
                className="bg-geist-blue hover:bg-geist-blue-hover text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-sm transition-all flex items-center gap-2 select-none hover:scale-[1.02] active:scale-[0.98] outline-none focus:ring-2 focus:ring-geist-blue"
              >
                Жобаларды көру <ArrowUpRight size={16} />
              </a>
              <a
                href="#contact"
                className="bg-transparent border border-border-default text-white hover:border-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-sm transition-colors cursor-pointer select-none outline-none focus:ring-2 focus:ring-geist-blue"
              >
                Байланысу
              </a>
            </motion.div>
          </div>
        </section>

        {/* 3. About Me Section */}
        <section 
          id="about" 
          className="py-24 px-6 max-w-[1200px] mx-auto w-full border-b border-border-subtle"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Biography details */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs text-geist-blue uppercase tracking-widest font-bold">01 / Кіммін мен</span>
              <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                Мен туралы
              </h2>
              <div className="font-sans text-sm sm:text-base text-geist-on-surface-variant space-y-4 leading-[1.7] font-light">
                <p>
                  Мен — AITUC студентімін және Enactus AITUC командасының Vice Chairman қызметін атқарамын. Менің басты күшім — код жазу емес, идеяларды ұйымдастыру, стартаптардың концепциясын құру және команданы алға сүйреу. Технологияларды әлі де үйрену үстіндемін, бірақ нақты мәселелерді шешетін жобалар жасауға белсенді атсалысамын.
                </p>
              </div>

              {/* Mini Features Block */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-bold text-white text-lg">Ұйымдастырушылық</span>
                  <span className="font-sans text-xs text-geist-on-surface-variant font-light">Стартаптардың концепциясын құру</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-sans font-bold text-white text-lg">Командалық Жұмыс</span>
                  <span className="font-sans text-xs text-geist-on-surface-variant font-light">Enactus AITUC командасын басқару</span>
                </div>
              </div>
            </div>

            {/* Akhmet's Authentic Personal Photo Column */}
            <div className="flex flex-col gap-4 max-w-full md:max-w-lg mx-auto w-full">
              <div className="relative group overflow-hidden rounded-lg w-full">
                <div className="absolute inset-0 bg-geist-surface-lowest rounded-md -rotate-2 group-hover:rotate-0 transition-transform duration-300 pointer-events-none border border-border-default h-full z-0" />
                <ImageWithFallback 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaPrO2Pl7ZKOdKm5dEq2E_vgGeSjQ0nqN3UJ-IhRfAYpR5QetBnvEENz2bNI-nDkBttq70yoKkAFfE_-HP6w5Hg8Ztf5o4mvuXklXS8SxCoA-5SfZOsz85JxKCI3MN6uxgMF4o3UbnQic5bQG6StQ8TIVHxfKglQ3C9tG-yfL7bM8RoqgUz-hXKlEa-D1YfxYzdbGIbfpRoug7E6ChufrSRzkNVAbyhfsgsxjEQuw0OWD0ksR8Pt_jLQqW9i77QeSrpOHmTTGBCPY" 
                  alt="Ахмет — Enactus AITUC Vice Chairman (Жеке суреті)" 
                  fallbackText="Ахмет суреті"
                  fallbackBg="bg-gradient-to-br from-geist-blue via-neutral-900 to-purple-900 border border-border-default"
                  icon={<Users size={32} className="text-geist-blue animate-pulse mb-2" />}
                  className="relative z-10 w-full h-[320px] sm:h-[400px] rounded-md border border-[rgba(255,255,255,0.4)] transition-all duration-500 hover:scale-[1.02]"
                  imgClassName="w-full h-full object-cover rounded-md"
                />
                {/* Dynamic Overlay on Photo */}
                <div className="absolute bottom-4 right-4 z-20 bg-black/75 px-3 py-1.5 rounded border border-border-subtle group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                  <span className="font-mono text-[10px] text-white">AKHMET_PREVIEW_PHOTO</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Skills Section */}
        <section 
          id="skills" 
          className="py-24 px-6 max-w-[1200px] mx-auto w-full border-b border-border-subtle"
        >
          <div className="text-center flex flex-col items-center gap-4 mb-12">
            <span className="font-mono text-xs text-geist-blue uppercase tracking-widest font-bold">02 / Құралдарым</span>
            <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-white tracking-tight">
              Техникалық Дағдылар
            </h2>
            <p className="font-sans text-xs sm:text-sm text-geist-on-surface-variant max-w-lg font-light leading-relaxed">
              Динамикалық мәліметтерді көру үшін төмендегі кез келген дағдыны таңдап, оның сипаттамасымен танысыңыз.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            
            {/* Interactive Grid Pills */}
            <div className="md:col-span-3 flex flex-wrap gap-2.5 justify-center md:justify-start">
              {Object.keys(SKILLS_DETAILS).map((skillName) => {
                const isSelected = selectedSkill === skillName;
                return (
                  <button
                    key={skillName}
                    onClick={() => setSelectedSkill(skillName)}
                    className={`font-mono text-xs px-4 py-2.5 border transition-all cursor-pointer rounded-sm ${
                      isSelected 
                        ? 'bg-white text-black border-white font-medium scale-[1.03] shadow-md' 
                        : 'bg-geist-surface-lowest border-border-subtle text-geist-on-surface-variant hover:border-geist-secondary'
                    } focus:outline-none focus:ring-1 focus:ring-geist-blue`}
                  >
                    {skillName}
                  </button>
                );
              })}
            </div>

            {/* Dynamic details pane (matches Geist specifications) */}
            <div className="md:col-span-2 bg-[#1c1b1b] border border-border-default/80 p-6 rounded-md shadow-lg flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                <span className="font-mono text-[10px] text-geist-blue tracking-widest font-semibold uppercase">ДАҒДЫ КҮЙІ</span>
                <span className="font-mono text-[10px] text-geist-on-surface-variant uppercase">АКТИВТІ</span>
              </div>
              <h3 className="font-sans font-semibold text-lg text-white">
                {SKILLS_DETAILS[selectedSkill]?.title}
              </h3>
              <p className="font-sans text-xs text-geist-on-surface-variant leading-relaxed font-light">
                {SKILLS_DETAILS[selectedSkill]?.desc}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-sans text-[11px] text-geist-on-surface-variant">Байланысты макеттер саны:</span>
                <span className="font-mono text-xs bg-geist-surface-lowest border border-border-subtle text-white font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {SKILLS_DETAILS[selectedSkill]?.projectsCount}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Projects Section */}
        <section 
          id="projects" 
          className="py-24 bg-geist-surface-lowest border-b border-border-subtle"
        >
          <div className="max-w-[1200px] mx-auto px-6 w-full">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-xs text-geist-blue uppercase tracking-widest font-bold">03 / Менің Еңбектерім</span>
                <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                  Таңдаулы Жобалар
                </h2>
              </div>

              {/* Dynamic Filtering Category controls */}
              <div className="flex border border-border-subtle rounded-sm p-0.5 bg-geist-surface">
                {['all', 'startup', 'enactus'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectFilter(cat as any)}
                    className={`font-sans text-xs px-3.5 py-1.5 rounded-sm transition-colors cursor-pointer capitalize ${
                      projectFilter === cat 
                        ? 'bg-white text-black font-semibold' 
                        : 'text-geist-on-surface-variant hover:text-white'
                    }`}
                  >
                    {cat === 'all' ? 'Барлығы' : cat === 'startup' ? 'Стартаптар' : 'Enactus'}
                  </button>
                ))}
              </div>
            </div>

            {/* Product card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-geist-surface border border-[rgba(255,255,255,0.4)] rounded-md overflow-hidden flex flex-col justify-between transition-all hover:border-white duration-300"
                  >
                    {/* Visual Preview */}
                    <div className="h-48 overflow-hidden relative border-b border-border-subtle bg-geist-surface-lowest">
                      <ImageWithFallback 
                        src={project.image} 
                        alt={project.imageAlt} 
                        fallbackText={project.title}
                        fallbackBg="bg-gradient-to-tr from-indigo-950 via-neutral-900 to-geist-blue/40"
                        icon={
                          project.category === 'startup' ? 
                            (project.title === 'Janarym' ? <Terminal size={24} className="text-geist-blue" /> : <Database size={24} className="text-green-500" />) :
                            <Award size={24} className="text-amber-400" />
                        }
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                      />

                      <div className="absolute top-3 right-3 bg-black/75 px-2 py-0.5 rounded border border-border-default pointer-events-none z-10">
                        <span className="font-mono text-[9px] text-[#e5e2e1] uppercase tracking-widest">
                          {project.category === 'startup' ? 'СТАРТАП' : 'ENACTUS'}
                        </span>
                      </div>
                    </div>

                    {/* Meta/Description Info */}
                    <div className="p-6 flex flex-col flex-grow select-none">
                      <span className="font-mono text-[10px] text-geist-blue font-bold uppercase tracking-widest mb-1.5">
                        {project.tagline}
                      </span>
                      <h3 className="font-sans font-semibold text-lg text-white mb-2 group-hover:text-geist-blue transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-sans text-xs text-geist-on-surface-variant font-light leading-relaxed mb-6 flex-grow">
                        {project.description}
                      </p>

                      {/* Accent Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="font-mono text-[9px] text-geist-on-surface-variant border border-border-subtle px-2 py-0.5 rounded-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* 6. Contact Section */}
        <section 
          id="contact" 
          className="py-24 px-6 max-w-[1200px] mx-auto w-full"
        >
          <div className="text-center flex flex-col items-center gap-4 mb-16">
            <span className="font-mono text-xs text-geist-blue uppercase tracking-widest font-bold">04 / Кері Байланыс</span>
            <h2 className="font-sans font-semibold text-2xl sm:text-3xl text-white tracking-tight">
              Байланыс
            </h2>
            <p className="font-sans text-sm text-geist-on-surface-variant max-w-xl font-light leading-relaxed">
              Сұрақтар немесе ұсыныстар бойынша байланыс:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto items-stretch">
            
            {/* Telegram Card */}
            <a 
              href="https://t.me/Akhmet_bei" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-geist-surface-lowest border border-border-default hover:border-geist-blue/60 p-6 rounded-md shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-geist-blue"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-sm bg-geist-surface-high border border-border-default flex items-center justify-center text-geist-blue group-hover:bg-geist-blue group-hover:text-black transition-all duration-300">
                  <Send size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-white group-hover:text-geist-blue transition-colors">Telegram</h3>
                  <p className="font-sans text-xs text-geist-on-surface-variant font-light mt-1">
                    Жедел хабарласу және сұрақтар қоюдың ең жылдам жолы.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-geist-blue mt-6 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                t.me/Akhmet_bei <ArrowUpRight size={12} />
              </div>
            </a>

            {/* Instagram Card */}
            <a 
              href="https://instagram.com/akhmet.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-geist-surface-lowest border border-border-default hover:border-geist-blue/60 p-6 rounded-md shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-geist-blue"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-sm bg-geist-surface-high border border-border-default flex items-center justify-center text-geist-blue group-hover:bg-geist-blue group-hover:text-black transition-all duration-300">
                  <Instagram size={20} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-white group-hover:text-geist-blue transition-colors">Instagram</h3>
                  <p className="font-sans text-xs text-geist-on-surface-variant font-light mt-1">
                    Күнделікті өмір және Enactus/колледж қызметінен бөлісетін блог.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-geist-blue mt-6 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                @akhmet.dev <ArrowUpRight size={12} />
              </div>
            </a>

            {/* GitHub Card */}
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-geist-surface-lowest border border-border-default hover:border-geist-blue/60 p-6 rounded-md shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-geist-blue"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-sm bg-geist-surface-high border border-border-default flex items-center justify-center text-geist-blue group-hover:bg-geist-blue group-hover:text-black transition-all duration-300">
                  <Github size={20} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-white group-hover:text-geist-blue transition-colors">GitHub</h3>
                  <p className="font-sans text-xs text-geist-on-surface-variant font-light mt-1">
                    Жасалған барлық жобалар мен үйреніп жатқан кодтар жинағы.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-geist-blue mt-6 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                github.com/akhmet-dev <ArrowUpRight size={12} />
              </div>
            </a>

            {/* Email Card with Clipboard Copy interaction */}
            <div 
              className="group bg-geist-surface-lowest border border-border-default hover:border-geist-blue/60 p-6 rounded-md shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-sm bg-geist-surface-high border border-border-default flex items-center justify-center text-geist-blue transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base text-white">Электрондық пошта</h3>
                  <p className="font-sans text-xs text-geist-on-surface-variant font-light mt-1">
                    Ресми ұсыныстар мен сұрақтарды тікелей пошта арқылы жолдаңыз.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mt-6">
                <code className="font-mono text-[11px] text-zinc-300 select-all truncate">
                  akhmet533@gmail.com
                </code>
                
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={`py-1.5 px-3 rounded-sm font-sans font-semibold text-[11px] tracking-wide cursor-pointer transition-all ${
                    copiedEmail 
                      ? 'bg-emerald-500 text-white' 
                      : 'bg-white text-black hover:bg-neutral-200 focus:ring-2 focus:ring-geist-blue'
                  }`}
                >
                  {copiedEmail ? 'Көшірілді! ✨' : 'Поштаны көшіру 📋'}
                </button>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="bg-geist-surface-lowest border-t border-border-subtle py-12 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left select-none">
          
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span className="font-sans font-bold text-base text-white tracking-tighter">
              akhmet.dev
            </span>
            <span className="font-mono text-[10px] text-geist-on-surface-variant uppercase tracking-widest pl-0.5">
              React және Tailwind CSS-пен жасалған.
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-xs text-geist-on-surface-variant hover:text-white transition-all flex items-center gap-1 focus:text-geist-blue focus:outline-none"
            >
              GitHub <ArrowUpRight size={12} />
            </a>
            <a 
              href="https://instagram.com/akhmet.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-xs text-geist-on-surface-variant hover:text-white transition-all flex items-center gap-1 focus:text-geist-blue focus:outline-none"
            >
              Instagram <ArrowUpRight size={12} />
            </a>
            <a 
              href="https://t.me/Akhmet_bei" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-mono text-xs text-geist-on-surface-variant hover:text-white transition-all flex items-center gap-1 focus:text-geist-blue focus:outline-none"
            >
              Telegram <ArrowUpRight size={12} />
            </a>
          </div>

          <div>
            <span className="font-sans text-[11px] text-geist-on-surface-variant leading-none">
              © 2026 @akhmet.dev Барлық құқықтар қорғалған.
            </span>
          </div>

        </div>
      </footer>

      {/* 8. Premium Interactive Resume Modal (Curriculum Vitæ Viewer) */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsResumeOpen(false);
              }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content container layout */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-geist-surface border border-border-default max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-md shadow-2xl relative z-10 p-6 sm:p-8 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start pb-4 border-b border-border-subtle">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] text-geist-blue font-bold tracking-widest uppercase">РЕЗЮМЕ / ТҮЙІНДЕМЕ</span>
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-sans font-bold text-xl text-white">Ахмет</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setIsResumeOpen(false)}
                  className="p-1 rounded bg-[#201f1f] text-geist-on-surface-variant hover:text-white transition-colors cursor-pointer"
                  aria-label="Терезені жабу"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Mock Resume Sheet */}
              <div className="space-y-6 text-xs sm:text-sm text-geist-on-surface font-light">
                
                {/* Profile section */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-widest">Профиль</span>
                  <p className="leading-relaxed leading-[1.6]">
                    Астана IT Университеті Колледжінің 1-курс студенті және Enactus AITUC командасының белсенді Vice Chairman-ы. Негізгі қызығушылығым стартап идеяларды ұйымдастыруға, командалық жұмысқа және жобалардың тұжырымдамаларын құруға бағытталған. Технологияларды әлі де реалды деңгейде үйрену үстіндемін, бірақ нақты мәселелерді шешетін жобалар жасауға белсенді атсалысамын.
                  </p>
                </div>

                {/* Skills/Tools Resume details */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-widest">Техникалық Құралдар</span>
                  <div className="grid grid-cols-2 gap-2 text-[12px] font-mono text-geist-on-surface-variant">
                    <div>• HTML & CSS (Базалық деңгей)</div>
                    <div>• Hardware / ESP32 (Практикалық негіздері)</div>
                    <div>• Git & Deployment / GitHub</div>
                    <div>• Python & JS (Тек негіздерін үйренуде)</div>
                  </div>
                </div>

                {/* Portfolio Studies project */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-[#888888] font-bold uppercase tracking-widest">Білімі</span>
                  <div>
                    <div className="flex justify-between font-sans font-semibold text-white">
                      <span>Ақпараттық технологиялар (Колледж студенті)</span>
                      <span className="font-mono text-[11px] font-light text-geist-on-surface-variant">2025 — Қазіргі уақыт</span>
                    </div>
                    <span className="text-xs text-geist-on-surface-variant font-light block">Astana IT University College</span>
                  </div>
                </div>

              </div>

              {/* Download action section */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border-subtle mt-4 select-none">
                <button
                  onClick={handleDownloadResume}
                  className="flex-1 bg-white hover:bg-geist-secondary text-black font-semibold text-xs py-2.5 rounded-sm flex items-center justify-center gap-2 select-none cursor-pointer"
                >
                  {copiedResume ? (
                    <>Жүктелді! <CheckCircle size={14} /></>
                  ) : (
                    <>Түйіндемені жүктеу <Download size={14} /></>
                  )}
                </button>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-transparent hover:bg-neutral-800 text-white border border-border-default font-semibold text-xs py-2.5 rounded-sm flex items-center justify-center gap-2 text-center select-none cursor-pointer"
                >
                  GitHub Профилін ашу <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
