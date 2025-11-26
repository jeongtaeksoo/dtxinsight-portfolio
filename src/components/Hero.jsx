import React from 'react';
import styles from './Hero.module.css';
import profileImg from '../assets/profile_photo_placeholder.png'; // Assuming the generated image will be moved here

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        임상연구 전략가 <br />
                        <span className={styles.highlight}>&amp; AI 디지털헬스 혁신가</span>
                    </h1>
                    <p className={styles.subtitle}>
                        데이터 기반 통찰력과 최첨단 기술로 헬스케어를 혁신하는 임상연구 전략가이자 AI 디지털헬스 혁신가입니다.
                    </p>
                    <div className={styles.actions}>
                        <a href="#contact" className={styles.primaryBtn}>연락하기</a>
                        <a href="#research" className={styles.secondaryBtn}>연구 보기</a>
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
