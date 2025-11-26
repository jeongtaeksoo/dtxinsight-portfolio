import React from 'react';
import styles from './DigitalHealthProjects.module.css';
import dashboardImg from '../assets/dashboard_mockup.png';

const DigitalHealthProjects = () => {
    return (
        <section id="innovation" className={styles.innovation}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <span className={styles.label}>특집 혁신</span>
                    <h2 className={styles.title}>AI 기반 환자 모니터링 플랫폼</h2>
                    <p className={styles.description}>
                        만성 질환을 실시간으로 모니터링하도록 설계된 종합 디지털 치료 플랫폼입니다.
                        웨어러블 데이터를 예측 AI 모델과 통합하여 파일럿 단계에서 재입원을 25% 감소시켰습니다.
                    </p>
                    <ul className={styles.features}>
                        <li>실시간 이상 감지</li>
                        <li>HIPAA 준수 데이터 아키텍처</li>
                        <li>직관적인 임상의 대시보드</li>
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
