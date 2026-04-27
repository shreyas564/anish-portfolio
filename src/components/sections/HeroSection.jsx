'use client';
import { motion } from 'framer-motion';
import ParticlesBackground from '../ParticlesBackground';
import { HiArrowRight, HiDownload } from 'react-icons/hi';

export default function HeroSection({ data }) {
  const d = data || { name: '[Student Name]', tagline: '[Add your tagline here]', academicYear: '[Academic Year]' };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'var(--gradient-hero-bg)' }}>
      <ParticlesBackground />
      <div className="orb w-[400px] h-[400px] top-[-80px] left-[-80px]" style={{ background: 'rgba(210, 228, 251, 0.6)' }} />
      <div className="orb w-[350px] h-[350px] bottom-[-60px] right-[-60px]" style={{ background: 'rgba(232, 226, 255, 0.5)' }} />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 sm:px-12 grid lg:grid-cols-2 gap-12 items-center py-32">
        {/* Left — Text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            style={{ background: 'rgba(0,88,190,0.08)', color: '#0058BE' }}
          >
            Professional Educator Portfolio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight mb-5"
            style={{ color: 'var(--navy-deep)', fontFamily: "'Inter', sans-serif" }}
          >
            B.Ed Portfolio: Shaping the{' '}
            <span style={{ color: '#0058BE' }}>Future</span> through Education.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-base sm:text-lg leading-relaxed max-w-xl mb-8"
            style={{ color: 'var(--text-muted)' }}
          >
            {d.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn-primary">
              View Work <HiArrowRight className="w-4 h-4" />
            </a>
            <a href="#about" className="btn-outline" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(12px)' }}>
              About Me
            </a>
          </motion.div>
        </div>

        {/* Right — Card visual (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block relative"
        >
          <div className="glass-card p-5" style={{ borderRadius: '2rem' }}>
            <div className="w-full h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: '#0058BE' }}>
                  <span className="text-white text-3xl font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {d.name.charAt(0) || 'A'}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--navy-deep)' }}>{d.name}</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>B.Ed Second Semester • {d.academicYear}</p>
              </div>
            </div>
          </div>
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 glass-card px-5 py-3 flex items-center gap-3 z-20 border border-blue-100"
            style={{ borderRadius: '1rem' }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#0058BE' }}>
              <span className="text-white text-sm">⭐</span>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--navy-deep)' }}>Class of {d.academicYear}</p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Academic Portfolio</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
