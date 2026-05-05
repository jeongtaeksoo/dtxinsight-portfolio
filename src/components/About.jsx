import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const pillars = t('about.pillars', { returnObjects: true }) || [];
  const collaborationItems = t('about.collaborationItems', { returnObjects: true }) || [];

  return (
    <section id="about" className="scroll-mt-28 border-t border-border py-16">
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
            {t('about.eyebrow')}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-text md:text-4xl text-balance">
            {t('about.title')}
          </h2>
        </div>

        <div className="space-y-6">
          <p className="text-xl leading-9 text-text md:text-2xl">
            {t('about.description1')}
          </p>
          <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            {t('about.description2')}
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="divide-y divide-border border-y border-border">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="grid gap-3 py-5 md:grid-cols-[180px_minmax(0,1fr)]"
            >
              <p className="text-sm font-semibold text-primary">{pillar.title}</p>
              <p className="text-sm leading-7 text-muted">{pillar.description}</p>
            </div>
          ))}
        </div>

        <aside className="border-l border-border pl-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
            {t('about.collaborationTitle')}
          </p>
          <div className="mt-5 space-y-4">
            {collaborationItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <p className="text-sm leading-relaxed text-text">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default About;
