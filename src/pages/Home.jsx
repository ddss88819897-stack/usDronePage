import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import FlightPath from '../components/FlightPath';
import SectionHead from '../components/SectionHead';
import KakaoButton from '../components/KakaoButton';
import { SplitText, MaskImage, HudCorners, Arrow } from '../components/motion';
import { EASE, PAGE_DELAY } from '../components/motion/config';
import { COURSES, SITE, won } from '../site';

const SERVICES = [
  {
    title: '드론 국가자격 과정',
    to: '/curriculum',
    cta: '과정과 교육비 보기',
    items: ['1·2·3종 조종자 정규반', '지도조종자·실기평가조종자', '육군 드론병·부사관 준비반', '부동산 항공촬영 실무반'],
  },
  {
    title: '학교·기관 출강',
    to: '/event',
    cta: '출강 안내 보기',
    items: ['초·중·고 정규·방과후 수업', '청소년 드론 진로 특강', '교육청 교원 연수', '관공서·기업 임직원 교육'],
  },
  {
    title: '축제·행사와 나비 드론 공연',
    to: '/event',
    cta: '행사 안내 보기',
    items: ['LED 나비 드론 비행 공연', '지역 축제 조종 체험 부스', '행사·홍보용 항공 촬영'],
  },
];

const CREDENTIALS = [
  ['실기평가조종자', '2022년 취득'],
  ['육군 드론 운영·정비병', '2024년 전역'],
  ['대한민국 인재상', '2020년 수상'],
];

function Hero() {
  const d = PAGE_DELAY;
  const fade = (delay) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  return (
    <section className="relative bg-navy-950 text-white overflow-hidden">
      <FlightPath delay={d + 0.3} />

      <div className="relative wrap grid lg:grid-cols-12 items-center pt-28 sm:pt-32 pb-16 lg:min-h-svh">
        <div className="lg:col-span-7">
          <SplitText
            as="h1"
            delay={d}
            lines={['드론 국가자격증,', [['울산에서 '], ['1:1', 'text-sun'], ['로 따세요']]]}
            className="text-[42px] leading-[1.12] sm:text-[64px] lg:text-[80px] font-bold"
          />

          <motion.p className="mt-7 max-w-[34em] text-[17px] sm:text-[19px] leading-relaxed text-white/80" {...fade(d + 0.3)}>
            육군 드론병 출신 실기평가조종자가 이론부터 실기 시험장까지 직접 가르칩니다.
          </motion.p>

          <motion.dl className="mt-10 grid grid-cols-3 border-y border-white/20 max-w-[580px]" {...fade(d + 0.4)}>
            {COURSES.slice(0, 3).map((c, i) => (
              <div key={c.name} className={`py-5 ${i ? 'pl-4 sm:pl-6 border-l border-white/20' : ''}`}>
                <dt className="text-[14px] font-semibold text-white/80">{c.short} 조종자</dt>
                <dd className="mt-1 text-[20px] sm:text-[28px] font-bold tracking-tight num">
                  {won(c.price / 10000)}<span className="text-[13px] sm:text-[15px] font-semibold text-white/80">만원</span>
                </dd>
                <dd className="text-[13px] text-white/70 mt-0.5 num">비행 {c.hours}시간</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div className="mt-10 flex flex-col sm:flex-row gap-3" {...fade(d + 0.5)}>
            <Link to="/curriculum" className="btn-sun">
              과정과 교육비 보기 <Arrow />
            </Link>
            <KakaoButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* 하는 일 */}
      <section className="wrap py-20 sm:py-28">
        <SectionHead
          title={['자격증 교육부터', '학교 수업, 축제 공연까지']}
          lede="교육원에서는 국가자격 과정을 운영하고, 밖에서는 학교와 기관, 지역 축제를 찾아가 드론 수업과 공연을 엽니다."
        />
        <ul className="border-t border-ink">
          {SERVICES.map((s) => (
            <li key={s.title} className="border-b border-line">
              <Link
                to={s.to}
                className="group grid gap-4 py-8 md:grid-cols-12 md:items-start md:gap-8 transition-colors hover:bg-white md:px-4 md:-mx-4"
              >
                <h3 className="md:col-span-4 text-[22px] sm:text-[26px] font-bold leading-snug">{s.title}</h3>
                <ul className="md:col-span-5 grid gap-1.5 text-[16px] text-ink/80">
                  {s.items.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <span className="md:col-span-3 md:justify-self-end inline-flex items-center gap-2 text-[15px] font-semibold text-brand">
                  <span className="link">{s.cta}</span>
                  <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 강사 */}
      <section className="bg-navy-950 text-white">
        <div className="wrap py-20 sm:py-24 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-4">
            {/* TODO: 비행·수업 중인 현장 사진이 생기면 ceo.jpg 대신 넣기 */}
            <Link to="/about" className="block max-w-[360px]">
              <MaskImage src="/img/ceo.jpg" alt="윤남걸 대표원장" from="right" className="aspect-[4/5]">
                <HudCorners />
              </MaskImage>
            </Link>
          </div>
          <div className="lg:col-span-8">
            <SectionHead dark title={['윤남걸 대표원장이', '처음부터 끝까지 가르칩니다']} className="!mb-6 lg:[&>*]:col-span-12" />
            <p className="max-w-[38em] text-[17px] leading-relaxed text-white/80">
              중학교 자유학기제에서 드론을 처음 잡았고, 울산 최연소로 실기평가조종자가 됐습니다.
              육군에서 드론 운영·정비병으로 복무했고, 2020년 대한민국 인재상을 받았습니다.
            </p>
            <ul className="mt-10 grid sm:grid-cols-3 border-t border-white/20">
              {CREDENTIALS.map(([a, b]) => (
                <li key={a} className="py-5 sm:pr-4 border-b sm:border-b-0 border-white/20">
                  <p className="font-semibold">{a}</p>
                  <p className="text-[14px] text-white/75 mt-0.5 num">{b}</p>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-ghost-dark mt-10">
              강사 이력 전체 보기 <Arrow />
            </Link>
          </div>
        </div>
      </section>

      {/* 교육장 */}
      <section className="wrap py-20 sm:py-28 grid lg:grid-cols-12 gap-8 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-[32px] sm:text-[56px] leading-[1.12] font-bold">
            울산 울주군 범서읍<br />서사별빛1로 34
          </h2>
          <p className="mt-6 text-[17px] text-muted leading-relaxed">
            수업은 수강생마다 일정을 따로 잡습니다. 원하는 요일과 시간을 먼저 알려주세요.
          </p>
        </div>
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-3">
          <Link to="/location" className="btn-primary">
            오시는 길 <Arrow />
          </Link>
          <a href={`tel:${SITE.phone}`} className="btn-ghost num">전화 {SITE.phone}</a>
        </div>
      </section>
    </>
  );
}
