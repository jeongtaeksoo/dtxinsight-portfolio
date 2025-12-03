import React from 'react';
import { Brain, Database, Activity, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import styles from './Highlights.module.css';

const Highlights = () => {
    const { t } = useLanguage();

    const items = [
        {
            icon: <Activity size={32} strokeWidth={1.5} />,
            title: t('highlights.items.0.title'),
            description: t('highlights.items.0.description')
        },
        {
            icon: <Brain size={32} strokeWidth={1.5} />,
            title: t('highlights.items.1.title'),
            description: t('highlights.items.1.description')
        },
        {
            icon: <Database size={32} strokeWidth={1.5} />,
            title: t('highlights.items.2.title'),
            description: t('highlights.items.2.description')
        },
        {
            icon: <Users size={32} strokeWidth={1.5} />,
            title: t('highlights.items.3.title'),
            description: t('highlights.items.3.description')
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
