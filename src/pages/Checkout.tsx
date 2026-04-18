import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Truck, Lock, CreditCard, Minus, Plus, X, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export default function Checkout() {
  const { items, removeItem, updateQuantity, subtotal, shipping, total } = useCart();
  const [step, setStep] = useState<'info' | 'payment' | 'confirm'>('info');
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    address: '', city: '', state: '', pincode: '', country: 'India',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'var(--bg-card)', border: '1px solid var(--border-medium)',
    color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '0.85rem',
    outline: 'none', transition: 'border-color 0.3s',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 600,
    letterSpacing: '0.12em', textTransform: 'uppercase' as const,
    color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem',
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '6rem' }}>
          <h1 className="heading-md" style={{ marginBottom: '1rem' }}>Your Cart is Empty</h1>
          <p className="body-sm" style={{ marginBottom: '2rem' }}>Add some pieces to get started.</p>
          <Link to="/shop" className="btn btn-primary">Browse Collection</Link>
        </div>
        <Footer />
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <div className="grain-overlay" />
        <Navbar />
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', paddingTop: '6rem', textAlign: 'center',
          padding: '6rem 2rem',
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img src="/assets/brand/MASTER-07-circular-seal.svg" alt="Seal" style={{ width: '100px', margin: '0 auto 2rem' }} />
            <h1 className="heading-lg" style={{ marginBottom: '1rem' }}>
              Order <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Confirmed</span>
            </h1>
            <p className="body-lg" style={{ marginBottom: '0.5rem' }}>
              Thank you, {form.firstName}. Your order has been placed.
            </p>
            <p className="body-sm" style={{ marginBottom: '2.5rem' }}>
              Confirmation sent to <strong style={{ color: 'var(--gold)' }}>{form.email}</strong>
            </p>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              padding: '1.5rem 2rem', display: 'inline-block', marginBottom: '2rem',
            }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Order Number</span>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)', marginTop: '0.25rem' }}>
                VLX-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/" className="btn btn-outline">Back to Home</Link>
              <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
            </div>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="grain-overlay" />
      <Navbar />
      <main style={{ paddingTop: '6rem', minHeight: '100vh' }}>
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            <Link to="/" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Home</Link>
            <ChevronRight size={12} style={{ color: 'var(--text-ghost)' }} />
            <Link to="/shop" style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Shop</Link>
            <ChevronRight size={12} style={{ color: 'var(--text-ghost)' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'var(--text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Checkout</span>
          </div>

          <h1 className="heading-lg" style={{ marginBottom: '3rem' }}>Checkout</h1>

          {/* Step indicators */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            {(['info', 'payment', 'confirm'] as const).map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 700,
                  background: step === s ? 'var(--gold)' : 'var(--bg-card)',
                  color: step === s ? 'var(--bg-primary)' : 'var(--text-muted)',
                  border: step === s ? 'none' : '1px solid var(--border-subtle)',
                }}>{i + 1}</div>
                <span style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.6rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: step === s ? 'var(--gold)' : 'var(--text-muted)',
                }}>{s === 'info' ? 'Information' : s === 'payment' ? 'Payment' : 'Confirm'}</span>
                {i < 2 && <div style={{ width: '40px', height: '1px', background: 'var(--border-subtle)' }} />}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem' }}>
            {/* Left: Form */}
            <div>
              {step === 'info' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <h2 className="heading-sm" style={{ marginBottom: '2rem' }}>Shipping Information</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input style={inputStyle} type="email" value={form.email} onChange={e => updateField('email', e.target.value)} placeholder="your@email.com"
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>First Name</label>
                        <input style={inputStyle} value={form.firstName} onChange={e => updateField('firstName', e.target.value)} placeholder="First name"
                          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Last Name</label>
                        <input style={inputStyle} value={form.lastName} onChange={e => updateField('lastName', e.target.value)} placeholder="Last name"
                          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input style={inputStyle} type="tel" value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+91 98765 43210"
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Address</label>
                      <input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} placeholder="Street address"
                        onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                        onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>City</label>
                        <input style={inputStyle} value={form.city} onChange={e => updateField('city', e.target.value)} placeholder="City"
                          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>State</label>
                        <input style={inputStyle} value={form.state} onChange={e => updateField('state', e.target.value)} placeholder="State"
                          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Pincode</label>
                        <input style={inputStyle} value={form.pincode} onChange={e => updateField('pincode', e.target.value)} placeholder="110001"
                          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setStep('payment')} className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                    Continue to Payment
                  </button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                  <button onClick={() => setStep('info')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: '0.65rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
                    <ArrowLeft size={14} /> Back to Information
                  </button>
                  <h2 className="heading-sm" style={{ marginBottom: '2rem' }}>Payment Method</h2>
                  
                  {/* Payment options */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    {[
                      { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
                      { id: 'upi', label: 'UPI Payment', icon: Lock, desc: 'GPay, PhonePe, Paytm' },
                      { id: 'cod', label: 'Cash on Delivery', icon: Truck, desc: '+₹49 COD charges' },
                    ].map(opt => (
                      <label key={opt.id} style={{
                        display: 'flex', alignItems: 'center', gap: '1rem',
                        padding: '1.25rem', border: '1px solid var(--border-medium)',
                        background: 'var(--bg-card)', cursor: 'pointer',
                        transition: 'border-color 0.3s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                      >
                        <input type="radio" name="payment" value={opt.id} style={{ accentColor: 'var(--gold)' }} />
                        <opt.icon size={20} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                        <div>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 500 }}>{opt.label}</p>
                          <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Card form */}
                  <div style={{ padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Card Number</label>
                        <input style={inputStyle} placeholder="4242 4242 4242 4242" maxLength={19}
                          onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                          onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={labelStyle}>Expiry</label>
                          <input style={inputStyle} placeholder="MM/YY"
                            onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>CVV</label>
                          <input style={inputStyle} placeholder="•••" maxLength={4}
                            onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => { setOrderPlaced(true); }} className="btn btn-primary" style={{ width: '100%' }}>
                    <Lock size={14} /> Place Order — {formatPrice(total)}
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <ShieldCheck size={14} style={{ color: 'var(--success)' }} />
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>256-bit SSL Encrypted · PCI DSS Compliant</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right: Order Summary */}
            <div>
              <div style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)',
                padding: '2rem', position: 'sticky', top: '6rem',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginBottom: '1.5rem', paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}>Order Summary</h3>

                {items.map(item => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} style={{
                    display: 'flex', gap: '0.75rem', marginBottom: '1rem',
                    paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)',
                  }}>
                    <div style={{ position: 'relative', width: '60px', height: '75px', flexShrink: 0 }}>
                      <img src={item.product.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', background: 'var(--bg-card)' }} />
                      <span style={{
                        position: 'absolute', top: '-6px', right: '-6px',
                        width: '18px', height: '18px', borderRadius: '50%',
                        background: 'var(--gold)', color: 'var(--bg-primary)',
                        fontFamily: 'var(--font-ui)', fontSize: '0.55rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{item.quantity}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 500, marginBottom: '0.2rem' }}>{item.product.name}</p>
                      <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'var(--text-muted)' }}>{item.size} / {item.color}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} style={{ padding: '0.15rem', color: 'var(--text-muted)' }}>
                            <Minus size={11} />
                          </button>
                          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.65rem', fontWeight: 600, padding: '0 0.3rem' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} style={{ padding: '0.15rem', color: 'var(--text-muted)' }}>
                            <Plus size={11} />
                          </button>
                        </div>
                        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.product.id, item.size, item.color)} style={{ padding: '0.2rem', color: 'var(--text-ghost)', alignSelf: 'flex-start' }}>
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* Coupon */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <input
                    placeholder="Coupon code"
                    style={{
                      ...inputStyle,
                      padding: '0.65rem 0.75rem', fontSize: '0.75rem',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'var(--border-medium)'}
                  />
                  <button className="btn btn-outline" style={{ padding: '0.65rem 1rem', whiteSpace: 'nowrap', fontSize: '0.6rem' }}>Apply</button>
                </div>

                {/* Totals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Subtotal</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem' }}>{formatPrice(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>Shipping</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: shipping === 0 ? 'var(--success)' : 'inherit' }}>
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)',
                }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)' }}>{formatPrice(total)}</span>
                </div>

                {/* Trust */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  {[
                    { icon: Truck, text: 'Free shipping on ₹5,000+' },
                    { icon: ShieldCheck, text: 'Secure encrypted payment' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.55rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Responsive override */}
          <style>{`
            @media (max-width: 768px) {
              main .container > div:last-child { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </main>
      <Footer />
    </>
  );
}
