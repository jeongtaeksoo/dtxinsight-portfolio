import React from 'react';
import { Brain, Database, Activity, Users } from 'lucide-react';
import styles from './Highlights.module.css';

const Highlights = () => {
    const items = [
        {
            icon: <Activity size={32} strokeWidth={1.5} />,
            title: "다기관 임상 운영",
            description: "3.9억 원 규모 R&D 총괄 및 다기관 RCT 관리"
        },
        {
            icon: <Brain size={32} strokeWidth={1.5} />,
            title: "AI & 디지털 헬스",
            description: "생성형 AI 기반 인지 훈련 프레임워크 설계"
        },
        {
            icon: <Database size={32} strokeWidth={1.5} />,
            title: "데이터 관리",
            description: "데이터 품질 점검 및 임상 데이터 관리"
        },
        {
            icon: <Users size={32} strokeWidth={1.5} />,
            title: "규제 및 윤리",
            description: "IRB 심의, CRIS 등록 및 보건복지부 실증사업 대응"
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
