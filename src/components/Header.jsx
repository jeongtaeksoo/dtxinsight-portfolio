import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
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
        { code: 'ko', label: 'KR' },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -10 },
        open: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.25,
                ease: [0.4, 0, 0.2, 1]
            }
        })
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="text-2xl md:text-3xl font-bold tracking-tighter text-white hover:text-primary transition-colors">
                    DTX<span className="text-primary">Insight</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-muted hover:text-white transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Desktop Language Switch */}
                <div className="hidden md:flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/5">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`px-4 py-1.5 text-sm rounded-full transition-all duration-300 ${i18n.language === lang.code ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-white'}`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Premium Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className={styles.mobileNav}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                        >
                            {/* Language Switch */}
                            <motion.div
                                className={styles.mobileLanguageSwitch}
                                custom={0}
                                variants={itemVariants}
                            >
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => changeLanguage(lang.code)}
                                        className={`${styles.mobileLangBtn} ${i18n.language === lang.code ? styles.activeLang : ''}`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </motion.div>

                            {/* Nav Links */}
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    className={styles.mobileNavLink}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    custom={index + 1}
                                    variants={itemVariants}
                                >
                                    <span className={styles.navIndicator}></span>
                                    {link.name}
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;
