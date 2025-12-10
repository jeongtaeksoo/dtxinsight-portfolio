import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import profileImg from '../assets/profile_id_photo.png';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden py-20">
            <div className="container mx-auto px-4 z-10 relative flex flex-col items-center justify-center gap-8">

                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px]">
                        {/* Glow Effect Behind */}
                        <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full scale-110 animate-pulse-slow"></div>

                        {/* Image Container */}
                        <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                            <img
                                src={profileImg}
                                alt={t('hero.name') || "정택수"}
                                className="w-full h-full object-cover object-top"
                            />
                            {/* Subtle Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Profile Information */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center max-w-2xl"
                >
                    {/* Name */}
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        {t('hero.name')}
                    </h1>

                    {/* Current Position */}
                    <p className="text-lg md:text-xl text-muted mb-2">
                        {t('hero.affiliation')}
                    </p>

                    {/* Credential */}
                    <p className="text-base md:text-lg text-secondary font-medium mb-4">
                        {t('hero.credential')}
                    </p>

                    {/* Tagline */}
                    <p className="text-base md:text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-semibold">
                        {t('hero.tagline')}
                    </p>

                    {/* Resume Download Link */}
                    <a
                        href="/Resume.pdf"
                        download="Taeksoo_Jeong_Resume.pdf"
                        className="mt-4 inline-block text-base md:text-lg text-primary hover:text-secondary transition-colors duration-300 underline underline-offset-4"
                    >
                        {t('hero.resume')}
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-pulse-slow"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
