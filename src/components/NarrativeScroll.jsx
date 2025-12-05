import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Lightbulb, Cog, BarChart3 } from 'lucide-react';

const NarrativeStep = ({ icon: Icon, title, desc, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", once: false });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0.1, x: index % 2 === 0 ? -50 : 50 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center gap-8 py-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
        >
            <div className="flex-1 flex justify-center">
                <div className={`w-32 h-32 rounded-full flex items-center justify-center bg-surface border border-primary/30 shadow-[0_0_30px_rgba(124,58,237,0.2)] ${isInView ? 'scale-110 shadow-[0_0_50px_rgba(124,58,237,0.5)]' : 'scale-100'} transition-all duration-700`}>
                    <Icon size={48} className="text-primary" />
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 justify-center md:justify-start">
                    <span className="text-primary/50 font-mono">0{index + 1}.</span> {title}
                </h3>
                <div className="text-muted text-lg leading-relaxed whitespace-pre-line">
                    {desc}
                </div>
            </div>
        </motion.div>
    );
};

const NarrativeScroll = () => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const steps = t('journey.steps', { returnObjects: true }) || [
        {
            id: 'problem',
            icon: 'Search',
            title: "문제 인식 (Problem Identification)",
            desc: "저는 어떤 프로젝트든 먼저 현장의 흐름과 이해관계자의 어려움을 관찰하는 것에서 시작합니다.\n데이터, 프로세스, 사용자 경험에서 드러나는 비효율을 정리하여\n\"정확히 무엇을 해결해야 하는가?\"를 명확히 규정합니다."
        },
        {
            id: 'hypothesis',
            icon: 'Lightbulb',
            title: "구조화·가설 설정 (Hypothesis & Structuring)",
            desc: "문제를 단순히 나열하는 것이 아니라,\n원인–과정–결과의 구조로 재해석해 검증 가능한 가설을 만듭니다.\n이 단계에서 임상적 통찰·데이터 패턴·운영적 제약을 모두 반영하여\n현실적인 방향성과 목표를 설정합니다."
        },
        {
            id: 'solution',
            icon: 'Cog',
            title: "솔루션 설계 및 실행 (Solution Design & Execution)",
            desc: "프로젝트 목적에 따라 다음 요소들을 통합적으로 설계합니다.\n\n• 임상시험 운영 및 데이터 흐름 구조\n• 사용자 경험을 고려한 디지털 인터페이스\n• AI/자동화 모델 설계 및 적용\n• 조직 내 협업 및 커뮤니케이션 플로우\n• 프로세스 최적화 및 오류 예방 시스템\n\n중요한 점은 단순한 아이디어가 아니라\n실제 현장에서 작동하는 구조를 만든다는 점입니다."
        },
        {
            id: 'impact',
            icon: 'BarChart3',
            title: "성과 검증 및 개선 (Impact Validation)",
            desc: "솔루션의 효과를 데이터로 검증하고, 정량·정성 평가를 기반으로 개선 사항을 도출합니다.\n\n• 통계 및 지표 기반 분석\n• 사용자·환자·의료진 피드백\n• 프로세스 안정성 평가\n• 재현성과 확장성 검토\n\n프로젝트가 \"완료되는 것\"이 아니라\n조직에 지속적인 가치를 만드는 것을 목표로 합니다."
        }
    ];

    const iconMap = {
        'Search': Search,
        'Lightbulb': Lightbulb,
        'Cog': Cog,
        'BarChart3': BarChart3
    };

    const defaultIcons = [Search, Lightbulb, Cog, BarChart3];

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background z-0 pointer-events-none" />

            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 z-0 hidden md:block" />
            <motion.div
                style={{ height: lineHeight }}
                className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary/0 via-primary to-primary/0 -translate-x-1/2 z-0 hidden md:block"
            />

            <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
                <div className="text-center mb-32">
                    <h2 className="text-4xl font-bold mb-4 text-white">{t('journey.title') || 'My Research Journey'}</h2>
                    <p className="text-muted text-lg">{t('journey.subtitle') || 'From Identification to Innovation'}</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-32">
                    {steps.map((step, index) => (
                        <NarrativeStep
                            key={step.id || index}
                            index={index}
                            icon={step.icon ? iconMap[step.icon] || defaultIcons[index] : defaultIcons[index]}
                            title={step.title}
                            desc={step.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NarrativeScroll;
