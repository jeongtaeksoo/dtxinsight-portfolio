import React from 'react';
import styles from './LanguageSwitch.module.css';

const LanguageSwitch = ({ currentLang, onLanguageChange }) => {
    const languages = [
        { code: 'EN', label: 'EN' },
        { code: 'JP', label: '日本語' },
        { code: 'KR', label: 'KR' }
    ];

    return (
        <div className={styles.container}>
            {languages.map((lang, index) => (
                <React.Fragment key={lang.code}>
                    <button
                        className={`${styles.button} ${currentLang === lang.code ? styles.active : ''}`}
                        onClick={() => onLanguageChange(lang.code)}
                        aria-label={`Switch to ${lang.label}`}
                    >
                        {lang.label}
                    </button>
                    {index < languages.length - 1 && (
                        <span className={styles.separator}>|</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default LanguageSwitch;
