import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Code, LineChart, Microscope, Stethoscope, MessageCircle, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const skillDetails = [
    { Icon: Stethoscope, key: 'clinical' },
    { Icon: Code, key: 'vibecording' },
    { Icon: LineChart, key: 'data' },
    { Icon: Microscope, key: 'design' },
    { Icon: MessageCircle, key: 'comm' },
    { Icon: Brain, key: 'ai' },
];

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section id="capabilities" className="scroll-mt-28 border-t border-border py-16">
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                        {t('skills.eyebrow')}
                    </p>
                    <h2 className="text-3xl font-bold leading-tight text-text md:text-4xl text-balance">
                        {t('skills.title')}
                    </h2>
                </div>
                <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
                    {t('skills.intro')}
                </p>
            </div>

            <div className="mt-10 divide-y divide-border border-y border-border">
                {skillDetails.map(({ Icon: SkillIcon, key }, index) => (
                    <Motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                        className="grid gap-4 py-5 md:grid-cols-[48px_220px_minmax(0,1fr)] md:items-start"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-white">
                            {React.createElement(SkillIcon, { size: 20, className: 'text-primary', strokeWidth: 1.5 })}
                        </div>
                        <p className="font-semibold text-text">{t(`skills.items.${key}`)}</p>
                        <p className="text-sm text-muted leading-7">{t(`skills.descriptions.${key}`)}</p>
                    </Motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
