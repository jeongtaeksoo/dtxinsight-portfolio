import React from 'react';
import { useTranslation } from 'react-i18next';
import WindowCard from './WindowCard';

const ResearchProjects = () => {
    const { t } = useTranslation();

    const projects = (t('research.projects', { returnObjects: true }) || []);
    const featuredProjects = projects.slice(0, 2);
    const policyProject = projects[2];
    const signalItems = t('research.signalItems', { returnObjects: true }) || [];

    return (
        <section id="research" className="scroll-mt-28 py-16">
            <div>
                <div className="flex items-center gap-4 mb-10">
                    <h2 className="text-3xl font-bold text-text">{t('research.title')}</h2>
                    <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent"></div>
                </div>

                <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
                    {t('research.intro')}
                </p>

                <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_360px]">
                    <div>
                        <div className="mb-4">
                            <span className="inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                                {t('research.featuredLabel')}
                            </span>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {featuredProjects.map((project, index) => (
                                <WindowCard
                                    key={index}
                                    title={project.title}
                                    type={project.category}
                                    className="h-full"
                                >
                                    <p dangerouslySetInnerHTML={{ __html: project.description }} />
                                </WindowCard>
                            ))}
                        </div>
                    </div>

                    {policyProject && (
                        <aside className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                                {t('research.policyLabel')}
                            </p>
                            <h3 className="mt-3 text-xl font-semibold leading-snug text-text">
                                {policyProject.title}
                            </h3>
                            <p className="mt-2 text-sm font-medium text-primary">
                                {policyProject.category}
                            </p>
                            <div
                                className="mt-4 text-sm leading-7 text-muted"
                                dangerouslySetInnerHTML={{ __html: policyProject.description }}
                            />

                            <div className="mt-6 border-t border-border pt-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                                    {t('research.signalTitle')}
                                </p>
                                <ul className="mt-4 space-y-3">
                                    {signalItems.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text">
                                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </section>

    );
};

export default ResearchProjects;
