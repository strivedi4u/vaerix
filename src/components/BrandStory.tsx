import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function BrandStory() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="section" style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      {/* Background crest watermark */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%', maxWidth: '800px', height: '100%',
        opacity: isVisible ? 0.03 : 0,
        transition: 'opacity 2s ease',
        pointerEvents: 'none',
      }}>
        <img
          src="/assets/media/highly-detailed-pure-vector-line-art-illustration-.svg"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1)' }}
        />
      </div>

      <div className="container" style={{
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(3rem, 6vw, 8rem)', alignItems: 'center',
      }}>
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative' }}>
            <img
              src="/assets/media/7.png"
              alt="Craftsmanship"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 30%)',
            }} />
          </div>
          {/* Floating quality badge */}
          <div style={{
            position: 'absolute', bottom: '2rem', right: '-1rem',
            background: 'var(--bg-primary)', border: '1px solid var(--border-gold)',
            padding: '1.5rem 2rem', boxShadow: 'var(--shadow-elevated)',
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--gold)', lineHeight: 1 }}>300</p>
            <p style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.55rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.25rem',
            }}>GSM Premium</p>
          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label" style={{ display: 'block', marginBottom: '1rem' }}>The Philosophy</span>
          <div className="gold-rule" style={{ marginBottom: '1.5rem' }} />
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
            Alchemy <br /><span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Meets Armor</span>
          </h2>
          <p className="body-lg" style={{ marginBottom: '2rem' }}>
            VAELRIX bridges the esoteric origins of antiquarian craftsmanship with the raw energy of modern streetwear. 
            Each garment is an artifact of intent — a uniform for those who walk the boundary between the seen and the unseen.
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
            paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)',
          }}>
            {[
              { value: '300+', label: 'GSM Premium Cotton' },
              { value: '200', label: 'Limited Pieces Per Drop' },
              { value: '12K', label: 'Stitch Gold Embroidery' },
              { value: '100%', label: 'Organic Materials' },
            ].map(stat => (
              <div key={stat.label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>{stat.value}</p>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.25rem',
                }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Responsive single col override */}
      <style>{`
        @media (max-width: 768px) {
          section .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
