import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const WindowCard = ({ title, type, date, children, onClick, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`group bg-surface border border-border rounded-xl overflow-hidden transition-all cursor-pointer flex flex-col hover:border-primary hover:shadow-md ${className}`}
            onClick={onClick}
        >
            {/* Card Header */}
            <div className="px-5 pt-5 flex items-center justify-between gap-2">
                {type && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-bg text-primary shrink-0">
                        {type}
                    </span>
                )}
                {date && (
                    <span className="text-xs text-muted ml-auto">{date}</span>
                )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-base font-semibold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <div className="text-sm text-muted leading-relaxed flex-grow">
                    {children}
                </div>

                <div className="mt-4 pt-3 border-t border-border flex justify-end">
                    <ArrowUpRight size={14} className="text-muted group-hover:text-primary transition-colors" />
                </div>
            </div>
        </motion.div>
    );
};

export default WindowCard;
