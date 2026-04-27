'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiDownload, HiPhotograph, HiNewspaper, HiDocumentText } from 'react-icons/hi';

const iconList = [HiPhotograph, HiNewspaper, HiDocumentText];
const accentBg = ['#ECFDF5', '#EBF4FF', '#F3E8FF'];
const accentColor = ['#059669', '#0058BE', '#7C3AED'];

export default function DownloadSection({ data }) {
  const defaults = [
    { title: 'Download Poster', desc: 'Digital Safety Poster', file: '' },
    { title: 'Download Newsletter', desc: 'Digital Newsletter', file: '' },
    { title: 'Download Report', desc: 'Portfolio Report', file: '' },
  ];
  const downloads = data || defaults;

  return (
    <Section id="downloads" title="Downloads" subtitle="Download project files and documents" className="bg-[var(--bg-secondary)]">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {downloads.map((item, i) => {
          const Icon = iconList[i % iconList.length];
          return (
            <motion.a
              key={i}
              href={item.file || '#'}
              download={!!item.file}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center no-underline block transition-shadow hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: accentBg[i % 3] }}>
                <Icon className="w-6 h-6" style={{ color: accentColor[i % 3] }} />
              </div>
              <h4 className="text-base font-bold mb-1" style={{ color: 'var(--navy-deep)' }}>{item.title}</h4>
              <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors" style={{ background: accentBg[i % 3], color: accentColor[i % 3] }}>
                <HiDownload className="w-4 h-4" /> Download
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
