import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Skills.module.css';

const Skills = () => {
    const { t } = useTranslation();

    const skillsData = t('skills.items', { returnObjects: true }) || [];
    const skills = Array.isArray(skillsData) ? skillsData : Object.values(skillsData);

    return (
        <section className={styles.skills}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.sectionTitle}>{t('skills.title')}</h2>

                <div className={styles.grid}>
                    {skills.map((skill, index) => (
                        <div key={index} className={styles.skillCard}>
                            <div className={styles.icon}><CheckCircle size={24} strokeWidth={1.5} /></div>
                            <span className={styles.name}>{skill}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
