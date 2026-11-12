import { SITE } from '../site';

// 사이트 전체에서 쓰는 단 하나의 상담 버튼. 문구·색을 여기서만 정합니다.
export default function KakaoButton({ className = '', label = '카카오톡 상담' }) {
  return (
    <a
      href={SITE.kakao}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-kakao ${className}`}
      aria-label={`${label} (카카오톡 채널이 새 창으로 열립니다)`}
    >
      <svg className="h-[18px] w-[18px]" viewBox="0 0 20 20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M10 2.5c-4.7 0-8.5 3-8.5 6.7 0 2.4 1.6 4.5 4 5.7l-.8 3c-.1.3.2.5.4.3l3.6-2.4c.4 0 .9.1 1.3.1 4.7 0 8.5-3 8.5-6.7S14.7 2.5 10 2.5Z"
        />
      </svg>
      {label}
    </a>
  );
}
