import React from 'react';
import { useTranslation } from 'react-i18next';
import WindowCard from './WindowCard';

const ResearchProjects = () => {
    const { t } = useTranslation();

    const projects = (t('research.projects', { returnObjects: true }) || []);

    return (
        <section id="research" className="py-20 bg-background relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold">{t('research.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>

                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <WindowCard
                            key={index}
                            title={project.title}
                            type={project.category}
                            className="h-full"
                        >
                            <p>{project.description}</p>
                        </WindowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ResearchProjects;
