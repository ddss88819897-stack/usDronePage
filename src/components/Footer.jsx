import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { NAV, SITE } from '../site';
import { Magnetic, Reveal, DrawLine } from './motion';
import { EASE } from './motion/config';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 text-white/65 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* 마무리 상담 띠 */}
      <div className="relative wrap pt-20 sm:pt-28 pb-16 grid lg:grid-cols-12 gap-8 lg:items-end">
        <div className="lg:col-span-8">
          <Reveal as="p" className="eyebrow-dark mb-5">Contact — 수강·출강 상담</Reveal>
          <Reveal as="h2" delay={0.08} className="text-white text-[32px] sm:text-[52px] leading-[1.15] font-bold">
            자격 취득부터 기관 교육까지,<br />상담은 원장이 직접 받습니다.
          </Reveal>
        </div>
        <Reveal delay={0.16} className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-2.5">
          <Magnetic><a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="btn-sun">카카오톡 상담 <span className="arrow">→</span></a></Magnetic>
          <Magnetic><a href={`tel:${SITE.phone}`} className="btn-ghost-dark num">{SITE.phone}</a></Magnetic>
        </Reveal>
      </div>

      <div className="relative wrap"><DrawLine className="bg-white/15" /></div>

      <div className="relative wrap py-14 grid gap-10 md:grid-cols-12 text-[15px]">
        <div className="md:col-span-5 space-y-1.5">
          <p className="eyebrow-dark mb-3">Office</p>
          <p className="text-white">{SITE.address}</p>
          <p>전화 <a href={`tel:${SITE.phone}`} className="link text-white num">{SITE.phone}</a></p>
          <p><a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="link text-white">카카오톡 채널</a></p>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow-dark mb-3">Programs</p>
          <p>1·2·3종 조종자, 지도조종자, 실기평가조종자</p>
          <p>학교·기관 출강, 나비 드론 공연, 항공 촬영</p>
        </div>
        <nav className="md:col-span-3">
          <p className="eyebrow-dark mb-3">Menu</p>
          <div className="grid grid-cols-2 gap-y-1.5">
            {NAV.map((n) => <Link key={n.to} to={n.to} className="link w-fit hover:text-white">{n.label}</Link>)}
          </div>
        </nav>
      </div>

      {/* 큰 워드마크 */}
      <div className="relative wrap overflow-hidden">
        <motion.p
          className="font-bold text-white/[0.07] leading-[0.9] tracking-[-0.05em] text-[17vw] lg:text-[200px] whitespace-nowrap select-none"
          initial={{ y: '60%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
          aria-hidden="true"
        >
          울산드론아카데미
        </motion.p>
      </div>

      <div className="relative wrap border-t border-white/10 py-6 flex justify-between font-mono text-[11px] tracking-[0.12em] text-white/40">
        <span>© {YEAR} {SITE.name}</span>
        <span className="hidden sm:inline">ULSAN · KOREA</span>
      </div>
    </footer>
  );
}
