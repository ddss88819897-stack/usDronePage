export default function Curriculum() {
    return (
      <section className="py-24 px-4 max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4 reveal">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50">License & VIP Class</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">국가자격 및 특화과정</h2>
        </div>
  
        <div className="reveal">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3"><div className="w-2 h-8 bg-slate-900 rounded-full"></div>국가자격증 정규 과정</h3>
            <div className="bg-white border border-slate-200 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-bold tracking-tight">
                        <tr><th className="p-6">자격종류</th><th className="p-6 text-center">비행시간</th><th className="p-6 text-right">교육비 (VAT 포함)</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr className="hover:bg-slate-50/80 transition-colors"><td className="p-6 font-black text-slate-900 text-lg">1종 정규반</td><td className="p-6 text-center font-bold">20시간</td><td className="p-6 text-right font-black text-slate-900 text-2xl">2,000,000<span className="text-sm font-medium text-slate-400 ml-1">원</span></td></tr>
                        <tr className="hover:bg-slate-50/80 transition-colors"><td className="p-6 font-black text-slate-700 text-lg">2종 정규반</td><td className="p-6 text-center font-bold">10시간</td><td className="p-6 text-right font-black text-slate-900 text-2xl">1,500,000<span className="text-sm font-medium text-slate-400 ml-1">원</span></td></tr>
                        <tr className="hover:bg-slate-50/80 transition-colors"><td className="p-6 font-black text-slate-700 text-lg">3종 정규반</td><td className="p-6 text-center font-bold">6시간</td><td className="p-6 text-right font-black text-slate-900 text-2xl">500,000<span className="text-sm font-medium text-slate-400 ml-1">원</span></td></tr>
                        <tr className="hover:bg-indigo-50/30 transition-colors"><td className="p-6 font-black text-indigo-700 text-lg">지도조종자(교관)</td><td className="p-6 text-center font-bold">100시간</td><td className="p-6 text-right font-black text-indigo-700 text-2xl">3,000,000<span className="text-sm font-medium text-indigo-400 ml-1">원</span></td></tr>
                        <tr className="hover:bg-indigo-50/30 transition-colors"><td className="p-6 font-black text-indigo-900 text-lg">실기평가조종사</td><td className="p-6 text-center font-bold">150시간</td><td className="p-6 text-right font-black text-indigo-900 text-2xl">5,000,000<span className="text-sm font-medium text-indigo-400 ml-1">원</span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>
  
        <div className="reveal delay-100 pt-8">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3"><div className="w-2 h-8 bg-amber-500 rounded-full"></div>VIP 실무 특화 패키지</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative overflow-hidden group hover:border-amber-400 transition-colors">
                    <span className="bg-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-lg mb-4 inline-block tracking-wider">공인중개사·개발업자 추천</span>
                    <h4 className="text-2xl font-black text-slate-900 mb-3">부동산 항공촬영 마스터</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">자격증 취득부터 토지 임장, 매물 홍보용 고퀄리티 항공 촬영 실습과 트렌디한 영상 편집 노하우를 한 번에 마스터하는 프리미엄 실무 패키지.</p>
                    <div className="pt-5 border-t border-slate-100"><p className="text-slate-900 font-black">수강료 : 맞춤 상담 후 설계</p></div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group hover:border-indigo-500 transition-colors">
                    <span className="bg-indigo-600 text-white text-xs font-black px-3 py-1.5 rounded-lg mb-4 inline-block tracking-wider">입대 예정자 필수 코스</span>
                    <h4 className="text-2xl font-black text-white mb-3">육군 드론병/부사관 원패스</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">국가자격증(1종) 취득은 기본. 군 부대 실전 전술 비행 숙달과 드론병 출신 대표의 면접 및 자대 배치 핵심 꿀팁 밀착 멘토링.</p>
                    <div className="pt-5 border-t border-slate-800"><p className="text-white font-black">수강료 : 맞춤 상담 후 설계</p></div>
                </div>
            </div>
        </div>
      </section>
    );
  }