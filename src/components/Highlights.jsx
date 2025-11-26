import React from 'react';
import { Brain, Database, Activity, Users } from 'lucide-react';
import styles from './Highlights.module.css';

const Highlights = () => {
    const items = [
        {
            icon: <Activity size={32} strokeWidth={1.5} />,
            title: "임상 전략",
            description: "효율성과 환자 안전을 위한 임상시험 프로토콜 최적화"
        },
        {
            icon: <Brain size={32} strokeWidth={1.5} />,
            title: "AI 통합",
            description: "예측 건강 분석을 위한 머신러닝 활용"
        },
        {
            icon: <Database size={32} strokeWidth={1.5} />,
            title: "데이터 과학",
            description: "복잡한 데이터셋을 실행 가능한 의학적 통찰력으로 변환"
        },
        {
            icon: <Users size={32} strokeWidth={1.5} />,
            title: "환자 중심성",
            description: "사용자를 염두에 둔 디지털 헬스 솔루션 설계"
        }
    ];

    return (
        <section className={styles.highlights}>
            <div className={`container ${styles.container}`}>
                {items.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconWrapper}>{item.icon}</div>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Highlights;
