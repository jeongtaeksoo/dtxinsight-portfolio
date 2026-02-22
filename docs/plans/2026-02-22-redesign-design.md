# 개인 웹사이트 비주얼 리디자인 설계 문서

**날짜**: 2026-02-22
**프로젝트**: dtxinsight-portfolio
**접근법**: Academic Light (A안 채택)

---

## 1. 리디자인 목표

- 현재 다크 테마 → 라이트 미니멀리즘으로 전환
- Three.js 3D 요소 제거 (성능 및 실용성 향상)
- 한국 연구자/CRO + AI/디지털헬스 업계를 주요 타겟으로 신뢰도 강화
- 애니메이션을 이동 없이 페이드 인만으로 단순화
- KR / EN / JP 3개 언어 지원 유지
- 콘텐츠 변경 없이 디자인(색상, 레이아웃, 인터랙션)만 교체

---

## 2. 디자인 시스템

### 색상 팔레트

```css
--color-background: #FAFAFA;   /* 메인 배경 */
--color-surface:    #FFFFFF;   /* 카드 배경 */
--color-primary:    #7564FF;   /* 브랜드 액센트 (기존 유지) */
--color-secondary:  #0EA5E9;   /* 보조 포인트 (스카이 블루) */
--color-text:       #111827;   /* 본문 */
--color-muted:      #6B7280;   /* 서브텍스트 */
--color-border:     #E5E7EB;   /* 구분선 */
--color-accent-bg:  #F3F0FF;   /* 퍼플 틴트 배경 (뱃지 등) */
```

### 타이포그래피

| 역할 | 크기 | 굵기 |
|------|------|------|
| H1 (이름) | 48–64px | bold |
| H2 (섹션 제목) | 32px | semibold |
| H3 (카드 제목) | 20px | semibold |
| Body | 16px | regular, leading-relaxed |
| Muted / Caption | 14px | regular |

- 폰트: Inter (기존 유지)

### 그림자 & 보더

```css
/* 카드 기본 */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
border: 1px solid #E5E7EB;

/* 카드 호버 */
box-shadow: 0 4px 12px rgba(117, 100, 255, 0.15);
border-color: #7564FF;
```

### 애니메이션 규칙

- **이동 없이 페이드 인만 사용** (x/y translate 제거)
- `opacity: 0 → 1`, `duration: 0.5s`, `ease: easeOut`
- 카드가 여러 개일 때: `stagger: 0.1s` 딜레이
- 라이브러리: Framer Motion 유지

---

## 3. 컴포넌트별 변경 사항

### 3.1 global.css

- `--color-*` 변수 전면 교체 (다크 → 라이트)
- `body` 배경 `#FAFAFA`, 텍스트 `#111827`
- 스크롤바 스타일 라이트 테마에 맞게 조정
- `@react-three/fiber`, `three` 의존성 제거 (package.json)

### 3.2 Header

**현재**: 투명 → 스크롤 시 `bg-background/80 backdrop-blur` (다크)
**변경**:
- `bg-white border-b border-gray-200` 고정
- 스크롤 시 `shadow-sm` 추가
- 로고/텍스트 색상을 다크 텍스트로 조정
- 언어 스위치 버튼: `bg-primary text-white` (활성) / `text-gray-500 hover:text-gray-900`

### 3.3 Hero

**현재**: 중앙 정렬, 글로우 효과, 전체 화면 다크
**변경**: 좌우 2단 레이아웃

```
[좌 50%]                    [우 50%]
임상연구 코디네이터           [프로필 사진]
& AI 디지털헬스 연구원        (rounded-2xl, 그림자)
정택수 · RN
가톨릭관동대 국제성모병원

[이력서 다운로드]  [논문 보기]

── 3.9억 KRW R&D · 1 SCI 논문 ──  (미니 스탯 바)
```

- 배경: `#FAFAFA` (단색, 글로우 제거)
- 프로필 사진: 그림자 있는 둥근 모서리 카드
- 미니 스탯 바: 주요 숫자 3–4개를 수평으로 나열 (`border-l border-gray-200` 구분자)
- 히어로 번역 키 누락 버그 수정 (`hero.name`, `hero.affiliation`, `hero.credential`, `hero.tagline`, `hero.resume` 키 translations.js에 추가)

### 3.4 NarrativeScroll → "My Approach"

**현재**: 좌우 번갈아, 큰 원형 아이콘
**변경**: 수직 타임라인

```
│  01  문제 인식 (Problem Identification)
│      텍스트...
│
│  02  구조화·가설 설정
│      텍스트...
│
│  03  솔루션 설계 및 실행
│      텍스트...
│
│  04  성과 검증 및 개선
│      텍스트...
```

- 좌측: 퍼플 수직 라인 (`border-l-2 border-primary`)
- 번호: 퍼플 원형 뱃지
- 아이콘: 삭제 (텍스트 중심)
- 이동 애니메이션(`x: ±50`) → 페이드 인만

### 3.5 ResearchProjects

**현재**: 다크 WindowCard (macOS 스타일, 검은 헤더 바)
**변경**: 라이트 카드

```
+---------------------------+
| [카테고리 뱃지]             |    ← accent-bg 배경, 퍼플 텍스트
| 프로젝트 제목               |    ← text-gray-900, 20px semibold
| 설명 텍스트...              |    ← text-muted, 14px
|                 [→ CRIS]  |    ← 우측 하단 링크
+---------------------------+
```

- `WindowCard` 컴포넌트 리스타일 (맥OS 스타일 헤더 바 제거)
- 카드: `bg-white border border-gray-200 rounded-xl p-6`
- 호버: `border-primary shadow-md` + 페이드 전환

### 3.6 Publications

**현재**: 다크 WindowCard + 포스터 그리드
**변경**:
- 좌측 논문 목록: 라이트 카드로 리스타일 (구조 동일)
- 우측 포스터 그리드: 보더 `border-gray-200`로 조정, hover zoom 유지
- 논문 상세 모달: 배경 `bg-black/50 backdrop-blur`, 내용 카드 `bg-white text-gray-900`

### 3.7 DigitalHealthProjects (Innovation)

**현재**: Three.js `CTCModel` 인터랙티브 3D 모델 포함
**변경**:
- `CTCModel.jsx` 및 `Background3D.jsx` 파일 삭제
- `@react-three/fiber`, `@react-three/drei`, `three` 패키지 제거
- Hwiwasoo 설명 텍스트 + 3가지 특징 카드 (Context-Aware / Multi-Modal / Evidence-Based) + 외부 링크 버튼 유지
- 배경: 퍼플 틴트 섹션 (`bg-accent-bg` 또는 `bg-primary/5`)

### 3.8 Skills

**현재**: 작은 아이콘 카드 6개, CSS Modules 사용
**변경**:
- CSS Modules → Tailwind inline으로 교체 (스타일 일관성)
- 레이아웃: 2열 그리드, 각 카드에 `아이콘 + 스킬명 + 한 줄 설명`

```
[🩺 아이콘]  임상시험
              다기관 RCT 운영 및 프로토콜 설계
```

### 3.9 Contact (신규 추가)

번역 파일에는 있으나 컴포넌트가 없었음 → 신규 생성

```
연락하기 / Connect / お問い合わせ

협업에 관심이 있거나 제 업무에 대해 궁금한 점이 있으신가요?

[이메일]  [LinkedIn]  [GitHub]

© 2025 DTX Insight. 임상연구 × AI 혁신
```

---

## 4. 제거 목록

| 파일/패키지 | 이유 |
|-------------|------|
| `src/components/Background3D.jsx` | Three.js 배경 제거 |
| `src/components/CTCModel.jsx` | 3D CTC 모델 제거 |
| `src/components/NeuralNetwork.jsx` | Three.js 뉴럴네트워크 제거 |
| `@react-three/fiber` | Three.js 렌더러 |
| `@react-three/drei` | Three.js 헬퍼 |
| `three` | 3D 라이브러리 |
| CSS Modules (`*.module.css`) | Tailwind로 통일 |

---

## 5. 유지 목록

- React 19 + Vite + Tailwind v4
- Framer Motion (애니메이션, 페이드 인만 사용)
- i18next (KR/EN/JP 3개 언어)
- lucide-react (아이콘)
- gh-pages (배포)

---

## 6. 번역 데이터 수정

`translations.js`에 누락된 키 추가 (Hero 버그 수정):

```js
hero: {
  name: '정택수',
  affiliation: '가톨릭관동대학교 국제성모병원 재활의학과',
  credential: 'RN · 임상연구 코디네이터',
  tagline: '임상연구 × AI 디지털헬스 혁신',
  resume: '이력서 다운로드',
  stat1: '3.9억 KRW R&D',
  stat2: 'SCI 논문 게재',
  stat3: '다기관 임상시험',
  ...
}
```

---

## 7. 구현 순서 (우선순위)

1. `global.css` 색상 변수 교체
2. Three.js 파일/패키지 제거
3. Header 라이트 테마 적용
4. Hero 2단 레이아웃 + 번역 버그 수정
5. `WindowCard` 컴포넌트 라이트 스타일로 교체
6. NarrativeScroll 타임라인 리스타일
7. ResearchProjects / Publications 카드 스타일 적용
8. DigitalHealthProjects CTC 모델 제거 후 정리
9. Skills CSS Modules → Tailwind 교체
10. Contact 컴포넌트 신규 생성
11. 전체 애니메이션 페이드 인만으로 통일
