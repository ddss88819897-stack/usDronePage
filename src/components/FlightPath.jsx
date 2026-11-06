import { useEffect, useRef } from 'react';
import {
  motion, useMotionValue, useMotionValueEvent, useTransform, useSpring, animate, useReducedMotion,
} from 'motion/react';

// 첫 화면 배경: 비행 경로가 그려지고 쿼드콥터가 그 위를 따라 날아와 제자리 비행합니다.
// 점 사이 간격을 비슷하게 두어야 곡선이 고르게 휘어집니다. 왼쪽 글자 영역(x < 780)은 화면 아래쪽으로만 지나갑니다.
const POINTS = [
  [-120, 860], [180, 815], [470, 865], [740, 805], [900, 660],
  [1010, 480], [1180, 330], [1340, 400], [1330, 600], [1170, 690],
  [1000, 600], [990, 460], [1100, 440],
];
const WAYPOINTS = [3, 6, 8, 10];

// 비행 시간과 속도 곡선: 천천히 출발해 일정하게 날다가 천천히 멈춥니다
const DURATION = 9;
const FLIGHT_EASE = [0.42, 0, 0.58, 1];

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

const smoothstep = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function Waypoint({ point, at, progress, n }) {
  const opacity = useTransform(progress, [at - 0.05, at], [0.2, 1]);
  const r = useTransform(progress, [at - 0.05, at, at + 0.1], [3, 9, 5]);
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
  const pos = useRef({ x: POINTS[0][0], y: POINTS[0][1] });
  const reduce = useReducedMotion();
  const progress = useMotionValue(reduce ? 1 : 0);

  // 기수 방향: 목표 각도를 스프링으로 따라가서 급하게 꺾이지 않습니다
  const rawHeading = useMotionValue(0);
  const heading = useSpring(rawHeading, { stiffness: 40, damping: 16, mass: 1.2 });

  const render = () => {
    const drone = droneRef.current;
    if (!drone) return;
    drone.setAttribute('transform', `translate(${pos.current.x} ${pos.current.y}) rotate(${heading.get()})`);
  };

  const place = (p) => {
    const path = pathRef.current;
    if (!path) return;
    const L = path.getTotalLength();
    const at = p * L;
    const pt = path.getPointAtLength(at);
    pos.current = { x: pt.x, y: pt.y };

    // 앞뒤 넓은 구간으로 진행 방향을 재서 작은 굴곡에 흔들리지 않게 합니다
    const a = path.getPointAtLength(Math.max(0, at - 18));
    const b = path.getPointAtLength(Math.min(L, at + 18));
    let target = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 90;
    // 도착할 즈음 기수를 정면(0도)으로 천천히 돌립니다
    target *= 1 - smoothstep(0.86, 1, p);

    // 각도가 -180/180을 넘나들 때 한 바퀴 도는 것을 막습니다
    const cur = rawHeading.get();
    const diff = ((((target - cur) % 360) + 540) % 360) - 180;
    rawHeading.set(cur + diff);
    render();
  };

  useMotionValueEvent(progress, 'change', place);
  useMotionValueEvent(heading, 'change', render);

  useEffect(() => {
    place(progress.get());
    heading.jump(rawHeading.get());
    render();
    if (reduce) return;
    const c = animate(progress, 1, { duration: DURATION, ease: FLIGHT_EASE, delay });
    return () => c.stop();
    // place·render는 ref만 읽으므로 의존성에서 뺍니다
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
      {/* 예정 경로 (점선). 드론 위치 계산에도 씁니다 */}
      <path ref={pathRef} d={D} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.2" strokeDasharray="4 8" />
      {/* 지나온 경로 */}
      <motion.path d={D} fill="none" stroke="#4d7fe0" strokeWidth="1.6" strokeOpacity=".8" strokeLinecap="round" style={{ pathLength: progress }} />
      {WAYPOINTS.map((wi, i) => (
        <Waypoint key={wi} point={POINTS[wi]} at={wi / n} progress={progress} n={i + 1} />
      ))}
      <g ref={droneRef}>
        <g className="hover-bob">
          <g transform="scale(1.7)">
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
      </g>
    </svg>
  );
}
