const SUPPORTED_BLOG_LOCALES = ['ko', 'en', 'ja'];
const DEFAULT_BLOG_LOCALE = 'ko';

const BLOG_CATEGORY_LABELS = {
  ai: {
    ko: 'AI',
    en: 'AI',
    ja: 'AI',
  },
  healthcare: {
    ko: '헬스케어',
    en: 'Healthcare',
    ja: 'ヘルスケア',
  },
  daily: {
    ko: '일상',
    en: 'Daily',
    ja: '日常',
  },
};

export const resolveBlogLocale = (language = DEFAULT_BLOG_LOCALE) => {
  const normalized = language.toLowerCase().split('-')[0];
  return SUPPORTED_BLOG_LOCALES.includes(normalized) ? normalized : DEFAULT_BLOG_LOCALE;
};

export const getBlogCategoryLabel = (category, language = DEFAULT_BLOG_LOCALE) => {
  const locale = resolveBlogLocale(language);
  return BLOG_CATEGORY_LABELS[category]?.[locale] ?? category ?? 'Post';
};

export const getLocalizedBlogPost = (post, language = DEFAULT_BLOG_LOCALE) => {
  const locale = resolveBlogLocale(language);
  const localized = post.locales[locale] ?? post.locales[DEFAULT_BLOG_LOCALE];
  const localizedHero = localized.heroImage ?? {};

  return {
    ...post,
    ...localized,
    heroImage: {
      ...post.heroImage,
      ...localizedHero,
    },
    categoryLabel: getBlogCategoryLabel(post.category, locale),
    keywords: localized.keywords ?? [getBlogCategoryLabel(post.category, locale)],
    locale,
  };
};

export const blogPosts = [
  {
    slug: 'why-hospitals-start-with-documentation-before-diagnosis-in-generative-ai',
    category: 'healthcare',
    createdAt: '2026-03-31T11:05:00+09:00',
    heroImage: {
      src: '/blog/healthcare-ai-workflow-hero.jpg',
    },
    locales: {
      ko: {
        title: '병원은 왜 생성형 AI를 진료보다 기록 업무부터 바꾸고 있을까',
        keywords: ['헬스케어'],
        excerpt: '최근 병원 현장에서는 생성형 AI를 진단 그 자체보다 문서화, 분류, 전환 관리, 접근성 개선 같은 워크플로 업무에 먼저 붙이는 흐름이 더 뚜렷하게 보입니다.',
        heroImage: {
          alt: '병원에서 의료진이 컴퓨터 앞에서 환자 정보와 업무 흐름을 함께 검토하는 모습',
          caption: '병원 현장에서 생성형 AI는 대개 가장 먼저 기록, 정리, 연결 업무부터 바꾸기 시작합니다.',
        },
        contentHtml: `
          <p>헬스케어에서 생성형 AI 이야기를 할 때 사람들의 시선은 자연스럽게 진단으로 쏠립니다. 정말 의사를 대신할 수 있는지, 판독을 더 정확하게 할 수 있는지, 임상 판단을 어디까지 맡길 수 있는지가 가장 큰 질문처럼 보이기 때문입니다.</p>
          <p>그런데 2026년 3월 31일 기준으로 실제 병원 현장에서 먼저 커지고 있는 영역은 조금 다릅니다. 진단 그 자체보다 문서화, 코딩, 분류, 전환 관리, 언어 장벽 해소, 예약과 접수 같은 워크플로 업무에서 생성형 AI의 존재감이 더 빠르게 커지고 있습니다.</p>
          <p>이 흐름은 우연이라기보다 꽤 현실적인 선택에 가깝습니다. 병원은 왜 생성형 AI를 진료 판단보다 기록 업무부터 바꾸고 있을까요.</p>

          <h3>가장 먼저 효과가 보이는 곳이 기록과 행정이기 때문입니다</h3>
          <p>병원은 이미 오래전부터 사람과 시간이 부족한 구조 안에서 움직여 왔습니다. 진료실 안에서는 의사와 간호사, 코디네이터, 행정팀이 각자 다른 종류의 기록과 확인 업무를 반복합니다. 그래서 생성형 AI가 가장 먼저 가치를 보이는 지점도 자연스럽게 이 영역이 됩니다.</p>
          <p>3월 초 HIMSS26을 전후로 나온 현장 기사들을 보면, Cleveland Clinic은 AI를 임상 문서화, 코딩, 패혈증 감지 같은 워크플로에 붙여 생산성을 높이고 있다고 설명했고, McLeod Health 사례에서는 재무 지표보다 임상 워크플로의 마찰을 줄이는 쪽에 초점을 맞췄다는 메시지가 반복되었습니다.</p>
          <p>이런 맥락에서는 생성형 AI가 “의사를 대신하는 도구”보다 “기록과 정리 부담을 덜어주는 도구”로 먼저 받아들여지는 편이 훨씬 자연스럽습니다.</p>
          <blockquote>병원에서 AI의 첫 승부처는 판단 그 자체보다, 사람이 매일 반복해서 떠안는 문서와 조정 업무에 더 가깝습니다.</blockquote>

          <h3>앰비언트 문서화가 특히 빠르게 퍼지는 이유가 있습니다</h3>
          <p>최근 업계 기사에서 가장 자주 보이는 표현 중 하나가 ambient speech AI입니다. Becker's는 이 흐름을 전자차트(EHR) 도입 이후 가장 강한 수준의 채택 압력이 있는 기술로 소개했고, 현장에서는 이것이 단순 받아쓰기나 기존 음성 인식과는 다르다는 점을 강조합니다.</p>
          <p>핵심은 진료 중 대화를 맥락 있게 정리해 문서 초안을 만들어준다는 점입니다. 이 방식은 의사의 임상 판단을 직접 바꾸지 않으면서도, 체감되는 피로도와 퇴근 후 차트 정리 시간을 크게 줄일 수 있습니다. 그래서 실제로는 위험이 비교적 낮고 체감 효용은 매우 큰 영역으로 받아들여집니다.</p>
          <p>헬스케어 AI가 현장에서 빠르게 자리 잡으려면, 이렇게 “바로 쓸 수 있고, 바로 덜 힘들어지는” 사용 사례가 먼저 나오는 편이 맞습니다.</p>

          <h3>병원은 진단보다 보조와 연결 업무에서 먼저 신뢰를 쌓고 있습니다</h3>
          <p>이 흐름은 문서화에만 머물지 않습니다. MobiHealthNews에서 다룬 AWS의 Amazon Connect Health 사례를 보면, 환자 확인, 앰비언트 문서화, 행정 업무 자동화를 EHR와 연결하는 방향이 전면에 나옵니다. 같은 시기 기사에서는 AI 기반 행동건강 분류(triage)가 대기 시간을 줄이는 데 활용되는 사례도 소개됐습니다.</p>
          <p>Healthcare IT News에서는 퇴원 안내문 번역처럼 언어 장벽을 낮추는 사용 사례도 다뤘습니다. 이것 역시 진단을 대신하는 일은 아니지만, 실제 환자 경험과 운영 효율에 바로 닿는 영역입니다.</p>
          <ul>
            <li>문서화와 요약은 반복성이 높고 효과 측정이 비교적 쉽습니다.</li>
            <li>접수, 확인, 분류, 전환 관리는 병목이 자주 생기는 영역입니다.</li>
            <li>번역과 설명 보조는 환자 경험과 안전에 직접 연결되지만, 최종 책임은 여전히 사람에게 남겨둘 수 있습니다.</li>
          </ul>
          <p>즉 병원은 생성형 AI를 가장 민감한 판단 단계에 곧바로 넣기보다, 보조와 연결 업무에서 먼저 신뢰를 쌓아가는 모습에 가깝습니다.</p>

          <h3>규제와 거버넌스도 이런 순서를 더 강하게 만듭니다</h3>
          <p>여기에는 규제 환경도 큰 영향을 줍니다. FDA는 2026년 1월 29일 자 Clinical Decision Support Software 최종 가이던스를 다시 공지했고, 3월 11일에는 이를 설명하는 타운홀까지 열었습니다. 이 가이던스는 어떤 소프트웨어 기능이 비기기(non-device) CDS에 가까운지, 또 어떤 기능은 여전히 의료기기 규제 대상이 될 수 있는지를 더 분명하게 설명합니다.</p>
          <p>이런 흐름을 병원 입장에서 해석하면 방향이 선명해집니다. 설명 가능성과 검토 가능성이 높은 보조 기능, 예를 들어 요약, 문서 초안, 정보 정리, 위험 신호 표시 같은 영역부터 먼저 붙이는 편이 훨씬 운영하기 쉽습니다. 반대로 진단을 직접 대체하거나, 의료진이 결과를 거의 그대로 따르게 만드는 구조는 임상·법적 책임이 훨씬 무겁습니다.</p>
          <p>그래서 병원은 기술이 약해서가 아니라, 책임 구조가 다르기 때문에 기록과 운영부터 먼저 바꾸고 있다고 보는 편이 더 정확합니다.</p>

          <h3>결국 중요한 것은 ‘진단 AI’보다 ‘현장에 붙는 AI’입니다</h3>
          <p>헬스케어에서 생성형 AI가 의미 있으려면, 화려한 데모보다 실제로 업무에 붙는 방식이 더 중요합니다. 기록 시간을 줄였는지, 중복 입력을 줄였는지, 전환 정보를 더 빨리 확인하게 했는지, 언어 장벽을 낮췄는지처럼 구체적인 변화가 먼저 보여야 합니다.</p>
          <p>Healthcare IT News에서 반복해 나온 메시지도 비슷했습니다. 임상 우선순위와 맞아야 하고, 측정 가능해야 하며, 신뢰와 교육, 거버넌스가 함께 가야 한다는 점입니다. 헬스케어는 다른 산업보다 더 느리게 보일 수 있지만, 그 대신 한 번 자리를 잡으면 운영 구조 전체에 영향을 줍니다.</p>
          <p>그래서 지금 병원 현장의 생성형 AI를 볼 때는 “왜 아직 진단을 대신하지 못하나”라고 묻기보다, “어떤 워크플로부터 바꾸고 있으며 그 순서가 왜 그렇게 잡혔나”를 먼저 보는 편이 훨씬 현실에 가깝습니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://www.beckershospitalreview.com/rankings-and-ratings/klas-says-ambient-speech-ai-is-nothing-like-any-healthcare-tech-since-the-ehr-heres-why/" target="_blank" rel="noreferrer">Becker's Hospital Review: ambient speech AI adoption</a></li>
            <li><a href="https://www.healthcarefinancenews.com/news/ais-value-healthcare-goes-beyond-hard-roi" target="_blank" rel="noreferrer">Healthcare Finance News: AI’s value in healthcare goes beyond hard ROI</a></li>
            <li><a href="https://cloudgate.healthcareitnews.com/news/embed-ai-clinically-measurable-sustainable-and-trusted-ways" target="_blank" rel="noreferrer">Healthcare IT News: Embed AI clinically in measurable, sustainable and trusted ways</a></li>
            <li><a href="https://www.mobihealthnews.com/news/qa-aws-launches-amazon-connect-health-streamline-healthcare-workflows" target="_blank" rel="noreferrer">MobiHealthNews: AWS launches Amazon Connect Health</a></li>
            <li><a href="https://www.mobihealthnews.com/video/how-cleveland-clinic-infusing-ai-across-workflows" target="_blank" rel="noreferrer">MobiHealthNews: How Cleveland Clinic is infusing AI across workflows</a></li>
            <li><a href="https://www.mobihealthnews.com/video/ai-accelerates-triage-behavioral-health-treatment" target="_blank" rel="noreferrer">MobiHealthNews: AI accelerates triage for behavioral health treatment</a></li>
            <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software" target="_blank" rel="noreferrer">FDA: Clinical Decision Support Software Guidance</a></li>
            <li><a href="https://www.fda.gov/medical-devices/medical-devices-news-and-events/town-hall-clinical-decision-support-software-final-guidance-03112026" target="_blank" rel="noreferrer">FDA: CDS final guidance town hall, March 11, 2026</a></li>
          </ul>
        `,
      },
      en: {
        title: 'Why Hospitals Are Letting Generative AI Change Documentation Before Diagnosis',
        keywords: ['Healthcare'],
        excerpt: 'In real hospital operations, generative AI is showing up first in documentation, coding, triage, transitions and access work rather than in direct diagnostic judgment.',
        heroImage: {
          alt: 'Clinical staff in a hospital reviewing patient information and workflow tasks on a computer',
          caption: 'In many health systems, generative AI begins by changing recording, organizing and coordination work before it changes clinical judgment.',
        },
        contentHtml: `
          <p>When people talk about generative AI in healthcare, attention quickly jumps to diagnosis. Can it read better, decide faster, or replace part of a clinician's judgment?</p>
          <p>But as of March 31, 2026, the strongest pattern in real hospital operations looks different. Generative AI is showing up first in documentation, coding, triage, transition management, language support and administrative workflows rather than in direct diagnostic decision-making.</p>
          <p>That is not a sign that the technology is weak. It is a sign that hospitals are making a practical choice about where value appears first and where risk is easier to manage.</p>

          <h3>The first visible gains are in documentation and admin burden</h3>
          <p>Hospitals have long operated under time pressure and staffing strain. Clinicians, nurses, coordinators and operations teams all carry layers of repetitive recording and verification work. That is exactly why generative AI is finding traction there first.</p>
          <p>In early March around HIMSS26, Cleveland Clinic described using AI across workflows such as clinical documentation, coding and sepsis detection, while McLeod Health leaders emphasized reducing friction in clinical workflows rather than chasing financial return alone. That is a useful signal. Hospitals are rewarding tools that remove daily drag before they reward tools that attempt to take over judgment.</p>
          <blockquote>In healthcare, AI often proves itself first by reducing burden, not by replacing the clinician.</blockquote>

          <h3>Ambient documentation is spreading because the value is immediate</h3>
          <p>One of the clearest examples is ambient speech AI. Becker's described it as a category seeing a level of adoption pressure unlike almost anything since the EHR transition. The appeal is straightforward: capture the encounter, understand the context, and produce a useful documentation draft without turning the visit into a typing exercise.</p>
          <p>This matters because it changes a painful part of the workday without directly taking ownership of diagnosis. It reduces charting time, after-hours cleanup and cognitive fatigue while keeping the clinician in the review loop. That makes the value both visible and operationally easier to trust.</p>

          <h3>Hospitals are building trust through augmentation and coordination</h3>
          <p>The same pattern appears beyond note creation. MobiHealthNews' reporting on Amazon Connect Health highlighted administrative work, patient verification and ambient documentation tied into EHR workflows. Separate HIMSS coverage also showed AI-assisted triage in behavioral health and workflow examples from Cleveland Clinic focused on coding and documentation.</p>
          <p>Healthcare IT News also pointed to practical uses such as reducing language barriers in discharge notes. None of these examples fully replace clinical reasoning. What they do is improve the flow around care: faster intake, clearer handoffs, better documentation and less repetitive friction.</p>
          <ul>
            <li>Documentation is repetitive and easier to measure.</li>
            <li>Triage and intake address visible bottlenecks.</li>
            <li>Translation and communication support improve access without removing human oversight.</li>
          </ul>

          <h3>Regulation and governance reinforce this order of adoption</h3>
          <p>Regulatory context matters here. The FDA reissued its final Clinical Decision Support Software guidance on January 29, 2026 and held a town hall on March 11, 2026 to discuss it. The guidance clarifies how the agency thinks about CDS functions that may fall outside device regulation and those that still remain within device oversight.</p>
          <p>From a hospital operations perspective, that makes the adoption sequence easier to understand. Summaries, documentation drafts, information organization and other support functions are generally easier to explain, review and govern than systems that risk becoming de facto diagnostic authorities.</p>
          <p>So hospitals are not necessarily moving slowly because they lack ambition. They are moving in an order that fits clinical accountability.</p>

          <h3>The real question is not whether AI can diagnose, but where it fits safely today</h3>
          <p>For healthcare leaders, the more useful question right now is not simply whether generative AI can do more. It is where it can be embedded in ways that are measurable, sustainable and trusted. That is also the message running through recent HIMSS26 reporting: align AI with clinical priorities, educate the workforce, measure impact transparently and keep governance close to deployment.</p>
          <p>Healthcare may look slower than other sectors, but that is partly because the threshold for trust is higher. And that is exactly why the current order of adoption makes sense. Before AI changes diagnosis at scale, it is changing the work that surrounds care.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://www.beckershospitalreview.com/rankings-and-ratings/klas-says-ambient-speech-ai-is-nothing-like-any-healthcare-tech-since-the-ehr-heres-why/" target="_blank" rel="noreferrer">Becker's Hospital Review: ambient speech AI adoption</a></li>
            <li><a href="https://www.healthcarefinancenews.com/news/ais-value-healthcare-goes-beyond-hard-roi" target="_blank" rel="noreferrer">Healthcare Finance News: AI’s value in healthcare goes beyond hard ROI</a></li>
            <li><a href="https://cloudgate.healthcareitnews.com/news/embed-ai-clinically-measurable-sustainable-and-trusted-ways" target="_blank" rel="noreferrer">Healthcare IT News: Embed AI clinically in measurable, sustainable and trusted ways</a></li>
            <li><a href="https://www.mobihealthnews.com/news/qa-aws-launches-amazon-connect-health-streamline-healthcare-workflows" target="_blank" rel="noreferrer">MobiHealthNews: AWS launches Amazon Connect Health</a></li>
            <li><a href="https://www.mobihealthnews.com/video/how-cleveland-clinic-infusing-ai-across-workflows" target="_blank" rel="noreferrer">MobiHealthNews: How Cleveland Clinic is infusing AI across workflows</a></li>
            <li><a href="https://www.mobihealthnews.com/video/ai-accelerates-triage-behavioral-health-treatment" target="_blank" rel="noreferrer">MobiHealthNews: AI accelerates triage for behavioral health treatment</a></li>
            <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software" target="_blank" rel="noreferrer">FDA: Clinical Decision Support Software Guidance</a></li>
            <li><a href="https://www.fda.gov/medical-devices/medical-devices-news-and-events/town-hall-clinical-decision-support-software-final-guidance-03112026" target="_blank" rel="noreferrer">FDA: CDS final guidance town hall, March 11, 2026</a></li>
          </ul>
        `,
      },
      ja: {
        title: '病院はなぜ生成AIを診断より先に記録業務へ入れているのか',
        keywords: ['ヘルスケア'],
        excerpt: '病院の現場では、生成AIは診断そのものよりも、記録、コーディング、トリアージ、連携、アクセス改善のようなワークフロー業務から先に入り始めています。',
        heroImage: {
          alt: '病院で医療スタッフがコンピュータの前で患者情報と業務フローを確認している様子',
          caption: '多くの医療機関で、生成AIはまず記録、整理、連携の仕事から変え始めています。',
        },
        contentHtml: `
          <p>ヘルスケアで生成AIを語るとき、人々の視線は自然と診断に向かいます。本当に医師を代替できるのか、より正確に読めるのか、臨床判断をどこまで任せられるのかという問いがいちばん大きく見えるからです。</p>
          <p>ただ、2026年3月31日時点で実際の病院現場を見ていると、先に広がっているのは少し別の領域です。診断そのものより、文書化、コーディング、トリアージ、移行管理、言語支援、接続や確認のようなワークフロー業務で生成AIの存在感が強まっています。</p>
          <p>これは技術が足りないからというより、価値が早く見え、責任構造を組みやすい場所から入っていると考えるほうが自然です。</p>

          <h3>最初に効果が見えやすいのが記録と事務だからです</h3>
          <p>病院はもともと時間不足と人手不足の中で動いています。医師、看護師、コーディネーター、事務チームは、それぞれ異なる種類の記録と確認業務を何度も繰り返しています。だからこそ、生成AIが最初に価値を出しやすい場所もそこになります。</p>
          <p>HIMSS26前後の報道では、Cleveland Clinicが臨床文書化、コーディング、敗血症検知などのワークフローにAIを活用していると説明し、McLeod Healthの事例でも財務ROIより臨床ワークフローの摩擦を減らすことに焦点を置いていたと伝えられました。</p>
          <p>この流れを見ると、生成AIがまず「医師を置き換えるもの」ではなく、「記録と整理の負担を減らすもの」として受け入れられている理由がよく分かります。</p>
          <blockquote>医療現場でAIが最初に証明しやすい価値は、判断の代替よりも、毎日積み上がる負担の軽減にあります。</blockquote>

          <h3>アンビエント文書化が広がるのには理由があります</h3>
          <p>最近の業界記事で頻繁に出てくるのが ambient speech AI という言葉です。Becker'sはこの流れを、EHR導入以降でも特に強い採用圧力がある技術の一つとして紹介しています。診療中の会話を文脈ごと捉え、意味のある記録の下書きに変えるという価値がとても分かりやすいからです。</p>
          <p>ここで重要なのは、臨床判断そのものを乗っ取るのではなく、記録負担と認知的疲労を減らすことです。診療後のチャート整理時間や残業を減らしつつ、最終確認は医療者が担える。この構造が、現場にとって受け入れやすい理由になっています。</p>

          <h3>病院は補助と連携の領域で先に信頼を積み上げています</h3>
          <p>この流れは文書化だけにとどまりません。MobiHealthNewsが伝えたAmazon Connect Healthの事例では、患者確認、アンビエント文書化、行政・運用業務の自動化がEHRとつながる形で前面に出ています。同じ時期には、行動医療のトリアージにAIを使って待機時間を短縮する事例も紹介されました。</p>
          <p>Healthcare IT Newsでは、退院説明文の言語障壁を下げるAI活用も取り上げられています。これらは診断の代替ではありませんが、患者体験と運用効率にすぐ影響する領域です。</p>
          <ul>
            <li>文書化と要約は反復性が高く、効果を測りやすいです。</li>
            <li>トリアージや受付支援はボトルネックに直結します。</li>
            <li>翻訳や説明支援は、人の最終監督を残しながらアクセス改善に結びつきます。</li>
          </ul>

          <h3>規制とガバナンスもこの順番を後押ししています</h3>
          <p>ここには規制環境も大きく関わっています。FDAは2026年1月29日付でClinical Decision Support Softwareの最終ガイダンスを再発行し、3月11日にはその内容を扱うタウンホールも開催しました。このガイダンスは、どのようなCDS機能が非デバイスに近く、どのような機能が引き続き医療機器として扱われ得るのかをより明確にしています。</p>
          <p>病院の立場から見ると、説明可能性と監査可能性の高い補助機能、たとえば要約、下書き、情報整理、注意喚起のような機能から先に入れるほうがはるかに運用しやすいのです。反対に、診断を実質的に置き換えるような構造は、臨床責任も法的責任も一気に重くなります。</p>

          <h3>大事なのは「診断AI」より「現場に貼り付くAI」です</h3>
          <p>ヘルスケアで生成AIが意味を持つには、派手なデモより、実際の業務にどう貼り付くかのほうが重要です。記録時間が減ったのか、重複入力が減ったのか、移行情報を早く読めるようになったのか、言語の壁を下げられたのか。そうした変化が先に見える必要があります。</p>
          <p>最近のHIMSS26関連報道でも、臨床上の優先順位と整合すること、効果が測定できること、教育とガバナンスが一緒に進むことが繰り返し強調されていました。医療は他産業より慎重に見えるかもしれませんが、それは信頼の閾値が高いからです。</p>
          <p>だから今の病院現場を理解するうえでは、「なぜまだ診断を置き換えないのか」より、「どのワークフローから変え始めているのか」を見るほうが、ずっと現実に近いと思います。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://www.beckershospitalreview.com/rankings-and-ratings/klas-says-ambient-speech-ai-is-nothing-like-any-healthcare-tech-since-the-ehr-heres-why/" target="_blank" rel="noreferrer">Becker's Hospital Review: ambient speech AI adoption</a></li>
            <li><a href="https://www.healthcarefinancenews.com/news/ais-value-healthcare-goes-beyond-hard-roi" target="_blank" rel="noreferrer">Healthcare Finance News: AI’s value in healthcare goes beyond hard ROI</a></li>
            <li><a href="https://cloudgate.healthcareitnews.com/news/embed-ai-clinically-measurable-sustainable-and-trusted-ways" target="_blank" rel="noreferrer">Healthcare IT News: Embed AI clinically in measurable, sustainable and trusted ways</a></li>
            <li><a href="https://www.mobihealthnews.com/news/qa-aws-launches-amazon-connect-health-streamline-healthcare-workflows" target="_blank" rel="noreferrer">MobiHealthNews: AWS launches Amazon Connect Health</a></li>
            <li><a href="https://www.mobihealthnews.com/video/how-cleveland-clinic-infusing-ai-across-workflows" target="_blank" rel="noreferrer">MobiHealthNews: How Cleveland Clinic is infusing AI across workflows</a></li>
            <li><a href="https://www.mobihealthnews.com/video/ai-accelerates-triage-behavioral-health-treatment" target="_blank" rel="noreferrer">MobiHealthNews: AI accelerates triage for behavioral health treatment</a></li>
            <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/clinical-decision-support-software" target="_blank" rel="noreferrer">FDA: Clinical Decision Support Software Guidance</a></li>
            <li><a href="https://www.fda.gov/medical-devices/medical-devices-news-and-events/town-hall-clinical-decision-support-software-final-guidance-03112026" target="_blank" rel="noreferrer">FDA: CDS final guidance town hall, March 11, 2026</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'openclaw-vs-manus-ai-agent-direction',
    category: 'ai',
    createdAt: '2026-03-31T10:10:00+09:00',
    heroImage: {
      src: '/blog/openclaw-manus-hero.jpg',
    },
    locales: {
      ko: {
        title: '오픈클로(OpenClaw)와 마누스, 지금 AI 에이전트의 결이 어떻게 갈리는가',
        keywords: ['AI'],
        excerpt: '둘 다 에이전트라는 이름을 쓰지만, 오픈클로는 내가 소유하는 게이트웨이에 가깝고 마누스는 결과물을 받아보는 클라우드 동료에 더 가깝습니다.',
        heroImage: {
          alt: '노트북 여러 대가 놓인 협업 책상에서 팀원들이 디지털 업무 흐름을 논의하는 장면',
          caption: '같은 AI 에이전트라도 누구의 환경에서, 어떤 방식으로 일을 대신하느냐에 따라 성격은 꽤 달라집니다.',
        },
        contentHtml: `
          <p>2026년 3월 31일 기준으로 AI 에이전트 이야기를 꺼내면, 많은 사람이 비슷한 질문을 합니다. “그래서 결국 어떤 서비스가 더 센가요?”</p>
          <p>그런데 최근 흐름은 단순한 성능 경쟁만으로 보기엔 조금 달라졌습니다. 오픈클로(OpenClaw)와 마누스(Manus)를 같이 놓고 보면 특히 그렇습니다. 둘 다 스스로 일을 처리하는 에이전트라는 점은 같지만, 실제로 써보게 되는 결은 꽤 다릅니다.</p>
          <p>한쪽은 내 환경 안으로 들어오는 로컬 퍼스트 게이트웨이에 가깝고, 다른 한쪽은 클라우드에서 결과물을 통째로 만들어 들고 오는 범용 작업자에 가깝습니다. 이 차이를 이해하면 요즘 AI 에이전트 시장이 어디로 갈리는지도 조금 선명하게 보입니다.</p>

          <h3>오픈클로는 ‘내 손 안의 게이트웨이’에 더 가깝습니다</h3>
          <p>공식 문서를 기준으로 보면 오픈클로의 핵심 정체성은 꽤 분명합니다. 자체 호스팅하는 게이트웨이를 하나 띄우고, 그 위에 WhatsApp, Telegram, Discord, iMessage 같은 채널을 연결해 개인용 AI 에이전트를 운영하는 구조입니다.</p>
          <p>이 말은 곧, 오픈클로가 처음부터 “완성된 클라우드 비서”를 지향하기보다 “내가 통제하는 에이전트 인프라”에 가깝다는 뜻이기도 합니다. <code>openclaw onboard</code>로 설정을 하고, <code>openclaw dashboard</code>로 컨트롤 UI를 열고, 필요하면 여러 에이전트를 분리해서 채널별로 라우팅하는 식입니다.</p>
          <p>개발자나 파워 유저에게 이 방식이 매력적인 이유는 분명합니다. 메시지 채널, 인증, 세션, 워크스페이스를 직접 소유할 수 있기 때문입니다. 편의성만 보면 한 단계 더 손이 가지만, 대신 제어권과 확장성은 훨씬 큽니다.</p>
          <blockquote>오픈클로는 에이전트 하나를 빌려 쓰는 느낌보다, 내 생활과 도구 사이에 놓이는 운영 레이어를 직접 갖는 느낌에 가깝습니다.</blockquote>

          <h3>마누스는 ‘작업을 통째로 맡기는 클라우드 동료’ 쪽에 더 가깝습니다</h3>
          <p>반대로 마누스는 제품 서술부터가 꽤 다릅니다. 공식 문서는 마누스를 단순 챗봇이 아니라, 자체 컴퓨터를 가진 자율형 일반 AI 에이전트로 설명합니다. 인터넷이 연결된 샌드박스, 지속되는 파일 시스템, 소프트웨어 설치, 커스텀 도구 생성 같은 표현이 계속 나옵니다.</p>
          <p>즉 마누스는 사용자가 매 단계를 붙잡고 있지 않아도, 조사하고 정리하고 만들어서 결과물을 가져오는 쪽에 더 무게가 있습니다. Wide Research처럼 병렬 멀티에이전트 구조를 전면에 내세우는 것도 이 연장선에 있습니다. 큰 조사나 비교, 반복 처리 작업을 한 번에 던지고 결과를 받는 흐름이 제품의 중심에 놓여 있습니다.</p>
          <p>여기에 Browser Operator까지 붙으면 성격이 더 또렷해집니다. 클라우드 브라우저만이 아니라, 내 로컬 브라우저의 로그인 세션과 활성 탭을 활용해 실제 웹 작업을 대신 수행하는 구조이기 때문입니다. 사용성 측면에서는 훨씬 즉각적이고, 제품형 완성도도 높게 느껴집니다.</p>

          <h3>차이는 성능보다 소유권과 운영 방식에서 더 크게 납니다</h3>
          <p>겉으로 보면 둘 다 “알아서 해주는 AI 에이전트”처럼 들릴 수 있습니다. 하지만 실제 선택 기준은 모델 성능보다도 소유권과 운영 방식에 더 가깝습니다.</p>
          <ul>
            <li>오픈클로: 내가 게이트웨이를 운영하고, 채널과 인증과 라우팅을 직접 쥔다.</li>
            <li>마누스: 완성도 높은 클라우드형 작업 환경 안에서 결과물을 빠르게 받는다.</li>
            <li>오픈클로: 설정과 운영 감각이 필요하지만, 구조를 내 방식대로 바꿀 여지가 크다.</li>
            <li>마누스: 바로 써먹기 좋지만, 사용량과 크레딧 체계를 같이 봐야 한다.</li>
          </ul>
          <p>그래서 둘을 같은 잣대로만 비교하면 오히려 헷갈립니다. 어느 쪽이 더 “똑똑한가”보다, 어느 쪽이 내 업무 방식과 더 맞는가를 먼저 봐야 합니다.</p>

          <h3>실사용 기준으로 보면 추천 지점도 꽤 다릅니다</h3>
          <p>오픈클로가 잘 맞는 사람은 대체로 분명합니다. 여러 채널을 묶어 개인용 혹은 팀용 에이전트 운영 환경을 직접 만들고 싶은 사람, 데이터와 인증 흐름을 자기 손 안에 두고 싶은 사람, 그리고 조금 더 도구를 조립하는 쪽에 익숙한 사람입니다.</p>
          <p>마누스가 더 잘 맞는 경우도 분명합니다. 리서치, 정리, 비교, 문서 제작, 반복 업무를 비교적 빠르게 위임하고 싶은 사람, 그리고 에이전트를 하나의 제품처럼 받아들이고 싶은 사람에게는 훨씬 접근성이 좋습니다. 크레딧 기반 플랜이라는 점은 비용 감각과 함께 봐야 하지만, 대신 바로 일을 맡기는 감각은 더 직관적입니다.</p>

          <h3>지금 AI 에이전트 시장은 두 갈래로 커지고 있습니다</h3>
          <p>오픈클로와 마누스를 같이 보면, 요즘 에이전트 시장이 한 방향으로만 가고 있지 않다는 점이 잘 보입니다. 한 갈래는 로컬 퍼스트, self-hosted, 채널 통합, 사용자 제어권을 앞세우는 흐름입니다. 다른 갈래는 클라우드형 자율 에이전트, 결과물 중심 UX, 병렬 처리와 웹 작업 자동화를 앞세우는 흐름입니다.</p>
          <p>개인적으로는 이 둘 중 하나가 다른 하나를 완전히 밀어내기보다, 사용자의 성향과 작업 환경에 따라 더 분명하게 역할이 나뉠 가능성이 크다고 봅니다. 개발자와 파워 유저는 오픈클로 같은 구조에서 오래 머물 가능성이 높고, 일반 실무자나 운영팀은 마누스 같은 제품형 에이전트를 더 빠르게 받아들일 수 있습니다.</p>
          <p>결국 중요한 건 이름보다 운영감입니다. 요즘 AI 에이전트를 제대로 고르려면, “무엇을 더 잘하나”보다 “누구의 환경 안에서, 어떤 책임 구조로 일하나”를 먼저 봐야 합니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://docs.openclaw.ai/" target="_blank" rel="noreferrer">OpenClaw Docs: Overview</a></li>
            <li><a href="https://docs.openclaw.ai/start/getting-started" target="_blank" rel="noreferrer">OpenClaw Docs: Getting Started</a></li>
            <li><a href="https://docs.openclaw.ai/multi-agent" target="_blank" rel="noreferrer">OpenClaw Docs: Multi-Agent Routing</a></li>
            <li><a href="https://manus.im/docs" target="_blank" rel="noreferrer">Manus Docs: Welcome</a></li>
            <li><a href="https://manus.im/docs/features/browser-operator" target="_blank" rel="noreferrer">Manus Docs: Browser Operator</a></li>
            <li><a href="https://manus.im/docs/features/wide-research" target="_blank" rel="noreferrer">Manus Docs: Wide Research</a></li>
            <li><a href="https://manus.im/docs/introduction/plans" target="_blank" rel="noreferrer">Manus Docs: Plans and Pricing</a></li>
          </ul>
        `,
      },
      en: {
        title: 'OpenClaw and Manus: How the Shape of AI Agents Is Splitting Right Now',
        keywords: ['AI'],
        excerpt: 'Both are called agents, but OpenClaw feels closer to a gateway you operate and own, while Manus feels closer to a cloud coworker that brings finished work back to you.',
        heroImage: {
          alt: 'A collaborative desk with multiple laptops where a team is discussing digital workflows',
          caption: 'Even when two products are both called AI agents, their character changes a lot depending on whose environment they run in and how they get work done.',
        },
        contentHtml: `
          <p>As of March 31, 2026, conversations about AI agents often collapse into the same question: which one is stronger?</p>
          <p>But when you put OpenClaw and Manus side by side, raw capability is not the most interesting distinction anymore. Both are agent products, yet they feel very different in practice.</p>
          <p>One is closer to a local-first gateway that lives inside your own environment. The other is closer to a cloud-based general worker that takes a task and comes back with a finished result. That difference says a lot about where the agent market is heading.</p>

          <h3>OpenClaw feels more like a gateway you operate yourself</h3>
          <p>Based on the official docs, OpenClaw is best understood as a self-hosted gateway for AI agents. You run a single gateway process on your own machine or server, then connect channels such as WhatsApp, Telegram, Discord, and iMessage.</p>
          <p>That makes OpenClaw feel less like a packaged assistant and more like agent infrastructure that you control. You go through onboarding, launch the dashboard, and, if needed, route multiple isolated agents across different channels and workspaces.</p>
          <p>For developers and power users, that is the appeal. You keep control over sessions, routing, credentials, and environment boundaries. It asks more from the operator, but it also gives more ownership back.</p>
          <blockquote>OpenClaw feels less like renting one agent and more like owning the operating layer that sits between your tools and your assistant.</blockquote>

          <h3>Manus leans closer to a cloud coworker that takes the whole task</h3>
          <p>Manus presents itself very differently. Its official documentation describes it as an autonomous general AI agent with its own computer: a sandbox with internet access, a persistent file system, software installation, and support for custom tools.</p>
          <p>In practice, that means Manus is optimized around taking a task, working through it, and returning a finished output. Features such as Wide Research, which runs many agents in parallel for large-scale processing, make that product direction even clearer.</p>
          <p>The Browser Operator pushes this further. Manus can work inside your local browser session, using your existing logins and tabs to perform real web tasks on your behalf. That makes it feel much more like a complete productized delegate.</p>

          <h3>The biggest difference is not intelligence but ownership and operating model</h3>
          <p>From a distance, both products can sound like “AI that handles things for you.” But the better comparison is not model quality alone. It is ownership, control, and how the work actually runs.</p>
          <ul>
            <li>OpenClaw: you operate the gateway and own the routing, channels, and auth flow.</li>
            <li>Manus: you work inside a polished cloud product built to return finished outputs quickly.</li>
            <li>OpenClaw: more setup and operator judgment, but far more flexibility.</li>
            <li>Manus: faster to delegate into, but tied more directly to plan and credit economics.</li>
          </ul>
          <p>That is why comparing them on a single “which is better” scale usually misses the point.</p>

          <h3>The practical fit is different too</h3>
          <p>OpenClaw makes the most sense if you want to build and run your own agent layer, keep data flow and access boundaries close, and connect multiple messaging surfaces to a system you control.</p>
          <p>Manus makes more sense if you want to hand off research, synthesis, comparison work, or web-based execution quickly and treat the agent more like a service product than an infrastructure layer. The credit model matters, but the delegation experience is far more immediate.</p>

          <h3>The agent market is splitting into two clear directions</h3>
          <p>Looking at OpenClaw and Manus together, the market no longer looks like a single race. One direction emphasizes self-hosting, local control, channel integration, and operator ownership. The other emphasizes cloud execution, polished delegation, parallel processing, and outcome-first user experience.</p>
          <p>I doubt one will eliminate the other. They are more likely to separate by user type and work environment. Builders and power users may stay with systems like OpenClaw. General business users may move faster toward products like Manus.</p>
          <p>In other words, the better question now is not only what an AI agent can do, but whose environment it runs in and what kind of responsibility model comes with it.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://docs.openclaw.ai/" target="_blank" rel="noreferrer">OpenClaw Docs: Overview</a></li>
            <li><a href="https://docs.openclaw.ai/start/getting-started" target="_blank" rel="noreferrer">OpenClaw Docs: Getting Started</a></li>
            <li><a href="https://docs.openclaw.ai/multi-agent" target="_blank" rel="noreferrer">OpenClaw Docs: Multi-Agent Routing</a></li>
            <li><a href="https://manus.im/docs" target="_blank" rel="noreferrer">Manus Docs: Welcome</a></li>
            <li><a href="https://manus.im/docs/features/browser-operator" target="_blank" rel="noreferrer">Manus Docs: Browser Operator</a></li>
            <li><a href="https://manus.im/docs/features/wide-research" target="_blank" rel="noreferrer">Manus Docs: Wide Research</a></li>
            <li><a href="https://manus.im/docs/introduction/plans" target="_blank" rel="noreferrer">Manus Docs: Plans and Pricing</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'OpenClawとManus、いまAIエージェントの方向性はどう分かれているのか',
        keywords: ['AI'],
        excerpt: 'どちらもエージェントと呼ばれますが、OpenClawは自分で運用するゲートウェイに近く、Manusは完成した仕事を返してくれるクラウドの同僚に近い存在です。',
        heroImage: {
          alt: '複数のノートパソコンが並ぶ机でチームがデジタル業務フローを話し合っている様子',
          caption: '同じAIエージェントでも、誰の環境で、どのように仕事を進めるのかによって性格はかなり変わります。',
        },
        contentHtml: `
          <p>2026年3月31日時点でAIエージェントの話をすると、多くの場合は「結局どれが一番強いのか」という問いに集まりがちです。</p>
          <p>ただ、OpenClawとManusを並べてみると、いま本当に重要なのは単純な性能比較だけではないと感じます。どちらもエージェントですが、実際に使ったときの手触りがかなり違うからです。</p>
          <p>一方は自分の環境の中に入ってくるローカルファーストなゲートウェイに近く、もう一方はクラウド上で仕事を進めて完成した成果を持ち帰ってくる汎用ワーカーに近い。この違いを見ると、いまのAIエージェント市場がどこへ分かれているのかも見えやすくなります。</p>

          <h3>OpenClawは「自分で持つゲートウェイ」に近いです</h3>
          <p>公式ドキュメントを見ると、OpenClawの中心はかなり明確です。自分でホストするゲートウェイを立ち上げ、その上にWhatsApp、Telegram、Discord、iMessageなどのチャネルをつなぎ、個人用またはチーム用のAIエージェント運用層を作る構造です。</p>
          <p>つまりOpenClawは、最初から完成済みのクラウド秘書というより、自分で制御するエージェント基盤に近い存在です。オンボーディングを行い、ダッシュボードを開き、必要なら複数のエージェントを分けてチャネルごとにルーティングします。</p>
          <p>この方式が開発者やパワーユーザーに魅力的なのは、セッション、認証、ワークスペース、ルーティングを自分の側で持てるからです。手間は少し増えますが、その分だけ制御権も戻ってきます。</p>
          <blockquote>OpenClawは、エージェント一人を借りるというより、道具とアシスタントのあいだにある運用レイヤーを自分で持つ感覚に近いです。</blockquote>

          <h3>Manusは「仕事をまとめて任せるクラウド同僚」に近いです</h3>
          <p>それに対してManusは、製品の説明そのものが違います。公式文書では、単なるチャットボットではなく、自分のコンピュータを持つ自律型の一般AIエージェントとして説明されています。インターネット接続のあるサンドボックス、永続ファイルシステム、ソフトウェアのインストール、カスタムツール作成といった表現が前面に出ています。</p>
          <p>これはつまり、Manusがユーザーに途中の細かい手順を求めるより、調査し、整理し、作成して、仕上がった成果物を返す方向に重心を置いているということです。Wide Researchのように、多数のエージェントを並列に動かす機能もこの流れの延長線上にあります。</p>
          <p>さらにBrowser Operatorまで含めると、その性格はもっとはっきりします。クラウドブラウザだけでなく、自分のローカルブラウザのログイン状態やタブを使って実際のウェブ操作を代行できるからです。製品としての完成度と即効性はかなり高く感じられます。</p>

          <h3>いちばん大きい差は、知能そのものより所有権と運用モデルです</h3>
          <p>遠くから見れば、どちらも「いろいろやってくれるAIエージェント」に見えるかもしれません。ただ、実際に選ぶときの基準はモデルの賢さだけでは足りません。所有権、制御権、そして仕事がどこでどう走るのかを見る必要があります。</p>
          <ul>
            <li>OpenClaw: ゲートウェイを自分で運用し、チャネル、認証、ルーティングを握る。</li>
            <li>Manus: 完成度の高いクラウド製品の中で、結果を速く受け取る。</li>
            <li>OpenClaw: 設定や運用感覚は必要だが、柔軟性は大きい。</li>
            <li>Manus: すぐ任せやすい反面、プランやクレジット構造と一緒に考える必要がある。</li>
          </ul>
          <p>だからこそ、どちらが上かという一つの尺度だけで比べると、かえって本質を見失いやすいです。</p>

          <h3>実務での相性もかなり違います</h3>
          <p>OpenClawが合うのは、複数チャネルを束ねた自分用のエージェント運用層を作りたい人、データや認証の流れを自分の側に置いておきたい人、そして少し道具を組み立てる感覚に慣れている人です。</p>
          <p>Manusが合う場面もはっきりしています。調査、整理、比較、文書作成、ウェブ作業の代行をなるべく素早く任せたい人、そしてエージェントをインフラではなく製品として受け取りたい人です。クレジット制である点は費用感と一緒に見る必要がありますが、任せる体験の分かりやすさは高いです。</p>

          <h3>いまのAIエージェント市場は二つの方向に広がっています</h3>
          <p>OpenClawとManusを一緒に見ると、エージェント市場が一つの道だけを進んでいるわけではないことがよく分かります。ひとつはローカルファースト、self-hosted、チャネル統合、ユーザーの制御権を前面に出す流れです。もうひとつはクラウド型の自律エージェント、成果物中心の体験、並列処理とウェブ操作自動化を前面に出す流れです。</p>
          <p>個人的には、どちらか一方が完全に他方を置き換えるより、使う人の性質と環境に応じて役割がもっとはっきり分かれていく可能性が高いと思います。開発者やパワーユーザーはOpenClawのような構造に残りやすく、一般の実務者や運用チームはManusのような製品型エージェントをより早く受け入れるかもしれません。</p>
          <p>結局大事なのは名前より運用感です。いまAIエージェントを選ぶなら、「何が一番できるか」より、「誰の環境の中で、どんな責任の置き方で動くのか」を先に見るほうが自然です。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://docs.openclaw.ai/" target="_blank" rel="noreferrer">OpenClaw Docs: Overview</a></li>
            <li><a href="https://docs.openclaw.ai/start/getting-started" target="_blank" rel="noreferrer">OpenClaw Docs: Getting Started</a></li>
            <li><a href="https://docs.openclaw.ai/multi-agent" target="_blank" rel="noreferrer">OpenClaw Docs: Multi-Agent Routing</a></li>
            <li><a href="https://manus.im/docs" target="_blank" rel="noreferrer">Manus Docs: Welcome</a></li>
            <li><a href="https://manus.im/docs/features/browser-operator" target="_blank" rel="noreferrer">Manus Docs: Browser Operator</a></li>
            <li><a href="https://manus.im/docs/features/wide-research" target="_blank" rel="noreferrer">Manus Docs: Wide Research</a></li>
            <li><a href="https://manus.im/docs/introduction/plans" target="_blank" rel="noreferrer">Manus Docs: Plans and Pricing</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'what-teams-using-ai-well-do-differently',
    category: 'ai',
    createdAt: '2026-03-30T18:45:00+09:00',
    heroImage: {
      src: '/blog/ai-workflow-hero.jpg',
    },
    locales: {
      ko: {
        title: '지금 AI를 잘 쓰는 팀은 무엇이 다른가',
        keywords: ['AI'],
        excerpt: '요즘 팀의 차이는 더 강한 모델을 먼저 찾았는지보다, 반복 업무를 어디서 줄였는지에서 더 선명하게 드러납니다.',
        heroImage: {
          alt: '사무실에서 노트북을 보며 함께 업무 흐름을 점검하는 팀원들의 모습',
          caption: 'AI를 잘 쓰는 팀은 새 모델을 좇기보다, 실제 일의 흐름을 먼저 다시 봅니다.',
        },
        contentHtml: `
          <p>요즘 AI 이야기는 금방 모델 이름으로 흘러갑니다. 어떤 모델이 더 똑똑한지, 누가 더 긴 문맥을 처리하는지, 이번 주에는 또 어떤 기능이 나왔는지부터 따지게 되죠.</p>
          <p>그런데 막상 현장에서 벌어지는 차이는 조금 다른 곳에 있습니다. AI를 잘 쓰는 팀은 최신 모델을 가장 빨리 붙인 팀이라기보다, 반복되는 업무 흐름을 가장 먼저 다시 본 팀인 경우가 많습니다. 2026년 3월 말 기준으로 생성형 AI는 이미 많은 도구 안에 들어와 있지만, 성과는 여전히 기술 자체보다 도입 방식에서 갈립니다.</p>
          <p>그래서 오늘은 모델 성능표보다 조금 더 현실적인 질문을 해보려 합니다. 지금 AI를 잘 쓰는 팀은 무엇이 다를까요.</p>

          <h3>모델보다 먼저 보는 것은 병목입니다</h3>
          <p>잘되는 팀은 대개 같은 지점에서 출발합니다. 회의록 정리, 초안 작성, 리서치 정리, 고객 문의 분류처럼 사람이 매번 시간을 쓰지만, 완전히 새로 생각할 필요는 없는 일부터 다시 봅니다.</p>
          <p>이 접근이 중요한 이유는 간단합니다. AI는 추상적인 혁신 구호보다, 반복적인 마찰을 줄이는 데서 더 빨리 성과가 나기 때문입니다. Google이 최근 업무용 AI 도입 전략에서 강조한 것도 결국 비슷한 방향이었습니다. 사람들이 어디에서 시간을 잃는지, 무엇 때문에 일이 자주 멈추는지부터 찾으라는 이야기입니다.</p>
          <blockquote>좋은 도입은 “어떤 모델을 쓸까”보다 “어떤 지점을 먼저 줄일까”에서 시작됩니다.</blockquote>

          <h3>잘 쓰는 팀은 처음부터 크게 벌리지 않습니다</h3>
          <p>생성형 AI를 업무에 붙일 때 가장 흔한 실수는 전사 도입을 너무 빨리 선언하는 일입니다. 반대로 실제로 오래 가는 팀은 작은 단위로 시작합니다. 특정 팀의 문서 초안, 특정 직무의 리서치 보조, 특정 운영 업무의 분류 자동화처럼 범위를 좁게 잡습니다.</p>
          <p>그리고 이 단계에서 프롬프트보다 더 중요한 것이 생깁니다. 입력 데이터가 어디서 오고, 사람이 어디에서 검토하고, 결과를 어디까지 믿을 것인지에 대한 기준입니다. 결국 업무자동화는 모델 하나로 완성되지 않고, 검토 지점과 책임 구간까지 함께 설계될 때 비로소 안정됩니다.</p>
          <ul>
            <li>반복 빈도가 높은 일부터 시작합니다.</li>
            <li>한 번에 여러 팀으로 넓히지 않고, 작은 성공 사례를 먼저 만듭니다.</li>
            <li>결과물을 그대로 쓰는 구간과 사람이 반드시 손봐야 하는 구간을 분리합니다.</li>
          </ul>

          <h3>현실의 AI는 아직도 대체보다 보조에 가깝습니다</h3>
          <p>이 지점은 과장 없이 보는 편이 좋습니다. Anthropic이 공개한 최근 Economic Index 자료를 보면, 실제 사용 패턴은 사람의 일을 통째로 없애는 쪽보다 보조하고 확장하는 쪽에 더 많이 몰려 있습니다. 다시 말해, 지금의 AI업무활용은 “아예 대신한다”보다 “일의 첫 버전을 더 빠르게 만든다”에 가깝습니다.</p>
          <p>이 사실을 받아들이면 기대치도 건강해집니다. 초안을 빠르게 만들고, 자료를 압축하고, 여러 선택지를 꺼내주는 데는 매우 유용하지만, 맥락 판단과 최종 책임까지 자동으로 해결해주지는 않습니다. AI를 잘 쓰는 팀이 의외로 차분해 보이는 이유도 여기에 있습니다. 기대를 낮춰서가 아니라, 어디까지 맡길 수 있는지 정확히 알고 있기 때문입니다.</p>

          <h3>빠른 모델과 깊게 생각하는 모델을 구분해서 씁니다</h3>
          <p>모든 일을 가장 강한 모델 하나로 해결하려는 태도도 오래 가지 않습니다. 실제 팀 단위 활용에서는 속도가 중요한 일이 있고, 더 깊은 추론이 필요한 일이 따로 있습니다. 짧은 메일 초안이나 회의 요약은 빠르게 처리하는 편이 낫고, 의사결정 메모나 복잡한 비교 분석은 조금 더 신중한 모드가 맞습니다.</p>
          <p>OpenAI도 최근 안내에서 사용자가 항상 가장 무거운 설정만 원하는 것은 아니라고 설명합니다. 빠른 응답과 작업 적합성이 중요할 때가 많기 때문입니다. 결국 잘 쓰는 팀은 AI를 하나의 만능 비서처럼 다루지 않고, 업무 성격에 따라 도구 상자를 나눠 씁니다.</p>

          <h3>지금 바로 시작하려면 이 정도면 충분합니다</h3>
          <p>현장에서 바로 시도해볼 수 있는 출발점은 생각보다 크지 않습니다. 거창한 자동화 로드맵보다, 일주일 안에 성과를 확인할 수 있는 작은 흐름 하나를 고르는 편이 훨씬 낫습니다.</p>
          <ul>
            <li>매주 반복되는 문서 초안 1개를 정합니다.</li>
            <li>회의록 요약이나 리서치 정리처럼 시간이 오래 걸리는 작업 1개를 고릅니다.</li>
            <li>AI가 만든 결과물을 누가, 어떤 기준으로 검토할지 먼저 적어둡니다.</li>
            <li>한 달 동안 줄어든 시간과 수정 횟수를 간단히 기록합니다.</li>
          </ul>
          <p>이 정도만 해도 팀 안에서 “AI가 실제로 어디에 도움이 되는지”가 금방 보이기 시작합니다. 그리고 그다음부터는 모델 이름보다 업무 문맥이 더 중요한 판단 기준이 됩니다.</p>

          <h3>결국 차이는 기술 숭배가 아니라 운영 감각에서 납니다</h3>
          <p>지금 AI를 잘 쓰는 팀은 새로운 모델 소식을 모르는 팀이 아닙니다. 다만 거기에만 매달리지 않을 뿐입니다. 병목을 찾고, 작은 흐름을 먼저 바꾸고, 사람이 검토해야 할 구간을 남겨두는 팀이 결국 더 오래 갑니다.</p>
          <p>이 블로그에서 AI 이야기를 다룰 때도 저는 당분간 이 관점을 붙잡고 싶습니다. 성능 경쟁의 속도는 계속 빨라지겠지만, 현장에서 남는 차이는 결국 일을 어떻게 다시 설계했는지에서 더 선명하게 드러나기 때문입니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://blog.google/company-news/inside-google/life-at-google/strategies-to-adopt-ai-at-work/" target="_blank" rel="noreferrer">Google: 업무 현장에서 AI를 도입할 때 살펴볼 전략</a></li>
            <li><a href="https://www.anthropic.com/research/anthropic-economic-index-january-2026-report?_bhlid=76e855ebb03f5ec3fce386d27a4fe1063b11f59c" target="_blank" rel="noreferrer">Anthropic Economic Index, January 2026</a></li>
            <li><a href="https://help.openai.com/en/articles/6825453-what-is-the-knowledge-cutoff" target="_blank" rel="noreferrer">OpenAI Help: 제품 응답 방식과 최신성 관련 안내</a></li>
          </ul>
        `,
      },
      en: {
        title: 'What Sets Teams That Use AI Well Apart Right Now',
        keywords: ['AI'],
        excerpt: 'The gap between teams is showing up less in who found the strongest model first and more in who reduced repetitive work first.',
        heroImage: {
          alt: 'Team members in an office reviewing workflow ideas together on laptops',
          caption: 'Teams that use AI well usually start by redesigning real work, not by chasing every new model release.',
        },
        contentHtml: `
          <p>Most conversations about AI drift toward model names within a few minutes. Which model is smarter, which one handles longer context, which company shipped another feature this week.</p>
          <p>But the difference that matters in actual work is showing up somewhere else. The teams using AI well are often not the ones that adopted the newest model first. They are the ones that looked at repetitive workflow friction first. As of late March 2026, generative AI is already embedded in many tools, yet the results still depend more on how teams adopt it than on the technology alone.</p>
          <p>That is why the more useful question now is not which leaderboard moved again. It is this: what are the teams getting real value from AI doing differently?</p>

          <h3>They look for bottlenecks before they look for models</h3>
          <p>The strongest teams usually start from the same kinds of work: meeting notes, first drafts, research summaries, customer inquiry triage. These are tasks people spend time on repeatedly, but they do not require a blank-sheet reinvention every single time.</p>
          <p>That approach matters because AI tends to create faster value by reducing recurring friction, not by fulfilling abstract innovation slogans. Google has been making a similar point in its recent guidance on AI adoption at work: start by finding where people lose time and where work keeps stalling.</p>
          <blockquote>A good rollout starts with “what should we reduce first?” not “which model should we buy first?”</blockquote>

          <h3>They do not try to scale everything at once</h3>
          <p>One of the most common mistakes is announcing a broad company-wide rollout too early. The teams that stay with it usually begin much more narrowly. One document flow, one research task, one operational routine that clearly repeats.</p>
          <p>At that point, the important design question is no longer just the prompt. It becomes: where does the input come from, where does a human review the result, and how far should the output be trusted? Workflow automation gets stable only when review points and responsibility boundaries are designed alongside the model.</p>
          <ul>
            <li>Start with work that happens often.</li>
            <li>Do not spread it across many teams at once.</li>
            <li>Separate the parts that can be used directly from the parts that still need human editing.</li>
          </ul>

          <h3>In practice, AI is still closer to augmentation than replacement</h3>
          <p>It helps to stay grounded here. Anthropic's recent Economic Index suggests that real-world usage still leans more toward assisting and expanding human work than replacing it outright. In plain terms, today's AI-at-work pattern is still closer to “make the first version faster” than “remove the person entirely.”</p>
          <p>Once you accept that, expectations get healthier. AI is very good at drafting, compressing information, and surfacing options. It is still much less reliable at final judgment and accountability. The teams that seem calm about AI are often the ones that understand this boundary most clearly.</p>

          <h3>They separate fast tasks from deep tasks</h3>
          <p>Trying to solve every problem with the single strongest model rarely lasts. In real team workflows, some tasks need speed while others need more careful reasoning. A short email draft or meeting summary benefits from fast turnaround. A decision memo or a high-stakes comparison may deserve a slower, more deliberate setting.</p>
          <p>OpenAI has also noted that users do not always prefer the heaviest setting. Speed and task fit often matter more. The better teams do not treat AI as one all-purpose assistant. They use it more like a toolbox matched to the kind of work in front of them.</p>

          <h3>A practical starting point can stay small</h3>
          <p>You do not need a grand automation roadmap to begin. In most teams, it is better to pick one small flow where the impact can be seen within a week or two.</p>
          <ul>
            <li>Choose one recurring document draft.</li>
            <li>Choose one task that regularly takes too long, such as meeting summaries or research synthesis.</li>
            <li>Write down who reviews the output and by what standard.</li>
            <li>Track time saved and revision counts for a month.</li>
          </ul>
          <p>That is usually enough to reveal where AI is genuinely useful. After that, the more important decision is no longer the model name. It is the workflow context around it.</p>

          <h3>The real difference is operational judgment, not model worship</h3>
          <p>The teams using AI well are not ignoring new releases. They just do not build their whole strategy around them. They identify friction, improve one flow at a time, and keep human review where it still matters.</p>
          <p>That is also the lens I want to keep using in this blog when I write about AI. The pace of model releases will stay fast, but the more lasting difference in the field still comes from how people redesign the work itself.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://blog.google/company-news/inside-google/life-at-google/strategies-to-adopt-ai-at-work/" target="_blank" rel="noreferrer">Google: strategies for adopting AI at work</a></li>
            <li><a href="https://www.anthropic.com/research/anthropic-economic-index-january-2026-report?_bhlid=76e855ebb03f5ec3fce386d27a4fe1063b11f59c" target="_blank" rel="noreferrer">Anthropic Economic Index, January 2026</a></li>
            <li><a href="https://help.openai.com/en/articles/6825453-what-is-the-knowledge-cutoff" target="_blank" rel="noreferrer">OpenAI Help: guidance related to response behavior and freshness</a></li>
          </ul>
        `,
      },
      ja: {
        title: '今、AIをうまく使うチームは何が違うのか',
        keywords: ['AI'],
        excerpt: 'いま差が出ているのは、強いモデルを先に見つけたチームよりも、反復業務をどこで減らしたかを先に見たチームです。',
        heroImage: {
          alt: 'オフィスでノートパソコンを見ながら業務フローを確認しているチームメンバー',
          caption: 'AIをうまく使うチームは、新しいモデルを追い続ける前に、実際の仕事の流れを見直します。',
        },
        contentHtml: `
          <p>AIの話は、少しするとすぐにモデル名の比較になりがちです。どのモデルが賢いのか、どれが長い文脈を扱えるのか、今週はどこが新機能を出したのか。</p>
          <p>ただ、現場で本当に差が出ている場所は少し違います。AIをうまく使っているチームは、最新モデルを最初に入れたチームというより、繰り返し発生する仕事の摩擦を先に見直したチームであることが多いです。2026年3月末の時点で生成AIはすでに多くの業務ツールに入っていますが、成果は今もなお技術そのものより導入の仕方で分かれています。</p>
          <p>だからこそ、今考えるべきなのは性能表の順位ではありません。AIを現場でうまく使うチームは、何が違うのかという問いです。</p>

          <h3>モデルより先に、業務の詰まりを見ています</h3>
          <p>うまくいくチームは、だいたい似たところから始めます。会議メモ、初稿作成、リサーチ整理、問い合わせの分類のように、何度も発生するのに毎回ゼロから考える必要はない仕事です。</p>
          <p>この進め方が大事なのは、AIが抽象的な変革スローガンよりも、繰り返し生まれる摩擦を減らす場面で早く価値を出しやすいからです。Googleが最近の業務向けAI導入の考え方で強調しているのも、結局は近い話でした。人がどこで時間を失い、どこで仕事が止まりやすいのかを先に見つけることです。</p>
          <blockquote>良い導入は「どのモデルを使うか」より、「どの摩擦を先に減らすか」から始まります。</blockquote>

          <h3>最初から大きく広げません</h3>
          <p>生成AIを仕事に入れるときによくある失敗は、全社導入を早く打ち出しすぎることです。反対に、長く続くチームはもっと狭い単位から始めます。特定チームの文書初稿、特定職種のリサーチ補助、特定の運用業務の整理といった形です。</p>
          <p>そしてこの段階では、プロンプトそのものより大事な設計が出てきます。入力はどこから来るのか、人はどこでレビューするのか、結果をどこまで信頼するのかという線引きです。業務自動化はモデル一つで完成するのではなく、確認ポイントと責任の境界まで一緒に設計されて初めて安定します。</p>
          <ul>
            <li>発生頻度の高い仕事から始めます。</li>
            <li>いきなり多くのチームへ広げません。</li>
            <li>そのまま使える部分と、人が必ず直す部分を分けます。</li>
          </ul>

          <h3>現実のAIは、まだ代替より補助に近いです</h3>
          <p>ここは過度に期待しないほうが健全です。Anthropicの最近のEconomic Indexを見ると、実際の利用は人の仕事を丸ごと置き換えるより、補助し拡張する方向に多く集まっています。言い換えると、今のAI活用は「人を完全に外す」より、「最初のたたき台を早く作る」に近いということです。</p>
          <p>この前提を受け入れると、期待値も自然に整います。AIは初稿づくり、情報圧縮、選択肢の提示にはとても役立ちますが、最終判断や責任の引き受けまで自動で解決してくれるわけではありません。AIを落ち着いて使っているチームほど、その境界をよく理解しています。</p>

          <h3>速さが必要な仕事と、深く考える仕事を分けています</h3>
          <p>どんな仕事も最強モデル一つで片づけようとする姿勢は長続きしません。実際のチーム運用では、速さが大事な仕事と、慎重な推論が必要な仕事は分かれます。短いメール初稿や会議要約なら速い処理が向いていますし、意思決定メモや複雑な比較は、少し重くても丁寧な設定が合います。</p>
          <p>OpenAIも最近の案内で、ユーザーが常に一番重い設定だけを望むわけではないと説明しています。速さと作業への適合性が重要になる場面が多いからです。うまく使うチームは、AIを万能秘書のように一つで扱うのではなく、仕事に応じて道具を分けて使っています。</p>

          <h3>始めるなら、小さな流れ一つで十分です</h3>
          <p>最初から大きな自動化ロードマップは要りません。多くの現場では、一週間から二週間で違いが見える小さな業務フローを一つ選ぶほうが現実的です。</p>
          <ul>
            <li>毎週繰り返す文書初稿を一つ決めます。</li>
            <li>会議要約やリサーチ整理のように時間のかかる作業を一つ選びます。</li>
            <li>誰がどの基準でレビューするかを先に書いておきます。</li>
            <li>一か月ほど、削減できた時間と修正回数を記録します。</li>
          </ul>
          <p>それだけでも、AIが実際にどこで役立つのかはかなり見えてきます。その先で重要になるのは、モデル名そのものより仕事の文脈です。</p>

          <h3>最後に差を生むのは、技術礼賛ではなく運用感覚です</h3>
          <p>AIをうまく使うチームは、新しいリリースに無関心なわけではありません。ただ、それだけで戦略を作らないだけです。業務の摩擦を見つけ、小さな流れを順に改善し、人が確認すべき場所を残しておく。その積み重ねが最後まで効いてきます。</p>
          <p>このブログでもAIの話を書くときは、しばらくこの視点を大事にしたいと思います。モデルの更新速度はこれからも速いはずですが、現場で残る差は結局、仕事そのものをどう設計し直したかでいちばんはっきり見えてくるからです。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://blog.google/company-news/inside-google/life-at-google/strategies-to-adopt-ai-at-work/" target="_blank" rel="noreferrer">Google: 業務でAIを導入するときに見るべき考え方</a></li>
            <li><a href="https://www.anthropic.com/research/anthropic-economic-index-january-2026-report?_bhlid=76e855ebb03f5ec3fce386d27a4fe1063b11f59c" target="_blank" rel="noreferrer">Anthropic Economic Index, January 2026</a></li>
            <li><a href="https://help.openai.com/en/articles/6825453-what-is-the-knowledge-cutoff" target="_blank" rel="noreferrer">OpenAI Help: 応答特性と鮮度に関する案内</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'first-daily-post-starting-this-blog',
    category: 'daily',
    createdAt: '2026-03-30T18:05:00+09:00',
    heroImage: {
      src: '/blog/first-post-hero.jpg',
    },
    locales: {
      ko: {
        title: '첫 글을 올리며, 기록을 다시 시작해보려 합니다',
        keywords: ['일상'],
        excerpt: '오래 비워두었던 블로그 칸에 첫 글을 올리며, 앞으로 이 공간에 어떤 기록을 남기고 싶은지 차분히 적어보았습니다.',
        heroImage: {
          alt: '햇살이 드는 책상 위에 펼쳐진 노트와 펜, 그리고 스마트폰이 놓여 있는 장면',
          caption: '첫 문장을 남기기 전의 조용한 책상처럼, 이 블로그도 너무 요란하지 않게 시작해보려 합니다.',
        },
        contentHtml: `
          <p>블로그 첫 글은 이상하게도 늘 가장 늦게 써지는 것 같습니다.</p>
          <p>홈페이지는 어느 정도 모양을 갖췄는데도 이 공간만은 한동안 비어 있었습니다. 무엇부터 써야 할지 너무 오래 고민하다 보니, 오히려 아무 문장도 남기지 못하고 시간이 먼저 지나가더군요.</p>
          <p>그래서 오늘은 완성도보다 시작을 택해보려 합니다. 이 글은 제 홈페이지에 올라가는 첫 번째 포스팅이고, 그 사실을 시작과 끝에 분명하게 남겨두고 싶었습니다.</p>

          <h3>왜 이제야 첫 글을 올리게 되었을까요</h3>
          <p>무언가를 처음 올릴 때는 괜히 첫인상을 너무 의식하게 됩니다. 첫 글답게 보여야 할 것 같고, 너무 가볍지도 무겁지도 않아야 할 것 같고, 이 블로그의 방향까지 한 번에 다 보여줘야 할 것 같은 마음이 생깁니다.</p>
          <p>그런데 그렇게 생각할수록 손은 더 느려졌습니다. 그래서 오늘은 생각을 조금 바꿨습니다. 첫 글이 모든 것을 설명해야 하는 건 아니고, 그냥 이 공간이 이제부터 실제로 움직이기 시작했다는 신호면 충분하겠다고요.</p>
          <p>그렇게 마음을 정리하고 나니, 오히려 어떤 글을 쓰고 싶은지가 조금 더 또렷해졌습니다.</p>

          <h3>이곳에는 어떤 기록을 남기고 싶은지</h3>
          <p>이 블로그는 정보를 정리하는 공간이기도 하겠지만, 그보다 먼저 제가 일과 생활 사이에서 오래 붙잡게 되는 생각들을 남기는 공간이 되었으면 합니다. 하루가 지나면 사라지는 감정도 있고, 며칠이 지나도 계속 머무는 장면도 있으니까요.</p>
          <p>아마 앞으로는 이런 이야기들이 차례로 올라오게 될 것 같습니다.</p>
          <ul>
            <li>일상 속에서 문득 멈춰 서게 만드는 장면</li>
            <li>일을 하면서 자연스럽게 이어지는 AI와 헬스케어에 대한 생각</li>
            <li>지나치게 무겁지 않지만, 가볍게 흘려보내고 싶지는 않은 관찰</li>
          </ul>
          <p>결국 중심은 거창한 주장보다, 오래 남는 기록에 두고 싶습니다.</p>

          <h3>너무 잘 쓰려 하기보다 오래 쓰고 싶습니다</h3>
          <p>요즘에는 잘 정리된 글이 정말 많습니다. 그래서 더더욱, 이곳에서는 정답처럼 보이는 문장보다 실제로 제 손을 거쳐 나온 문장을 남기고 싶습니다.</p>
          <p>문장이 조금 덜 매끈하더라도 생활의 온도가 남아 있었으면 좋겠습니다. 어떤 날은 짧게, 어떤 날은 조금 더 길게 쓰더라도 흐름이 끊기지 않는 쪽을 더 중요하게 생각해보려 합니다.</p>
          <blockquote>완벽한 첫 글보다, 계속 이어질 첫 글이 더 낫다고 믿어보려 합니다.</blockquote>

          <h3>오늘의 첫 포스팅이라는 사실을 남겨두고 싶습니다</h3>
          <p>그래서 이 글의 시작과 마지막에는 같은 마음을 남기고 싶었습니다. 이 글은 제 홈페이지 블로그의 첫 번째 글이고, 앞으로의 분위기를 조용히 정하는 문장입니다.</p>
          <p>대단한 선언처럼 시작하고 싶지는 않습니다. 다만 나중에 다시 돌아왔을 때, 이 공간이 바로 여기서부터 시작됐다는 건 분명히 기억할 수 있었으면 합니다.</p>
          <p>첫 글은 오늘 여기까지입니다. 다음 글부터는 조금 더 편안한 마음으로, 그래도 꾸준하게 이어가 보겠습니다.</p>
        `,
      },
      en: {
        title: 'With This First Post, I Want to Start Writing Again',
        keywords: ['Daily'],
        excerpt: 'As I upload the first post to a blog space that sat empty for a while, I wanted to write down what kind of record I hope to leave here.',
        heroImage: {
          alt: 'A quiet desk with warm sunlight, a notebook, a pen, and a smartphone',
          caption: 'Like a quiet desk before the first sentence, I wanted this blog to begin without too much noise.',
        },
        contentHtml: `
          <p>For some reason, the first blog post is always the one that takes the longest to write.</p>
          <p>The homepage itself had already started to look like something, but this one space remained empty for quite a while. I spent so much time wondering what I should write first that I ended up writing nothing at all.</p>
          <p>So today I decided to choose a beginning over perfection. This is the first post on my homepage blog, and I wanted that fact to be clear both at the beginning and at the end.</p>

          <h3>Why did the first post take this long</h3>
          <p>When something is the first of its kind, it is easy to become overly aware of the impression it should make. It feels like the first post should represent everything at once. Not too light, not too heavy, and somehow able to set the tone for the whole blog.</p>
          <p>But the more I thought that way, the slower my hands became. So I tried to think about it differently today. The first post does not need to explain everything. It only needs to be a clear sign that this space has finally started moving.</p>
          <p>Once I accepted that, it became easier to see what kind of writing I actually want to leave here.</p>

          <h3>What I want to record in this space</h3>
          <p>This blog will sometimes be a place to organize information, but more than that, I hope it becomes a place to leave behind the thoughts that stay with me between work and daily life. Some feelings disappear in a day, and some scenes stay for much longer.</p>
          <p>I imagine that the posts here will gradually include things like these.</p>
          <ul>
            <li>Small moments in daily life that make me pause</li>
            <li>Thoughts about AI and healthcare that naturally grow out of work</li>
            <li>Observations that are not too heavy, but still do not feel disposable</li>
          </ul>
          <p>More than anything, I want the center of this space to stay with records that linger.</p>

          <h3>I would rather keep writing than try to write perfectly</h3>
          <p>There is already so much polished writing out there. That is exactly why I want this space to hold sentences that actually passed through my own hands, rather than lines that merely look correct.</p>
          <p>Even if a sentence is not perfectly smooth, I hope it still carries the temperature of real life. Some days the posts may be short, and on other days they may run longer, but I want continuity to matter more than polish.</p>
          <blockquote>A first post that continues is better than a first post that only looks complete.</blockquote>

          <h3>I want to remember that this was the beginning</h3>
          <p>That is why I wanted the same feeling to appear at the start and at the end of this post. This is the first post on my homepage blog, and it quietly sets the mood for what may follow.</p>
          <p>I do not want to begin with a grand declaration. I only want to remember, when I look back later, that this space truly started here.</p>
          <p>That is enough for the first post today. From the next one on, I hope I can return a little more comfortably, and a little more consistently.</p>
        `,
      },
      ja: {
        title: '最初の投稿として、また記録を始めてみようと思います',
        keywords: ['日常'],
        excerpt: 'しばらく空いていたブログ欄に最初の文章を載せながら、この場所にどんな記録を残したいのかを静かに書いてみました。',
        heroImage: {
          alt: 'やわらかな日差しが差し込む机の上にノートとペン、スマートフォンが置かれている様子',
          caption: '最初の一文を書く前の静かな机のように、このブログもあまり騒がしくなく始めたいと思いました。',
        },
        contentHtml: `
          <p>ブログの最初の投稿は、なぜかいつもいちばん遅く書くことになる気がします。</p>
          <p>ホームページの形はある程度整っていたのに、この場所だけはしばらく空いたままでした。何から書けばいいのかを考えすぎて、結局一文も残せないまま時間だけが先に過ぎていきました。</p>
          <p>なので今日は、完成度よりも始まりを選んでみようと思います。これはこのホームページのブログに載せる最初の投稿で、そのことを冒頭と最後の両方にちゃんと残しておきたかったのです。</p>

          <h3>なぜ最初の投稿がこんなに遅れたのか</h3>
          <p>何かを初めて公開するときは、どうしても第一印象を意識してしまいます。最初の投稿らしく見えなければならない気がしますし、軽すぎても重すぎてもいけないように感じます。そして、このブログの方向まで一度に全部見せなければならない気さえしてきます。</p>
          <p>けれど、そう考えるほど手は遅くなりました。だから今日は少し考え方を変えてみました。最初の投稿がすべてを説明しなくても、この場所がこれから本当に動き始めるという合図になれば、それで十分なのではないかと。</p>
          <p>そう思ってみると、ここにどんな文章を残したいのかが少しずつ見えてきました。</p>

          <h3>この場所に残していきたいこと</h3>
          <p>このブログは情報を整理する場所にもなると思いますが、それより先に、仕事と生活のあいだで長く心に残る考えを書き留める場所になってほしいと思っています。一日で消えてしまう気持ちもあれば、数日たっても残る場面もあります。</p>
          <p>たぶん、これからはこんな話が少しずつ増えていくはずです。</p>
          <ul>
            <li>日常の中でふと立ち止まりたくなる場面</li>
            <li>仕事の中から自然につながっていくAIやヘルスケアの話</li>
            <li>重すぎはしないけれど、軽く流したくもない観察</li>
          </ul>
          <p>結局この場所の中心には、強い主張よりも長く残る記録を置きたいと思っています。</p>

          <h3>うまく書くことより、長く書き続けること</h3>
          <p>今は整った文章が本当にたくさんあります。だからこそ、この場所には正しそうに見える文よりも、自分の手を通って出てきた文を残したいです。</p>
          <p>少しぎこちなくても、生活の温度が残っているほうがいいと思っています。短い日もあれば、もう少し長くなる日もあるはずですが、途切れずに続くことを大事にしてみたいです。</p>
          <blockquote>完璧に見える最初の投稿より、続いていく最初の投稿のほうがいいと信じてみようと思います。</blockquote>

          <h3>これが始まりだったと覚えておきたいです</h3>
          <p>だからこの文章の最初と最後には、同じ気持ちを残しておきたかったのです。これはこのホームページのブログに載る最初の投稿で、これからの空気を静かに決める文章です。</p>
          <p>大げさな宣言のように始めたいわけではありません。ただ、あとでまた振り返ったときに、この場所が本当にここから始まったのだと分かれば十分です。</p>
          <p>最初の投稿は今日はここまでにします。次の文章からは、もう少し気楽に、それでも途切れず続けていけたらと思います。</p>
        `,
      },
    },
  },
];
