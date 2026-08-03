import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Tag,
  Zap,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import '../styles/Hero.css';

export default function Hero({ onOpenMarketplace, showProducts }) {
  const [isOpen, setIsOpen] = useState(Boolean(showProducts));
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const handleReset = () => {
      setIsOpen(false);
      setIsOpening(false);
    };
    window.addEventListener('reset_home_curtains', handleReset);
    return () => window.removeEventListener('reset_home_curtains', handleReset);
  }, []);

  useEffect(() => {
    if (showProducts && !isOpening) {
      setIsOpen(true);
    } else if (!showProducts && !isOpening) {
      setIsOpen(false);
    }
  }, [showProducts, isOpening]);

  const triggerCurtainOpen = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      if (onOpenMarketplace) {
        onOpenMarketplace();
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1200);
  };

  const handleBrowseClick = (e) => {
    e.preventDefault();
    triggerCurtainOpen();
  };

  return (
    <div className={`hero-curtain-container ${isOpen ? 'curtain-fully-opened' : ''}`}>
      {/* The Hero Stage Curtain */}
      {!isOpen && (
        <section className={`hero-curtain-stage ${isOpening ? 'curtain-opening-anim' : ''}`}>
          {/* Background Ambient Glow */}
          <div className="curtain-glow-bg"></div>

          {/* Left Curtain Wing */}
          <div className={`curtain-wing curtain-wing-left ${isOpening ? 'wing-slide-left' : ''}`}>
            <div className="curtain-fabric-folds"></div>
            <div className="wing-gold-border right-border"></div>
          </div>

          {/* Right Curtain Wing */}
          <div className={`curtain-wing curtain-wing-right ${isOpening ? 'wing-slide-right' : ''}`}>
            <div className="curtain-fabric-folds"></div>
            <div className="wing-gold-border left-border"></div>
          </div>

          {/* Hero Content Banner (Overlayed on Curtain panels) */}
          <div className={`curtain-hero-card ${isOpening ? 'card-disappear' : ''}`}>
            <div className="hero-badge">
              <Sparkles size={14} className="badge-sparkle" />
              <span>The #1 Marketplace for New & Used Gear</span>
            </div>

            <h1 className="hero-title">
              Buy & Sell Anything <br />
              <span className="gradient-text">Brand New or Pre-Owned</span>
            </h1>

            <p className="hero-description">
              Turn unused items into instant cash or discover certified pre-owned deals
              up to 70% off. Verified sellers, escrow buyer protection, and hassle-free
              shipping.
            </p>

            <div className="hero-cta-group">
              <button className="btn-primary hero-btn curtain-open-trigger" onClick={handleBrowseClick}>
                <span>Browse Marketplace</span>
                <ArrowRight size={18} />
              </button>

              <Link to="/sell" className="btn-secondary hero-btn">
                <Tag size={18} />
                <span>List Item for Free</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="hero-trust-list">
              <div className="trust-item">
                <ShieldCheck size={18} className="trust-icon" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="trust-item">
                <Zap size={18} className="trust-icon" />
                <span>Instant Seller Payouts</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 size={18} className="trust-icon" />
                <span>Verified Condition Grades</span>
              </div>
            </div>

          </div>
        </section>
      )}
    </div>
  );
}
