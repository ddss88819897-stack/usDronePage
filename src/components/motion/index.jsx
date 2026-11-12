import { useRef } from 'react';
import { motion, useTransform, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { EASE, VIEW, SCROLL_SPRING, useDesktop } from './config';

// 차분한 신뢰형: 내용은 처음부터 보이게 두고, 움직임은 첫 화면 비행·사진이 열리는 순간·자격 단계 진행선에만 씁니다.

/* 페이지 머리 제목: 처음 열릴 때 한 번만 줄 단위로 올라옴. lines: ['문장', [['조각'], ['강조', 'class']]] */
export function SplitText({ as = 'h2', lines, delay = 0, className }) {
  const M = motion[as];
  const norm = lines.map((l) => (typeof l === 'string' ? [[l]] : l));
  return (
    <M className={className} initial="hidden" animate="show" aria-label={norm.map((l) => l.map((s) => s[0]).join('')).join(' ')}>
      {norm.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          <motion.span
            className="block"
            variants={{
              hidden: { y: '105%' },
              show: { y: 0, transition: { duration: 0.9, ease: EASE, delay: delay + li * 0.1 } },
            }}
          >
            {line.map(([t, c], si) => <span key={si} className={c}>{t}</span>)}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/* 사진이 마스크로 열리고 살짝 줄어들며 자리잡음. parallax: 스크롤에 따라 천천히 움직임 (데스크탑) */
const CLIP = {
  up: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 0% 0% 100%)',
  right: 'inset(0% 100% 0% 0%)',
};
export function MaskImage({ src, alt, from = 'up', parallax = false, delay = 0, onMount = false, priority, className = '', imgClass = '', children }) {
  const ref = useRef(null);
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const y = useTransform(smooth, [0, 1], ['-5%', '5%']);
  const on = parallax && desktop && !reduce;
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: VIEW };

  return (
    <div ref={ref} className={`group relative overflow-hidden bg-navy-800/40 ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        {...trigger}
        variants={{
          hidden: { clipPath: CLIP[from] },
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASE, delay } },
        }}
      >
        <motion.div className={`absolute inset-x-0 ${on ? '-top-[6%] h-[112%]' : 'inset-y-0'}`} style={on ? { y } : undefined}>
          <motion.img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            className={`h-full w-full object-cover ${imgClass}`}
            variants={{ hidden: { scale: 1.08 }, show: { scale: 1, transition: { duration: 1.6, ease: EASE, delay } } }}
          />
        </motion.div>
      </motion.div>
      {children}
    </div>
  );
}

/* 사진·지도 모서리의 HUD 괄호 */
export function HudCorners({ className = 'border-white/70', size = 'w-5 h-5', inset = 'inset-3' }) {
  const base = `pointer-events-none absolute ${size} ${className}`;
  return (
    <div className={`pointer-events-none absolute ${inset} z-10`}>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} left-0 bottom-0 border-l border-b`} />
      <span className={`${base} right-0 bottom-0 border-r border-b`} />
    </div>
  );
}

/* 화살표 아이콘 (글자 대신 그린 SVG) */
export function Arrow({ className = 'arrow h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h9.5M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
