import React from 'react';
import { motion } from 'framer-motion';

const dropItems = [
  { id: 1, image: '/assets/media/1.png', name: 'Draconian Protocol Tee' },
  { id: 2, image: '/assets/media/2.png', name: 'Alchemist Graphic Hood' },
  { id: 3, image: '/assets/media/3.png', name: 'Sigil Embroidered Cap' },
  { id: 4, image: '/assets/media/4.png', name: 'Onyx Heavyweight Tee' },
  { id: 5, image: '/assets/media/5.png', name: 'Crest Overcoat' },
  { id: 6, image: '/assets/media/6.png', name: 'Victorian Science Totem' }
];

const DropShowcase: React.FC = () => {
  return (
    <section id="drop-showcase" style={{ padding: '8rem 0', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '3rem', margin: 0, color: 'var(--accent-ivory)' }}>Drop 01</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', letterSpacing: '0.05em' }}>The Genesis Collection</p>
          </div>
          <a href="#" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', borderBottom: '1px solid var(--text-secondary)', paddingBottom: '2px' }}>
            View All
          </a>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '3rem 2rem' 
        }}>
          {dropItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column' }}
              className="group"
            >
              <div style={{ 
                position: 'relative', 
                aspectRatio: '3/4', 
                overflow: 'hidden', 
                backgroundColor: '#1a1a1a',
                marginBottom: '1.5rem',
                cursor: 'pointer'
              }}>
                <motion.img 
                  src={item.image} 
                  alt={item.name} 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Hover overlay with minimal Add to Cart */}
                <motion.div 
                   initial={{ opacity: 0 }}
                   whileHover={{ opacity: 1 }}
                   style={{
                     position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
                     display: 'flex', alignItems: 'center', justifyContent: 'center'
                   }}
                >
                  <button className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem', background: 'rgba(10,10,10,0.8)' }}>
                    Add to Cart
                  </button>
                </motion.div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', margin: 0, letterSpacing: '0.05em' }}>{item.name}</h3>
                <span style={{ fontFamily: 'var(--font-body)', opacity: 0.8 }}>$120</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropShowcase;
