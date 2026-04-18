import { ExternalLink, AtSign, Mail, MapPin, Truck, ShieldCheck, RotateCcw, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--border-subtle)' }}>
      {/* Trust bar */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', padding: '2rem 0' }}>
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem',
        }}>
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹5,000' },
            { icon: RotateCcw, title: 'Easy Returns', desc: '14-day hassle-free returns' },
            { icon: ShieldCheck, title: 'Secure Payment', desc: '256-bit SSL encryption' },
            { icon: CreditCard, title: 'Premium Packaging', desc: 'Wax-sealed, branded boxes' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '36px', height: '36px',
                border: '1px solid var(--border-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={16} style={{ color: 'var(--gold)' }} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>{title}</p>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.55rem',
                  color: 'var(--text-muted)',
                }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: '4rem var(--container-padding) 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '3rem', marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <img
              src="/assets/brand/MASTER-05-wordmark.svg"
              alt="VAELRIX"
              style={{ height: '40px', marginBottom: '1rem' }}
            />
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.8rem',
              color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '280px',
            }}>
              Premium streetwear for those who refuse to blend in. Dressed to Reign since 2026.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              {[ExternalLink, AtSign].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)', transition: 'all 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--gold)';
                    e.currentTarget.style.color = 'var(--gold)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: 'Shop', links: ['All Products', 'Tees', 'Hoodies', 'Outerwear', 'Accessories'] },
            { title: 'Support', links: ['Size Guide', 'Shipping', 'Returns', 'Contact', 'FAQ'] },
            { title: 'Company', links: ['About VAELRIX', 'Our Story', 'Sustainability', 'Careers'] },
          ].map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 700,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                marginBottom: '1.25rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <span style={{ width: '12px', height: '1px', background: 'var(--gold)' }} />
                {col.title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                        color: 'var(--text-muted)', transition: 'all 0.3s',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = 'var(--gold)';
                        e.currentTarget.style.paddingLeft = '4px';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.paddingLeft = '0';
                      }}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: '0.55rem',
            color: 'var(--text-ghost)', letterSpacing: '0.05em',
          }}>
            © {new Date().getFullYear()} VAELRIX. All rights reserved. Dressed to Reign.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Privacy', 'Terms', 'Cookies'].map(link => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.55rem',
                  color: 'var(--text-ghost)', transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-ghost)'}
              >{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
