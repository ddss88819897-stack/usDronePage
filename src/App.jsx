import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import FloatingBar from './components/FloatingBar';
import Home from './pages/Home';
import About from './pages/About';
import Curriculum from './pages/Curriculum';
import Event from './pages/Event';
import Gallery from './pages/Gallery';
import Location from './pages/Location';

function App() {
  const location = useLocation();

  // 스크롤 시 요소 등장 애니메이션 (Vanilla JS의 checkReveal 완벽 이식)
  useEffect(() => {
    const checkReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        if (reveal.getBoundingClientRect().top < window.innerHeight - 100) {
          reveal.classList.add('active');
        }
      });
    };
    
    // 페이지 이동 시 스크롤 최상단으로 이동 후 애니메이션 체크
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(checkReveal, 100); 

    window.addEventListener('scroll', checkReveal);
    return () => window.removeEventListener('scroll', checkReveal);
  }, [location.pathname]);

  return (
    <div className="text-slate-800 pb-28">
      <Header />
      <main className="pt-24 overflow-hidden relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/event" element={<Event />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/location" element={<Location />} />
        </Routes>
      </main>
      <FloatingBar />
    </div>
  );
}

export default App;