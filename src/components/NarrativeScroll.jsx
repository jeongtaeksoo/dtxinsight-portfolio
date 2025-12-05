import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Lightbulb, Workflow, Trophy } from 'lucide-react';

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
                <p className="text-muted text-lg leading-relaxed">
                    {desc}
                </p>
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

    const steps = [
        {
            id: 'problem',
            icon: AlertCircle,
            title: "The Problem",
            desc: "The global aging population faces a 'Silver Tsunami,' but traditional cognitive assessments are intermittent, subjective, and lack real-world relevance."
        },
        {
            id: 'hypothesis',
            icon: Lightbulb,
            title: "The Hypothesis",
            desc: "By observing continuous, passive interactions with everyday digital devices, we can detect subtle cognitive decline earlier than clinical tests."
        },
        {
            id: 'solution',
            icon: Workflow,
            title: "The Solution",
            desc: "Designed 'Context-Aware' AI agents (Coach, Teacher, Companion) that embed cognitive training into daily digital routines without friction."
        },
        {
            id: 'impact',
            icon: Trophy,
            title: "The Impact",
            desc: "Achieved 91.2% interaction accuracy in clinical trials and demonstrated statistically significant improvements in memory and executive function."
        }
    ];

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
                    <h2 className="text-4xl font-bold mb-4 text-white">My Research Journey</h2>
                    <p className="text-muted text-lg">From Identification to Innovation</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-32">
                    {steps.map((step, index) => (
                        <NarrativeStep
                            key={step.id}
                            index={index}
                            icon={step.icon}
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
