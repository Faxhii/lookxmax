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
            <div className="icon-wrapper icon-blue">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
            </div>
            <h3>AI Facial & Style Matches</h3>
            <p>Upload a photo and let our advanced neural networks map your exact facial structure. We instantly provide personalized hairstyle guides, beard styles, and color palettes optimized for your undertones.</p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '0.6s'}}>
            <div className="icon-wrapper icon-gold">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3>The Objective Tracker</h3>
            <p>A beautifully designed, comprehensive dashboard to logically track your facial and physical aesthetics. Input body fat percentage, skincare consistencies, and track photo progression with real charts.</p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card reveal delay-5" style={{animationDelay: '0.7s'}}>
            <div className="icon-wrapper icon-purple">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3>Anonymous Leaderboard</h3>
            <p>Receive brutally honest, completely anonymous feedback from our vetted community. Discover exactly what features hold you back, see where you rank, and measure your total "glow up" in real time.</p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
