import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 sm:h-20">
          
          {/* 1. 좌측 로고 영역 (flex-1로 공간 차지) */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="울산드론아카데미" className="h-8 sm:h-10 object-contain" />
            </Link>
          </div>

          {/* 2. 중앙 데스크탑 메뉴 (정중앙 고정) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 font-bold text-slate-700">
            <Link to="/" className="hover:text-indigo-600 transition-colors">홈</Link>
            <Link to="/about" className="hover:text-indigo-600 transition-colors">강사진 소개</Link>
            <Link to="/curriculum" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              드론국가자격증 <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider">MAIN</span>
            </Link>
            <Link to="/event" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              출강·행사 기획 <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider">PRO</span>
            </Link>
            <Link to="/gallery" className="hover:text-indigo-600 transition-colors">현장 갤러리</Link>
            <Link to="/location" className="hover:text-indigo-600 transition-colors">오시는 길</Link>
          </nav>

          {/* 3. 우측 영역 (좌측과 똑같이 flex-1을 주어 밸런스를 맞춤) */}
          <div className="flex-1 flex justify-end">
            {/* 모바일 햄버거 버튼 */}
            <button 
              className="lg:hidden p-2 text-slate-900 focus:outline-none" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="text-2xl font-bold">{isMobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* 모바일 전용 풀스크린 메뉴 */}
      <div 
        className={`fixed inset-0 z-[90] bg-white transition-transform duration-300 ease-in-out lg:hidden flex flex-col pt-20 px-6 pb-6 overflow-y-auto ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col space-y-4 mt-4">
            <Link to="/" className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">홈</Link>
            <Link to="/about" className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">강사진 소개</Link>
            <Link to="/curriculum" className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center justify-between">
              드론국가자격증 <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">MAIN</span>
            </Link>
            <Link to="/event" className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center justify-between">
              출강·행사 기획 <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">PRO</span>
            </Link>
            <Link to="/gallery" className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">현장 갤러리</Link>
            <Link to="/location" className="text-lg font-black text-slate-900 border-b border-slate-100 pb-4">오시는 길</Link>
        </div>
      </div>
    </>
  );
}
