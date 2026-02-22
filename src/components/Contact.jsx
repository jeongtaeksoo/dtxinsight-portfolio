import React from 'react';
import { useTranslation } from 'react-i18next';
import { GmailIcon, LinkedInIcon, OrcidIcon, GithubIcon } from './Icons';

const Contact = () => {
    const { t } = useTranslation();

    const links = [
        { href: 'mailto:jeongtaeksoo@gmail.com',                        Icon: GmailIcon,    label: 'jeongtaeksoo@gmail.com' },
        { href: 'https://www.linkedin.com/in/taeksoo-jeong-20685b296/', Icon: LinkedInIcon, label: 'LinkedIn' },
        { href: 'https://orcid.org/0009-0001-1451-5457',                Icon: OrcidIcon,    label: 'ORCID' },
        { href: 'https://github.com/jeongtaeksoo',                       Icon: GithubIcon,   label: 'GitHub' },
    ];

    return (
        <section id="contact" className="mt-20 border-t border-border">
            <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-text mb-3">{t('contact.title')}</h2>
                <p className="text-muted mb-10 max-w-md mx-auto text-sm leading-relaxed">
                    {t('contact.subtitle')}
                </p>

                <div className="flex flex-wrap justify-center gap-3">
                    {links.map(({ href, Icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-border rounded-lg text-text hover:border-primary hover:text-primary transition-colors text-sm font-medium bg-white"
                        >
                            <Icon size={17} />
                            {label}
                        </a>
                    ))}
                </div>
            </div>

            <footer className="border-t border-border bg-white">
                <div className="max-w-[1200px] mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted">
                    <p>{t('contact.footer.rights')}</p>
                    <p>{t('contact.footer.tagline')}</p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
