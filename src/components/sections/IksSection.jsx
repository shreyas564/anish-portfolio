'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../Section';
import { HiGlobe, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function IksSection({ data }) {
  const slides = data?.slides || Array.from({ length: 5 }, (_, i) => ({ title: `[Slide ${i + 1} Title]`, desc: `[Content for slide ${i + 1}]`, image: '' }));
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <Section id="iks" title="IKS Project" subtitle="Indian Knowledge Systems — Exploring traditional knowledge and its modern relevance" className="bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card overflow-hidden relative">
          <div className="relative min-h-[400px] sm:min-h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="absolute inset-0 flex flex-col items-center justify-center p-8 sm:p-12">
                <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 mb-3 uppercase tracking-wider">Slide {current + 1} of {slides.length}</span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-[var(--text-primary)] mb-3 text-center">{slides[current].title}</h3>
                <p className="text-sm opacity-60 text-center max-w-lg leading-relaxed">{slides[current].desc}</p>
                <div className="mt-6 w-full max-w-md aspect-video rounded-2xl overflow-hidden">
                  {slides[current].image ? (
                    <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="placeholder-area w-full h-full"><span className="text-xs opacity-50">Insert slide image here</span></div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
            <motion.button onClick={prev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center cursor-pointer border-none text-[var(--text-primary)] hover:bg-indigo-500/20 transition-colors">
              <HiChevronLeft className="w-5 h-5" />
            </motion.button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`carousel-dot ${i === current ? 'active' : ''}`} />
              ))}
            </div>
            <motion.button onClick={next} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center cursor-pointer border-none text-[var(--text-primary)] hover:bg-indigo-500/20 transition-colors">
              <HiChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </Section>
  );
}
