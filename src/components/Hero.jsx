import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import profileImg from '../assets/profile_id_photo.png';

const Hero = () => {
    const { t } = useTranslation();

    const stats = [
        { label: t('hero.stat1Label'), value: t('hero.stat1Value') },
        { label: t('hero.stat2Label'), value: t('hero.stat2Value') },
        { label: t('hero.stat3Label'), value: t('hero.stat3Value') },
    ];

    return (
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

                {/* Left: Text */}
                <motion.div
                    className="flex-1 text-center md:text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                        {t('hero.credential')}
                    </p>

                    <h1 className="text-4xl md:text-6xl font-bold text-text mb-2 leading-tight">
                        {t('hero.name')}
                    </h1>

                    <p className="text-base md:text-lg text-muted mb-2">
                        {t('hero.affiliation')}
                    </p>

                    <p className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
                        {t('hero.tagline')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
                        <a
                            href="/RESUME.pdf"
                            download="RESUME.pdf"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm text-sm"
                        >
                            <Download size={15} />
                            {t('hero.resume')}
                        </a>
                        <a
                            href="#research"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors text-sm"
                        >
                            {t('hero.researchBtn')}
                            <ArrowRight size={15} />
                        </a>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap justify-center md:justify-start">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className={`px-5 py-3 ${i > 0 ? 'border-l border-border' : ''}`}
                            >
                                <p className="text-xl font-bold text-text">{stat.value}</p>
                                <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Profile Image */}
                <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                >
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-border shadow-md">
                        <img
                            src={profileImg}
                            alt={t('hero.name')}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
