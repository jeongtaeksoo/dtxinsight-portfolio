# Career Timeline 구현 플랜

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** `NarrativeScroll` 섹션을 커리어 타임라인으로 전면 교체한다. 기존의 4단계 서사 구조를 삭제하고, 날짜 기반 수직 타임라인으로 대체한다.

**Architecture:** `NarrativeScroll.jsx` 파일 자체를 교체 (App.jsx 수정 불필요). 타임라인 데이터는 i18next 번역 파일에서 관리.

**Tech Stack:** React 19, Framer Motion, Tailwind CSS 4, i18next (http-backend)

---

## Task 1: 세 locale 파일에 `timeline` 키 추가

**파일:**
- Modify: `public/locales/ko/translation.json`
- Modify: `public/locales/en/translation.json`
- Modify: `public/locales/ja/translation.json`

기존 `journey` 키는 삭제하고 `timeline` 키로 교체한다.

### `public/locales/ko/translation.json`

`"journey": { ... }` 블록 전체를 아래로 교체:

```json
"timeline": {
    "title": "커리어 타임라인",
    "subtitle": "주요 성과 및 이정표",
    "items": [
        { "date": "2023.02", "title": "간호사 면허 취득 (보건복지부)", "note": null },
        { "date": "2024.01", "title": "가톨릭관동대 국제성모병원 CRC 입사", "note": null },
        { "date": "2024.08", "title": "대한재활의학회 추계 포스터 2편 발표", "note": null },
        { "date": "2025.08", "title": "Frontiers in Neurology 게재 (공저)", "note": null },
        { "date": "2025.12", "title": "MDPI Healthcare 게재 (공동 제1저자)", "note": "휘와수(Hwiwasoo) 프로젝트 — 홋카이도대학교 연구자와 공동 창시한 고령자 AI 인지훈련 프레임워크" },
        { "date": "2025.12", "title": "Annals of Rehabilitation Medicine 게재 (공저)", "note": null },
        { "date": "2026", "title": "Brain & Neurorehabilitation Accept + Frontiers in Neurology 투고 중", "note": null }
    ]
}
```

### `public/locales/en/translation.json`

`"journey": { ... }` 블록 전체를 아래로 교체:

```json
"timeline": {
    "title": "Career Timeline",
    "subtitle": "Key Milestones",
    "items": [
        { "date": "2023.02", "title": "Registered Nurse License (Korea)", "note": null },
        { "date": "2024.01", "title": "Joined International St. Mary's Hospital as CRC", "note": null },
        { "date": "2024.08", "title": "Conference Poster Presentations × 2 (KOSCOPP)", "note": null },
        { "date": "2025.08", "title": "Published in Frontiers in Neurology (Co-author)", "note": null },
        { "date": "2025.12", "title": "Published in MDPI Healthcare (Co-first Author)", "note": "Hwiwasoo Project — Co-founded with a PhD researcher at Hokkaido University. A generative AI cognitive training framework for older adults." },
        { "date": "2025.12", "title": "Published in Annals of Rehabilitation Medicine (Co-author)", "note": null },
        { "date": "2026", "title": "Brain & Neurorehabilitation (Accepted) + Frontiers in Neurology (Submitted)", "note": null }
    ]
}
```

### `public/locales/ja/translation.json`

`"journey": { ... }` 블록 전체를 아래로 교체:

```json
"timeline": {
    "title": "キャリアタイムライン",
    "subtitle": "主要マイルストーン",
    "items": [
        { "date": "2023.02", "title": "看護師免許取得（韓国）", "note": null },
        { "date": "2024.01", "title": "カトリック関東大学国際聖母病院 CRC着任", "note": null },
        { "date": "2024.08", "title": "大韓リハビリテーション医学会秋季 ポスター発表2件", "note": null },
        { "date": "2025.08", "title": "Frontiers in Neurology 掲載（共著）", "note": null },
        { "date": "2025.12", "title": "MDPI Healthcare 掲載（共同第1著者）", "note": "휘와수(Hwiwasoo)プロジェクト — 北海道大学の研究者と共同創設した高齢者向けAI認知訓練フレームワーク" },
        { "date": "2025.12", "title": "Annals of Rehabilitation Medicine 掲載（共著）", "note": null },
        { "date": "2026", "title": "Brain & Neurorehabilitation 受理 + Frontiers in Neurology 投稿中", "note": null }
    ]
}
```

---

## Task 2: `NarrativeScroll.jsx` 전체 교체

**파일:**
- Modify: `src/components/NarrativeScroll.jsx`

파일 전체를 아래 코드로 교체한다:

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NarrativeScroll = () => {
    const { t } = useTranslation();
    const items = t('timeline.items', { returnObjects: true }) || [];

    return (
        <section className="py-16">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('timeline.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="relative max-w-2xl">
                {/* Vertical line */}
                <div className="absolute left-[4.5rem] top-2 bottom-2 w-px bg-border" />

                <div className="space-y-7">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className="flex gap-6 items-start"
                        >
                            {/* Date */}
                            <div className="w-16 text-right shrink-0 pt-0.5">
                                <span className="text-xs font-mono font-semibold text-primary">
                                    {item.date}
                                </span>
                            </div>

                            {/* Dot */}
                            <div className="relative z-10 mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0" />

                            {/* Content */}
                            <div className="flex-1 pb-1">
                                <p className="text-sm font-semibold text-text leading-snug">
                                    {item.title}
                                </p>
                                {item.note && (
                                    <p className="text-xs text-muted mt-1.5 leading-relaxed border-l-2 border-primary/30 pl-3">
                                        {item.note}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NarrativeScroll;
```

---

## 확인 체크리스트

`npm run dev` 실행 후:

- [ ] "커리어 타임라인 / Career Timeline / キャリアタイムライン" 섹션 제목 표시
- [ ] 7개 타임라인 항목이 날짜 순서대로 세로로 표시
- [ ] 2025.12 MDPI Healthcare 항목 아래에 휘와수 프로젝트 설명 들여쓰기 표시
- [ ] 언어 전환 시 모든 항목이 각 언어로 변경
- [ ] 기존 4단계 서사(문제인식·가설·솔루션·성과) 문구가 사라짐
