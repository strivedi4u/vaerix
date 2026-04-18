import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun M.', location: 'Delhi', rating: 5,
    text: 'The fabric quality is unlike anything I\'ve experienced from an Indian brand. 300 GSM feels like a luxury investment piece, not just a tee. The gold embroidery detail is insane.',
    product: 'Draconian Protocol Tee', verified: true,
  },
  {
    name: 'Priya S.', location: 'Mumbai', rating: 5,
    text: 'Ordered the Crest Overcoat — it\'s genuinely one of the most beautiful garments I own. The 12,000-stitch crest catches light beautifully. Worth every rupee.',
    product: 'Crest Overcoat', verified: true,
  },
  {
    name: 'Vikram R.', location: 'Bangalore', rating: 5,
    text: 'VAELRIX has single-handedly changed what I expect from streetwear. The Alchemist Hoodie is heavy, warm, and the double-layered hood is a genius touch.',
    product: 'Alchemist Graphic Hoodie', verified: true,
  },
  {
    name: 'Sneha K.', location: 'Pune', rating: 5,
    text: 'I get compliments every single time I wear the Serpent Chain. The packaging is luxury-tier — velvet pouch, wax seal on the box. They understand branding.',
    product: 'Serpent Chain Necklace', verified: true,
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: '4rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}>
          <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>Testimonials</span>
          <h2 className="heading-lg">Worn by <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Visionaries</span></h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'flex', flexDirection: 'column', gap: '1rem',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s ${0.15 + idx * 0.1}s ease`,
              }}
            >
              <Quote size={20} style={{ color: 'var(--gold-dim)' }} />
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', gap: '0.15rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={12} fill="var(--gold)" stroke="var(--gold)" />
                ))}
              </div>
              <div style={{
                borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600 }}>{t.name}</p>
                  <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{t.location}</p>
                </div>
                {t.verified && (
                  <span className="badge badge-success">Verified</span>
                )}
              </div>
              <p style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.55rem',
                color: 'var(--gold)', letterSpacing: '0.05em',
              }}>Purchased: {t.product}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
