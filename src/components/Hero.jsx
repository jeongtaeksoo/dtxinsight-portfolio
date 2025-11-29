import React from 'react';
import styles from './Hero.module.css';
import profileImg from '../assets/profile_photo.jpg';

const Hero = () => {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        임상연구 코디네이터 <br />
                        <span className={styles.highlight}>&amp; AI 디지털헬스 연구원</span>
                    </h1>
                    <p className={styles.subtitle}>
                        임상시험 운영 관리와 AI 기반 디지털 치료제 연구를 통해 헬스케어 혁신을 주도합니다.
                        가톨릭관동대학교 국제성모병원 재활의학과에서 3.9억 원 규모의 다기관 R&D 프로젝트를 관리하고 있습니다.
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
