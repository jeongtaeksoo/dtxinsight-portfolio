import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import WindowCard from './WindowCard';
import AccessibleModal from './AccessibleModal';

const statusStyle = (status) => {
    if (status === 'Published' || status === '게재 완료' || status === '掲載完了')
        return 'bg-green-50 text-green-700 border border-green-200';
    if (status === 'Accepted' || status === '게재 확정' || status === '採択')
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (status === 'Under Review' || status === '심사 중' || status === '審査中')
        return 'bg-blue-50 text-blue-700 border border-blue-200';
    return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
};

const Publications = () => {
    const { t } = useTranslation();
    const [selectedPaper, setSelectedPaper] = useState(null);

    const publications = t('publications.items', { returnObjects: true }) || [];
    const presentations = t('publications.presentations', { returnObjects: true }) || [];
    const summaryHighlights = t('publications.summaryHighlights', { returnObjects: true }) || [];
    const summaryStatLine = t('publications.summaryStatLine');
    const publicationDialogTitleId = 'publication-dialog-title';

    return (
        <section id="publications" className="scroll-mt-28 py-16 border-t border-border">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('publications.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
                <aside className="space-y-6">
                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
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

                        <div className="mt-5 rounded-xl border border-border bg-surface px-4 py-3">
                            <p className="text-sm font-semibold leading-6 text-text">{summaryStatLine}</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
                            {t('publications.posterTitle')}
                        </h3>
                        <div className="space-y-5">
                            {presentations.map((presentation, index) => (
                                <article
                                    key={`${presentation.title}-${presentation.date}`}
                                    className={`relative pl-5 ${index !== presentations.length - 1 ? 'border-l border-border pb-5' : ''}`}
                                >
                                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
                                        {presentation.date}
                                    </p>
                                    <h4 className="mt-2 text-sm font-semibold leading-6 text-text">
                                        {presentation.title}
                                    </h4>
                                    <p className="mt-1 text-sm leading-6 text-muted">
                                        {presentation.venue}
                                    </p>
                                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                                                {presentation.format}
                                            </span>
                                            {presentation.role && (
                                                <span className="inline-flex rounded-full border border-border bg-white px-3 py-1 text-[11px] font-medium text-muted">
                                                    {presentation.role}
                                                </span>
                                            )}
                                        </div>
                                        <a
                                            href={presentation.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                                        >
                                            {t('publications.posterLinkCta')} <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </aside>

                <div>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted">
                            {t('publications.journalPapers')}
                        </h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {publications.map((pub, index) => {
                            return (
                                <WindowCard
                                    key={index}
                                    title={pub.title}
                                    type={pub.journal}
                                    date={pub.date || pub.year}
                                    authors={pub.authors}
                                    className="h-full"
                                    onClick={() => setSelectedPaper(pub)}
                                >
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusStyle(pub.status)}`}>
                                            {pub.role} · {pub.status || 'Published'}
                                        </span>
                                        {pub.doi && (
                                            <a
                                                href={pub.doi}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-accent-bg text-primary hover:bg-primary/10 transition-colors"
                                            >
                                                DOI <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </WindowCard>
                            );
                        })}
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
                closeButtonClassName="rounded-lg p-1.5 text-muted transition-colors hover:bg-gray-200"
                bodyClassName="max-h-[80vh] overflow-y-auto p-7"
                header={(
                    <span
                        id={publicationDialogTitleId}
                        className="text-xs font-semibold uppercase tracking-widest text-muted"
                    >
                        {t('publications.detailsTitle')}
                    </span>
                )}
            >
                {selectedPaper && (
                    <div className="space-y-5">
                        <div>
                            <p className="mb-2 font-mono text-xs uppercase tracking-wider text-primary">
                                {selectedPaper.journal} ({selectedPaper.date})
                            </p>
                            <h3 className="text-xl font-bold leading-snug text-text">
                                {selectedPaper.title}
                            </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(selectedPaper.status)}`}>
                                {selectedPaper.role} · {selectedPaper.status}
                            </span>
                            {selectedPaper.doi && (
                                <a
                                    href={selectedPaper.doi}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-full bg-accent-bg px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
                                >
                                    DOI <ExternalLink size={11} />
                                </a>
                            )}
                        </div>

                        <div className="h-px w-full bg-border" />

                        {selectedPaper.summary ? (
                            <div className="space-y-3">
                                <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {t('publications.coreSummary')}
                                </h4>
                                <div className="rounded-xl border border-border bg-gray-50 p-5 text-sm leading-relaxed text-text whitespace-pre-line">
                                    {selectedPaper.summary}
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
                                className="rounded-lg border border-border bg-gray-100 px-6 py-2 text-xs font-semibold text-text transition-colors hover:bg-gray-200"
                            >
                                {t('publications.closeBtn')}
                            </button>
                        </div>
                    </div>
                )}
            </AccessibleModal>
        </section>
    );
};

export default Publications;
