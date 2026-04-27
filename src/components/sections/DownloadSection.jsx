'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiDownload, HiNewspaper, HiPhotograph, HiDocumentText } from 'react-icons/hi';

const iconList = [HiPhotograph, HiNewspaper, HiDocumentText];
const colorList = ['from-emerald-500 to-teal-600', 'from-blue-500 to-indigo-600', 'from-purple-500 to-pink-600'];

export default function DownloadSection({ data }) {
  const defaults = [
    { title: 'Download Poster', desc: '[Digital Safety Poster]', file: '' },
    { title: 'Download Newsletter', desc: '[Digital Newsletter]', file: '' },
    { title: 'Download Report', desc: '[Portfolio Report]', file: '' },
  ];
  const downloads = data || defaults;

  return (
    <Section id="downloads" title="Downloads" subtitle="Download project files and documents" className="bg-[var(--bg-secondary)]">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, maxWidth: 900, margin: '0 auto' }}>
        {downloads.map((item, i) => {
          const Icon = iconList[i % iconList.length];
          const color = colorList[i % colorList.length];
          return (
            <motion.a
              key={i}
              href={item.file || '#'}
              download={!!item.file}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="glass-card"
              style={{ padding: 28, textAlign: 'center', cursor: 'pointer', textDecoration: 'none', display: 'block' }}
            >
              <div className={`bg-gradient-to-br ${color}`} style={{
                width: 64, height: 64, borderRadius: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}>
                <Icon style={{ width: 32, height: 32, color: 'white' }} />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)', marginBottom: 8 }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.75rem', opacity: 0.5, marginBottom: 20 }}>{item.desc}</p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 12,
                background: 'rgba(99, 102, 241, 0.1)',
                color: '#6366f1', fontSize: '0.85rem', fontWeight: 600,
                transition: 'all 0.3s ease',
              }}>
                <HiDownload style={{ width: 16, height: 16 }} /> Download
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
