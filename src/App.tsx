import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Router, Route, Switch, Link, useLocation } from "wouter";
import {
  HeartPulse,
  Monitor,
  Brain,
  Leaf,
  FlaskConical,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import profileImg from "@assets/6_1781672781666.jpeg";
import mandalaImg from "@assets/Screenshot_2026-06-21_at_12.55.57_PM_1782026766235.png";
import logoMandalaImg from "@assets/Screenshot_2026-06-21_at_1.17.15_PM-removebg-preview_1782028204090.png";
import dance1 from "@assets/DSC04941_1781672781666.JPG";
import dance2 from "@assets/5_1781672781666.jpeg";
import dance3 from "@assets/DSC04839_1781672781666.JPG";
import dance4 from "@assets/11_1781672781666.jpeg";
import dance5 from "@assets/DSC04998_1781672781666.JPG";
import dance6 from "@assets/12_1781672781666.jpeg";
import dance7 from "@assets/13_1781672781666.jpeg";
import japan1 from "@assets/WhatsApp_Image_2026-06-13_at_11.58.33_1781672781666.jpeg";
import japan2 from "@assets/4_1781672781666.jpeg";
import japan3 from "@assets/3_1781672781666.jpeg";
import japan4 from "@assets/2_1781672781666.jpeg";

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 38, startDelay = 700) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// ─── Shared animation variants ────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// ─── Motif Components ─────────────────────────────────────────────────────────
function MandalaMotif({ className, style, spin }: { className?: string; style?: React.CSSProperties; spin?: boolean }) {
  const { opacity, ...rest } = style ?? {};
  const imgEl = (
    <img
      src={mandalaImg}
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "multiply" }}
      draggable={false}
    />
  );
  return (
    <div className={className} style={{ ...rest, opacity }}>
      {spin ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          style={{ width: "100%", height: "100%" }}
        >
          {imgEl}
        </motion.div>
      ) : imgEl}
    </div>
  );
}

function PaisleyMotif({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 160 260" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M80 245 C48 210,25 155,32 100 C39 45,72 12,105 12 C138 12,158 40,158 72 C158 104,138 130,114 140 C94 150,86 142,96 128 C106 114,126 110,128 90 C130 70,114 50,96 50 C78 50,62 70,60 98 C57 133,74 175,80 218 C83 235,82 250,80 245 Z"
        fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5"
      />
      <path d="M80 225 C54 196,38 152,45 106 C52 62,77 36,103 38" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="88" cy="78" r="4" fill="currentColor" />
      <circle cx="75" cy="96" r="2.5" fill="currentColor" />
      <circle cx="99" cy="96" r="2.5" fill="currentColor" />
      <circle cx="82" cy="114" r="3" fill="currentColor" />
    </svg>
  );
}

function JaliBorder({ uid, className }: { uid: string; className?: string }) {
  const patId = `jali-${uid}`;
  return (
    <div className={`w-full pointer-events-none select-none ${className ?? ""}`} style={{ height: 36 }}>
      <svg width="100%" height="36" viewBox="0 0 960 36" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patId} x="0" y="0" width="64" height="36" patternUnits="userSpaceOnUse">
            <polygon points="32,3 61,18 32,33 3,18" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="32,10 52,18 32,26 12,18" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="32" cy="18" r="2" fill="currentColor" />
            <circle cx="3" cy="18" r="1.5" fill="currentColor" />
            <circle cx="61" cy="18" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="960" height="36" fill={`url(#${patId})`} />
      </svg>
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12 relative">
      <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">{title}</h2>
      <div className="gold-divider" />
      {subtitle && <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
const navLinks = [
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Research", href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "Education", href: "/education" },
  { name: "Creative", href: "/creative" },
];

function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-bold text-primary tracking-wide flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="inline-flex"
          >
            <img src={logoMandalaImg} alt="" width="34" height="34" className="inline-block" draggable={false} />
          </motion.span>
          Dr R Aishwariya
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                location === link.href
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-colors ${
                  location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="text-base font-medium text-primary hover:underline">
              Contact
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-8 bg-foreground text-background text-center">
      <div className="container mx-auto px-6">
        <p className="font-serif text-lg text-primary/80 mb-2">Where Science Meets Art</p>
        <p className="text-sm text-background/60">© 2026 Dr. R. Aishwariya</p>
      </div>
    </footer>
  );
}

// ─── Page transition wrapper ──────────────────────────────────────────────────
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxImage { src: string; alt: string; }

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const img = images[index];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={22} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
        >
          <ChevronLeft size={26} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
        >
          <ChevronRight size={26} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.22 }}
        className="relative max-w-[88vw] max-h-[88vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="max-w-full max-h-[80vh] rounded-xl shadow-2xl object-contain"
        />
        {img.alt && (
          <p className="mt-4 text-white/75 text-sm font-light tracking-wide text-center">{img.alt}</p>
        )}
        {images.length > 1 && (
          <p className="mt-1 text-white/40 text-xs">{index + 1} / {images.length}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────
function TypewriterTagline() {
  const text = "Public Health Researcher • Dentist • Scientific Writer • Creative Director • Bharatanatyam Artist";
  const { displayed, done } = useTypewriter(text, 36, 800);
  return (
    <span>
      {displayed}
      <motion.span
        animate={{ opacity: done ? [1, 0, 1] : 1 }}
        transition={done ? { duration: 0.9, repeat: Infinity, ease: "steps(1)" } : { duration: 0 }}
        className="inline-block ml-0.5 text-primary font-normal"
      >
        |
      </motion.span>
    </span>
  );
}

function HeroPage() {
  return (
    <PageWrapper>
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/50 via-background to-background -z-10" />
        <MandalaMotif className="absolute text-primary pointer-events-none select-none" style={{ top: -140, right: -140, width: 580, height: 580, opacity: 0.07 }} />
        <MandalaMotif className="absolute text-accent pointer-events-none select-none" style={{ bottom: -180, left: -120, width: 400, height: 400, opacity: 0.045 }} />
        <PaisleyMotif className="absolute text-primary pointer-events-none select-none" style={{ bottom: "12%", right: "8%", width: 80, height: 130, opacity: 0.07 }} />
        <PaisleyMotif className="absolute text-accent pointer-events-none select-none" style={{ bottom: "8%", right: "14%", width: 60, height: 98, opacity: 0.055, transform: "scaleX(-1) rotate(10deg)" }} />

        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-4">
              <span className="inline-block py-1 px-3 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
                BDS • MPH
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-tight mb-6">
              Dr. R. <span className="text-primary">Aishwariya</span>
            </motion.h1>
            <motion.div variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground mb-10 font-light leading-relaxed max-w-3xl min-h-[2.5rem]">
              <TypewriterTagline />
            </motion.div>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href="/about">Explore</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-accent text-accent hover:bg-accent hover:text-white" asChild>
                <a href="/Dr_R_Aishwariya_CV.pdf" download="Dr_R_Aishwariya_CV.pdf">Download CV</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <JaliBorder uid="hero-bottom" className="text-primary/25" />
    </PageWrapper>
  );
}

function AboutPage() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-20 bg-white relative overflow-hidden min-h-screen">
        <MandalaMotif className="absolute text-primary pointer-events-none select-none" style={{ top: -80, right: -80, width: 340, height: 340, opacity: 0.05 }} />
        <PaisleyMotif className="absolute text-accent pointer-events-none select-none" style={{ bottom: "10%", left: "1%", width: 55, height: 90, opacity: 0.06, transform: "rotate(-20deg)" }} />
        <PaisleyMotif className="absolute text-primary pointer-events-none select-none" style={{ bottom: "5%", left: "5%", width: 45, height: 72, opacity: 0.05, transform: "scaleX(-1) rotate(-10deg)" }} />
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col md:flex-row gap-16 items-start"
          >
            <motion.div variants={fadeInUp} className="md:w-1/3 flex justify-center md:justify-end">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <img src={profileImg} alt="Dr. R. Aishwariya" className="w-full h-full object-cover object-top" />
              </div>
            </motion.div>
            <motion.div variants={fadeInUp} className="md:w-2/3">
              <SectionHeading title="About Me" />
              <div className="prose prose-lg prose-pink max-w-none mb-8">
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  I am a Public Health Researcher and Dentist with experience in qualitative and quantitative research, implementation science, policy development, scientific writing and project coordination.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  My work has contributed to projects funded by WHO, UNICEF, ICMR and the Ministry of Health & Family Welfare.
                </p>
              </div>
              <div className="mt-8">
                <h3 className="font-serif text-xl font-semibold mb-4 text-foreground">Core Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {["STATA", "R Programming", "Scientific Writing", "Digital Health", "Tobacco Control", "Nutrition", "Implementation Research", "Qualitative Research", "Project Management"].map(skill => (
                    <span key={skill} className="px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <JaliBorder uid="about-bottom" className="text-accent/30" />
    </PageWrapper>
  );
}

function ExperiencePage() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-20 bg-background relative overflow-hidden min-h-screen">
        <MandalaMotif spin className="absolute text-primary pointer-events-none select-none" style={{ top: "50%", left: "50%", width: 600, height: 600, opacity: 0.055, transform: "translate(-50%, -50%)" }} />
        <MandalaMotif className="absolute text-accent pointer-events-none select-none" style={{ top: -100, right: -100, width: 320, height: 320, opacity: 0.055 }} />
        <PaisleyMotif className="absolute text-primary pointer-events-none select-none" style={{ bottom: "5%", left: "2%", width: 50, height: 80, opacity: 0.055, transform: "rotate(30deg)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Experience" />
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-secondary pl-8 ml-4 space-y-12">
              {[
                { org: "The George Institute for Global Health", role: "Project Officer", time: "June 2025 – Present" },
                { org: "One Public Health", role: "Partner & Creative Director", time: "Current" },
                { org: "Global Journal of Medicine and Public Health", role: "Advisor / Guest Editor", time: "Jan 2025 – Present" },
                { org: "HRIDAY (ICMR)", role: "Project Research Scientist-I", time: "Aug 2024 – Jun 2025" },
                { org: "Public Health Foundation of India", role: "Consultant", time: "Jan 2023 – Dec 2023" },
                { org: "Evalueserve", role: "Junior Analyst", time: "Aug 2022 – Jan 2023" },
              ].map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute w-4 h-4 bg-primary rounded-full -left-[41px] top-1.5 border-4 border-background" />
                  <h3 className="text-xl font-semibold text-foreground">{job.role}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                    <span className="text-lg font-serif text-accent">{job.org}</span>
                    {job.time && (
                      <>
                        <span className="hidden sm:inline text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">{job.time}</span>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <JaliBorder uid="exp-bottom" className="text-primary/25" />
    </PageWrapper>
  );
}

function ResearchPage() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-20 bg-white relative overflow-hidden min-h-screen">
        <MandalaMotif spin className="absolute text-primary pointer-events-none select-none" style={{ top: "50%", left: "50%", width: 620, height: 620, opacity: 0.055, transform: "translate(-50%, -50%)" }} />
        <MandalaMotif className="absolute text-primary pointer-events-none select-none" style={{ bottom: -120, left: -120, width: 380, height: 380, opacity: 0.055 }} />
        <PaisleyMotif className="absolute text-accent pointer-events-none select-none" style={{ top: "8%", right: "2%", width: 55, height: 90, opacity: 0.06, transform: "rotate(-30deg)" }} />
        <PaisleyMotif className="absolute text-primary pointer-events-none select-none" style={{ top: "5%", right: "7%", width: 42, height: 68, opacity: 0.05, transform: "scaleX(-1) rotate(-15deg)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Research Interests" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Tobacco Control", icon: <Leaf className="w-8 h-8" /> },
              { title: "Digital Health", icon: <Monitor className="w-8 h-8" /> },
              { title: "AI in Healthcare", icon: <Brain className="w-8 h-8" /> },
              { title: "Nutrition", icon: <HeartPulse className="w-8 h-8" /> },
              { title: "Implementation Science", icon: <FlaskConical className="w-8 h-8" /> },
              { title: "Health Research", icon: <TrendingUp className="w-8 h-8" /> },
            ].map((interest, i) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl bg-background border border-border hover:border-primary/50 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {interest.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors">{interest.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <JaliBorder uid="research-bottom" className="text-accent/30" />
    </PageWrapper>
  );
}

function PublicationsPage() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-20 bg-background relative overflow-hidden min-h-screen">
        <MandalaMotif spin className="absolute text-accent pointer-events-none select-none" style={{ top: "50%", left: "50%", width: 620, height: 620, opacity: 0.055, transform: "translate(-50%, -50%)" }} />
        <MandalaMotif className="absolute text-accent pointer-events-none select-none" style={{ top: "50%", right: -150, width: 420, height: 420, opacity: 0.055, transform: "translateY(-50%)" }} />
        <PaisleyMotif className="absolute text-primary pointer-events-none select-none" style={{ bottom: "8%", left: "1%", width: 52, height: 84, opacity: 0.055, transform: "rotate(15deg)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Selected Publications" />
          <div className="grid grid-cols-1 gap-6 max-w-4xl">
            {[
              {
  title: "Low-sodium salt substitutes as a key intervention for prevention, control & management of hypertension and other cardiovascular diseases in India: A White Paper",
  journal: "Zenodo",
  year: "2026"
},
{ title: "Peer Education Initiatives for Promoting Adolescent Health in SEAR", journal: "AJPM Focus", year: "2025" },
{ title: "Epidemiological Trends of Diabetes Mellitus and HIV and Their Effect on Tuberculosis Outcomes", journal: "Cureus", year: "2025" },
              { title: "Epidemiological Trends of Diabetes Mellitus and HIV and Their Effect on Tuberculosis Outcomes", journal: "Cureus", year: "2025" },
              { title: "Awareness and Usage of Digital Tools for Cessation of Smoking among College-Going Smokers in Ernakulam, Kerala", journal: "Global Journal of Medicine and Public Health", year: "2025" },
              { title: "Menstrual Health and Hygiene Practices of Adolescent Girls in South India", journal: "", year: "2024" },
              { title: "Vaccine Hesitancy among Tribal Khasi Community in Meghalaya", journal: "", year: "2023" },
              { title: "Barriers to Tobacco Cessation Advice Among Clinical Dental Students", journal: "Amrita Journal of Medicine", year: "2019" },
            ].map((pub, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm border-l-4 border-accent hover:border-primary transition-colors duration-300 group"
              >
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {pub.link ? (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
                      "{pub.title}"
                    </a>
                  ) : (
                    <>"{pub.title}"</>
                  )}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  {pub.journal && <span className="font-medium">{pub.journal}</span>}
                  {pub.journal && <span>•</span>}
                  <span>{pub.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <JaliBorder uid="pub-bottom" className="text-primary/25" />
    </PageWrapper>
  );
}

function EducationPage() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-20 bg-white relative overflow-hidden min-h-screen">
        <MandalaMotif spin className="absolute text-primary pointer-events-none select-none" style={{ top: "50%", left: "50%", width: 580, height: 580, opacity: 0.055, transform: "translate(-50%, -50%)" }} />
        <MandalaMotif className="absolute text-primary pointer-events-none select-none" style={{ bottom: -80, right: -80, width: 280, height: 280, opacity: 0.055 }} />
        <PaisleyMotif className="absolute text-accent pointer-events-none select-none" style={{ top: "10%", left: "1%", width: 48, height: 78, opacity: 0.055, transform: "rotate(-25deg)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Education" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-secondary/30 border border-secondary hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Master of Public Health</h3>
              <p className="text-lg text-accent font-medium mb-4">Indian Institute of Public Health, Delhi</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-sm font-medium text-primary shadow-sm">
                🏆 First Position – Poshan Maah Competition
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 rounded-2xl bg-secondary/30 border border-secondary hover:border-primary/30 transition-all duration-300"
            >
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Bachelor of Dental Surgery</h3>
              <p className="text-lg text-accent font-medium">Amrita Institute of Medical Sciences</p>
            </motion.div>
          </div>

          <SectionHeading title="Awards & Certifications" />
          <div className="flex flex-wrap gap-4">
            {[
              "UNICEF Certificate of Appreciation",
              "WHO Leadership Certification",
              "WHO Public Health Emergency Operations Centre",
              "Research Grant Writing",
              "Good Clinical Practice",
              "JLPT N5",
            ].map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 bg-background border border-secondary text-foreground rounded-lg shadow-sm hover:border-primary hover:shadow-md transition-all font-medium"
              >
                {cert}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <JaliBorder uid="edu-bottom" className="text-accent/30" />
    </PageWrapper>
  );
}

const danceImages: LightboxImage[] = [
  { src: dance1, alt: "Bharatanatyam performance" },
  { src: dance2, alt: "Solo performance" },
  { src: dance3, alt: "Group performance on stage" },
  { src: dance4, alt: "Performance at art gallery" },
  { src: dance5, alt: "Group Bharatanatyam" },
  { src: dance6, alt: "Dance pose at Kartavya Bhavan" },
  { src: dance7, alt: "Dance at Kartavya Bhavan" },
];

const japanImages: LightboxImage[] = [
  { src: japan1, alt: "Kimono at Kiyomizudera, Kyoto" },
  { src: japan2, alt: "Meiji Shrine, Tokyo" },
  { src: japan3, alt: "Osaka shrine market" },
  { src: japan4, alt: "Osaka 2025" },
];

function CreativePage() {
  const [lightbox, setLightbox] = useState<{ images: LightboxImage[]; index: number } | null>(null);

  const openLightbox = (images: LightboxImage[], index: number) => setLightbox({ images, index });
  const closeLightbox = () => setLightbox(null);
  const prevImage = () => setLightbox(lb => lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : null);
  const nextImage = () => setLightbox(lb => lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : null);

  return (
    <PageWrapper>
      <section className="pt-32 pb-20 bg-background relative overflow-hidden min-h-screen">
        <MandalaMotif spin className="absolute text-primary pointer-events-none select-none z-0" style={{ top: "50%", left: "50%", width: 520, height: 520, opacity: 0.055, transform: "translate(-50%, -50%)" }} />
        <MandalaMotif className="absolute text-accent pointer-events-none select-none z-0" style={{ top: -100, left: -100, width: 280, height: 280, opacity: 0.04 }} />
        <PaisleyMotif className="absolute text-primary pointer-events-none select-none z-0" style={{ bottom: "10%", right: "2%", width: 60, height: 96, opacity: 0.06 }} />
        <PaisleyMotif className="absolute text-accent pointer-events-none select-none z-0" style={{ bottom: "5%", right: "8%", width: 46, height: 74, opacity: 0.05, transform: "scaleX(-1)" }} />

        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Where Science Meets Art" subtitle="Exploring the intersection of clinical precision and classical expression." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-border shadow-sm transition-all duration-300"
            >
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Bharatanatyam</h3>
              <p className="text-muted-foreground leading-relaxed">
                As a classical artist, the discipline, rhythm, and storytelling of Bharatanatyam profoundly influence my approach to public health. The dedication required to master this ancient dance form translates into the meticulousness of my research methodology, while its expressive nature fuels my passion for health communication.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-border shadow-sm transition-all duration-300"
            >
              <h3 className="text-2xl font-serif font-bold text-primary mb-4">Creative Direction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Blending science with visual communication. I believe that powerful research deserves powerful presentation. As a Creative Director at One Public Health, I focus on translating complex epidemiological data and health policies into accessible, engaging narratives that drive real-world impact.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed relative">
              <span className="text-6xl text-primary/20 absolute -top-8 -left-8">"</span>
              Research gives me purpose. Bharatanatyam gives me expression.
              <span className="text-6xl text-primary/20 absolute -bottom-12 -right-4">"</span>
            </blockquote>
          </motion.div>

          {/* Bharatanatyam Gallery */}
          <div className="mb-16">
            <h3 className="text-3xl font-serif font-semibold text-primary mb-8 text-center">On Stage</h3>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {danceImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="break-inside-avoid mb-4"
                  onClick={() => openLightbox(danceImages, i)}
                >
                  <div className="overflow-hidden rounded-2xl shadow-md border border-border hover:shadow-xl hover:border-primary/40 transition-all duration-300 group cursor-zoom-in">
                    <img src={img.src} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Japan / Travel Gallery */}
          <div>
            <h3 className="text-3xl font-serif font-semibold text-primary mb-3 text-center">Journeys</h3>
            <p className="text-center text-muted-foreground mb-8 font-light">Exploring the world, one culture at a time — Japan, 2025</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {japanImages.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="overflow-hidden rounded-2xl shadow-md border border-border hover:shadow-xl hover:border-primary/40 transition-all duration-300 group cursor-zoom-in aspect-[3/4]"
                  onClick={() => openLightbox(japanImages, i)}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <JaliBorder uid="creative-bottom" className="text-primary/25" />

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            index={lightbox.index}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

function ContactPage() {
  return (
    <PageWrapper>
      <section className="pt-32 pb-20 bg-primary text-primary-foreground relative overflow-hidden min-h-screen">
        <MandalaMotif spin className="absolute text-white pointer-events-none select-none" style={{ top: "50%", left: "50%", width: 640, height: 640, opacity: 0.09, transform: "translate(-50%, -50%)" }} />
        <MandalaMotif className="absolute text-white pointer-events-none select-none" style={{ bottom: -120, left: -120, width: 380, height: 380, opacity: 0.1 }} />
        <PaisleyMotif className="absolute text-white pointer-events-none select-none" style={{ top: "10%", right: "3%", width: 55, height: 90, opacity: 0.09, transform: "rotate(-15deg)" }} />
        <PaisleyMotif className="absolute text-white pointer-events-none select-none" style={{ top: "5%", right: "9%", width: 40, height: 65, opacity: 0.07, transform: "scaleX(-1) rotate(-5deg)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Get in Touch</h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Open to collaborations, research partnerships, and creative projects in the public health space.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Mail className="w-6 h-6" />, label: "Email", value: "dr.r.aishwariya@gmail.com", href: "mailto:dr.r.aishwariya@gmail.com" },
              { icon: <Phone className="w-6 h-6" />, label: "Phone", value: "+91 85473 21882", href: "tel:+918547321882" },
              { icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn", value: "in/dr-r-aishwariya", href: "https://linkedin.com/in/dr-r-aishwariya" },
              { icon: <MapPin className="w-6 h-6" />, label: "Location", value: "New Delhi, India", href: "#" },
            ].map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 text-white">
                  {contact.icon}
                </div>
                <span className="text-sm font-medium text-white/70 mb-1">{contact.label}</span>
                <span className="text-base font-semibold">{contact.value}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

// ─── Root layout ──────────────────────────────────────────────────────────────
function AppLayout() {
  const [location] = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 selection:text-primary">
      <Header />

      <AnimatePresence mode="wait">
        <Switch key={location}>
          <Route path="/" component={HeroPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/experience" component={ExperiencePage} />
          <Route path="/research" component={ResearchPage} />
          <Route path="/publications" component={PublicationsPage} />
          <Route path="/education" component={EducationPage} />
          <Route path="/creative" component={CreativePage} />
          <Route path="/contact" component={ContactPage} />
        </Switch>
      </AnimatePresence>

      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 hover:-translate-y-1 transition-all z-50"
            aria-label="Scroll to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <Router base={base}>
      <AppLayout />
    </Router>
  );
}
