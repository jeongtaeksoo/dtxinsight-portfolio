import React from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
    dob: CalendarDays,
    military: ShieldCheck,
    location: MapPin
};

const ProfileDetails = () => {
    const { t } = useTranslation();
    const items = t('profile.items', { returnObjects: true }) || [];

    return (
        <section id="profile" className="py-20 bg-background relative z-10 border-y border-white/5">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold">{t('profile.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {items.map((item, index) => {
                        const Icon = iconMap[item.key] || CalendarDays;
                        return (
                            <motion.div
                                key={item.key || index}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-5 rounded-2xl bg-surface/60 border border-white/5"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="p-2 rounded-lg bg-white/5 text-primary">
                                        <Icon size={18} />
                                    </span>
                                    <span className="text-xs uppercase tracking-wider text-muted">{item.label}</span>
                                </div>
                                <p className="text-sm font-medium text-white leading-relaxed">{item.value}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProfileDetails;
