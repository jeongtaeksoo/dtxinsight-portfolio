import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <section id="about" className={styles.about}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>Philosophy & Approach</h2>
                <div className={styles.divider}></div>
                <p className={styles.description}>
                    I believe that the future of healthcare lies at the intersection of rigorous clinical validation and adaptive artificial intelligence.
                    My work focuses on bridging the gap between traditional medical research and rapid digital innovation, ensuring that new technologies
                    are not only cutting-edge but also clinically meaningful and patient-centric.
                </p>
                <p className={styles.description}>
                    With a background in clinical trials and a passion for data science, I design strategies that accelerate drug development
                    and improve patient outcomes through digital biomarkers and decentralized trial methodologies.
                </p>
            </div>
        </section>
    );
};

export default About;
