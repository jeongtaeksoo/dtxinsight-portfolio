import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
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
  const currentAffiliation = {
    line1: t('hero.affiliationCurrentLine1'),
    line2: t('hero.affiliationCurrentLine2'),
    note: t('hero.affiliationCurrentNote'),
    previous: t('hero.affiliationPrevious'),
  };
  const scrollToSection = (selector) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: getScrollBehavior() });
  };

  return (
    <section id="top" className="pt-24 pb-14 md:pt-32 md:pb-20">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-24">
        <div className="max-w-4xl">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            {t('hero.eyebrow')}
          </p>

          <div className="border-y border-border py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold leading-none text-text md:text-4xl">
                  {t('hero.name')}
                </h1>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  {t('hero.romanizedName')}
                </p>
              </div>
              <div className="text-sm font-semibold text-primary sm:text-right">
                <p>{t('hero.role')}</p>
                <p className="mt-1 text-xs font-medium text-muted">{t('hero.identityLine')}</p>
              </div>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-base leading-8 text-muted">
            {t('hero.summary')}
          </p>
          <p className="mt-5 max-w-2xl text-sm font-medium leading-7 text-text">
            {t('hero.audience')}
          </p>

          {focusItems.length > 0 ? (
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {focusItems.join(' / ')}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#innovation"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#innovation');
              }}
              className="inline-flex items-center gap-2 border-b border-text pb-1 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
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
              className="inline-flex items-center gap-2 pb-1 text-sm font-semibold text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              {t('hero.secondaryCta')}
            </a>
          </div>

        </div>

        <aside className="relative mx-auto w-full max-w-[220px] lg:mt-20 lg:max-w-[240px]">
          <div>
            <div className="overflow-hidden rounded-xl bg-slate-900/5">
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

            <div className="mt-4 border-t border-border pt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {t('hero.profileLabel')}
                </p>
                <a
                  href="https://orcid.org/0009-0001-1451-5457"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-text transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <OrcidIcon size={13} />
                  {t('hero.orcidCta')}
                </a>
              </div>
              <div className="mt-3 space-y-1.5">
                {currentAffiliation.line1 ? (
                  <p className="text-sm font-semibold leading-relaxed text-text">
                    {currentAffiliation.line1}
                  </p>
                ) : null}
                {currentAffiliation.line2 ? (
                  <p className="text-sm font-semibold leading-relaxed text-text">
                    {currentAffiliation.line2}
                  </p>
                ) : null}
                {currentAffiliation.note ? (
                  <p className="text-sm leading-relaxed text-muted">
                    {currentAffiliation.note}
                  </p>
                ) : null}
                {currentAffiliation.previous ? (
                  <p className="pt-2 text-xs leading-relaxed text-muted">
                    {currentAffiliation.previous}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
