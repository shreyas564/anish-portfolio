'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiVideoCamera, HiPlay, HiPhotograph } from 'react-icons/hi';

export default function MediaSection({ data }) {
  const d = data || {
    videoTitle: '[Video Title]', videoDescription: '[Description]', videoUrl: '',
    gallery: [{ image: '', caption: '[Caption]' }, { image: '', caption: '[Caption]' }, { image: '', caption: '[Caption]' }],
  };

  return (
    <Section id="media" title="Poster & Media" subtitle="Explore our curated collection of academic visual presentations and multimedia lectures">
      <div className="max-w-5xl mx-auto">
        {/* Featured Video */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="aspect-video relative">
            {d.videoUrl ? (
              <iframe src={d.videoUrl} className="w-full h-full border-none" title={d.videoTitle} allowFullScreen />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #1A2B3C, #041627)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                  <HiPlay className="w-7 h-7 text-white ml-1" />
                </div>
                <p className="text-sm font-medium text-white/60">Video Preview</p>
              </div>
            )}
          </div>
          <div className="p-6">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#0058BE' }}>Featured Presentation</span>
            <h3 className="text-lg font-bold mt-1 tracking-tight" style={{ color: 'var(--navy-deep)' }}>{d.videoTitle}</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{d.videoDescription}</p>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {d.gallery.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden group">
              <div className="h-52">
                {item.image ? (
                  <img src={item.image} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: '#F2F4F6' }}>
                    <HiPhotograph className="w-8 h-8" style={{ color: 'var(--text-muted)', opacity: 0.2 }} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--navy-deep)' }}>{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
