import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Coffee } from 'lucide-react';
import { OrcidIcon } from './Icons';
import profileImg from '../assets/profile_id_photo.webp';

const getScrollBehavior = () => (
  typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'
);

const Hero = () => {
  const { t } = useTranslation();
  const focusItems = t('hero.focusItems', { returnObjects: true }) || [];
  const stats = t('hero.stats', { returnObjects: true }) || [];
  const topicTags = t('hero.topicTags', { returnObjects: true }) || [];
  const currentAffiliation = {
    line1: t('hero.affiliationCurrentLine1'),
    line2: t('hero.affiliationCurrentLine2'),
    meta: t('hero.affiliationCurrentMeta'),
    note: t('hero.affiliationCurrentNote'),
    previous: t('hero.affiliationPrevious'),
  };
  const scrollToSection = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: getScrollBehavior() });
  };

  return (
    <section id="top" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:gap-16">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            {t('hero.eyebrow')}
          </p>

          <div className="mb-5">
            <h1 className="text-4xl font-bold leading-none text-text sm:text-5xl md:text-7xl">
              {t('hero.name')}
            </h1>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              {t('hero.romanizedName')}
            </p>
          </div>

          <p className="mb-4 text-sm font-semibold text-primary">
            {t('hero.role')}
          </p>

          <p className="mb-5 text-sm font-semibold text-muted">
            {t('hero.identityLine')}
          </p>

          <h2 className="max-w-3xl text-3xl font-bold leading-[1.12] text-text md:text-5xl text-balance">
            {t('hero.tagline')}
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            {t('hero.summary')}
          </p>

          <p className="mt-5 max-w-2xl border-l-2 border-primary/40 pl-4 text-sm font-medium leading-7 text-text">
            {t('hero.audience')}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {focusItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-text"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#innovation"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#innovation');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              {t('hero.primaryCta')}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              <Coffee size={16} />
              {t('hero.secondaryCta')}
            </a>
          </div>

          <div className="mt-10 border-y border-border py-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {t('hero.proofLabel')}
            </p>
            <div className="grid gap-5 md:grid-cols-3">
              {stats.map((item) => (
                <div key={`${item.value}-${item.label}`}>
                  <p className="text-2xl font-bold text-text md:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            {topicTags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4">
                {topicTags.map((tag) => (
                  <span key={tag} className="text-xs font-semibold leading-5 text-primary/80">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[300px] lg:max-w-[320px]">
          <div className="relative border-l border-border pl-5">
            <div className="overflow-hidden rounded-[18px] bg-slate-900/5">
              <img
                src={profileImg}
                alt={t('hero.name')}
                width="600"
                height="800"
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                {t('hero.profileLabel')}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <h3 className="inline-flex items-start gap-1.5 text-2xl font-semibold text-text">
                  <span>{t('hero.name')}</span>
                  <span
                    className="mt-0.5 inline-flex rounded-full border border-primary/20 bg-primary/8 px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-[0.12em] text-primary"
                    title="Registered Nurse"
                    aria-label="Registered Nurse"
                  >
                    RN
                  </span>
                </h3>
                <a
                  href="https://orcid.org/0009-0001-1451-5457"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <OrcidIcon size={15} />
                  {t('hero.orcidCta')}
                </a>
              </div>
              <div className="mt-3 space-y-3">
                <div>
                  <p className="text-sm font-semibold leading-relaxed text-text">
                    {currentAffiliation.line1}
                  </p>
                  <p className="text-sm font-semibold leading-relaxed text-text">
                    {currentAffiliation.line2}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <p className="text-sm leading-relaxed text-muted">
                      {currentAffiliation.note}
                    </p>
                    {currentAffiliation.meta ? (
                      <span className="text-xs font-semibold text-primary/80">
                        {currentAffiliation.meta}
                      </span>
                    ) : null}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {currentAffiliation.previous}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
