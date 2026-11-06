import { useEffect, useRef } from 'react';
import {
  motion, useMotionValue, useMotionValueEvent, useTransform, useSpring, animate, useReducedMotion,
} from 'motion/react';

// 첫 화면 배경: 비행 경로가 그려지고 쿼드콥터가 그 위를 따라 날아와 제자리 비행합니다.
// 경로는 기하학적으로 정확한 도형으로만 이루어집니다.
//   1) 왼쪽 아래에서 들어오는 3차 베지어 곡선 하나 (글자 영역 아래로 지나감)
//   2) 오른쪽 빈 공간에서 위로 올라가는 S자: 반지름 R인 반원 두 개를 방향을 바꿔 이어 붙임
//      (아래 반원은 오른쪽으로, 위 반원은 왼쪽으로 불룩). 접선이 이어지고 선이 서로 겹치지 않습니다.
const R = 125;
const A = [1110, 730]; // S자 시작점. 베지어가 수평(오른쪽)으로 도착해 반원의 접선과 맞물립니다
const START = [-120, 820];
const CTRL1 = [440, 880];
const CTRL2 = [860, A[1]];
const ENTRY = A;

const P = (dx, dy) => `${A[0] + dx},${A[1] + dy}`;
const ccw = (to) => ` A${R},${R} 0 0 0 ${to}`; // 화면 기준 반시계 사분원
const cw = (to) => ` A${R},${R} 0 0 1 ${to}`; // 화면 기준 시계 사분원
const D =
  `M${START} C${CTRL1} ${CTRL2} ${ENTRY}` +
  ccw(P(R, -R)) + ccw(P(0, -2 * R)) + // 아래 반원: 오른쪽으로 돌아 위로
  cw(P(-R, -3 * R)) + cw(P(0, -4 * R)); // 위 반원: 왼쪽으로 돌아 꼭대기에서 정지

// 진입 곡선 길이(수치 적분)와 사분원 길이로 각 지점의 진행률을 정확히 계산합니다
const bez = (t, i) =>
  (1 - t) ** 3 * START[i] + 3 * (1 - t) ** 2 * t * CTRL1[i] + 3 * (1 - t) * t ** 2 * CTRL2[i] + t ** 3 * ENTRY[i];
let ENTRY_LEN = 0;
for (let k = 1; k <= 400; k++) {
  const t0 = (k - 1) / 400;
  const t1 = k / 400;
  ENTRY_LEN += Math.hypot(bez(t1, 0) - bez(t0, 0), bez(t1, 1) - bez(t0, 1));
}
const QUARTER = (Math.PI * R) / 2;
const TOTAL = ENTRY_LEN + 4 * QUARTER;
const WAYPOINTS = [
  [A[0], A[1]], [A[0] + R, A[1] - R], [A[0], A[1] - 2 * R], [A[0] - R, A[1] - 3 * R],
].map((point, k) => ({ point, at: (ENTRY_LEN + k * QUARTER) / TOTAL }));

// 비행 시간과 속도 곡선: 천천히 출발해 일정하게 날다가 천천히 멈춥니다
const DURATION = 8;
const FLIGHT_EASE = [0.42, 0, 0.58, 1];

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
  const pos = useRef({ x: START[0], y: START[1] });
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
    // -180~180도로 맞춘 뒤, 도착할 즈음 기수를 정면(0도)으로 가까운 쪽으로 천천히 돌립니다
    target = ((((target + 180) % 360) + 360) % 360) - 180;
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
      {WAYPOINTS.map((w, i) => (
        <Waypoint key={i} point={w.point} at={w.at} progress={progress} n={i + 1} />
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
