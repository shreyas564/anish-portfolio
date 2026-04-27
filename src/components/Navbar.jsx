'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Media', href: '#media' },
  { label: 'Downloads', href: '#downloads' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) { setActiveSection(sections[i]); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-4 inset-x-0 mx-auto z-50 transition-all duration-400 ${scrolled ? 'top-0' : 'top-4'}`}
      style={{ maxWidth: '1280px', padding: '0 16px' }}>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex justify-between items-center px-6 sm:px-8 h-14 transition-all duration-400 ${
          scrolled
            ? 'rounded-none shadow-md bg-white/80 backdrop-blur-md border-b border-slate-200/50'
            : 'rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md shadow-[0_8px_32px_0_rgba(31,38,135,0.08)]'
        }`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Logo */}
        <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-2 no-underline shrink-0">
          <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#0058BE' }}>
            <span className="text-white font-bold text-xs">E</span>
          </div>
          <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-indigo-400 bg-clip-text" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            EduPortfolio
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={`text-sm tracking-tight no-underline cursor-pointer transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-500 pb-1'
                    : 'text-slate-600 hover:text-blue-500 font-medium'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <a href="#footer" onClick={(e) => { e.preventDefault(); handleNavClick('#footer'); }}
            className="hidden lg:inline-flex px-5 py-2 rounded-full text-sm font-semibold text-white no-underline transition-all hover:opacity-90"
            style={{ background: '#0058BE' }}>
            Contact
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer border border-slate-200 bg-white text-slate-600"
            aria-label="Menu">
            {mobileOpen ? <HiX className="w-4 h-4" /> : <HiMenu className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="md:hidden mt-2 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl p-3">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a key={link.href} href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium no-underline transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                  }`}>
                  {link.label}
                </a>
              );
            })}
            <a href="#footer" onClick={(e) => { e.preventDefault(); handleNavClick('#footer'); setMobileOpen(false); }}
              className="block mt-2 px-4 py-3 rounded-xl text-sm font-semibold text-white text-center no-underline" style={{ background: '#0058BE' }}>
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
