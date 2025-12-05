import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import styles from './Hero.module.css'; // Keeping for container/structure if needed, but using Tailwind mostly

const Hero = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);

    // Typing sequence control
    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 1000); // Start 1st line
        const timer2 = setTimeout(() => setStep(2), 3500); // Start 2nd line
        const timer3 = setTimeout(() => setStep(3), 6000); // Start 3rd line
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    const typingVar = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Content Container - centered and above 3D bg */}
            <div className="container mx-auto px-4 text-center z-10 relative">

                {/* 1. Main Headline (Korean/Env) */}
                <motion.div
                    initial="hidden"
                    animate={step >= 1 ? "visible" : "hidden"}
                    variants={typingVar}
                    className="mb-4"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-primary tracking-tight">
                        <span dangerouslySetInnerHTML={{ __html: t('hero.title_1') || t('hero.title') }} />
                    </h1>
                </motion.div>

                {/* 2. English Subtitle 1 */}
                <motion.div
                    initial="hidden"
                    animate={step >= 2 ? "visible" : "hidden"}
                    variants={typingVar}
                    className="mb-2"
                >
                    <h2 className="text-2xl md:text-3xl font-light text-text/90 font-mono">
                        {t('hero.title_2') || "Clinical Research Strategist"}
                    </h2>
                </motion.div>

                {/* 3. English Subtitle 2 */}
                <motion.div
                    initial="hidden"
                    animate={step >= 3 ? "visible" : "hidden"}
                    variants={typingVar}
                    className="mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-light text-primary/80 font-mono">
                        {t('hero.title_3') || "AI-driven Cognitive Intervention Architect"}
                    </h2>
                </motion.div>

                {/* Buttons (Fade in last) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={step >= 3 ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-col md:flex-row gap-4 justify-center items-center"
                >
                    <a
                        href="#contact"
                        className="group relative px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] flex items-center gap-2"
                    >
                        {t('hero.cta_contact') || t('hero.contactBtn')}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#research"
                        className="px-8 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-all hover:scale-105"
                    >
                        {t('hero.cta_research') || t('hero.researchBtn')}
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 animate-pulse-slow"
            >
                <ChevronDown size={32} />
            </motion.div>
        </section>
    );
};

export default Hero;
