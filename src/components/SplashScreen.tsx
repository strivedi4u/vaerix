import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2200);
    const hide = setTimeout(() => setShow(false), 3000);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'var(--bg-void)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Crown V Logo */}
          <motion.img
            src="/assets/brand/MASTER-01-primary-mark.svg"
            alt="VAELRIX"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '80px', height: '80px', marginBottom: '1.5rem' }}
          />

          {/* Loading line */}
          <div style={{
            width: '120px', height: '1px',
            background: 'var(--border-subtle)',
            overflow: 'hidden', borderRadius: '1px',
          }}>
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: 2, duration: 0.8, ease: 'easeInOut' }}
              style={{ width: '60%', height: '100%', background: 'var(--gold)' }}
            />
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{
              marginTop: '1.5rem', fontFamily: 'var(--font-display)',
              fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--gold)',
              letterSpacing: '0.15em',
            }}
          >
            Dressed to Reign
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
