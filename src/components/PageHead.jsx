import { motion } from 'motion/react';
import { SplitText } from './motion';
import { EASE, PAGE_DELAY } from './motion/config';

// 서브 페이지 공통 머리 (다크). title: SplitText의 lines 배열
export default function PageHead({ title, children }) {
  return (
    <section className="bg-navy-950 text-white border-b border-white/10">
      <div className="wrap pt-32 sm:pt-40 pb-14 sm:pb-20 grid gap-6 lg:grid-cols-12 lg:items-end">
        <SplitText
          as="h1"
          delay={PAGE_DELAY}
          lines={title}
          className="lg:col-span-7 text-[36px] leading-[1.16] sm:text-[56px] font-bold"
        />
        {children && (
          <motion.div
            className="lg:col-span-5 max-w-[40em] text-[16px] sm:text-[17px] leading-relaxed text-white/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: PAGE_DELAY + 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
