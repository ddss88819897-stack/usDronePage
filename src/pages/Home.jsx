import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center bg-slate-50 overflow-hidden">
      <div className="video-bg-container">
        {/* 리액트에서는 소문자 autoplay 대신 autoPlay를 사용합니다 */}
        <video autoPlay loop muted playsInline><source src="/video.mp4" type="video/mp4" /></video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-white/80 to-slate-100"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-10 text-center w-full pt-20 pb-12">
        <div className="space-y-6 reveal">
          <span className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs sm:text-sm font-extrabold px-6 py-2.5 rounded-full shadow-xl">
            <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span></span>
            대한민국 인재상 수상 · 육군 드론병 출신 직강
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-slate-900">
            울산에서 가장 빠르고 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-slate-800">압도적인 교육원</span>
          </h1>
          <p className="text-lg sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium tracking-tight">
            합격률로 증명하는 1:1 실전 밀착 교육. <br className="hidden sm:block" />비행의 기초부터 실전 운용까지 가장 검증된 전문가가 안내합니다.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 reveal delay-100">
          <Link to="/curriculum" className="bg-indigo-600 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-indigo-600/20 hover:-translate-y-1 transition-all duration-300 text-lg">국가자격과정 안내</Link>
          <Link to="/event" className="bg-white border border-slate-200 text-slate-900 font-black py-4 px-10 rounded-2xl shadow-lg hover:border-indigo-600 hover:text-indigo-600 hover:-translate-y-1 transition-all duration-300 text-lg flex items-center justify-center gap-2">기관 제휴 및 출강 안내</Link>
        </div>
      </div>

      <div className="w-full relative z-10 pb-16 reveal delay-200">
        <p className="text-center text-xs font-extrabold text-slate-400 mb-4 tracking-[0.2em] uppercase">Hall of Fame : 최근 합격자 명단</p>
        <div className="marquee-wrapper py-4 shadow-sm">
            <div className="marquee-content inline-flex w-max gap-10 items-center font-bold text-slate-700 text-sm sm:text-base">
            <span className="flex items-center gap-2">🎉 김OO 수강생 <span className="text-indigo-600">1종 실기 원패스!</span></span> •
            <span className="flex items-center gap-2">🎖️ 박OO 수강생 <span className="text-slate-900">지도조종자(교관) 합격!</span></span> •
            <span className="flex items-center gap-2">🏆 최OO 수강생 <span className="text-indigo-600">실기평가사 최종 합격!</span></span> •
            <span className="flex items-center gap-2">🔥 이OO 수강생 <span className="text-slate-900">육군 드론병 합격!</span></span> •
            <span className="flex items-center gap-2">🎉 정OO 수강생 <span className="text-indigo-600">1종 실기 원패스!</span></span> •
            <span className="flex items-center gap-2">🎉 김OO 수강생 <span className="text-indigo-600">1종 실기 원패스!</span></span> •
            <span className="flex items-center gap-2">🎖️ 박OO 수강생 <span className="text-slate-900">지도조종자(교관) 합격!</span></span> •
            <span className="flex items-center gap-2">🏆 최OO 수강생 <span className="text-indigo-600">실기평가사 최종 합격!</span></span>
          </div>
        </div>
      </div>

      <div className="w-full relative z-10 px-4 pb-24 pt-10">
        <div className="text-center space-y-4 mb-16 reveal">
          <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50">Business Areas</span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">드론 교육부터 기획까지</h2>
          <p className="text-slate-500 font-medium text-lg">울산드론아카데미는 단순 학원을 넘어선 <strong className="text-indigo-600">종합 드론 에듀테크 에이전시</strong>입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          {/* Business Cards */}
          <div className="glass-card p-8 rounded-[2rem] hover:-translate-y-2 hover:border-indigo-400 transition-all duration-500 reveal group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-200 group-hover:from-indigo-400 group-hover:to-indigo-600 transition-all duration-500"></div>
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">🎓</div>
            <h3 className="text-slate-900 font-black text-xl mb-3">공공기관 및 학교 출강</h3>
            <ul className="space-y-2 text-slate-600 text-sm font-medium">
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 학교 정규 수업 및 방과후 프로그램</li>
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 초/중/고 학생 진로 체험 특강</li>
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 관공서 및 기업 임직원 역량강화 강의</li>
            </ul>
          </div>
          <div className="glass-card p-8 rounded-[2rem] hover:-translate-y-2 hover:border-indigo-400 transition-all duration-500 reveal delay-100 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-200 group-hover:from-indigo-400 group-hover:to-indigo-600 transition-all duration-500"></div>
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">🦋</div>
            <h3 className="text-slate-900 font-black text-xl mb-3">행사 기획 및 미디어</h3>
            <ul className="space-y-2 text-slate-600 text-sm font-medium">
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 시선을 사로잡는 독보적 '나비 드론 공연'</li>
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 지자체 및 지역 축제 체험 부스 운영</li>
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 고해상도 홍보용 드론 항공 촬영</li>
            </ul>
          </div>
          <div className="glass-card p-8 rounded-[2rem] hover:-translate-y-2 hover:border-indigo-400 transition-all duration-500 reveal delay-200 group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-200 group-hover:from-indigo-400 group-hover:to-indigo-600 transition-all duration-500"></div>
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">📜</div>
            <h3 className="text-slate-900 font-black text-xl mb-3">국가자격 및 특수 목적반</h3>
            <ul className="space-y-2 text-slate-600 text-sm font-medium">
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 1~3종 조종자 및 교관/실기평가사 양성</li>
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 육군 드론병 및 군 부사관 원패스반</li>
              <li className="flex items-start gap-2.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5"></div> 공인중개사 부동산 항공촬영 패키지</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}