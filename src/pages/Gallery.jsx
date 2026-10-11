import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanity';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const query = '*[_type == "gallery"] | order(publishedAt desc) { ..., "videoUrl": videoFile.asset->url }';
    client.fetch(query).then((data) => {
      console.log("Fetched Gallery Data:", data); // 데이터 확인용 콘솔
      setGalleryItems(data);
    });
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

  // 안전하게 이미지 URL을 추출하는 헬퍼 함수
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
    <section className="py-24 px-4 max-w-7xl mx-auto space-y-16 text-center">
      <div className="text-center space-y-4 reveal active">
          <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50">Gallery</span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">생생한 교육 및 행사 현장</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => {
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
                    alt={item.title || '갤러리 이미지'} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="text-slate-400 font-bold text-sm">이미지 없음</div>
                )}
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                  <p className="text-white font-bold text-xl tracking-tight">{item.title}</p>
                  <p className="text-white/80 font-medium mt-2 text-sm">
                    {item.videoUrl ? '🎬 영상 재생하기' : `📸 사진 ${item.images ? item.images.length : 0}장 보기`}
                  </p>
                </div>
              </div>
            );
          })}
      </div>

      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors font-bold"
            >
              ✕
            </button>

            {selectedPost.videoUrl ? (
              <div className="relative w-full aspect-video bg-black flex items-center justify-center">
                <video 
                  controls 
                  autoPlay 
                  className="w-full h-full outline-none"
                >
                  <source src={selectedPost.videoUrl} type="video/mp4" />
                  브라우저가 영상을 지원하지 않습니다.
                </video>
              </div>
            ) : (
              <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
                {selectedPost.images && selectedPost.images[currentIndex] && (
                  <img 
                    src={getImageUrl(selectedPost.images[currentIndex])} 
                    alt={`${selectedPost.title} - ${currentIndex + 1}`} 
                    className="max-w-full max-h-[70vh] object-contain select-none" 
                  />
                )}

                {selectedPost.images && selectedPost.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage} 
                      className="absolute left-4 w-12 h-12 bg-white/20 hover:bg-white/90 hover:text-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 text-lg font-black"
                    >
                      ◀
                    </button>
                    <button 
                      onClick={nextImage} 
                      className="absolute right-4 w-12 h-12 bg-white/20 hover:bg-white/90 hover:text-black text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 text-lg font-black"
                    >
                      ▶
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {selectedPost.images && selectedPost.images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 bg-white text-center">
              <h3 className="text-2xl font-black text-slate-900">{selectedPost.title}</h3>
              {!selectedPost.videoUrl && selectedPost.images && (
                <p className="text-slate-500 mt-2 font-medium">
                  {currentIndex + 1} / {selectedPost.images.length}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
