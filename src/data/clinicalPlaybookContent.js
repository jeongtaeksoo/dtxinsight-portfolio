const SUPPORTED_LOCALES = ['ko', 'en', 'ja'];
const DEFAULT_LOCALE = 'ko';

export const resolveClinicalPlaybookLocale = (language = DEFAULT_LOCALE) => {
  const normalized = language.toLowerCase().split('-')[0];
  return SUPPORTED_LOCALES.includes(normalized) ? normalized : DEFAULT_LOCALE;
};

const buildChecklistMailto = (subject, body) => (
  `mailto:jeongtaeksoo8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
);

const clinicalPlaybookContent = {
  ko: {
    eyebrow: 'Clinical Playbook',
    title: '임상시험 폴더는 자료실이 아니라 실무형 수익 허브로 붙는 편이 맞습니다',
    summary: '카카오톡 오픈채팅 분석, 강의 커리큘럼, FAQ 시드, 가격 전략을 그대로 흩어 두지 않고 `무료 체크리스트 → 웨비나 → 코호트 → 멤버십`으로 이어지는 Clinical Playbook 섹션으로 재구성했습니다.',
    primaryCta: {
      label: '무료 체크리스트 요청',
      href: buildChecklistMailto(
        'DTX Insight Clinical Playbook 체크리스트 요청',
        '안녕하세요. Clinical Playbook 무료 체크리스트를 받고 싶습니다.',
      ),
      external: false,
    },
    secondaryCta: {
      label: '웨비나 상담 예약',
      href: 'https://calendly.com/jeongtaeksoo8/30min',
      external: true,
    },
    trustStrip: [
      '대화 행 20,993개 분석',
      '질문형 메시지 5,824건 정리',
      '원문 비공개 · 익명화 재구성',
    ],
    demandTitle: '수요는 이미 검증돼 있습니다',
    demandBody: '가장 큰 반복 수요는 `IRB/ICF`, `회사·직무`, `기관 방문·모니터링`, `EMR·계정`, `면접·채용`, `IP·약국·라벨`이었습니다. 즉, 이 영역은 블로그 소재가 아니라 바로 상품 구조로 전환 가능한 문제군입니다.',
    demandStats: [
      { value: '328', label: 'IRB·ICF 승인/버전 확인' },
      { value: '318', label: '회사·직무 선택과 평판' },
      { value: '275', label: '기관 방문·모니터링 운영' },
      { value: '145', label: '면접·채용 프로세스' },
    ],
    architectureTitle: '가장 좋은 결합 방식',
    architectureItems: [
      {
        title: '홈은 신뢰를 만든다',
        description: '현재 포트폴리오 홈은 연구·실증·임상 운영 역량을 증명하는 역할을 유지합니다.',
      },
      {
        title: 'Playbook은 전환을 만든다',
        description: '같은 도메인 안에서 실무 질문을 해결하는 별도 오퍼 허브를 두고, CTA를 명확히 분리합니다.',
      },
      {
        title: '원문은 공개하지 않는다',
        description: '채팅 데이터는 질문 정규화, 익명화, 신뢰도 표기 원칙 아래에서만 재구성합니다.',
      },
    ],
    offersTitle: '지금 사이트에 바로 붙일 4단계 오퍼',
    offers: [
      {
        stage: 'Free',
        title: 'IRB/ICF 실수 방지 체크리스트',
        description: '이메일 리드를 확보하는 첫 자석입니다. 자료 요청형 CTA로 바로 연결합니다.',
        meta: 'Lead magnet',
      },
      {
        stage: 'Pilot',
        title: 'CRA/CRC가 가장 많이 막히는 10가지 실무',
        description: '90분 웨비나로 첫 결제를 검증합니다. 지금은 상담 예약으로 유입을 받는 구조가 적절합니다.',
        meta: '90-minute webinar',
      },
      {
        stage: 'Core',
        title: '기관별 실무 처리법 마스터',
        description: '4주 코호트로 객단가를 만든 뒤, 후기와 질문 데이터를 다음 상품에 재활용합니다.',
        meta: '4-week cohort',
      },
      {
        stage: 'Recurring',
        title: '기관별 FAQ + 템플릿 멤버십',
        description: 'FAQ DB, 템플릿, 월간 업데이트를 묶어 반복 매출 구조로 확장합니다.',
        meta: 'Membership',
      },
    ],
    principlesTitle: '운영 원칙',
    principles: [
      '기관 SOP와 공식 규정이 항상 우선이라는 점을 모든 오퍼에 명시합니다.',
      '병원·회사·개인 실명 경험담은 그대로 노출하지 않고, 검증 레벨과 최신 확인일을 함께 둡니다.',
      '의료 추천형 질문은 제외하고, 실무형 판단 프레임과 템플릿만 서비스화합니다.',
    ],
    closingTitle: '새 브랜드를 만드는 것보다, 두 번째 진입점을 여는 편이 더 낫습니다',
    closingBody: '이 섹션이 들어가면 현재 사이트는 `포트폴리오 + 판매 랜딩`의 이중 역할을 하게 됩니다. 즉시 매출 검증은 여기서 시작하고, 이후 `/clinical-playbook` 독립 페이지나 멤버십으로 확장하면 됩니다.',
  },
  en: {
    eyebrow: 'Clinical Playbook',
    title: 'The clinical trial folder fits this site best as a revenue-facing playbook, not as a raw archive',
    summary: 'Instead of exposing scattered research notes, chat analysis, curriculum drafts, and pricing memos, this section reframes them into a `free checklist -> webinar -> cohort -> membership` funnel inside the existing DTX Insight brand.',
    primaryCta: {
      label: 'Request Free Checklist',
      href: buildChecklistMailto(
        'Request for DTX Insight Clinical Playbook checklist',
        'Hello, I would like to receive the free Clinical Playbook checklist.',
      ),
      external: false,
    },
    secondaryCta: {
      label: 'Book Webinar Call',
      href: 'https://calendly.com/jeongtaeksoo8/30min',
      external: true,
    },
    trustStrip: [
      '20,993 chat rows analyzed',
      '5,824 question-like messages structured',
      'No raw chat transcripts published',
    ],
    demandTitle: 'The demand signal is already clear',
    demandBody: 'The strongest repeated pain points were `IRB/ICF`, `company and role decisions`, `site visits and monitoring`, `EMR and account access`, `interviews`, and `IP or pharmacy handling`. That makes this material a commercial offer surface, not just a blog topic.',
    demandStats: [
      { value: '328', label: 'IRB and ICF approval issues' },
      { value: '318', label: 'Company and role intelligence' },
      { value: '275', label: 'Site visit and monitoring ops' },
      { value: '145', label: 'Interview and hiring flow' },
    ],
    architectureTitle: 'Best integration pattern',
    architectureItems: [
      {
        title: 'Keep the home page as proof',
        description: 'The current portfolio should continue to establish research, clinical operations, and digital health credibility.',
      },
      {
        title: 'Use the Playbook as the offer hub',
        description: 'Add one conversion-oriented section inside the same domain instead of mixing sales copy across every portfolio block.',
      },
      {
        title: 'Never expose raw source chats',
        description: 'Only publish normalized questions, anonymized patterns, and confidence-labeled guidance.',
      },
    ],
    offersTitle: 'Four offer layers to attach now',
    offers: [
      {
        stage: 'Free',
        title: 'IRB and ICF mistake-prevention checklist',
        description: 'Use this as the first lead magnet and entry CTA.',
        meta: 'Lead magnet',
      },
      {
        stage: 'Pilot',
        title: 'Top 10 operational blockers for CRA and CRC teams',
        description: 'Use a live webinar to validate first-paid demand before building a heavier product.',
        meta: '90-minute webinar',
      },
      {
        stage: 'Core',
        title: 'Site operations mastery cohort',
        description: 'Turn validated patterns into a four-week cohort with templates and decision trees.',
        meta: '4-week cohort',
      },
      {
        stage: 'Recurring',
        title: 'FAQ and template membership',
        description: 'Convert the structured FAQ and template library into recurring revenue once the first offers prove demand.',
        meta: 'Membership',
      },
    ],
    principlesTitle: 'Operating rules',
    principles: [
      'State clearly that institutional SOPs and official regulations always override this service.',
      'Keep confidence labels and last-verified dates on any institution-specific guidance.',
      'Exclude medical recommendation content and focus only on operational judgment, workflow, and templates.',
    ],
    closingTitle: 'This site needs a second entry point, not a second brand',
    closingBody: 'With this section, the existing site keeps its portfolio role while gaining a direct conversion surface. The next step can be a dedicated `/clinical-playbook` page once forms, payments, and gated assets are ready.',
  },
  ja: {
    eyebrow: 'Clinical Playbook',
    title: 'この臨床試験フォルダは、生の資料置き場ではなく収益化導線として載せるのが適切です',
    summary: 'チャット分析、FAQシード、講義設計、価格戦略をそのまま並べるのではなく、既存のDTX Insight内で `無料チェックリスト -> ウェビナー -> コホート -> メンバーシップ` へつながる導線として再構成しました。',
    primaryCta: {
      label: '無料チェックリストを依頼',
      href: buildChecklistMailto(
        'DTX Insight Clinical Playbook チェックリスト依頼',
        'こんにちは。Clinical Playbook の無料チェックリストを受け取りたいです。',
      ),
      external: false,
    },
    secondaryCta: {
      label: 'ウェビナー相談を予約',
      href: 'https://calendly.com/jeongtaeksoo8/30min',
      external: true,
    },
    trustStrip: [
      '20,993件の会話行を分析',
      '質問系メッセージ5,824件を整理',
      '生のチャットは公開しない',
    ],
    demandTitle: '需要はすでに見えています',
    demandBody: '繰り返し多かったテーマは `IRB/ICF`, `会社・職務選択`, `施設訪問・モニタリング`, `EMR・アカウント`, `面接`, `IP・薬局対応` でした。つまりこれは単なるブログ題材ではなく、すぐ商品化できる問題領域です。',
    demandStats: [
      { value: '328', label: 'IRB・ICF承認と版管理' },
      { value: '318', label: '会社・職務インテリジェンス' },
      { value: '275', label: '施設訪問・モニタリング運用' },
      { value: '145', label: '面接・採用フロー' },
    ],
    architectureTitle: '最適な結合方法',
    architectureItems: [
      {
        title: 'ホームは信頼を作る',
        description: '今のポートフォリオは研究・実証・臨床運営の信頼を示す役割を維持します。',
      },
      {
        title: 'Playbookは転換を作る',
        description: '同じドメイン内に実務課題を解く専用オファー面を置き、CTAを明確に分けます。',
      },
      {
        title: '生の会話は出さない',
        description: '公開するのは匿名化・正規化された質問パターンと判断フレームのみです。',
      },
    ],
    offersTitle: '今すぐ載せる4段階オファー',
    offers: [
      {
        stage: 'Free',
        title: 'IRB/ICFミス防止チェックリスト',
        description: '最初のリード獲得用オファーとして機能させます。',
        meta: 'Lead magnet',
      },
      {
        stage: 'Pilot',
        title: 'CRA/CRCが最も詰まりやすい10の実務',
        description: '90分ウェビナーで初回課金ニーズを検証します。',
        meta: '90-minute webinar',
      },
      {
        stage: 'Core',
        title: '施設別実務処理法マスター',
        description: 'テンプレートと判断表を含む4週間コホートに発展させます。',
        meta: '4-week cohort',
      },
      {
        stage: 'Recurring',
        title: 'FAQ・テンプレートメンバーシップ',
        description: 'FAQ DBとテンプレートを定期更新型の収益へつなげます。',
        meta: 'Membership',
      },
    ],
    principlesTitle: '運用原則',
    principles: [
      '施設SOPと公式規定が常に優先であることを明記します。',
      '施設別情報には信頼度と最終確認日を添えます。',
      '医療機関推薦のような高リスク領域は除外し、実務判断とテンプレートに集中します。',
    ],
    closingTitle: '必要なのは新ブランドではなく、第二の入口です',
    closingBody: 'このセクションを入れると、既存サイトはポートフォリオを保ったまま販売導線も持てます。フォームと決済が整った段階で `/clinical-playbook` の独立ページへ拡張すれば十分です。',
  },
};

export const getClinicalPlaybookContent = (language = DEFAULT_LOCALE) => (
  clinicalPlaybookContent[resolveClinicalPlaybookLocale(language)]
    ?? clinicalPlaybookContent[DEFAULT_LOCALE]
);
