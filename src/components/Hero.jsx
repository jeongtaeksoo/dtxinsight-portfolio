import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './Hero.module.css';
import profileImg from '../assets/profile_photo.jpg';

const Hero = () => {
    const { t } = useLanguage();
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        {t('hero.title')} <br />
                        <span className={styles.highlight}>{t('hero.titleHighlight')}</span>
                    </h1>
                    <p className={styles.subtitle}>
                        {t('hero.subtitle')}
                    </p>
                    <div className={styles.actions}>
                        <a href="#contact" className={styles.primaryBtn}>{t('hero.contactBtn')}</a>
                        <a href="#research" className={styles.secondaryBtn}>{t('hero.researchBtn')}</a>
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={profileImg} alt="Profile" className={styles.profileImage} />
                    <div className={styles.decorativeLine}></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
