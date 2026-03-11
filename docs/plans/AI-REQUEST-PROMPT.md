# 포트폴리오 웹사이트 개선 작업 요청

아래는 내 개인 포트폴리오 웹사이트(`dtxinsight-portfolio`) 개선 작업입니다.
**각 작업을 순서대로 정확히 실행해 주세요. 추측하지 말고, 아래 명시된 내용만 수정하세요.**

---

## 프로젝트 기본 정보

- **경로**: `/Users/taeksoojung/Desktop/my project/개인 웹사이트/dtxinsight-portfolio/`
- **스택**: React 19 + Vite + Tailwind CSS 4 + Framer Motion + i18next (http-backend)
- **번역 파일 위치**: `public/locales/en/translation.json`, `public/locales/ko/translation.json`, `public/locales/jp/translation.json`
- **개발 서버**: `npm run dev`

---

## 작업 1: 논문 저자 표기 오류 수정 (사실 오류 — 최우선)

**문제**: MDPI Healthcare 논문(publications.items[1])의 role이 세 언어 모두 "제1저자/1st Author/第1著者"로 잘못 표기. 이력서 기준 "공동 제1저자"가 맞음.

**수정할 파일 3개:**

### `public/locales/en/translation.json`
```
찾기:  "role": "1st Author",
       "status": "Published",
       "doi": "https://www.mdpi.com/2227-9032/13/24/3225",

바꾸기: "role": "Co-first Author",
        "status": "Published",
        "doi": "https://www.mdpi.com/2227-9032/13/24/3225",
```
(두 번째로 등장하는 role 항목 — MDPI Healthcare 논문)

### `public/locales/ko/translation.json`
```
찾기:  "role": "제1저자",
       "status": "게재 완료",
       "doi": "https://www.mdpi.com/2227-9032/13/24/3225",

바꾸기: "role": "공동 제1저자",
        "status": "게재 완료",
        "doi": "https://www.mdpi.com/2227-9032/13/24/3225",
```

### `public/locales/jp/translation.json`
```
찾기:  "role": "第1著者",
       "status": "掲載完了",
       "doi": "https://www.mdpi.com/2227-9032/13/24/3225",

바꾸기: "role": "共同第1著者",
        "status": "掲載完了",
        "doi": "https://www.mdpi.com/2227-9032/13/24/3225",
```

---

## 작업 2: Publications.jsx 하드코딩 문자열 국제화

**문제**: 아래 3가지가 언어 전환을 무시하고 고정값으로 표시됨.
1. `innovationFeatureTitles = ['Context-Aware', 'Multi-Modal', 'Evidence-Based']` — 항상 영어
2. 논문 모달 닫기 버튼 `"닫기"` — 항상 한국어
3. `"Summary coming soon."` — 항상 영어

### Step 1: 세 locale 파일에 키 추가

**`public/locales/en/translation.json`** — `"publications"` 객체 안에 추가:
```json
"innovationFeatureTitles": ["Context-Aware", "Multi-Modal", "Evidence-Based"],
"closeBtn": "Close",
"summaryComingSoon": "Summary coming soon."
```

**`public/locales/ko/translation.json`** — `"publications"` 객체 안에 추가:
```json
"innovationFeatureTitles": ["맥락 인식", "멀티모달", "근거 기반"],
"closeBtn": "닫기",
"summaryComingSoon": "요약 준비 중입니다."
```

**`public/locales/jp/translation.json`** — `"publications"` 객체 안에 추가:
```json
"innovationFeatureTitles": ["コンテキスト認識", "マルチモーダル", "エビデンスベース"],
"closeBtn": "閉じる",
"summaryComingSoon": "要約を準備中です。"
```

### Step 2: `src/components/Publications.jsx` 수정

**현재 코드 (파일 상단 const 선언):**
```js
const innovationFeatureTitles = ['Context-Aware', 'Multi-Modal', 'Evidence-Based'];
```
**수정 후:**
```js
const innovationFeatureTitles = t('publications.innovationFeatureTitles', { returnObjects: true }) || ['Context-Aware', 'Multi-Modal', 'Evidence-Based'];
```
(이 줄은 `const Publications = () => {` 함수 안으로 이동해야 `t()`를 사용할 수 있음)

**현재 코드 (닫기 버튼, 약 255번째 줄 근처):**
```jsx
<button
    onClick={() => setSelectedPaper(null)}
    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-text text-xs rounded-lg transition-colors border border-border font-semibold"
>
    닫기
</button>
```
**수정 후:**
```jsx
<button
    onClick={() => setSelectedPaper(null)}
    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-text text-xs rounded-lg transition-colors border border-border font-semibold"
>
    {t('publications.closeBtn')}
</button>
```

**현재 코드 (Summary 없을 때 표시, 약 247번째 줄 근처):**
```jsx
<div className="text-center py-8 text-muted text-sm italic">
    Summary coming soon.
</div>
```
**수정 후:**
```jsx
<div className="text-center py-8 text-muted text-sm italic">
    {t('publications.summaryComingSoon')}
</div>
```

---

## 작업 3: About 컴포넌트 렌더링 복원

**문제**: `About.jsx`가 CSS Module을 import하지만 해당 파일이 없고, `App.jsx`에 포함되지도 않아 아예 렌더링이 안 됨.

### Step 1: `src/components/About.jsx` 전체 교체

파일 전체를 아래로 교체:
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

### Step 2: `src/App.jsx` 수정

**현재:**
```jsx
import Hero from './components/Hero'
import NarrativeScroll from './components/NarrativeScroll'
import ResearchProjects from './components/ResearchProjects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Hero />
      <NarrativeScroll />
      <ResearchProjects />
      <Publications />
      <Skills />
    </Layout>
  );
}
```

**수정 후:**
```jsx
import Hero from './components/Hero'
import About from './components/About'
import NarrativeScroll from './components/NarrativeScroll'
import ResearchProjects from './components/ResearchProjects'
import Publications from './components/Publications'
import Skills from './components/Skills'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <NarrativeScroll />
      <ResearchProjects />
      <Publications />
      <Skills />
    </Layout>
  );
}

export default App;
```

---

## 작업 4: Hero 섹션 — Contact 버튼 추가

**문제**: 번역 파일에 `hero.contactBtn` 키가 있지만 실제 버튼이 없음.

**파일**: `src/components/Hero.jsx`

**현재 코드 (CTA 버튼 영역, 약 43~63번째 줄):**
```jsx
<div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
    <a
        href="/RESUME.pdf"
        download="RESUME.pdf"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm text-sm"
    >
        <Download size={15} />
        {t('hero.resume')}
    </a>
    <a
        href="#research"
        onClick={(e) => {
            e.preventDefault();
            document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors text-sm"
    >
        {t('hero.researchBtn')}
        <ArrowRight size={15} />
    </a>
</div>
```

**수정 후 (버튼 1개 추가):**
```jsx
<div className="flex flex-wrap gap-3 justify-center md:justify-start mb-10">
    <a
        href="/RESUME.pdf"
        download="RESUME.pdf"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm text-sm"
    >
        <Download size={15} />
        {t('hero.resume')}
    </a>
    <a
        href="#research"
        onClick={(e) => {
            e.preventDefault();
            document.querySelector('#research')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text rounded-lg font-semibold hover:border-primary hover:text-primary transition-colors text-sm"
    >
        {t('hero.researchBtn')}
        <ArrowRight size={15} />
    </a>
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
</div>
```

---

## 작업 5: Header 네비게이션 수정

**문제**: `nav.about`이 `#top`(최상단)으로 링크되어 있어 About 섹션으로 이동 안 됨. `nav.innovation` 링크도 누락.

**파일**: `src/components/Header.jsx`

**현재 코드 (약 25~30번째 줄):**
```js
const navLinks = [
    { name: t('nav.about'), href: '#top' },
    { name: t('nav.research'), href: '#research' },
    { name: t('nav.publications'), href: '#publications' },
    { name: t('nav.contact'), href: '#contact' },
];
```

**수정 후:**
```js
const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.research'), href: '#research' },
    { name: t('nav.publications'), href: '#publications' },
    { name: t('nav.innovation'), href: '#innovation' },
    { name: t('nav.contact'), href: '#contact' },
];
```

---

## 작업 6: 언어 코드 정상화 (jp → ja)

**문제**: 일본어 ISO 코드는 `ja`인데 `jp`를 사용 중. 또한 언어 버튼 레이블이 `EN | 日本語 | KR`로 일관성 없음.

### Step 1: 폴더 이름 변경
```bash
mv "/Users/taeksoojung/Desktop/my project/개인 웹사이트/dtxinsight-portfolio/public/locales/jp" \
   "/Users/taeksoojung/Desktop/my project/개인 웹사이트/dtxinsight-portfolio/public/locales/ja"
```

### Step 2: `src/components/Header.jsx` 언어 배열 수정

**현재 (약 45~49번째 줄):**
```js
const languages = [
    { code: 'en', label: 'EN' },
    { code: 'jp', label: '日本語' },
    { code: 'ko', label: 'KR' },
];
```

**수정 후:**
```js
const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ja', label: 'JA' },
    { code: 'ko', label: 'KO' },
];
```

---

## 작업 7: 연구 카드 #3 내용 재작성

**문제**: 세 번째 연구 카드가 "Q&A 세션 진행"으로만 표현되어 있어 임팩트가 없음. 실제로는 보건복지부 국장급 인사들 앞에서 발표한 경험으로, 맥락을 살려 재작성.

**수정할 파일 3개** — 각 파일의 `research.projects` 배열 세 번째 항목([2]):

### `public/locales/en/translation.json`
```json
{
    "title": "Government-Level Digital Health Demonstration",
    "category": "Regulatory Affairs & Presentation",
    "description": "Led Q&A at MOHW/KHIDI mid-term demonstration review attended by Director-General of Advanced Medical Technology, Deputy Director of Health IT Policy, and KHIDI Biohealth Innovation Division Head — representing clinical research outcomes to national policy stakeholders."
}
```

### `public/locales/ko/translation.json`
```json
{
    "title": "정부 디지털 헬스케어 실증사업 발표",
    "category": "규제·정책 대응",
    "description": "보건복지부 첨단의료지원관 국장·의료정보정책과장·한국보건산업진흥원 바이오헬스혁신본부장 등 국책 주요 인사 대상 실증사업 중간보고 Q&A 세션 주도 — 임상연구 성과를 정책 결정자에게 직접 발표"
}
```

### `public/locales/jp/translation.json`
```json
{
    "title": "政府デジタルヘルスケア実証事業発表",
    "category": "規制・政策対応",
    "description": "保健福祉部先端医療支援官局長・医療情報政策課長・韓国保健産業振興院バイオヘルス革新本部長等の国策主要人士を対象とした実証事業中間報告Q&Aセッションを主導 — 臨床研究成果を政策立案者に直接発表"
}
```

---

## 작업 8: Skills 섹션 개선

**문제**: "Communication"(너무 범용적)과 "Vibecording"(비공식 표현)을 이력서 기반으로 교체.

**수정할 파일 3개** — 각 파일의 `skills.items`와 `skills.descriptions`:

### `public/locales/en/translation.json`
`skills.items` 안:
```
"comm": "Publications & Presentation"  (기존: "Communication")
"vibecording": "AI Prototyping"         (기존: "Vibecording")
```
`skills.descriptions` 안:
```
"comm": "SCI/ESCI/KCI papers (incl. submissions) & conference poster presentations"
"vibecording": "Rapid prototyping of clinical AI tools via AI-assisted development (Vite, React, Python)"
```

### `public/locales/ko/translation.json`
`skills.items` 안:
```
"comm": "논문 작성 & 학회 발표"   (기존: "커뮤니케이션")
"vibecording": "AI 프로토타이핑"   (기존: "Vibecording")
```
`skills.descriptions` 안:
```
"comm": "SCI·ESCI·KCI 논문(투고 포함) 작성 및 학회 포스터 발표"
"vibecording": "AI 기반 임상 도구 신속 프로토타이핑 (Vite, React, Python)"
```

### `public/locales/jp/translation.json`
`skills.items` 안:
```
"comm": "論文執筆・学会発表"      (기존: "コミュニケーション")
"vibecording": "AIプロトタイピング"  (기존: "Vibecording")
```
`skills.descriptions` 안:
```
"comm": "SCI・ESCI・KCI論文（投稿含む）執筆および学会ポスター発表"
"vibecording": "Vite・React・PythonによるAI支援臨床ツールの高速プロトタイピング"
```

---

## 작업 9: NarrativeScroll 콘텐츠 재작성

**문제**: 현재 4단계(문제인식→가설→솔루션→성과)는 아무나 붙여넣을 수 있는 컨설팅 템플릿. 실제 커리어 서사로 교체.

### Step 1: `src/components/NarrativeScroll.jsx` 아이콘 import 수정

**현재 (1~6번째 줄):**
```jsx
import { Search, Lightbulb, Cog, BarChart3 } from 'lucide-react';

const iconMap = { Search, Lightbulb, Cog, BarChart3 };
const defaultIcons = [Search, Lightbulb, Cog, BarChart3];
```

**수정 후:**
```jsx
import { Search, Lightbulb, Cog, BarChart3, Stethoscope, Microscope } from 'lucide-react';

const iconMap = { Search, Lightbulb, Cog, BarChart3, Stethoscope, Microscope };
const defaultIcons = [Stethoscope, Microscope, Lightbulb, BarChart3];
```

### Step 2: 세 locale 파일의 `journey` 섹션 전체 교체

**`public/locales/ko/translation.json`** — `"journey"` 객체 전체:
```json
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

**`public/locales/en/translation.json`** — `"journey"` 객체 전체:
```json
"journey": {
    "title": "My Career Journey",
    "subtitle": "Nurse → Clinical Research → AI Digital Health",
    "steps": [
        {
            "id": "nursing",
            "icon": "Stethoscope",
            "title": "Identifying the Problem at the Bedside",
            "desc": "As a nurse, working on the ward left me with one persistent question:\n\"Can patients continue their rehabilitation after discharge?\"\nThe technology existed, but there was a missing bridge between clinical validation and real-world user experience."
        },
        {
            "id": "crc",
            "icon": "Microscope",
            "title": "Designing a 390M KRW R&D Program",
            "desc": "As a CRC at International St. Mary's Hospital, I led a multi-center RCT for an AI-based digital cognitive rehabilitation program from the ground up.\nIRB approval, CRIS registration, participant recruitment, budget management, and cross-disciplinary coordination with physicians, nurses, and therapists — I operated the full clinical research lifecycle."
        },
        {
            "id": "innovation",
            "icon": "Lightbulb",
            "title": "Co-designing an AI Framework",
            "desc": "I co-founded the 'Hwiwasoo' project with a PhD researcher in Applied Physics at Hokkaido University.\nWe designed a Coach-Teacher-Companion triple-agent system enabling older adults to engage in cognitive training naturally in daily life. The result was published in MDPI Healthcare as co-first author."
        },
        {
            "id": "validation",
            "icon": "BarChart3",
            "title": "Closing the Loop with Evidence",
            "desc": "Ideas are only as good as their evidence.\nThrough 5 papers (published, accepted, and submitted) in Frontiers in Neurology, Annals of Rehabilitation Medicine, and MDPI Healthcare, I have validated the clinical efficacy of AI-based digital rehabilitation."
        }
    ]
}
```

**`public/locales/ja/translation.json`** — `"journey"` 객체 전체:
```json
"journey": {
    "title": "私のキャリアの歩み",
    "subtitle": "看護師 → 臨床研究 → AIデジタルヘルス",
    "steps": [
        {
            "id": "nursing",
            "icon": "Stethoscope",
            "title": "臨床現場で問題を発見する",
            "desc": "看護師として病棟で過ごした時間は、私に一つの問いを残しました。\n「患者は退院後もリハビリを続けられるのか？」\n技術的な可能性はありましたが、臨床的検証とユーザー体験をつなぐ橋が不足していました。"
        },
        {
            "id": "crc",
            "icon": "Microscope",
            "title": "3.9億ウォン規模のR&Dを設計する",
            "desc": "カトリック関東大学国際聖母病院でCRCとして、AIベースのデジタル認知訓練治療薬の多施設RCTを最初から最後まで主導しました。\nIRB審議、CRIS登録、参加者募集・管理、研究費執行、教授・看護師・療法士との多職種連携 — 臨床研究の全サイクルを直接運営しました。"
        },
        {
            "id": "innovation",
            "icon": "Lightbulb",
            "title": "AIフレームワークを共同設計する",
            "desc": "北海道大学応用物理学専攻の博士課程研究者と共に「휘와수(Hwiwasoo)」プロジェクトを共同創設しました。\nCoach-Teacher-Companion 3重エージェント構造を通じて、高齢者が日常生活の中で自然に認知訓練を継続できるよう設計し、その成果をMDPI Healthcareに共同第1著者として発表しました。"
        },
        {
            "id": "validation",
            "icon": "BarChart3",
            "title": "論文でエビデンスを示す",
            "desc": "アイデアだけで終わらせないために、すべての研究はデータで締めくくります。\nFrontiers in Neurology、Annals of Rehabilitation Medicine、MDPI Healthcareなどに5本の論文（掲載済み・受理済み・投稿中を含む）を通じて、AIデジタルリハビリテーションの臨床的有効性を検証しました。"
        }
    ]
}
```

---

## 작업 10: Dead Code 정리

**확인 후 삭제:**

1. 아래 명령어로 `translations.js`가 실제로 사용되는지 확인:
```bash
grep -r "translations" "/Users/taeksoojung/Desktop/my project/개인 웹사이트/dtxinsight-portfolio/src/"
```
결과가 없으면 `src/data/translations.js` 파일 삭제.

2. `src/components/About.module.css` 파일이 존재하면 삭제 (작업 3에서 About.jsx를 Tailwind로 재작성했으므로 불필요).

---

## 최종 확인 체크리스트

모든 작업 완료 후 `npm run dev`로 확인:

- [ ] Publications 섹션 — MDPI Healthcare 논문 role이 "공동 제1저자 / Co-first Author / 共同第1著者"로 표시
- [ ] 언어 전환 시 논문 모달 닫기 버튼이 "닫기 / Close / 閉じる"로 변경
- [ ] 언어 전환 시 "요약 준비 중입니다. / Summary coming soon. / 要約を準備中です。"로 변경
- [ ] Hero 아래에 "철학 & 접근법 / Philosophy & Approach" 섹션 표시
- [ ] Hero CTA 버튼이 3개 (이력서 다운로드, 연구 보기, 연락하기)
- [ ] 헤더 네비에 "혁신 / Innovation / 革新" 링크 존재
- [ ] 언어 버튼이 "EN | JA | KO" 로 표시
- [ ] JA 클릭 시 일본어 번역 정상 로딩
- [ ] "나의 커리어 여정 / My Career Journey" 섹션이 4단계 실제 서사로 표시
- [ ] Skills 섹션에 "논문 작성 & 학회 발표 / Publications & Presentation" 카드 표시
- [ ] Skills 섹션에 "AI 프로토타이핑 / AI Prototyping" 카드 표시
- [ ] 3번 연구 카드가 "정부 디지털 헬스케어 실증사업 발표"로 표시
