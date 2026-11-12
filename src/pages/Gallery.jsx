import { lazy, Suspense } from 'react';
import PageHead from '../components/PageHead';

// Sanity 클라이언트는 이 페이지에서만 필요하므로 따로 불러옵니다
const MediaGrid = lazy(() => import('../components/MediaGrid'));
const GridFallback = () => <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[4/3] bg-line animate-pulse" />)}</div>;

export default function Gallery() {
  return (
    <>
      <PageHead title={['수업과 행사 현장']}>
        교육장 실기 수업, 학교 출강, 축제 현장에서 찍은 사진과 영상입니다.
      </PageHead>
      <section className="wrap py-16 sm:py-24">
        <Suspense fallback={<GridFallback />}><MediaGrid type="gallery" /></Suspense>
      </section>
    </>
  );
}
