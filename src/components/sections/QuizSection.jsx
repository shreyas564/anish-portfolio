'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiQuestionMarkCircle, HiExternalLink } from 'react-icons/hi';

export default function QuizSection({ data }) {
  const d = data || { title: '[Quiz Title]', platform: '[Platform]', embedUrl: '', externalUrl: '', stats: ['[Total Questions]', '[Duration]', '[Audience]'] };

  return (
    <Section id="quiz" title="Digital Quiz" subtitle="Interactive quiz created for educational assessment">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F3E8FF' }}>
                <HiQuestionMarkCircle className="w-5 h-5" style={{ color: '#7C3AED' }} />
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--navy-deep)' }}>{d.title}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.platform}</p>
              </div>
            </div>
            {d.externalUrl && (
              <a href={d.externalUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-semibold no-underline" style={{ color: '#0058BE' }}>
                Open <HiExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="aspect-video">
            {d.embedUrl ? (
              <iframe src={d.embedUrl} className="w-full h-full border-none" title={d.title} allowFullScreen />
            ) : (
              <div className="placeholder-area w-full h-full" style={{ borderRadius: 0, border: 'none' }}>
                <div className="flex flex-col items-center justify-center h-full gap-3 p-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: '#F3E8FF' }}>
                    <HiQuestionMarkCircle className="w-7 h-7" style={{ color: '#7C3AED', opacity: 0.5 }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Quiz Embed Area</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>Add your quiz embed URL in the admin panel</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {d.stats.map((info, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-xl border border-slate-200 p-4 text-center shadow-sm">
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{info}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
