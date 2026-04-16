import React from 'react';
import { motion as Motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenText,
  FolderKanban,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  getClinicalPlaybookContent,
  resolveClinicalPlaybookLocale,
} from '../data/clinicalPlaybookContent';

const OFFER_ICONS = [BookOpenText, GraduationCap, FolderKanban, Sparkles];

const ClinicalPlaybook = () => {
  const { i18n } = useTranslation();
  const language = resolveClinicalPlaybookLocale(i18n.resolvedLanguage || i18n.language);
  const content = getClinicalPlaybookContent(language);

  return (
    <section id="playbook" className="scroll-mt-28 border-t border-border py-16">
      <div className="overflow-hidden rounded-[40px] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.98)_0%,rgba(247,249,255,0.96)_42%,rgba(236,248,244,0.95)_100%)] shadow-sm">
        <div className="grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:gap-12">
          <Motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              {content.eyebrow}
            </p>

            <h2 className="max-w-4xl text-3xl font-bold leading-[1.08] text-text md:text-5xl text-balance">
              {content.title}
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
              {content.summary}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={content.primaryCta.href}
                target={content.primaryCta.external ? '_blank' : undefined}
                rel={content.primaryCta.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-xl bg-text px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-text/90"
              >
                {content.primaryCta.label}
                <ArrowRight size={16} />
              </a>
              <a
                href={content.secondaryCta.href}
                target={content.secondaryCta.external ? '_blank' : undefined}
                rel={content.secondaryCta.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text transition-colors hover:border-emerald-500 hover:text-emerald-700"
              >
                {content.secondaryCta.label}
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {content.trustStrip.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-sm font-medium text-text shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </Motion.div>

          <Motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-[30px] border border-emerald-100 bg-white/90 p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              {content.demandTitle}
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              {content.demandBody}
            </p>

            <div className="mt-6 space-y-3">
              {content.demandStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border bg-background px-4 py-4"
                >
                  <p className="text-2xl font-bold text-text">{item.value}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </Motion.aside>
        </div>

        <div className="border-t border-border/80 bg-white/70 px-6 py-8 md:px-8 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_1.05fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                {content.architectureTitle}
              </p>
              <div className="mt-5 space-y-4">
                {content.architectureItems.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <BadgeCheck className="mt-1 shrink-0 text-emerald-600" size={18} />
                    <div>
                      <h3 className="text-base font-semibold text-text">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/70">
                {content.offersTitle}
              </p>
              <div className="mt-5 divide-y divide-border rounded-[28px] border border-border bg-white shadow-sm">
                {content.offers.map((offer, index) => {
                  const Icon = OFFER_ICONS[index] ?? Sparkles;

                  return (
                    <div
                      key={offer.title}
                      className="grid gap-4 px-5 py-5 md:grid-cols-[120px_minmax(0,1fr)_120px] md:items-start"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                          <Icon size={18} />
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                          {offer.stage}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-semibold text-text">{offer.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-muted">{offer.description}</p>
                      </div>

                      <div className="text-sm font-medium text-muted md:pt-1 md:text-right">
                        {offer.meta}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 rounded-[32px] border border-border bg-slate-950 px-6 py-7 text-white md:px-7 md:py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                {content.principlesTitle}
              </p>
              <div className="mt-5 space-y-3">
                {content.principles.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck size={17} className="mt-1 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-7 text-slate-200">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Next Surface
              </p>
              <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                {content.closingTitle}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                {content.closingBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicalPlaybook;
