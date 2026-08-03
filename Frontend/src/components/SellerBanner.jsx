import { PlusCircle, CheckCircle, ArrowRight } from 'lucide-react';
import '../styles/SellerBanner.css';

export default function SellerBanner() {
  return (
    <section id="sell" className="seller-banner-section">
      <div className="container">
        <div className="banner-card glass-panel">
          <div className="banner-content">
            <span className="banner-tag">Zero Listing Fees</span>
            <h2 className="banner-title">
              Turn Your Unused Items <br />
              <span className="gradient-text">Into Instant Cash Today</span>
            </h2>
            <p className="banner-subtitle">
              Join thousands of sellers turning smartphones, designer fashion, vintage cameras, and unused furniture into extra income.
            </p>
            
            <div className="banner-benefits">
              <div className="benefit-item">
                <CheckCircle size={18} className="benefit-icon" />
                <span>Keep 100% of profits</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={18} className="benefit-icon" />
                <span>Pre-paid shipping labels</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={18} className="benefit-icon" />
                <span>24/7 Seller Protection</span>
              </div>
            </div>

            <button className="btn-primary banner-cta">
              <PlusCircle size={20} />
              <span>Create Listing Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
