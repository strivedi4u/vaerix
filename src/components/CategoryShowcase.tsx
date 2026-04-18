import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight } from 'lucide-react';

const cats = [
  { id: 'tees', name: 'Tees', desc: 'Heavyweight premium blanks', img: '/assets/media/1.png', count: 3 },
  { id: 'hoodies', name: 'Hoodies', desc: 'Fleece-lined statement pieces', img: '/assets/media/2.png', count: 2 },
  { id: 'outerwear', name: 'Outerwear', desc: 'Tailored overcoats & layers', img: '/assets/media/5.png', count: 1 },
  { id: 'accessories', name: 'Accessories', desc: 'Caps, chains & sigils', img: '/assets/media/3.png', count: 2 },
  { id: 'bottoms', name: 'Bottoms', desc: 'Archive cargos & trousers', img: '/assets/media/7.png', count: 1 },
];

export default function CategoryShowcase() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.08 });

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <div style={{
          textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(25px)',
          transition: 'all 0.8s ease',
        }}>
          <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>Shop by Category</span>
          <h2 className="heading-lg">Browse the <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Archive</span></h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.75rem',
        }}>
          {cats.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/shop?category=${cat.id}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div style={{
                  position: 'relative', aspectRatio: '2/3',
                  overflow: 'hidden', background: 'var(--bg-card)',
                }}>
                  <motion.img
                    src={cat.img}
                    alt={cat.name}
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, transparent)',
                  }} />
                  {/* Content */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '1.25rem',
                  }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                      marginBottom: '0.25rem',
                    }}>{cat.name}</h3>
                    <p style={{
                      fontFamily: 'var(--font-ui)', fontSize: '0.55rem',
                      color: 'var(--text-muted)', letterSpacing: '0.05em',
                      marginBottom: '0.5rem',
                    }}>{cat.desc}</p>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.4rem',
                      fontFamily: 'var(--font-ui)', fontSize: '0.55rem', fontWeight: 600,
                      color: 'var(--gold)', letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>
                      {cat.count} Pieces <ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section .container > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          section .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
