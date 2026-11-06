import { useEffect, useRef } from 'react';
import {
  motion, useInView, useMotionValue, useTransform, animate, useScroll,
  useSpring, useReducedMotion,
} from 'motion/react';
import { EASE, VIEW, useDesktop } from './config';

/* 화면에 들어오면 한 번 떠오름 */
export function Reveal({ as = 'div', delay = 0, y = 28, x = 0, className, children, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEW}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/* 목록을 순서대로 등장 */
export function Stagger({ as = 'div', gap = 0.08, delay = 0, className, children, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </M>
  );
}
export function StaggerItem({ as = 'div', y = 24, className, children, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </M>
  );
}

/* 제목을 마스크 안에서 밀어 올림. lines: ['문장', [['조각'], ['강조', 'class']]] */
export function SplitText({ as = 'h2', lines, mode = 'line', delay = 0, onMount = false, className }) {
  const M = motion[as];
  const norm = lines.map((l) => (typeof l === 'string' ? [[l]] : l));
  const trigger = onMount
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: VIEW };
  const step = mode === 'char' ? 0.028 : 0.12;
  let i = 0;

  return (
    <M className={className} {...trigger} aria-label={norm.map((l) => l.map((s) => s[0]).join('')).join(' ')}>
      {norm.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
          {mode === 'line' ? (
            <motion.span
              className="block"
              variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1, ease: EASE, delay: delay + li * step } } }}
            >
              {line.map(([t, c], si) => <span key={si} className={c}>{t}</span>)}
            </motion.span>
          ) : (
            line.map(([t, c], si) => (
              <span key={si} className={c}>
                {t.split(/(\s+)/).map((word, wi) =>
                  /^\s+$/.test(word) ? (
                    <span key={wi}>{word}</span>
                  ) : (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {[...word].map((ch, ci) => {
                        const d = delay + i++ * step;
                        return (
                          <motion.span
                            key={ci}
                            className="inline-block"
                            variants={{
                              hidden: { y: '110%', opacity: 0 },
                              show: { y: 0, opacity: 1, transition: { duration: 0.9, ease: EASE, delay: d } },
                            }}
                          >
                            {ch}
                          </motion.span>
                        );
                      })}
                    </span>
                  )
                )}
              </span>
            ))
          )}
        </span>
      ))}
    </M>
  );
}

/* 사진이 마스크로 열리고 살짝 줄어들며 자리잡음. parallax: 스크롤에 따라 천천히 움직임 */
const CLIP = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 0% 0% 100%)',
  right: 'inset(0% 100% 0% 0%)',
};
export function MaskImage({ src, alt, from = 'up', parallax = false, delay = 0, onMount = false, priority, className = '', imgClass = '', children }) {
  const ref = useRef(null);
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);
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
          show: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.3, ease: EASE, delay } },
        }}
      >
        <motion.div className={`absolute inset-x-0 ${on ? '-top-[8%] h-[116%]' : 'inset-y-0'}`} style={on ? { y } : undefined}>
          <motion.img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            className={`h-full w-full object-cover ${imgClass}`}
            variants={{
              hidden: { scale: 1.18 },
              show: { scale: 1, transition: { duration: 1.8, ease: EASE, delay } },
            }}
          />
        </motion.div>
      </motion.div>
      {children}
    </div>
  );
}

/* 숫자 카운트업 */
export function CountUp({ to, from = 0, duration = 1.8, delay = 0, format, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, VIEW);
  const reduce = useReducedMotion();
  const mv = useMotionValue(reduce ? to : from);
  const fmt = format || ((n) => Math.round(n).toLocaleString('ko-KR'));
  const text = useTransform(mv, fmt);
  useEffect(() => {
    if (!inView) return;
    const c = animate(mv, to, { duration: reduce ? 0 : duration, ease: EASE, delay });
    return () => c.stop();
  }, [inView, to, mv, duration, delay, reduce]);
  return <motion.span ref={ref} className={`num ${className || ''}`}>{text}</motion.span>;
}

/* 선이 그려짐 */
export function DrawLine({ className = 'bg-ink', delay = 0, vertical = false }) {
  return (
    <motion.div
      className={`${vertical ? 'w-px h-full origin-top' : 'h-px w-full origin-left'} ${className}`}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={VIEW}
      transition={{ duration: 1.2, ease: EASE, delay }}
    />
  );
}

/* 흐르는 띠 */
export function Marquee({ items, className = '' }) {
  const row = (k) => (
    <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 sm:px-10">{t}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-sun" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">{[row(0), row(1)]}</div>
    </div>
  );
}

/* 버튼이 커서 쪽으로 살짝 끌림 (데스크탑) */
export function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null);
  const desktop = useDesktop();
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const move = (e) => {
    if (!desktop) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} style={{ x, y }} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
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
