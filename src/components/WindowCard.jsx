import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, X, Minus } from 'lucide-react';

const WindowCard = ({ title, type, date, children, onClick, className = "" }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`group bg-surface/80 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-primary/20 transition-all cursor-pointer flex flex-col ${className}`}
            onClick={onClick}
        >
            {/* Window Header */}
            <div className="h-8 bg-black/40 flex items-center justify-between px-3 border-b border-white/5">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[10px] font-mono text-muted uppercase tracking-wider flex items-center gap-2">
                    {type && <span className="text-primary">{type}</span>}
                    {date && <span className="opacity-50">{date}</span>}
                </div>
            </div>

            {/* Window Content */}
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <div className="text-sm text-muted leading-relaxed flex-grow">
                    {children}
                </div>

                {/* Footer/Action hint */}
                <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
                    <Maximize2 size={14} className="text-muted group-hover:text-white transition-colors" />
                </div>
            </div>
        </motion.div>
    );
};

export default WindowCard;
