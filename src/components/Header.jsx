import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitch from './LanguageSwitch';
import styles from './Header.module.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentLang, setCurrentLang] = useState('KR');

    const handleLanguageChange = (lang) => {
        setCurrentLang(lang);
        // Here you would typically trigger the actual language change logic
        console.log(`Language changed to: ${lang}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Research', href: '#research' },
        { name: 'Innovation', href: '#innovation' },
        { name: 'Publications', href: '#publications' },
        { name: 'Contact', href: '#contact' },
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
                            currentLang={currentLang}
                            onLanguageChange={handleLanguageChange}
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
                            currentLang={currentLang}
                            onLanguageChange={handleLanguageChange}
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
