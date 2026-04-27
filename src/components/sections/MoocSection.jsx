'use client';
import { motion } from 'framer-motion';
import Section from '../Section';
import { HiChartBar, HiExternalLink, HiCheckCircle } from 'react-icons/hi';

export default function MoocSection({ data }) {
  const d = data || {
    timeline: [
      { step: '01', title: '[Course Title]', desc: '[Description]', status: '[Status]' },
    ],
    takeaways: '[Key takeaways here]',
  };

  return (
    <Section id="mooc" title="Continuous Learning Journey" subtitle="An analytical overview of completed massive open online courses, platform engagement, and acquired competencies">
      <div className="max-w-4xl mx-auto">
        {/* Featured card */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4" style={{ background: '#FFF7ED', color: '#EA580C' }}>Featured Certification</span>
          <h3 className="text-2xl font-bold tracking-tight mb-2" style={{ color: 'var(--navy-deep)' }}>
            {d.timeline[0]?.title || 'Course Title'}
          </h3>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{d.timeline[0]?.desc || 'Description'}</p>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Progress</p>
              <div className="w-40 h-2 rounded-full mt-2" style={{ background: '#E6E8EA' }}>
                <div className="h-full rounded-full" style={{ width: '100%', background: '#0058BE' }} />
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Status</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold mt-1" style={{ color: '#059669' }}>
                <HiCheckCircle className="w-4 h-4" /> {d.timeline[0]?.status || 'Completed'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Impact metrics */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EBF4FF' }}>
                <HiChartBar className="w-4 h-4" style={{ color: '#0058BE' }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--navy-deep)' }}>Impact Metrics</span>
            </div>
            <div className="flex gap-8">
              <div>
                <span className="text-3xl font-bold" style={{ color: 'var(--navy-deep)' }}>{d.timeline.length}</span>
                <span className="text-xl font-bold" style={{ color: 'var(--text-muted)' }}>+</span>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Courses Completed</p>
              </div>
              <div>
                <span className="text-3xl font-bold" style={{ color: 'var(--navy-deep)' }}>320</span>
                <span className="text-xl font-bold" style={{ color: 'var(--text-muted)' }}>+</span>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Hours Logged</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <span className="text-sm font-semibold block mb-3" style={{ color: 'var(--navy-deep)' }}>Key Competencies</span>
            <div className="flex flex-wrap gap-2">
              {(d.takeaways || '').split(',').filter(Boolean).slice(0, 6).map((t, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--bg-tertiary)' }}>
                  {t.trim()}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        {d.timeline.length > 1 && (
          <div className="space-y-4">
            {d.timeline.slice(1).map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold" style={{ background: '#EBF4FF', color: '#0058BE' }}>
                  {item.step}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold" style={{ color: 'var(--navy-deep)' }}>{item.title}</h4>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0" style={{ background: '#ECFDF5', color: '#059669' }}>{item.status}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
