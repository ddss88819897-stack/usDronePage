import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanity';

export default function Event() {
  const [eventItems, setEventItems] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const query = '*[_type == "event"] | order(publishedAt desc) { ..., "videoUrl": videoFile.asset->url }';
    client.fetch(query).then((data) => setEventItems(data));
  }, []);

  const openModal = (item) => {
    if (item.videoUrl || (item.images && item.images.length > 0)) {
      setSelectedPost(item);
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      alert("등록된 미디어가 없습니다.");
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'auto';
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? selectedPost.images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === selectedPost.images.length - 1 ? 0 : prev + 1));
  };

  const getImageUrl = (imageSource) => {
    try {
      if (!imageSource) return '';
      return urlFor(imageSource).url();
    } catch (e) {
      console.error("Image URL resolve error:", e);
      return '';
    }
  };

  return (
    <>
      {/* 1. 상열님이 만드신 원본 메인 배너 영역 (유지) */}
      <section className="relative bg-slate-950 text-white py-28 px-4 overflow-hidden rounded-b-[3rem] sm:rounded-b-[5rem] shadow-2xl mx-2 sm:mx-4 mt-2">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 reveal active">
              <span className="inline-block border border-indigo-500/50 text-indigo-400 font-bold px-5 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase bg-indigo-500/10 backdrop-blur-md">Premium Solutions</span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight drop-shadow-lg">
                  학교 수업부터 지자체 축제까지,<br />드론의 모든 것을 기획합니다.
              </h2>
              <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto mt-4">
                  단순 교육을 넘어 행사 기획, 미디어 촬영, 진로 특강까지. 울산드론아카데미는 관공서와 기업이 믿고 맡기는 전문 에이전시입니다.
              </p>
          </div>
      </section>

      {/* 2. 상열님이 만드신 상세 설명 영역 (유지) */}
      <section className="py-24 px-4 max-w-6xl mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal active">
              <div className="space-y-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 text-2xl shadow-sm">🎓</div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">학교 정규수업 및 관공서 특강</h3>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">검증된 이력의 전문 강사진이 학교 방과후 수업, 정규 교과, 관공서 임직원 역량 강화 교육을 설계하고 진행합니다.</p>
                  <ul className="space-y-3 font-bold text-slate-800 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> 울산 관내 초·중·고 정규/방과후 수업 출강</li>
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> 시·도 교육청 및 교원 연수 프로그램 진행</li>
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> 청소년 맞춤형 드론 진로 체험 특강</li>
                  </ul>
              </div>
              {/* 차후 고정 이미지를 넣으실 곳 */}
              <div className="h-80 bg-slate-100 rounded-[2rem] border border-slate-200 flex items-center justify-center shadow-inner relative overflow-hidden group">
                {/* src="/class.jpg" 부분에 public 폴더에 넣은 사진 이름을 정확히 적어주세요 */}
                <img 
                    src="/class.jpg" 
                    alt="학교 정규수업 및 관공서 특강" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal active delay-100 flex-col-reverse lg:flex-row-reverse">
              <div className="space-y-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 text-2xl shadow-sm">🦋</div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">지역 축제 기획 & 나비 드론 공연</h3>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">축제와 행사의 품격을 높이는 다채로운 드론 이벤트를 기획합니다. 시선을 사로잡는 나비 드론 공연은 행사의 하이라이트입니다.</p>
                  <ul className="space-y-3 font-bold text-slate-800 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> 자체 기획 '나비 드론' 비행 퍼포먼스</li>
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> 지자체 축제 드론 비행 조종 체험 부스 운영</li>
                      <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-indigo-600"></div> 고해상도 홍보용 드론 항공 촬영 및 미디어 제작</li>
                  </ul>
              </div>
              {/* 차후 고정 이미지를 넣으실 곳 */}
              <div className="h-80 bg-slate-100 rounded-[2rem] border border-slate-200 flex items-center justify-center shadow-inner relative overflow-hidden group">
                {/* src="/festival.jpg" 부분에 public 폴더에 넣은 사진 이름을 정확히 적어주세요 */}
                <img 
                    src="/festival.jpg" 
                    alt="지역 축제 기획 및 나비 드론 공연" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>

          </div>
      </section>

      {/* 3. Sanity에서 불러오는 동적 포트폴리오 (추가 영역) */}
      <section className="pb-32 px-4 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 reveal active">
            <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50">Portfolio</span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">최근 진행한 행사 및 출강</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventItems.map((item) => {
              const thumbnail = item.images && item.images.length > 0 ? getImageUrl(item.images[0]) : '';
              
              return (
                <div 
                  key={item._id} 
                  onClick={() => openModal(item)} 
                  className="reveal active h-72 rounded-[2rem] bg-slate-100 border border-slate-200 flex flex-col items-center justify-center overflow-hidden shadow-sm hover:shadow-lg transition-all relative group cursor-pointer"
                >
                  {thumbnail ? (
                    <img 
                      src={thumbnail} 
                      alt={item.title || '행사 이미지'} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="text-slate-400 font-bold text-sm">이미지 없음</div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <span className="bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full mb-3">PROJECT</span>
                    <p className="text-white font-bold text-xl tracking-tight break-keep text-center">{item.title}</p>
                    <p className="text-white/80 font-medium mt-2 text-sm">
                      {item.videoUrl ? '🎬 영상 재생하기' : `📸 포트폴리오 ${item.images ? item.images.length : 0}장`}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* 4. 사진/영상 클릭 시 뜨는 팝업 모달창 (유지) */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={closeModal}>
          <div className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors font-bold">✕</button>

            {selectedPost.videoUrl ? (
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video controls autoPlay className="w-full h-full outline-none">
                  <source src={selectedPost.videoUrl} type="video/mp4" />
                </video>
              </div>
            ) : (
              <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
                {selectedPost.images && selectedPost.images[currentIndex] && (
                  <img src={getImageUrl(selectedPost.images[currentIndex])} alt="행사 사진" className="max-w-full max-h-[70vh] object-contain select-none" />
                )}
                {selectedPost.images && selectedPost.images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/90 hover:text-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 text-lg font-black">◀</button>
                    <button onClick={nextImage} className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/90 hover:text-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 text-lg font-black">▶</button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedPost.images && selectedPost.images.map((_, idx) => (
                    <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40'}`} />
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 bg-white text-center">
              <h3 className="text-2xl font-black text-slate-900">{selectedPost.title}</h3>
              {!selectedPost.videoUrl && selectedPost.images && (
                <p className="text-slate-500 mt-2 font-medium">{currentIndex + 1} / {selectedPost.images.length}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
