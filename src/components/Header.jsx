import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { NAV, SITE } from '../site';
import { EASE } from './motion/config';
import KakaoButton from './KakaoButton';

export default function Header() {
  const { pathname } = useLocation();
  // 메뉴를 연 페이지를 기억해 두고, 페이지가 바뀌면 자동으로 닫힌 상태가 됩니다
  const [openOn, setOpenOn] = useState(null);
  const open = openOn === pathname;
  const setOpen = (v) => setOpenOn(v ? pathname : null);

  const { scrollY } = useScroll();
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
            <span className="text-[16px] font-bold tracking-tight">{SITE.name}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 text-[15px] font-medium">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className="relative px-4 py-2">
                {({ isActive }) => (
                  <>
                    <span className={`relative z-10 transition-colors ${isActive ? 'text-white' : 'text-white/75 hover:text-white'}`}>{n.label}</span>
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
            <KakaoButton className="hidden lg:inline-flex h-10 px-4 text-[14px]" />
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
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-navy-950 lg:hidden flex flex-col pt-24 pb-10 text-white"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.nav
              className="wrap flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
            >
              {[{ to: '/', label: '홈' }, ...NAV].map((n) => (
                <motion.div
                  key={n.to}
                  className="overflow-hidden border-b border-white/10"
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } } }}
                >
                  <NavLink
                    to={n.to}
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `flex items-baseline py-4 ${isActive ? 'text-sun' : 'text-white'}`}
                  >
                    <span className="text-[28px] font-bold tracking-tight">{n.label}</span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
            <motion.div
              className="wrap mt-auto grid gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.4, ease: EASE } }}
            >
              <a href={`tel:${SITE.phone}`} className="btn-ghost-dark w-full num">전화 {SITE.phone}</a>
              <KakaoButton className="w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
