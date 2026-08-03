import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ShoppingBag,
  ShieldCheck,
  Zap,
  Users,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import '../styles/SignInPage.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#ea4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
    <path fill="#4285f4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
    <path fill="#fbbc05" d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
    <path fill="#34a853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.66-.8 1.11-1.92.99-3.04-.96.04-2.13.64-2.82 1.44-.61.71-1.15 1.86-1.01 2.97 1.08.08 2.18-.57 2.84-1.37z"/>
  </svg>
);

export default function SignInPage() {
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  // UI Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (alert.message) setAlert({ type: '', message: '' });
  };

  const handleTabSwitch = (mode) => {
    setActiveTab(mode);
    setAlert({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: '', message: '' });

    // Client-side Validation
    if (!formData.email.trim() || !formData.password.trim()) {
      setAlert({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }

    if (activeTab === 'signup') {
      if (!formData.name.trim()) {
        setAlert({ type: 'error', message: 'Please enter your full name' });
        return;
      }
      if (formData.password.length < 6) {
        setAlert({ type: 'error', message: 'Password must be at least 6 characters long' });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setAlert({ type: 'error', message: 'Passwords do not match' });
        return;
      }
    }

    setIsLoading(true);

    try {
      const endpoint = activeTab === 'signin' ? '/api/users/signin' : '/api/users/signup';
      const bodyPayload =
        activeTab === 'signin'
          ? { email: formData.email, password: formData.password }
          : { name: formData.name, email: formData.email, password: formData.password };

      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      setAlert({
        type: 'success',
        message: activeTab === 'signin' ? 'Welcome back! Signed in successfully.' : 'Account created successfully! Redirecting...'
      });

      // Save user session in localStorage if needed
      if (data.user) {
        localStorage.setItem('tradehub_user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('storage'));
      }

      // Redirect after smooth animation
      setTimeout(() => {
        navigate('/');
      }, 1500);

    } catch (err) {
      console.error('Auth Error:', err);
      setAlert({ type: 'error', message: err.message || 'Could not connect to server' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page-wrapper">
      {/* Background Animated Ambient Mesh & Particle Overlay */}
      <div className="ambient-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>
      <div className="particle-overlay"></div>
      <div className="grid-pattern-overlay"></div>

      {/* Main Glassmorphic Auth Container */}
      <div className="signin-card-container">
        
        {/* Left Side: Animated Brand & Feature Showcase */}
        <div className="showcase-panel">
          <div className="showcase-brand">
            <div className="showcase-brand-icon">
              <ShoppingBag size={24} />
            </div>
            <span className="showcase-brand-name">
              Trade<span className="gradient-text">Hub</span>
            </span>
          </div>

          <div className="showcase-hero-content">
            <h2 className="showcase-hero-title">
              Experience Next-Gen <br />
              <span className="gradient-text">Peer-to-Peer</span> Trading.
            </h2>
            <p className="showcase-hero-desc">
              Join thousands of verified traders buying, selling, and swapping electronics, vintage gear & luxury goods instantly.
            </p>

            {/* Levitating Micro Feature Cards */}
            <div className="levitating-cards-wrapper">
              <div className="levitate-card">
                <div className="levitate-icon-badge" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="levitate-text-main">100% Verified Sellers</div>
                  <div className="levitate-text-sub">Encrypted buyer protection & zero spam</div>
                </div>
              </div>

              <div className="levitate-card">
                <div className="levitate-icon-badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                  <Users size={20} />
                </div>
                <div>
                  <div className="levitate-text-main">50,000+ Active Traders</div>
                  <div className="levitate-text-sub">Live active marketplace community</div>
                </div>
              </div>

              <div className="levitate-card">
                <div className="levitate-icon-badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6' }}>
                  <Zap size={20} />
                </div>
                <div>
                  <div className="levitate-text-main">Instant Escrow Deals</div>
                  <div className="levitate-text-sub">Smooth & instant payment security</div>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase Bottom Stats */}
          <div className="showcase-footer-stats">
            <div className="stat-item">
              <span className="stat-num">$2.4M+</span>
              <span className="stat-lbl">Traded Monthly</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">99.8%</span>
              <span className="stat-lbl">Satisfaction Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">4.9 ★</span>
              <span className="stat-lbl">User Rating</span>
            </div>
          </div>
        </div>

        {/* Right Side: Dynamic Interactive Auth Form */}
        <div className="form-panel">
          
          {/* Sliding Mode Switcher */}
          <div className="auth-tab-switcher">
            <div
              className={`tab-slider-bg ${activeTab === 'signup' ? 'signup-mode' : ''}`}
            ></div>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('signin')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => handleTabSwitch('signup')}
            >
              Sign Up
            </button>
          </div>

          {/* Form Header */}
          <h3 className="form-header-title">
            {activeTab === 'signin' ? 'Welcome Back 👋' : 'Create an Account 🚀'}
          </h3>
          <p className="form-header-sub">
            {activeTab === 'signin'
              ? 'Enter your credentials to access your TradeHub dashboard'
              : 'Fill in details below to unlock full marketplace benefits'}
          </p>

          {/* Toast / Alert Feedback */}
          {alert.message && (
            <div className={`auth-toast-alert ${alert.type}`}>
              {alert.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{alert.message}</span>
            </div>
          )}

          {/* Quick Social Auth Buttons */}
          <div className="social-buttons-grid">
            <button type="button" className="social-btn" onClick={() => setAlert({ type: 'error', message: 'Google auth demo endpoint clicked' })}>
              <GoogleIcon />
              <span>Google</span>
            </button>
            <button type="button" className="social-btn" onClick={() => setAlert({ type: 'error', message: 'GitHub auth demo endpoint clicked' })}>
              <GithubIcon />
              <span>GitHub</span>
            </button>
            <button type="button" className="social-btn" onClick={() => setAlert({ type: 'error', message: 'Apple auth demo endpoint clicked' })}>
              <AppleIcon />
              <span>Apple</span>
            </button>
          </div>

          <div className="divider-or">
            <span>or continue with email</span>
          </div>

          {/* Main Credentials Form */}
          <form onSubmit={handleSubmit}>
            {/* Name Field (Sign Up only) */}
            {activeTab === 'signup' && (
              <div className="form-input-group">
                <label className="input-label">Full Name</label>
                <div className="input-field-wrapper">
                  <User size={18} className="field-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="auth-input"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="form-input-group">
              <label className="input-label">Email Address</label>
              <div className="input-field-wrapper">
                <Mail size={18} className="field-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="auth-input"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-input-group">
              <label className="input-label">Password</label>
              <div className="input-field-wrapper">
                <Lock size={18} className="field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="auth-input has-toggle"
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle Password Visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field (Sign Up only) */}
            {activeTab === 'signup' && (
              <div className="form-input-group">
                <label className="input-label">Confirm Password</label>
                <div className="input-field-wrapper">
                  <Lock size={18} className="field-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="auth-input has-toggle"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle Password Visibility"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password Options */}
            {activeTab === 'signin' && (
              <div className="form-options-row">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <div className="custom-checkbox">
                    {formData.rememberMe && <CheckCircle2 size={13} color="white" />}
                  </div>
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); setAlert({ type: 'error', message: 'Password reset link sent to email preview' }); }} className="forgot-link">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="submit-auth-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="spinner-icon">
                    <Sparkles size={18} />
                  </div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{activeTab === 'signin' ? 'Sign In to TradeHub' : 'Create Free Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
