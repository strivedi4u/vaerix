import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, isCartOpen, closeCart, subtotal, shipping, total, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeCart}
          style={{
            position: 'fixed', inset: 0, zIndex: 300,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)',
          }}
        >
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: '100%', maxWidth: '420px',
              background: 'var(--bg-secondary)',
              borderLeft: '1px solid var(--border-subtle)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShoppingBag size={18} style={{ color: 'var(--gold)' }} />
                <span style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                }}>Cart ({totalItems})</span>
              </div>
              <button onClick={closeCart} style={{ color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.5rem' }}>
              {items.length === 0 ? (
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  height: '100%', gap: '1rem',
                }}>
                  <ShoppingBag size={40} style={{ color: 'var(--text-ghost)' }} />
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Your cart is empty
                  </p>
                  <Link
                    to="/shop"
                    onClick={closeCart}
                    className="btn btn-outline"
                    style={{ padding: '0.75rem 2rem' }}
                  >Continue Shopping</Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map(item => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      style={{
                        display: 'flex', gap: '1rem', padding: '1rem 0',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{ width: '80px', height: '100px', objectFit: 'cover', background: 'var(--bg-card)' }}
                      />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h4 style={{
                            fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 500,
                            marginBottom: '0.25rem',
                          }}>{item.product.name}</h4>
                          <p style={{
                            fontFamily: 'var(--font-ui)', fontSize: '0.6rem',
                            color: 'var(--text-muted)', letterSpacing: '0.05em',
                          }}>
                            {item.size} / {item.color}
                          </p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{
                            display: 'flex', alignItems: 'center',
                            border: '1px solid var(--border-subtle)',
                          }}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                              style={{ padding: '0.4rem 0.6rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}
                            ><Minus size={12} /></button>
                            <span style={{
                              padding: '0 0.6rem', fontFamily: 'var(--font-ui)',
                              fontSize: '0.7rem', fontWeight: 600,
                            }}>{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                              style={{ padding: '0.4rem 0.6rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}
                            ><Plus size={12} /></button>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <span style={{
                              fontFamily: 'var(--font-ui)', fontSize: '0.8rem',
                              fontWeight: 600, color: 'var(--gold)',
                            }}>{formatPrice(item.product.price * item.quantity)}</span>
                            <button
                              onClick={() => removeItem(item.product.id, item.size, item.color)}
                              style={{ color: 'var(--text-muted)', padding: '0.2rem' }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{
                padding: '1.5rem', borderTop: '1px solid var(--border-subtle)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Subtotal</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 500 }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Shipping</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', fontWeight: 500, color: shipping === 0 ? 'var(--success)' : 'inherit' }}>
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '1rem 0', borderTop: '1px solid var(--border-subtle)',
                }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--gold)' }}>{formatPrice(total)}</span>
                </div>
                <Link to="/checkout" onClick={closeCart} className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', textDecoration: 'none', textAlign: 'center' }}>
                  Checkout — {formatPrice(total)}
                </Link>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.55rem',
                  color: 'var(--text-ghost)', textAlign: 'center', marginTop: '0.75rem',
                  letterSpacing: '0.05em',
                }}>Free shipping on orders above ₹5,000</p>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
