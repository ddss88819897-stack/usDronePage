import { useEffect, useState } from 'react';
import PageHead from '../components/PageHead';
import KakaoButton from '../components/KakaoButton';
import { HudCorners, Arrow } from '../components/motion';
import { SITE } from '../site';

const MAP_LINK = `https://map.kakao.com/link/search/${encodeURIComponent(SITE.address)}`;

export default function Location() {
  const address = SITE.address;
  const [copied, setCopied] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => {});
  };

  useEffect(() => {
    let alive = true;
    const initMap = () => {
      if (!(window.kakao && window.kakao.maps)) return;
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container || !alive) return;
        container.innerHTML = '';
        // 주소 검색이 실패할 때 쓰는 기본 위치
        const fallback = new window.kakao.maps.LatLng(35.601725, 129.208365);
        const map = new window.kakao.maps.Map(container, { center: fallback, level: 3 });
        const place = (pos) => {
          new window.kakao.maps.Marker({ map, position: pos });
          map.setCenter(pos);
        };
        if (window.kakao.maps.services?.Geocoder) {
          new window.kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) place(new window.kakao.maps.LatLng(result[0].y, result[0].x));
            else place(fallback);
          });
        } else {
          place(fallback);
        }
        setMapReady(true);
      });
    };

    const id = 'kakao-map-script-v3';
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=2631e25567e1c8672851a975a66b1fae&autoload=false&libraries=services';
      script.async = true;
      script.onload = initMap;
      // 실패하면 아래의 주소 카드가 그대로 보입니다
      script.onerror = () => {};
      document.head.appendChild(script);
    } else {
      initMap();
    }
    return () => { alive = false; };
  }, [address]);

  const rows = [
    ['주소', (
      <span key="a" className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {address}
        <button type="button" onClick={copy} className="text-[14px] font-semibold text-brand">
          <span className="link">{copied ? '복사했습니다' : '주소 복사'}</span>
        </button>
      </span>
    )],
    ['전화', <a key="p" href={`tel:${SITE.phone}`} className="num link">{SITE.phone}</a>],
    ['수업', '예약제로 운영합니다. 방문 전에 연락 주세요.'],
  ];

  return (
    <>
      <PageHead title={['울산드론아카데미', '전용 교육장']}>
        울산 울주군 범서읍에 있습니다. 실기 수업과 상담은 모두 예약 후 진행합니다.
      </PageHead>

      <section className="wrap py-16 sm:py-24 grid lg:grid-cols-12 gap-12 lg:gap-14">
        <div className="lg:col-span-5 flex flex-col">
          <dl className="border-t border-ink text-[16px]">
            {rows.map(([label, val]) => (
              <div key={label} className="grid grid-cols-[64px_1fr] gap-4 py-5 border-b border-line">
                <dt className="text-[15px] font-semibold text-muted">{label}</dt>
                <dd>{val}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
              카카오맵에서 열기 <Arrow />
            </a>
            <KakaoButton />
          </div>
          <p role="status" aria-live="polite" className="sr-only">{copied ? '주소를 복사했습니다' : ''}</p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative h-[380px] sm:h-[480px] lg:h-full lg:min-h-[560px] bg-white border border-line overflow-hidden">
            {/* 지도가 안 뜰 때도 보이는 기본 카드 */}
            {!mapReady && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <p className="text-[20px] sm:text-[24px] font-bold">{address}</p>
                <p className="text-[15px] text-muted">지도를 불러오지 못하면 카카오맵에서 바로 확인하세요.</p>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  카카오맵에서 열기 <Arrow />
                </a>
              </div>
            )}
            <div id="map" className={`absolute inset-0 ${mapReady ? '' : 'hidden'}`} />
            <HudCorners className="border-navy-950/70" />
          </div>
        </div>
      </section>
    </>
  );
}
