import React from 'react';
import { FileText, Activity, Globe } from 'lucide-react';
import styles from './ResearchProjects.module.css';

const ResearchProjects = () => {
    const projects = [
        {
            icon: <FileText size={24} />,
            title: "분산형 임상시험",
            category: "프로토콜 설계",
            description: "3상 종양학 임상시험에서 환자 부담을 40% 줄이는 원격 모니터링 프로토콜 구현"
        },
        {
            icon: <Activity size={24} />,
            title: "디지털 바이오마커 검증",
            category: "임상 검증",
            description: "심방세동 조기 징후 감지를 위한 새로운 웨어러블 센서 검증 연구 주도"
        },
        {
            icon: <Globe size={24} />,
            title: "글로벌 규제 전략",
            category: "규제 업무",
            description: "최초의 AI 기반 진단 도구에 대한 FDA 및 EMA 요구사항 처리"
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
