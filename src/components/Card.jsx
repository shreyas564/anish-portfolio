'use client';
import { motion } from 'framer-motion';

export default function Card({ children, className = '', delay = 0, hover = true, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -6, transition: { duration: 0.3 } } : {}}
      className={`glass-card ${className}`}
      style={{ padding: 24, ...style }}
    >
      {children}
    </motion.div>
  );
}
