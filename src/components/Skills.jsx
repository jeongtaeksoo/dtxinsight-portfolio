import React from 'react';
import { Code, Database, LineChart, Microscope, Stethoscope, Shield } from 'lucide-react';
import styles from './Skills.module.css';

const Skills = () => {
    const skills = [
        { icon: <Stethoscope size={28} strokeWidth={1.5} />, name: "Clinical Trials" },
        { icon: <Code size={28} strokeWidth={1.5} />, name: "Python & R" },
        { icon: <Database size={28} strokeWidth={1.5} />, name: "SQL & NoSQL" },
        { icon: <LineChart size={28} strokeWidth={1.5} />, name: "Data Analytics" },
        { icon: <Microscope size={28} strokeWidth={1.5} />, name: "Research Design" },
        { icon: <Shield size={28} strokeWidth={1.5} />, name: "Regulatory Affairs" }
    ];

    return (
        <section className={styles.skills}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.sectionTitle}>Core Competencies</h2>

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
