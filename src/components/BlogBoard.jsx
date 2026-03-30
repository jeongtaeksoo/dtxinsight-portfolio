import React, { useMemo, useState } from 'react';
import { ChevronLeft, X } from 'lucide-react';
import DOMPurify from 'dompurify';
import { blogPosts } from '../data/blogPosts';

const sanitizeBlogContent = (html) => DOMPurify.sanitize(html, {
  ADD_TAGS: ['video', 'source', 'figure', 'figcaption'],
  ADD_ATTR: ['controls', 'playsinline', 'preload', 'src', 'poster', 'class', 'type', 'loading'],
});

const KEYWORD_STYLES = {
  AI: 'border-sky-200 bg-sky-50 text-sky-700',
  '헬스케어': 'border-emerald-200 bg-emerald-50 text-emerald-700',
  '일상': 'border-amber-200 bg-amber-50 text-amber-700',
};

const stripHtml = (html = '') => (
  html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
);

const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const getPostKeywords = (post) => {
  if (Array.isArray(post.keywords) && post.keywords.length > 0) {
    return post.keywords;
  }

  if (post.category) {
    return [post.category];
  }

  return ['Post'];
};

const BlogBoard = () => {
  const [viewPost, setViewPost] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const posts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    []
  );
  const latestPost = posts[0] || null;

  const openArchive = () => {
    setViewPost(null);
    setIsArchiveOpen(true);
  };

  const openPost = (post) => {
    setViewPost(post);
    setIsArchiveOpen(true);
  };

  const closeOverlay = () => {
    setViewPost(null);
    setIsArchiveOpen(false);
  };

  const renderPostDetail = (post) => {
    const keywords = getPostKeywords(post);

    return (
      <article className="mx-auto max-w-3xl">
        <button
          onClick={() => setViewPost(null)}
          className="mb-5 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-text"
        >
          <ChevronLeft size={16} /> 전체 글 목록
        </button>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Blog</p>
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${KEYWORD_STYLES[keyword] || 'border-border bg-white text-muted'}`}
            >
              {keyword}
            </span>
          ))}
        </div>

        <h2 className="text-3xl font-bold leading-tight text-text md:text-4xl">{post.title}</h2>
        <p className="mt-3 text-sm text-muted">{formatDate(post.createdAt)}</p>

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
    <div className="space-y-4">
      {posts.map((post) => {
        const preview = post.excerpt || stripHtml(post.contentHtml).slice(0, 160);
        const keywords = getPostKeywords(post);

        return (
          <button
            key={post.slug}
            type="button"
            onClick={() => openPost(post)}
            className="group w-full rounded-2xl border border-border bg-background px-5 py-5 text-left transition-all hover:border-primary/50 hover:bg-white"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-semibold text-text transition-colors group-hover:text-primary">
                  {post.title}
                </h4>
                <p className="mt-1 text-xs text-muted">{formatDate(post.createdAt)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <span
                      key={`${post.slug}-${keyword}`}
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${KEYWORD_STYLES[keyword] || 'border-border bg-white text-muted'}`}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
                {post.category || 'Post'}
              </span>
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
  );

  if (isArchiveOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/45 px-4 py-6 backdrop-blur-sm md:px-6">
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-border bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 md:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">Blog</p>
              <h3 className="mt-2 text-xl font-bold text-text md:text-2xl">
                {viewPost ? '글 보기' : '전체 글 목록'}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeOverlay}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
              aria-label="블로그 목록 닫기"
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
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70 mb-2">Blog</p>
          <h3 className="text-2xl font-bold text-text">최근 글</h3>
        </div>
        {posts.length > 0 && (
          <button
            type="button"
            onClick={openArchive}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
          >
            블로그 섹션 보기
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/5 px-6 text-center">
          <p className="text-base font-semibold text-text">아직 게시된 글이 없습니다.</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            곧 첫 번째 글이 이 공간에 올라올 예정입니다.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => openPost(latestPost)}
          className="group w-full max-w-4xl overflow-hidden rounded-[28px] border border-border bg-white text-left shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
        >
          <div className="grid md:grid-cols-[300px,1fr]">
            {latestPost.heroImage && (
              <div className="overflow-hidden bg-background">
                <img
                  src={latestPost.heroImage.src}
                  alt={latestPost.heroImage.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] aspect-[4/3] md:aspect-auto"
                />
              </div>
            )}

            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-center gap-2">
                {getPostKeywords(latestPost).map((keyword) => (
                  <span
                    key={`${latestPost.slug}-${keyword}`}
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${KEYWORD_STYLES[keyword] || 'border-border bg-white text-muted'}`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <h4 className="mt-4 text-xl font-bold leading-tight text-text transition-colors group-hover:text-primary md:text-2xl">
                {latestPost.title}
              </h4>
              <p className="mt-3 text-sm text-muted">{formatDate(latestPost.createdAt)}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
                {latestPost.excerpt || stripHtml(latestPost.contentHtml).slice(0, 150)}
              </p>
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default BlogBoard;
