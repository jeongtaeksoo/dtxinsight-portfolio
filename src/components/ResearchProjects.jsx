import React from 'react';
import { FileText, Activity, Globe } from 'lucide-react';
import styles from './ResearchProjects.module.css';

const ResearchProjects = () => {
    const projects = [
        {
            icon: <FileText size={24} />,
            title: "다기관 임상시험 관리",
            category: "프로토콜 설계",
            description: "3.9억 원 규모 다기관 R&D 프로젝트 총괄 및 AI 기반 디지털 인지훈련 치료제 다기관 무작위대조 임상시험 관리"
        },
        {
            icon: <Activity size={24} />,
            title: "디지털 바이오마커 검증",
            category: "임상 검증",
            description: "뇌졸중 환자를 위한 AI 기반 인지 원격재활의 임상 효과 검증 (Frontiers in Neurology 게재)"
        },
        {
            icon: <Globe size={24} />,
            title: "디지털 헬스케어 실증",
            category: "규제 업무",
            description: "보건복지부·한국보건산업진흥원 실증사업 중간보고회 Q&A 세션 진행 및 실증 연구 관련 질의응답 대응"
        }
    ];

    return (
        <section id="research" className={styles.research}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>연구 하이라이트</h2>
                    <div className={styles.line}></div>
                </div>

                <div className={styles.grid}>
                    {projects.map((project, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.iconBox}>{project.icon}</div>
                                <span className={styles.category}>{project.category}</span>
                            </div>
                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.description}>{project.description}</p>
                            <a href="#" className={styles.link}>사례 연구 보기 →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchProjects;
