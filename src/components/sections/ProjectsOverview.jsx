'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import Card from '../Card';
import { HiNewspaper, HiQuestionMarkCircle, HiShieldCheck, HiChartBar, HiGlobe } from 'react-icons/hi';

const iconMap = {
  '#newsletter': HiNewspaper,
  '#quiz': HiQuestionMarkCircle,
  '#safety': HiShieldCheck,
  '#mooc': HiChartBar,
  '#iks': HiGlobe,
};
const colorMap = {
  '#newsletter': 'from-blue-500 to-indigo-600',
  '#quiz': 'from-purple-500 to-pink-600',
  '#safety': 'from-emerald-500 to-teal-600',
  '#mooc': 'from-orange-500 to-red-600',
  '#iks': 'from-cyan-500 to-blue-600',
};

export default function ProjectsOverview({ data }) {
  const defaults = [
    { title: 'Digital Newsletter', desc: '[Add description]', href: '#newsletter' },
    { title: 'Digital Quiz', desc: '[Add description]', href: '#quiz' },
    { title: 'Digital Safety Poster/Video', desc: '[Add description]', href: '#safety' },
    { title: 'MOOC Analysis', desc: '[Add description]', href: '#mooc' },
    { title: 'IKS Project', desc: '[Add description]', href: '#iks' },
  ];
  const projects = data || defaults;

  return (
    <Section id="projects" title="My Projects" subtitle="A showcase of academic work and digital creations from B.Ed Second Semester">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {projects.map((project, i) => {
          const Icon = iconMap[project.href] || HiNewspaper;
          const color = colorMap[project.href] || 'from-indigo-500 to-purple-600';
          return (
            <Card key={i} delay={i * 0.1} className="relative overflow-hidden" style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} style={{ opacity: 0.6 }} />

              {/* Icon */}
              <div className={`bg-gradient-to-br ${color}`} style={{ width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                <Icon style={{ width: 28, height: 28, color: 'white' }} />
              </div>

              {/* Content */}
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)', marginBottom: 8 }}>
                {project.title}
              </h3>
              <p style={{ fontSize: '0.875rem', opacity: 0.6, lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                {project.desc}
              </p>

              {/* Button */}
              <motion.a
                href={project.href}
                whileHover={{ x: 4 }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', fontWeight: 600, color: '#6366f1', textDecoration: 'none' }}
              >
                View Details <span>→</span>
              </motion.a>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
