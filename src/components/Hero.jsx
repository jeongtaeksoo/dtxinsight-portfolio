import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { OrcidIcon } from './Icons';
import profileImg from '../assets/profile_id_photo.jpeg';

const Hero = () => {
  const { t } = useTranslation();
  const stats = t('hero.stats', { returnObjects: true }) || [];
  const focusItems = t('hero.focusItems', { returnObjects: true }) || [];
  const currentAffiliation = {
    line1: t('hero.affiliationCurrentLine1'),
    line2: t('hero.affiliationCurrentLine2'),
    meta: t('hero.affiliationCurrentMeta'),
    note: t('hero.affiliationCurrentNote'),
    previous: t('hero.affiliationPrevious'),
  };

  return (
    <section id="top" className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:gap-14">
        <Motion.div
          className="order-2 lg:order-1"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {t('hero.eyebrow')}
          </p>

          <h1 className="max-w-3xl text-3xl font-bold leading-[1.12] text-text md:text-5xl text-balance">
            {t('hero.tagline')}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
            {t('hero.summary')}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {focusItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1.5 text-sm font-medium text-text shadow-sm"
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
                document.querySelector('#innovation')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
            >
              {t('hero.primaryCta')}
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-primary hover:text-primary"
            >
              <Mail size={16} />
              {t('hero.secondaryCta')}
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-white px-5 py-4 shadow-sm"
              >
                <p className="text-xl font-bold text-text md:text-2xl">{stat.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </Motion.div>

        <Motion.div
          className="relative order-1 mx-auto w-full max-w-[300px] lg:order-2 lg:max-w-[320px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-primary/12 via-sky-500/10 to-emerald-400/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-white p-4 shadow-xl">
            <div className="overflow-hidden rounded-[28px] bg-slate-900/5">
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

            <div className="mt-4 rounded-2xl border border-border bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                {t('hero.profileLabel')}
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <h2 className="inline-flex items-start gap-1.5 text-2xl font-semibold text-text">
                  <span>{t('hero.name')}</span>
                  <span
                    className="mt-0.5 inline-flex rounded-full border border-primary/20 bg-primary/8 px-1.5 py-0.5 text-[10px] font-bold leading-none tracking-[0.12em] text-primary"
                    title="Registered Nurse"
                    aria-label="Registered Nurse"
                  >
                    RN
                  </span>
                </h2>
                <a
                  href="https://orcid.org/0009-0001-1451-5457"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-text transition-colors hover:border-primary hover:text-primary"
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
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;
