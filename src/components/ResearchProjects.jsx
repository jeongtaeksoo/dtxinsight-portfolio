import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

const ProjectArticle = ({ project, metaLabels, evidenceCta }) => (
    <article
        className="grid gap-5 py-7 lg:grid-cols-[140px_minmax(0,1fr)_220px]"
    >
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {metaLabels.year}
            </p>
            <p className="mt-2 text-sm font-semibold text-primary">{project.year}</p>
        </div>

        <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold leading-snug text-text break-words">
                {project.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">{project.description}</p>
            <p className="mt-3 border-l-2 border-primary/30 pl-3 text-sm leading-7 text-text">
                {project.proof}
            </p>
        </div>

        <div className="lg:text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {metaLabels.role}
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-text">{project.role}</p>
            {project.evidenceLink ? (
                <a
                    href={project.evidenceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-primary transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    {project.evidenceLabel || evidenceCta}
                    <ArrowUpRight size={13} />
                </a>
            ) : null}
        </div>
    </article>
);

const ProjectGroup = ({ label, projects, metaLabels, evidenceCta }) => {
    if (projects.length === 0) {
        return null;
    }

    return (
        <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
                {label}
            </h3>
            <div className="mt-4 divide-y divide-border border-y border-border">
                {projects.map((project) => (
                    <ProjectArticle
                        key={`${project.year}-${project.title}`}
                        project={project}
                        metaLabels={metaLabels}
                        evidenceCta={evidenceCta}
                    />
                ))}
            </div>
        </div>
    );
};

const ResearchProjects = () => {
    const { t } = useTranslation();

    const projects = (t('research.projects', { returnObjects: true }) || []);
    const intro = t('research.intro');
    const metaLabels = t('research.metaLabels', { returnObjects: true }) || {};
    const featuredProjects = projects.slice(0, 2);
    const policyProjects = projects.slice(2, 3);

    return (
        <section id="research" className="scroll-mt-28 border-t border-border py-16">
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                        {t('research.eyebrow')}
                    </p>
                    <h2 className="text-3xl font-bold leading-tight text-text md:text-4xl">
                        {t('research.title')}
                    </h2>
                </div>

                {intro ? (
                    <p className="max-w-3xl text-base leading-8 text-muted md:text-lg">
                        {intro}
                    </p>
                ) : null}
            </div>

            <ProjectGroup
                label={t('research.featuredLabel')}
                projects={featuredProjects}
                metaLabels={metaLabels}
                evidenceCta={t('research.evidenceCta')}
            />

            <ProjectGroup
                label={t('research.policyLabel')}
                projects={policyProjects}
                metaLabels={metaLabels}
                evidenceCta={t('research.evidenceCta')}
            />
        </section>

    );
};

export default ResearchProjects;
