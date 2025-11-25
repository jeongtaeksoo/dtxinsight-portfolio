import React from 'react';
import styles from './DigitalHealthProjects.module.css';
import dashboardImg from '../assets/dashboard_mockup.png';

const DigitalHealthProjects = () => {
    return (
        <section id="innovation" className={styles.innovation}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.label}>Featured Innovation</span>
                    <h2 className={styles.title}>AI-Driven Patient Monitoring Platform</h2>
                    <p className={styles.description}>
                        A comprehensive digital therapeutic platform designed to monitor chronic conditions in real-time.
                        By integrating wearable data with predictive AI models, we achieved a 25% reduction in hospital readmissions
                        during the pilot phase.
                    </p>
                    <ul className={styles.features}>
                        <li>Real-time anomaly detection</li>
                        <li>HIPAA-compliant data architecture</li>
                        <li>Intuitive clinician dashboard</li>
                    </ul>
                    <a href="#" className={styles.cta}>Explore the Technology</a>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={dashboardImg} alt="Dashboard UI" className={styles.image} />
                </div>
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
