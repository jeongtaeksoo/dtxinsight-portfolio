import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <section id="about" className={styles.about}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>철학 &amp; 접근법</h2>
                <div className={styles.divider}></div>
                <p className={styles.description}>
                    헬스케어의 미래는 엄격한 임상 검증과 적응형 인공지능의 교차점에 있다고 믿습니다.
                    저는 간호학 배경과 임상연구 경험을 바탕으로, 새로운 기술이 최첨단일 뿐만 아니라 임상적으로 의미 있고 환자 중심적이도록 보장합니다.
                </p>
                <p className={styles.description}>
                    현재 가톨릭관동대학교 국제성모병원에서 임상연구 코디네이터로 재직하며, 디지털 바이오마커와 분산형 임상시험 방법론을 통해
                    신약 개발을 가속화하고 환자 결과를 개선하는 전략을 설계하고 있습니다.
                </p>
            </div>
        </section>
    );
};

export default About;
