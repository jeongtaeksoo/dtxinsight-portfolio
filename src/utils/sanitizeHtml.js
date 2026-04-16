import DOMPurify from 'dompurify';

const INLINE_SANITIZE_OPTIONS = {
  ADD_ATTR: ['class', 'target', 'rel'],
};

const BLOG_CONTENT_SANITIZE_OPTIONS = {
  ADD_TAGS: ['video', 'source', 'figure', 'figcaption'],
  ADD_ATTR: ['class', 'controls', 'loading', 'playsinline', 'poster', 'preload', 'rel', 'src', 'target', 'type'],
};

export const sanitizeInlineHtml = (html = '') => (
  DOMPurify.sanitize(html, INLINE_SANITIZE_OPTIONS)
);

export const sanitizeBlogContent = (html = '') => (
  DOMPurify.sanitize(html, BLOG_CONTENT_SANITIZE_OPTIONS)
);
