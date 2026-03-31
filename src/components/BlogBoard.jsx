import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, X } from 'lucide-react';
import DOMPurify from 'dompurify';
import {
  blogPosts,
  getBlogCategoryLabel,
  getLocalizedBlogPost,
  resolveBlogLocale,
} from '../data/blogPosts';

const sanitizeBlogContent = (html) => DOMPurify.sanitize(html, {
  ADD_TAGS: ['video', 'source', 'figure', 'figcaption'],
  ADD_ATTR: ['controls', 'playsinline', 'preload', 'src', 'poster', 'class', 'type', 'loading'],
});

const KEYWORD_STYLES = {
  ai: 'border-sky-200 bg-sky-50 text-sky-700',
  healthcare: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  daily: 'border-amber-200 bg-amber-50 text-amber-700',
};

const DATE_LOCALES = {
  ko: 'ko-KR',
  en: 'en-US',
  ja: 'ja-JP',
};

const stripHtml = (html = '') => (
  html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
);

const BLOG_FILTERS = ['all', 'ai', 'healthcare', 'daily'];

const formatDate = (dateString, language) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString(DATE_LOCALES[language] ?? DATE_LOCALES.ko, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getPostKeywords = (post) => {
  if (Array.isArray(post.keywords) && post.keywords.length > 0) {
    return post.keywords;
  }

  if (post.categoryLabel) {
    return [post.categoryLabel];
  }

  return ['Post'];
};

const BlogBoard = () => {
  const { t, i18n } = useTranslation();
  const [viewPostSlug, setViewPostSlug] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const previewRailRef = useRef(null);
  const language = resolveBlogLocale(i18n.resolvedLanguage || i18n.language);

  const posts = useMemo(() => (
    blogPosts.map((post) => getLocalizedBlogPost(post, language))
  ), [language]);
  const viewPost = useMemo(
    () => posts.find((post) => post.slug === viewPostSlug) ?? null,
    [posts, viewPostSlug]
  );
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return posts;
    }

    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);
  const archiveFilters = useMemo(() => (
    BLOG_FILTERS.map((category) => ({
      value: category,
      label: category === 'all'
        ? t('blogSection.filterAll')
        : getBlogCategoryLabel(category, language),
    }))
  ), [language, t]);

  const previewPosts = useMemo(() => posts.slice(0, 5), [posts]);
  const previewRailPosts = useMemo(
    () => (previewPosts.length > 1 ? [...previewPosts, ...previewPosts] : previewPosts),
    [previewPosts]
  );

  useEffect(() => {
    const rail = previewRailRef.current;

    if (!rail || previewPosts.length <= 1) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      return undefined;
    }

    let frameId;
    let isPaused = false;
    const resetPoint = () => rail.scrollWidth / 2;

    const tick = () => {
      if (!isPaused) {
        rail.scrollLeft += 0.45;

        if (rail.scrollLeft >= resetPoint()) {
          rail.scrollLeft = 0;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    const pause = () => {
      isPaused = true;
    };

    const resume = () => {
      isPaused = false;
    };

    rail.addEventListener('mouseenter', pause);
    rail.addEventListener('mouseleave', resume);
    rail.addEventListener('focusin', pause);
    rail.addEventListener('focusout', resume);

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      rail.removeEventListener('mouseenter', pause);
      rail.removeEventListener('mouseleave', resume);
      rail.removeEventListener('focusin', pause);
      rail.removeEventListener('focusout', resume);
    };
  }, [previewPosts.length]);

  const openArchive = () => {
    setViewPostSlug(null);
    setSelectedCategory('all');
    setIsArchiveOpen(true);
  };

  const openPost = (post) => {
    setViewPostSlug(post.slug);
    setIsArchiveOpen(true);
  };

  const closeOverlay = () => {
    setViewPostSlug(null);
    setSelectedCategory('all');
    setIsArchiveOpen(false);
  };

  const renderPostDetail = (post) => {
    const keywords = getPostKeywords(post);

    return (
      <article className="mx-auto max-w-3xl">
        <button
          onClick={() => setViewPostSlug(null)}
          className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-text"
        >
          <ChevronLeft size={16} /> {t('blogSection.backToList')}
        </button>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
            {t('blogSection.label')}
          </p>
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${KEYWORD_STYLES[post.category] || 'border-border bg-white text-muted'}`}
            >
              {keyword}
            </span>
          ))}
        </div>

        <h2 className="text-3xl font-bold leading-tight text-text md:text-4xl">{post.title}</h2>
        <p className="mt-3 text-sm text-muted">{formatDate(post.createdAt, language)}</p>

        {post.heroImage && (
          <figure className="mt-8 mb-10">
            <img
              src={post.heroImage.src}
              alt={post.heroImage.alt}
              loading="lazy"
              className="w-full rounded-3xl object-cover shadow-sm"
            />
            {post.heroImage.caption && (
              <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                {post.heroImage.caption}
              </figcaption>
            )}
          </figure>
        )}

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(post.contentHtml) }}
        />
      </article>
    );
  };

  const renderArchiveList = () => (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {archiveFilters.map((filter) => {
          const isActive = selectedCategory === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setSelectedCategory(filter.value)}
              className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-primary bg-primary text-white'
                  : 'border-border bg-white text-muted hover:border-primary/40 hover:text-text'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-background px-6 py-12 text-center">
          <p className="text-base font-semibold text-text">{t('blogSection.filteredEmptyTitle')}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {t('blogSection.filteredEmptyDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
        const preview = post.excerpt || stripHtml(post.contentHtml).slice(0, 160);
        const keywords = getPostKeywords(post);

        return (
          <button
            key={post.slug}
            type="button"
            onClick={() => openPost(post)}
            className="group w-full rounded-2xl border border-border bg-background px-5 py-5 text-left transition-all hover:border-primary/50 hover:bg-white"
          >
            <div className="flex flex-wrap items-start gap-3">
              <div>
                <h4 className="text-lg font-semibold text-text transition-colors group-hover:text-primary">
                  {post.title}
                </h4>
                <p className="mt-1 text-xs text-muted">{formatDate(post.createdAt, language)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <span
                      key={`${post.slug}-${keyword}`}
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${KEYWORD_STYLES[post.category] || 'border-border bg-white text-muted'}`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {preview && (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {preview}
                {stripHtml(post.contentHtml).length > preview.length ? '...' : ''}
              </p>
            )}
          </button>
        );
          })}
        </div>
      )}
    </div>
  );

  if (isArchiveOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/45 px-4 py-6 backdrop-blur-sm md:px-6">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-border bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                {t('blogSection.label')}
              </p>
              <h3 className="mt-2 text-xl font-bold text-text md:text-2xl">
                {viewPost ? t('blogSection.viewPost') : t('blogSection.allPosts')}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeOverlay}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
              aria-label={t('blogSection.closeArchive')}
            >
              <X size={18} />
            </button>
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto px-5 py-6 md:px-7 md:py-8">
            {viewPost ? renderPostDetail(viewPost) : renderArchiveList()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
            {t('blogSection.label')}
          </p>
          <h3 className="text-2xl font-bold text-text">{t('blogSection.recentPosts')}</h3>
        </div>
        {posts.length > 0 && (
          <button
            type="button"
            onClick={openArchive}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
          >
            {t('blogSection.viewSection')}
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/5 px-6 text-center">
          <p className="text-base font-semibold text-text">{t('blogSection.emptyTitle')}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            {t('blogSection.emptyDescription')}
          </p>
        </div>
      ) : (
        <div
          ref={previewRailRef}
          className="-mr-2 overflow-hidden pb-3 pr-2 blog-preview-rail"
        >
          <div className="flex min-w-max snap-x gap-4 pr-4">
            {previewRailPosts.map((post, index) => {
              const keywords = getPostKeywords(post);

              return (
                <button
                  key={`${post.slug}-${index}`}
                  type="button"
                  onClick={() => openPost(post)}
                  className="group relative aspect-square w-[208px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-border bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md sm:w-[220px] md:w-[228px]"
                  style={{ marginLeft: index === 0 ? 0 : (index % previewPosts.length) * 6 }}
                >
                  {post.heroImage && (
                    <img
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />

                  <div className="relative flex h-full flex-col justify-between p-4">
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((keyword) => (
                        <span
                          key={`${post.slug}-${keyword}`}
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${KEYWORD_STYLES[post.category] || 'border-white/40 bg-white/10 text-white'}`}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div>
                      <p className="text-xs text-white/80">{formatDate(post.createdAt, language)}</p>
                      <h4 className="mt-2 text-lg font-bold leading-snug text-white">
                        {post.title}
                      </h4>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogBoard;
