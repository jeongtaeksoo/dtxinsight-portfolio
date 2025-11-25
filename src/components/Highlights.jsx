import React from 'react';
import { Brain, Database, Activity, Users } from 'lucide-react';
import styles from './Highlights.module.css';

const Highlights = () => {
    const items = [
        {
            icon: <Activity size={32} strokeWidth={1.5} />,
            title: "Clinical Strategy",
            description: "Optimizing trial protocols for efficiency and patient safety."
        },
        {
            icon: <Brain size={32} strokeWidth={1.5} />,
            title: "AI Integration",
            description: "Leveraging machine learning for predictive health analytics."
        },
        {
            icon: <Database size={32} strokeWidth={1.5} />,
            title: "Data Science",
            description: "Transforming complex datasets into actionable medical insights."
        },
        {
            icon: <Users size={32} strokeWidth={1.5} />,
            title: "Patient Centricity",
            description: "Designing digital health solutions with the user in mind."
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
