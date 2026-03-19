import React, { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from './components/Navbar.jsx';
import BottomNav from './components/BottomNav.jsx';
import Footer from './components/Footer.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import ContactPopup from './components/ContactPopup.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import BackToTop from './components/BackToTop.jsx';
import PageTransition from './components/PageTransition.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import { HelmetProvider } from 'react-helmet-async';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Work = lazy(() => import('./pages/Work.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

import CustomCursor from './components/CustomCursor.jsx';

function App() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Refresh ScrollTrigger on route change
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500); // Wait for page to render fully
  }, [location.pathname]);

  return (
    <HelmetProvider>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <SmoothScroll>
        {/* <CustomCursor /> */}
        <ScrollProgress />
        <div className="bg-grain"></div>
        <Navbar onOpenContact={() => setIsContactOpen(true)} />
        <BottomNav />
        {/* 100px padding bottom prevents bottom nav from hiding content on mobile, except on About where footer is inside */}
        <main ref={mainRef} className="relative w-full" style={{ paddingBottom: location.pathname === '/about' ? '0px' : '100px' }}>
          <PageTransition>
            <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--bg)' }}></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </main>
        {location.pathname !== '/about' && <Footer />}
        <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <BackToTop />
      </SmoothScroll>
    </HelmetProvider>
  );
}

export default App;
