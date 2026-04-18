import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';

const PremiumNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1.5rem 3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'all 0.4s ease'
      }}
    >
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <Menu size={24} />
        </button>
        <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <a href="#" style={{ opacity: 0.7 }}>Collection</a>
          <a href="#" style={{ opacity: 0.7 }}>Archive</a>
        </div>
      </div>

      <div style={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src="/assets/brand/MASTER-05-wordmark.svg" 
          alt="Societas Draconidae" 
          style={{ height: '100%', filter: 'invert(1)' }} 
        />
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8 }}>
          <Search size={22} />
        </button>
        <button style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', opacity: 0.8, position: 'relative' }}>
          <ShoppingBag size={22} />
          <span style={{ 
            position: 'absolute', 
            bottom: '-4px', 
            right: '-4px', 
            background: 'var(--accent-metallic)', 
            color: '#000', 
            fontSize: '10px', 
            fontWeight: 'bold', 
            width: '16px', 
            height: '16px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>0</span>
        </button>
      </div>
    </motion.nav>
  );
};

export default PremiumNavbar;
