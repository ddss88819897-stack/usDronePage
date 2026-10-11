import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const getNavClass = (path, isEvent = false) => {
    const isActive = location.pathname === path;
    const baseClass = "nav-btn relative transition-colors";
    
    if (isEvent) {
      return `${baseClass} ${isActive ? 'active text-indigo-600' : 'text-indigo-700 hover:text-indigo-600'} flex items-center gap-1`;
    }
    return `${baseClass} ${isActive ? 'active text-slate-900' : 'text-slate-500 hover:text-slate-900'}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-2xl border-b border-slate-200/60 shadow-[0_2px_20px_rgba(0,0,0,0.02)] transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 h-24 flex items-center justify-between">
        <Link to="/" className="flex items-center cursor-pointer h-full py-2 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="울산드론아카데미 로고" className="h-12 sm:h-16 w-auto object-contain" />
        </Link>
        
        <nav className="hidden lg:flex items-center gap-10 font-bold text-[15px] tracking-tight">
          <Link to="/" className={getNavClass('/')}>홈</Link>
          <Link to="/about" className={getNavClass('/about')}>강사진 소개</Link>
          <Link to="/curriculum" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            드론국가자격증
            <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider">
              MAIN
            </span>
          </Link>          
          <Link to="/event" className={getNavClass('/event', true)}>
            출강·행사 기획 <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">PRO</span>
          </Link>
          <Link to="/gallery" className={getNavClass('/gallery')}>현장 갤러리</Link>
          <Link to="/location" className={getNavClass('/location')}>오시는 길</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href="tel:050714963541" className="hidden sm:flex bg-slate-900 hover:bg-indigo-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5 items-center gap-2">
            문의하기
          </a>
          <button className="lg:hidden text-slate-900 p-2">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
} 