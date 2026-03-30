import React, { useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
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

const BlogBoard = () => {
  const [viewPost, setViewPost] = useState(null);
  const posts = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    []
  );

  if (viewPost) {
    const keywords = viewPost.keywords || ['AI', '헬스케어', '일상'];

    return (
      <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => setViewPost(null)}
          className="flex items-center gap-1 text-muted hover:text-text transition-colors self-start mb-4 text-sm font-medium"
        >
          <ChevronLeft size={16} /> 목록으로 돌아가기
        </button>

        <div className="bg-white border border-border rounded-3xl p-6 md:p-10 overflow-y-auto custom-scrollbar flex-1 shadow-sm">
          <article className="mx-auto max-w-3xl">
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

            <h2 className="text-3xl font-bold leading-tight text-text md:text-4xl">{viewPost.title}</h2>
            <p className="mt-3 text-sm text-muted">{formatDate(viewPost.createdAt)}</p>

            {viewPost.heroImage && (
              <figure className="mt-8 mb-10">
                <img
                  src={viewPost.heroImage.src}
                  alt={viewPost.heroImage.alt}
                  loading="lazy"
                  className="w-full rounded-3xl object-cover shadow-sm"
                />
                {viewPost.heroImage.caption && (
                  <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                    {viewPost.heroImage.caption}
                  </figcaption>
                )}
              </figure>
            )}

            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(viewPost.contentHtml) }}
            />
          </article>
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
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/5 px-6 text-center">
          <p className="text-base font-semibold text-text">아직 게시된 글이 없습니다.</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            곧 첫 번째 글이 이 공간에 올라올 예정입니다.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => {
            const preview = post.excerpt || stripHtml(post.contentHtml).slice(0, 160);
            const keywords = post.keywords || ['AI', '헬스케어', '일상'];

            return (
              <button
                key={post.slug}
                type="button"
                onClick={() => setViewPost(post)}
                className="group w-full rounded-2xl border border-border bg-white/5 p-5 text-left transition-all hover:border-primary/50 hover:bg-white/10"
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
      )}
    </div>
  );
};

export default BlogBoard;
