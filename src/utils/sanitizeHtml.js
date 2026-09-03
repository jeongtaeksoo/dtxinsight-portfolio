import DOMPurify from 'dompurify';

const INLINE_SANITIZE_OPTIONS = {
  ADD_ATTR: ['class', 'target', 'rel'],
};

export const sanitizeInlineHtml = (html = '') => (
  DOMPurify.sanitize(html, INLINE_SANITIZE_OPTIONS)
);
