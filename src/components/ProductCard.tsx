import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { formatPrice, getDiscount } from '../data/products';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product: p, index = 0 }: Props) {
  const { toggleItem, isInWishlist } = useWishlist();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const wishlisted = isInWishlist(p.id);
  const discount = getDiscount(p.price, p.originalPrice);
  const [hovered, setHovered] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [selSize, setSelSize] = useState('');
  const [selColor, setSelColor] = useState('');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickOpen(true);
  };

  const handleConfirmAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selSize || !selColor) return;
    addItem(p, selSize, selColor, 1);
    setAddedFeedback(true);
    setTimeout(() => { setAddedFeedback(false); setQuickOpen(false); setSelSize(''); setSelColor(''); }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); if (!addedFeedback) { setQuickOpen(false); setSelSize(''); setSelColor(''); } }}
      style={{ position: 'relative' }}
    >
      <Link to={`/product/${p.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
        {/* Image Container */}
        <div style={{
          position: 'relative', aspectRatio: '3/4', overflow: 'hidden',
          background: 'var(--bg-card)', marginBottom: '1rem',
        }}>
          {/* Primary image */}
          <motion.img
            src={p.images[0]}
            alt={p.name}
            loading="lazy"
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
          
          {/* Secondary image on hover */}
          <motion.img
            src={p.images[1]}
            alt={p.name}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />

          {/* Gradient overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
              pointerEvents: 'none',
            }}
          />

          {/* Tag */}
          {p.tag && (
            <span style={{
              position: 'absolute', top: '0.75rem', left: '0.75rem',
              background: p.tag === 'Sale' ? 'var(--danger)' : p.tag === 'Limited' || p.tag === 'Exclusive' ? '#7c3aed' : 'var(--gold)',
              color: '#fff', fontFamily: 'var(--font-ui)',
              fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '0.3rem 0.65rem',
            }}>{p.tag}</span>
          )}

          {/* Discount */}
          {discount > 0 && (
            <span style={{
              position: 'absolute', top: '0.75rem', right: '0.75rem',
              background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(8px)',
              color: 'var(--danger)', fontFamily: 'var(--font-ui)',
              fontSize: '0.55rem', fontWeight: 700, padding: '0.3rem 0.55rem',
            }}>–{discount}%</span>
          )}

          {/* Wishlist */}
          <motion.button
            onClick={e => { e.preventDefault(); e.stopPropagation(); toggleItem(p); }}
            animate={{ opacity: wishlisted || hovered ? 1 : 0, scale: wishlisted ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', top: discount > 0 ? '2.4rem' : '0.75rem', right: '0.75rem',
              width: '32px', height: '32px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: wishlisted ? 'var(--gold)' : 'rgba(5,5,5,0.7)',
              color: wishlisted ? 'var(--bg-primary)' : 'var(--text-primary)',
              border: wishlisted ? 'none' : '1px solid var(--border-subtle)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Heart size={13} fill={wishlisted ? 'currentColor' : 'none'} />
          </motion.button>

          {/* Bottom actions — Quick Add + View */}
          <motion.div
            animate={{ y: hovered ? 0 : '100%', opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0.6rem', display: 'flex', gap: '0.4rem',
            }}
          >
            <button
              onClick={handleQuickAdd}
              style={{
                flex: 1, padding: '0.7rem',
                background: 'var(--gold)', color: 'var(--bg-primary)',
                fontFamily: 'var(--font-ui)', fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              }}
            >
              <ShoppingBag size={13} /> Add to Cart
            </button>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); navigate(`/product/${p.slug}`); }}
              style={{
                padding: '0.7rem 0.9rem',
                background: 'rgba(5,5,5,0.85)', backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Eye size={13} />
            </button>
          </motion.div>
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', marginBottom: '0.35rem' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={9} fill={i < Math.floor(p.rating) ? 'var(--gold)' : 'none'} stroke={i < Math.floor(p.rating) ? 'var(--gold)' : 'var(--text-ghost)'} />
            ))}
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'var(--text-muted)', marginLeft: '0.2rem' }}>({p.reviews})</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 500,
            marginBottom: '0.3rem', transition: 'color 0.3s',
            color: hovered ? 'var(--gold)' : 'var(--text-primary)',
          }}>{p.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--gold)' }}>{formatPrice(p.price)}</span>
            {p.originalPrice && (
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{formatPrice(p.originalPrice)}</span>
            )}
          </div>
          {/* Color swatches mini */}
          <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.5rem' }}>
            {p.colors.map(c => (
              <div key={c.name} style={{
                width: '14px', height: '14px', borderRadius: '50%',
                backgroundColor: c.hex,
                border: `1.5px solid ${c.hex === '#0a0a0a' || c.hex === '#050505' || c.hex === '#080808' || c.hex === '#0e0e1a' ? 'var(--border-medium)' : 'transparent'}`,
              }} title={c.name} />
            ))}
          </div>
        </div>
      </Link>

      {/* Quick-Add overlay modal */}
      <AnimatePresence>
        {quickOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', bottom: '100%', left: 0, right: 0,
              marginBottom: '-3rem', zIndex: 50,
              background: 'var(--bg-secondary)', border: '1px solid var(--border-medium)',
              padding: '1rem', boxShadow: 'var(--shadow-elevated)',
            }}
          >
            {addedFeedback ? (
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--success)', letterSpacing: '0.08em' }}>
                  ✓ Added to Cart
                </p>
              </div>
            ) : (
              <>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Select Size
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.75rem' }}>
                  {p.sizes.map(s => (
                    <button
                      key={s}
                      onClick={e => { e.preventDefault(); e.stopPropagation(); setSelSize(s); }}
                      style={{
                        padding: '0.4rem 0.7rem', fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 600,
                        border: selSize === s ? '1px solid var(--gold)' : '1px solid var(--border-subtle)',
                        background: selSize === s ? 'var(--gold)' : 'transparent',
                        color: selSize === s ? 'var(--bg-primary)' : 'var(--text-primary)',
                        transition: 'all 0.2s',
                      }}
                    >{s}</button>
                  ))}
                </div>
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Select Color
                </p>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  {p.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={e => { e.preventDefault(); e.stopPropagation(); setSelColor(c.name); }}
                      title={c.name}
                      style={{
                        width: '26px', height: '26px', borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selColor === c.name ? '3px solid var(--gold)' : `2px solid var(--border-medium)`,
                        transition: 'all 0.2s',
                        boxShadow: selColor === c.name ? '0 0 8px var(--gold-glow)' : 'none',
                      }}
                    />
                  ))}
                </div>
                <button
                  onClick={handleConfirmAdd}
                  disabled={!selSize || !selColor}
                  style={{
                    width: '100%', padding: '0.65rem',
                    background: selSize && selColor ? 'var(--gold)' : 'var(--bg-card)',
                    color: selSize && selColor ? 'var(--bg-primary)' : 'var(--text-ghost)',
                    fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    border: 'none', transition: 'all 0.3s',
                    cursor: selSize && selColor ? 'pointer' : 'not-allowed',
                  }}
                >
                  {selSize && selColor ? `Add — ${formatPrice(p.price)}` : 'Select size & color'}
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
