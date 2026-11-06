import { useEffect, useState } from 'react';

export const EASE = [0.16, 1, 0.3, 1];
// 페이지 전환 커튼이 걷히는 동안 기다리는 시간
export const PAGE_DELAY = 0.55;
export const VIEW = { once: true, margin: '0px 0px -12% 0px' };

// 화면 크기·포인터 조건 (데스크탑에서만 켜는 효과용)
export function useMedia(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [match, setMatch] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
export const useDesktop = () => useMedia('(min-width: 1024px) and (pointer: fine)');

