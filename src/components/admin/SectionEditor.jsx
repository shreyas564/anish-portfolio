'use client';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { useState } from 'react';

export default function SectionEditor({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 cursor-pointer border-none bg-transparent text-[var(--text-primary)]"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-indigo-500" />}
          <span className="font-bold font-['Outfit'] text-lg">{title}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <HiChevronDown className="w-5 h-5 opacity-50" />
        </motion.div>
      </button>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-6 pb-6 space-y-4 border-t border-[var(--glass-border)]"
        >
          <div className="pt-4 space-y-4">{children}</div>
        </motion.div>
      )}
    </motion.div>
  );
}
