# Academic Light 비주얼 리디자인 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 다크 테마 포트폴리오를 Academic Light(라이트 미니멀리즘) 디자인으로 교체한다.

**Architecture:** 색상 시스템을 Tailwind `@theme`에서 라이트 팔레트로 교체하고, Three.js 의존성을 전부 제거한 뒤, 각 컴포넌트를 라이트 테마에 맞게 순서대로 리스타일한다. 번역 키 누락 버그도 함께 수정한다.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, Framer Motion, i18next, lucide-react

---

## 사전 확인

```bash
cd "/Users/taeksoojung/Desktop/my project/개인 웹사이트/dtxinsight-portfolio"
npm run dev   # 로컬 개발 서버 http://localhost:5173 에서 현재 상태 확인
```

---

## Task 1: 디자인 토큰 교체 (global.css)

**Files:**
- Modify: `src/styles/global.css`

### Step 1: global.css 전체 교체

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  --color-background: #FAFAFA;
  --color-surface:    #FFFFFF;
  --color-primary:    #7564FF;
  --color-secondary:  #0EA5E9;
  --color-text:       #111827;
  --color-muted:      #6B7280;
  --color-border:     #E5E7EB;
  --color-accent-bg:  #F3F0FF;
  --color-card:       rgba(0, 0, 0, 0.03);

  --font-sans: 'Inter', sans-serif;

  --animate-spin-slow:  spin 20s linear infinite;
  --animate-pulse-slow: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  --spacing-section: 120px;
}

@layer base {
  body {
    @apply bg-background text-text font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-semibold text-text;
  }
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { @apply bg-background; }
::-webkit-scrollbar-thumb { @apply bg-border rounded-full; }
::-webkit-scrollbar-thumb:hover { @apply bg-primary/40; }
```

### Step 2: 개발 서버에서 전체 배경색 변경 확인

브라우저에서 `http://localhost:5173` — 배경이 흰색으로 바뀌었으면 OK.

### Step 3: Commit

```bash
git add src/styles/global.css
git commit -m "style: replace dark theme tokens with Academic Light palette"
```

---

## Task 2: Three.js 의존성 전체 제거

**Files:**
- Delete: `src/components/Background3D.jsx`
- Delete: `src/components/CTCModel.jsx`
- Delete: `src/components/NeuralNetwork.jsx`
- Modify: `src/components/Layout.jsx`
- Modify: `src/components/DigitalHealthProjects.jsx`
- Modify: `package.json`

### Step 1: 3D 컴포넌트 파일 삭제

```bash
rm "src/components/Background3D.jsx"
rm "src/components/CTCModel.jsx"
rm "src/components/NeuralNetwork.jsx"
```

### Step 2: Layout.jsx에서 Background3D 제거

`src/components/Layout.jsx`를 아래로 교체:

```jsx
import React from 'react';
import Header from './Header';
import Contact from './Contact';

const Layout = ({ children }) => {
    return (
        <div className="relative min-h-screen bg-background text-text font-sans">
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="w-full max-w-[1200px] mx-auto flex flex-col gap-[120px] px-4">
                    {children}
                </main>
                <Contact />
            </div>
        </div>
    );
};

export default Layout;
```

### Step 3: DigitalHealthProjects.jsx에서 CTCModel import 제거

`src/components/DigitalHealthProjects.jsx` 상단에서 `import CTCModel from './CTCModel';` 줄 삭제.
JSX 내부의 `<CTCModel />` 태그도 삭제.

### Step 4: package.json에서 Three.js 패키지 제거

```bash
npm uninstall @react-three/fiber @react-three/drei three @types/three
```

### Step 5: 빌드 오류 없는지 확인

```bash
npm run build
```

Expected: 오류 없이 `dist/` 생성됨.

### Step 6: Commit

```bash
git add -A
git commit -m "refactor: remove Three.js 3D components and dependencies"
```

---

## Task 3: 번역 데이터 버그 수정 (translations.js)

**Files:**
- Modify: `src/data/translations.js`

**배경:** Hero 컴포넌트가 `hero.name`, `hero.affiliation`, `hero.credential`, `hero.tagline`, `hero.resume` 키를 참조하지만 translations.js에 없어 텍스트가 표시되지 않는다.

### Step 1: translations.js KR 섹션의 `hero` 블록 교체

기존 `hero` 블록을 아래로 교체 (KR, EN, JP 각각):

**KR:**
```js
hero: {
    name: '정택수',
    affiliation: '가톨릭관동대학교 국제성모병원 재활의학과',
    credential: 'RN · 임상연구 코디네이터',
    tagline: '임상연구 × AI 디지털헬스 혁신',
    resume: '이력서 다운로드',
    stat1Label: 'R&D 규모',
    stat1Value: '3.9억 KRW',
    stat2Label: 'SCI 논문',
    stat2Value: '게재 완료',
    stat3Label: '다기관 임상시험',
    stat3Value: '총괄 경험',
    contactBtn: '연락하기',
    researchBtn: '연구 보기',
},
```

**EN:**
```js
hero: {
    name: 'Taeksoo Jeong',
    affiliation: 'Dept. of Rehabilitation Medicine, International St. Mary\'s Hospital, CKU',
    credential: 'RN · Clinical Research Coordinator',
    tagline: 'Clinical Research × AI Digital Health Innovation',
    resume: 'Download Resume',
    stat1Label: 'R&D Scale',
    stat1Value: '390M KRW',
    stat2Label: 'SCI Publication',
    stat2Value: 'Published',
    stat3Label: 'Multi-center RCT',
    stat3Value: 'Managed',
    contactBtn: 'Contact Me',
    researchBtn: 'View Research',
},
```

**JP:**
```js
hero: {
    name: '鄭澤洙 (ジョン・テクス)',
    affiliation: 'カトリック関東大学国際聖母病院 リハビリテーション医学科',
    credential: 'RN · 臨床研究コーディネーター',
    tagline: '臨床研究 × AIデジタルヘルス革新',
    resume: '履歴書をダウンロード',
    stat1Label: 'R&D規模',
    stat1Value: '3.9億ウォン',
    stat2Label: 'SCI論文',
    stat2Value: '掲載完了',
    stat3Label: '多機関RCT',
    stat3Value: '管理経験',
    contactBtn: 'お問い合わせ',
    researchBtn: '研究を見る',
},
```

### Step 2: Commit

```bash
git add src/data/translations.js
git commit -m "fix: add missing hero translation keys (name, affiliation, credential, tagline, resume)"
```

---

## Task 4: Header 라이트 테마

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.module.css`

### Step 1: Header.jsx의 헤더 태그 className 교체

기존:
```jsx
<header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
```

변경:
```jsx
<header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-white border-b border-border ${isScrolled ? 'shadow-sm py-3' : 'py-4'}`}>
```

### Step 2: 로고 텍스트 색상 조정

기존:
```jsx
<span className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
    DTX<span className="text-primary">Insight</span>
</span>
```

변경:
```jsx
<span className="text-2xl md:text-3xl font-bold tracking-tighter text-text">
    DTX<span className="text-primary">Insight</span>
</span>
```

### Step 3: 데스크톱 nav 링크 색상 조정

기존: `text-muted hover:text-white`
변경: `text-muted hover:text-text`

### Step 4: 언어 스위치 배경 조정

기존: `bg-white/5 border border-white/5`
변경: `bg-gray-100 border border-border`

비활성 언어 버튼: `text-muted hover:text-text`

### Step 5: Header.module.css — 모바일 메뉴 라이트 스타일

`mobileNav` 클래스의 배경색을 `bg-background/95` → `background: white; border-bottom: 1px solid #E5E7EB;`로 교체 (module.css 직접 수정).
`mobileNavLink` 색상 `color: #111827;`로 설정.

### Step 6: 개발 서버에서 헤더 확인

흰 헤더 + 다크 텍스트 + 퍼플 액센트 확인.

### Step 7: Commit

```bash
git add src/components/Header.jsx src/components/Header.module.css
git commit -m "style: apply light theme to Header"
```

---

## Task 5: Hero 2단 레이아웃

**Files:**
- Modify: `src/components/Hero.jsx`
- Delete: `src/components/Hero.module.css` (있는 경우)

### Step 1: Hero.jsx 전체 교체

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import profileImg from '../assets/profile_id_photo.png';

const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: 'easeOut' },
};

const Hero = () => {
    const { t } = useTranslation();

    const stats = [
        { label: t('hero.stat1Label'), value: t('hero.stat1Value') },
        { label: t('hero.stat2Label'), value: t('hero.stat2Value') },
        { label: t('hero.stat3Label'), value: t('hero.stat3Value') },
    ];

    return (
        <section className="pt-32 pb-16 md:pt-40 md:pb-24">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">

                {/* Left: Text */}
                <motion.div
                    className="flex-1 text-center md:text-left"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
                        {t('hero.credential')}
                    </p>

                    <h1 className="text-4xl md:text-6xl font-bold text-text mb-2 leading-tight">
                        {t('hero.name')}
                    </h1>

                    <p className="text-lg md:text-xl text-muted mb-2">
                        {t('hero.affiliation')}
                    </p>

                    <p className="text-base md:text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-8">
                        {t('hero.tagline')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
                        <a
                            href="/RESUME.pdf"
                            download="RESUME.pdf"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <Download size={16} />
                            {t('hero.resume')}
                        </a>
                        <a
                            href="#research"
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors"
                        >
                            {t('hero.researchBtn')}
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    {/* Stats Bar */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-0">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className={`px-5 py-3 ${i > 0 ? 'border-l border-border' : ''}`}
                            >
                                <p className="text-xl font-bold text-text">{stat.value}</p>
                                <p className="text-xs text-muted">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Profile Image */}
                <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="w-52 h-52 md:w-72 md:h-72 rounded-2xl overflow-hidden border border-border shadow-lg">
                        <img
                            src={profileImg}
                            alt={t('hero.name')}
                            className="w-full h-full object-cover object-top"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
```

### Step 2: 개발 서버에서 Hero 확인

- 좌측: 이름/직함/스탯 표시
- 우측: 프로필 사진
- 번역 키 정상 표시 확인 (빈 텍스트 없음)

### Step 3: Commit

```bash
git add src/components/Hero.jsx
git commit -m "feat: redesign Hero with 2-column layout and stats bar"
```

---

## Task 6: WindowCard 라이트 스타일

**Files:**
- Modify: `src/components/WindowCard.jsx`

### Step 1: WindowCard.jsx 전체 교체

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const WindowCard = ({ title, type, date, children, onClick, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ boxShadow: '0 4px 12px rgba(117,100,255,0.15)' }}
            className={`group bg-surface border border-border rounded-xl overflow-hidden transition-all cursor-pointer flex flex-col hover:border-primary ${className}`}
            onClick={onClick}
        >
            {/* Card Header */}
            <div className="px-5 pt-5 pb-0 flex items-center justify-between">
                {type && (
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-accent-bg text-primary">
                        {type}
                    </span>
                )}
                {date && (
                    <span className="text-xs text-muted">{date}</span>
                )}
            </div>

            {/* Card Content */}
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-base font-semibold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <div className="text-sm text-muted leading-relaxed flex-grow">
                    {children}
                </div>

                <div className="mt-4 pt-3 border-t border-border flex justify-end">
                    <ArrowUpRight size={14} className="text-muted group-hover:text-primary transition-colors" />
                </div>
            </div>
        </motion.div>
    );
};

export default WindowCard;
```

### Step 2: 개발 서버에서 ResearchProjects / Publications 카드 확인

흰 카드 + 회색 보더 + 퍼플 뱃지 + 호버 시 퍼플 보더 확인.

### Step 3: Commit

```bash
git add src/components/WindowCard.jsx
git commit -m "style: replace macOS WindowCard with light minimalist card"
```

---

## Task 7: NarrativeScroll 타임라인 리스타일

**Files:**
- Modify: `src/components/NarrativeScroll.jsx`

### Step 1: NarrativeScroll.jsx 전체 교체

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Lightbulb, Cog, BarChart3 } from 'lucide-react';

const iconMap = { Search, Lightbulb, Cog, BarChart3 };
const defaultIcons = [Search, Lightbulb, Cog, BarChart3];

const NarrativeScroll = () => {
    const { t } = useTranslation();

    const steps = t('journey.steps', { returnObjects: true }) || [
        { id: 'problem',    icon: 'Search',    title: '문제 인식 (Problem Identification)',           desc: '저는 어떤 프로젝트든 먼저 현장의 흐름과 이해관계자의 어려움을 관찰하는 것에서 시작합니다.\n데이터, 프로세스, 사용자 경험에서 드러나는 비효율을 정리하여\n\"정확히 무엇을 해결해야 하는가?\"를 명확히 규정합니다.' },
        { id: 'hypothesis', icon: 'Lightbulb', title: '구조화·가설 설정 (Hypothesis & Structuring)',  desc: '문제를 단순히 나열하는 것이 아니라,\n원인–과정–결과의 구조로 재해석해 검증 가능한 가설을 만듭니다.\n이 단계에서 임상적 통찰·데이터 패턴·운영적 제약을 모두 반영하여\n현실적인 방향성과 목표를 설정합니다.' },
        { id: 'solution',   icon: 'Cog',       title: '솔루션 설계 및 실행 (Solution Design & Execution)', desc: '프로젝트 목적에 따라 다음 요소들을 통합적으로 설계합니다.\n\n• 임상시험 운영 및 데이터 흐름 구조\n• 사용자 경험을 고려한 디지털 인터페이스\n• AI/자동화 모델 설계 및 적용\n• 조직 내 협업 및 커뮤니케이션 플로우\n• 프로세스 최적화 및 오류 예방 시스템' },
        { id: 'impact',     icon: 'BarChart3', title: '성과 검증 및 개선 (Impact Validation)',        desc: '솔루션의 효과를 데이터로 검증하고, 정량·정성 평가를 기반으로 개선 사항을 도출합니다.\n\n• 사용자·환자·의료진 피드백\n• 프로세스 안정성 평가\n• 재현성과 확장성 검토' },
    ];

    return (
        <section className="py-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-text mb-3">
                    {t('journey.title') || 'My Approach'}
                </h2>
                <p className="text-muted">
                    {t('journey.subtitle') || 'From Identification to Innovation'}
                </p>
            </div>

            <div className="relative max-w-3xl mx-auto">
                {/* Vertical line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-12">
                    {steps.map((step, index) => {
                        const Icon = step.icon ? (iconMap[step.icon] || defaultIcons[index]) : defaultIcons[index];
                        return (
                            <motion.div
                                key={step.id || index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: '-10% 0px' }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative pl-16"
                            >
                                {/* Number badge */}
                                <div className="absolute left-0 w-12 h-12 rounded-full bg-accent-bg border border-primary/20 flex items-center justify-center">
                                    <Icon size={20} className="text-primary" />
                                </div>

                                <div className="bg-surface border border-border rounded-xl p-6">
                                    <p className="text-xs font-mono text-primary mb-2 uppercase tracking-widest">
                                        0{index + 1}
                                    </p>
                                    <h3 className="text-lg font-semibold text-text mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed whitespace-pre-line">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default NarrativeScroll;
```

### Step 2: 개발 서버에서 타임라인 확인

좌측 퍼플 라인 + 원형 아이콘 뱃지 + 흰 카드 확인.

### Step 3: Commit

```bash
git add src/components/NarrativeScroll.jsx
git commit -m "style: redesign NarrativeScroll as vertical timeline"
```

---

## Task 8: ResearchProjects 섹션 제목 스타일

**Files:**
- Modify: `src/components/ResearchProjects.jsx`

### Step 1: 섹션 헤더 색상만 조정

```jsx
// 기존
<h2 className="text-3xl font-bold">{t('research.title')}</h2>
<div className="h-px flex-grow bg-gradient-to-r from-white/20 to-transparent"></div>

// 변경
<h2 className="text-3xl font-bold text-text">{t('research.title')}</h2>
<div className="h-px flex-grow bg-gradient-to-r from-border to-transparent"></div>
```

### Step 2: 섹션 배경 제거

```jsx
// 기존
<section id="research" className="py-20 bg-background relative z-10">

// 변경
<section id="research" className="py-16">
```

### Step 3: Commit

```bash
git add src/components/ResearchProjects.jsx
git commit -m "style: update ResearchProjects section for light theme"
```

---

## Task 9: Publications 섹션 라이트 테마

**Files:**
- Modify: `src/components/Publications.jsx`

### Step 1: 섹션 배경 및 헤더 색상 조정

```jsx
// 섹션 태그
// 기존: <section id="publications" className="py-20 bg-background relative z-10 border-t border-white/5">
// 변경:
<section id="publications" className="py-16 border-t border-border">
```

섹션 제목:
```jsx
// 기존: from-white/20
// 변경: from-border
<div className="h-px flex-grow bg-gradient-to-r from-border to-transparent"></div>
```

서브타이틀:
```jsx
// 기존: text-muted (다크 테마)
// 이미 muted 사용 중이라 색상은 자동 반영됨
```

### Step 2: 포스터 카드 보더 조정

```jsx
// 기존: border-white/10 hover:border-primary/50
// 변경: border-border hover:border-primary
className="... border border-border hover:border-primary ..."
```

### Step 3: 논문 상세 모달 라이트 버전

`selectedPaper` 모달의 내용 카드:
```jsx
// 기존: bg-surface
// 변경: bg-white text-text
className="relative z-10 w-full max-w-2xl bg-white rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col"
```

모달 헤더 바:
```jsx
// 기존: bg-black/40 border-b border-white/5
// 변경: bg-gray-50 border-b border-border
className="h-10 bg-gray-50 flex items-center justify-between px-4 border-b border-border"
```

모달 텍스트:
```jsx
// 기존: text-primary font-mono → OK
// 제목: text-2xl font-bold text-white → text-text
// 내용: text-white/80 → text-muted
// summary 배경: bg-white/5 border-white/5 → bg-gray-50 border-border
```

Close 버튼:
```jsx
// 기존: bg-white/10 hover:bg-white/20 text-white border-white/10
// 변경: bg-gray-100 hover:bg-gray-200 text-text border-border
```

### Step 4: 개발 서버에서 Publications 확인

### Step 5: Commit

```bash
git add src/components/Publications.jsx
git commit -m "style: update Publications section for light theme"
```

---

## Task 10: DigitalHealthProjects (Innovation) 정리

**Files:**
- Modify: `src/components/DigitalHealthProjects.jsx`
- Modify: `src/components/DigitalHealthProjects.module.css` (있으면 삭제)

### Step 1: DigitalHealthProjects.jsx 전체 교체

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';

const DigitalHealthProjects = () => {
    const { t } = useTranslation();

    const features = [
        { title: 'Context-Aware',   desc: t('innovation.features.0') || 'Coach-Teacher-Companion Triple Agent' },
        { title: 'Multi-Modal',     desc: t('innovation.features.1') || 'Context-Adaptive Cognitive Flow' },
        { title: 'Evidence-Based',  desc: t('innovation.features.2') || 'Senior-friendly Digital Interface' },
    ];

    return (
        <section id="innovation" className="py-16 bg-accent-bg rounded-2xl px-8 md:px-16">
            <div className="text-center mb-12">
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                    {t('innovation.label')}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
                    {t('innovation.title')}
                </h2>
                <p className="max-w-2xl mx-auto text-muted leading-relaxed mb-8">
                    {t('innovation.description')}
                </p>
                <a
                    href="https://hwiwasoo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                >
                    {t('innovation.cta')}
                    <ExternalLink size={18} />
                </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {features.map((f) => (
                    <div key={f.title} className="p-6 bg-white rounded-xl border border-border hover:border-primary transition-colors text-center">
                        <h3 className="text-lg font-bold text-primary mb-2">{f.title}</h3>
                        <p className="text-sm text-muted">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DigitalHealthProjects;
```

### Step 2: Commit

```bash
git add src/components/DigitalHealthProjects.jsx
git commit -m "style: simplify DigitalHealthProjects without 3D model"
```

---

## Task 11: Skills — CSS Modules → Tailwind 교체

**Files:**
- Modify: `src/components/Skills.jsx`
- Delete: `src/components/Skills.module.css`

### Step 1: Skills.jsx 전체 교체

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code, LineChart, Microscope, Stethoscope, MessageCircle, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const skillDetails = [
    { icon: Stethoscope, key: 'clinical', desc: '다기관 RCT 운영 및 프로토콜 설계' },
    { icon: Code,        key: 'python',   desc: '데이터 처리 및 분석 스크립트 개발' },
    { icon: LineChart,   key: 'data',     desc: 'SPSS, Python 기반 임상 데이터 분석' },
    { icon: Microscope,  key: 'design',   desc: '임상시험 및 실증 연구 설계' },
    { icon: MessageCircle, key: 'comm',   desc: '다기관 이해관계자 조정 및 보고' },
    { icon: Brain,       key: 'ai',       desc: '생성형 AI 기반 디지털 치료제 연구' },
];

const Skills = () => {
    const { t } = useTranslation();

    return (
        <section className="py-16">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('skills.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillDetails.map(({ icon: Icon, key, desc }, index) => (
                    <motion.div
                        key={key}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.08 }}
                        className="flex items-start gap-4 p-5 bg-surface border border-border rounded-xl hover:border-primary transition-colors"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-bg flex items-center justify-center">
                            <Icon size={20} className="text-primary" strokeWidth={1.5} />
                        </div>
                        <div>
                            <p className="font-semibold text-text text-sm">{t(`skills.items.${key}`)}</p>
                            <p className="text-xs text-muted mt-0.5">{desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
```

### Step 2: Skills.module.css 삭제

```bash
rm src/components/Skills.module.css
```

### Step 3: Commit

```bash
git add src/components/Skills.jsx
git rm src/components/Skills.module.css
git commit -m "style: rewrite Skills with Tailwind, add skill descriptions"
```

---

## Task 12: Contact — CSS Modules → Tailwind 교체

**Files:**
- Modify: `src/components/Contact.jsx`
- Delete: `src/components/Contact.module.css`
- Delete: `src/components/CollaborativeProjects.module.css` (미사용)

### Step 1: Contact.jsx 전체 교체

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { GmailIcon, LinkedInIcon, OrcidIcon, GithubIcon } from './Icons';

const Contact = () => {
    const { t } = useTranslation();

    const links = [
        { href: 'mailto:jeongtaeksoo@gmail.com',                            Icon: GmailIcon,    label: 'jeongtaeksoo@gmail.com' },
        { href: 'https://www.linkedin.com/in/taeksoo-jeong-20685b296/',     Icon: LinkedInIcon, label: 'LinkedIn' },
        { href: 'https://orcid.org/0009-0001-1451-5457',                    Icon: OrcidIcon,    label: 'ORCID' },
        { href: 'https://github.com/jeongtaeksoo',                           Icon: GithubIcon,   label: 'GitHub' },
    ];

    return (
        <section id="contact" className="mt-20 border-t border-border">
            <div className="max-w-[1200px] mx-auto px-4 py-20 text-center">
                <h2 className="text-3xl font-bold text-text mb-4">{t('contact.title')}</h2>
                <p className="text-muted mb-10 max-w-md mx-auto">{t('contact.subtitle')}</p>

                <div className="flex flex-wrap justify-center gap-4">
                    {links.map(({ href, Icon, label }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-border rounded-lg text-text hover:border-primary hover:text-primary transition-colors text-sm font-medium"
                        >
                            <Icon size={18} />
                            {label}
                        </a>
                    ))}
                </div>
            </div>

            <footer className="border-t border-border bg-white">
                <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted">
                    <p>{t('contact.footer.rights')}</p>
                    <p>{t('contact.footer.tagline')}</p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
```

### Step 2: 미사용 CSS Modules 삭제

```bash
rm src/components/Contact.module.css
rm src/components/CollaborativeProjects.module.css
rm src/components/Highlights.module.css
```

### Step 3: Commit

```bash
git add src/components/Contact.jsx
git rm src/components/Contact.module.css src/components/CollaborativeProjects.module.css src/components/Highlights.module.css
git commit -m "style: rewrite Contact with Tailwind, remove unused CSS modules"
```

---

## Task 13: 최종 점검 & 빌드

### Step 1: 전체 빌드 확인

```bash
npm run build
```

Expected: 오류 없이 빌드 성공.

### Step 2: 개발 서버 최종 UI 점검 체크리스트

```
[ ] 헤더: 흰 배경, 다크 텍스트, 퍼플 활성 언어
[ ] Hero: 좌우 2단, 이름/직함/스탯 모두 표시, 번역 키 정상
[ ] My Approach: 수직 타임라인, 4단계 카드
[ ] Research: 퍼플 뱃지 카드, 호버 시 보더 변경
[ ] Publications: 라이트 카드, 포스터 hover zoom, 모달 라이트
[ ] Innovation: 퍼플 틴트 섹션, 3가지 특징 카드
[ ] Skills: 2열 그리드, 아이콘+설명
[ ] Contact: 링크 버튼들, 흰 푸터
[ ] 3개 언어(KR/EN/JP) 전환 정상 동작
[ ] 모바일 반응형 (브라우저 dev tools로 확인)
```

### Step 3: 최종 커밋

```bash
git add -A
git commit -m "chore: final cleanup after Academic Light redesign"
```

### Step 4: (선택) 배포

```bash
npm run deploy   # gh-pages 배포
```

---

## 참고: About 섹션

`About.jsx` 컴포넌트가 `App.jsx`에서 렌더링되지 않아 현재 미사용 상태.
추후 "소개" 섹션으로 추가할 경우 `App.jsx`에서 `<About />` 추가하고
`About.module.css`도 Tailwind로 교체하면 된다.
현재 이 플랜에서는 스코프 외로 제외.
