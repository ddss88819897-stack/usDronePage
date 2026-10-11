import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); // 현재 경로가 바뀔 때 모바일 메뉴를 닫기 위함

  // 페이지 이동 시 열려있던 모바일 메뉴 창을 자동으로 닫아줍니다.
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // 모바일 메뉴 오픈 시 배경 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        
        {/* 로고 영역 */}
        <Link to="/" className="flex items-center gap-2">
          {/* 로고 이미지가 있다면 아래 주소를 변경하세요 */}
          <img src="/logo.png" alt="울산드론아카데미" className="h-10 object-contain" />
        </Link>

        {/* 데스크탑 메뉴 (PC에서만 보임, 모바일에선 숨김) */}
        <nav className="hidden lg:flex items-center gap-8 font-bold text-slate-700">
          <Link to="/" className="hover:text-indigo-600 transition-colors">홈</Link>
          <Link to="/about" className="hover:text-indigo-600 transition-colors">강사진 소개</Link>
          <Link to="/curriculum" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            드론국가자격증
            <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider">MAIN</span>
          </Link>
          <Link to="/event" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            출강·행사 기획
            <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider">PRO</span>
          </Link>
          <Link to="/gallery" className="hover:text-indigo-600 transition-colors">현장 갤러리</Link>
          <Link to="/location" className="hover:text-indigo-600 transition-colors">오시는 길</Link>
        </nav>

        {/* 우측 카카오톡 문의 버튼 (데스크탑 전용) */}
        <div className="hidden lg:block">
          <a 
            href="http://pf.kakao.com/_ZaxiFX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-black text-sm font-bold rounded-xl hover:bg-yellow-500 transition-colors"
          >
            💬 카카오톡 상담
          </a>
        </div>

        {/* 모바일 햄버거 메뉴 버튼 (모바일에서만 보임) */}
        <button 
          className="lg:hidden p-2 text-slate-900 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <span className="text-2xl font-bold">✕</span>
          ) : (
            <span className="text-3xl font-bold">☰</span>
          )}
        </button>
      </div>

      {/* 모바일 전체화면 메뉴 창 */}
      <div 
        className={`fixed inset-0 top-20 bg-white z-40 transition-transform duration-300 ease-in-out lg:hidden flex flex-col p-6 space-y-6 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <Link to="/" className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">홈</Link>
        <Link to="/about" className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">강사진 소개</Link>
        
        <Link to="/curriculum" className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-3">
          드론국가자격증
          <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-full">MAIN</span>
        </Link>
        
        <Link to="/event" className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-3">
          출강·행사 기획
          <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-full">PRO</span>
        </Link>
        
        <Link to="/gallery" className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">현장 갤러리</Link>
        <Link to="/location" className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">오시는 길</Link>
        
        <a 
          href="http://pf.kakao.com/_ZaxiFX" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-8 flex items-center justify-center gap-2 px-5 py-4 bg-yellow-400 text-black text-lg font-black rounded-xl"
        >
          💬 카카오톡 바로 상담하기
        </a>
      </div>
    </header>
  );
}
