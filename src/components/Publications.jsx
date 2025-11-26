import React from 'react';
import styles from './Publications.module.css';
import poster1 from '../assets/poster_1.jpg';
import poster2 from '../assets/poster_2.jpg';

const Publications = () => {
    const publications = [
        {
            year: "2024",
            title: "AI-Driven Biomarkers in Neurodegenerative Disease Trials",
            journal: "Journal of Digital Medicine",
            status: "Published"
        },
        {
            year: "2023",
            title: "Optimizing Patient Recruitment via Machine Learning Models",
            journal: "Clinical Trials Today",
            status: "Published"
        },
        {
            year: "2023",
            title: "The Future of Decentralized Trials: A Strategic Framework",
            journal: "International Journal of Clinical Research",
            status: "Featured"
        },
        {
            year: "2022",
            title: "Ethical Considerations in AI Healthcare Algorithms",
            journal: "Digital Health Ethics Review",
            status: "Published"
        }
    ];

    return (
        <section id="publications" className={styles.publications}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.sectionTitle}>주요 논문</h2>

                <div className={styles.list}>
                    {publications.map((pub, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.left}>
                                <span className={styles.year}>{pub.year}</span>
                                <h3 className={styles.title}>{pub.title}</h3>
                            </div>
                            <div className={styles.right}>
                                <span className={styles.journal}>{pub.journal}</span>
                                <span className={`${styles.status} ${pub.status === 'Featured' ? styles.featured : ''}`}>
                                    {pub.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.posterSection}>
                    <h3 className={styles.posterTitle}>학회 발표 포스터</h3>
                    <div className={styles.posterGallery}>
                        <div className={styles.posterItem}>
                            <img src={poster1} alt="학회 발표 포스터 1" className={styles.posterImage} />
                        </div>
                        <div className={styles.posterItem}>
                            <img src={poster2} alt="학회 발표 포스터 2" className={styles.posterImage} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Publications;
