import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import SectionHead from '../components/SectionHead';
import { SplitText, MaskImage, HudCorners } from '../components/motion';
import { EASE, PAGE_DELAY } from '../components/motion/config';

const LICENSES = [
  ['실기평가조종자', '2022', '실기시험을 평가하는 자격'],
  ['지도조종자(교관)', '2021', '교육생을 가르치는 자격'],
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
    rows: [
      ['2025', '안전보건공단 드론 교육 및 특강'],
      ['2025', '충북 보은교육지원청 교직원 연수 특강'],
      ['2020', '충북교육청 자유학년제 학교 관리자 특강'],
      ['2019', '세종정부청사 교육부 진로 특강, 글로벌 인재포럼 연사'],
    ],
  },
  {
    group: '학교·방송',
    rows: [
      ['2025–26', '울산상업고등학교·울산산업고등학교 드론 교육'],
      ['2020–21', 'EBS 「틴스피치」 강연'],
      ['2020–21', '제천 의림여중, 충북 노은중 등 학교 특강'],
    ],
  },
];

const PRESS = [
  ['수상', '2020 대한민국 인재상, 부총리 겸 교육부장관상 수상'],
  ['방송', 'EBS 「틴스피치」 강연자 출연 — "드론으로 바라본 세상"'],
  ['자격', '울산 최연소 실기평가조종자 취득, 이어 육군 드론병 복무'],
  ['강연', '교육청과 지역 학교의 드론 진로·역량강화 특강'],
];

function TimelineRow({ year, text }) {
  return (
    <motion.li
      className="relative grid grid-cols-[72px_1fr] sm:grid-cols-[96px_1fr] gap-4 py-4 pl-8 text-[16px] sm:text-[17px]"
      initial="off"
      whileInView="on"
      viewport={{ margin: '-45% 0px -45% 0px' }}
    >
      <motion.span
        className="absolute left-[-5px] top-[22px] h-[11px] w-[11px] rounded-full border-2"
        variants={{
          off: { backgroundColor: '#f4f6fa', borderColor: '#9aa3b2' },
          on: { backgroundColor: '#f2a414', borderColor: '#f2a414' },
        }}
        transition={{ duration: 0.3 }}
      />
      <span className="text-[15px] text-muted pt-0.5 num">{year}</span>
      <span>{text}</span>
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

function Rows({ rows, yearWidth = 'grid-cols-[72px_1fr] sm:grid-cols-[96px_1fr]' }) {
  return (
    <ul className="border-t border-ink">
      {rows.map(([y, t], i) => (
        <li key={i} className={`grid ${yearWidth} gap-4 py-4 border-b border-line text-[16px]`}>
          <span className="text-[15px] text-muted pt-0.5 num">{y}</span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  const d = PAGE_DELAY;
  return (
    <>
      {/* 첫 화면 */}
      <section className="bg-navy-950 text-white">
        <div className="wrap pt-28 sm:pt-36 pb-16 sm:pb-20 grid lg:grid-cols-12 gap-12 lg:gap-14 items-end">
          <div className="lg:col-span-4">
            {/* TODO: 비행·수업 중인 현장 사진이 생기면 ceo.jpg 대신 넣기 */}
            <MaskImage src="/img/ceo.jpg" alt="윤남걸 대표원장" onMount priority delay={d} className="aspect-[4/5] max-w-[380px]">
              <HudCorners />
            </MaskImage>
          </div>
          <div className="lg:col-span-8">
            <SplitText
              as="h1"
              delay={d}
              lines={[[['윤남걸 '], ['대표원장', 'text-white/80 text-[0.55em] align-middle font-semibold']]]}
              className="text-[44px] sm:text-[68px] leading-[1.1] font-bold"
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: EASE, delay: d + 0.3 }}>
              <p className="mt-6 text-[20px] sm:text-[23px] leading-[1.5] font-medium text-balance">
                비행 기초부터 기체 설계, 실제 현장 운용까지 직접 해 본 것을 가르칩니다.
              </p>
              <div className="mt-6 space-y-4 text-[16px] sm:text-[17px] leading-relaxed text-white/80 max-w-[38em]">
                <p>중학교 자유학기제로 드론을 시작해 울산 최연소로 실기평가조종자 자격을 땄고, 2020년 대한민국 인재상을 받았습니다.</p>
                <p>
                  춘천 의암댐 실종자 수색에 드론을 띄웠고, 지금은 울산 지역 재난 통신·안전 모니터링에 참여합니다.
                  Fusion 360으로 무인기 부품을 설계하고 3D 프린터로 직접 만듭니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 보유 자격 */}
        <div className="border-t border-white/15">
          <ul className="wrap grid md:grid-cols-3">
            {LICENSES.map(([n, y, s], i) => (
              <li key={n} className={`py-8 ${i ? 'md:pl-8 md:border-l border-t md:border-t-0 border-white/15' : ''}`}>
                <p className="text-[21px] font-bold">{n}</p>
                <p className="text-[15px] text-white/75 mt-1 num">{y}년 취득 · {s}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 이력 + 출강 */}
      <section className="wrap py-20 sm:py-24 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-6">
          <SectionHead title="이력과 수상" className="!mb-8 lg:[&>*]:col-span-12" />
          <History />
        </div>
        <div className="lg:col-span-6">
          <SectionHead title="주요 출강" className="!mb-8 lg:[&>*]:col-span-12" />
          <div className="space-y-12">
            {LECTURES.map((g) => (
              <div key={g.group}>
                <h3 className="text-[17px] font-bold mb-3">{g.group}</h3>
                <Rows rows={g.rows} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 언론 */}
      <section className="bg-white border-y border-line">
        <div className="wrap py-20 sm:py-24 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <SectionHead title={['방송과 언론에', '소개된 활동']} className="!mb-8 lg:[&>*]:col-span-12" />
            <Rows rows={PRESS} yearWidth="grid-cols-[56px_1fr] sm:grid-cols-[72px_1fr]" />
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
