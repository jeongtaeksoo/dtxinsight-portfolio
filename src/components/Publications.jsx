import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import AccessibleModal from './AccessibleModal';
import { sanitizeInlineHtml } from '../utils/sanitizeHtml';

const STATUS_STYLES = {
  published: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  accepted: 'border-teal-200 bg-teal-50 text-teal-700',
  review: 'border-sky-200 bg-sky-50 text-sky-700',
};

const statusStyle = (statusKey) => (
  STATUS_STYLES[statusKey] || 'border-amber-200 bg-amber-50 text-amber-700'
);

const stripMarkdownEmphasis = (text) => text.replace(/\*\*/g, '');

const renderPresentationRole = (role) => {
  const authorName = ['Taeksoo Jeong', '정택수', '鄭澤收'].find((name) => role.includes(name));
  if (!authorName) return role;

  const [before, after] = role.split(authorName);
  return (
    <>
      {before}
      <strong className="font-bold underline decoration-1 underline-offset-2">{authorName}</strong>
      {after}
    </>
  );
};

const Publications = () => {
  const { t } = useTranslation();
  const [selectedPaper, setSelectedPaper] = useState(null);

  const publications = t('publications.items', { returnObjects: true }) || [];
  const presentations = t('publications.presentations', { returnObjects: true }) || [];
  const summaryHighlights = t('publications.summaryHighlights', { returnObjects: true }) || [];
  const publicationDialogTitleId = 'publication-dialog-title';

  return (
    <section id="publications" className="scroll-mt-28 border-t border-border py-16">
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
            {t('publications.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-text md:text-4xl">
            {t('publications.title')}
          </h2>

          <div className="mt-8 border-y border-border py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {t('publications.summaryEyebrow')}
            </p>
            <ul className="mt-4 space-y-3">
              {summaryHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-semibold leading-6 text-text">
              {t('publications.summaryStatLine')}
            </p>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              {t('publications.journalPapers')}
            </h3>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {publications.map((pub) => (
              <article
                key={`${pub.journal}-${pub.title}`}
                className="grid gap-4 py-6 lg:grid-cols-[92px_minmax(0,1fr)_160px]"
              >
                <div>
                  <p className="text-sm font-semibold text-primary">{pub.date || pub.year}</p>
                  <span className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyle(pub.statusKey)}`}>
                    {pub.status}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {pub.journal}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold leading-snug text-text break-words">
                    {pub.title}
                  </h4>
                  {pub.authors ? (
                    <p
                      className="mt-3 text-xs leading-6 text-muted break-words"
                      dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(pub.authors) }}
                    />
                  ) : null}
                </div>

                <div className="flex flex-wrap items-start gap-2 lg:justify-end">
                  <span className="inline-flex rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-text">
                    {pub.role}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPaper(pub)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {t('publications.detailsCta')}
                    <ArrowUpRight size={12} />
                  </button>
                  {pub.doi ? (
                    <a
                      href={pub.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {t('publications.doiCta')}
                      <ExternalLink size={11} />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              {t('publications.posterTitle')}
            </h3>
            <div className="grid gap-px overflow-hidden border-y border-border bg-background md:grid-cols-3">
              {presentations.map((presentation) => (
                <article
                  key={`${presentation.title}-${presentation.date}`}
                  className="bg-background px-5 py-5"
                >
                  <p className="text-xs font-semibold text-primary">{presentation.date}</p>
                  <h4 className="mt-2 text-sm font-semibold leading-6 text-text">
                    {presentation.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted">{presentation.venue}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                      {presentation.format}
                    </span>
                    {presentation.role ? (
                      <span className="text-[11px] font-medium leading-5 text-muted">
                        {renderPresentationRole(presentation.role)}
                      </span>
                    ) : null}
                  </div>
                  {presentation.link ? (
                    <a
                      href={presentation.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {t('publications.posterLinkCta')}
                      <ExternalLink size={12} />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AccessibleModal
        isOpen={Boolean(selectedPaper)}
        onClose={() => setSelectedPaper(null)}
        titleId={publicationDialogTitleId}
        closeLabel={t('publications.closeBtn')}
        containerClassName="items-center justify-center p-4 md:p-10"
        overlayClassName="bg-black/50 backdrop-blur-sm"
        panelClassName="flex w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
        headerClassName="flex items-center justify-between gap-4 border-b border-border bg-gray-50 px-5 py-3"
        closeButtonClassName="rounded-lg p-1.5 text-muted transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        bodyClassName="max-h-[80vh] overflow-y-auto p-7"
        header={(
          <span
            id={publicationDialogTitleId}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-muted"
          >
            {t('publications.detailsTitle')}
          </span>
        )}
      >
        {selectedPaper ? (
          <div className="space-y-5">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {selectedPaper.journal} ({selectedPaper.date})
              </p>
              <h3 className="text-xl font-bold leading-snug text-text break-words">
                {selectedPaper.title}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle(selectedPaper.statusKey)}`}>
                {selectedPaper.role} · {selectedPaper.status}
              </span>
              {selectedPaper.doi ? (
                <a
                  href={selectedPaper.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {t('publications.doiCta')}
                  <ExternalLink size={11} />
                </a>
              ) : null}
            </div>

            <div className="h-px w-full bg-border" />

            {selectedPaper.summary ? (
              <div className="space-y-3">
                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {t('publications.coreSummary')}
                </h4>
                <div className="rounded-xl border border-border bg-gray-50 p-5 text-sm leading-relaxed text-text whitespace-pre-line">
                  {stripMarkdownEmphasis(selectedPaper.summary)}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-sm italic text-muted">
                {t('publications.summaryComingSoon')}
              </div>
            )}

            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setSelectedPaper(null)}
                className="rounded-lg border border-border bg-gray-100 px-6 py-2 text-xs font-semibold text-text transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {t('publications.closeBtn')}
              </button>
            </div>
          </div>
        ) : null}
      </AccessibleModal>
    </section>
  );
};

export default Publications;
