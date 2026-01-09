import React from 'react';
import { useTranslation } from 'react-i18next';
import WindowCard from './WindowCard';

const ResearchProjects = () => {
    const { t } = useTranslation();

    const projects = (t('research.projects', { returnObjects: true }) || []);
    const labels = t('research.labels', { returnObjects: true }) || {};

    return (
        <section id="research" className="py-20 bg-background relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold">{t('research.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>

                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <WindowCard
                            key={index}
                            title={project.title}
                            type={project.category}
                            date={project.date}
                            className="h-full"
                        >
                            {project.summary && (
                                <p className="text-sm text-muted mb-4">{project.summary}</p>
                            )}

                            {Array.isArray(project.achievements) && project.achievements.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-[11px] uppercase tracking-widest text-primary font-semibold">
                                        {labels.achievements || 'Key Achievements'}
                                    </p>
                                    <ul className="mt-2 space-y-1 text-xs text-muted list-disc list-inside">
                                        {project.achievements.map((item, itemIndex) => (
                                            <li key={`${project.title}-achievement-${itemIndex}`}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {Array.isArray(project.responsibilities) && project.responsibilities.length > 0 && (
                                <div>
                                    <p className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
                                        {labels.responsibilities || 'Key Responsibilities'}
                                    </p>
                                    <ul className="mt-2 space-y-1 text-xs text-muted list-disc list-inside">
                                        {project.responsibilities.map((item, itemIndex) => (
                                            <li key={`${project.title}-responsibility-${itemIndex}`}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </WindowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchProjects;
