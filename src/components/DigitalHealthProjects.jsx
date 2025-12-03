import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './DigitalHealthProjects.module.css';
import ctcFrameworkImg from '../assets/ctc_framework.png';

const DigitalHealthProjects = () => {
    const { t } = useLanguage();

    return (
        <section id="innovation" className={styles.innovation}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.label}>{t('innovation.label')}</span>
                    <h2 className={styles.title}>{t('innovation.title')}</h2>
                    <p className={styles.description}>
                        {t('innovation.description')}
                    </p>
                    <ul className={styles.features}>
                        <li>{t('innovation.features.0')}</li>
                        <li>{t('innovation.features.1')}</li>
                        <li>{t('innovation.features.2')}</li>
                    </ul>
                    <a href="#" className={styles.cta}>{t('innovation.cta')}</a>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={ctcFrameworkImg} alt="CTC Framework UI" className={styles.image} />
                </div>
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
