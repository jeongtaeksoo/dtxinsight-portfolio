import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Users, ExternalLink } from 'lucide-react';

const CollaborativeProjects = () => {
    const { t } = useTranslation();

    return (
        <section className="relative z-10 w-full px-4 py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold flex items-center justify-center gap-3">
                    <Users className="text-primary" size={28} />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {t('collaborative.sectionTitle') || 'Collaborative Project'}
                    </span>
                </h2>
            </div>

            <motion.a
                href="https://www.hwiwasoo.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, boxShadow: "0 15px 40px -10px rgba(117, 100, 255, 0.25)" }}
                className="block w-full max-w-2xl mx-auto bg-card backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 shadow-lg transition-all cursor-pointer group"
            >
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Left: Brand Logo Area */}
                    <div className="w-full md:w-1/3 flex justify-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                        <div className="w-28 h-28 bg-white/5 rounded-full flex items-center justify-center relative overflow-hidden">
                            <span className="text-lg font-bold text-white tracking-widest group-hover:scale-110 transition-transform duration-500">hwiwasoo</span>
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors"></div>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="w-full md:w-2/3 text-center md:text-left space-y-3">
                        {/* Project Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight flex items-center gap-2 justify-center md:justify-start">
                            {t('collaborative.projectTitle') || '휘와수 프로젝트'}
                            <ExternalLink size={14} className="text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>

                        {/* Subtitle - Research Base */}
                        <p className="text-primary font-medium text-sm">
                            {t('collaborative.subtitle') || 'Hokkaido University 기반 연구 협력 프로젝트'}
                        </p>

                        {/* Description */}
                        <p className="text-muted leading-relaxed text-xs md:text-sm">
                            {t('collaborative.description') || '고령자 친화적 인지 활성화를 위한 AI 애플리케이션 공동 설계'}
                        </p>
                    </div>
                </div>
            </motion.a>
        </section>
    );
};

export default CollaborativeProjects;
