import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import SectionHead from '../components/SectionHead';
import { SplitText, MaskImage, Stagger, StaggerItem, Reveal, HudCorners, DrawLine } from '../components/motion';
import { EASE, PAGE_DELAY } from '../components/motion/config';

const LICENSES = [
  ['실기평가조종자', '2022', '최상위 실기 평가 자격'],
  ['지도조종자(교관)', '2021', '교육생 지도 자격'],
  ['1종 조종자', '2018', '25kg 초과 기체 조종'],
];

const HISTORY = [
  ['현재', '울산드론아카데미 대표'],
  ['2026', '울산 지역 재난 통신·안전 모니터링 요원 활동'],
  ['2024', '육군 드론 운영·정비병 전역'],
  ['2022', '울산마이스터고등학교 졸업'],
  ['2020', '춘천 의암댐 선박사고 실종자 수색 드론 운용'],
  ['2020', '대한민국 인재상 수상 (부총리 겸 교육부장관상)'],
  ['2018', 'KBS 울산의 유산 UCC 공모전 입상'],
  ['2017', '드론페스티벌 in 울산 금상'],
];

const LECTURES = [
  {
    group: '정부·공공기관',
    en: 'Public Sector',
    rows: [
      ['2025', '안전보건공단 드론 교육 및 특강'],
      ['2025', '충북 보은교육지원청 교직원 연수 특강'],
      ['2020', '충북교육청 자유학년제 학교 관리자 특강'],
      ['2019', '세종정부청사 교육부 진로 특강, 글로벌 인재포럼 연사'],
    ],
  },
  {
    group: '학교·방송',
    en: 'Schools & Media',
    rows: [
      ['2025–26', '울산상업고등학교·울산산업고등학교 드론 교육'],
      ['2020–21', 'EBS 「틴스피치」 강연'],
      ['2020–21', '제천 의림여중, 충북 노은중 등 학교 특강'],
    ],
  },
];

const PRESS = [
  ['AWARD', '수상', '2020 대한민국 인재상, 부총리 겸 교육부장관상 수상'],
  ['BROADCAST', '방송', 'EBS 「틴스피치」 강연자 출연 — "드론으로 바라본 세상"'],
  ['LICENSE', '자격', '울산 최연소 실기평가조종자 취득, 이어 육군 드론병 복무'],
  ['LECTURE', '강연', '교육청과 지역 학교의 드론 진로·역량강화 특강'],
];

function TimelineRow({ year, text }) {
  return (
    <motion.li
      className="relative grid grid-cols-[84px_1fr] sm:grid-cols-[110px_1fr] gap-4 py-4 pl-8 text-[16px] sm:text-[17px]"
      initial="off"
      whileInView="on"
      viewport={{ margin: '-45% 0px -45% 0px' }}
    >
      <motion.span
        className="absolute left-[-5px] top-[22px] h-[11px] w-[11px] rounded-full border-2"
        variants={{
          off: { backgroundColor: '#f4f6fa', borderColor: '#c3cad6', scale: 1 },
          on: { backgroundColor: '#f2a414', borderColor: '#f2a414', scale: 1.25 },
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="font-mono text-[14px] pt-0.5"
        variants={{ off: { color: '#5a6478' }, on: { color: '#060f24' } }}
      >
        {year}
      </motion.span>
      <motion.span variants={{ off: { opacity: 0.55, x: 0 }, on: { opacity: 1, x: 6 } }} transition={{ duration: 0.4, ease: EASE }}>
        {text}
      </motion.span>
    </motion.li>
  );
}

function History() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 55%', 'end 50%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  return (
    <div ref={ref} className="relative">
      <div className="absolute left-0 top-2 bottom-2 w-px bg-line" />
      <motion.div className="absolute left-0 top-2 bottom-2 w-px bg-sun origin-top" style={{ scaleY: fill }} />
      <ul>{HISTORY.map(([y, t], i) => <TimelineRow key={i} year={y} text={t} />)}</ul>
    </div>
  );
}

export default function About() {
  const d = PAGE_DELAY;
  return (
    <>
      {/* 첫 화면 */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        <motion.div className="absolute inset-0 grid-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: d }} />
        <div className="absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-brand/25 blur-[120px]" />
        <div className="relative wrap pt-28 sm:pt-36 pb-16 sm:pb-24 grid lg:grid-cols-12 gap-12 lg:gap-14 items-end">
          <div className="lg:col-span-5">
            <MaskImage src="/img/ceo.jpg" alt="윤남걸 대표원장" onMount priority delay={d + 0.15} className="aspect-[4/5] max-w-[460px]">
              <HudCorners />
              <motion.p
                className="absolute left-6 bottom-6 z-10 font-mono text-[11px] tracking-[0.14em] text-navy-950/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: d + 1.3 }}
              >
                CHIEF INSTRUCTOR
              </motion.p>
            </MaskImage>
          </div>
          <div className="lg:col-span-7">
            <motion.p
              className="eyebrow-dark mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: d }}
            >
              <span className="text-sun">03</span><span className="h-px w-8 bg-white/30" />Instructor
            </motion.p>
            <SplitText
              as="h1"
              mode="char"
              onMount
              delay={d + 0.1}
              lines={[[['윤남걸 '], ['대표원장', 'text-white/45 text-[0.55em] align-middle font-semibold']]]}
              className="text-[46px] sm:text-[72px] leading-[1.1] font-bold"
            />
            <motion.p
              className="mt-7 text-[20px] sm:text-[24px] leading-[1.5] font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: d + 0.5 }}
            >
              비행 기초부터 기체 설계, 실제 현장 운용까지<br className="hidden sm:block" /> 직접 해 본 것을 가르칩니다.
            </motion.p>
            <motion.div
              className="mt-6 space-y-4 text-[16px] sm:text-[17px] leading-relaxed text-white/60 max-w-[38em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: d + 0.65 }}
            >
              <p>중학교 자유학기제로 드론을 시작해 울산 최연소로 실기평가조종자 자격을 땄고, 2020년 대한민국 인재상을 받았습니다.</p>
              <p>
                춘천 의암댐 실종자 수색에 드론을 띄웠고, 지금은 울산 지역 재난 통신·안전 모니터링에 참여합니다.
                Fusion 360으로 무인기 부품을 설계하고 3D 프린터로 직접 만듭니다.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 보유 자격 */}
        <div className="relative border-t border-white/10">
          <Stagger className="wrap grid md:grid-cols-3" delay={0.1}>
            {LICENSES.map(([n, y, s], i) => (
              <StaggerItem key={n} className={`py-8 sm:py-10 ${i ? 'md:pl-8 md:border-l border-t md:border-t-0 border-white/10' : ''}`}>
                <p className="font-mono text-[11px] tracking-[0.14em] text-sun">LICENSED {y}</p>
                <p className="mt-2 text-[22px] font-bold">{n}</p>
                <p className="text-[14px] text-white/50 mt-1">{s}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 이력 + 출강 */}
      <section className="wrap py-20 sm:py-28 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-6">
          <SectionHead no="01" en="History" title={['이력과 수상']} className="!mb-10 lg:[&>div]:col-span-12" />
          <History />
        </div>
        <div className="lg:col-span-6 space-y-14">
          <SectionHead no="02" en="Lectures" title={['주요 출강']} className="!mb-0 lg:[&>div]:col-span-12" />
          {LECTURES.map((g) => (
            <div key={g.group}>
              <Reveal as="p" className="eyebrow mb-3">{g.en} — {g.group}</Reveal>
              <DrawLine className="bg-ink" />
              <Stagger as="ul" gap={0.07}>
                {g.rows.map(([y, t], i) => (
                  <StaggerItem as="li" key={i} className="grid grid-cols-[84px_1fr] sm:grid-cols-[100px_1fr] gap-4 py-4 border-b border-line text-[16px] hover:bg-white transition-colors">
                    <span className="font-mono text-[14px] text-muted pt-0.5">{y}</span>
                    <span>{t}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>

      {/* 언론 */}
      <section className="bg-white border-y border-line">
        <div className="wrap py-20 sm:py-28 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <SectionHead no="03" en="Press & Media" title={['방송과 언론에', '소개된 활동']} className="!mb-10 lg:[&>div]:col-span-12" />
            <DrawLine className="bg-ink" />
            <Stagger as="ul" gap={0.1}>
              {PRESS.map(([en, k, t]) => (
                <StaggerItem as="li" key={t} className="group grid grid-cols-[96px_1fr] sm:grid-cols-[120px_1fr] gap-4 py-5 border-b border-line text-[16px] sm:text-[17px]">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand pt-1.5">{en}<span className="block text-muted text-[12px] tracking-normal font-sans mt-0.5">{k}</span></span>
                  <span className="transition-transform duration-500 group-hover:translate-x-2">{t}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <MaskImage src="/img/class.jpg" alt="EBS 틴스피치에서 강연하는 윤남걸 원장" from="left" parallax className="aspect-[16/10]">
              <HudCorners />
            </MaskImage>
          </div>
        </div>
      </section>
    </>
  );
}
