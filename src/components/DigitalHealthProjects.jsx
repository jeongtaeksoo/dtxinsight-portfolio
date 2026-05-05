import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';

const DigitalHealthProjects = () => {
  const { t } = useTranslation();
  const featureTitles = t('innovation.featureTitles', { returnObjects: true }) || [];
  const featureList = t('innovation.features', { returnObjects: true }) || [];
  const proofItems = t('innovation.proofItems', { returnObjects: true }) || [];
  const caseRows = [
    { label: t('innovation.problemLabel'), value: t('innovation.problem') },
    { label: t('innovation.roleLabel'), value: t('innovation.role') },
    { label: t('innovation.outcomeLabel'), value: t('innovation.outcome') },
  ];

  return (
    <section id="innovation" className="scroll-mt-28 border-t border-border py-16">
      <div className="border-y border-border bg-white/60 py-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_360px] lg:gap-14">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              {t('innovation.label')}
            </p>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight text-text md:text-5xl text-balance">
              {t('innovation.title')}
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-muted md:text-lg">
              {t('innovation.description')}
            </p>

            <div className="mt-9 divide-y divide-border border-y border-border">
              {caseRows.map((row) => (
                <div key={row.label} className="grid gap-3 py-5 md:grid-cols-[120px_minmax(0,1fr)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
                    {row.label}
                  </p>
                  <p className="text-sm leading-7 text-text">{row.value}</p>
                </div>
              ))}
            </div>

            <a
              href="https://hwiwasoo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              {t('innovation.cta')}
              <ArrowUpRight size={16} />
            </a>
          </div>

          <aside className="border-l border-border pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              {t('innovation.proofTitle')}
            </p>
            <div className="mt-5 space-y-4">
              {proofItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-relaxed text-text">{item}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border-y border-border bg-border md:grid-cols-3">
          {featureList.map((feature, index) => (
            <div
              key={feature}
              className="bg-background px-5 py-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/70">
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
