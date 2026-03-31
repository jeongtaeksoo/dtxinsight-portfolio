import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import profileImg from '../assets/profile_id_photo.png';

const Hero = () => {
  const { t } = useTranslation();
  const stats = t('hero.stats', { returnObjects: true }) || [];
  const focusItems = t('hero.focusItems', { returnObjects: true }) || [];

  return (
    <section id="top" className="pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:gap-16">
        <Motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-4 inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {t('hero.eyebrow')}
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] text-text md:text-6xl text-balance">
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
            <a
              href="/RESUME.pdf"
              download="RESUME.pdf"
              className="inline-flex items-center gap-2 rounded-xl bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              <Download size={16} />
              {t('hero.resume')}
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
          className="relative"
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
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-white px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                {t('hero.profileLabel')}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-text">{t('hero.name')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t('hero.affiliation')}</p>
            </div>
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default Hero;
