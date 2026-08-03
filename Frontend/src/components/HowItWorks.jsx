import { Camera, MessageSquare, ShieldCheck, DollarSign, Sparkles } from 'lucide-react';
import '../styles/HowItWorks.css';

const steps = [
  {
    step: '01',
    title: 'Snap & List in 60 Seconds',
    description: 'Upload high-resolution photos of your item. Choose condition grade (Brand New or Pre-Owned) and set your price.',
    icon: Camera,
    color: '#818cf8',
    bg: 'rgba(99, 102, 241, 0.15)',
  },
  {
    step: '02',
    title: 'Chat & Negotiate Securely',
    description: 'Connect with verified buyers or sellers through built-in encrypted messaging. Make offers and agree on terms.',
    icon: MessageSquare,
    color: '#f472b6',
    bg: 'rgba(236, 72, 153, 0.15)',
  },
  {
    step: '03',
    title: 'Protected Shipping & Payouts',
    description: 'Funds are held in secure escrow. Ship locally or nationwide and receive instant payout upon buyer confirmation.',
    icon: DollarSign,
    color: '#34d399',
    bg: 'rgba(16, 185, 129, 0.15)',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-section">
      <div className="container">
        
        <div className="section-header text-center">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Simple & Secure</span>
          </div>
          <h2 className="section-title">
            How <span className="gradient-text">TradeHub Works</span>
          </h2>
          <p className="section-subtitle">
            Whether you're clearing out your closet or opening a brand new storefront, listing items takes under a minute.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((item) => {
            const IconComp = item.icon;
            return (
              <div key={item.step} className="step-card glass-panel">
                <div className="step-number">{item.step}</div>
                <div className="step-icon-wrapper" style={{ background: item.bg, color: item.color }}>
                  <IconComp size={30} />
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Protection Banner inside How It Works */}
        <div className="guarantee-box glass-panel">
          <ShieldCheck size={36} className="guarantee-shield" />
          <div className="guarantee-content">
            <h4>TradeHub Buyer & Seller Guarantee</h4>
            <p>Full refund protection if your item is not as described. All sellers are identity-verified.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
