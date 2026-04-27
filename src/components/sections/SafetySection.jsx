'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiShieldCheck, HiPhotograph, HiVideoCamera } from 'react-icons/hi';

export default function SafetySection({ data }) {
  const d = data || { posterDescription: '[Poster description]', posterImage: '', videoDescription: '[Video description]', videoUrl: '', videoDuration: '[Duration]', videoFormat: '[Format]' };

  return (
    <Section id="safety" title="Digital Safety" subtitle="Poster and video content promoting digital safety awareness" className="bg-[var(--bg-secondary)]">
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card overflow-hidden group">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <HiPhotograph className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Safety Poster</p>
              <p className="text-xs opacity-50">{d.posterDescription}</p>
            </div>
          </div>
          <div className="aspect-[3/4]">
            {d.posterImage ? (
              <img src={d.posterImage} alt="Safety Poster" className="w-full h-full object-cover" />
            ) : (
              <div className="placeholder-area w-full h-full rounded-none border-none">
                <div className="flex flex-col items-center justify-center h-full gap-3 p-8">
                  <HiPhotograph className="w-12 h-12 text-emerald-500/40" />
                  <p className="text-sm opacity-50 text-center">Insert your Digital Safety Poster image here</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="glass-card overflow-hidden group">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <HiVideoCamera className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Safety Video</p>
              <p className="text-xs opacity-50">{d.videoDescription}</p>
            </div>
          </div>
          <div className="aspect-video">
            {d.videoUrl ? (
              <iframe src={d.videoUrl} className="w-full h-full border-none" title="Safety Video" allowFullScreen />
            ) : (
              <div className="placeholder-area w-full h-full rounded-none border-none">
                <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <HiVideoCamera className="w-8 h-8 text-emerald-500/50" />
                  </div>
                  <p className="text-sm opacity-50 text-center">Embed your Digital Safety Video here</p>
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-4 border-t border-white/10">
            <div className="flex justify-between text-xs opacity-50">
              <span>{d.videoDuration}</span>
              <span>{d.videoFormat}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
