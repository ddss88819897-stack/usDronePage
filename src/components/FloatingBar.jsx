export default function FloatingBar() {
    return (
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 p-2.5 rounded-[1.5rem] flex gap-3 z-50 shadow-[0_20px_50px_rgba(15,23,42,0.4)] reveal delay-300 active">
        <a href="tel:050714963541" className="flex-1 bg-white hover:bg-slate-100 text-slate-900 font-black py-3.5 px-4 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base">
          📞 <span className="hidden sm:inline">전화 문의하기</span> (0507-1496-3541)
        </a>
        <a href="http://pf.kakao.com/_ZaxiFX" target="_blank" rel="noreferrer" className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black py-3.5 px-4 rounded-xl text-center transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base">
          💬 카카오톡 상담
        </a>
      </div>
    );
  }