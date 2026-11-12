import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import PageHead from '../components/PageHead';
import SectionHead from '../components/SectionHead';
import KakaoButton from '../components/KakaoButton';
import { Arrow } from '../components/motion';
import { COURSES, FAQ, SITE, won } from '../site';

const PACKAGES = [
  {
    for: '공인중개사·개발업자',
    title: '부동산 항공촬영 실무반',
    body: '자격증 취득과 함께 토지 임장, 매물 홍보용 항공 촬영, 짧은 홍보 영상 편집까지 실습합니다.',
  },
  {
    for: '입대 예정자',
    title: '육군 드론병·부사관 준비반',
    body: '1종 자격 취득에 더해 부대에서 쓰는 비행 방식을 연습하고, 드론병 출신 원장이 면접과 복무를 미리 알려드립니다.',
  },
];

// 자격 단계: 1종 → 지도조종자 → 실기평가조종자
const PATH = [COURSES[0], COURSES[3], COURSES[4]];

function CourseRow({ c }) {
  return (
    <li className="group grid gap-y-3 gap-x-8 py-7 sm:py-8 border-b border-line md:grid-cols-12 md:items-center">
      <div className="md:col-span-5">
        <h3 className="text-[20px] sm:text-[24px] font-bold tracking-tight">{c.name}</h3>
        <p className="mt-1 text-[15px] sm:text-[16px] text-ink/80">{c.use}</p>
        <p className="mt-0.5 text-[14px] text-muted">{c.note}</p>
        {(c.includes || c.period) && (
          <p className="mt-2 text-[14px] text-muted">
            {[c.period && `기간 ${c.period}`, c.includes && `포함 ${c.includes}`].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
      <p className="md:col-span-2 text-[15px] sm:text-[16px] num">
        <span className="text-muted md:hidden">비행 교육 </span>{c.hours}시간
      </p>
      <p className="md:col-span-3 md:text-right text-[24px] sm:text-[30px] font-bold tracking-tight num">
        {won(c.price)}<span className="ml-1 text-[15px] font-medium text-muted">원</span>
      </p>
      <div className="md:col-span-2 md:text-right">
        <a
          href={SITE.kakao}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:text-ink transition-colors"
          aria-label={`${c.name} 상담 (카카오톡 채널이 새 창으로 열립니다)`}
        >
          <span className="link">이 과정 상담</span>
          <Arrow />
        </a>
      </div>
    </li>
  );
}

function CareerPath() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });

  return (
    <section ref={ref} className="bg-navy-950 text-white">
      <div className="wrap py-20 sm:py-24">
        <SectionHead
          dark
          title={['1종에서 실기평가조종자까지', '단계별로 올라갑니다']}
          lede="지도조종자는 1종 자격과 비행경력 100시간을, 실기평가조종자는 지도조종자 자격과 비행경력 150시간을 먼저 갖춰야 합니다. 한 곳에서 다음 단계까지 이어서 준비할 수 있습니다."
        />
        <ol className="relative grid md:grid-cols-3 gap-10 md:gap-6">
          {/* 진행선 */}
          <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/20 md:left-3 md:right-3 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
          <motion.div className="absolute left-[11px] top-3 bottom-3 w-px bg-sun origin-top md:hidden" style={{ scaleY: fill }} />
          <motion.div className="hidden md:block absolute left-3 right-3 top-[11px] h-px bg-sun origin-left" style={{ scaleX: fill }} />
          {PATH.map((c, i) => (
            <Step key={c.name} c={c} i={i} at={i / (PATH.length - 1)} progress={fill} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ c, i, at, progress }) {
  const lit = useTransform(progress, [Math.max(0, at - 0.05), at], [0, 1]);
  const bg = useTransform(lit, [0, 1], ['#060f24', '#f2a414']);
  const border = useTransform(lit, [0, 1], ['rgba(255,255,255,.45)', '#f2a414']);
  return (
    <li className="relative pl-12 md:pl-0 md:pt-12">
      <motion.span className="absolute left-0 top-0 h-6 w-6 rounded-full border-2" style={{ backgroundColor: bg, borderColor: border }} />
      <p className="text-[14px] font-semibold text-sun">{i + 1}단계</p>
      <h3 className="mt-1 text-[22px] sm:text-[26px] font-bold">{c.name}</h3>
      <p className="mt-2 text-[15px] text-white/75">{c.note}</p>
      <p className="mt-4 text-[15px] text-white/90 num">비행 교육 {c.hours}시간 · {won(c.price / 10000)}만원</p>
    </li>
  );
}

export default function Curriculum() {
  const faq = FAQ.filter((f) => f.a);
  return (
    <>
      <PageHead title={['드론 국가자격 과정과', '교육비']}>
        모든 과정은 원장이 1:1로 가르칩니다. 교육비는 부가세를 포함한 금액입니다. 어떤 종이 필요한지는 쓰려는 기체의 무게로 정해집니다.
      </PageHead>

      <section className="wrap py-16 sm:py-24">
        <SectionHead title="정규 과정 교육비" lede="과정 이름 아래에 어떤 기체·일에 필요한 자격인지 적어 두었습니다. 잘 모르겠으면 하려는 일을 알려주세요." />
        <div className="hidden md:grid grid-cols-12 gap-x-8 pb-3 border-b border-ink text-[14px] font-semibold text-muted">
          <span className="col-span-5">과정</span>
          <span className="col-span-2">비행 교육</span>
          <span className="col-span-3 text-right">교육비 (부가세 포함)</span>
          <span className="col-span-2" />
        </div>
        <ul className="border-t border-ink md:border-t-0">
          {COURSES.map((c) => <CourseRow key={c.name} c={c} />)}
        </ul>
      </section>

      <CareerPath />

      <section className="wrap py-20 sm:py-24">
        <SectionHead
          title="목적에 맞춘 실무 과정"
          lede="자격증 이후에 할 일이 정해져 있다면, 그 일에 맞춰 수업을 짭니다. 교육비는 상담 후 정합니다."
        />
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {PACKAGES.map((p, i) => (
            <article
              key={p.title}
              className={`flex flex-col p-8 sm:p-10 border ${i === 1 ? 'bg-navy-950 text-white border-navy-950' : 'bg-white border-line'}`}
            >
              <p className={`text-[14px] font-semibold ${i === 1 ? 'text-sun' : 'text-brand'}`}>{p.for} 추천</p>
              <h3 className="mt-2 text-[24px] sm:text-[30px] font-bold leading-snug">{p.title}</h3>
              <p className={`mt-4 text-[16px] leading-relaxed ${i === 1 ? 'text-white/80' : 'text-muted'}`}>{p.body}</p>
              <div className="mt-auto pt-8">
                <KakaoButton label="이 과정 상담" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-line">
        <div className="wrap py-20 sm:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-[28px] sm:text-[40px] leading-[1.25] font-bold">자주 묻는 질문</h2>
            <p className="mt-4 text-[16px] text-muted leading-relaxed">여기에 없는 내용은 카카오톡으로 물어보세요. 원장이 직접 답합니다.</p>
            <KakaoButton className="mt-6" />
          </div>
          <div className="lg:col-span-8 border-t border-ink">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[17px] sm:text-[18px] font-semibold">
                  <span>{f.q}</span>
                  <svg className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </summary>
                <p className="pb-6 pr-10 text-[16px] leading-relaxed text-ink/80 max-w-[60ch]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
