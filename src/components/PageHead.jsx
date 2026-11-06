import { motion } from 'motion/react';
import { SplitText } from './motion';
import { EASE, PAGE_DELAY } from './motion/config';

// 서브 페이지 공통 머리 (다크). title: SplitText의 lines 배열
export default function PageHead({ no, en, title, children }) {
  return (
    <section className="relative bg-navy-950 text-white overflow-hidden">
      <motion.div
        className="absolute inset-0 grid-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: PAGE_DELAY }}
      />
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/25 blur-[120px]" />

      <div className="relative wrap pt-32 sm:pt-40 pb-14 sm:pb-20">
        <motion.p
          className="eyebrow-dark mb-6 flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: PAGE_DELAY }}
        >
          <span className="text-sun">{no}</span>
          <span className="h-px w-8 bg-white/30" />
          {en}
        </motion.p>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SplitText
            as="h1"
            onMount
            delay={PAGE_DELAY + 0.05}
            lines={title}
            className="lg:col-span-7 text-[38px] leading-[1.14] sm:text-[58px] font-bold"
          />
          {children && (
            <motion.div
              className="lg:col-span-5 text-[16px] sm:text-[17px] leading-relaxed text-white/65"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: PAGE_DELAY + 0.35 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
      <motion.div
        className="relative h-px bg-white/15 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: PAGE_DELAY + 0.2 }}
      />
    </section>
  );
}
