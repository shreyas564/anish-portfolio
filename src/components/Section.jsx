'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Section({
  id,
  children,
  className = '',
  title,
  subtitle,
  centered = true,
  fullWidth = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={id} className={`section-wrapper ${className}`} ref={ref}>
      <div style={{ maxWidth: fullWidth ? 'none' : '1200px', margin: '0 auto', padding: '0 24px' }}>
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
