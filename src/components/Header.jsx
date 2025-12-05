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
        localStorage.setItem('i18nextLng', lang);
    };

    const navLinks = [
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.research'), href: '#research' },
        { name: t('nav.innovation'), href: '#innovation' },
        { name: t('nav.publications'), href: '#publications' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'jp', label: '日本語' },
        { code: 'ko', label: 'KR' }, // User requested 'KR' label
    ];

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="text-xl font-bold tracking-tighter text-white hover:text-primary transition-colors">
                    DTX<span className="text-primary">Insight</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Language Switch */}
                <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-2 py-1 border border-white/5">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${i18n.language === lang.code ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-white'}`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>

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
