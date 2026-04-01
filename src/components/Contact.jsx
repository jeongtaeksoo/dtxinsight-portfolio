import React from 'react';
import { useTranslation } from 'react-i18next';
import { GmailIcon, LinkedInIcon } from './Icons';

const Contact = () => {
    const { t } = useTranslation();
    const collaborationItems = t('contact.collaborationItems', { returnObjects: true }) || [];

    return (
        <section id="contact" className="scroll-mt-28 mt-20 border-t border-border">
            <div className="max-w-[1200px] mx-auto px-4 py-20">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_1.05fr] lg:gap-12">
                    <div className="text-center md:text-left">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                            {t('contact.eyebrow')}
                        </p>
                        <h2 className="text-3xl font-bold text-text mb-4 text-balance">{t('contact.title')}</h2>
                        <p className="text-muted max-w-xl text-sm leading-relaxed md:text-base">
                            {t('contact.subtitle')}
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                            <a
                                href="mailto:jeongtaeksoo8@gmail.com"
                                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
                            >
                                <GmailIcon size={17} />
                                {t('contact.primaryCta')}
                            </a>
                            <a
                                href="https://www.linkedin.com/in/taeksoo-jeong-20685b296/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
                            >
                                <LinkedInIcon size={17} />
                                {t('contact.secondaryCta')}
                            </a>
                            <a
                                href="https://calendly.com/jeongtaeksoo8/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-xl border border-primary/30 bg-primary/5 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                            >
                                {t('contact.tertiaryCta')}
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        {collaborationItems.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-[24px] border border-border bg-white px-5 py-5 shadow-sm"
                            >
                                <p className="text-sm font-semibold text-text">{item.title}</p>
                                <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <footer className="border-t border-border bg-white dark:bg-transparent">
                <div className="max-w-[1200px] mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted">
                    <p>{t('contact.footer.rights')}</p>
                    <p>{t('contact.footer.tagline')}</p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
