import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, X } from 'lucide-react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import WindowCard from './WindowCard';
import poster1 from '../assets/poster_1.jpg';
import poster2 from '../assets/poster_2.jpg';
import poster3 from '../assets/poster_3.png';

const statusStyle = (status) => {
    if (status === 'Published' || status === '게재 완료' || status === '掲載完了')
        return 'bg-green-50 text-green-700 border border-green-200';
    if (status === 'Under Review' || status === '심사 중' || status === '審査中')
        return 'bg-blue-50 text-blue-700 border border-blue-200';
    return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
};

const Publications = () => {
    const { t } = useTranslation();
    const [selectedPoster, setSelectedPoster] = useState(null);
    const [selectedPaper, setSelectedPaper] = useState(null);

    const publications = t('publications.items', { returnObjects: true }) || [];
    const posters = [
        { id: 1, src: poster1, title: 'KOSCOPP 2024', link: 'https://www.karm.or.kr/workshop/?abyear=202402&mode=green_view&sid=5985' },
        { id: 2, src: poster2, title: 'ICDT 2024', link: 'https://www.karm.or.kr/workshop/?abyear=202402&mode=green_search' },
        { id: 3, src: poster3, title: 'E-Poster-Park-AI DRIVEN COGNITIVE', link: 'https://journals.sagepub.com/doi/epub/10.1177/17474930251371448' },
    ];

    return (
        <section id="publications" className="scroll-mt-28 py-16 border-t border-border">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('publications.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Papers List */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-5">{t('publications.journalPapers')}</h3>
                    {publications.map((pub, index) => (
                        <WindowCard
                            key={index}
                            title={pub.title}
                            type={pub.journal}
                            date={pub.date || pub.year}
                            authors={pub.authors}
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

                {/* Posters */}
                <div>
                    <h3 className="text-sm font-semibold text-muted uppercase tracking-widest mb-5">{t('publications.posterTitle')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {posters.map((poster) => (
                            <Motion.button
                                key={poster.id}
                                type="button"
                                layoutId={`poster-${poster.id}`}
                                onClick={() => setSelectedPoster(poster)}
                                className="group relative aspect-[3/4] bg-surface rounded-xl overflow-hidden border border-border hover:border-primary transition-all cursor-pointer"
                                aria-label={poster.title}
                            >
                                <img
                                    src={poster.src}
                                    alt={poster.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                    <span className="text-xs font-semibold text-white leading-tight mb-1">{poster.title}</span>
                                    {poster.link && (
                                        <span className="text-[10px] text-white/80 flex items-center gap-1">
                                            <ExternalLink size={10} /> {t('publications.linkAvailable')}
                                        </span>
                                    )}
                                </div>
                            </Motion.button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Poster Modal */}
            <AnimatePresence>
                {selectedPoster && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-none">
                        <Motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPoster(null)}
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
                        />
                        <Motion.div
                            layoutId={`poster-${selectedPoster.id}`}
                            className="relative z-10 w-full max-w-2xl max-h-full aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-2xl pointer-events-auto"
                        >
                            <img
                                src={selectedPoster.src}
                                alt={selectedPoster.title}
                                className="w-full h-full object-contain"
                            />
                            <button
                                onClick={() => setSelectedPoster(null)}
                                className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white rounded-full text-text transition-colors shadow-sm"
                                aria-label={t('publications.closeBtn')}
                            >
                                <X size={18} />
                            </button>
                            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white text-center flex flex-col items-center gap-3">
                                <h4 className="font-semibold text-sm drop-shadow-md">{selectedPoster.title}</h4>
                                {selectedPoster.link && (
                                    <a
                                        href={selectedPoster.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all shadow-lg"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {t('publications.posterLinkCta')} <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>
                        </Motion.div>
                    </div>
                )}
            </AnimatePresence>

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
