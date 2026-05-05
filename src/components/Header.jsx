import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import logo from '/logo.png';

const getScrollBehavior = () => (
    typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth'
);

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
        { name: t('nav.innovation'), href: '#innovation' },
        { name: t('nav.capabilities'), href: '#capabilities' },
        { name: t('nav.research'), href: '#research' },
        { name: t('nav.publications'), href: '#publications' },
        { name: t('nav.blog'), href: '#blog' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const behavior = getScrollBehavior();
        if (href === '#top') {
            window.scrollTo({ top: 0, behavior });
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior });
            }
        }
        setIsMobileMenuOpen(false);
    };

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'ja', label: 'JA' },
        { code: 'ko', label: 'KO' },
    ];

    const menuVariants = {
        closed: { opacity: 0, y: -10, transition: { duration: 0.2 } },
        open:   { opacity: 1, y: 0,   transition: { duration: 0.25 } },
    };

    const itemVariants = {
        closed: { opacity: 0 },
        open: (i) => ({
            opacity: 1,
            transition: { delay: i * 0.05, duration: 0.2 },
        }),
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 bg-white/95 border-b border-border backdrop-blur transition-[box-shadow,padding] duration-300 ${isScrolled ? 'shadow-sm py-3' : 'py-4'}`}>
            <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <a href="#" onClick={(e) => handleNavClick(e, '#top')} className="flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4">
                    <img src={logo} alt="DTXInsight Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain rounded-lg" />
                    <span className="text-xl md:text-2xl font-bold text-text">
                        DTX<span className="text-primary">Insight</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm font-medium text-muted transition-colors hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={(e) => handleNavClick(e, '#contact')}
                        className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                    >
                        <Coffee size={15} />
                        {t('nav.contact')}
                    </a>
                </nav>

                {/* Desktop Language Switch */}
                <div className="hidden lg:flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1.5 border border-border">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`px-3 py-1 text-xs font-semibold rounded-full transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${i18n.language?.startsWith(lang.code) ? 'bg-primary text-white shadow-sm' : 'text-muted hover:text-text'}`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-text p-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <Motion.div
                        className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-md px-4 pb-5 pt-3"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        {/* Language Switch */}
                        <Motion.div
                            className="flex gap-2 pb-4 mb-3 border-b border-border justify-center"
                            custom={0}
                            variants={itemVariants}
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang.code)}
                                    className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${i18n.language?.startsWith(lang.code) ? 'bg-primary text-white border-primary' : 'text-muted border-border hover:text-text hover:border-primary'}`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </Motion.div>

                        {/* Nav Links */}
                        {[...navLinks, { name: t('nav.contact'), href: '#contact' }].map((link, index) => (
                            <Motion.a
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 py-3 text-sm font-medium text-text hover:text-primary transition-colors border-b border-border last:border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                onClick={(e) => handleNavClick(e, link.href)}
                                custom={index + 1}
                                variants={itemVariants}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                {link.name}
                            </Motion.a>
                        ))}
                    </Motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
