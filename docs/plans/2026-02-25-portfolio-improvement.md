# Portfolio Improvement Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 이력서와 웹사이트의 불일치를 수정하고, 깨진 기능·국제화 버그를 픽스하며, 콘텐츠를 이력서 기반 실제 서사로 교체한다.

**Architecture:** React + i18next (http-backend) + Tailwind + Framer Motion 구조 유지. 컴포넌트 추가/삭제 없이 기존 구조를 수정한다. 번역 텍스트는 모두 `public/locales/{lang}/translation.json`에서 관리한다.

**Tech Stack:** React 19, Vite 7, i18next (http-backend), Tailwind CSS 4, Framer Motion 12

---

## 4번 콘텐츠 문제: 삭제 vs 개선 판단

> 사용자 질문에 대한 명확한 답변

**삭제하면 안 되는 것들:**

| 항목 | 판단 | 이유 |
|---|---|---|
| My Research Journey (NarrativeScroll) | **전면 재작성** | 개념 자체는 좋음. 하지만 지금 내용은 아무나 쓸 수 있는 컨설팅 템플릿. 이력서에 실제 커리어 서사가 있으므로 그걸로 교체 |
| "디지털 헬스케어 실증" 연구 카드 | **내용 개선** | 삭제 시 연구 카드가 2개만 남음. 이력서 보면 보건복지부 국장급이 참석한 Q&A 세션 — 실제로는 임팩트 있는 경험. 맥락을 살려 재작성 |
| "Communication" 스킬 | **교체** | 이 자리에 이력서 기반 "논문 작성 & 학회 발표"를 넣는 것이 훨씬 구체적 |
| "Vibecording" 스킬 | **이름 변경** | 능력 자체는 차별점이 됨(임상연구자가 AI로 프로토타이핑 가능). 단, "Vibecording"은 비공식적 표현이라 "AI 프로토타이핑" 또는 "AI-assisted Development"로 변경 권장 |
| "Summary coming soon." | **버그 픽스** | 콘텐츠 결정 아닌 기술 버그 |

---

## Task 1: 이력서 ↔ 웹사이트 사실 오류 수정

**파일:**
- Modify: `public/locales/en/translation.json`
- Modify: `public/locales/ko/translation.json`
- Modify: `public/locales/jp/translation.json`

**배경:**
이력서에는 논문 #2가 **"공동 제1저자"** 로 명시되어 있으나 웹사이트에는 "제1저자 / 1st Author / 第1著者"로 잘못 표기.

**Step 1: 세 locale 파일 모두 role 수정**

`en/translation.json` → publications.items[1].role: `"Co-first Author"`
`ko/translation.json` → publications.items[1].role: `"공동 제1저자"`
`jp/translation.json` → publications.items[1].role: `"共同第1著者"`

**Step 2: 확인**
`npm run dev` 후 Publications 섹션에서 MDPI Healthcare 논문의 role 배지가 "Co-first Author / 공동 제1저자 / 共同第1著者"로 표시되는지 확인.

---

## Task 2: Hero 섹션 미완성 기능 복원

**파일:**
- Modify: `src/components/Hero.jsx`

**배경:**
번역 파일에 `stat2Value: "5"`, `stat2Label: "SCI/ESCI/KCI Papers"` 가 있는데 Hero.jsx는 2개의 stat만 렌더링. 또한 `contactBtn`도 번역엔 있지만 버튼으로 구현 안 됨.

현재 Hero.jsx:13의 stats 배열:
```js
const stats = [
    { label: t('hero.stat1Label'), value: t('hero.stat1Value') },
    { label: t('hero.stat2Label'), value: t('hero.stat2Value') },
];
```

**Step 1: stats 배열에 stat2 업데이트 내용 확인**
현재 번역 파일 기준으로 stat1=R&D Scale(3.9억), stat2=SCI 논문(5편). stat3는 번역 파일에 없으므로 추가할 필요 없음. 현재 stat 2개가 맞음.

단, `hero.researchBtn` 옆에 `contactBtn` 버튼을 Hero.jsx CTA 영역에 추가:

```jsx
<a
    href="#contact"
    onClick={(e) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }}
    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 text-primary rounded-lg font-semibold hover:bg-primary/20 transition-colors text-sm"
>
    {t('hero.contactBtn')}
</a>
```

**Step 2: 확인**
Hero 섹션에 "연락하기 / Contact Me / お問い合わせ" 버튼 3개가 나타나는지 확인.

---

## Task 3: About 컴포넌트 렌더링 복원

**파일:**
- Modify: `src/App.jsx`
- Modify: `src/components/About.jsx` (Tailwind로 재작성 필요 — 현재 CSS Module 사용 중)

**배경:**
`About.jsx`는 `About.module.css`를 import하지만 해당 CSS 파일이 없어 에러. 또한 App.jsx에 import조차 안 되어 있음.

**Step 1: About.jsx를 Tailwind 기반으로 재작성**

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();
    return (
        <section id="about" className="py-16 border-t border-border">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl font-bold text-text">{t('about.title')}</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                <p className="text-muted leading-relaxed text-sm">{t('about.description1')}</p>
                <p className="text-muted leading-relaxed text-sm">{t('about.description2')}</p>
            </div>
        </section>
    );
};

export default About;
```

**Step 2: App.jsx에 About 추가**

Hero 다음, NarrativeScroll 이전에 About 추가:
```jsx
import About from './components/About'
// ...
<Layout>
    <Hero />
    <About />
    <NarrativeScroll />
    <ResearchProjects />
    <Publications />
    <Skills />
</Layout>
```

**Step 3: 확인**
"철학 & 접근법 / Philosophy & Approach / 哲学とアプローチ" 섹션이 Hero 아래에 표시되는지 확인.

---

## Task 4: Header 네비게이션 수정

**파일:**
- Modify: `src/components/Header.jsx`

**배경:**
번역 파일에 `nav.innovation` 키가 있지만 navLinks 배열에 없음. 또한 About이 복원되었으므로 About 링크도 추가.

**Step 1: navLinks 배열 업데이트**

현재 `Header.jsx:25-30`:
```js
const navLinks = [
    { name: t('nav.about'), href: '#top' },
    { name: t('nav.research'), href: '#research' },
    { name: t('nav.publications'), href: '#publications' },
    { name: t('nav.contact'), href: '#contact' },
];
```

수정:
```js
const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.research'), href: '#research' },
    { name: t('nav.publications'), href: '#publications' },
    { name: t('nav.innovation'), href: '#innovation' },
    { name: t('nav.contact'), href: '#contact' },
];
```

**Step 2: 확인**
헤더 네비게이션 클릭 시 각 섹션으로 스크롤되는지 확인.

---

## Task 5: Publications.jsx 하드코딩 문자열 국제화

**파일:**
- Modify: `src/components/Publications.jsx`
- Modify: `public/locales/en/translation.json`
- Modify: `public/locales/ko/translation.json`
- Modify: `public/locales/jp/translation.json`

**배경:**
세 곳에 하드코딩된 영어/한국어 문자열이 있음:
1. `innovationFeatureTitles = ['Context-Aware', 'Multi-Modal', 'Evidence-Based']` — 영어 고정
2. 논문 모달 닫기 버튼 텍스트 `"닫기"` — 한국어 고정
3. `"Summary coming soon."` — 영어 고정

**Step 1: 세 locale 파일에 번역 키 추가**

각 translation.json의 publications 객체에 추가:
```json
// en
"innovationFeatureTitles": ["Context-Aware", "Multi-Modal", "Evidence-Based"],
"closeBtn": "Close",
"summaryComingSoon": "Summary coming soon."

// ko
"innovationFeatureTitles": ["맥락 인식", "멀티모달", "근거 기반"],
"closeBtn": "닫기",
"summaryComingSoon": "요약 준비 중입니다."

// jp
"innovationFeatureTitles": ["コンテキスト認識", "マルチモーダル", "エビデンスベース"],
"closeBtn": "閉じる",
"summaryComingSoon": "要約を準備中です。"
```

**Step 2: Publications.jsx 수정**

```jsx
// 기존 하드코딩 제거
const innovationFeatureTitles = t('publications.innovationFeatureTitles', { returnObjects: true }) || ['Context-Aware', 'Multi-Modal', 'Evidence-Based'];

// 닫기 버튼: "닫기" → {t('publications.closeBtn')}
// "Summary coming soon." → {t('publications.summaryComingSoon')}
```

**Step 3: 확인**
일본어로 전환 시 "閉じる", "要約を準備中です。"로 표시되는지 확인.

---

## Task 6: 언어 코드 및 버튼 레이블 정상화

**파일:**
- Modify: `src/i18n.js`
- Modify: `src/components/Header.jsx`
- Rename: `public/locales/jp/` → `public/locales/ja/`

**배경:**
일본어 ISO 코드는 `ja`인데 `jp`를 사용 중. 언어 버튼도 `EN | 日本語 | KR`으로 일관성 없음 → `EN | JA | KO`로 통일 (또는 `ENG | JPN | KOR`).

**Step 1: 폴더 리네임**
```bash
mv "public/locales/jp" "public/locales/ja"
```

**Step 2: i18n.js 변경 없음** (backend loadPath는 `{{lng}}`를 사용하므로 자동 반영)

**Step 3: Header.jsx 언어 배열 수정**
```js
const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JA' },
    { code: 'ko', label: 'KO' },
];
```
`jp` → `ja` 코드 변경도 반영.

**Step 4: localStorage 캐시 버스팅 없음** (사용자가 'jp'를 저장했다면 자동으로 fallback 'en'으로 전환됨 — 허용 가능)

**Step 5: 확인**
JA 버튼 클릭 시 일본어 번역 로딩 확인.

---

## Task 7: 연구 카드 #3 내용 개선 (삭제 아님)

**파일:**
- Modify: `public/locales/en/translation.json`
- Modify: `public/locales/ko/translation.json`
- Modify: `public/locales/jp/translation.json`

**배경:**
현재 3번 연구 카드는 단순히 "Q&A 세션 진행"으로 표현되어 있음. 이력서를 보면 보건복지부 첨단의료지원관 국장, 의료정보정책과장, 보건산업진흥원 바이오헬스혁신본부장 등 부처 고위 인사들이 참석한 자리에서 디지털 헬스케어 실증 연구 Q&A를 주도한 것 — 이는 삭제할 것이 아니라 제대로 된 맥락으로 재작성해야 할 항목.

**Step 1: 세 locale 파일의 research.projects[2] 수정**

```json
// en
{
    "title": "Government-Level Digital Health Demonstration",
    "category": "Regulatory Affairs & Presentation",
    "description": "Led Q&A at MOHW/KHIDI mid-term demonstration review attended by Director-General of Advanced Medical Technology, Deputy Director of Health IT Policy, and KHIDI Biohealth Innovation Division Head — representing clinical research outcomes to national policy stakeholders."
}

// ko
{
    "title": "정부 디지털 헬스케어 실증사업 발표",
    "category": "규제·정책 대응",
    "description": "보건복지부 첨단의료지원관 국장·의료정보정책과장·한국보건산업진흥원 바이오헬스혁신본부장 등 국책 주요 인사 대상 실증사업 중간보고 Q&A 세션 주도 — 임상연구 성과를 정책 결정자에게 직접 발표"
}

// jp
{
    "title": "政府デジタルヘルスケア実証事業発表",
    "category": "規制・政策対応",
    "description": "保健福祉部先端医療支援官局長・医療情報政策課長・韓国保健産業振興院バイオヘルス革新本部長等の国策主要人士を対象とした実証事業中間報告Q&Aセッションを主導"
}
```

**Step 2: 확인**
3번 연구 카드의 내용이 업데이트되어 있는지 확인.

---

## Task 8: Skills 섹션 개선 (Communication → 논문 작성, Vibecording → AI 프로토타이핑)

**파일:**
- Modify: `public/locales/en/translation.json`
- Modify: `public/locales/ko/translation.json`
- Modify: `public/locales/jp/translation.json`
- Modify: `src/components/Skills.jsx`

**배경:**
이력서 CORE COMPETENCIES와 비교:
- "Communication" → 이력서에는 "발표"와 "다직종 협업"으로 구체적으로 나뉨. "Communication"이라는 단어는 너무 범용적.
- "Vibecording" → 임상연구자가 AI로 소프트웨어를 직접 만들 수 있다는 차별점은 유지할 가치가 있지만, 비공식 표현이라 "AI Prototyping"으로 변경.

**Step 1: 번역 파일 skills.items 수정**

```json
// en
"comm": "Publications & Presentation",
"vibecording": "AI Prototyping"

// descriptions
"comm": "SCI/ESCI/KCI Journal Papers (incl. submissions) & Conference Poster Presentations",
"vibecording": "Rapid prototyping of clinical AI tools via AI-assisted development (Vite, React, Python)"

// ko
"comm": "논문 작성 & 학회 발표",
"vibecording": "AI 프로토타이핑"

// descriptions
"comm": "SCI·ESCI·KCI 논문(투고 포함) 작성 및 학회 포스터 발표",
"vibecording": "AI 기반 임상 도구 신속 프로토타이핑 (Vite, React, Python)"

// jp
"comm": "論文執筆・学会発表",
"vibecording": "AIプロトタイピング"
```

**Step 2: Skills.jsx 아이콘 교체**

현재 `MessageCircle` (comm)와 `Code` (vibecording) 아이콘은 유지 가능. 단 vibecording은 `Cpu` 또는 `Zap` 아이콘으로 변경 고려.

**Step 3: 확인**
Skills 섹션에서 "논문 작성 & 학회 발표" / "AI 프로토타이핑" 카드가 표시되는지 확인.

---

## Task 9: NarrativeScroll 콘텐츠 재작성 (generic → 실제 커리어 서사)

**파일:**
- Modify: `public/locales/en/translation.json`
- Modify: `public/locales/ko/translation.json`
- Modify: `public/locales/jp/translation.json`

**배경:**
현재 4단계(문제인식→가설→솔루션→성과)는 컨설턴트 템플릿. 이력서 기반 실제 서사로 교체:

1. **간호사 → CRC**: 임상 현장에서 보건의료 AI의 사각지대를 직접 목격
2. **3.9억 R&D 총괄**: 프로토콜 설계부터 IRB·CRIS·다기관 운영까지
3. **AI 프레임워크 공동 설계**: 홋카이도대 연구자와 CTC 3중 에이전트 설계
4. **5편의 논문**: 임상검증으로 연구를 닫는 루프

이는 "방법론"이 아니라 "이 사람이 걸어온 길"을 보여주는 섹션으로 전환.

**Step 1: journey.title, subtitle, steps 전면 교체 (3개 locale)**

```json
// ko 예시
"journey": {
    "title": "나의 커리어 여정",
    "subtitle": "간호사 → 임상연구 → AI 디지털헬스",
    "steps": [
        {
            "id": "nursing",
            "icon": "Stethoscope",
            "title": "임상 현장에서 문제를 발견하다",
            "desc": "간호사로서 병동에서 보낸 시간은 제게 하나의 물음을 남겼습니다.\n\"환자는 퇴원 이후에도 재활을 이어갈 수 있을까?\"\n기술적 가능성은 있었지만, 임상적 검증과 사용자 경험을 연결하는 다리가 부족했습니다."
        },
        {
            "id": "crc",
            "icon": "Microscope",
            "title": "3.9억 원 규모 R&D를 설계하다",
            "desc": "가톨릭관동대 국제성모병원에서 CRC로 일하며, AI 기반 디지털 인지훈련 치료제의 다기관 RCT를 처음부터 끝까지 주도했습니다.\nIRB 심의, CRIS 등록, 대상자 모집·관리, 연구비 집행, 교수진·간호사·치료사 다직종 협업 — 임상연구의 전 주기를 직접 운영했습니다."
        },
        {
            "id": "innovation",
            "icon": "Lightbulb",
            "title": "AI 프레임워크를 공동 설계하다",
            "desc": "홋카이도대학교 응용물리학 박사과정 연구자와 함께 '휘와수' 프로젝트를 공동 창시했습니다.\nCoach-Teacher-Companion 3중 에이전트 구조를 통해 고령자가 일상 속에서 자연스럽게 인지훈련을 이어갈 수 있도록 설계했으며, 그 결과를 MDPI Healthcare에 공동 제1저자로 게재했습니다."
        },
        {
            "id": "validation",
            "icon": "BarChart3",
            "title": "논문으로 검증하다",
            "desc": "아이디어로 끝나지 않기 위해, 모든 연구는 데이터로 닫습니다.\nFrontiers in Neurology, Annals of Rehabilitation Medicine, MDPI Healthcare 등에 5편의 논문(게재·게재예정·투고 포함)을 통해 AI 디지털 재활의 임상적 유효성을 검증했습니다."
        }
    ]
}
```

**Step 2: NarrativeScroll.jsx 아이콘 맵에 Stethoscope, Microscope 추가**

```jsx
import { Search, Lightbulb, Cog, BarChart3, Stethoscope, Microscope } from 'lucide-react';
const iconMap = { Search, Lightbulb, Cog, BarChart3, Stethoscope, Microscope };
```

**Step 3: 확인**
섹션 제목이 "나의 커리어 여정"으로 바뀌고 4단계가 실제 커리어 스토리로 표시되는지 확인.

---

## Task 10: Dead Code 정리

**파일:**
- Delete: `src/data/translations.js` (사용되는 곳이 없음 — `grep -r "translations" src/` 로 확인 후 삭제)
- Delete: `src/components/About.module.css` (존재하지도 않는 것 같지만 있다면 삭제)
- Keep: `src/components/DigitalHealthProjects.jsx` (향후 Innovation을 독립 섹션으로 분리 시 사용 가능)

**Step 1: translations.js import 여부 확인**
```bash
grep -r "translations" src/
```
아무 결과 없으면 삭제.

**Step 2: 확인**
`npm run build` 성공 확인.

---

## 작업 우선순위 요약

| 우선순위 | Task | 이유 |
|---|---|---|
| P0 (즉시) | Task 1 | 이력서와 다른 사실 오류 |
| P0 (즉시) | Task 5 | 언어 전환 깨진 UI |
| P1 (중요) | Task 3 | About 섹션 아예 안 보임 |
| P1 (중요) | Task 7 | 3번 연구 카드 재작성 |
| P1 (중요) | Task 8 | Skills 섹션 신뢰도 개선 |
| P1 (중요) | Task 9 | NarrativeScroll 실제 서사로 교체 |
| P2 (개선) | Task 2 | Contact 버튼 추가 |
| P2 (개선) | Task 4 | Header 네비게이션 완성 |
| P2 (개선) | Task 6 | 언어 코드 정상화 |
| P3 (정리) | Task 10 | Dead code 제거 |

---

## 실행 전 확인사항

```bash
cd "/Users/taeksoojung/Desktop/my project/개인 웹사이트/dtxinsight-portfolio"
npm run dev  # 개발 서버 확인
```
