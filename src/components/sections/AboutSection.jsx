'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiAcademicCap, HiBookOpen, HiLightBulb } from 'react-icons/hi';

const icons = [HiAcademicCap, HiBookOpen, HiLightBulb];

export default function AboutSection({ data }) {
  const d = data || {
    name: '[Student Name]',
    paragraph1: '[Add your introduction paragraph here]',
    paragraph2: '[Add a second paragraph here]',
    profileImage: '',
    highlights: [
      { label: 'B.Ed Student', desc: '[Add detail here]' },
      { label: 'Second Semester', desc: '[Add detail here]' },
      { label: 'Passionate Learner', desc: '[Add detail here]' },
    ],
  };

  return (
    <Section id="about" title="About Me" subtitle="Get to know the person behind the portfolio" className="bg-[var(--bg-secondary)]">
      <div className="about-grid">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative' }}
        >
          <div style={{
            aspectRatio: '4/5', maxWidth: 380, margin: '0 auto',
            borderRadius: 24, overflow: 'hidden',
            border: '2px dashed rgba(99, 102, 241, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(99, 102, 241, 0.03)',
          }}>
            {d.profileImage ? (
              <img src={d.profileImage} alt={d.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 32 }}>
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <HiAcademicCap style={{ width: 40, height: 40, color: 'rgba(99,102,241,0.5)' }} />
                </div>
                <span style={{ fontSize: '0.875rem', opacity: 0.6, textAlign: 'center' }}>Insert your profile image here</span>
              </div>
            )}
          </div>
          {/* Decorative */}
          <div style={{ position: 'absolute', top: -16, right: -16, width: 96, height: 96, borderRadius: 18, background: 'linear-gradient(135deg, #6366f1, #a855f7)', opacity: 0.15, zIndex: -1 }} />
          <div style={{ position: 'absolute', bottom: -16, left: -16, width: 128, height: 128, borderRadius: 18, background: 'linear-gradient(135deg, #a855f7, #06b6d4)', opacity: 0.12, zIndex: -1 }} />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)', marginBottom: 16 }}>
            {d.name}
          </h3>
          <p style={{ color: 'var(--text-primary)', opacity: 0.7, lineHeight: 1.7, marginBottom: 12 }}>
            {d.paragraph1}
          </p>
          <p style={{ color: 'var(--text-primary)', opacity: 0.6, lineHeight: 1.7, marginBottom: 32 }}>
            {d.paragraph2}
          </p>

          {/* Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {d.highlights.map((item, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div key={i} whileHover={{ y: -4 }} className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
                  <Icon style={{ width: 28, height: 28, color: '#6366f1', margin: '0 auto 8px' }} />
                  <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</p>
                  <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: 4 }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
