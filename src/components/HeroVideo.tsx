import { motion } from 'framer-motion';

export default function HeroVideo() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: 'var(--bg-void)' }}>
      {/* Video BG */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', opacity: 0.4,
        }}
      >
        <source src="/assets/media/Streetwear_Enthusiast_A_young_man_with_short_brown_hair_walks_forward_QX7rpC1J (1).mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center 40%, transparent 0%, var(--bg-void) 75%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 40%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 20%)',
      }} />

      {/* Corner logo badge (kept off-center so it doesn't block the subject) */}
      <motion.img
        src="/assets/brand/logo.jpg"
        alt="VAELRIX Crown"
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ opacity: 0.85, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: '2rem',
          bottom: '2rem',
          width: 'clamp(56px, 7vw, 92px)',
          height: 'auto',
          borderRadius: '50%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 2rem',
      }}>
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="label"
          style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}
        >
          Drop 01 — Societas Draconidae
        </motion.div>

        {/* Title */}
        <motion.h1
          className="heading-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span style={{ display: 'block', color: 'var(--text-primary)' }}>Dressed</span>
          <span style={{ display: 'block', fontStyle: 'italic', color: 'var(--gold)' }}>to Reign</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{
            marginTop: '2rem', maxWidth: '520px',
            fontFamily: 'var(--font-body)', fontSize: '0.9rem',
            color: 'var(--text-secondary)', lineHeight: 1.7,
          }}
        >
          Where antiquarian alchemy meets modern silhouettes. Premium heavyweight garments crafted for those who walk between worlds.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a href="/shop" className="btn btn-primary">Explore Collection</a>
          <a href="#showcase" className="btn btn-outline">View Lookbook</a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          cursor: 'pointer', zIndex: 10,
        }}
        onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{ width: '1px', height: '40px', background: 'var(--border-medium)', overflow: 'hidden', position: 'relative' }}>
          <motion.div
            style={{ width: '100%', height: '50%', background: 'var(--gold)' }}
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
