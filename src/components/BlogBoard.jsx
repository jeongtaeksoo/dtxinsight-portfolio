import React, { useMemo, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import DOMPurify from 'dompurify';
import { blogPosts } from '../data/blogPosts';

const sanitizeBlogContent = (html) => DOMPurify.sanitize(html, {
  ADD_TAGS: ['video', 'source'],
  ADD_ATTR: ['controls', 'playsinline', 'preload', 'src', 'poster', 'class', 'type'],
});

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
    return (
      <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => setViewPost(null)}
          className="flex items-center gap-1 text-muted hover:text-text transition-colors self-start mb-4 text-sm font-medium"
        >
          <ChevronLeft size={16} /> 목록으로 돌아가기
        </button>

        <div className="bg-white/5 border border-border rounded-2xl p-6 overflow-y-auto custom-scrollbar flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70 mb-3">Static Blog</p>
          <h2 className="text-2xl font-bold text-text mb-2">{viewPost.title}</h2>
          <p className="text-xs text-muted mb-6">{formatDate(viewPost.createdAt)}</p>

          <div
            className="prose prose-invert max-w-none text-text/90 prose-p:leading-relaxed prose-a:text-primary prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: sanitizeBlogContent(viewPost.contentHtml) }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70 mb-2">Static Blog</p>
          <h3 className="text-2xl font-bold text-text">Repository-backed posts</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            이 블로그는 Firebase 없이 저장소의 정적 데이터로 배포됩니다. 새 글은
            `src/data/blogPosts.js`를 수정하고 재배포하면 반영됩니다.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white/5 px-6 text-center">
          <p className="text-base font-semibold text-text">아직 게시된 글이 없습니다.</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
            첫 글을 올리려면 `src/data/blogPosts.js`에 게시글 객체를 추가한 뒤 다시 배포하세요.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => {
            const preview = post.excerpt || stripHtml(post.contentHtml).slice(0, 160);

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
