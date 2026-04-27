'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../Section';
import { HiChevronLeft, HiChevronRight, HiGlobe } from 'react-icons/hi';

export default function IksSection({ data }) {
  const d = data || { slides: [{ title: '[Slide Title]', desc: '[Description]', image: '' }] };
  const [current, setCurrent] = useState(0);
  const slides = d.slides || [];
  const slide = slides[current] || {};

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <Section id="iks" title="IKS Project Portfolio" subtitle="Bridging traditional wisdom with modern academic inquiry" className="bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto">
        {/* Hero spotlight */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass-card overflow-hidden mb-10" style={{ borderRadius: '2rem' }}>
          <div className="grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto">
              {slide.image ? (
                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full min-h-[280px] flex items-center justify-center" style={{ background: '#EBF4FF' }}>
                  <HiGlobe className="w-16 h-16" style={{ color: '#0058BE', opacity: 0.2 }} />
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#0058BE' }}>IKS Spotlight</span>
              <h3 className="text-2xl font-bold tracking-tight mb-3" style={{ color: 'var(--navy-deep)' }}>{slide.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{slide.desc}</p>
              <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white w-fit" style={{ background: '#0058BE' }}>
                Explore Project
              </a>
            </div>
          </div>
        </motion.div>

        {/* Navigation + cards */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold" style={{ color: 'var(--navy-deep)' }}>Active Slides ({slides.length})</p>
          <div className="flex gap-2">
            <button onClick={prev} className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
              <HiChevronLeft className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            </button>
            <button onClick={next} className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
              <HiChevronRight className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {slides.map((s, i) => (
            <motion.div key={i} whileHover={{ y: -4 }}
              onClick={() => setCurrent(i)}
              className={`bg-white rounded-xl border shadow-sm overflow-hidden cursor-pointer transition-all ${current === i ? 'border-blue-400 ring-2 ring-blue-100' : 'border-slate-200'}`}
            >
              <div className="h-40">
                {s.image ? (
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: '#F2F4F6' }}>
                    <HiGlobe className="w-8 h-8" style={{ color: '#0058BE', opacity: 0.15 }} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#0058BE' }}>Slide {i + 1}</span>
                <h4 className="text-sm font-bold mt-1 truncate" style={{ color: 'var(--navy-deep)' }}>{s.title}</h4>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
