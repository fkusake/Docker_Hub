import { Link } from 'react-router-dom';
import { ShoppingBag, Shield, Lock } from 'lucide-react';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <Link to="/" className="brand-logo mb-4">
              <div className="logo-icon">
                <ShoppingBag size={20} />
              </div>
              <span className="logo-text">
                Trade<span className="gradient-text">Hub</span>
              </span>
            </Link>
            <p className="footer-desc">
              The premier marketplace connecting buyers and sellers for brand new inventory and pre-owned electronics, fashion, home goods, and more.
            </p>
            <div className="trust-badges">
              <span className="badge-item"><Shield size={14} /> Escrow Protected</span>
              <span className="badge-item"><Lock size={14} /> SSL Encrypted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Marketplace</h4>
            <ul className="footer-links">
              <li><Link to="/explore">Brand New Items</Link></li>
              <li><Link to="/explore">Pre-Owned Deals</Link></li>
              <li><Link to="/categories">Top Categories</Link></li>
              <li><Link to="/explore">Certified Sellers</Link></li>
            </ul>
          </div>

          {/* Sell Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Sell Products</h4>
            <ul className="footer-links">
              <li><Link to="/sell">Start Listing (Free)</Link></li>
              <li><Link to="/how-it-works">How Payouts Work</Link></li>
              <li><Link to="/how-it-works">Seller Protection</Link></li>
              <li><Link to="/sell">Fee Calculator</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4 className="footer-heading">Help & Legal</h4>
            <ul className="footer-links">
              <li><Link to="/how-it-works">Help Center</Link></li>
              <li><Link to="/how-it-works">Trust & Safety</Link></li>
              <li><Link to="#">Privacy Policy</Link></li>
              <li><Link to="#">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} TradeHub Inc. All rights reserved.</p>
          <div className="credit-text">
            <span>Built with React.js & Passion</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
