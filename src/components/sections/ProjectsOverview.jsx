'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiNewspaper, HiQuestionMarkCircle, HiShieldCheck, HiChartBar, HiGlobe, HiArrowRight } from 'react-icons/hi';

const iconMap = { '#newsletter': HiNewspaper, '#quiz': HiQuestionMarkCircle, '#safety': HiShieldCheck, '#mooc': HiChartBar, '#iks': HiGlobe };
const bgColors = { '#newsletter': '#EBF4FF', '#quiz': '#F3E8FF', '#safety': '#ECFDF5', '#mooc': '#FFF7ED', '#iks': '#EBF4FF' };
const accentColors = { '#newsletter': '#0058BE', '#quiz': '#7C3AED', '#safety': '#059669', '#mooc': '#EA580C', '#iks': '#0058BE' };

export default function ProjectsOverview({ data }) {
  const defaults = [
    { title: 'Digital Newsletter', desc: 'A comprehensive educational newsletter with curated content', href: '#newsletter' },
    { title: 'Digital Quiz', desc: 'Interactive assessment tool for educational evaluation', href: '#quiz' },
    { title: 'Digital Safety Poster/Video', desc: 'Awareness resources promoting digital safety', href: '#safety' },
    { title: 'MOOC Analysis', desc: 'Critical review of massive open online courses', href: '#mooc' },
    { title: 'IKS Project', desc: 'Integrating indigenous knowledge systems', href: '#iks' },
  ];
  const projects = data || defaults;

  return (
    <Section id="projects" title="Featured Case Studies" subtitle="A showcase of academic work and digital creations from B.Ed Second Semester">
      <div className="flex gap-6 overflow-x-auto pb-6 snap-x" style={{ scrollbarWidth: 'none' }}>
        {projects.map((project, i) => {
          const Icon = iconMap[project.href] || HiNewspaper;
          const bg = bgColors[project.href] || '#EBF4FF';
          const accent = accentColors[project.href] || '#0058BE';
          return (
            <motion.a
              key={i}
              href={project.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card snap-center shrink-0 overflow-hidden group"
              style={{ minWidth: 300, maxWidth: 400, flex: '1 0 300px', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
            >
              {/* Color header */}
              <div className="h-44 flex items-center justify-center" style={{ background: bg }}>
                <Icon style={{ width: 56, height: 56, color: accent, opacity: 0.5 }} />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: accent }}>
                  Case Study {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="text-lg font-bold tracking-tight mb-2" style={{ color: 'var(--navy-deep)' }}>{project.title}</h4>
                <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-muted)' }}>{project.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
                  View Details <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </Section>
  );
}
