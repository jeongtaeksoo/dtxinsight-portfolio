import React from 'react';
import { motion } from 'framer-motion';
import { Code, LineChart, Microscope, Stethoscope, MessageCircle, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const skillDetails = [
    { Icon: Stethoscope, key: 'clinical', desc: '다기관 RCT 운영 및 프로토콜 설계' },
    { Icon: Code,        key: 'vibecording', desc: '바이브코딩 기반 프로토타이핑 및 자동화 구현' },
    { Icon: LineChart,   key: 'data',     desc: 'SPSS, Python 기반 임상 데이터 분석' },
    { Icon: Microscope,  key: 'design',   desc: '임상시험 및 실증 연구 설계' },
    { Icon: MessageCircle, key: 'comm',   desc: '다기관 이해관계자 조정 및 보고' },
    { Icon: Brain,       key: 'ai',       desc: '생성형 AI 기반 디지털 치료제 연구' },
];

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section className="py-16">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('skills.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillDetails.map(({ Icon, key, desc }, index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                        className="flex items-start gap-4 p-5 bg-surface border border-border rounded-xl hover:border-primary transition-colors"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-bg flex items-center justify-center">
                            <Icon size={20} className="text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="font-semibold text-text text-sm">{t(`skills.items.${key}`)}</p>
                            <p className="text-xs text-muted mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
