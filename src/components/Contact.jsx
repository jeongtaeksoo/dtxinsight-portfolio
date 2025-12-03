import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GmailIcon, LinkedInIcon, OrcidIcon, GithubIcon } from './Icons';
import styles from './Contact.module.css';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className={styles.contact}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>{t('contact.title')}</h2>
                <p className={styles.subtitle}>
                    {t('contact.subtitle')}
                </p>

                <div className={styles.links}>
                    <a href="mailto:jeongtaeksoo@gmail.com" className={styles.link}>
                        <GmailIcon size={24} />
                        <span>jeongtaeksoo@gmail.com</span>
                    </a>
                    <a href="https://www.linkedin.com/in/taeksoo-jeong-20685b296/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <LinkedInIcon size={24} />
                        <span>LinkedIn</span>
                    </a>
                    <a href="https://orcid.org/0009-0001-1451-5457" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <OrcidIcon size={24} />
                        <span>ORCID</span>
                    </a>
                    <a href="https://github.com/jeongtaeksoo" target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <GithubIcon size={24} />
                        <span>GitHub</span>
                    </a>
                </div>
            </div>

            <footer className={styles.footer}>
                <div className="container">
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
