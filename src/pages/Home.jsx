import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import FlightPath from '../components/FlightPath';
import SectionHead from '../components/SectionHead';
import { SplitText, MaskImage, CountUp, Magnetic, Marquee, Stagger, StaggerItem, Reveal, DrawLine, HudCorners } from '../components/motion';
import { EASE, PAGE_DELAY, SCROLL_SPRING } from '../components/motion/config';
import { COURSES, SITE, STATS } from '../site';

const PASSES = [
  ['김OO', '1종 실기 한 번에 합격'],
  ['박OO', '지도조종자(교관) 합격'],
  ['최OO', '실기평가조종자 최종 합격'],
  ['이OO', '육군 드론병 합격'],
  ['정OO', '1종 실기 한 번에 합격'],
];

const SERVICES = [
  {
    no: '01', en: 'Certification', title: '드론 국가자격 과정', to: '/curriculum', cta: '과정과 교육비',
    items: ['1·2·3종 조종자 정규반', '지도조종자·실기평가조종자', '육군 드론병·부사관 준비반', '부동산 항공촬영 실무반'],
  },
  {
    no: '02', en: 'Outreach', title: '학교·기관 출강', to: '/event', cta: '출강 안내',
    items: ['초·중·고 정규·방과후 수업', '청소년 드론 진로 특강', '교육청 교원 연수', '관공서·기업 임직원 교육'],
  },
  {
    no: '03', en: 'Events', title: '축제·행사와 나비 드론 공연', to: '/event', cta: '행사 기획 안내',
    items: ['LED 나비 드론 비행 공연', '지역 축제 조종 체험 부스', '행사·홍보용 항공 촬영'],
  },
];

const MARQUEE = ['1종 조종자', '2종 조종자', '3종 조종자', '지도조종자', '실기평가조종자', '학교·기관 출강', '나비 드론 공연', '항공 촬영'];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING);
  const textY = useTransform(smooth, [0, 1], [0, -120]);
  const fade = useTransform(smooth, [0, 0.8], [1, 0.15]);
  const d = PAGE_DELAY;

  return (
    <section ref={ref} className="relative bg-navy-950 text-white overflow-hidden">
      <motion.div className="absolute inset-0 grid-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: d }} />
      <div className="absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-brand/30 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-sun/10 blur-[140px]" />
      <FlightPath delay={d + 0.4} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative wrap grid lg:grid-cols-12 gap-12 items-center pt-28 sm:pt-32 pb-16 lg:min-h-svh">
        <div className="lg:col-span-7">
          <motion.p
            className="eyebrow-dark mb-7 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: d }}
          >
            <span className="h-2 w-2 rounded-full bg-sun blink" />
            Drone Pilot Certification — Ulsan
          </motion.p>

          <SplitText
            as="h1"
            mode="char"
            onMount
            delay={d + 0.1}
            lines={['드론 국가자격증,', [['울산에서 '], ['1:1', 'text-sun'], ['로 따세요']]]}
            className="text-[42px] leading-[1.12] sm:text-[64px] lg:text-[80px] font-bold"
          />

          <motion.p
            className="mt-7 max-w-[34em] text-[17px] sm:text-[19px] leading-relaxed text-white/65"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: d + 0.7 }}
          >
            육군 드론병 출신 실기평가조종자가 이론부터 실기 시험장까지 직접 가르칩니다.
          </motion.p>

          <motion.dl
            className="mt-10 grid grid-cols-3 border-y border-white/15 max-w-[580px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: d + 0.85 }}
          >
            {COURSES.slice(0, 3).map((c, i) => (
              <div key={c.name} className={`py-5 ${i ? 'pl-4 sm:pl-6 border-l border-white/15' : ''}`}>
                <dt className="font-mono text-[11px] tracking-[0.14em] text-white/45">CLASS {i + 1}</dt>
                <dd className="mt-1.5 text-[20px] sm:text-[28px] font-bold tracking-tight">
                  <CountUp to={c.price / 10000} delay={d + 0.9 + i * 0.12} />
                  <span className="text-[13px] sm:text-[15px] font-semibold text-white/70">만원</span>
                </dd>
                <dd className="font-mono text-[11px] sm:text-[12px] text-white/45 mt-0.5">FLIGHT {c.hours}H</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: d + 1 }}
          >
            <Magnetic><Link to="/curriculum" className="btn-sun w-full sm:w-auto">과정과 교육비 보기 <span className="arrow">→</span></Link></Magnetic>
            <Magnetic><a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark w-full sm:w-auto">카카오톡 상담하기</a></Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-white/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: d + 2 }}
      >
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-sun"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <div className="bg-navy-900 border-y border-white/10 py-5 text-white/80 text-[15px] sm:text-[17px] font-medium">
        <Marquee items={MARQUEE} />
      </div>

      {/* 최근 합격 */}
      <section className="wrap py-14 sm:py-20">
        <Reveal as="p" className="eyebrow mb-6">Recent Results — 최근 합격</Reveal>
        <Stagger as="ul" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-line">
          {PASSES.map(([n, r], i) => (
            <StaggerItem as="li" key={i} className="border-r border-b border-line bg-white p-5 sm:p-6 hover:bg-navy-950 hover:text-white transition-colors duration-300 group">
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted group-hover:text-sun">PASS {String(i + 1).padStart(2, '0')}</p>
              <p className="mt-3 font-semibold">{n}</p>
              <p className="text-[15px] text-muted group-hover:text-white/70">{r}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 하는 일 */}
      <section className="wrap pb-20 sm:pb-28">
        <SectionHead
          no="01"
          en="What we do"
          title={['자격증 교육부터', '학교 수업, 축제 공연까지']}
          lede="교육원에서는 국가자격 과정을 운영하고, 밖에서는 학교와 기관, 지역 축제를 찾아가 드론 수업과 공연을 엽니다."
        />
        <DrawLine className="bg-ink" />
        <Stagger className="grid md:grid-cols-3 gap-4 sm:gap-5 pt-5" gap={0.12}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.no} y={40}>
              <Link
                to={s.to}
                className="group relative flex h-full flex-col bg-white border border-line p-7 sm:p-9 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-navy-950 hover:shadow-[0_30px_60px_-30px_rgba(6,15,36,.35)]"
              >
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-sun transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] text-muted group-hover:text-sun transition-colors">{s.no}</span>
                  <span className="eyebrow text-[11px]">{s.en}</span>
                </div>
                <h3 className="mt-10 text-[22px] sm:text-[25px] font-bold leading-snug">{s.title}</h3>
                <ul className="mt-5 space-y-2.5 text-[15px] sm:text-[16px] text-ink/75">
                  {s.items.map((t) => (
                    <li key={t} className="flex gap-3"><span className="mt-[11px] h-px w-3 shrink-0 bg-ink/40" />{t}</li>
                  ))}
                </ul>
                <span className="mt-auto pt-10 flex items-center justify-between text-[15px] font-semibold text-brand">
                  {s.cta}
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-300 group-hover:bg-navy-950 group-hover:border-navy-950 group-hover:text-white group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 지표 */}
      <section className="bg-white border-y border-line">
        <Stagger className="wrap grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <StaggerItem key={s.label} className={`py-10 sm:py-14 ${i % 2 ? 'pl-5 sm:pl-8 border-l border-line' : ''} ${i === 2 ? 'lg:pl-8 lg:border-l border-t lg:border-t-0 border-line' : ''} ${i === 3 ? 'border-t lg:border-t-0' : ''}`}>
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-3 text-[40px] sm:text-[60px] leading-none font-bold tracking-tight">
                <CountUp to={s.value} from={s.from || 0} format={(n) => String(Math.round(n))} />
                <span className="text-[17px] sm:text-[22px] font-semibold text-brand ml-1">{s.unit}</span>
              </p>
              <p className="mt-3 text-[14px] sm:text-[15px] text-muted">{s.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 강사 */}
      <section className="relative bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative wrap py-20 sm:py-28 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <Link to="/about" data-cursor="이력" className="block max-w-[460px]">
              <MaskImage src="/img/ceo.jpg" alt="윤남걸 대표원장" from="right" parallax className="aspect-[4/5]">
                <HudCorners />
              </MaskImage>
            </Link>
          </div>
          <div className="lg:col-span-7">
            <SectionHead
              dark
              no="02"
              en="Instructor"
              title={['윤남걸 대표원장이', '처음부터 끝까지 가르칩니다']}
              className="!mb-8 lg:[&>div]:col-span-12"
            />
            <Reveal as="p" delay={0.1} className="max-w-[36em] text-[17px] leading-relaxed text-white/65">
              중학교 자유학기제에서 드론을 처음 잡았고, 울산 최연소로 실기평가조종자가 됐습니다.
              육군에서 드론 운영·정비병으로 복무했고, 2020년 대한민국 인재상을 받았습니다.
            </Reveal>
            <Stagger as="ul" className="mt-10 grid sm:grid-cols-3 border-t border-white/15" delay={0.15}>
              {[
                ['실기평가조종자', 'LICENSED 2022'],
                ['육군 드론 운영·정비병', 'SERVED ~2024'],
                ['대한민국 인재상', 'AWARDED 2020'],
              ].map(([a, b]) => (
                <StaggerItem as="li" key={a} className="py-5 sm:pr-4 border-b sm:border-b-0 border-white/15">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-sun">{b}</p>
                  <p className="mt-1.5 font-semibold">{a}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.3} className="mt-10">
              <Magnetic><Link to="/about" className="btn-ghost-dark">강사 이력 전체 보기 <span className="arrow">→</span></Link></Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 교육장 */}
      <section className="wrap py-20 sm:py-28">
        <Reveal as="p" className="eyebrow mb-6 flex items-center gap-3">
          <span className="text-sun">03</span><span className="h-px w-8 bg-ink/25" />Training Center
        </Reveal>
        <div className="grid lg:grid-cols-12 gap-8 lg:items-end">
          <div className="lg:col-span-8">
            <SplitText lines={['울산 울주군 범서읍', '서사별빛1로 34']} className="text-[34px] sm:text-[60px] leading-[1.1] font-bold" />
            <Reveal as="p" delay={0.25} className="mt-6 text-[17px] text-muted leading-relaxed">
              수업은 수강생마다 일정을 따로 잡습니다. 원하는 요일과 시간을 먼저 알려주세요.
            </Reveal>
          </div>
          <Reveal delay={0.3} className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3">
            <Magnetic><Link to="/location" className="btn-primary">오시는 길 <span className="arrow">→</span></Link></Magnetic>
            <Magnetic><a href={`tel:${SITE.phone}`} className="btn-ghost num">{SITE.phone}</a></Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
