import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from './LanguageSwitch';
import styles from './Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    const navLinks = [
        { name: t('nav.highlights'), href: '#highlights' },
        { name: t('nav.research'), href: '#research' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.publications'), href: '#publications' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.container}`}>
                <div className={styles.logo}>DTX Insight</div>

                <nav className={styles.desktopNav}>
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className={styles.navLink}>
                            {link.name}
                        </a>
                    ))}
                    <div className={styles.desktopLangSwitch}>
                        <LanguageSwitch
                            currentLang={i18n.language}
                            onLanguageChange={changeLanguage}
                        />
                    </div>
                </nav>

                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {isMobileMenuOpen && (
                    <div className={styles.mobileNav}>
                        <LanguageSwitch
                            currentLang={i18n.language}
                            onLanguageChange={changeLanguage}
                        />
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={styles.mobileNavLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
