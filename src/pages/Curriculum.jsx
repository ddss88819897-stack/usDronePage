import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import PageHead from '../components/PageHead';
import SectionHead from '../components/SectionHead';
import { CountUp, Stagger, StaggerItem, Reveal, Magnetic, DrawLine } from '../components/motion';
import { EASE } from '../components/motion/config';
import { COURSES, SITE } from '../site';

const PACKAGES = [
  {
    for: '공인중개사·개발업자',
    en: 'Real Estate Aerial',
    title: '부동산 항공촬영 실무반',
    body: '자격증 취득과 함께 토지 임장, 매물 홍보용 항공 촬영, 짧은 홍보 영상 편집까지 실습합니다.',
  },
  {
    for: '입대 예정자',
    en: 'Military Track',
    title: '육군 드론병·부사관 준비반',
    body: '1종 자격 취득에 더해 부대에서 쓰는 비행 방식을 연습하고, 드론병 출신 원장이 면접과 복무를 미리 알려드립니다.',
  },
];

// 자격 단계: 1종 → 지도조종자 → 실기평가조종자
const PATH = [COURSES[0], COURSES[3], COURSES[4]];

function CareerPath() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });

  return (
    <section ref={ref} className="relative bg-navy-950 text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative wrap py-20 sm:py-28">
        <SectionHead
          dark
          no="02"
          en="Career Path"
          title={['1종에서 실기평가조종자까지', '단계별로 올라갑니다']}
          lede="지도조종자는 1종 자격을, 실기평가조종자는 지도조종자 자격을 먼저 갖춰야 합니다. 한 곳에서 다음 단계까지 이어서 준비할 수 있습니다."
        />
        <div className="relative grid md:grid-cols-3 gap-10 md:gap-6">
          {/* 진행선 */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/15 md:left-3 md:right-3 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
          <motion.div
            className="absolute left-[11px] top-3 bottom-3 w-px bg-sun origin-top md:hidden"
            style={{ scaleY: fill }}
          />
          <motion.div
            className="hidden md:block absolute left-3 right-3 top-[11px] h-px bg-sun origin-left"
            style={{ scaleX: fill }}
          />
          {PATH.map((c, i) => {
            const at = i / (PATH.length - 1);
            return <Step key={c.name} c={c} i={i} at={at} progress={fill} />;
          })}
        </div>
      </div>
    </section>
  );
}

function Step({ c, i, at, progress }) {
  const lit = useTransform(progress, [Math.max(0, at - 0.05), at], [0, 1]);
  const bg = useTransform(lit, [0, 1], ['#060f24', '#f2a414']);
  const border = useTransform(lit, [0, 1], ['rgba(255,255,255,.35)', '#f2a414']);
  return (
    <div className="relative pl-12 md:pl-0 md:pt-12">
      <motion.span
        className="absolute left-0 top-0 h-6 w-6 rounded-full border-2"
        style={{ backgroundColor: bg, borderColor: border }}
      />
      <Reveal delay={i * 0.12}>
        <p className="font-mono text-[11px] tracking-[0.14em] text-sun">STEP {String(i + 1).padStart(2, '0')}</p>
        <h3 className="mt-2 text-[24px] sm:text-[28px] font-bold">{c.name}</h3>
        <p className="mt-2 text-[15px] text-white/60">{c.note}</p>
        <p className="mt-5 font-mono text-[13px] text-white/80">FLIGHT {c.hours}H · <CountUp to={c.price / 10000} />만원</p>
      </Reveal>
    </div>
  );
}

export default function Curriculum() {
  return (
    <>
      <PageHead no="01" en="License Training" title={['드론 국가자격 과정과', '교육비']}>
        모든 과정은 원장이 1:1로 가르칩니다. 교육비는 부가세를 포함한 금액입니다.
      </PageHead>

      <section className="wrap py-16 sm:py-24">
        <SectionHead no="01" en="Tuition" title={['정규 과정 교육비']} />
        <div className="hidden md:grid grid-cols-12 gap-6 pb-3 font-mono text-[11px] tracking-[0.14em] text-muted">
          <span className="col-span-1">NO.</span>
          <span className="col-span-5">COURSE</span>
          <span className="col-span-2">FLIGHT</span>
          <span className="col-span-4 text-right">TUITION (VAT 포함)</span>
        </div>
        <DrawLine className="bg-ink" />
        <Stagger as="ul" gap={0.09}>
          {COURSES.map((c, i) => (
            <StaggerItem
              as="li"
              key={c.name}
              className="group relative grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-1 py-7 sm:py-8 border-b border-line transition-colors duration-300 hover:bg-white"
            >
              <span className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 bg-sun transition-transform duration-500 group-hover:scale-y-100" />
              <span className="hidden md:block md:col-span-1 self-center pl-4 font-mono text-[13px] text-muted">{String(i + 1).padStart(2, '0')}</span>
              <div className="col-span-2 md:col-span-5 md:pl-0 pl-4 transition-transform duration-500 group-hover:translate-x-2">
                <p className="text-[20px] sm:text-[24px] font-bold tracking-tight">{c.name}</p>
                <p className="mt-1 text-[14px] sm:text-[15px] text-muted">{c.note}</p>
              </div>
              <p className="pl-4 md:pl-0 md:col-span-2 self-center font-mono text-[14px] sm:text-[15px] mt-3 md:mt-0">{c.hours}H</p>
              <p className="md:col-span-4 self-center text-right pr-4 text-[22px] sm:text-[32px] font-bold tracking-tight mt-3 md:mt-0">
                <CountUp to={c.price} duration={1.6} />
                <span className="ml-1 text-[15px] font-medium text-muted">원</span>
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CareerPath />

      <section className="wrap py-20 sm:py-28">
        <SectionHead
          no="03"
          en="Special Programs"
          title={['목적에 맞춘 실무 과정']}
          lede="자격증 이후에 할 일이 정해져 있다면, 그 일에 맞춰 수업을 짭니다. 교육비는 상담 후 정합니다."
        />
        <Stagger className="grid md:grid-cols-2 gap-4 sm:gap-5" gap={0.15}>
          {PACKAGES.map((p, i) => (
            <StaggerItem key={p.title} y={50}>
              <article className={`group relative h-full flex flex-col overflow-hidden p-8 sm:p-12 border transition-colors duration-500 ${i === 1 ? 'bg-navy-950 text-white border-navy-950' : 'bg-white border-line hover:border-navy-950'}`}>
                <motion.span
                  className={`absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl ${i === 1 ? 'bg-brand/40' : 'bg-sun/15'}`}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className={`relative font-mono text-[11px] tracking-[0.14em] ${i === 1 ? 'text-sun' : 'text-brand'}`}>{p.en.toUpperCase()}</p>
                <p className={`relative mt-6 text-[14px] font-semibold ${i === 1 ? 'text-white/60' : 'text-muted'}`}>{p.for} 추천</p>
                <h3 className="relative mt-2 text-[26px] sm:text-[32px] font-bold leading-snug">{p.title}</h3>
                <p className={`relative mt-4 text-[16px] leading-relaxed ${i === 1 ? 'text-white/65' : 'text-muted'}`}>{p.body}</p>
                <div className="relative mt-auto pt-10">
                  <Magnetic>
                    <a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className={i === 1 ? 'btn-sun' : 'btn-primary'}>
                      이 과정 상담하기 <span className="arrow">→</span>
                    </a>
                  </Magnetic>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.2} className="mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-5 border-t border-line pt-8">
          <p className="text-[17px]"><span className="font-semibold">어떤 종이 맞는지 모르겠다면,</span> <span className="text-muted">하려는 일과 쓰려는 기체를 알려주세요.</span></p>
          <motion.a
            href={SITE.kakao}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-kakao shrink-0"
            whileHover={{ scale: 1.03 }}
            transition={{ ease: EASE }}
          >
            카카오톡으로 묻기
          </motion.a>
        </Reveal>
      </section>
    </>
  );
}
