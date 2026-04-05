import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, X } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import WindowCard from './WindowCard';

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
                                        <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                                            {presentation.format}
                                        </span>
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
                        {publications.map((pub, index) => (
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
                        ))}
                    </div>
                </div>
            </div>

            {/* Paper Details Modal */}
            <AnimatePresence>
                {selectedPaper && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                        <Motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPaper(null)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
                        />
                        <Motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative z-10 w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="h-12 bg-gray-50 flex items-center justify-between px-5 border-b border-border">
                                <span className="text-xs font-semibold text-muted uppercase tracking-widest">{t('publications.detailsTitle')}</span>
                                <button
                                    onClick={() => setSelectedPaper(null)}
                                    className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                                    aria-label={t('publications.closeBtn')}
                                >
                                    <X size={16} className="text-muted" />
                                </button>
                            </div>

                            <div className="p-7 overflow-y-auto max-h-[80vh]">
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
                                            {selectedPaper.journal} ({selectedPaper.date})
                                        </p>
                                        <h3 className="text-xl font-bold text-text leading-snug">
                                            {selectedPaper.title}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(selectedPaper.status)}`}>
                                            {selectedPaper.role} · {selectedPaper.status}
                                        </span>
                                        {selectedPaper.doi && (
                                            <a
                                                href={selectedPaper.doi}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-accent-bg text-primary hover:bg-primary/10 transition-colors font-semibold"
                                            >
                                                DOI <ExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>

                                    <div className="h-px bg-border w-full" />

                                    {selectedPaper.summary ? (
                                        <div className="space-y-3">
                                            <h4 className="text-xs font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {t('publications.coreSummary')}
                                            </h4>
                                            <div className="text-text leading-relaxed text-sm whitespace-pre-line bg-gray-50 p-5 rounded-xl border border-border">
                                                {selectedPaper.summary}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-muted text-sm italic">
                                            {t('publications.summaryComingSoon')}
                                        </div>
                                    )}

                                    <div className="flex justify-center pt-2">
                                        <button
                                            onClick={() => setSelectedPaper(null)}
                                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-text text-xs rounded-lg transition-colors border border-border font-semibold"
                                        >
                                            {t('publications.closeBtn')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Publications;
