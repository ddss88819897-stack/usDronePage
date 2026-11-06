import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { client, urlFor } from '../sanity';
import { EASE } from './motion/config';

const imgUrl = (src, w) => {
  try {
    if (!src) return '';
    const b = urlFor(src).auto('format');
    return (w ? b.width(w) : b).url();
  } catch {
    return '';
  }
};

const slide = {
  enter: (d) => ({ x: d > 0 ? 120 : -120, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d) => ({ x: d > 0 ? -120 : 120, opacity: 0 }),
};

// Sanity의 gallery / event 문서를 불러와 사진 격자 + 보기 창으로 보여줍니다.
export default function MediaGrid({ type }) {
  const [items, setItems] = useState(null);
  const [post, setPost] = useState(null);
  const [[idx, dir], setPage] = useState([0, 0]);

  useEffect(() => {
    const q = `*[_type == "${type}"] | order(publishedAt desc) { ..., "videoUrl": videoFile.asset->url }`;
    client.fetch(q).then(setItems).catch(() => setItems([]));
  }, [type]);

  const close = useCallback(() => setPost(null), []);
  const count = post?.images?.length || 0;
  const step = useCallback((d) => setPage(([i]) => [(i + d + count) % count, d]), [count]);

  useEffect(() => {
    document.body.style.overflow = post ? 'hidden' : '';
    if (!post) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight' && count > 1) step(1);
      if (e.key === 'ArrowLeft' && count > 1) step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [post, count, close, step]);

  const open = (item) => {
    if (item.videoUrl || item.images?.length) {
      setPost(item);
      setPage([0, 0]);
    }
  };

  if (items === null) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-line animate-pulse" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="py-16 text-center text-muted">등록된 게시물이 아직 없습니다.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-12">
        {items.map((item, i) => {
          const thumb = imgUrl(item.images?.[0], 900);
          return (
            <motion.button
              key={item._id}
              onClick={() => open(item)}
              data-cursor={item.videoUrl ? '재생' : '보기'}
              className="group text-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.1 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-line">
                {thumb && (
                  <img
                    src={thumb}
                    alt={item.title || ''}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                  />
                )}
                <span className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/25 transition-colors duration-500" />
                <span className="absolute left-0 bottom-0 h-[3px] w-full origin-left scale-x-0 bg-sun transition-transform duration-500 group-hover:scale-x-100" />
                {item.videoUrl && (
                  <span className="absolute left-3 top-3 bg-navy-950/85 text-white font-mono text-[11px] tracking-[0.12em] px-2 py-1 rounded">VIDEO</span>
                )}
              </div>
              <div className="mt-3.5 flex items-baseline justify-between gap-3">
                <p className="text-[15px] sm:text-[17px] font-semibold leading-snug group-hover:text-brand transition-colors">{item.title}</p>
                {!item.videoUrl && item.images?.length > 1 && (
                  <span className="font-mono shrink-0 text-[12px] text-muted">{String(item.images.length).padStart(2, '0')} P</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {post && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col bg-navy-950/97 backdrop-blur"
            onClick={close}
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className="wrap flex h-16 sm:h-20 items-center justify-between text-white"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.1, duration: 0.5, ease: EASE } }}
            >
              <p className="font-semibold truncate pr-4">{post.title}</p>
              <div className="flex items-center gap-4 shrink-0">
                {!post.videoUrl && count > 1 && (
                  <span className="font-mono text-white/60 text-[13px]">
                    {String(idx + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </span>
                )}
                <button onClick={close} className="h-10 px-4 rounded border border-white/25 hover:border-white hover:bg-white hover:text-navy-950 transition-colors text-[14px]">
                  닫기
                </button>
              </div>
            </motion.div>

            <motion.div
              className="relative flex-1 flex items-center justify-center px-4 pb-6 min-h-0 overflow-hidden"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {post.videoUrl ? (
                <video controls autoPlay className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
                  <source src={post.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.img
                    key={idx}
                    src={imgUrl(post.images[idx], 1800)}
                    alt={`${post.title} ${idx + 1}`}
                    className="max-h-full max-w-full object-contain select-none cursor-grab active:cursor-grabbing"
                    onClick={(e) => e.stopPropagation()}
                    custom={dir}
                    variants={slide}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: EASE }}
                    drag={count > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.6}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) step(1);
                      else if (info.offset.x > 80) step(-1);
                    }}
                    draggable={false}
                  />
                </AnimatePresence>
              )}
              {!post.videoUrl && count > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); step(-1); }}
                    className="absolute left-2 sm:left-6 h-12 w-12 rounded-full border border-white/20 bg-navy-950/60 hover:bg-white hover:text-navy-950 text-white text-xl transition-colors"
                    aria-label="이전 사진"
                  >←</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); step(1); }}
                    className="absolute right-2 sm:right-6 h-12 w-12 rounded-full border border-white/20 bg-navy-950/60 hover:bg-white hover:text-navy-950 text-white text-xl transition-colors"
                    aria-label="다음 사진"
                  >→</button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
