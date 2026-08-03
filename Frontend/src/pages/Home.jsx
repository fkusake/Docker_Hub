import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  const location = useLocation();
  const [showProducts, setShowProducts] = useState(
    Boolean(location.state && location.state.showProducts)
  );

  useEffect(() => {
    if (location.state && location.state.showProducts) {
      setShowProducts(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.state]);

  useEffect(() => {
    const handleReset = () => {
      setShowProducts(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('reset_home_curtains', handleReset);
    return () => window.removeEventListener('reset_home_curtains', handleReset);
  }, []);

  return (
    <>
      <Hero
        onOpenMarketplace={() => setShowProducts(true)}
        onCloseMarketplace={() => setShowProducts(false)}
        showProducts={showProducts}
      />
      {showProducts && <FeaturedProducts />}
    </>
  );
}
