'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiShieldCheck, HiPhotograph, HiVideoCamera } from 'react-icons/hi';

export default function SafetySection({ data }) {
  const d = data || { posterDescription: '[Poster description]', posterImage: '', videoDescription: '[Video description]', videoUrl: '', videoDuration: '[Duration]', videoFormat: '[Format]' };

  return (
    <Section id="safety" title="Digital Safety" subtitle="Poster and video content promoting digital safety awareness" className="bg-[var(--bg-secondary)]">
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#ECFDF5' }}>
              <HiPhotograph className="w-5 h-5" style={{ color: '#059669' }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--navy-deep)' }}>Safety Poster</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.posterDescription}</p>
            </div>
          </div>
          <div className="aspect-[3/4]">
            {d.posterImage ? (
              <img src={d.posterImage} alt="Safety Poster" className="w-full h-full object-cover" />
            ) : (
              <div className="placeholder-area w-full h-full" style={{ borderRadius: 0, border: 'none' }}>
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <HiPhotograph className="w-10 h-10" style={{ color: '#059669', opacity: 0.3 }} />
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Safety Poster</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden group">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#ECFDF5' }}>
              <HiVideoCamera className="w-5 h-5" style={{ color: '#059669' }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: 'var(--navy-deep)' }}>Safety Video</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.videoDescription}</p>
            </div>
          </div>
          <div className="aspect-video">
            {d.videoUrl ? (
              <iframe src={d.videoUrl} className="w-full h-full border-none" title="Safety Video" allowFullScreen />
            ) : (
              <div className="placeholder-area w-full h-full" style={{ borderRadius: 0, border: 'none' }}>
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <HiVideoCamera className="w-10 h-10" style={{ color: '#059669', opacity: 0.3 }} />
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Safety Video</p>
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-3 border-t border-slate-100 flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>{d.videoDuration}</span>
            <span>{d.videoFormat}</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
