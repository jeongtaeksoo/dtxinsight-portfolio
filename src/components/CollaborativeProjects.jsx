import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
// import brandLogo from '../assets/whiwasoo_logo.png'; // Assuming logo exists or use placeholder

const CollaborativeProjects = () => {
    const { t } = useTranslation();

    return (
        <section className="relative z-10 w-full px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Users className="text-primary" size={32} />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Collaborative Project
                    </span>
                </h2>
            </div>

            <motion.div
                whileHover={{ y: -5, boxShadow: "0 20px 50px -12px rgba(117, 100, 255, 0.25)" }}
                className="w-full max-w-4xl mx-auto bg-card backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-lg transition-all"
            >
                {/* Left: Brand Logo Area */}
                <div className="w-full md:w-1/3 flex justify-center border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-10">
                    <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center relative overflow-hidden group">
                        {/* Placeholder for Whiwasoo Logo */}
                        <span className="text-2xl font-bold text-white tracking-widest group-hover:scale-110 transition-transform duration-500">WHIWASO</span>
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
                    </div>
                </div>

                {/* Right: Text Content */}
                <div className="w-full md:w-2/3 text-center md:text-left space-y-4">
                    <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs font-mono rounded-full mb-2">
                        Global Research Partnership
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        {t('collaborative.partner_name') || "Geonhui Hwang, Ph.D. Candidate"}
                    </h3>
                    <p className="text-primary font-medium text-lg">
                        Hokkaido University, Japan
                    </p>
                    <p className="text-muted leading-relaxed mt-4">
                        {t('collaborative.description') || "Co-designing AI applications for cognitive activation in older adults. Our joint research focuses on bridging the gap between clinical requirements and engineering solutions."}
                    </p>

                    <button className="mt-6 px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm text-white/80">
                        View Joint Research &rarr;
                    </button>
                </div>
            </motion.div>
        </section>
    );
};

export default CollaborativeProjects;
