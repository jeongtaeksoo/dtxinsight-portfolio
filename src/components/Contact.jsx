import React from 'react';
import { useTranslation } from 'react-i18next';
import { GmailIcon, LinkedInIcon, OrcidIcon, GithubIcon } from './Icons';

const Contact = () => {
    const { t } = useTranslation();

    const links = [
        { href: 'mailto:jeongtaeksoo8@gmail.com', Icon: GmailIcon, label: 'jeongtaeksoo8@gmail.com' },
        { href: 'https://www.linkedin.com/in/taeksoo-jeong-20685b296/', Icon: LinkedInIcon, label: 'LinkedIn' },
        { href: 'https://orcid.org/0009-0001-1451-5457', Icon: OrcidIcon, label: 'ORCID' },
        { href: 'https://github.com/jeongtaeksoo', Icon: GithubIcon, label: 'GitHub' },
    ];

    return (
        <section id="contact" className="mt-20 border-t border-border">
            <div className="max-w-[1200px] mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
                {/* Left Side: Contact Links */}
                <div className="flex flex-col justify-center items-center md:items-start">
                    <h2 className="text-3xl font-bold text-text mb-3">{t('contact.title')}</h2>
                    <p className="text-muted mb-10 max-w-md text-sm leading-relaxed">
                        {t('contact.subtitle')}
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
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

                {/* Right Side: Blog Note */}
                <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-sm relative overflow-hidden text-left bg-zinc-50 dark:bg-zinc-800/10 flex flex-col justify-between min-h-[320px]">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70 mb-3">Static Blog</p>
                        <h3 className="text-2xl font-bold text-text mb-4">Repository-backed publishing</h3>
                        <p className="text-sm leading-relaxed text-muted max-w-md">
                            블로그는 이제 Firebase 없이 정적 데이터로 배포됩니다. 새 글은 저장소의
                            블로그 데이터 파일을 수정한 뒤 배포하면 공개됩니다.
                        </p>
                    </div>

                    <a
                        href="#blog"
                        className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-white px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-primary hover:text-primary"
                    >
                        블로그 섹션 보기
                    </a>
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
