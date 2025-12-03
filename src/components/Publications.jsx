import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styles from './Publications.module.css';
import poster1 from '../assets/poster_1.jpg';
import poster2 from '../assets/poster_2.jpg';

const Publications = () => {
    const { t } = useLanguage();

    const publications = [
        {
            year: "2025",
            title: "Designing a Generative AI Framework for Cognitive Intervention in Older Adults: An Engineering Protocol for Clinical Application",
            journal: "MDPI Healthcare (Major Revision)",
            status: "Major Revision",
            role: t('publications.roles.first')
        },
        {
            year: "2025",
            title: "Artificial Intelligence-Guided Mobile Telerehabilitation for Individuals with Cognitive Impairment: A Feasibility Study",
            journal: "Annals of Rehabilitation Medicine (Under Review)",
            status: "Under Review",
            role: t('publications.roles.co')
        },
        {
            year: "2025",
            title: "AI-driven cognitive telerehabilitation for stroke: a randomized controlled trial",
            journal: "Frontiers in Neurology",
            status: "Published",
            role: t('publications.roles.co')
        }
    ];

    return (
        <section id="publications" className={styles.publications}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.sectionTitle}>{t('publications.title')}</h2>

                <div className={styles.list}>
                    {publications.map((pub, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.left}>
                                <span className={styles.year}>{pub.year}</span>
                                <h3 className={styles.title}>{pub.title}</h3>
                            </div>
                            <div className={styles.right}>
                                <span className={`${styles.role} ${pub.role === '제1저자' ? styles.firstAuthor : ''}`}>
                                    {pub.role}
                                </span>
                                <span className={styles.journal}>{pub.journal}</span>
                                <span className={`${styles.status} ${pub.status === 'Featured' ? styles.featured : ''}`}>
                                    {pub.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.posterSection}>
                    <h3 className={styles.posterTitle}>{t('publications.posterTitle')}</h3>
                    <div className={styles.posterGallery}>
                        <div className={styles.posterItem}>
                            <img src={poster1} alt="Artificial Intelligence-Guided Mobile Telerehabilitation for Subjects with Cognitive Impairment" className={styles.posterImage} />
                            <p className={styles.posterCaption}>Artificial Intelligence-Guided Mobile Telerehabilitation for Subjects with Cognitive Impairment</p>
                        </div>
                        <div className={styles.posterItem}>
                            <img src={poster2} alt="Predictive Value of Cognitive Function and ALT for Functional Ambulation Gain in MCA Stroke Patients" className={styles.posterImage} />
                            <p className={styles.posterCaption}>Predictive Value of Cognitive Function and ALT for Functional Ambulation Gain in MCA Stroke Patients</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Publications;
