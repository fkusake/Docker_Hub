import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, ShieldCheck, MessageSquare, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { mockProducts } from '../data/products';
import '../styles/FeaturedProducts.css';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredProducts = mockProducts.filter((product) => {
    if (activeTab === 'new') return product.condition === 'new';
    if (activeTab === 'used') return product.condition === 'used';
    return true;
  });

  return (
    <section id="featured" className="featured-section">
      <div className="container">

        <div className="section-header-row">
          <div>
            <div className="section-badge">
              <Sparkles size={14} />
              <span>Trending Marketplace Items</span>
            </div>
            <h2 className="section-title">
              Explore Top <span className="gradient-text">Listings & Resell Deals</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="filter-tabs-wrapper">
            <button
              className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Items ({mockProducts.length})
            </button>
            <button
              className={`filter-tab ${activeTab === 'new' ? 'active' : ''}`}
              onClick={() => setActiveTab('new')}
            >
              ✨ Brand New
            </button>
            <button
              className={`filter-tab ${activeTab === 'used' ? 'active' : ''}`}
              onClick={() => setActiveTab('used')}
            >
              🔄 Pre-Owneded
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="product-card glass-panel cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >

                {/* Card Image Wrapper */}
                <div className="product-image-container">
                  <div className="product-emoji">{product.image}</div>

                  {/* Condition Tag */}
                  <span className={product.condition === 'new' ? 'badge-new pos-badge' : 'badge-used pos-badge'}>
                    {product.conditionLabel}
                  </span>

                  {/* Favorite Button */}
                  <button
                    className={`favorite-btn ${isFav ? 'active' : ''}`}
                    onClick={(e) => toggleFavorite(e, product.id)}
                    aria-label="Save to wishlist"
                  >
                    <Heart size={18} fill={isFav ? '#ec4899' : 'none'} color={isFav ? '#ec4899' : '#ffffff'} />
                  </button>

                  <span className="discount-tag">{product.discount}</span>
                </div>

                {/* Card Content */}
                <div className="product-card-body">
                  <div className="category-meta">
                    <span>{product.category}</span>
                    <span className="dot">•</span>
                    <span>{product.location}</span>
                  </div>

                  <h3 className="product-title">{product.title}</h3>

                  {/* Seller Info */}
                  <div className="seller-row">
                    <span className="seller-name">
                      {product.seller}
                      {product.verified && <ShieldCheck size={14} className="verified-icon" />}
                    </span>
                    <div className="rating">
                      <Star size={14} fill="#f59e0b" color="#f59e0b" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="product-card-footer">
                    <div className="pricing">
                      <span className="price">${product.price}</span>
                      <span className="was-price">${product.originalPrice}</span>
                    </div>
                    <button
                      className="buy-now-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <span>View Details</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
