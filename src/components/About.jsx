import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const pillars = t('about.pillars', { returnObjects: true }) || [];
  const collaborationItems = t('about.collaborationItems', { returnObjects: true }) || [];

  return (
    <section id="about" className="scroll-mt-28 border-t border-border py-16">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
          {t('about.eyebrow')}
        </p>
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-text text-balance">{t('about.title')}</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
        <div className="space-y-4">
          <p className="text-base leading-8 text-text/90 md:text-lg">
            {t('about.description1')}
          </p>
          <p className="text-sm leading-7 text-muted md:text-base">
            {t('about.description2')}
          </p>
        </div>

        <aside className="rounded-[28px] border border-border bg-white px-6 py-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
            {t('about.collaborationTitle')}
          </p>
          <div className="mt-4 space-y-3">
            {collaborationItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <p className="text-sm leading-relaxed text-text">{item}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-[24px] border border-border bg-white px-5 py-5 shadow-sm"
          >
            <p className="text-sm font-semibold text-text">{pillar.title}</p>
            <p className="mt-2 text-sm leading-7 text-muted">{pillar.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
