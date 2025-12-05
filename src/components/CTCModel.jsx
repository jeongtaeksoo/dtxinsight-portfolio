import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Brain, Heart, GraduationCap, X } from 'lucide-react';

const CTCModel = () => {
    const { t } = useTranslation();
    const [activeNode, setActiveNode] = useState(null);

    const nodes = [
        {
            id: 'coach',
            title: 'Coach',
            icon: <Brain size={40} />,
            color: 'bg-indigo-600',
            desc: "Goal-oriented motivation & monitoring",
            detail: "Analyzes performance data to set adaptive goals and provide feedback.",
            dialog: "Coach: 'Your reaction time has improved by 15% this week. Let's try Level 5.'"
        },
        {
            id: 'teacher',
            title: 'Teacher',
            icon: <GraduationCap size={40} />,
            color: 'bg-emerald-600',
            desc: "Instruction & Cognitive Strategies",
            detail: "Teaches specific memory strategies (e.g., chunking, visualization).",
            dialog: "Teacher: 'Try grouping these items by category to remember them better.'"
        },
        {
            id: 'companion',
            title: 'Companion',
            icon: <Heart size={40} />,
            color: 'bg-rose-500',
            desc: "Emotional Support & Engagement",
            detail: "Provides empathy and encourages usage through friendly conversation.",
            dialog: "Companion: 'You worked hard today! How are you feeling?'"
        }
    ];

    return (
        <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center bg-surface/30 backdrop-blur-md rounded-2xl border border-white/10 p-8 my-12 overflow-hidden md:overflow-visible scale-90 md:scale-100 origin-center">

            {/* Context Flow Background Animation */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-[800px] h-[800px] bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            {/* Central Hub */}
            <div className="absolute z-10 text-center">
                <div className="w-32 h-32 bg-surface border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-sm font-mono text-muted">Context<br />Engine</span>
                </div>
            </div>

            {/* Orbiting Nodes */}
            {nodes.map((node, index) => {
                // Calculate position in a triangle
                const angle = (index * 120 - 90) * (Math.PI / 180);
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                    <motion.button
                        key={node.id}
                        className={`absolute w-24 h-24 rounded-full ${node.color} flex flex-col items-center justify-center text-white shadow-lg z-20 hover:scale-110 transition-transform`}
                        style={{ x, y }} // Initial static position, could animate orbit
                        animate={{
                            y: [y - 10, y + 10, y - 10],
                            x: [x - 5, x + 5, x - 5]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: index * 1.5,
                            ease: "easeInOut"
                        }}
                        onClick={() => setActiveNode(node)}
                    >
                        {node.icon}
                        <span className="text-xs font-bold mt-1">{node.title}</span>
                    </motion.button>
                );
            })}

            {/* Connecting Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {nodes.map((node, index) => {
                    const angle = (index * 120 - 90) * (Math.PI / 180);
                    const radius = 180;
                    const x = 50 + (Math.cos(angle) * radius / 400 * 50); // Normalized to % roughly or use pixels if viewing box matches
                    // Hard to align SVG exactly with centered absolute divs without refs, using simple centralization line
                    // Simplified: Lines from Center (50%, 50%) to Node
                    return (
                        <motion.line
                            key={`line-${index}`}
                            x1="50%" y1="50%"
                            x2={`${50 + Math.cos(angle) * 35}%`}
                            y2={`${50 + Math.sin(angle) * 35}%`}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                        />
                    );
                })}
            </svg>

            {/* Detail Modal Overlay */}
            <AnimatePresence>
                {activeNode && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-30 flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setActiveNode(null)}
                    >
                        <div
                            className="bg-surface border border-white/20 p-6 rounded-xl max-w-sm w-full text-left shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${activeNode.color}`}>{activeNode.icon}</div>
                                    <div>
                                        <h3 className="text-xl font-bold">{activeNode.title} Agent</h3>
                                        <p className="text-xs text-muted">{activeNode.desc}</p>
                                    </div>
                                </div>
                                <button onClick={() => setActiveNode(null)} className="text-muted hover:text-white"><X size={20} /></button>
                            </div>

                            <p className="text-sm mb-4 leading-relaxed">{activeNode.detail}</p>

                            <div className="bg-black/30 p-3 rounded-lg border-l-2 border-primary">
                                <p className="text-xs font-mono text-emerald-400">"{activeNode.dialog}"</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default CTCModel;
