import { products } from '../data/products';
import ProductCard from './ProductCard';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FeaturedProducts() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.05 });

  const featured = products.filter(p => p.tag === 'Bestseller' || p.tag === 'New' || p.tag === 'Limited').slice(0, 6);

  return (
    <section id="showcase" ref={ref} className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '4rem', flexWrap: 'wrap', gap: '1rem',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div>
            <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>Drop 01 — The Genesis</span>
            <h2 className="heading-lg">Featured Pieces</h2>
          </div>
          <a href="/shop" className="btn btn-ghost">View All →</a>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2rem 1.5rem',
        }}>
          {featured.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
