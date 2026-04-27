'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiQuestionMarkCircle, HiExternalLink } from 'react-icons/hi';

export default function QuizSection({ data }) {
  const d = data || { title: '[Quiz Title]', platform: '[Platform]', embedUrl: '', externalUrl: '', stats: ['[Total Questions]', '[Duration]', '[Audience]'] };

  return (
    <Section id="quiz" title="Digital Quiz" subtitle="Interactive quiz created for educational assessment">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <HiQuestionMarkCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--text-primary)]">{d.title}</p>
                <p className="text-xs opacity-50">{d.platform}</p>
              </div>
            </div>
            {d.externalUrl && (
              <a href={d.externalUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-indigo-500 no-underline hover:underline">
                Open in new tab <HiExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          <div className="aspect-video">
            {d.embedUrl ? (
              <iframe src={d.embedUrl} className="w-full h-full border-none" title={d.title} allowFullScreen />
            ) : (
              <div className="placeholder-area w-full h-full rounded-none border-none">
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <HiQuestionMarkCircle className="w-8 h-8 text-purple-500/50" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold mb-1">Quiz Embed Area</p>
                    <p className="text-xs opacity-50 max-w-sm">Add your quiz embed URL in the admin panel</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-4 mt-6">
          {d.stats.map((info, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} className="glass-card p-4 text-center">
              <p className="text-xs opacity-60 mt-1">{info}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
