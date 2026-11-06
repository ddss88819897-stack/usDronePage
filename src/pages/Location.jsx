import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PageHead from '../components/PageHead';
import { Stagger, StaggerItem, Reveal, Magnetic, HudCorners, DrawLine } from '../components/motion';
import { EASE } from '../components/motion/config';
import { SITE } from '../site';

export default function Location() {
  const address = SITE.address;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  useEffect(() => {
    const initMap = () => {
      if (!(window.kakao && window.kakao.maps)) return;
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;
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
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [address]);

  const rows = [
    ['ADDRESS', '주소', (
      <span key="a" className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {address}
        <button onClick={copy} className="relative inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.svg key="ok" width="16" height="16" viewBox="0 0 16 16" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <motion.path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, ease: EASE }} />
              </motion.svg>
            ) : (
              <motion.svg key="copy" width="16" height="16" viewBox="0 0 16 16" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <rect x="5" y="5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 10.5V4a1 1 0 011-1h6.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </motion.svg>
            )}
          </AnimatePresence>
          <span className="link">{copied ? '복사했습니다' : '주소 복사'}</span>
        </button>
      </span>
    )],
    ['PHONE', '전화', <a key="p" href={`tel:${SITE.phone}`} className="num link">{SITE.phone}</a>],
    ['CLASS', '수업', '예약제로 운영합니다. 방문 전에 연락 주세요.'],
  ];

  return (
    <>
      <PageHead no="05" en="Location" title={['울산드론아카데미', '전용 교육장']}>
        울산 울주군 범서읍에 있습니다. 실기 수업과 상담은 모두 예약 후 진행합니다.
      </PageHead>

      <section className="wrap py-16 sm:py-24 grid lg:grid-cols-12 gap-12 lg:gap-14">
        <div className="lg:col-span-5 flex flex-col">
          <Reveal as="p" className="eyebrow mb-4">Information</Reveal>
          <DrawLine className="bg-ink" />
          <Stagger as="dl" className="text-[16px]" gap={0.1}>
            {rows.map(([en, ko, val]) => (
              <StaggerItem key={en} className="grid grid-cols-[92px_1fr] gap-4 py-5 border-b border-line">
                <dt>
                  <span className="block font-mono text-[11px] tracking-[0.14em] text-muted">{en}</span>
                  <span className="text-[14px] text-muted">{ko}</span>
                </dt>
                <dd className="pt-0.5">{val}</dd>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.3} className="mt-10 flex flex-col sm:flex-row gap-3">
            <Magnetic>
              <a href={`https://map.kakao.com/link/search/${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
                카카오맵에서 길찾기 <span className="arrow">→</span>
              </a>
            </Magnetic>
            <Magnetic><a href={SITE.kakao} target="_blank" rel="noopener noreferrer" className="btn-ghost">카카오톡 상담</a></Magnetic>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            className="relative h-[380px] sm:h-[480px] lg:h-full lg:min-h-[560px] bg-line overflow-hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <div id="map" className="absolute inset-0" />
            <HudCorners className="border-navy-950/70" />
            <div className="pointer-events-none absolute left-5 top-5 z-10 bg-navy-950 text-white font-mono text-[11px] tracking-[0.14em] px-3 py-1.5">
              ULSAN DRONE ACADEMY
            </div>
          </motion.div>
        </div>
      </section>

      {/* 복사 알림 */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="fixed left-1/2 bottom-24 lg:bottom-10 z-[120] bg-navy-950 text-white text-[14px] font-medium px-5 py-3 rounded shadow-xl"
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            주소를 복사했습니다
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
