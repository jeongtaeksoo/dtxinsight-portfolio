import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './About.module.css';

const About = () => {
    const { t } = useTranslation();
    return (
        <section id="about" className={styles.about}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>{t('about.title')}</h2>
                <div className={styles.divider}></div>
                <p className={styles.description}>
                    {t('about.description1')}
                </p>
                <p className={styles.description}>
                    {t('about.description2')}
                </p>
            </div>
        </section>
    );
};

export default About;
