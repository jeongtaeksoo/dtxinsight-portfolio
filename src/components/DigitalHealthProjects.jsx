import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

const DigitalHealthProjects = () => {
  const { t } = useTranslation();
  const featureTitles = t('innovation.featureTitles', { returnObjects: true }) || [];
  const featureList = t('innovation.features', { returnObjects: true }) || [];
  const proofItems = t('innovation.proofItems', { returnObjects: true }) || [];

  return (
    <section id="innovation" className="scroll-mt-28 border-t border-border py-16">
      <div className="rounded-[36px] border border-border bg-gradient-to-br from-accent-bg via-white to-sky-50/70 px-6 py-8 shadow-sm md:px-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:gap-10">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              {t('innovation.label')}
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-text md:text-4xl text-balance">
              {t('innovation.title')}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
              {t('innovation.description')}
            </p>

            <a
              href="https://hwiwasoo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              {t('innovation.cta')}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <aside className="rounded-[28px] border border-border bg-white px-6 py-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
              {t('innovation.proofTitle')}
            </p>
            <div className="mt-4 space-y-3">
              {proofItems.map((item) => (
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
          {featureList.map((feature, index) => (
            <div
              key={feature}
              className="rounded-[24px] border border-border bg-white px-5 py-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">
                {featureTitles[index] || `Feature ${index + 1}`}
              </p>
              <p className="mt-3 text-sm leading-7 text-text">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalHealthProjects;
