import React from 'react';
import { FileText, Activity, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import styles from './ResearchProjects.module.css';

const ResearchProjects = () => {
    const { t } = useLanguage();

    const projects = [
        {
            icon: <FileText size={24} />,
            title: t('research.projects.0.title'),
            category: t('research.projects.0.category'),
            description: t('research.projects.0.description')
        },
        {
            icon: <Activity size={24} />,
            title: t('research.projects.1.title'),
            category: t('research.projects.1.category'),
            description: t('research.projects.1.description')
        },
        {
            icon: <Globe size={24} />,
            title: t('research.projects.2.title'),
            category: t('research.projects.2.category'),
            description: t('research.projects.2.description')
        }
    ];

    return (
        <section id="research" className={styles.research}>
            <div className={`container ${styles.container}`}>
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>{t('research.title')}</h2>
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
                            <a href="#" className={styles.link}>{t('research.link')}</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchProjects;
