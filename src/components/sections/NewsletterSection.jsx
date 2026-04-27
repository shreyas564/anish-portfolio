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
    enter: (dir) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] },
    }),
  };

  const currentItem = items[currentPage];

  return (
    <Section
      id="newsletter"
      title="Digital Newsletter"
      subtitle="Flip through the pages of our educational newsletter"
      className="bg-[var(--bg-secondary)]"
    >
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {/* Book Container */}
        <div style={{ perspective: '1800px', position: 'relative' }}>
          {/* Book Shadow */}
          <div style={{
            position: 'absolute', bottom: -12, left: '10%', right: '10%', height: 24,
            background: 'rgba(99, 102, 241, 0.15)', filter: 'blur(20px)', borderRadius: '50%',
          }} />

          {/* Book */}
          <div className="glass-card" style={{ overflow: 'hidden', position: 'relative' }}>
            {/* Book header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px', borderBottom: '1px solid var(--glass-border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <HiNewspaper style={{ width: 18, height: 18, color: 'white' }} />
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Digital Newsletter
                  </p>
                  <p style={{ fontSize: '0.7rem', opacity: 0.5 }}>
                    Page {currentPage + 1} of {totalPages}
                  </p>
                </div>
              </div>

              {/* Page dots */}
              <div style={{ display: 'flex', gap: 6 }}>
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
                    style={{
                      width: i === currentPage ? 24 : 8, height: 8,
                      borderRadius: 4, border: 'none', cursor: 'pointer',
                      background: i === currentPage ? '#6366f1' : 'rgba(99, 102, 241, 0.25)',
                      transition: 'all 0.3s ease',
                    }}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Page content with flip animation */}
            <div style={{
              position: 'relative', minHeight: 500, overflow: 'hidden',
              transformStyle: 'preserve-3d',
            }}>
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
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      style={{
                        width: '100%', height: 360, objectFit: 'contain',
                        borderRadius: 12, marginBottom: 20,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: 360, borderRadius: 12,
                      border: '2px dashed rgba(99, 102, 241, 0.25)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      justifyContent: 'center', gap: 12,
                      background: 'rgba(99, 102, 241, 0.03)',
                    }}>
                      <HiNewspaper style={{ width: 48, height: 48, color: 'rgba(99, 102, 241, 0.3)' }} />
                      <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                        Insert newsletter page {currentPage + 1} image
                      </span>
                    </div>
                  )}

                  {/* Page title/desc */}
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <h4 style={{
                      fontSize: '1.1rem', fontWeight: 700, fontFamily: "'Outfit', sans-serif",
                      color: 'var(--text-primary)', marginBottom: 4,
                    }}>
                      {currentItem.title}
                    </h4>
                    <p style={{ fontSize: '0.8rem', opacity: 0.5 }}>
                      {currentItem.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation footer */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 24px', borderTop: '1px solid var(--glass-border)',
            }}>
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0 || isFlipping}
                whileHover={currentPage > 0 ? { scale: 1.08 } : {}}
                whileTap={currentPage > 0 ? { scale: 0.92 } : {}}
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: currentPage === 0 ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.1)',
                  border: 'none', cursor: currentPage === 0 ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-primary)',
                  opacity: currentPage === 0 ? 0.3 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                <HiChevronLeft style={{ width: 20, height: 20 }} />
              </motion.button>

              <span style={{ fontSize: '0.8rem', fontWeight: 600, opacity: 0.5 }}>
                {currentPage + 1} / {totalPages}
              </span>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1 || isFlipping}
                whileHover={currentPage < totalPages - 1 ? { scale: 1.08 } : {}}
                whileTap={currentPage < totalPages - 1 ? { scale: 0.92 } : {}}
                style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: currentPage === totalPages - 1 ? 'rgba(99, 102, 241, 0.05)' : 'rgba(99, 102, 241, 0.1)',
                  border: 'none', cursor: currentPage === totalPages - 1 ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-primary)',
                  opacity: currentPage === totalPages - 1 ? 0.3 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                <HiChevronRight style={{ width: 20, height: 20 }} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Page thumbnails */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'center',
          marginTop: 24, flexWrap: 'wrap',
        }}>
          {items.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
              whileHover={{ y: -4 }}
              style={{
                width: 64, height: 80, borderRadius: 10,
                border: i === currentPage ? '2px solid #6366f1' : '1px solid var(--glass-border)',
                background: 'var(--glass-bg)', cursor: 'pointer', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: i === currentPage ? '0 4px 16px rgba(99, 102, 241, 0.3)' : 'none',
              }}
            >
              {item.image ? (
                <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '0.6rem', opacity: 0.4, textAlign: 'center' }}>Pg {i + 1}</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </Section>
  );
}
