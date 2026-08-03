import { Laptop, Shirt, Gamepad2, Sofa, Car, BookOpen, Sparkles } from 'lucide-react';
import '../styles/Categories.css';

const categoryList = [
  {
    id: 1,
    name: 'Electronics & Mobiles',
    icon: Laptop,
    count: '14,200+ Items',
    tag: 'Popular',
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15))',
    color: '#818cf8',
  },
  {
    id: 2,
    name: 'Vintage & Fashion',
    icon: Shirt,
    count: '9,800+ Items',
    tag: 'Trending',
    bg: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(244, 63, 94, 0.15))',
    color: '#f472b6',
  },
  {
    id: 3,
    name: 'Gaming & Consoles',
    icon: Gamepad2,
    count: '6,400+ Items',
    tag: 'Hot Resell',
    bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))',
    color: '#34d399',
  },
  {
    id: 4,
    name: 'Home & Furniture',
    icon: Sofa,
    count: '8,100+ Items',
    tag: 'Local Pickup',
    bg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15))',
    color: '#fbbf24',
  },
  {
    id: 5,
    name: 'Vehicles & Parts',
    icon: Car,
    count: '3,500+ Items',
    tag: 'Verified',
    bg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(99, 102, 241, 0.15))',
    color: '#38bdf8',
  },
  {
    id: 6,
    name: 'Books & Collectibles',
    icon: BookOpen,
    count: '5,900+ Items',
    tag: 'Rare Finds',
    bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))',
    color: '#c084fc',
  },
];

export default function Categories() {
  return (
    <section id="categories" className="categories-section">
      <div className="container">
        
        <div className="section-header text-center">
          <div className="section-badge">
            <Sparkles size={14} />
            <span>Explore Categories</span>
          </div>
          <h2 className="section-title">
            Browse By <span className="gradient-text">Top Marketplace Categories</span>
          </h2>
          <p className="section-subtitle">
            Find certified brand new inventory from retailers or rare pre-owned gems from local sellers.
          </p>
        </div>

        <div className="categories-grid">
          {categoryList.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.id}
                className="category-card glass-panel"
              >
                <div
                  className="cat-icon-wrapper"
                  style={{ background: cat.bg, color: cat.color }}
                >
                  <IconComponent size={28} />
                </div>
                <div className="cat-details">
                  <div className="cat-tag-pill">{cat.tag}</div>
                  <h3 className="cat-title">{cat.name}</h3>
                  <p className="cat-count">{cat.count}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
