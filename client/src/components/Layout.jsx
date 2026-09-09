import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 400);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="body-inner">
      <Header />
      <Outlet />
      <Footer />
      {showScrollTop && (
        <a id="scrollTop" style={{ display: 'block' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className="icon-chevron-up" />
          <i className="icon-chevron-up" />
        </a>
      )}
    </div>
  );
}
