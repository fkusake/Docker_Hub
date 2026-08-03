import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  Star,
  MapPin,
  Heart,
  Share2,
  CheckCircle2,
  Lock,
  Truck,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  X,
  Sparkles
} from 'lucide-react';
import { mockProducts } from '../data/products';
import '../styles/ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  // Form State for Checkout
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card'
  });

  const product = mockProducts.find((p) => p.id === Number(id)) || mockProducts[0];

  const handlePurchaseSubmit = (e) => {
    e.preventDefault();
    setIsOrderComplete(true);
  };

  const closeModal = () => {
    setShowPurchaseModal(false);
    setIsOrderComplete(false);
  };

  return (
    <div className="product-detail-page">
      <div className="container">

        {/* Back Link */}
        <div className="detail-navigation-bar">
          <Link to="/" state={{ showProducts: true }} className="back-link">
            <ArrowLeft size={18} />
            <span>Back to All Listings</span>
          </Link>
          <span className="breadcrumb-path">
            Marketplace / {product.category} / <span className="current">{product.title}</span>
          </span>
        </div>

        {/* Main Product Section */}
        <div className="product-detail-layout">

          {/* Left Column: Visual Showcase & Badges */}
          <div className="product-media-column">
            <div className="product-main-card glass-panel">

              {/* Emoji / Product Display Showcase */}
              <div className="media-preview-box">
                <span className="media-emoji">{product.image}</span>
                <span className={`media-badge ${product.condition === 'new' ? 'badge-new' : 'badge-used'}`}>
                  {product.conditionLabel}
                </span>
                <span className="media-discount">{product.discount}</span>
              </div>

              {/* Quick Trust Badges */}
              <div className="media-trust-grid">
                <div className="media-trust-item">
                  <ShieldCheck size={20} className="trust-icon" />
                  <div>
                    <div className="trust-title">100% Escrow Protection</div>
                    <div className="trust-sub">Funds held until item is inspected</div>
                  </div>
                </div>

                <div className="media-trust-item">
                  <Truck size={20} className="trust-icon" />
                  <div>
                    <div className="trust-title">Fast Insured Shipping</div>
                    <div className="trust-sub">Tracking number provided instantly</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Seller Card */}
            <div className="seller-profile-card">
              <div className="seller-avatar-badge">
                {product.seller.charAt(0)}
              </div>
              <div className="seller-info-content">
                <div className="seller-top-row">
                  <span className="seller-name">{product.seller}</span>
                  {product.verified && (
                    <span className="verified-badge-pill">
                      <ShieldCheck size={13} />
                      <span>Verified Seller</span>
                    </span>
                  )}
                </div>
                <div className="seller-detail-line">
                  <span>{product.sellerJoined}</span>
                </div>
                <div className="seller-location-line">
                  <MapPin size={13} className="location-pin" />
                  <span>{product.location}</span>
                </div>
              </div>
              <button className="chat-seller-btn">
                <MessageSquare size={15} />
                <span>Chat</span>
              </button>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Action */}
          <div className="product-info-column glass-panel">

            {/* Top Category & Location */}
            <div className="info-top-meta">
              <span className="info-category">{product.category}</span>
              <span className="meta-dot">•</span>
              <span className="info-location">
                <MapPin size={14} /> {product.location}
              </span>
            </div>

            <h1 className="detail-product-title">{product.title}</h1>

            {/* Ratings & Wishlist */}
            <div className="rating-share-bar">
              <div className="rating-box">
                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                <span className="rating-value">{product.rating}</span>
                <span className="rating-count">({product.reviews} buyer reviews)</span>
              </div>

              <div className="action-icon-group">
                <button
                  className={`icon-circle-btn ${isFavorite ? 'active' : ''}`}
                  onClick={() => setIsFavorite(!isFavorite)}
                  title="Save to Wishlist"
                >
                  <Heart size={18} fill={isFavorite ? '#ec4899' : 'none'} color={isFavorite ? '#ec4899' : '#64748b'} />
                </button>
                <button className="icon-circle-btn" title="Share Product">
                  <Share2 size={18} color="#64748b" />
                </button>
              </div>
            </div>

            {/* Price Showcase */}
            <div className="detail-price-card">
              <div className="price-primary-row">
                <span className="detail-price">${product.price}</span>
                <span className="detail-was-price">${product.originalPrice}</span>
                <span className="detail-savings">Save ${product.originalPrice - product.price}</span>
              </div>
              <p className="price-subtext">Free insured shipping & 30-day money-back guarantee</p>
            </div>

            {/* Main Action Buttons */}
            <div className="detail-cta-group">
              <button className="btn-primary buy-product-btn" onClick={() => setShowPurchaseModal(true)}>
                <ShoppingBag size={20} />
                <span>Buy Product Now (${product.price})</span>
              </button>

              <button className="btn-secondary offer-btn" onClick={() => setShowPurchaseModal(true)}>
                <MessageSquare size={18} />
                <span>Make an Offer</span>
              </button>
            </div>

            {/* Product Description */}
            <div className="detail-section-block">
              <h3 className="section-block-title">Description</h3>
              <p className="detail-description">{product.description}</p>
            </div>

            {/* Specs Table */}
            {product.specs && (
              <div className="detail-section-block">
                <h3 className="section-block-title">Product Specifications</h3>
                <div className="specs-grid">
                  {product.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="spec-row">
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Guarantee Shield Box */}
            <div className="escrow-guarantee-card">
              <ShieldCheck size={28} className="escrow-shield" />
              <div>
                <div className="escrow-title">TradeHub Protection Guarantee</div>
                <div className="escrow-desc">
                  Your payment is locked in escrow. Money is only released to seller after you receive and confirm product condition.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Purchase / Buy Product Modal */}
      {showPurchaseModal && (
        <div className="modal-backdrop-overlay" onClick={closeModal}>
          <div className="purchase-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={20} />
            </button>

            {!isOrderComplete ? (
              <form onSubmit={handlePurchaseSubmit} className="checkout-form">
                <div className="modal-header">
                  <div className="modal-icon-badge">
                    <ShoppingBag size={22} />
                  </div>
                  <div>
                    <h3 className="modal-title">Complete Purchase</h3>
                    <p className="modal-subtitle">Direct Escrow Checkout for {product.title}</p>
                  </div>
                </div>

                {/* Product Summary Row */}
                <div className="checkout-product-summary">
                  <div className="summary-emoji">{product.image}</div>
                  <div className="summary-details">
                    <div className="summary-title">{product.title}</div>
                    <div className="summary-seller">Sold by {product.seller}</div>
                  </div>
                  <div className="summary-price">${product.price}</div>
                </div>

                {/* Shipping Details Inputs */}
                <div className="form-section">
                  <h4 className="form-section-title">Shipping Address</h4>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={shippingAddress.fullName}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Street Address"
                      required
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    />
                  </div>
                  <div className="input-row">
                    <input
                      type="text"
                      placeholder="City"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="form-section">
                  <h4 className="form-section-title">Payment Method</h4>
                  <div className="payment-options-grid">
                    <label className={`payment-option ${shippingAddress.paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={shippingAddress.paymentMethod === 'card'}
                        onChange={() => setShippingAddress({ ...shippingAddress, paymentMethod: 'card' })}
                      />
                      <CreditCard size={18} />
                      <span>Credit / Debit Card</span>
                    </label>

                    <label className={`payment-option ${shippingAddress.paymentMethod === 'escrow' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={shippingAddress.paymentMethod === 'escrow'}
                        onChange={() => setShippingAddress({ ...shippingAddress, paymentMethod: 'escrow' })}
                      />
                      <ShieldCheck size={18} />
                      <span>TradeHub Wallet</span>
                    </label>
                  </div>
                </div>

                {/* Total Cost Summary */}
                <div className="checkout-total-row">
                  <span>Total Amount (Escrow Protected)</span>
                  <span className="total-amount">${product.price}</span>
                </div>

                <button type="submit" className="btn-primary confirm-order-btn">
                  <Lock size={18} />
                  <span>Confirm Order (${product.price})</span>
                </button>
              </form>
            ) : (
              /* Order Success View */
              <div className="order-success-container text-center">
                <div className="success-icon-badge">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="success-title">Order Placed Successfully!</h3>
                <p className="success-subtitle">
                  Your order for <strong>{product.title}</strong> has been confirmed. Your payment of <strong>${product.price}</strong> is safely held in TradeHub Escrow.
                </p>

                <div className="order-details-box">
                  <div className="order-detail-row">
                    <span>Order Number:</span>
                    <strong>#TH-{Math.floor(100000 + Math.random() * 900000)}</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Estimated Delivery:</span>
                    <strong>3 - 5 Business Days</strong>
                  </div>
                  <div className="order-detail-row">
                    <span>Seller:</span>
                    <strong>{product.seller}</strong>
                  </div>
                </div>

                <div className="success-actions">
                  <button className="btn-primary w-full" onClick={() => navigate('/', { state: { showProducts: true } })}>
                    Return to Marketplace
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
