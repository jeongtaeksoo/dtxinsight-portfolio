import React from 'react';
import styles from './Hero.module.css';
import profileImg from '../assets/profile_photo_placeholder.png'; // Assuming the generated image will be moved here

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Bridging Clinical Research <br />
                        <span className={styles.highlight}>& AI Innovation</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Clinical Research Strategist & AI Digital Health Innovator transforming healthcare through data-driven insights and cutting-edge technology.
                    </p>
                    <div className={styles.actions}>
                        <a href="#contact" className={styles.primaryBtn}>Get in Touch</a>
                        <a href="#research" className={styles.secondaryBtn}>View Research</a>
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
