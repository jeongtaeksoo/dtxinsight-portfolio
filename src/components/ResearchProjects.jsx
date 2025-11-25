import React from 'react';
import { FileText, Activity, Globe } from 'lucide-react';
import styles from './ResearchProjects.module.css';

const ResearchProjects = () => {
    const projects = [
        {
            icon: <FileText size={24} />,
            title: "Decentralized Clinical Trials",
            category: "Protocol Design",
            description: "Implemented remote monitoring protocols reducing patient burden by 40% in Phase III oncology trials."
        },
        {
            icon: <Activity size={24} />,
            title: "Digital Biomarker Validation",
            category: "Clinical Validation",
            description: "Led the validation study for a novel wearable sensor detecting early signs of atrial fibrillation."
        },
        {
            icon: <Globe size={24} />,
            title: "Global Regulatory Strategy",
            category: "Regulatory Affairs",
            description: "Navigated FDA and EMA requirements for a first-in-class AI-driven diagnostic tool."
        }
    ];

    return (
        <section id="research" className={styles.research}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>Research Highlights</h2>
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
                            <a href="#" className={styles.link}>View Case Study →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchProjects;
