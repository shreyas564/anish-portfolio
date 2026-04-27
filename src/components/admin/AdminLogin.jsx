'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
            <HiLockClosed className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-[var(--text-primary)]">Admin Panel</h1>
          <p className="text-sm opacity-60 mt-1">Enter password to manage content</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <HiKey className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center"
          >
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>
        <p className="text-xs opacity-40 text-center mt-6">Default password: admin123</p>
      </motion.div>
    </div>
  );
}
