import React from 'react';
import { useTranslation } from 'react-i18next';
import { GmailIcon, LinkedInIcon, OrcidIcon, GithubIcon, PhoneIcon } from './Icons';
import styles from './Contact.module.css';

const Contact = () => {
    const { t } = useTranslation();
    const items = t('contact.items', { returnObjects: true }) || [];
    const iconMap = {
        email: GmailIcon,
        phone: PhoneIcon,
        linkedin: LinkedInIcon,
        orcid: OrcidIcon,
        github: GithubIcon
    };

    return (
        <section id="contact" className={styles.contact}>
            <div className="container mx-auto px-4">
                <div className={styles.content}>
                    <h2 className={styles.title}>{t('contact.title')}</h2>
                    <p className={styles.subtitle}>
                        {t('contact.subtitle')}
                    </p>

                    <div className={styles.links}>
                        {items.map((item, index) => {
                            const Icon = iconMap[item.type] || GmailIcon;
                            const isExternal = item.href?.startsWith('http');
                            return (
                                <a
                                    key={`${item.type}-${index}`}
                                    href={item.href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className={styles.link}
                                >
                                    <Icon size={24} />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>

            <footer className={styles.footer}>
                <div className="container mx-auto px-4">
                    <div className={styles.footerContent}>
                        <p className={styles.copyright}>{t('contact.footer.rights')}</p>
                        <p className={styles.tagline}>{t('contact.footer.tagline')}</p>
                    </div>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
