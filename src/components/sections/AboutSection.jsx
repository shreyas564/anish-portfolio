'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiAcademicCap, HiBookOpen, HiLightBulb } from 'react-icons/hi';

const icons = [HiAcademicCap, HiBookOpen, HiLightBulb];
const iconColors = ['#0058BE', '#4C93E6', '#00152E'];

export default function AboutSection({ data }) {
  const d = data || {
    name: '[Student Name]',
    paragraph1: '[Add your introduction paragraph here]',
    paragraph2: '[Add a second paragraph here]',
    profileImage: '',
    highlights: [
      { label: 'IKS', desc: 'Indigenous Knowledge' },
      { label: 'MOOC', desc: 'Online Learning' },
      { label: 'STEM', desc: 'Sci & Tech Integr.' },
    ],
  };

  return (
    <section id="about" className="section-wrapper" style={{ background: 'var(--bg-secondary)', borderRadius: '3rem', margin: '0 auto', maxWidth: '1280px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 48px' }}>
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3 shrink-0"
          >
            <div style={{ aspectRatio: '1/1', borderRadius: '2rem', overflow: 'hidden', border: '8px solid white', boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}>
              {d.profileImage ? (
                <img src={d.profileImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #E6E8EA, #F2F4F6)' }}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(0,88,190,0.1)' }}>
                    <HiAcademicCap style={{ width: 40, height: 40, color: '#0058BE', opacity: 0.5 }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Profile Image</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:w-2/3"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-6" style={{ color: 'var(--navy-deep)' }}>About the Portfolio</h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <p>{d.paragraph1}</p>
              <p>{d.paragraph2}</p>
            </div>

            {/* Highlights */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              {d.highlights.map((item, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.div key={i} whileHover={{ y: -3 }} className="flex flex-col gap-1.5 p-4 rounded-xl" style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <Icon style={{ width: 20, height: 20, color: iconColors[i % iconColors.length] }} />
                    <span className="text-sm font-bold" style={{ color: '#0058BE' }}>{item.label}</span>
                    <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{item.desc}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
