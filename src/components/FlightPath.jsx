import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useTransform, animate, useReducedMotion } from 'motion/react';

// 첫 화면 배경: 비행 경로가 그려지고 쿼드콥터가 그 위를 따라 날아와 제자리 비행합니다.
const POINTS = [
  [-80, 870], [260, 835], [520, 885], [770, 790], [805, 560],
  [790, 340], [960, 170], [1180, 110], [1000, 92], [800, 135],
];
const WAYPOINTS = [2, 4, 6, 8];

// Catmull-Rom → 베지어 곡선
function toPath(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}
const D = toPath(POINTS);

function Waypoint({ point, at, progress, n }) {
  const opacity = useTransform(progress, [at - 0.03, at], [0.2, 1]);
  const r = useTransform(progress, [at - 0.03, at, at + 0.06], [3, 9, 5]);
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={point[0]} cy={point[1]} r={r} fill="none" stroke="#f2a414" strokeWidth="1.5" />
      <circle cx={point[0]} cy={point[1]} r="2.5" fill="#f2a414" />
      <text x={point[0] + 14} y={point[1] - 10} fill="rgba(255,255,255,.45)" fontSize="11" fontFamily="IBM Plex Mono, monospace" letterSpacing="1.5">
        WP-{String(n).padStart(2, '0')}
      </text>
    </motion.g>
  );
}

export default function FlightPath({ delay = 0.8 }) {
  const pathRef = useRef(null);
  const droneRef = useRef(null);
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? 1 : 0);

  const place = (p) => {
    const path = pathRef.current;
    const drone = droneRef.current;
    if (!path || !drone) return;
    const L = path.getTotalLength();
    const a = path.getPointAtLength(Math.max(0, p * L - 1));
    const b = path.getPointAtLength(Math.min(L, p * L + 1));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90;
    const pt = path.getPointAtLength(p * L);
    drone.setAttribute('transform', `translate(${pt.x} ${pt.y}) rotate(${angle * (1 - Math.max(0, (p - 0.9) * 10))})`);
  };
  useMotionValueEvent(progress, 'change', place);

  useEffect(() => {
    place(progress.get());
    if (reduce) return;
    const c = animate(progress, 1, { duration: 6, ease: [0.45, 0, 0.2, 1], delay });
    return () => c.stop();
    // place는 ref만 읽으므로 의존성에서 뺍니다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, reduce, delay]);

  const n = POINTS.length - 1;

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="drone-glow">
          <stop offset="0%" stopColor="#4d7fe0" stopOpacity=".55" />
          <stop offset="100%" stopColor="#4d7fe0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* 예정 경로 (점선) */}
      <path ref={pathRef} d={D} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.2" strokeDasharray="4 8" />
      {/* 지나온 경로 */}
      <motion.path d={D} fill="none" stroke="#4d7fe0" strokeWidth="1.6" strokeOpacity=".8" style={{ pathLength: progress }} />
      {WAYPOINTS.map((wi, i) => (
        <Waypoint key={wi} point={POINTS[wi]} at={wi / n} progress={progress} n={i + 1} />
      ))}
      <g ref={droneRef}>
        <g className="hover-bob">
          <circle r="70" fill="url(#drone-glow)" />
          <g stroke="rgba(255,255,255,.85)" strokeWidth="3" strokeLinecap="round">
            <line x1="-20" y1="-20" x2="20" y2="20" />
            <line x1="20" y1="-20" x2="-20" y2="20" />
          </g>
          {[[-20, -20], [20, -20], [-20, 20], [20, 20]].map(([x, y]) => (
            <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
              <circle r="12" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
              <line className="rotor" x1="-11" y1="0" x2="11" y2="0" stroke="rgba(255,255,255,.75)" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
          <rect x="-9" y="-12" width="18" height="24" rx="5" fill="#ffffff" />
          <circle className="blink" cx="0" cy="-7" r="2.4" fill="#f2a414" />
        </g>
      </g>
    </svg>
  );
}
