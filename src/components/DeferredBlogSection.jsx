import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

const BlogBoard = lazy(() => import('./BlogBoard'));

const BlogBoardFallback = () => (
  <div aria-hidden="true" className="flex h-full flex-col">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="space-y-3">
        <div className="h-3 w-20 rounded-full bg-primary/10" />
        <div className="h-8 w-48 rounded-full bg-border" />
      </div>
      <div className="h-10 w-32 rounded-full bg-border" />
    </div>

    <div className="flex gap-4 overflow-hidden pb-3">
      {[0, 1, 2].map((cardIndex) => (
        <div
          key={cardIndex}
          className="aspect-square w-[208px] shrink-0 rounded-[28px] border border-border bg-surface sm:w-[220px] md:w-[228px]"
        />
      ))}
    </div>
  </div>
);

const DeferredBlogSection = () => {
  const supportsIntersectionObserver = typeof window !== 'undefined'
    && 'IntersectionObserver' in window;
  const sectionRef = useRef(null);
  const [hasIntersected, setHasIntersected] = useState(() => !supportsIntersectionObserver);
  const shouldLoad = hasIntersected || !supportsIntersectionObserver;

  useEffect(() => {
    if (!supportsIntersectionObserver || shouldLoad) {
      return undefined;
    }

    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad, supportsIntersectionObserver]);

  return (
    <section ref={sectionRef} id="blog" className="scroll-mt-28 py-16">
      {shouldLoad ? (
        <Suspense fallback={<BlogBoardFallback />}>
          <BlogBoard />
        </Suspense>
      ) : (
        <BlogBoardFallback />
      )}
    </section>
  );
};

export default DeferredBlogSection;
