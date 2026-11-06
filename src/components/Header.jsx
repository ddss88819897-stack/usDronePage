import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring } from 'motion/react';
import { NAV, SITE } from '../site';
import { EASE } from './motion/config';

export default function Header() {
  const { pathname } = useLocation();
  // 메뉴를 연 페이지를 기억해 두고, 페이지가 바뀌면 자동으로 닫힌 상태가 됩니다
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = (v) => setOpenOn(v ? pathname : null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(v > 40);
    setHidden(v > prev && v > 240);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[100] text-white transition-colors duration-300 ${
          solid || open ? 'bg-navy-950/85 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'
        }`}
        animate={{ y: hidden && !open ? '-100%' : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="wrap flex h-16 sm:h-[72px] items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={`${SITE.name} 홈`}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white">
              <img src="/img/logo-256.png" alt="" className="h-9 w-9 object-contain" />
            </span>
            <span className="leading-tight">
              <span className="block text-[16px] font-bold tracking-tight">{SITE.name}</span>
              <span className="hidden sm:block font-mono text-[10px] tracking-[0.18em] text-white/50">ULSAN DRONE ACADEMY</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-[15px] font-medium">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="relative px-4 py-2">
                {({ isActive }) => (
                  <>
                    <span className={`relative z-10 transition-colors ${isActive ? 'text-white' : 'text-white/65 hover:text-white'}`}>{n.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-[2px] bg-sun"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="hidden lg:inline-flex btn-sun h-10 px-5 text-[14px]">
              수강 상담 <span className="arrow">→</span>
            </a>
            <button
              className="lg:hidden -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px]"
              onClick={() => setOpen(!open)}
              aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
              aria-expanded={open}
            >
              <motion.span className="block h-[2px] w-6 bg-white" animate={open ? { y: 8, rotate: 45 } : { y: 0, rotate: 0 }} />
              <motion.span className="block h-[2px] w-6 bg-white" animate={{ opacity: open ? 0 : 1 }} />
              <motion.span className="block h-[2px] w-6 bg-white" animate={open ? { y: -8, rotate: -45 } : { y: 0, rotate: 0 }} />
            </button>
          </div>
        </div>
        <motion.div className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-sun" style={{ scaleX: progress, opacity: solid ? 1 : 0 }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-navy-950 grid-bg lg:hidden flex flex-col pt-24 pb-10 text-white"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <motion.nav
              className="wrap flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            >
              {[{ to: '/', label: '홈' }, ...NAV].map((n, i) => (
                <motion.div
                  key={n.to}
                  className="overflow-hidden border-b border-white/10"
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
                >
                  <NavLink
                    to={n.to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `flex items-baseline gap-4 py-4 ${isActive ? 'text-sun' : 'text-white'}`}
                  >
                    <span className="font-mono text-[12px] text-white/40">0{i}</span>
                    <span className="text-[28px] font-bold tracking-tight">{n.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div
              className="wrap mt-auto grid gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6, ease: EASE } }}
            >
              <a href={`tel:${SITE.phone}`} className="btn-ghost-dark w-full num">전화 {SITE.phone}</a>
              <a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="btn-kakao w-full">카카오톡 상담하기</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
