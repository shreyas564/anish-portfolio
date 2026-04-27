'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section({ id, children, className = '', title, subtitle, fullWidth = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={id} className={`section-wrapper ${className}`} ref={ref}>
      <div style={{ maxWidth: fullWidth ? 'none' : '1280px', margin: '0 auto', padding: '0 48px' }}>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="section-header"
          >
            {title && (
              <h2 className="section-title">
                <span className="gradient-text">{title}</span>
              </h2>
            )}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
