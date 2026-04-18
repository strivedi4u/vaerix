import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProductBySlug, formatPrice, getDiscount, getRelatedProducts } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [addedFeedback, setAddedFeedback] = useState(false);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
  }, [slug]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <h1 className="heading-lg" style={{ marginBottom: '1rem' }}>Not Found</h1>
          <Link to="/shop" className="btn btn-outline">Back to Shop</Link>
        </div>
      </>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discount = getDiscount(product.price, product.originalPrice);
  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color.');
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color.');
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  return (
    <>
      <div className="grain-overlay" />
      <Navbar />
      <main style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          {/* Breadcrumbs */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '2.5rem',
          }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Shop', to: '/shop' },
              { label: product.name, to: '' },
            ].map((crumb, idx, arr) => (
              <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {idx > 0 && <ChevronRight size={12} style={{ color: 'var(--text-ghost)' }} />}
                {crumb.to ? (
                  <Link to={crumb.to} style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.6rem',
                    color: 'var(--text-muted)', letterSpacing: '0.08em',
                    textTransform: 'uppercase', transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >{crumb.label}</Link>
                ) : (
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.6rem',
                    color: 'var(--text-primary)', letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>{crumb.label}</span>
                )}
              </span>
            ))}
          </div>

          {/* Product layout */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
          }}>
            {/* Left: Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-card)',
                position: 'relative', marginBottom: '1rem',
              }}>
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {product.tag && (
                  <span className="badge badge-gold" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    {product.tag}
                  </span>
                )}
                <button
                  onClick={() => toggleItem(product)}
                  style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: wishlisted ? 'var(--gold)' : 'rgba(10,10,10,0.7)',
                    color: wishlisted ? 'var(--bg-primary)' : 'var(--text-primary)',
                    border: wishlisted ? 'none' : '1px solid var(--border-subtle)',
                    backdropFilter: 'blur(8px)', transition: 'all 0.3s',
                  }}
                >
                  <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${product.images.length}, 1fr)`, gap: '0.5rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      aspectRatio: '3/4', overflow: 'hidden', background: 'var(--bg-card)',
                      border: activeImage === idx ? '2px solid var(--gold)' : '2px solid transparent',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
                {product.collection.replace('-', ' ')}
              </span>
              <h1 className="heading-md" style={{ marginBottom: '1rem' }}>{product.name}</h1>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--gold)',
                }}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '1rem',
                    color: 'var(--text-muted)', textDecoration: 'line-through',
                  }}>{formatPrice(product.originalPrice)}</span>
                )}
                {discount > 0 && (
                  <span style={{
                    background: 'rgba(239,68,68,0.1)', color: 'var(--danger)',
                    fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 700,
                    padding: '0.3rem 0.6rem', letterSpacing: '0.05em',
                  }}>Save {discount}%</span>
                )}
              </div>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.15rem' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--gold)' : 'none'} stroke={i < Math.floor(product.rating) ? 'var(--gold)' : 'var(--text-ghost)'} />
                  ))}
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem' }}>{product.rating}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>({product.reviews} reviews)</span>
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem',
              }}>{product.description}</p>

              {/* Color */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                  }}>Color</span>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                  }}>{selectedColor || 'Select'}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {product.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor === c.name
                          ? '3px solid var(--gold)'
                          : '2px solid var(--border-medium)',
                        transition: 'all 0.3s',
                        boxShadow: selectedColor === c.name ? '0 0 12px var(--gold-glow)' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 600,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                  }}>Size</span>
                  <button style={{
                    fontFamily: 'var(--font-ui)', fontSize: '0.6rem',
                    color: 'var(--text-muted)', textDecoration: 'underline',
                    textUnderlineOffset: '3px', background: 'none', border: 'none',
                  }}>Size Guide</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '0.75rem 1.25rem',
                        fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 600,
                        border: selectedSize === size ? '1px solid var(--gold)' : '1px solid var(--border-medium)',
                        background: selectedSize === size ? 'var(--gold)' : 'var(--bg-card)',
                        color: selectedSize === size ? 'var(--bg-primary)' : 'var(--text-primary)',
                        transition: 'all 0.3s',
                      }}
                    >{size}</button>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to Cart */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{
                  display: 'flex', alignItems: 'center',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-card)',
                }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                    <Minus size={14} />
                  </button>
                  <span style={{ padding: '0 1rem', fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 600 }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)' }}>
                    <Plus size={14} />
                  </button>
                </div>
                <button onClick={handleAddToCart} className="btn btn-outline" style={{ flex: 1 }}>
                  <ShoppingBag size={16} /> {addedFeedback ? '✓ Added!' : 'Add to Cart'}
                </button>
              </div>
              <button onClick={handleBuyNow} className="btn btn-primary" style={{ width: '100%' }}>
                Buy Now — {formatPrice(product.price * quantity)}
              </button>

              {/* Trust */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
                marginTop: '2rem', padding: '1.5rem 0',
                borderTop: '1px solid var(--border-subtle)',
                borderBottom: '1px solid var(--border-subtle)',
              }}>
                {[
                  { icon: Truck, text: 'Free Shipping 5K+' },
                  { icon: RotateCcw, text: '14-Day Returns' },
                  { icon: ShieldCheck, text: 'Secure Checkout' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon size={16} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'var(--font-ui)', fontSize: '0.55rem',
                      color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase',
                    }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1rem',
                }}>Product Details</h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {product.details.map((d, i) => (
                    <li key={i} style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      paddingLeft: '1rem',
                      borderLeft: '2px solid var(--border-gold)',
                    }}>{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section style={{ marginTop: '6rem' }}>
              <h2 className="heading-sm" style={{ marginBottom: '2rem' }}>
                You May Also <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Desire</span>
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}>
                {related.map((p, idx) => (
                  <ProductCard key={p.id} product={p} index={idx} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Responsive single-col for product layout */}
        <style>{`
          @media (max-width: 768px) {
            main .container > div:first-of-type { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
