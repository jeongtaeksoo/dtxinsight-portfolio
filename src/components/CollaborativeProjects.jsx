import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './CollaborativeProjects.module.css';
import logoImg from '../assets/logo.png';

const CollaborativeProjects = () => {
    const { t } = useLanguage();

    return (
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <a href="https://www.hwiwasoo.com" className={styles.logoWrapper} target="_blank" rel="noopener noreferrer">
                    <img src={logoImg} alt="Collaborative Project Logo" className={styles.logo} />
                </a>
                <div className={styles.content}>
                    <h3 className={styles.title}>{t('collaborative.title')}</h3>
                    <p className={styles.description}>
                        {t('collaborative.description')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CollaborativeProjects;
