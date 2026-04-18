import { useState } from 'react';
import { Send, Gift, Bell } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section ref={ref} className="section" style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-subtle)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background dot pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text-primary) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, var(--gold-dim), transparent 60%)',
      }} />

      <div className="container" style={{
        position: 'relative', zIndex: 1, maxWidth: '700px', textAlign: 'center',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s ease',
      }}>
        {/* Perks */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {[
            { icon: Gift, text: '15% off first order' },
            { icon: Bell, text: 'Early drop access' },
            { icon: Send, text: 'Exclusive offers' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
              <Icon size={14} style={{ color: 'var(--gold)' }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{text}</span>
            </div>
          ))}
        </div>

        <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>
          Join the <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Society</span>
        </h2>
        <p className="body-sm" style={{ marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
          Subscribe for exclusive drops, early access, and 15% off your first order, delivered straight to your inbox.
        </p>

        {submitted ? (
          <div style={{
            border: '1px solid rgba(52, 211, 153, 0.3)',
            background: 'rgba(52, 211, 153, 0.05)', padding: '2rem',
          }}>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>
              Welcome to the Society.
            </p>
            <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>
              Check your inbox for your 15% discount code.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex', gap: '0', maxWidth: '500px', margin: '0 auto',
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                flex: 1, background: 'var(--bg-primary)',
                border: '1px solid var(--border-medium)',
                borderRight: 'none',
                padding: '1rem 1.5rem',
                fontFamily: 'var(--font-body)', fontSize: '0.85rem',
                color: 'var(--text-primary)', outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
            />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '1rem 1.5rem', borderRadius: 0 }}
            >
              <Send size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
