export default function About() {
    return (
      <section className="py-24 px-4 max-w-7xl mx-auto">
        {/* 헤더 영역 */}
        <div className="text-center space-y-4 reveal mb-16">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50">CEO Profile</span>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">대표원장 윤남걸</h2>
            <p className="text-slate-600 text-lg sm:text-xl font-bold mt-4 max-w-3xl mx-auto leading-relaxed">
                "비행의 기초부터 무인기 설계, 실전 운용까지 — 가장 검증된 전문가가 확실한 길을 안내합니다."
            </p>
        </div>
  
        {/* 프로필 상단 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
            
            {/* 좌측: 인물 요약 및 핵심 역량 */}
            <div className="lg:col-span-5 space-y-6 reveal">
                <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-[2rem] shadow-xl">
                    <div className="text-center space-y-6">
                        
                        {/* 📸 대표님 사진 영역 (UI 업그레이드 결합 완료) */}
                        <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] group border-4 border-white">
                            <img 
                                src="/ceo.jpg" 
                                alt="윤남걸 대표원장" 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                        </div>
  
                        <div>
                            <h3 className="text-3xl font-black text-slate-900">윤남걸 <span className="text-xl text-slate-500 font-bold">대표원장</span></h3>
                            <div className="mt-5 space-y-2">
                                <span className="block bg-slate-900 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-md">🏆 2020 대한민국 인재상 수상</span>
                                <span className="block bg-slate-100 text-slate-700 font-bold text-sm px-4 py-2.5 rounded-xl border border-slate-200">🎖️ 울산 최연소 실기평가사 / 육군 드론병 전역</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 추가된 역량 (자격 및 기술) */}
                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
                        <div>
                            <h4 className="text-sm font-black text-indigo-600 mb-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> CORE EXPERTISE</h4>
                            <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                                <li className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span>실기평가조종자 (최상위)</span><strong className="text-slate-900 bg-white px-2 py-1 rounded shadow-sm">2022</strong>
                                </li>
                                <li className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span>지도조종자 (교관)</span><strong className="text-slate-900 bg-white px-2 py-1 rounded shadow-sm">2021</strong>
                                </li>
                                <li className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <span>1종 조종자</span><strong className="text-slate-900 bg-white px-2 py-1 rounded shadow-sm">2018</strong>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-black text-indigo-600 mb-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div> H/W ENGINEERING</h4>
                            <p className="text-sm text-indigo-900 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 leading-relaxed font-bold">
                                무인기(UAV) 부품 3D 모델링 (Fusion 360), 파라메트릭 설계 및 3D 프린팅 운용 역량 보유
                            </p>
                        </div>
                    </div>
                </div>
            </div>
  
            {/* 우측: 상세 이력 및 스토리 */}
            <div className="lg:col-span-7 space-y-8 reveal delay-100">
                <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                    <p className="text-slate-300 text-[15px] sm:text-base leading-relaxed relative z-10 font-medium">
                        중학교 시절 자유학기제를 통해 드론에 첫발을 내디딘 후, 최연소 실기평가조종자 자격 취득과 대한민국 인재상 수상으로 국가적 역량을 인정받았습니다.<br /><br />
                        실제 재난 현장 수색(춘천 의암댐) 및 울산 지역 재난 통신·안전 모니터링 활동에 꾸준히 참여하며 드론을 활용한 사회적 가치 실현에 앞장서고 있습니다. 육군 드론 운영 및 정비병으로 복무하며 체득한 실전 작전 및 정비 노하우, 그리고 하드웨어 설계 역량까지 두루 갖춘 실무형 전문가로서 가장 체계적이고 트렌디한 교육을 약속드립니다.
                    </p>
                </div>
  
                {/* 커리어 & 수상 */}
                <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-[2.5rem] shadow-xl relative">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3"><span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> 주요 이력 및 수상</h3>
                    <div className="space-y-4 text-sm text-slate-600 font-medium border-l-2 border-slate-100 ml-2 pl-4">
                        <p className="flex items-center gap-4 relative"><span className="absolute -left-[21px] w-2.5 h-2.5 bg-indigo-600 rounded-full ring-4 ring-white"></span><strong className="text-indigo-600 w-12 shrink-0">현재</strong> 현) 울산드론아카데미 대표</p>
                        <p className="flex items-center gap-4 relative"><span className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></span><strong className="text-slate-900 w-12 shrink-0">2026</strong> 울산 지역 재난 통신 및 안전 모니터링 요원 활동</p>
                        <p className="flex items-center gap-4 relative"><span className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></span><strong className="text-slate-900 w-12 shrink-0">2024</strong> 육군 드론 운영 및 정비병 전역</p>
                        <p className="flex items-center gap-4 relative"><span className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></span><strong className="text-slate-900 w-12 shrink-0">2022</strong> 울산마이스터고등학교 졸업</p>
                        <p className="flex items-center gap-4 relative"><span className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></span><strong className="text-slate-900 w-12 shrink-0">2020</strong> 춘천 의암댐 선박사고 실종자 수색 드론 운용</p>
                        <p className="flex items-center gap-4 relative"><span className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></span><strong className="text-slate-900 w-12 shrink-0">2018</strong> KBS 울산의 유산 UCC 공모전 입상</p>
                        <p className="flex items-center gap-4 relative"><span className="absolute -left-[21px] w-2.5 h-2.5 bg-slate-300 rounded-full ring-4 ring-white"></span><strong className="text-slate-900 w-12 shrink-0">2017</strong> 드론페스티벌 in 울산 금상</p>
                    </div>
                </div>
  
                {/* 출강 및 교육 */}
                <div className="bg-white border border-slate-200 p-8 sm:p-10 rounded-[2.5rem] shadow-xl relative">
                    <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3"><span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span> 주요 출강 및 교육</h3>
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><span className="text-indigo-600 text-lg">🏛️</span> 정부 부처 및 공공·연수 기관</h4>
                            <ul className="space-y-2.5 text-sm text-slate-600 font-medium bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✔</span> 안전보건공단 드론 교육 및 특강 (2025)</li>
                                <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✔</span> 충북 보은교육지원청 교직원 연수 특강 (2025)</li>
                                <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✔</span> 충북교육청 자유학년제 학교 관리자 특강 (2020)</li>
                                <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✔</span> [교육부] 세종정부청사 진로 특강 / 글로벌 인재포럼 연사 등 (2019)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><span className="text-indigo-600 text-lg">📺</span> 정규 교육 현장 및 방송</h4>
                            <ul className="space-y-2.5 text-sm text-slate-600 font-medium bg-slate-50 p-5 rounded-2xl border border-slate-100">
                                <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✔</span> 울산상업고등학교 / 울산산업고등학교 드론 교육 (2025~2026)</li>
                                <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✔</span> EBS '틴스피치' 특강 강연 (2020~2021)</li>
                                <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✔</span> 제천 의림여중, 충북 노은중 등 다수 학교 특강 (2020~2021)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
        {/* 언론 속의 윤남걸 대표 */}
        <div className="text-center space-y-4 reveal pt-12 border-t border-slate-200">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50">Press & Media</span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">언론이 주목한 드론 전문가</h3>
            <p className="text-slate-500 text-base">각종 매체와 방송이 인정한 윤남걸 대표의 발자취를 확인하세요.</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto reveal delay-100">
            <div className="bg-white border border-slate-200 p-8 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                <span className="text-indigo-600 font-bold text-xs mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>수상 / 인물 보도</span>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition leading-snug">"'2020 대한민국 인재상' 부총리 겸 교육부장관상 수상... 미래 드론 산업 이끌 인재"</h4>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">드론 촬영 및 비행 분야에서 탁월한 성취를 이루며, 4차 산업혁명 시대를 이끌어갈 청년 인재로 공식 선정 및 수상의 영예를 안았습니다.</p>
            </div>
            <div className="bg-white border border-slate-200 p-8 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group delay-100">
                <span className="text-pink-600 font-bold text-xs mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-pink-600"></span>방송 / 강연 출연</span>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-pink-600 transition leading-snug">"EBS 교양 '틴스피치' 공식 강연자 출연, 10대 드론 전문가가 말하는 비행의 꿈"</h4>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">드론 촬영감독 및 비행 전문가로서 공영방송 EBS에 강연자로 초청되어 전국 청소년들을 대상으로 동기부여 특강을 진행했습니다.</p>
            </div>
            <div className="bg-white border border-slate-200 p-8 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group delay-200">
                <span className="text-emerald-600 font-bold text-xs mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>국방 / 전문성 보도</span>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition leading-snug">"울산 최연소 실기평가조종사 획득 이어 육군 드론병 실전 임무 완벽 수행"</h4>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">국가공인 최고위 자격인 실기평가조종사를 최연소로 취득한 것은 물론, 육군 드론병으로 복무하며 실전 전술 비행 능력까지 입증했습니다.</p>
            </div>
            <div className="bg-white border border-slate-200 p-8 rounded-[1.5rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group delay-300">
                <span className="text-amber-600 font-bold text-xs mb-3 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>공공 / 교육 소식</span>
                <h4 className="text-lg font-black text-slate-900 group-hover:text-amber-600 transition leading-snug">"교육청 및 관내 학교 '드론 진로·역량강화 특강' 명강사 초청 줄이어"</h4>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed font-medium">세종정부청사, 보은교육지원청 및 지역 다수 중고등학교에서 드론 실무와 진로를 연계한 퀄리티 높은 강연으로 호평을 받고 있습니다.</p>
            </div>
        </div>
      </section>
    );
  }
  