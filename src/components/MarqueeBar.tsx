import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const marqueeText = 'VAELRIX · DRESSED TO REIGN · DROP 01 · SOCIETAS DRACONIDAE · PREMIUM STREETWEAR · ';

export default function MarqueeBar() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '1rem 0',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        style={{
          display: 'flex', whiteSpace: 'nowrap', gap: 0, width: 'max-content',
          fontFamily: 'var(--font-display)', fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
          fontWeight: 400, letterSpacing: '0.1em', color: 'var(--text-ghost)',
        }}
      >
        <span>{marqueeText.repeat(8)}</span>
        <span>{marqueeText.repeat(8)}</span>
      </motion.div>
    </div>
  );
}
