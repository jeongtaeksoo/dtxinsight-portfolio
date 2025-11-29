import React from 'react';
import styles from './DigitalHealthProjects.module.css';
import dashboardImg from '../assets/dashboard_mockup.png';

const DigitalHealthProjects = () => {
    return (
        <section id="innovation" className={styles.innovation}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.label}>특집 혁신</span>
                    <h2 className={styles.title}>생성형 AI 기반 인지 중재 프레임워크</h2>
                    <p className={styles.description}>
                        고령자의 인지기능 저하와 디지털 배제를 해결하기 위한 3중 에이전트(Coach-Teacher-Companion) 시스템을 설계했습니다.
                        일상생활 속 자연스러운 인지훈련 흐름(Context-Adaptive Cognitive Flow)을 구현하여 사용자 참여를 극대화합니다.
                    </p>
                    <ul className={styles.features}>
                        <li>Coach-Teacher-Companion 3중 에이전트</li>
                        <li>Context-Adaptive Cognitive Flow</li>
                        <li>고령자 친화적 디지털 인터페이스</li>
                    </ul>
                    <a href="#" className={styles.cta}>기술 탐색하기</a>
                </div>
                <div className={styles.imageWrapper}>
                    <img src={dashboardImg} alt="Dashboard UI" className={styles.image} />
                </div>
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
