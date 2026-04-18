import React from 'react';
import { motion } from 'framer-motion';

const HeroVideoCover: React.FC = () => {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
      {/* Video Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
        >
          <source src="/assets/media/Streetwear_Enthusiast_A_young_man_with_short_brown_hair_walks_forward_QX7rpC1J (1).mp4" type="video/mp4" />
        </video>
        {/* Dark subtle gradient overlay */}
        <div style={{ 
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10,10,10,0.8) 100%)',
          zIndex: 1
        }}></div>
      </div>

      {/* Content Overlay */}
      <div style={{ 
        position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', 
        alignItems: 'center', justifyContent: 'center', height: '100%',
        padding: '0 2rem', textAlign: 'center'
      }}>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
           style={{ marginBottom: '3rem', width: '100%', maxWidth: '800px' }}
        >
          <img 
            src="/assets/brand/MASTER-04-horizontal-lockup.svg" 
            alt="Societas Draconidae Lockup"
            style={{ width: '100%', height: 'auto', filter: 'invert(1)', opacity: 0.9 }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          style={{
            fontFamily: 'var(--font-body)', letterSpacing: '0.2em', textTransform: 'uppercase',
            fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '2rem'
          }}
        >
          Drop 01 — Now Available
        </motion.p>

        <motion.button
          className="btn-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() => {
            document.getElementById('drop-showcase')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Collection
        </motion.button>
      </div>

      <motion.div 
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 2 }}
        onClick={() => {
            document.getElementById('drop-showcase')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.3)', overflow: 'hidden' }}>
          <motion.div 
            style={{ width: '100%', height: '50%', background: '#fff' }}
            animate={{ y: [0, 40] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroVideoCover;
