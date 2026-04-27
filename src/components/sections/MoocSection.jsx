'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiCheckCircle } from 'react-icons/hi';

export default function MoocSection({ data }) {
  const d = data || {
    timeline: [
      { step: '01', title: '[MOOC Platform Name]', desc: '[Details here]', status: '[Status]' },
      { step: '02', title: '[Course Module 1]', desc: '[Details here]', status: '[Status]' },
    ],
    takeaways: '[Add your key takeaways here]',
  };

  return (
    <Section id="mooc" title="MOOC Analysis" subtitle="Analysis of Massive Open Online Courses undertaken during the semester">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 opacity-30" />
          {d.timeline.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative flex gap-6 mb-8 last:mb-0">
              <div className="relative z-10 flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>
              </div>
              <div className="glass-card p-5 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-base font-bold font-['Outfit'] text-[var(--text-primary)]">{item.title}</h4>
                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-medium flex-shrink-0">{item.status}</span>
                </div>
                <p className="text-sm opacity-60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="glass-card p-6 mt-8">
          <div className="flex items-center gap-3 mb-3">
            <HiCheckCircle className="w-6 h-6 text-emerald-500" />
            <h4 className="text-base font-bold text-[var(--text-primary)]">Key Takeaways</h4>
          </div>
          <p className="text-sm opacity-60 leading-relaxed">{d.takeaways}</p>
        </motion.div>
      </div>
    </Section>
  );
}
