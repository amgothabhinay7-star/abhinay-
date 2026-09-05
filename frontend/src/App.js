import { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/${isRegistering ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isRegistering
            ? { name, phone, email, password, userType: 'rider' }
            : { email, password }
        )
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed. Please check your details.');
      }

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('ridehub_token', data.token);
      storage.setItem('ridehub_user', JSON.stringify(data.user));
      setStatus({
        type: 'success',
        message: isRegistering
          ? 'Account created. Welcome to RideHub!'
          : `Welcome back, ${data.user.name || 'rider'}!`
      });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Unable to connect to RideHub.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="brand-block">
          <div className="brand-header">
            <span className="brand-mark">R</span>
            <span>RideHub</span>
          </div>

          <div className="tagline-wrap">
            <p className="eyebrow">Fast. Safe. Smart.</p>
            <h1>Welcome back, rider.</h1>
            <p className="subtitle">
              Book your bike, track your ride, and enjoy a smooth trip in minutes.
            </p>
          </div>

          <div className="info-boxes">
            <div className="info-pill">
              <span className="dot green" />
              2 min avg. pickup
            </div>
            <div className="info-pill">
              <span className="dot blue" />
              24/7 rider support
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-card">
            <div className="login-header">
              <span>{isRegistering ? 'Create rider account' : 'Rider Login'}</span>
              <span className="pill online">online</span>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              {isRegistering && (
                <>
                  <label>
                    <span>Full name</span>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label>
                    <span>Phone number</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="10-digit phone number"
                      autoComplete="tel"
                      required
                    />
                  </label>
                </>
              )}
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                <span>Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  minLength="6"
                  required
                />
              </label>

              <div className="form-row">
                <label className="checkbox-row">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                {!isRegistering && (
                  <button type="button" className="link-button">Forgot password?</button>
                )}
              </div>

              <button className="primary-btn full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Please wait...' : isRegistering ? 'Create account' : 'Login'}
              </button>
              {status.message && (
                <p className={`form-status ${status.type}`} role="status">{status.message}</p>
              )}
              <p className="account-switch">
                {isRegistering ? 'Already have an account?' : 'New to RideHub?'}{' '}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => {
                    setIsRegistering(!isRegistering);
                    setStatus({ type: '', message: '' });
                  }}
                >
                  {isRegistering ? 'Login here' : 'Create an account'}
                </button>
              </p>
            </form>
          </div>

          <div className="bike-scene" aria-label="Animated bike rider">
            <div className="road-line" />
            <div className="bike">
              <div className="wheel wheel-left">
                <span className="rim" />
              </div>
              <div className="wheel wheel-right">
                <span className="rim" />
              </div>
              <div className="frame frame-top" />
              <div className="frame frame-main" />
              <div className="frame frame-seat" />
              <div className="frame frame-handle" />
              <div className="rider">
                <div className="head" />
                <div className="body" />
                <div className="arm arm-left" />
                <div className="arm arm-right" />
                <div className="leg leg-left" />
                <div className="leg leg-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
