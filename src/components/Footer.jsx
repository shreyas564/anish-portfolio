'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaInstagram } from 'react-icons/fa';

const socialConfig = [
  { key: 'github', icon: FaGithub, label: 'GitHub' },
  { key: 'linkedin', icon: FaLinkedin, label: 'LinkedIn' },
  { key: 'twitter', icon: FaTwitter, label: 'Twitter' },
  { key: 'instagram', icon: FaInstagram, label: 'Instagram' },
  { key: 'email', icon: FaEnvelope, label: 'Email' },
];

export default function Footer({ data }) {
  const d = data || { name: '[Student Name]', course: 'B.Ed Second Semester', college: '[College Name]', year: '[Year]', socials: {} };

  return (
    <footer id="footer" style={{ position: 'relative', padding: '64px 0', overflow: 'hidden' }}>
      {/* Top gradient line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center' }}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: 24 }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 18,
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>P</span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)' }}>
              {d.name}
            </h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.6, marginTop: 4 }}>
              {d.course} • {d.college}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 32 }}
          >
            {socialConfig.map((social) => {
              const href = d.socials?.[social.key] || '#';
              const finalHref = social.key === 'email' && href !== '#' ? `mailto:${href}` : href;
              return (
                <motion.a
                  key={social.key}
                  href={finalHref}
                  target={social.key !== 'email' ? '_blank' : undefined}
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-card"
                  style={{
                    width: 44, height: 44, borderRadius: 14, padding: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-primary)', opacity: 0.6,
                    transition: 'all 0.3s ease', textDecoration: 'none',
                  }}
                  aria-label={social.label}
                  title={social.label}
                >
                  <social.icon style={{ width: 16, height: 16 }} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)', marginBottom: 24 }} />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '0.875rem', opacity: 0.5 }}
          >
            <p>© {new Date().getFullYear()} {d.name} — B.Ed Portfolio</p>
            <p style={{ marginTop: 4, fontSize: '0.75rem' }}>Academic Year: {d.year} • All rights reserved</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
