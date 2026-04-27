'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiVideoCamera, HiPhotograph } from 'react-icons/hi';

export default function MediaSection({ data }) {
  const d = data || { videoTitle: '[Video Title]', videoDescription: '[Description]', videoUrl: '', gallery: Array.from({ length: 6 }, () => ({ image: '', caption: '' })) };

  return (
    <Section id="media" title="Media Gallery" subtitle="Videos and images from academic activities and projects">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card overflow-hidden mb-10 max-w-4xl mx-auto">
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
            <HiVideoCamera className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--text-primary)]">{d.videoTitle}</p>
            <p className="text-xs opacity-50">{d.videoDescription}</p>
          </div>
        </div>
        <div className="aspect-video">
          {d.videoUrl ? (
            <iframe src={d.videoUrl} className="w-full h-full border-none" title={d.videoTitle} allowFullScreen />
          ) : (
            <div className="placeholder-area w-full h-full rounded-none border-none">
              <div className="flex flex-col items-center justify-center h-full gap-4 p-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 flex items-center justify-center">
                  <HiVideoCamera className="w-10 h-10 text-red-500/50" />
                </div>
                <p className="text-sm opacity-50">Embed your video here via admin panel</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <h3 className="text-xl font-bold font-['Outfit'] text-[var(--text-primary)] text-center mb-8">
        <span className="gradient-text">Image Gallery</span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {d.gallery.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} whileHover={{ scale: 1.03, y: -4 }} className="glass-card overflow-hidden group cursor-pointer !p-0">
            <div className="aspect-square">
              {item.image ? (
                <img src={item.image} alt={item.caption || `Gallery ${i + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="placeholder-area w-full h-full rounded-none border-none">
                  <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                    <HiPhotograph className="w-8 h-8 text-indigo-500/30 group-hover:text-indigo-500/50 transition-colors" />
                    <span className="text-xs opacity-40 text-center">Image {i + 1}</span>
                  </div>
                </div>
              )}
            </div>
            {item.caption && <p className="text-xs text-center py-2 opacity-60">{item.caption}</p>}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
