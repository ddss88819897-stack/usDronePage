import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Header from './components/Header';
import FloatingBar from './components/FloatingBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Curriculum from './pages/Curriculum';
import Event from './pages/Event';
import Gallery from './pages/Gallery';
import Location from './pages/Location';

// 페이지 전환: 짧은 네이비 커튼 (0.3초 안팎). 내용을 오래 가리지 않습니다.
const CURTAIN_EASE = [0.65, 0, 0.35, 1];
function Page({ children }) {
  return (
    <motion.div>
      {children}
      <motion.div
        className="fixed inset-0 z-[150] bg-navy-950 origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.35, ease: CURTAIN_EASE } }}
        exit={{ scaleY: 0 }}
      />
      <motion.div
        className="fixed inset-0 z-[150] bg-navy-950 origin-bottom pointer-events-none"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.25, ease: CURTAIN_EASE } }}
      />
    </motion.div>
  );
}

function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col pb-[76px] lg:pb-0">
        <Header />
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Page key={location.pathname}>
            <main>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/event" element={<Event />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/location" element={<Location />} />
              </Routes>
            </main>
            <Footer />
          </Page>
        </AnimatePresence>
        <FloatingBar />
      </div>
    </MotionConfig>
  );
}

export default App;
