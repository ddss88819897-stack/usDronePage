export default function FloatingBar() {
    return (
      <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-[80] flex flex-row gap-2 bg-slate-900 p-2.5 rounded-2xl shadow-2xl">
  
  <a href="tel:0507-1496-3541" className="flex-1 sm:flex-none flex items-center justify-center px-1 sm:px-6 py-3.5 bg-white text-slate-900 text-[11px] sm:text-sm font-black rounded-xl whitespace-nowrap transition-transform active:scale-95">
    📞 전화 <span className="hidden sm:inline ml-1">문의 </span>(0507-1496-3541)
  </a>
  
  <a href="http://pf.kakao.com/_ZaxiFX" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none flex items-center justify-center px-1 sm:px-6 py-3.5 bg-[#FEE500] text-black text-[12px] sm:text-sm font-black rounded-xl whitespace-nowrap transition-transform active:scale-95">
    💬 카카오톡 상담
  </a>

</div>
    );  
  }