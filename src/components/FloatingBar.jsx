import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { SITE } from '../site';
import { EASE } from './motion/config';

// 모바일 하단 상담 바. 첫 화면을 지나면 아래에서 올라옵니다.
export default function FloatingBar() {
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShown(v > 320));

  return (
    <motion.div
      className="lg:hidden fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-navy-950/95 backdrop-blur px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))]"
      initial={false}
      animate={{ y: shown ? 0 : '110%' }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="grid grid-cols-2 gap-2">
        <a href={`tel:${SITE.phone}`} className="btn-ghost-dark h-12 text-[15px]">전화 문의</a>
        <a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="btn-kakao h-12 text-[15px]">카카오톡 상담</a>
      </div>
    </motion.div>
  );
}
