'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiLockClosed, HiKey } from 'react-icons/hi';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        onLogin(password);
      }
    } catch {
      setError('Connection error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: '#F7F9FB', fontFamily: "'Inter', sans-serif" }}>
      {/* Subtle gradient orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[400px] relative z-10"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.15, stiffness: 260, damping: 20 }}
              className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5"
              style={{ background: '#1A2B3C' }}
            >
              <HiLockClosed className="w-7 h-7 text-blue-400" />
            </motion.div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Login</h1>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">Enter your password to access the Content Studio</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <HiKey className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter master password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 text-sm outline-none transition-all duration-200 bg-slate-50 border border-slate-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 focus:bg-white"
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-sm font-medium text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-lg text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-none cursor-pointer text-white disabled:opacity-50"
              style={{ background: '#0058BE' }}
              onMouseOver={(e) => { e.currentTarget.style.background = '#004395'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = '#0058BE'; }}
            >
              {loading ? 'Authenticating...' : 'Unlock Studio'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-6 font-medium tracking-wider uppercase">
          B.Ed Portfolio System
        </p>
      </motion.div>
    </div>
  );
}
