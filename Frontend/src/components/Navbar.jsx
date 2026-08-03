import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  Menu,
  X,
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
  Shirt,
  Footprints,
  ShoppingBag as BagIcon,
  Gamepad2,
  Tv,
  Monitor,
  Sofa,
  Utensils,
  Lamp,
  Car,
  Bike,
  Disc,
  BookOpen,
  Sparkles,
  RefreshCw,
  Tag,
  ShieldCheck
} from 'lucide-react';
import '../styles/Navbar.css';

const menuColumns = [
  {
    title: 'ELECTRONICS & TECH',
    items: [
      { name: 'Smartphones & Tablets', icon: Smartphone, bg: '#fee2e2', color: '#ef4444' },
      { name: 'Laptops & MacBooks', icon: Laptop, bg: '#dbeafe', color: '#2563eb' },
      { name: 'Audio & Headphones', icon: Headphones, bg: '#f3e8ff', color: '#9333ea' },
      { name: 'Cameras & Drones', icon: Camera, bg: '#fef3c7', color: '#d97706' },
      { name: 'Smartwatches & Tech', icon: Watch, bg: '#d1fae5', color: '#059669' },
    ]
  },
  {
    title: 'FASHION & VINTAGE',
    items: [
      { name: 'Vintage Jackets', icon: Shirt, bg: '#ffedd5', color: '#ea580c' },
      { name: 'Sneakers & Footwear', icon: Footprints, bg: '#cff4fc', color: '#0891b2' },
      { name: 'Luxury Watches', icon: Watch, bg: '#fce7f3', color: '#db2777' },
      { name: 'Designer Handbags', icon: BagIcon, bg: '#ede9fe', color: '#7c3aed' },
      { name: 'Streetwear & Apparel', icon: Shirt, bg: '#e0e7ff', color: '#4f46e5' },
    ]
  },
  {
    title: 'GAMING & GEAR',
    items: [
      { name: 'PS5 & Xbox Consoles', icon: Gamepad2, bg: '#dbeafe', color: '#1d4ed8' },
      { name: 'Gaming PCs & GPUs', icon: Monitor, bg: '#d1fae5', color: '#047857' },
      { name: 'Controllers & Gear', icon: Gamepad2, bg: '#fef3c7', color: '#b45309' },
      { name: 'Nintendo Consoles', icon: Tv, bg: '#fee2e2', color: '#dc2626' },
      { name: 'Retro Collectibles', icon: Gamepad2, bg: '#f3e8ff', color: '#7e22ce' },
    ]
  },
  {
    title: 'HOME & LIVING',
    items: [
      { name: 'Sofas & Chairs', icon: Sofa, bg: '#fef3c7', color: '#d97706' },
      { name: 'Kitchen & Dining', icon: Utensils, bg: '#fee2e2', color: '#dc2626' },
      { name: 'Home Office Desks', icon: Monitor, bg: '#e0f2fe', color: '#0284c7' },
      { name: 'Lighting & Decor', icon: Lamp, bg: '#f3e8ff', color: '#7c3aed' },
      { name: 'Outdoor & Garden', icon: Sofa, bg: '#d1fae5', color: '#059669' },
    ]
  },
  {
    title: 'VEHICLES & AUTO',
    items: [
      { name: 'Cars & Trucks', icon: Car, bg: '#dbeafe', color: '#1d4ed8' },
      { name: 'E-Bikes & Scooters', icon: Bike, bg: '#d1fae5', color: '#047857' },
      { name: 'Car Audio & Tech', icon: Headphones, bg: '#fee2e2', color: '#dc2626' },
      { name: 'Tires & Spare Parts', icon: Car, bg: '#f1f5f9', color: '#475569' },
    ]
  },
  {
    title: 'BOOKS & COLLECTIBLES',
    items: [
      { name: 'Rare Vintage Books', icon: BookOpen, bg: '#f3e8ff', color: '#7e22ce' },
      { name: 'Comics & Manga', icon: BookOpen, bg: '#fce7f3', color: '#be185d' },
      { name: 'Trading Cards (TCG)', icon: Sparkles, bg: '#dbeafe', color: '#1d4ed8' },
      { name: 'Vinyl Records & Art', icon: Disc, bg: '#d1fae5', color: '#047857' },
    ]
  },
  {
    title: 'MARKETPLACE TOOLS',
    items: [
      { name: 'Brand New Verified', icon: ShieldCheck, bg: '#d1fae5', color: '#047857' },
      { name: 'Certified Pre-Owned', icon: RefreshCw, bg: '#fef3c7', color: '#b45309' },
      { name: 'Discount Hot Deals', icon: Tag, bg: '#fce7f3', color: '#be185d' },
    ]
  }
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('all');
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('tradehub_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error(e);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('tradehub_user');
    setUser(null);
    navigate('/');
  };

  const handleDropdownOpen = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsCategoriesDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsCategoriesDropdownOpen(false);
    }, 200);
  };

  const handleImmediateClose = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsCategoriesDropdownOpen(false);
  };

  const handleHomeClick = () => {
    handleImmediateClose();
    window.dispatchEvent(new Event('reset_home_curtains'));
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={handleHomeClick}>
          <div className="logo-icon">
            <ShoppingBag size={22} className="logo-svg" />
          </div>
          <span className="logo-text">
            Trade<span className="gradient-text">Hub</span>
          </span>
        </Link>

        {/* Search Bar (Desktop) */}
        <div className="navbar-search">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search laptops, smartphones, vintage fashion..."
            />
          </div>
          <button className="search-submit-btn">Search</button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={handleHomeClick}>
            Home
          </NavLink>

          {/* Categories Dropdown Trigger Container */}
          <div
            className="nav-dropdown-trigger"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <button
              className={`nav-link categories-dropdown-btn ${isCategoriesDropdownOpen ? 'active' : ''}`}
              onClick={(e) => e.preventDefault()}
            >
              <span>Categories</span>
              <ChevronDown size={16} className={`dropdown-arrow ${isCategoriesDropdownOpen ? 'open' : ''}`} />
            </button>

            {/* Notch Arrow dynamically placed directly under Categories button */}
            {isCategoriesDropdownOpen && <div className="categories-arrow-notch"></div>}

            {/* Mega Menu Dropdown */}
            {isCategoriesDropdownOpen && (
              <div
                className="ilovepdf-mega-overlay"
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
              >
                <div className="ilovepdf-mega-card">
                  <div className="ilovepdf-columns-grid">
                    {menuColumns.map((col, cIdx) => (
                      <div key={cIdx} className="ilovepdf-column">
                        <h4 className="ilovepdf-column-header">{col.title}</h4>
                        <div className="ilovepdf-items-list">
                          {col.items.map((item, iIdx) => {
                            const IconComp = item.icon;
                            return (
                              <Link
                                key={iIdx}
                                to="/explore"
                                className="ilovepdf-menu-item"
                                onClick={handleImmediateClose}
                              >
                                <span className="ilovepdf-icon-badge" style={{ background: item.bg, color: item.color }}>
                                  <IconComp size={15} />
                                </span>
                                <span className="ilovepdf-item-name">{item.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </nav>

        {/* CTA & User Actions */}
        <div className="nav-actions">
          {user ? (
            <div className="user-profile-menu flex items-center gap-2">
              <span className="user-greeting" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Hi, {user.name.split(' ')[0]}
              </span>
              <button
                onClick={handleSignOut}
                className="btn-secondary signin-btn"
                title="Sign Out"
                style={{ padding: '0.45rem 0.8rem', gap: '0.4rem' }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link to="/signin" className="btn-secondary signin-btn" onClick={handleImmediateClose}>
              <User size={16} />
              <span>Sign In</span>
            </Link>
          )}

          <Link to="/sell" className="btn-primary sell-btn" onClick={handleImmediateClose}>
            <PlusCircle size={18} />
            <span>Sell Product</span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Full-Page Backdrop Overlay */}
      {isCategoriesDropdownOpen && (
        <div
          className="backdrop-page-dimmer"
          onMouseEnter={handleDropdownClose}
          onClick={handleImmediateClose}
        ></div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-search">
            <div className="search-input-wrapper">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search items to buy or sell..." />
            </div>
          </div>

          {/* Always Open Categories Section in Mobile Drawer */}
          <div className="mobile-categories-section">
            <h3 className="mobile-categories-title">Categories</h3>
            <div className="mobile-subcategories-list">
              {menuColumns.map((col, cIdx) => (
                <div key={cIdx} className="mobile-category-group">
                  <div className="mobile-group-title">{col.title}</div>
                  <div className="mobile-group-items">
                    {col.items.map((item, iIdx) => {
                      const IconComp = item.icon;
                      return (
                        <Link
                          key={iIdx}
                          to="/explore"
                          className="mobile-category-item"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="mobile-icon-badge" style={{ background: item.bg, color: item.color }}>
                            <IconComp size={14} />
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mobile-drawer-footer">
            {user ? (
              <button
                className="btn-secondary w-full text-center"
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign Out ({user.name.split(' ')[0]})
              </button>
            ) : (
              <Link to="/signin" className="btn-secondary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
            )}
            <Link to="/sell" className="btn-primary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>
              List Item For Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
