// 섹션 머리: 제목 + 오른쪽 설명. 제목은 처음부터 보입니다.
export default function SectionHead({ title, lede, dark = false, className = '', as: H = 'h2' }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div className={`grid gap-5 lg:grid-cols-12 lg:gap-8 mb-10 sm:mb-14 ${className}`}>
      <H className={`lg:col-span-7 text-[28px] leading-[1.25] sm:text-[40px] font-bold text-balance ${dark ? 'text-white' : ''}`}>
        {lines.map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </H>
      {lede && (
        <p className={`lg:col-span-5 lg:self-end max-w-[40em] text-[16px] sm:text-[17px] leading-relaxed ${dark ? 'text-white/75' : 'text-muted'}`}>
          {lede}
        </p>
      )}
    </div>
  );
}
