'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../Section';
import { HiChevronLeft, HiChevronRight, HiNewspaper } from 'react-icons/hi';

export default function NewsletterSection({ data }) {
  const items = data?.items || Array.from({ length: 6 }, (_, i) => ({
    title: `[Page ${i + 1} Title]`,
    description: '[Add description here]',
    image: '',
  }));

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const totalPages = items.length;

  const goToPage = useCallback((newPage, dir) => {
    if (isFlipping || newPage < 0 || newPage >= totalPages) return;
    setIsFlipping(true);
    setDirection(dir);
    setCurrentPage(newPage);
    setTimeout(() => setIsFlipping(false), 600);
  }, [isFlipping, totalPages]);

  const nextPage = () => goToPage(currentPage + 1, 1);
  const prevPage = () => goToPage(currentPage - 1, -1);

  const flipVariants = {
    enter: (dir) => ({ rotateY: dir > 0 ? 90 : -90, opacity: 0, scale: 0.95 }),
    center: { rotateY: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: (dir) => ({ rotateY: dir > 0 ? -90 : 90, opacity: 0, scale: 0.95, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } }),
  };

  const currentItem = items[currentPage];

  return (
    <Section id="newsletter" title="Digital Newsletter" subtitle="Flip through the pages of our educational newsletter" className="bg-[var(--bg-secondary)]">
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Book Container */}
        <div style={{ perspective: '1800px', position: 'relative' }}>
          {/* Book Shadow */}
          <div style={{ position: 'absolute', bottom: -12, left: '10%', right: '10%', height: 24, background: 'rgba(0, 88, 190, 0.1)', filter: 'blur(20px)', borderRadius: '50%' }} />

          {/* Book */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm" style={{ overflow: 'hidden', position: 'relative' }}>
            {/* Book header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: '1px solid #E6E8EA' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#EBF4FF' }}>
                  <HiNewspaper style={{ width: 18, height: 18, color: '#0058BE' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--navy-deep)' }}>Digital Newsletter</p>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Page {currentPage + 1} of {totalPages}</p>
                </div>
              </div>

              {/* Page dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
                    style={{
                      width: i === currentPage ? 24 : 8, height: 8, borderRadius: 4, border: 'none', cursor: 'pointer',
                      background: i === currentPage ? '#0058BE' : 'rgba(0, 88, 190, 0.2)',
                      transition: 'all 0.3s ease',
                    }}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Page content with flip animation */}
            <div style={{ position: 'relative', minHeight: 500, overflow: 'hidden', transformStyle: 'preserve-3d' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={flipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', padding: 32,
                    transformOrigin: direction > 0 ? 'left center' : 'right center',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {currentItem.image ? (
                    <img src={currentItem.image} alt={currentItem.title} style={{ width: '100%', height: 360, objectFit: 'contain', borderRadius: 12, marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }} />
                  ) : (
                    <div style={{ width: '100%', height: 360, borderRadius: 12, border: '2px dashed rgba(0, 88, 190, 0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'rgba(0, 88, 190, 0.03)' }}>
                      <HiNewspaper style={{ width: 48, height: 48, color: 'rgba(0, 88, 190, 0.2)' }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Newsletter page {currentPage + 1}</span>
                    </div>
                  )}

                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: "'Inter', sans-serif", color: 'var(--navy-deep)', marginBottom: 4 }}>
                      {currentItem.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{currentItem.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderTop: '1px solid #E6E8EA' }}>
              <button
                onClick={prevPage}
                disabled={currentPage === 0 || isFlipping}
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors cursor-pointer"
                style={{ borderColor: currentPage === 0 ? '#E6E8EA' : '#D0D5DD', background: 'white', color: currentPage === 0 ? '#D0D5DD' : 'var(--text-secondary)', opacity: currentPage === 0 ? 0.4 : 1 }}
              >
                <HiChevronLeft style={{ width: 18, height: 18 }} />
              </button>

              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {currentPage + 1} / {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1 || isFlipping}
                className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors cursor-pointer"
                style={{ borderColor: currentPage === totalPages - 1 ? '#E6E8EA' : '#D0D5DD', background: 'white', color: currentPage === totalPages - 1 ? '#D0D5DD' : 'var(--text-secondary)', opacity: currentPage === totalPages - 1 ? 0.4 : 1 }}
              >
                <HiChevronRight style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </div>
        </div>

        {/* Page thumbnails */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
          {items.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
              whileHover={{ y: -3 }}
              className="border transition-all cursor-pointer overflow-hidden flex items-center justify-center"
              style={{
                width: 56, height: 72, borderRadius: 8,
                borderColor: i === currentPage ? '#0058BE' : '#E6E8EA',
                borderWidth: i === currentPage ? 2 : 1,
                background: 'white',
                boxShadow: i === currentPage ? '0 4px 12px rgba(0, 88, 190, 0.2)' : 'none',
              }}
            >
              {item.image ? (
                <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>Pg {i + 1}</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </Section>
  );
}
