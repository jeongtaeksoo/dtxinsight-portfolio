import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Lightbulb, Cog, BarChart3 } from 'lucide-react';

const iconMap = { Search, Lightbulb, Cog, BarChart3 };
const defaultIcons = [Search, Lightbulb, Cog, BarChart3];

const defaultSteps = [
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
        desc: "프로젝트 목적에 따라 다음 요소들을 통합적으로 설계합니다.\n\n• 임상시험 운영 및 데이터 흐름 구조\n• 사용자 경험을 고려한 디지털 인터페이스\n• AI/자동화 모델 설계 및 적용\n• 조직 내 협업 및 커뮤니케이션 플로우\n• 프로세스 최적화 및 오류 예방 시스템"
    },
    {
        id: 'impact',
        icon: 'BarChart3',
        title: "성과 검증 및 개선 (Impact Validation)",
        desc: "솔루션의 효과를 데이터로 검증하고, 정량·정성 평가를 기반으로 개선 사항을 도출합니다.\n\n• 사용자·환자·의료진 피드백\n• 프로세스 안정성 평가\n• 재현성과 확장성 검토"
    },
];

const NarrativeScroll = () => {
    const { t } = useTranslation();
    const steps = t('journey.steps', { returnObjects: true }) || defaultSteps;

    return (
        <section className="py-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-text mb-3">
                    {t('journey.title') || 'My Approach'}
                </h2>
                <p className="text-muted">
                    {t('journey.subtitle') || 'From Identification to Innovation'}
                </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-10">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                            ? (iconMap[step.icon] || defaultIcons[index])
                            : defaultIcons[index];

                        return (
                            <motion.div
                                key={step.id || index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="relative pl-16"
                            >
                                {/* Icon badge */}
                                <div className="absolute left-0 w-12 h-12 rounded-full bg-accent-bg border border-primary/20 flex items-center justify-center">
                                    <Icon size={20} className="text-primary" />
                                </div>

                                <div className="bg-surface border border-border rounded-xl p-6 hover:border-primary transition-colors">
                                    <p className="text-xs font-mono text-primary mb-2 uppercase tracking-widest">
                                        0{index + 1}
                                    </p>
                                    <h3 className="text-lg font-semibold text-text mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default NarrativeScroll;
