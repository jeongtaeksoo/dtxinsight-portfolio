import React from 'react';
import { useTranslation } from 'react-i18next';
import WindowCard from './WindowCard';
import { sanitizeInlineHtml } from '../utils/sanitizeHtml';

const ResearchProjects = () => {
    const { t } = useTranslation();

    const projects = (t('research.projects', { returnObjects: true }) || []);
    const intro = t('research.intro');

    return (
        <section id="research" className="scroll-mt-28 py-16">
            <div>
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold text-text">{t('research.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent"></div>
                </div>

                {intro ? (
                    <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
                        {intro}
                    </p>
                ) : null}

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project, index) => (
                        <WindowCard
                            key={index}
                            title={project.title}
                            type={project.category}
                            className="h-full"
                        >
                            <p dangerouslySetInnerHTML={{ __html: sanitizeInlineHtml(project.description) }} />
                        </WindowCard>
                    ))}
                </div>
            </div>
        </section>

    );
};

export default ResearchProjects;
