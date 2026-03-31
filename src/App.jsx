import { useState } from 'react';
import './index.css';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxm0QE0t3763rr__m4bOk7rVwxxn_caCjiDHmokW3ifPJ5M1dgrqt_TrLv5YB9gYDMUNg/exec';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(14289);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.name.trim() || !formData.country.trim()) return;

    setStatus('loading');
    setMessage('');

    try {
      const gFormData = new URLSearchParams();
      gFormData.append('name', formData.name.trim());
      gFormData.append('email', formData.email.trim());
      gFormData.append('country', formData.country.trim());

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: gFormData.toString()
      });

      setStatus('success');
      setWaitlistCount(prev => prev + 1);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setMessage('Something went wrong. Please check your connection and try again.');
    }
  };

  return (
    <>
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>

      <main>
        <div className="badge reveal">Project: Ascension v1.0</div>
        
        <h1 className="reveal delay-1">The App That Actually Fixes Your Look.</h1>
        
        <p className="subtitle reveal delay-2">
          Join the waitlist for the most comprehensive AI styling, grooming, skincare routines, and facial improvement tracker. Achieve your peak potential with data-driven advice.
        </p>

        <div className="waitlist-container reveal delay-3">
          {status === 'success' ? (
            <div className="success-message">
              <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2>You're on the list, {formData.name.split(' ')[0]}!</h2>
              <p>Keep an eye on your inbox. We'll send early access details very soon.</p>
              <button className="reset-btn" onClick={() => {
                setStatus('idle');
                setFormData({name: '', email: '', country: ''});
              }}>Join for a friend</button>
            </div>
          ) : (
            <form onSubmit={submitForm} className="waitlist-form">
              <div className="input-row">
                <div className="input-group">
                  <label htmlFor="name">First Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="e.g. Alex" 
                    required 
                    autoComplete="given-name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="country">Country</label>
                  <input 
                    type="text" 
                    id="country"
                    name="country"
                    placeholder="e.g. USA" 
                    required 
                    autoComplete="country-name"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                  />
                </div>
              </div>
              <div className="input-group full-width">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="your@email.com" 
                  required 
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                />
              </div>
              
              <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                {status === 'loading' ? 'Securing Spot...' : 'Get Early Access'}
              </button>
              
              {message && (
                <div className={`form-message ${status}`}>
                  {message}
                </div>
              )}
            </form>
          )}
        </div>

        <div className="social-proof reveal delay-4">
          <div className="dot"></div>
          <p>Spots are strictly limited for beta testing. Join <strong style={{color: 'white'}}>{waitlistCount.toLocaleString()}</strong> guys leveling up right now.</p>
        </div>

        <div className="features-container">
          {/* Feature 1 */}
          <div className="feature-card reveal delay-5">
            <div className="feature-index">01</div>
            <div className="feature-content">
              <div className="icon-wrapper icon-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>Advanced AI Facial Mapping</h3>
              <p>Upload a photo and let our advanced neural networks map your exact facial structure. We deeply analyze your facial symmetry, canthal tilt, and golden ratio proportions to build a precise foundation for your glow up journey.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '0.6s'}}>
            <div className="feature-index">02</div>
            <div className="feature-content">
              <div className="icon-wrapper icon-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3>Skin & Grooming Protocol</h3>
              <p>Forget generic advice. Receive dermatology-grade custom skincare routines, acne and blemish tracking, alongside AI-simulated hairstyle and facial hair recommendations perfectly matched to your specific face shape and jawline width.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '0.7s'}}>
            <div className="feature-index">03</div>
            <div className="feature-content">
              <div className="icon-wrapper icon-gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3>Physique & Built-in Habit Tracker</h3>
              <p>A beautifully designed, comprehensive dashboard to logically track your physical aesthetics. Input body fat percentage, macro consistencies, and monitor daily physical habits like mewing, neck posture, and hydration with real charts and timeline morphs.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '0.8s'}}>
            <div className="feature-index">04</div>
            <div className="feature-content">
              <div className="icon-wrapper icon-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </div>
              <h3>Voice Resonance Analyzer <span style={{fontSize: '0.9rem', color: 'var(--neon-purple)', marginLeft: '10px'}}>✦ EXTRA</span></h3>
              <p>Upload short audio clips to our resonance engine. We analyze your vocal depth, pitch variations, and pacing to provide exercises that maximize your vocal charisma and speaking presence.</p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '0.9s'}}>
            <div className="feature-index">05</div>
            <div className="feature-content">
              <div className="icon-wrapper icon-red">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                  <line x1="16" y1="8" x2="2" y2="22"></line>
                  <line x1="17.5" y1="15" x2="9" y2="6.5"></line>
                </svg>
              </div>
              <h3>Sartorial AI Consultant <span style={{fontSize: '0.9rem', color: 'var(--neon-red)', marginLeft: '10px'}}>✦ EXTRA</span></h3>
              <p>An elite virtual stylist that understands your specific body frame geometry (shoulder-to-waist ratio) and skin undertones to curate a complete seasonal wardrobe that maximizes your baseline physical appeal.</p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '1.0s'}}>
            <div className="feature-index">06</div>
            <div className="feature-content">
              <div className="icon-wrapper icon-blue" style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </div>
              <h3>Pheromone & Fragrance Matcher <span style={{fontSize: '0.9rem', color: 'var(--neon-blue)', marginLeft: '10px'}}>✦ EXTRA</span></h3>
              <p>Input your skin type, ambient climate, and aesthetic archetype. Our algorithm recommends the exact niche and designer signature scents that mix optimally with your natural body chemistry to elevate your presence.</p>
            </div>
          </div>

          {/* Feature 7 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '1.1s'}}>
            <div className="feature-index">07</div>
            <div className="feature-content">
              <div className="icon-wrapper icon-gold" style={{color: '#fbbf24'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>The Objective Status Leaderboard</h3>
              <p>Step out of the echo chamber. Receive brutally honest, completely anonymous feedback from our vetted top-tier community. Discover exactly what features hold you back, see where you organically rank, and measure your total "glow up" in real time.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
