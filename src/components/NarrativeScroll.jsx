import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NarrativeScroll = () => {
    const { t } = useTranslation();
    const items = t('timeline.items', { returnObjects: true }) || [];

    return (
        <section className="py-16">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('timeline.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="relative max-w-2xl">
                {/* Vertical line */}
                <div className="absolute left-[4.5rem] top-2 bottom-2 w-px bg-border" />

                <div className="space-y-7">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className="flex gap-6 items-start"
                        >
                            {/* Date */}
                            <div className="w-16 text-right shrink-0 pt-0.5">
                                <span className="text-xs font-mono font-semibold text-primary">
                                    {item.date}
                                </span>
                            </div>

                            {/* Dot */}
                            <div className="relative z-10 mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />

                            {/* Content */}
                            <div className="flex-1 pb-1">
                                <p className="text-sm font-semibold text-text leading-snug">
                                    {item.title}
                                </p>
                                {item.note && (
                                    <p className="text-xs text-muted mt-1.5 leading-relaxed border-l-2 border-primary/30 pl-3">
                                        {item.note}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NarrativeScroll;
