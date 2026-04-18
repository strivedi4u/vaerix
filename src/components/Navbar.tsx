import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Collection', href: '/shop' },
  { label: 'Drop 01', href: '/shop?collection=drop-01' },
  { label: 'Essentials', href: '/shop?collection=essentials' },
  { label: 'Archive', href: '/shop?collection=archives' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          background: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : '1px solid transparent',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left: Menu + Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1 }}>
            <button
              className="hide-desktop"
              onClick={() => setMobileOpen(true)}
              style={{ color: 'var(--text-primary)', padding: '0.25rem' }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="hide-mobile" style={{ display: 'flex', gap: '2rem' }}>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  to={link.href}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    transition: 'color 0.3s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Logo */}
          <Link to="/" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <img
              src="/assets/brand/MASTER-01-primary-mark.svg"
              alt="VAELRIX"
              style={{
                height: scrolled ? '28px' : '36px',
                width: 'auto',
                transition: 'height 0.4s ease',
              }}
            />
          </Link>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, justifyContent: 'flex-end' }}>
            <button
              style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              aria-label="Search"
            >
              <Search size={19} />
            </button>
            <Link
              to="/shop"
              className="hide-mobile"
              style={{ color: 'var(--text-secondary)', position: 'relative', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              aria-label="Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--gold)', color: 'var(--bg-primary)',
                  fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-ui)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{wishlistCount}</span>
              )}
            </Link>
            <button
              onClick={openCart}
              style={{ color: 'var(--text-secondary)', position: 'relative', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              aria-label="Cart"
            >
              <ShoppingBag size={19} />
              {totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: 'var(--gold)', color: 'var(--bg-primary)',
                  fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-ui)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
            }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '85%', maxWidth: '360px', height: '100%',
                background: 'var(--bg-secondary)', padding: '2rem',
                display: 'flex', flexDirection: 'column',
                borderRight: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <img src="/assets/brand/MASTER-01-primary-mark.svg" alt="V" style={{ height: '30px' }} />
                <button onClick={() => setMobileOpen(false)} style={{ color: 'var(--text-secondary)' }}>
                  <X size={22} />
                </button>
              </div>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'block', padding: '1rem 0',
                        fontFamily: 'var(--font-display)', fontSize: '1.5rem',
                        color: 'var(--text-primary)',
                        borderBottom: '1px solid var(--border-subtle)',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--gold)' }}>
                  Dressed to Reign
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
