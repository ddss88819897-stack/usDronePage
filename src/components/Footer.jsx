import { Link } from 'react-router-dom';
import { NAV, SITE } from '../site';
import KakaoButton from './KakaoButton';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/75">
      {/* 마무리 상담 띠 */}
      <div className="wrap pt-20 sm:pt-24 pb-14 grid lg:grid-cols-12 gap-8 lg:items-end">
        <h2 className="lg:col-span-8 text-white text-[28px] sm:text-[44px] leading-[1.2] font-bold text-balance">
          자격 취득부터 기관 교육까지,<br />상담은 원장이 직접 받습니다.
        </h2>
        <div className="lg:col-span-4 flex flex-col sm:flex-row lg:justify-end gap-2.5">
          <KakaoButton />
          <a href={`tel:${SITE.phone}`} className="btn-ghost-dark num">전화 {SITE.phone}</a>
        </div>
      </div>

      <div className="wrap border-t border-white/15 py-12 grid gap-10 md:grid-cols-12 text-[15px] leading-relaxed">
        <div className="md:col-span-5">
          <p className="text-white font-semibold mb-2">{SITE.name}</p>
          <p>{SITE.address}</p>
          <p>전화 <a href={`tel:${SITE.phone}`} className="link text-white num">{SITE.phone}</a></p>
        </div>
        <div className="md:col-span-4">
          <p className="text-white font-semibold mb-2">하는 일</p>
          <p>1·2·3종 조종자, 지도조종자, 실기평가조종자 과정</p>
          <p>학교·기관 출강, 나비 드론 공연, 항공 촬영</p>
        </div>
        <nav className="md:col-span-3" aria-label="바닥글 메뉴">
          <p className="text-white font-semibold mb-2">메뉴</p>
          <div className="grid grid-cols-2 gap-y-1.5">
            {NAV.map((n) => <Link key={n.to} to={n.to} className="link w-fit hover:text-white">{n.label}</Link>)}
          </div>
        </nav>
      </div>

      <div className="wrap border-t border-white/10 py-6 text-[13px] text-white/65">
        © {YEAR} {SITE.name}
      </div>
    </footer>
  );
}
