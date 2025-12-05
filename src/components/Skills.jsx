import React from 'react';
import { Code, Database, LineChart, Microscope, Stethoscope, Shield, MessageCircle, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import styles from './Skills.module.css';

const Skills = () => {
    const { t } = useTranslation();

    const skills = [
        { icon: <Stethoscope size={28} strokeWidth={1.5} />, name: t('skills.items.clinical') },
        { icon: <Code size={28} strokeWidth={1.5} />, name: t('skills.items.python') },
        { icon: <LineChart size={28} strokeWidth={1.5} />, name: t('skills.items.data') },
        { icon: <Microscope size={28} strokeWidth={1.5} />, name: t('skills.items.design') },
        { icon: <MessageCircle size={28} strokeWidth={1.5} />, name: t('skills.items.comm') },
        { icon: <Brain size={28} strokeWidth={1.5} />, name: t('skills.items.ai') }
    ];

    return (
        <section className={styles.skills}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.sectionTitle}>{t('skills.title')}</h2>

                <div className={styles.grid}>
                    {skills.map((skill, index) => (
                        <div key={index} className={styles.skillCard}>
                            <div className={styles.icon}>{skill.icon}</div>
                            <span className={styles.name}>{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
