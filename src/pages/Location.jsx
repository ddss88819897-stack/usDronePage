import { useEffect, useState } from 'react';

export default function Location() {
  // 화면 표시 및 복사될 주소, 그리고 카카오맵이 검색할 주소입니다.
  const address = "울산 울주군 범서읍 서사별빛1로 34"; 
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); 
    });
  };

  useEffect(() => {
    const initMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          
          if (container) container.innerHTML = '';
          
          // 기본 중심 좌표 (만약 주소 검색 실패 시 보여줄 임시 위치)
          const defaultPosition = new window.kakao.maps.LatLng(35.601725, 129.208365);
          
          const options = {
            center: defaultPosition,
            level: 3 
          };
          
          const map = new window.kakao.maps.Map(container, options);

          // Geocoder(주소 변환기)를 사용해 'address' 텍스트로 핀 위치를 자동으로 찾습니다.
          if (window.kakao.maps.services && window.kakao.maps.services.Geocoder) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            
            geocoder.addressSearch(address, function(result, status) {
              if (status === window.kakao.maps.services.Status.OK) {
                // 정상적으로 주소를 찾았을 때의 핀 위치 설정
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: coords
                });
                map.setCenter(coords);
              } else {
                // 카카오맵 DB에 없는 신규 주소라서 못 찾았을 경우의 안전장치
                console.error("카카오맵에서 해당 주소를 찾지 못했습니다. 절대 좌표(위도, 경도) 수동 입력이 필요합니다.");
                const marker = new window.kakao.maps.Marker({
                  map: map,
                  position: defaultPosition
                });
                map.setCenter(defaultPosition);
              }
            });
          }
        });
      }
    };

    // 이전 스크립트 충돌 방지를 위해 v3로 ID 변경 및 services 라이브러리 추가
    const scriptId = 'kakao-map-script-v3';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=2631e25567e1c8672851a975a66b1fae&autoload=false&libraries=services";
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto space-y-16">
      <div className="text-center space-y-4 reveal active">
          <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50">Location</span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">오시는 길</h2>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-8 sm:p-16 text-center reveal active">
          <h3 className="text-3xl font-black text-slate-900 mb-6">울산드론아카데미 전용 교육장</h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <p className="text-slate-600 text-lg font-medium">{address}</p>
            <button 
              onClick={handleCopyAddress}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isCopied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-sm'
              }`}
            >
              {isCopied ? '✅ 복사 완료!' : '📋 주소 복사'}
            </button>
          </div>

          <div 
            id="map" 
            className="w-full h-[400px] sm:h-[500px] bg-slate-50 rounded-2xl border border-slate-200 shadow-inner overflow-hidden relative"
          >
          </div>
      </div>
    </section>
  );
}