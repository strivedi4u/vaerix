import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { products, categories, getProductsByCategory } from '../data/products';
import { motion } from 'framer-motion';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection');
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    if (categoryParam && categoryParam !== activeCategory) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (catId === 'all') {
        newParams.delete('category');
      } else {
        newParams.set('category', catId);
      }
      return newParams;
    });
  };

  const filtered = useMemo(() => {
    let result = activeCategory === 'all' ? [...products] : getProductsByCategory(activeCategory);
    
    if (collectionParam) {
      result = result.filter(p => p.collection === collectionParam);
    }

    switch (sortBy) {
      case 'price-low': return result.sort((a, b) => a.price - b.price);
      case 'price-high': return result.sort((a, b) => b.price - a.price);
      case 'rating': return result.sort((a, b) => b.rating - a.rating);
      case 'newest': return result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      default: return result;
    }
  }, [activeCategory, sortBy, collectionParam]);

  return (
    <>
      <div className="grain-overlay" />
      <Navbar />
      <main style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        {/* Page Header */}
        <section className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="label" style={{ display: 'block', marginBottom: '0.75rem' }}>
              {collectionParam ? `Collection — ${collectionParam.replace('-', ' ')}` : 'The Collection'}
            </span>
            <h1 className="heading-lg" style={{ marginBottom: '1rem' }}>
              {collectionParam ?
                collectionParam.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                : 'All Pieces'
              }
            </h1>
            <p className="body-sm" style={{ maxWidth: '500px' }}>
              Curated artifacts for those who dress with intention. Each piece crafted to transcend seasons.
            </p>
          </motion.div>
        </section>

        {/* Filters + Sort */}
        <section className="container" style={{ marginBottom: '3rem' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1rem 0',
          }}>
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.6rem',
                    fontWeight: activeCategory === cat.id ? 700 : 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.5rem 1rem',
                    background: activeCategory === cat.id ? 'var(--gold)' : 'transparent',
                    color: activeCategory === cat.id ? 'var(--bg-primary)' : 'var(--text-muted)',
                    border: activeCategory === cat.id ? 'none' : '1px solid var(--border-subtle)',
                    transition: 'all 0.3s',
                  }}
                >
                  {cat.name} ({cat.id === 'all' ? products.length : cat.count})
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.6rem',
                color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>Sort:</span>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.7rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  padding: '0.4rem 0.75rem',
                  outline: 'none',
                }}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: '0.6rem',
            color: 'var(--text-ghost)', marginTop: '1rem',
            letterSpacing: '0.08em',
          }}>
            Showing {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
          </p>
        </section>

        {/* Product Grid */}
        <section className="container" style={{ paddingBottom: '6rem' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0' }}>
              <p className="heading-sm" style={{ color: 'var(--text-muted)' }}>No pieces found in this category.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem 1.5rem',
            }}>
              {filtered.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
