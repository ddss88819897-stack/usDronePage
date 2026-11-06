import { Reveal, SplitText } from './motion';

// 섹션 머리: 번호 라벨 + 줄 단위로 올라오는 제목 + 오른쪽 설명
export default function SectionHead({ no, en, title, lede, dark = false, className = '' }) {
  return (
    <div className={`grid gap-5 lg:grid-cols-12 lg:gap-8 mb-12 sm:mb-16 ${className}`}>
      <div className="lg:col-span-7">
        <Reveal as="p" x={-12} y={0} className={`${dark ? 'eyebrow-dark' : 'eyebrow'} mb-5 flex items-center gap-3`}>
          <span className="text-sun">{no}</span>
          <span className={`h-px w-8 ${dark ? 'bg-white/30' : 'bg-ink/25'}`} />
          {en}
        </Reveal>
        <SplitText lines={title} className={`text-[30px] leading-[1.2] sm:text-[44px] font-bold ${dark ? 'text-white' : ''}`} />
      </div>
      {lede && (
        <Reveal delay={0.2} className={`lg:col-span-5 lg:self-end text-[16px] sm:text-[17px] leading-relaxed ${dark ? 'text-white/65' : 'text-muted'}`}>
          {lede}
        </Reveal>
      )}
    </div>
  );
}
