'use client';
import { motion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import { HiArrowDown, HiDownload, HiEye } from 'react-icons/hi';

export default function HeroSection({ data }) {
  const d = data || { name: '[Student Name]', tagline: '[Add your tagline here]', academicYear: '[Academic Year]' };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticlesBackground />
      <div className="orb w-[500px] h-[500px] bg-indigo-600 top-[-100px] left-[-100px]" />
      <div className="orb w-[400px] h-[400px] bg-purple-600 bottom-[-80px] right-[-80px]" />
      <div className="orb w-[300px] h-[300px] bg-cyan-500 top-[40%] right-[10%]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[var(--text-primary)] opacity-80">B.Ed Second Semester • {d.academicYear}</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-5xl sm:text-6xl lg:text-7xl font-black font-['Outfit'] leading-tight mb-6">
          <span className="text-[var(--text-primary)]">Hi, I&apos;m </span>
          <span className="gradient-text">{d.name}</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="text-lg sm:text-xl opacity-70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {d.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} className="flex flex-wrap justify-center gap-4 mb-16">
          <a href="#projects" className="btn-primary"><HiEye className="w-5 h-5" /> View Work</a>
          <a href="#downloads" className="btn-outline"><HiDownload className="w-5 h-5" /> Download Portfolio</a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="flex flex-col items-center gap-2 opacity-50">
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <HiArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
