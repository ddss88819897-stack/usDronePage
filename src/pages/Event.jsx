import { lazy, Suspense } from 'react';
import PageHead from '../components/PageHead';
import SectionHead from '../components/SectionHead';

// Sanity 클라이언트는 이 페이지에서만 필요하므로 따로 불러옵니다
const MediaGrid = lazy(() => import('../components/MediaGrid'));
const GridFallback = () => <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[4/3] bg-line animate-pulse" />)}</div>;
import { MaskImage, Stagger, StaggerItem, Reveal, SplitText, Magnetic, HudCorners, DrawLine } from '../components/motion';
import { SITE } from '../site';

const BLOCKS = [
  {
    en: 'School & Public Lectures',
    title: ['학교 수업과', '기관 특강'],
    body: '학교 정규 수업과 방과후 수업, 교원 연수, 관공서 임직원 교육을 대상과 시간에 맞춰 짜서 진행합니다.',
    items: ['울산 초·중·고 정규·방과후 수업', '시·도 교육청 교원 연수', '청소년 드론 진로 체험 특강', '관공서·기업 임직원 교육'],
    img: '/img/class.jpg',
    alt: 'EBS 틴스피치 무대에서 드론을 주제로 강연하는 모습',
  },
  {
    en: 'Festivals & Drone Show',
    title: ['지역 축제와', '나비 드론 공연'],
    body: '직접 만든 나비 드론이 불빛을 켜고 날아오르는 공연과, 관람객이 드론을 조종해 보는 체험 부스를 운영합니다. 행사 홍보 영상도 하늘에서 찍어 드립니다.',
    items: ['LED 나비 드론 비행 공연', '지자체 축제 드론 조종 체험 부스', '행사·홍보용 항공 촬영과 편집'],
    img: '/img/festival.jpg',
    alt: '행사장 로비에서 날개를 편 LED 나비 드론',
  },
];

export default function Event() {
  return (
    <>
      <PageHead no="02" en="Outreach & Events" title={['학교 수업부터 축제 공연까지,', '찾아가서 엽니다']}>
        학교, 교육청, 공공기관, 지자체에서 맡겨 주신 드론 수업과 행사를 기획부터 진행까지 맡습니다.
      </PageHead>

      {BLOCKS.map((b, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={b.en} className={flip ? 'bg-white border-y border-line' : ''}>
            <div className="wrap py-20 sm:py-28 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
                <MaskImage
                  src={b.img}
                  alt={b.alt}
                  from={flip ? 'left' : 'right'}
                  parallax
                  className={flip ? 'aspect-[4/5] lg:max-h-[640px]' : 'aspect-[16/10]'}
                >
                  <HudCorners />
                </MaskImage>
              </div>
              <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
                <Reveal as="p" x={-12} y={0} className="eyebrow mb-5 flex items-center gap-3">
                  <span className="text-sun">0{i + 1}</span><span className="h-px w-8 bg-ink/25" />{b.en}
                </Reveal>
                <SplitText lines={b.title} className="text-[32px] sm:text-[46px] leading-[1.18] font-bold" />
                <Reveal as="p" delay={0.2} className="mt-6 text-[17px] leading-relaxed text-muted">{b.body}</Reveal>
                <div className="mt-8"><DrawLine className="bg-ink" delay={0.2} /></div>
                <Stagger as="ul" gap={0.08} delay={0.3}>
                  {b.items.map((t, k) => (
                    <StaggerItem as="li" key={t} className="group flex items-center gap-4 py-4 border-b border-line text-[16px]">
                      <span className="font-mono text-[12px] text-muted group-hover:text-sun transition-colors">{String(k + 1).padStart(2, '0')}</span>
                      <span className="transition-transform duration-500 group-hover:translate-x-2">{t}</span>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>
          </section>
        );
      })}

      <section className="wrap py-20 sm:py-28">
        <SectionHead no="03" en="Portfolio" title={['최근 다녀온', '행사와 출강']} lede="사진을 누르면 크게 볼 수 있습니다. 여러 장이면 넘기거나 옆으로 밀어 보세요." />
        <Suspense fallback={<GridFallback />}><MediaGrid type="event" /></Suspense>
      </section>

      <section className="relative bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute right-[-10%] top-[-30%] h-[500px] w-[500px] rounded-full bg-brand/30 blur-[120px]" />
        <div className="relative wrap py-20 sm:py-24 grid lg:grid-cols-12 gap-8 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal as="p" className="eyebrow-dark mb-5">Request — 출강·행사 문의</Reveal>
            <SplitText lines={['행사 날짜와 장소를', '알려주세요']} className="text-[32px] sm:text-[48px] leading-[1.18] font-bold" />
            <Reveal as="p" delay={0.2} className="mt-5 text-[17px] text-white/65 leading-relaxed">인원, 연령, 시간에 맞춰 수업 구성과 견적을 보내드립니다.</Reveal>
          </div>
          <Reveal delay={0.3} className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end gap-3">
            <Magnetic><a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="btn-sun">카카오톡으로 문의 <span className="arrow">→</span></a></Magnetic>
            <Magnetic><a href={`tel:${SITE.phone}`} className="btn-ghost-dark num">{SITE.phone}</a></Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
