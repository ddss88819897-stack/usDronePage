import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { useDesktop } from './config';

// 데스크탑 전용 링 커서. 링크 위에서 커지고, data-cursor가 있는 곳에서는 라벨을 보여줍니다.
export default function Cursor() {
  const desktop = useDesktop();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 38, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 320, damping: 38, mass: 0.6 });
  const [state, setState] = useState({ hover: false, label: '', shown: false });

  useEffect(() => {
    if (!desktop) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target instanceof Element ? e.target : null;
      const labelEl = t?.closest('[data-cursor]');
      const hover = !!t?.closest('a, button, [role="button"]');
      const label = labelEl?.getAttribute('data-cursor') || '';
      setState((s) => (s.hover === hover && s.label === label && s.shown ? s : { hover, label, shown: true }));
    };
    const leave = () => setState((s) => ({ ...s, shown: false }));
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [desktop, x, y]);

  if (!desktop) return null;
  const size = state.label ? 84 : state.hover ? 52 : 26;

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[300] ${state.label ? '' : 'mix-blend-difference'}`}
      style={{ x: sx, y: sy }}
      animate={{ opacity: state.shown ? 1 : 0 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-white flex items-center justify-center"
        animate={{ width: size, height: size, backgroundColor: state.label ? '#f2a414' : 'rgba(242,164,20,0)', borderColor: state.label ? '#f2a414' : '#ffffff' }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      >
        <AnimatePresence>
          {state.label && (
            <motion.span
              key={state.label}
              className="text-[13px] font-semibold text-[#060f24]"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
