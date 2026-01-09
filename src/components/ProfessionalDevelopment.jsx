import React from 'react';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfessionalDevelopment = () => {
    const { t } = useTranslation();

    const educationData = t('professional.education', { returnObjects: true });
    const education = educationData && typeof educationData === 'object' && !Array.isArray(educationData) ? educationData : {};
    const certificationsData = t('professional.certifications.items', { returnObjects: true });
    const certifications = Array.isArray(certificationsData) ? certificationsData : [];
    const conferencesData = t('professional.conferences.items', { returnObjects: true });
    const conferences = Array.isArray(conferencesData) ? conferencesData : [];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Education Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <GraduationCap size={28} />
                            </div>
                            <h2 className="text-2xl font-bold">{t('professional.education.title')}</h2>
                        </div>
                        <div className="p-6 rounded-2xl bg-surface/30 border border-white/5 hover:border-primary/20 transition-all duration-300">
                            <h3 className="text-xl font-bold text-white mb-1">{education.school}</h3>
                            <p className="text-primary font-medium mb-3">{education.degree}</p>
                            <span className="text-sm text-muted">{education.date}</span>
                        </div>
                    </motion.div>

                    {/* Certifications Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex-[1.5]"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                                <Award size={28} />
                            </div>
                            <h2 className="text-2xl font-bold">{t('professional.certifications.title')}</h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {certifications.map((item, index) => (
                                <div key={index} className="p-5 rounded-2xl bg-surface/30 border border-white/5 hover:border-secondary/20 transition-all duration-300">
                                    <h3 className="font-bold text-white mb-1">{item.name}</h3>
                                    <p className="text-sm text-secondary mb-2">{item.issuer}</p>
                                    <span className="text-xs text-muted">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Conferences Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex-1"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-accent/10 text-accent">
                                <Users size={28} />
                            </div>
                            <h2 className="text-2xl font-bold">{t('professional.conferences.title')}</h2>
                        </div>
                        <div className="space-y-4">
                            {conferences.map((item, index) => (
                                <div key={index} className="p-5 rounded-2xl bg-surface/30 border border-white/5 hover:border-accent/20 transition-all duration-300">
                                    <h3 className="font-bold text-white mb-2">{item.name}</h3>
                                    <span className="text-sm text-muted">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProfessionalDevelopment;
