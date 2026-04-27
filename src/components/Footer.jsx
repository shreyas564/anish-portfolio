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
    <footer id="footer" style={{ borderTop: '1px solid #E6E8EA', background: '#F2F4F6', padding: '48px 0', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#0058BE' }}>
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--navy-deep)' }}>EduPortfolio System</span>
            </div>
            <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} {d.name} • {d.college}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socialConfig.map((social) => {
              const href = d.socials?.[social.key] || '#';
              const finalHref = social.key === 'email' && href !== '#' ? `mailto:${href}` : href;
              return (
                <motion.a
                  key={social.key}
                  href={finalHref}
                  target={social.key !== 'email' ? '_blank' : undefined}
                  rel="noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center no-underline transition-colors"
                  style={{ background: 'white', border: '1px solid #E6E8EA', color: 'var(--text-secondary)' }}
                  aria-label={social.label}
                >
                  <social.icon style={{ width: 14, height: 14 }} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
