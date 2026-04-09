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
    slug: 'how-to-use-ai-agents-on-threads-and-x-for-real-work',
    category: 'ai',
    createdAt: '2026-04-09T23:40:00+09:00',
    heroImage: {
      src: '/blog/threads-x-ai-agent-hero.svg',
    },
    locales: {
      ko: {
        title: 'Threads와 X에서 AI 에이전트를 어떻게 써야 실제 성과가 날까',
        keywords: ['AI'],
        excerpt: '같은 소셜 플랫폼처럼 보여도, X는 실시간 신호 탐지와 승인형 응답에, Threads는 대화 확장과 인사이트 기반 운영에 더 잘 맞습니다.',
        heroImage: {
          alt: '왼쪽에는 X 실시간 피드 카드가, 오른쪽에는 Threads 대화 카드가, 가운데에는 신호 스캔과 답변 초안, 스케줄링이 표시된 AI 에이전트 패널이 놓인 대시보드 일러스트',
          caption: '소셜용 AI 에이전트는 모든 플랫폼에서 똑같이 움직일수록 약해집니다. X는 신호를 잡고, Threads는 대화를 키우는 식으로 역할을 나눌 때 훨씬 현실적입니다.',
        },
        contentHtml: `
          <p>소셜 채널에 AI 에이전트를 붙인다고 하면 많은 분들이 먼저 자동 포스팅부터 떠올립니다. 하지만 2026년 4월 9일 기준으로 보면, 지금 실무에서 성과가 나는 방식은 “둘 다 자동으로 많이 올리는 구조”가 아닙니다.</p>
          <p><strong>X는 실시간 신호를 빨리 잡고, 문의와 반응을 구조화하는 쪽</strong>에 더 잘 맞습니다. 반대로 <strong>Threads는 대화를 길게 키우고, 주제 태그와 인사이트로 커뮤니티를 넓히는 쪽</strong>에 더 잘 맞습니다. 둘을 같은 플랫폼처럼 다루면 오히려 성과가 흐려집니다.</p>
          <p>이 글은 Threads와 X에 AI 에이전트를 어떻게 붙여야 실제로 도움이 되는지, 그리고 어디까지 자동화하고 어디서 사람 승인을 남겨야 하는지를 공식 기능과 최근 업데이트 기준으로 정리한 글입니다.</p>

          <h3>핵심은 “한 에이전트, 두 역할”이 아니라 “두 플랫폼, 다른 역할”이다</h3>
          <p>이 구분은 감으로 하는 얘기가 아닙니다. X 공식 문서는 여전히 검색, 스트림, DM, 자동응답 정책을 중심으로 설계되어 있습니다. 반면 Threads는 2024년 8월부터 인사이트, 다중 초안, 예약 발행을 넣었고, 2024년 10월에는 replies가 전체 조회의 거의 절반을 만든다고 직접 밝혔습니다. 2025년에는 topic, custom feed, follow import, fediverse feed, community까지 붙었습니다.</p>
          <blockquote>제 해석은 단순합니다. X에서는 AI 에이전트를 “리스너이자 분류기”로 두는 편이 좋고, Threads에서는 “대화 설계자이자 운영 보조”로 두는 편이 좋습니다.</blockquote>
          <p>즉, X는 먼저 세상이 무슨 말을 하는지 읽는 곳이고, Threads는 읽어낸 신호를 더 긴 대화와 커뮤니티 흐름으로 바꾸는 곳에 가깝습니다.</p>

          <h3>X에서는 AI 에이전트를 신호 탐지와 승인형 응답에 붙이는 편이 맞다</h3>
          <p>X API는 여전히 실시간 감지 역량이 강합니다. 최근 검색은 지난 7일 데이터를 다루고, filtered stream은 규칙에 맞는 게시물을 거의 실시간으로 받을 수 있으며, X 문서는 filtered stream의 P99 지연을 대략 6~7초 수준으로 설명합니다. 여기에 full-archive search와 counts를 섞으면 짧은 반응뿐 아니라 장기 흐름까지 같이 볼 수 있습니다.</p>
          <p>이 구조에서 AI 에이전트가 잘하는 일은 꽤 분명합니다.</p>
          <ol>
            <li>키워드와 계정, 해시태그 기준으로 게시물을 계속 받아온다.</li>
            <li>불만, 질문, 구매 신호, 기능 요청, 경쟁사 언급으로 자동 분류한다.</li>
            <li>같은 주제를 묶어서 “오늘 바로 반응할 것”, “이번 주 콘텐츠로 풀 것”, “나중에 제품 개선 백로그로 넘길 것”으로 나눈다.</li>
            <li>DM이나 reply 초안을 만들되, 실제 발송은 사람이 승인한다.</li>
          </ol>
          <p>특히 고객지원이나 세일즈 초기 접점에서는 DM 구조가 유용합니다. X는 공식 문서에서 Direct Messages와 group conversations를 지원하고, <code>dm.write</code>, <code>dm.read</code> 스코프도 따로 제시합니다. 즉, AI 에이전트는 멘션에서 바로 모든 답을 공개적으로 던지기보다, 우선순위가 높은 대화를 private channel로 넘기는 도우미로 설계하는 편이 더 현실적입니다.</p>
          <p>다만 자동응답은 조심해야 합니다. X의 2025년 10월 기준 자동화 규칙은 키워드 검색만으로 무작위 reply를 보내는 방식을 허용하지 않고, AI 기반 자동 reply bot도 사전 서면 승인을 요구합니다. 게다가 웹 화면을 스크립트로 긁어 자동화하는 방식은 계정 영구 정지까지 갈 수 있다고 명시합니다.</p>
          <p>그래서 X에서 안전한 실무 패턴은 이쪽입니다.</p>
          <ul>
            <li>읽기: 검색, 스트림, 카운트, 멘션 수집은 적극적으로 자동화한다.</li>
            <li>쓰기: 게시물 초안, 요약, DM 초안까지만 자동화하고 발행은 승인형으로 둔다.</li>
            <li>응답: 사용자가 먼저 반응했거나 DM을 보낸 경우에만 후속 자동화를 붙인다.</li>
            <li>리스크: “많이 답하기”보다 “맞는 사람에게 정확히 답하기”를 우선한다.</li>
          </ul>

          <h3>Threads에서는 AI 에이전트를 대화 확장과 운영 루틴에 붙이는 편이 더 낫다</h3>
          <p>Threads는 최근 업데이트를 보면 방향이 꽤 선명합니다. 2024년 8월 Meta는 creators와 businesses를 위해 insights, multiple drafts, scheduling을 발표했습니다. 2024년 10월에는 replies가 전체 조회의 거의 절반을 차지하고, 주 2~5회 게시가 audience build에 도움이 된다고 설명했습니다. 2025년 3월에는 topic이 포함된 게시물이 더 많은 조회를 받는다고 했고, 2025년 10월 업데이트에서는 reply approvals로 댓글 공개 여부를 직접 고를 수 있게 했습니다.</p>
          <p>여기에 2025년 4월에는 Threads 웹에서 custom feeds, auto-update, favorite searches, insights column, 그리고 X부터 시작하는 follow list import 테스트를 붙였습니다. 2025년 6월에는 fediverse search와 dedicated feed를 넣어 Threads 밖의 작성자도 안으로 끌어왔고, 2025년 10월에는 communities를 공개하면서 주제 중심의 공간을 더 분명히 만들었습니다. 2026년 2월의 Dear Algo는 사용자가 공개 글로 피드 선호를 직접 조절하는 AI 기능까지 보여줬습니다.</p>
          <p>이 기능들을 묶어 보면, Threads에서 AI 에이전트가 가장 잘하는 일은 “대화를 길게 키우는 운영 루프”입니다.</p>
          <ol>
            <li>X에서 발견한 신호를 Threads 문법에 맞는 질문형 포스트로 바꾼다.</li>
            <li>주제 태그와 톤을 맞춰서 초안을 여러 개 저장한다.</li>
            <li>예약 발행으로 리듬을 유지한다.</li>
            <li>인사이트를 읽어 어떤 주제가 replies와 views를 만들었는지 비교한다.</li>
            <li>reply approvals와 필터로 대화 질을 관리한다.</li>
            <li>custom feed, fediverse, communities를 통해 비슷한 관심사의 대화를 계속 탐색한다.</li>
          </ol>
          <p>즉, Threads에서는 AI 에이전트를 “콘텐츠 공장”으로 쓰는 것보다, <strong>대화 큐레이터</strong>로 두는 편이 낫습니다. 같은 신호라도 X에서는 속도와 분류가 중요하고, Threads에서는 그 신호를 누가 더 오래 이야기하게 만들 수 있는지가 중요하기 때문입니다.</p>
          <p>제가 보기에 Threads용 AI 에이전트는 특히 아래 같은 운영에 잘 맞습니다.</p>
          <ul>
            <li>브랜드 계정이 아니라 개인 브랜드나 1인 사업자의 의견형 포스팅 운영</li>
            <li>뉴스 링크를 던지는 대신 해석과 질문을 던지는 포맷 실험</li>
            <li>한 주제에 대한 댓글 흐름을 보고 후속 글을 이어가는 연재형 운영</li>
            <li>커뮤니티 안에서 반복 등장하는 질문을 잡아 다음 글 주제로 연결하는 루프</li>
          </ul>

          <h3>실제로는 이렇게 쓰는 편이 가장 안정적이다</h3>
          <p>혼자 운영하는 경우라면 거창한 에이전트 시스템보다 아래 7단계만 먼저 붙여도 충분합니다.</p>
          <ol>
            <li><strong>감시 키워드 정의</strong>: 제품명, 경쟁사명, 문제 키워드, 구매 의도 키워드, 산업 키워드를 정합니다.</li>
            <li><strong>X 스캔</strong>: recent search와 filtered stream으로 오늘의 신호를 모읍니다.</li>
            <li><strong>에이전트 분류</strong>: 질문, 불만, 트렌드, 리드, 콘텐츠 후보로 나눕니다.</li>
            <li><strong>Threads 변환</strong>: 가장 쓸 만한 2~3개를 해설형 포스트와 질문형 포스트로 바꿉니다.</li>
            <li><strong>사람 승인</strong>: 실제 게시 전에는 제목, 톤, 민감 표현만 사람이 검토합니다.</li>
            <li><strong>예약 발행과 댓글 운영</strong>: Threads는 예약과 replies 운영, X는 멘션·DM triage에 집중합니다.</li>
            <li><strong>인사이트 환류</strong>: 어떤 topic, 어떤 질문, 어떤 시간대가 가장 반응이 좋았는지 다시 반영합니다.</li>
          </ol>
          <p>이 구조의 장점은 두 가지입니다. 첫째, X의 속도와 Threads의 대화성을 동시에 살릴 수 있습니다. 둘째, 자동화가 있어도 계정 리스크를 과하게 높이지 않습니다.</p>

          <h3>하지 않는 편이 나은 방식도 분명하다</h3>
          <p>반대로 실무에서 자주 보이는 나쁜 패턴도 있습니다.</p>
          <ul>
            <li>같은 문장을 X와 Threads에 그대로 동시 복붙하는 것</li>
            <li>X에서 키워드만 보고 자동 reply를 무차별 발송하는 것</li>
            <li>Threads를 외부 링크 유도 채널처럼만 쓰는 것</li>
            <li>AI가 만든 답변을 승인 없이 바로 멘션과 DM으로 보내는 것</li>
            <li>플랫폼별 말투 차이를 무시하고 한 톤으로만 운영하는 것</li>
          </ul>
          <p>지금 공개된 기능만 놓고 보면, Threads는 “계속 얘기하고 싶게 만드는 구조”가 강하고 X는 “무슨 일이 벌어지는지 제일 먼저 잡는 구조”가 강합니다. 이건 제가 2024년 8월부터 2026년 2월까지의 Meta와 X 공식 업데이트를 묶어 해석한 결론입니다.</p>

          <h3>지금 바로 시작한다면, X는 듣고 Threads는 키우는 구조로 가면 된다</h3>
          <p>AI 에이전트를 소셜에 붙일 때 진짜 중요한 질문은 “얼마나 많이 자동화할까”가 아닙니다. <strong>어떤 플랫폼에서 어떤 종류의 일을 맡길까</strong>입니다.</p>
          <p>X에서는 듣기, 분류, DM 전환, 승인형 응답이 중심이 되는 편이 좋습니다. Threads에서는 해설형 초안, 예약 발행, 댓글 선별, 인사이트 환류, 커뮤니티 연결이 중심이 되는 편이 좋습니다. 이 역할 분리를 해두면 AI 에이전트는 단순 복붙 도구가 아니라 실제 운영자처럼 움직이기 시작합니다.</p>
          <p>저는 지금 시점에서 소셜용 AI 에이전트를 이렇게 정의하는 편이 맞다고 봅니다. X에서 먼저 신호를 잡고, Threads에서 그 신호를 사람이 계속 머무는 대화로 바꾸는 도구입니다.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://about.fb.com/news/2024/08/new-threads-features-for-creators-and-businesses/" target="_blank" rel="noreferrer">Meta Newsroom: New Threads Features for Creators and Businesses</a></li>
            <li><a href="https://about.fb.com/news/2024/10/find-your-community-with-new-threads-educational-insights/" target="_blank" rel="noreferrer">Meta Newsroom: Find Your Community With New Threads Educational Insights</a></li>
            <li><a href="https://about.fb.com/news/2025/03/new-threads-features-more-personalized-experience-you-control/" target="_blank" rel="noreferrer">Meta Newsroom: New Threads Features for a More Personalized Experience That You Control</a></li>
            <li><a href="https://about.fb.com/news/2025/04/new-features-threads-web-experience/" target="_blank" rel="noreferrer">Meta Newsroom: New Features for the Threads Web Experience</a></li>
            <li><a href="https://about.fb.com/news/2025/06/its-now-easier-see-more-fediverse-content-threads/" target="_blank" rel="noreferrer">Meta Newsroom: It’s Now Easier to See More Fediverse Content on Threads</a></li>
            <li><a href="https://about.fb.com/news/2025/10/introducing-threads-communities-find-your-people/" target="_blank" rel="noreferrer">Meta Newsroom: Introducing Threads Communities</a></li>
            <li><a href="https://about.fb.com/news/2026/02/threads-dear-algo/" target="_blank" rel="noreferrer">Meta Newsroom: Control Your Threads Feed With New Dear Algo Feature</a></li>
            <li><a href="https://techcrunch.com/2024/06/18/threads-finally-launches-its-api-for-developers/" target="_blank" rel="noreferrer">TechCrunch: Threads finally launches its API for developers</a></li>
            <li><a href="https://docs.x.com/x-api/introduction" target="_blank" rel="noreferrer">X Docs: X API introduction</a></li>
            <li><a href="https://docs.x.com/x-api/posts/search-recent-posts" target="_blank" rel="noreferrer">X Docs: Search recent Posts</a></li>
            <li><a href="https://docs.x.com/x-api/posts/filtered-stream/introduction" target="_blank" rel="noreferrer">X Docs: Filtered Stream</a></li>
            <li><a href="https://docs.x.com/enterprise-api/direct-messages/manage/quickstart" target="_blank" rel="noreferrer">X Docs: Direct Messages Quickstart</a></li>
            <li><a href="https://help.x.com/en/rules-and-policies/x-automation" target="_blank" rel="noreferrer">X Help: Automation rules</a></li>
          </ul>
        `,
      },
      en: {
        title: 'How to Use AI Agents on Threads and X for Real Work, Not Just Auto-Posting',
        keywords: ['AI'],
        excerpt: 'Even though they look like similar social platforms, X is stronger for real-time signal detection and approval-based responses, while Threads is stronger for conversation compounding and insight-led community growth.',
        heroImage: {
          alt: 'A dashboard illustration showing an X signal feed on the left, Threads conversation cards on the right, and an AI agent panel in the center for scanning, drafting, and routing',
          caption: 'Social AI agents get stronger when they stop treating every platform the same. X is better for catching signals early, while Threads is better for extending the conversation.',
        },
        contentHtml: `
          <p>When people say they want to use an AI agent on social media, they often mean one thing: automate posting. But as of April 9, 2026, that is still the least interesting use case.</p>
          <p>If you look at recent Meta and X product updates together, a more practical split appears. <strong>X works better as a listening and routing surface</strong>. <strong>Threads works better as a conversation-building and operating surface</strong>. If you force the same agent behavior onto both, the result usually gets worse, not better.</p>
          <p>This matters because the most effective social AI setup is not a single bot shouting into every channel. It is a workflow that gives different jobs to different platforms.</p>

          <h3>X is where AI agents should listen first</h3>
          <p>X still has the stronger real-time data posture. The current docs position recent search for the last seven days, filtered stream for near real-time matching posts, and full-archive search and counts for longer pattern analysis. The filtered stream introduction even calls out roughly 6-7 seconds of P99 latency, which is fast enough for product monitoring, campaign response, and issue detection.</p>
          <p>That makes X a strong place for an agent to do four concrete jobs:</p>
          <ol>
            <li>Watch for questions, complaints, buying signals, competitor mentions, and urgent keywords.</li>
            <li>Cluster incoming posts into themes instead of dumping a noisy feed on a human operator.</li>
            <li>Draft replies or DM handoffs for approval.</li>
            <li>Turn repeated patterns into content ideas for later publishing.</li>
          </ol>
          <p>The DM layer matters more than many teams expect. X officially documents Direct Messages and group conversations, with dedicated <code>dm.read</code> and <code>dm.write</code> scopes. In practice, that means an agent can be useful as a triage and escalation layer, not only as a public-post assistant.</p>
          <p>But X is also the place where the guardrails are clearest. Its automation rules say keyword-triggered mass auto-replies are not allowed, non-API website scripting can lead to permanent suspension, and AI-powered reply bots require prior written approval from X. So the practical model is simple: automate reading aggressively, automate writing cautiously, and keep sending behind approval.</p>

          <h3>Threads is where AI agents should help shape the conversation</h3>
          <p>Threads has evolved in a different direction. In August 2024, Meta introduced insights, multiple drafts, and scheduling for creators and businesses. In October 2024, Meta said replies account for almost half of views on Threads and recommended posting 2-5 times per week for audience growth. In March 2025, Meta said posts that include a topic generally receive more views, and in the October 30, 2025 update it added reply approvals so people can decide which replies appear publicly.</p>
          <p>Then the platform kept leaning into operating tools: custom feeds, auto-updating web columns, and follow import from X in April 2025; fediverse search and a dedicated fediverse feed in June 2025; communities in October 2025; and Dear Algo in February 2026 as an AI-powered way for users to temporarily reshape what they see.</p>
          <p>Put together, those features point to a very different agent role. On Threads, the best AI agent is not a spammy auto-poster. It is a <strong>conversation designer</strong>.</p>
          <ol>
            <li>Rewrite raw signals from X into Threads-native prompts, takes, and explainers.</li>
            <li>Add the right topic framing and save multiple variants as drafts.</li>
            <li>Schedule a steady cadence instead of posting in bursts.</li>
            <li>Read insights and compare which topics, formats, and prompts generate replies.</li>
            <li>Use reply approvals and filters to keep the discussion useful.</li>
            <li>Use custom feeds, fediverse discovery, and communities to keep expanding the right audience.</li>
          </ol>
          <p>That is why Threads works especially well for founders, solo operators, educators, and subject-matter creators. The winning move is rarely “publish more.” It is “publish the right interpretation, then stay inside the replies long enough to grow a community around it.”</p>

          <h3>A practical operating loop looks like this</h3>
          <p>If I were setting this up for one person or a small team today, I would keep it narrow.</p>
          <ol>
            <li>Define watchlists on X: product terms, competitor names, pain points, intent signals, and market keywords.</li>
            <li>Let an agent scan recent search and filtered stream, then classify what it sees.</li>
            <li>Pick the two or three patterns worth turning into content.</li>
            <li>Rewrite those patterns into Threads posts that invite discussion instead of just dropping links.</li>
            <li>Require human approval before publishing or sending any sensitive response.</li>
            <li>Use Threads insights and reply quality to decide what to expand next.</li>
          </ol>
          <p>In other words, X becomes the sensing layer, and Threads becomes the compounding layer.</p>

          <h3>What not to automate</h3>
          <ul>
            <li>Do not blast the same copy to X and Threads without changing the format.</li>
            <li>Do not run keyword-only auto-reply campaigns on X.</li>
            <li>Do not treat Threads like a pure outbound link channel.</li>
            <li>Do not let AI send DMs or public replies without approval on high-risk topics.</li>
            <li>Do not confuse speed with usefulness; the highest-volume workflow is often the weakest one.</li>
          </ul>
          <p>This final split is an inference from the public product surface, but it is a strong one. X keeps investing in search, streams, DMs, and automation rules. Threads keeps investing in drafts, scheduling, insights, topics, communities, and discovery. That is enough to shape a real operating model.</p>

          <h3>The best setup right now is simple</h3>
          <p>Use X to catch weak signals before they become obvious. Use Threads to turn those signals into a point of view, then into a conversation, then into a community rhythm. That is a much stronger role for an AI agent than blind cross-posting ever was.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://about.fb.com/news/2024/08/new-threads-features-for-creators-and-businesses/" target="_blank" rel="noreferrer">Meta Newsroom: New Threads Features for Creators and Businesses</a></li>
            <li><a href="https://about.fb.com/news/2024/10/find-your-community-with-new-threads-educational-insights/" target="_blank" rel="noreferrer">Meta Newsroom: Find Your Community With New Threads Educational Insights</a></li>
            <li><a href="https://about.fb.com/news/2025/03/new-threads-features-more-personalized-experience-you-control/" target="_blank" rel="noreferrer">Meta Newsroom: New Threads Features for a More Personalized Experience That You Control</a></li>
            <li><a href="https://about.fb.com/news/2025/04/new-features-threads-web-experience/" target="_blank" rel="noreferrer">Meta Newsroom: New Features for the Threads Web Experience</a></li>
            <li><a href="https://about.fb.com/news/2025/06/its-now-easier-see-more-fediverse-content-threads/" target="_blank" rel="noreferrer">Meta Newsroom: It’s Now Easier to See More Fediverse Content on Threads</a></li>
            <li><a href="https://about.fb.com/news/2025/10/introducing-threads-communities-find-your-people/" target="_blank" rel="noreferrer">Meta Newsroom: Introducing Threads Communities</a></li>
            <li><a href="https://about.fb.com/news/2026/02/threads-dear-algo/" target="_blank" rel="noreferrer">Meta Newsroom: Control Your Threads Feed With New Dear Algo Feature</a></li>
            <li><a href="https://techcrunch.com/2024/06/18/threads-finally-launches-its-api-for-developers/" target="_blank" rel="noreferrer">TechCrunch: Threads finally launches its API for developers</a></li>
            <li><a href="https://docs.x.com/x-api/introduction" target="_blank" rel="noreferrer">X Docs: X API introduction</a></li>
            <li><a href="https://docs.x.com/x-api/posts/search-recent-posts" target="_blank" rel="noreferrer">X Docs: Search recent Posts</a></li>
            <li><a href="https://docs.x.com/x-api/posts/filtered-stream/introduction" target="_blank" rel="noreferrer">X Docs: Filtered Stream</a></li>
            <li><a href="https://docs.x.com/enterprise-api/direct-messages/manage/quickstart" target="_blank" rel="noreferrer">X Docs: Direct Messages Quickstart</a></li>
            <li><a href="https://help.x.com/en/rules-and-policies/x-automation" target="_blank" rel="noreferrer">X Help: Automation rules</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'ThreadsとXでAIエージェントをどう使えば、実務の成果につながるのか',
        keywords: ['AI'],
        excerpt: '同じようなソーシャルに見えても、Xはリアルタイムの兆候検知と承認付き応答に、Threadsは会話拡張とインサイト起点の運用に向いています。',
        heroImage: {
          alt: '左にXのシグナルフィード、右にThreadsの会話カード、中央にスキャンと下書きとルーティングを行うAIエージェントのパネルが置かれたダッシュボード風イラスト',
          caption: 'ソーシャル向けAIエージェントは、すべてのプラットフォームを同じように扱わないほうが強くなります。Xは兆候をつかみ、Threadsは会話を育てる側に向いています。',
        },
        contentHtml: `
          <p>ソーシャル運用にAIエージェントを入れたいと言うと、多くの場合は自動投稿を想像します。ですが、2026年4月9日時点で実務に効くのは、ただ投稿を増やす形ではありません。</p>
          <p>最近のMetaとXの公式アップデートを並べてみると、役割の分け方がかなりはっきりしています。<strong>Xは兆候を早く拾い、反応を整理する場所</strong>です。<strong>Threadsは視点を会話に変え、コミュニティとして育てる場所</strong>です。ここを同じ運用にすると、むしろ弱くなります。</p>
          <p>つまり、強いソーシャルAIは「一つのボットで全部やる」設計ではなく、「プラットフォームごとに違う仕事を持たせる」設計です。</p>

          <h3>Xでは、AIエージェントを聞き役と仕分け役に置くほうがいい</h3>
          <p>Xの公開ドキュメントは、いまも検索、ストリーム、DM、そして自動化ルールを中心に組み立てられています。Recent Searchは直近7日、Filtered Streamは条件に合う投稿をほぼリアルタイムで受け取れますし、ドキュメントではFiltered StreamのP99遅延をおよそ6〜7秒と説明しています。さらにFull-Archive SearchやCountsを組み合わせれば、短期の反応と長期の流れを同時に見られます。</p>
          <p>この前提だと、X上のAIエージェントは次のような仕事に向きます。</p>
          <ol>
            <li>質問、苦情、購買シグナル、競合言及、急上昇キーワードを拾う</li>
            <li>ノイズの多い投稿群をテーマごとにまとめる</li>
            <li>返信案やDM移行案を作る</li>
            <li>同じパターンを後続コンテンツの種に変える</li>
          </ol>
          <p>特にDMは重要です。XはDirect Messagesとgroup conversationsを公式に案内しており、<code>dm.read</code>と<code>dm.write</code>のスコープも用意しています。つまり、AIエージェントは公開返信を乱発する存在ではなく、会話を適切な場所へ送るトリアージ層として使うほうが現実的です。</p>
          <p>ただし、Xではガードレールもかなり明確です。キーワード検索だけで自動返信することは認められておらず、AIを使った自動返信ボットは事前の明示的な承認が必要です。また、Web画面をスクリプトで直接自動化する方法は、アカウント停止につながり得るとヘルプに明記されています。</p>
          <p>だから、Xで安全に運用するなら「読む自動化は強く、送る自動化は慎重に」という原則が合っています。</p>

          <h3>Threadsでは、AIエージェントを会話設計と運用補助に置くほうがいい</h3>
          <p>Threadsの進化は別方向です。2024年8月にMetaはinsights、multiple drafts、schedulingを導入しました。2024年10月には、Repliesが閲覧のほぼ半分を占めること、そして週2〜5回の投稿がオーディエンス形成に役立つことを明かしました。2025年3月にはtopic付き投稿のほうが閲覧されやすいと述べ、2025年10月の更新ではreply approvalsを追加して公開する返信を選べるようにしました。</p>
          <p>さらに2025年4月にはcustom feeds、auto-update、favorite searches、insights column、そしてXから始まるfollow importのテストを導入し、2025年6月にはfediverse検索と専用フィード、2025年10月にはcommunities、2026年2月にはDear AlgoというAIベースのフィード調整機能まで出しています。</p>
          <p>この流れを見ると、Threads上で強いAIエージェントは自動投稿機ではなく、<strong>会話キュレーター</strong>です。</p>
          <ol>
            <li>Xで拾った兆候を、Threads向けの問いや解説に書き換える</li>
            <li>topicの文脈を合わせて複数の下書きを保存する</li>
            <li>予約投稿で一定のリズムをつくる</li>
            <li>insightsを見て、どの話題やフォーマットがreplyを生んだかを比べる</li>
            <li>reply approvalsやfiltersで会話の質を保つ</li>
            <li>custom feeds、fediverse、communitiesで適切な読者との接点を広げる</li>
          </ol>
          <p>つまりThreadsでは、「何本投稿したか」より「どれだけ会話が続いたか」が重要です。AIエージェントはここで、視点の言い換え、下書きの比較、返信導線の整理、コミュニティ観察に使うほうが効果的です。</p>

          <h3>いま実務で使うなら、この運用ループが現実的です</h3>
          <ol>
            <li>Xで監視キーワードを定義する</li>
            <li>Recent SearchとFiltered Streamで今日の変化を集める</li>
            <li>AIエージェントが質問、苦情、トレンド、リード候補に分ける</li>
            <li>価値の高いパターンだけをThreads向けの解説や問いに変える</li>
            <li>投稿や返信は人が承認してから出す</li>
            <li>Threadsのinsightsとreplyの質を見て次のテーマを決める</li>
          </ol>
          <p>この構造なら、Xの速度とThreadsの会話性をそれぞれ生かせますし、アカウントリスクも抑えやすくなります。</p>

          <h3>やらないほうがいいこと</h3>
          <ul>
            <li>XとThreadsに同じ文面をそのまま流すこと</li>
            <li>Xでキーワードだけを見て自動返信を乱発すること</li>
            <li>Threadsを単なるリンク誘導チャネルとして扱うこと</li>
            <li>高リスクなDMや公開返信を承認なしでAIに送らせること</li>
            <li>プラットフォームごとの文脈差を無視すること</li>
          </ul>
          <p>この役割分担は、公開されている機能群を束ねて見たときの実務的な解釈です。Xは検索、ストリーム、DM、ポリシーが強く、Threadsは下書き、予約、インサイト、トピック、コミュニティが強い。この差は、実際の運用モデルにそのまま反映したほうがいいと思います。</p>

          <h3>今の最適解は、Xで拾ってThreadsで育てることです</h3>
          <p>ソーシャル向けAIエージェントで本当に大事なのは、自動化量ではなく、どのプラットフォームでどの仕事を任せるかです。Xでは聞く、分類する、DMへつなぐ。Threadsでは視点を育てる、会話を続ける、コミュニティを広げる。この分担を決めるだけで、AIエージェントは単なる自動投稿ツールではなく、実際の運用者に近い動き方になります。</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://about.fb.com/news/2024/08/new-threads-features-for-creators-and-businesses/" target="_blank" rel="noreferrer">Meta Newsroom: New Threads Features for Creators and Businesses</a></li>
            <li><a href="https://about.fb.com/news/2024/10/find-your-community-with-new-threads-educational-insights/" target="_blank" rel="noreferrer">Meta Newsroom: Find Your Community With New Threads Educational Insights</a></li>
            <li><a href="https://about.fb.com/news/2025/03/new-threads-features-more-personalized-experience-you-control/" target="_blank" rel="noreferrer">Meta Newsroom: New Threads Features for a More Personalized Experience That You Control</a></li>
            <li><a href="https://about.fb.com/news/2025/04/new-features-threads-web-experience/" target="_blank" rel="noreferrer">Meta Newsroom: New Features for the Threads Web Experience</a></li>
            <li><a href="https://about.fb.com/news/2025/06/its-now-easier-see-more-fediverse-content-threads/" target="_blank" rel="noreferrer">Meta Newsroom: It’s Now Easier to See More Fediverse Content on Threads</a></li>
            <li><a href="https://about.fb.com/news/2025/10/introducing-threads-communities-find-your-people/" target="_blank" rel="noreferrer">Meta Newsroom: Introducing Threads Communities</a></li>
            <li><a href="https://about.fb.com/news/2026/02/threads-dear-algo/" target="_blank" rel="noreferrer">Meta Newsroom: Control Your Threads Feed With New Dear Algo Feature</a></li>
            <li><a href="https://techcrunch.com/2024/06/18/threads-finally-launches-its-api-for-developers/" target="_blank" rel="noreferrer">TechCrunch: Threads finally launches its API for developers</a></li>
            <li><a href="https://docs.x.com/x-api/introduction" target="_blank" rel="noreferrer">X Docs: X API introduction</a></li>
            <li><a href="https://docs.x.com/x-api/posts/search-recent-posts" target="_blank" rel="noreferrer">X Docs: Search recent Posts</a></li>
            <li><a href="https://docs.x.com/x-api/posts/filtered-stream/introduction" target="_blank" rel="noreferrer">X Docs: Filtered Stream</a></li>
            <li><a href="https://docs.x.com/enterprise-api/direct-messages/manage/quickstart" target="_blank" rel="noreferrer">X Docs: Direct Messages Quickstart</a></li>
            <li><a href="https://help.x.com/en/rules-and-policies/x-automation" target="_blank" rel="noreferrer">X Help: Automation rules</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'why-ai-agent-design-is-now-about-state-and-tool-boundaries',
    category: 'ai',
    createdAt: '2026-04-02T23:45:00+09:00',
    heroImage: {
      src: '/blog/ai-agent-state-tools-hero-generated.webp',
    },
    locales: {
      ko: {
        title: '지금 AI 에이전트 설계의 핵심은 왜 모델보다 상태 관리와 도구 경계에 있을까',
        keywords: ['AI'],
        excerpt: '요즘 공식 자료를 읽어보면 AI 에이전트 경쟁의 무게중심이 모델 점수보다 상태 관리, 도구 실행 위치, 승인 경계 쪽으로 빠르게 이동하고 있습니다.',
        heroImage: {
          alt: '상태 타임라인, 승인 게이트, 도구 호출 카드가 보이는 AI 에이전트 워크플로 대시보드를 개발자가 검토하는 장면',
          caption: '지금의 AI 에이전트 설계는 모델 하나의 지능보다, 상태를 어디에 두고 도구를 어떻게 열어 줄지에서 더 크게 갈립니다.',
        },
        contentHtml: `
          <p>한동안 AI 글을 쓸 때마다 모델 순위표부터 보는 습관이 있었습니다. 어떤 모델이 더 정확한지, 더 긴 문맥을 읽는지, 더 저렴한지가 가장 중요한 질문처럼 보였기 때문입니다.</p>
          <p>그런데 최근 OpenAI, Anthropic, Google의 공식 자료를 나란히 읽어보면 다른 흐름이 더 분명하게 보입니다. 지금 에이전트 설계의 핵심은 “어떤 모델을 썼는가”보다 <strong>누가 상태를 들고 있는가</strong>, <strong>도구가 어디서 실행되는가</strong>, <strong>언제 사람 승인을 끼워 넣는가</strong> 쪽으로 이동하고 있습니다.</p>
          <p>이 변화는 단순한 문서 정리가 아닙니다. 실제 서비스 운영에서 장애가 덜 나고, 감사가 쉬워지고, 비용과 속도를 조절하기 쉬운 구조가 무엇인지 플랫폼들이 점점 더 노골적으로 보여주고 있다는 뜻입니다.</p>

          <h3>모델 비교표만으로는 지금 변화를 다 설명할 수 없다</h3>
          <p>OpenAI는 현재 문서에서 대화 상태를 자동으로 관리하는 stateful API 흐름을 전면에 두고 있습니다. Anthropic은 반대로 Messages API가 stateless라는 점을 분명히 하면서, 애플리케이션이 매 턴 필요한 문맥을 직접 조립하도록 설명합니다. Google은 2025년 12월 Interactions API를 소개하면서 아예 server-side state, background execution, remote MCP 지원을 핵심 기능으로 내세웠습니다.</p>
          <blockquote>이건 세 회사가 같은 기능을 복제하고 있다는 뜻이 아닙니다. 하지만 공통적으로 “이제 모델은 혼자 쓰는 텍스트 엔진이 아니라, 상태와 도구를 묶는 시스템 안에서 써야 한다”는 방향으로 움직이고 있다는 뜻은 분명합니다.</blockquote>
          <p>그래서 이제 실무자는 모델 벤치마크보다 먼저 세 가지를 물어야 합니다. 상태를 서버가 가질지 애플리케이션이 직접 관리할지, 도구 실행을 모델이 직접 트리거하게 할지 사람이 승인할지, 그리고 이 작업이 실시간 대화형인지 백그라운드 장기 작업인지 말입니다.</p>

          <h3>첫 번째 설계 결정은 누가 상태를 소유하느냐다</h3>
          <p>이 부분은 생각보다 운영 차이를 크게 만듭니다. OpenAI의 현재 문서는 Responses API와 Conversations API를 함께 써서 상태를 오래 살아 있는 대화 객체로 유지할 수 있다고 설명합니다. 반대로 Anthropic은 Messages API가 stateless이기 때문에, 매 요청마다 필요한 대화 기록을 직접 보내야 한다고 안내합니다.</p>
          <p>둘 중 어느 쪽이 무조건 낫다는 이야기는 아닙니다. 중요한 건 <strong>당신의 시스템이 어느 책임을 어디에 둘지 명확히 고르는 것</strong>입니다.</p>
          <ul>
            <li>짧은 워크플로와 엄격한 감사가 중요하면, 상태를 애플리케이션이 직접 관리하는 쪽이 더 읽기 쉽습니다.</li>
            <li>장기 대화, 다중 세션, 여러 기기 간 이어쓰기 경험이 중요하면, 플랫폼이 제공하는 stateful 흐름이 개발 속도를 크게 줄여줄 수 있습니다.</li>
            <li>도중에 승인, 멈춤, 재개, 재시도가 많은 업무라면 상태 저장 구조를 먼저 정하고 모델을 붙이는 편이 훨씬 덜 흔들립니다.</li>
          </ul>
          <p>실무에서 자주 실패하는 경우는 상태 전략 없이 채팅창부터 만드는 경우입니다. 이러면 처음에는 데모가 빠르지만, 곧바로 “이전 승인 내역은 어디 있지”, “도구 호출 결과는 무슨 기준으로 다시 넣지”, “다음 턴에 어떤 문맥만 유지해야 하지” 같은 문제가 터집니다.</p>

          <h3>두 번째 설계 결정은 도구가 어디서 실행되고 누가 승인하느냐다</h3>
          <p>Anthropic의 tool use 문서는 이 지점을 매우 분명하게 나눕니다. 어떤 도구는 애플리케이션이 실행하는 client tools이고, 어떤 도구는 Anthropic 인프라에서 바로 실행되는 server tools입니다. OpenAI의 MCP and Connectors 문서도 비슷한 방향을 보여줍니다. 모델이 remote MCP server나 connector를 사용할 수는 있지만, 기본적으로는 데이터가 공유되기 전에 개발자 승인 흐름을 거치게 되어 있습니다. Google도 2026년 3월 tooling updates에서 built-in tools와 custom functions를 한 요청 안에서 섞고, tool call 사이에 context를 순환시키는 흐름을 공식으로 밀기 시작했습니다.</p>
          <p>이건 결국 “도구를 붙일 수 있는가”의 문제가 아니라 “어느 도구를 어떤 신뢰 수준에서 붙일 것인가”의 문제입니다.</p>
          <ol>
            <li>읽기 전용 도구와 쓰기 도구를 먼저 분리합니다.</li>
            <li>쓰기 도구는 초안 생성, 내부 메모 저장처럼 좁은 행동으로 쪼갭니다.</li>
            <li>MCP는 편의 기능으로 먼저 보지 말고, 제3자 시스템과 데이터를 주고받는 신뢰 경계로 먼저 봅니다.</li>
            <li>승인을 건너뛰는 규칙은 “모든 도구”가 아니라 일부 저위험 도구부터 시작합니다.</li>
          </ol>
          <p>저는 이 지점에서 구조가 갈린다고 봅니다. 비슷한 모델을 써도 어떤 팀은 안정적이고 어떤 팀은 불안정한 이유가 여기에 있습니다. 한쪽은 모델에 넓은 권한을 열어두고, 다른 한쪽은 모델이 쓸 수 있는 표면을 좁게 잘라두기 때문입니다.</p>

          <h3>세 번째 설계 결정은 실시간 대화와 장기 작업을 분리하는 것이다</h3>
          <p>Google은 2026년 3월 Gemini 3.1 Flash Live를 소개하면서 low-latency voice and vision agents를 전면에 내세웠습니다. 동시에 2025년 12월 Interactions API에서는 background execution을 별도 핵심 기능으로 설명했습니다. 이 조합이 중요한 이유는 하나입니다. 이제 플랫폼이 공식적으로도 <strong>실시간 상호작용 경로</strong>와 <strong>길게 도는 에이전트 루프</strong>를 다른 문제로 보고 있다는 뜻이기 때문입니다.</p>
          <p>서비스 설계에서도 이 구분이 필요합니다.</p>
          <ul>
            <li>음성 상담, 실시간 코파일럿, 라이브 화면 보조처럼 지연이 곧 품질인 작업은 별도 실시간 경로로 둡니다.</li>
            <li>리서치, 긴 문서 조합, 승인 대기, 여러 도구를 거치는 오퍼레이션은 백그라운드 작업으로 둡니다.</li>
            <li>두 흐름을 한 엔드포인트와 한 세션 정책으로 억지로 묶으면 비용, 지연, 실패 처리 모두 나빠집니다.</li>
          </ul>
          <p>즉 “에이전트 하나”라는 말이 아키텍처 하나를 뜻하지는 않습니다. 오히려 요즘은 실시간 루프, 비동기 루프, 승인 루프를 분리한 뒤 같은 제품 안에서 묶는 쪽이 더 자연스러워 보입니다.</p>

          <h3>바로 적용하려면 이 다섯 가지부터 정하면 된다</h3>
          <p>이 글을 읽고 내일부터 바로 적용하려면, 모델 프롬프트보다 아래 다섯 가지를 먼저 문서로 적어보는 편이 좋습니다.</p>
          <ol>
            <li><strong>State owner</strong>: 상태를 플랫폼이 들고 갈지, 애플리케이션 데이터베이스가 들고 갈지 정합니다.</li>
            <li><strong>Tool table</strong>: 읽기 전용, 저위험 쓰기, 고위험 쓰기 도구를 나누고 승인 정책을 붙입니다.</li>
            <li><strong>Execution lane</strong>: 실시간, 동기, 비동기, 장기 작업을 분리합니다.</li>
            <li><strong>Audit payload</strong>: 입력, 근거 문서, 도구 호출, 승인자, 최종 실행 결과를 무엇까지 남길지 정합니다.</li>
            <li><strong>Failure policy</strong>: 모델이 확신이 낮을 때, 도구가 실패할 때, 사람이 자리를 비웠을 때 어디서 멈출지 정합니다.</li>
          </ol>
          <p>이 다섯 가지가 먼저 잡히면 모델 교체는 상대적으로 쉬워집니다. 반대로 이 다섯 가지가 비어 있으면 더 좋은 모델을 넣어도 운영은 계속 흔들립니다.</p>

          <h3>지금은 더 똑똑한 모델보다 더 잘 자른 에이전트가 이긴다</h3>
          <p>최근 공식 자료들을 보면, 플랫폼들은 모두 더 많은 도구와 더 긴 문맥을 제공하고 있습니다. 하지만 그보다 더 중요한 신호는, 그 도구와 문맥을 <strong>어떻게 잘라서 안전하게 연결할지</strong>를 제품 중심으로 설명하기 시작했다는 점입니다.</p>
          <p>이제 에이전트 설계는 “어떤 모델이 제일 똑똑한가”만 묻는 단계에서 조금 벗어나야 합니다. 상태를 어디에 둘지, 도구를 어디서 실행할지, 사람 승인을 언제 넣을지, 실시간 경로와 장기 경로를 어떻게 나눌지. 실제 서비스 품질은 오히려 이 질문들에서 더 크게 갈립니다.</p>
          <p>그래서 지금 AI 에이전트를 만드는 팀에게 필요한 건 모델 숭배보다 시스템 감각에 가깝습니다. 더 강한 모델 하나보다, 더 잘 잘린 상태와 도구 경계가 먼저 이깁니다.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://developers.openai.com/api/docs/guides/conversation-state" target="_blank" rel="noreferrer">OpenAI API Docs: Conversation state</a></li>
            <li><a href="https://developers.openai.com/api/docs/guides/tools-connectors-mcp" target="_blank" rel="noreferrer">OpenAI API Docs: MCP and Connectors</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/working-with-messages" target="_blank" rel="noreferrer">Anthropic Docs: Working with Messages</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" target="_blank" rel="noreferrer">Anthropic Docs: Tool use with Claude</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api/" target="_blank" rel="noreferrer">Google: Interactions API</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tooling-updates/" target="_blank" rel="noreferrer">Google: Gemini API tooling updates</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-3-1-flash-live/" target="_blank" rel="noreferrer">Google: Gemini 3.1 Flash Live</a></li>
          </ul>
        `,
      },
      en: {
        title: 'Why AI Agent Design Is Now More About State and Tool Boundaries Than Model Rankings',
        keywords: ['AI'],
        excerpt: 'Recent official docs from OpenAI, Anthropic, and Google all suggest the same shift: real agent quality now depends less on model rankings and more on state ownership, tool execution, and approval boundaries.',
        heroImage: {
          alt: 'A developer reviewing an AI agent workflow dashboard with state timeline, approval gates, and tool-call cards',
          caption: 'In current agent design, the harder problem is rarely the model alone. It is where state lives and how tool access is bounded.',
        },
        contentHtml: `
          <p>For a while, it was easy to treat AI product strategy as a model leaderboard problem. Which model reasons better, which one is cheaper, which one has the longer context window.</p>
          <p>But when you read OpenAI, Anthropic, and Google’s current official materials side by side, a different pattern stands out. The real design center is moving toward <strong>who owns state</strong>, <strong>where tools execute</strong>, and <strong>where human approval belongs</strong>.</p>
          <p>That matters because these are not cosmetic implementation details. They shape reliability, observability, cost control, auditability, and how safely an agent can operate inside a real product.</p>

          <h3>Model scorecards no longer explain the whole system</h3>
          <p>OpenAI’s current docs highlight stateful conversation flows through the Responses and Conversations APIs. Anthropic is explicit that the Messages API is stateless and that your application is responsible for bringing the right history back each turn. Google’s Interactions API goes further and presents server-side state, background execution, and remote MCP support as first-class features for modern agentic applications.</p>
          <blockquote>This does not mean the platforms are identical. It means they are all pointing toward the same architectural reality: an agent is no longer just a prompt wrapped around a model. It is a system that manages state, tools, approvals, and execution lanes.</blockquote>
          <p>Once you see that, benchmark comparisons become less central. They still matter, but they stop being the first design question.</p>

          <h3>The first design decision is who should own state</h3>
          <p>This is where teams quietly diverge. OpenAI’s current guidance makes it easier to persist state through long-running conversation objects. Anthropic’s guidance keeps the responsibility in your application by making each Messages API call stateless. Google’s Interactions API explicitly offers optional server-side state to reduce context-management complexity.</p>
          <p>The practical question is not which philosophy is universally better. It is which one matches your product.</p>
          <ul>
            <li>If auditability and exact replay matter most, app-managed state is often easier to inspect.</li>
            <li>If long sessions, cross-device continuity, or resumable agent work matter most, platform-managed state can remove a lot of plumbing.</li>
            <li>If approvals, retries, and resumptions are common, your state strategy should be decided before prompt tuning begins.</li>
          </ul>
          <p>Many agent projects become messy because teams start with a chat surface and only later ask where approvals, tool outputs, and resumable context should live. By then, the product shape is already working against them.</p>

          <h3>The second design decision is where tools run and who approves them</h3>
          <p>Anthropic’s tool-use docs draw a clean line between client tools and server tools. Some tools run in your application, with Claude returning a structured tool call that you execute. Other tools run on Anthropic’s side. OpenAI’s MCP and Connectors docs show a similar concern from another angle: models can use connectors and remote MCP servers, but approvals are requested by default before data is shared. Google’s March 2026 tooling updates point in the same direction by letting developers combine built-in tools with custom functions while circulating context across tool calls.</p>
          <p>That means the real question is not “can the model call tools?” The real question is “which tools should be exposed at which trust level?”</p>
          <ol>
            <li>Separate read-only tools from write tools.</li>
            <li>Break write tools into narrow actions such as draft creation, internal note creation, or approval preparation.</li>
            <li>Treat MCP first as a trust boundary, not just a convenience layer.</li>
            <li>Relax approvals only for clearly low-risk tools, not for everything at once.</li>
          </ol>
          <p>In practice, this is often what separates stable agent systems from noisy ones. Similar models can behave very differently depending on how wide their tool surface is and how carefully approval paths are designed.</p>

          <h3>The third decision is to split real-time interaction from long-running work</h3>
          <p>Google’s March 26, 2026 announcement for Gemini 3.1 Flash Live puts low-latency voice and vision agents front and center. But Google’s Interactions API also emphasizes background execution for long-running inference loops. That combination is the important signal: platforms are increasingly treating real-time interaction and long-horizon agent work as different operational lanes.</p>
          <p>Your product should usually do the same.</p>
          <ul>
            <li>Voice copilots and live assistants belong in a real-time path where latency is part of product quality.</li>
            <li>Research, multi-step document synthesis, approval-driven operations, and deep tool chains belong in asynchronous or background paths.</li>
            <li>Forcing both patterns into one agent loop usually makes latency, cost, and failure handling worse.</li>
          </ul>
          <p>So “one agent” does not need to mean one architecture. More often, it means several execution lanes presented as one product experience.</p>

          <h3>If you want to apply this now, define these five things first</h3>
          <p>Before tuning prompts or debating providers, write down five decisions.</p>
          <ol>
            <li><strong>State owner</strong>: does state live in the platform or in your own application?</li>
            <li><strong>Tool table</strong>: which tools are read-only, low-risk write, or high-risk write?</li>
            <li><strong>Execution lane</strong>: which tasks are real-time, synchronous, asynchronous, or long-running?</li>
            <li><strong>Audit payload</strong>: what context, tool calls, approvals, and outputs must be logged?</li>
            <li><strong>Failure policy</strong>: where does the system stop when confidence is low, tools fail, or approval is missing?</li>
          </ol>
          <p>Once these are clear, changing the underlying model becomes much easier. If they are unclear, even a stronger model rarely fixes the operational mess.</p>

          <h3>The winning systems now are not just smarter. They are better cut.</h3>
          <p>All three major platforms are expanding context, tools, and agent capabilities. But the more important shift is that they are increasingly explaining how those capabilities should be organized inside systems, not just how powerful the models are in isolation.</p>
          <p>That is why the best near-term advantage in agent design is often not raw intelligence. It is cleaner state ownership, narrower tool boundaries, better approval gates, and a more deliberate split between live and background work.</p>
          <p>Right now, a well-bounded agent usually beats a loosely designed one faster than a slightly stronger model does.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://developers.openai.com/api/docs/guides/conversation-state" target="_blank" rel="noreferrer">OpenAI API Docs: Conversation state</a></li>
            <li><a href="https://developers.openai.com/api/docs/guides/tools-connectors-mcp" target="_blank" rel="noreferrer">OpenAI API Docs: MCP and Connectors</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/working-with-messages" target="_blank" rel="noreferrer">Anthropic Docs: Working with Messages</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" target="_blank" rel="noreferrer">Anthropic Docs: Tool use with Claude</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api/" target="_blank" rel="noreferrer">Google: Interactions API</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tooling-updates/" target="_blank" rel="noreferrer">Google: Gemini API tooling updates</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-3-1-flash-live/" target="_blank" rel="noreferrer">Google: Gemini 3.1 Flash Live</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'なぜ今のAIエージェント設計では、モデル性能より状態管理とツール境界が重要なのか',
        keywords: ['AI'],
        excerpt: '最近の公式資料を読むと、AIエージェントの競争軸はモデル順位そのものより、状態の持ち方、ツール実行の位置、承認境界へと移りつつあります。',
        heroImage: {
          alt: '状態タイムライン、承認ゲート、ツール呼び出しカードが表示されたAIエージェントのワークフローダッシュボードを開発者が見ている様子',
          caption: 'いまのAIエージェント設計では、モデル単体の賢さより、状態をどこに置き、ツールをどう制限するかが大きな差になります。',
        },
        contentHtml: `
          <p>少し前まで、AIプロダクトの競争はモデル比較で決まるように見えていました。どのモデルがより賢いか、どれが安いか、どれが長い文脈を読めるかです。</p>
          <p>ですが、OpenAI、Anthropic、Googleの最近の公式資料を並べて読むと、別の流れがはっきり見えてきます。いま重要なのは、<strong>誰が状態を持つのか</strong>、<strong>ツールがどこで実行されるのか</strong>、<strong>人の承認をどこで入れるのか</strong>です。</p>
          <p>これは実装の細部ではありません。信頼性、監査性、コスト制御、失敗時の扱いまでまとめて左右する、システム設計そのものの話です。</p>

          <h3>モデル比較だけでは、今の変化を説明しきれない</h3>
          <p>OpenAIは現在のドキュメントで、Responses APIとConversations APIを通じたstatefulな流れを前面に出しています。Anthropicは逆に、Messages APIがstatelessであり、毎ターン必要な履歴をアプリケーション側が渡すべきだと明確にしています。Googleは2025年12月にInteractions APIを紹介し、server-side state、background execution、remote MCP supportを現代的なagentic applicationの中心機能として扱いました。</p>
          <blockquote>各社が同じ形を取っているわけではありません。ただし共通して、「エージェントはモデル単体ではなく、状態・ツール・承認を含むシステムとして設計すべきだ」という方向を示しているのは確かです。</blockquote>
          <p>そのため、ベンチマーク順位は依然として重要でも、最初の設計判断ではなくなりつつあります。</p>

          <h3>最初の設計判断は、状態を誰が持つかです</h3>
          <p>ここでチームの設計思想がかなり分かれます。OpenAIの現在の案内では、会話状態を長く生きる会話オブジェクトとして維持しやすくなっています。AnthropicはMessages APIをstatelessとして扱い、必要な履歴を毎回アプリ側が組み立てる前提です。GoogleのInteractions APIは、optional server-side stateを複雑な文脈管理を減らす機能として打ち出しています。</p>
          <p>重要なのは、どちらが普遍的に正しいかではなく、自分のプロダクトに合う責任分担を先に決めることです。</p>
          <ul>
            <li>監査や再現性が最優先なら、アプリ側で状態を管理するほうが読みやすいことが多いです。</li>
            <li>長いセッション、複数デバイス、途中再開が重要なら、statefulな仕組みが実装負荷を大きく下げます。</li>
            <li>承認、停止、再開、再試行が多い業務ほど、先に状態戦略を決めてからモデルを入れるべきです。</li>
          </ul>
          <p>先にチャット画面だけを作ってしまうと、あとから承認履歴やツール結果、再開用の文脈をどこに置くのかで苦しくなります。</p>

          <h3>次の設計判断は、ツールがどこで動き、誰が承認するかです</h3>
          <p>Anthropicのtool use文書は、client toolsとserver toolsをはっきり分けています。アプリ側で実行するツールもあれば、Anthropic側で実行されるツールもあります。OpenAIのMCP and Connectors文書でも、remote MCP serverやconnectorは使える一方で、データ共有前にapprovalが求められるのが基本です。Googleも2026年3月のtooling updatesで、built-in toolsとcustom functionsを同じリクエストで扱い、tool call間でcontextを循環させる流れを前に出しました。</p>
          <p>つまり本当の問いは「ツールを呼べるか」ではありません。「どのツールを、どの信頼レベルで開くか」です。</p>
          <ol>
            <li>読み取り専用ツールと書き込みツールを分ける</li>
            <li>書き込みツールは下書き作成や内部メモ保存のように細かく分ける</li>
            <li>MCPは便利機能ではなく、まず信頼境界として扱う</li>
            <li>承認を外すのは低リスクツールの一部から始める</li>
          </ol>
          <p>似たモデルを使っていても、安定するチームと不安定なチームが分かれるのは、ここでツール表面をどれだけきれいに切れているかの差が大きいと感じます。</p>

          <h3>リアルタイム対話と長期処理は分けて考えたほうがいい</h3>
          <p>Googleは2026年3月26日にGemini 3.1 Flash Liveを出し、low-latencyな音声・視覚エージェントを前面に出しました。一方でInteractions APIではbackground executionを別の中心機能として説明しています。これは、リアルタイム対話と長く走るエージェント処理を同じ問題として見ないほうがいい、という強いサインです。</p>
          <p>サービス設計でも同じです。</p>
          <ul>
            <li>音声アシスタントやライブ支援のように遅延そのものが品質になる仕事は、専用のリアルタイム経路に置く</li>
            <li>調査、長文要約、承認待ち、多段ツール呼び出しは、非同期やバックグラウンド経路に置く</li>
            <li>両方をひとつのエージェントループに押し込むと、遅延もコストも失敗処理も悪化しやすい</li>
          </ul>
          <p>つまり「エージェントが一つ」という言葉は、「アーキテクチャも一つ」である必要はないということです。</p>

          <h3>すぐ適用するなら、まずこの五つを決める</h3>
          <p>プロンプト改善やモデル比較の前に、次の五つを文書化すると設計がかなり安定します。</p>
          <ol>
            <li><strong>State owner</strong>: 状態はプラットフォームに持たせるのか、自前アプリに持たせるのか</li>
            <li><strong>Tool table</strong>: 読み取り専用、低リスク書き込み、高リスク書き込みをどう分けるか</li>
            <li><strong>Execution lane</strong>: リアルタイム、同期、非同期、長期処理をどう分けるか</li>
            <li><strong>Audit payload</strong>: 入力、根拠、ツール呼び出し、承認、最終出力のどこまでを残すか</li>
            <li><strong>Failure policy</strong>: 低信頼、ツール失敗、承認待ちのときにどこで止まるか</li>
          </ol>
          <p>これが決まっていれば、後からモデルを入れ替えるのは比較的簡単です。逆にここが曖昧だと、より強いモデルを入れても運用は安定しません。</p>

          <h3>今勝つのは、より賢いモデルだけではなく、よりきれいに切られたエージェントです</h3>
          <p>各社とも文脈長やツール能力を広げています。ただ本当に重要なのは、その能力をシステムの中でどう整理するかまで説明し始めていることです。</p>
          <p>だから今のAIエージェント設計で効いてくる差は、純粋なモデル知能だけではありません。状態の持ち方、ツール境界、承認ゲート、リアルタイム経路とバックグラウンド経路の分け方です。</p>
          <p>いまは少し強いモデル一つより、よく切られた状態とツール境界を持つエージェントのほうが、先に勝ちやすいと感じます。</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://developers.openai.com/api/docs/guides/conversation-state" target="_blank" rel="noreferrer">OpenAI API Docs: Conversation state</a></li>
            <li><a href="https://developers.openai.com/api/docs/guides/tools-connectors-mcp" target="_blank" rel="noreferrer">OpenAI API Docs: MCP and Connectors</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/working-with-messages" target="_blank" rel="noreferrer">Anthropic Docs: Working with Messages</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview" target="_blank" rel="noreferrer">Anthropic Docs: Tool use with Claude</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/interactions-api/" target="_blank" rel="noreferrer">Google: Interactions API</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/gemini-api-tooling-updates/" target="_blank" rel="noreferrer">Google: Gemini API tooling updates</a></li>
            <li><a href="https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-3-1-flash-live/" target="_blank" rel="noreferrer">Google: Gemini 3.1 Flash Live</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'practical-way-to-automate-internal-services-with-claude-opus',
    category: 'ai',
    createdAt: '2026-04-02T19:35:00+09:00',
    heroImage: {
      src: '/blog/claude-opus-internal-automation-hero-generated.webp',
    },
    locales: {
      ko: {
        title: 'Claude Opus로 내부 서비스 자동화를 붙이는 가장 현실적인 방법',
        keywords: ['AI'],
        excerpt: '사내 자동화는 챗봇 하나를 붙이는 일보다, 되돌릴 수 있는 업무를 좁게 잡고 Claude Opus를 판단 엔진으로 쓰는 쪽이 훨씬 빨리 성과가 납니다.',
        heroImage: {
          alt: '운영 담당자가 티켓 큐와 문서 요약, 승인 체크리스트가 보이는 내부 자동화 대시보드를 검토하는 장면',
          caption: 'Claude Opus 자동화는 채팅창보다, 내부 도구와 승인 흐름을 묶은 운영 화면으로 볼 때 더 정확해집니다.',
        },
        contentHtml: `
          <p>사내 서비스 자동화를 처음 붙일 때 많은 팀이 채팅창부터 만듭니다. 하지만 실제로는 답변형 UI보다, 하나의 업무를 끝까지 끊김 없이 처리하는 작은 운영 루프를 먼저 만드는 편이 훨씬 덜 흔들립니다.</p>
          <p>2026년 4월 2일 기준 Anthropic 공식 문서는 복잡한 도구 호출과 애매한 질의에 최신 Claude Opus 4.6을 권합니다. 이 말은 곧 Claude Opus를 “대답 잘하는 모델”보다 <strong>판단과 조정의 중심</strong>으로 써야 한다는 뜻에 가깝습니다.</p>
          <p>그래서 이 글은 데모보다 운영을 기준으로 씁니다. 어떤 업무부터 고를지, 시스템을 어떻게 자를지, 도구 스키마는 어떻게 만들지, 어디서 사람 승인을 걸지, 그리고 보안 경계는 어떻게 그을지까지 바로 적용할 수 있게 정리해 보겠습니다.</p>

          <h3>어떤 업무부터 붙여야 실패가 덜할까</h3>
          <p>첫 자동화 대상은 “정답을 내는 일”보다 “실수를 빨리 되돌릴 수 있는 일”이어야 합니다. Claude Opus가 아무리 강해도, 조직이 처음부터 돌이킬 수 없는 권한을 모델에 넘기면 운영이 금방 경직됩니다.</p>
          <blockquote>처음 자동화할 일은 고난도 판단 업무가 아니라, 맥락은 복잡하지만 결과를 검토하고 되돌리기 쉬운 업무여야 합니다.</blockquote>
          <p>바로 붙이기 좋은 예시는 대체로 이런 쪽입니다.</p>
          <ul>
            <li>사내 운영 요청을 읽고 적절한 큐로 분류하기</li>
            <li>Slack, 이메일, 폼으로 들어온 문의를 표준 티켓 초안으로 바꾸기</li>
            <li>긴 운영 문서나 장애 보고를 읽고 요약 메모와 후속 조치 목록 만들기</li>
            <li>내부 FAQ 응답 초안을 작성하고 누락 정보만 다시 묻기</li>
            <li>결재 전 검토 메모, 리스크 체크리스트, 승인 포인트 정리하기</li>
          </ul>
          <p>반대로 처음부터 피하는 편이 나은 업무도 분명합니다.</p>
          <ul>
            <li>모델 출력이 곧바로 외부 고객이나 파트너에게 발송되는 업무</li>
            <li>재무 이체, 계정 권한 변경, 계약 상태 변경처럼 되돌리기 어려운 작업</li>
            <li>근로평가, 징계, 민감한 HR 판단처럼 설명 책임이 큰 의사결정</li>
            <li>원문 근거를 보존하지 않으면 안 되는 법무·감사 업무</li>
          </ul>

          <h3>권장 아키텍처는 챗봇이 아니라 얇은 운영 파이프라인이다</h3>
          <p>실무에서는 Claude Opus를 화면 한가운데 두기보다, 아래와 같은 파이프라인 안의 한 단계로 두는 편이 훨씬 안정적입니다.</p>
          <ol>
            <li>요청 수집: Slack, 이메일, 폼, 사내 포털에서 요청을 받습니다.</li>
            <li>사전 필터: 포맷 오류, 민감정보, 금칙 패턴, 프롬프트 인젝션 징후를 먼저 걸러냅니다.</li>
            <li>문맥 수집: 관련 문서, 정책, 과거 티켓, 사용자 속성을 필요한 범위만 좁혀서 붙입니다.</li>
            <li>Claude Opus 판단: 분류, 요약, 누락 정보, 다음 행동, 승인 필요 여부를 결정하게 합니다.</li>
            <li>도구 호출: 티켓 생성, 초안 저장, 내부 코멘트 작성처럼 좁은 스키마의 도구만 호출합니다.</li>
            <li>승인 및 실행: 사람 검토가 필요한 경우 멈추고, 승인 후에만 쓰기 작업을 실행합니다.</li>
            <li>감사 로그: 입력, 근거 문서, 모델 판단, 승인자, 최종 실행 결과를 남깁니다.</li>
          </ol>
          <p>Anthropic 문서가 도구 설명과 스키마를 자세히 쓰라고 강조하는 이유도 여기 있습니다. 자동화는 결국 “모델이 무엇을 읽고 무엇을 호출할 수 있는가”를 잘 자르는 문제이기 때문입니다.</p>
          <p>실제로는 Claude Opus를 한 번만 부르는 구조보다, <strong>가볍게 걸러내는 단계</strong>와 <strong>깊게 판단하는 단계</strong>를 분리하는 편이 좋습니다. Anthropic의 가드레일 문서도 유해성 스크린이나 입력 검증에는 Claude Haiku 4.5 같은 경량 모델을 앞단에 둘 수 있다고 안내합니다. 비용과 지연을 줄이려면 이 분리가 꽤 중요합니다.</p>

          <h3>API 세팅은 서버에서 시작해야 한다</h3>
          <p>여기서부터가 많은 분들이 막히는 지점입니다. Anthropic Console에서 API 키를 만든 다음, 그 키는 반드시 서버 환경변수로만 보관합니다. 프런트엔드에 넣는 순간 보안 설계가 무너집니다.</p>
          <p>특히 Vite에서는 <code>VITE_</code>로 시작하는 환경변수가 브라우저 번들에 포함됩니다. 따라서 <code>VITE_ANTHROPIC_API_KEY</code> 같은 이름은 쓰면 안 됩니다. 안전한 구조는 항상 “브라우저 → 내 서버 → Anthropic API”입니다.</p>
          <p>현재 프로젝트가 정적 사이트라면 더더욱 그렇습니다. 브라우저에서 Claude를 직접 부르지 말고, 작은 Node 서버나 서버리스 함수 하나를 두고 그 뒤에서만 Anthropic SDK를 호출해야 합니다.</p>
          <p>처음에는 아래 네 단계만 따라가면 됩니다.</p>
          <ol>
            <li>Anthropic Console에서 API 키를 발급합니다.</li>
            <li>백엔드나 서버리스 함수 실행 환경에 <code>ANTHROPIC_API_KEY</code>를 저장합니다.</li>
            <li><code>/api/internal-triage</code> 같은 내부 엔드포인트를 하나 만듭니다.</li>
            <li>브라우저나 사내 화면은 Anthropic이 아니라 그 엔드포인트만 호출합니다.</li>
          </ol>
          <p>Node 기준 최소 예시는 아래 정도면 충분합니다.</p>
          <pre><code>npm install @anthropic-ai/sdk express dotenv</code></pre>
          <pre><code>ANTHROPIC_API_KEY=your_api_key_here
PORT=3001</code></pre>
          <pre><code>import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/internal-triage', async (req, res) => {
  const { requestText, requester } = req.body ?? {};

  if (!requestText || !requestText.trim()) {
    return res.status(400).json({ error: 'requestText is required' });
  }

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 800,
    system: 'You classify internal support requests and respond with JSON only.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text:
              'requester: ' +
              (requester ?? 'unknown') +
              '\nrequest: ' +
              requestText,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');

  res.json({
    model: message.model,
    result: textBlock?.text ?? '',
  });
});

app.listen(process.env.PORT ?? 3001);</code></pre>
          <p>이 코드는 완성형 자동화가 아니라 <strong>첫 연결 확인용 스모크 테스트</strong>입니다. 먼저 이 단계에서 서버가 정상 응답하는지 확인한 뒤, 그다음에 앞 절에서 설명한 JSON 출력 계약과 도구 호출을 붙이는 편이 안전합니다.</p>
          <pre><code>curl http://localhost:3001/api/internal-triage \
  -H "Content-Type: application/json" \
  -d '{"requestText":"노트북 교체 요청입니다. 자산번호는 아직 없습니다.","requester":"minji@company.com"}'</code></pre>
          <p>응답이 오면 프런트엔드는 Anthropic SDK를 직접 쓰지 말고, 자기 서버만 호출하면 됩니다. 예를 들어 사내 포털이나 Vite 화면에서는 아래처럼 붙입니다.</p>
          <pre><code>const response = await fetch('/api/internal-triage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    requestText,
    requester: currentUser.email,
  }),
});

const data = await response.json();</code></pre>
          <p>핵심은 세 가지입니다. 키는 서버에만 둡니다. 첫 호출은 좁은 엔드포인트 하나로 검증합니다. 모델이 어떤 구조로 답해야 하는지는 서버에서 검증 가능한 계약으로 고정합니다.</p>

          <h3>바로 쓸 수 있는 최소 구현 예시는 이렇게 잡으면 된다</h3>
          <p>예를 들어 운영팀 지원 요청 자동화를 만든다고 가정해 보겠습니다. 사용자는 자유롭게 요청을 쓰고, 모델은 그 글을 읽어 적절한 큐와 우선순위, 요약, 누락 정보, 사람 승인 필요 여부를 뽑습니다. 이때 핵심은 프롬프트를 멋지게 쓰는 일이 아니라, <strong>최종 산출물의 모양을 먼저 고정</strong>하는 일입니다.</p>
          <p>Anthropic의 Messages API는 상태를 서버가 기억해 주는 방식이 아니라 매 호출마다 전체 대화 맥락을 보내는 stateless 구조입니다. 그래서 워크플로 상태는 애플리케이션이 직접 관리하고, 모델에는 현재 단계에 필요한 정보만 넣는 편이 좋습니다.</p>
          <p>저라면 첫 버전을 아래 정도로 자릅니다.</p>
          <pre><code>{
  "queue": "it_support | finance_ops | people_ops",
  "priority": "low | normal | high",
  "summary": "한두 문장 요약",
  "missing_fields": ["asset_id", "cost_center"],
  "needs_human_approval": true,
  "reason": "왜 이 큐와 우선순위로 판단했는지"
}</code></pre>
          <p>이 구조가 좋은 이유는 세 가지입니다. 첫째, 사람이 검토하기 쉽습니다. 둘째, 나중에 평가셋을 만들기 쉽습니다. 셋째, 실제 실행 도구와 느슨하게 연결할 수 있습니다. 예를 들어 <code>queue</code>가 맞고 <code>missing_fields</code>가 비어 있을 때만 티켓 초안을 생성하게 만들 수 있습니다.</p>
          <p>모델이 실제로 호출할 도구도 크면 안 됩니다. “Jira에 알아서 등록” 같은 도구보다, 아래처럼 좁은 스키마로 하나씩 끊는 편이 훨씬 안전합니다.</p>
          <pre><code>{
  "name": "create_ticket_draft",
  "description": "Create an internal ticket draft only after the request has been classified and summarized. Never send externally. Use this for draft creation only.",
  "strict": true,
  "input_schema": {
    "type": "object",
    "properties": {
      "queue": { "type": "string", "enum": ["it_support", "finance_ops", "people_ops"] },
      "priority": { "type": "string", "enum": ["low", "normal", "high"] },
      "summary": { "type": "string" },
      "requester": { "type": "string" },
      "needs_human_approval": { "type": "boolean" }
    },
    "required": ["queue", "priority", "summary", "requester", "needs_human_approval"],
    "additionalProperties": false
  }
}</code></pre>
          <p>이렇게 해두면 모델이 잘못된 필드를 상상해 넣을 여지가 크게 줄어듭니다. 구조화된 출력이나 strict tool use는 사내 자동화에서 생각보다 큰 차이를 만듭니다. 자유 텍스트를 파싱해 후처리하는 구조는 첫 데모는 빨라도 운영 안정성이 급격히 떨어집니다.</p>

          <h3>프롬프트는 길게 쓰는 것보다 경계를 선명하게 쓰는 편이 낫다</h3>
          <p>Claude Opus는 맥락을 길게 읽을 수 있지만, 자동화 품질은 긴 프롬프트보다 <strong>잘린 경계</strong>에서 더 많이 나옵니다. Anthropic의 프롬프트 가이드도 명확하고 직접적인 지시, 예시 제공, XML 태그, 자기 점검 요청을 권합니다.</p>
          <p>실무에서는 보통 아래 다섯 줄만 명확해도 많이 안정됩니다.</p>
          <ul>
            <li>너의 역할: 분류기인지, 요약기인지, 승인 보조자인지</li>
            <li>읽을 수 있는 데이터: 어떤 문서와 필드를 보아도 되는지</li>
            <li>할 수 있는 일: 어떤 도구를 어떤 조건에서 호출할 수 있는지</li>
            <li>하면 안 되는 일: 외부 발송, 권한 변경, 재무 반영 같은 금지 행동</li>
            <li>멈춰야 하는 조건: 누락 정보, 정책 충돌, 낮은 확신, 민감한 요청</li>
          </ul>
          <p>프롬프트 말미에는 “끝내기 전에 정책 기준과 필수 필드 충족 여부를 스스로 확인하라” 같은 자기 점검 문장을 꼭 넣는 편이 좋습니다. Anthropic 문서도 self-check가 코딩과 복잡한 판단에서 오류를 안정적으로 줄인다고 설명합니다.</p>

          <h3>보안은 Files API와 MCP를 쓰기 전에 먼저 정리해야 한다</h3>
          <p>여기서부터가 진짜 운영 차이입니다. Anthropic 문서를 보면 Messages API는 Zero Data Retention 계약이 있는 조직에서 ZDR 대상이 될 수 있습니다. 반면, Files API는 문서를 반복 업로드하지 않게 해 주는 대신 베타 기능이고 ZDR 대상이 아닙니다. 파일은 워크스페이스 범위로 공유되고, 직접 삭제하기 전까지 남습니다.</p>
          <p>또 Files API는 현재 파일당 최대 500MB, 조직당 총 100GB까지 저장할 수 있습니다. 이 말은 곧 편하다고 해서 HR 문서, 계약서, 재무 원장, 환자정보 같은 민감 자료를 무심코 올리면 안 된다는 뜻입니다. 내부 자동화 1차 버전에서는 민감 원문 전체를 업로드하기보다, 사내 백엔드에서 필요한 필드만 요약해 Claude Opus에 넘기는 방식이 더 안전합니다.</p>
          <p>MCP connector도 비슷합니다. Anthropic 문서 기준으로 이 기능은 원격 MCP 서버를 Messages API에 직접 연결해 주지만 베타이고 ZDR 대상이 아닙니다. 그래서 첫 내부 자동화에서 곧바로 원격 MCP를 열기보다, 애플리케이션 서버 안에서 직접 도구를 호출하고 Claude에는 <strong>좁은 클라이언트 도구 표면</strong>만 보여주는 편이 더 감사하기 쉽습니다.</p>
          <p>길고 반복적인 정책 문서를 계속 넣어야 한다면 prompt caching도 실무적으로 유용합니다. 최근 문서 기준으로 캐시는 KV cache와 해시를 저장하고 원문 텍스트를 그대로 저장하지 않으며, 기본 수명은 5분짜리 ephemeral입니다. 다만 Opus 4.6과 Opus 4.5에서는 캐시 가능한 최소 길이가 4096 토큰이므로, 짧은 프롬프트에는 굳이 억지로 붙일 필요가 없습니다.</p>
          <ul>
            <li>민감한 내부 데이터는 기본적으로 직접 압축해 전달합니다.</li>
            <li>베타 기능은 편의보다 보안 검토를 먼저 통과시킵니다.</li>
            <li>웹 검색, 웹 페치, 코드 실행 같은 서버 도구는 공개 자료 처리와 내부 자료 처리를 분리해서 씁니다.</li>
            <li>모델에게는 원문 전체보다 필요한 사실과 근거만 넘깁니다.</li>
          </ul>

          <h3>사람 승인은 어디에 두는가가 자동화 품질을 결정한다</h3>
          <p>자동화가 잘 붙는 팀은 모델에게 모든 권한을 주지 않습니다. 대신 모델이 멈춰야 하는 지점을 아주 분명하게 둡니다. Anthropic 문서도 파괴적이거나 되돌리기 어려운 행동에는 명시적 확인을 두는 쪽을 권합니다.</p>
          <p>사내 서비스 자동화에서는 보통 아래 구분이 실용적입니다.</p>
          <ul>
            <li>자동 허용: 분류, 태깅, 요약, 초안 생성, 내부 메모 작성</li>
            <li>조건부 허용: 티켓 초안 생성, 우선순위 제안, 담당자 추천</li>
            <li>반드시 승인: 외부 발송, 데이터 수정, 비용 반영, 권한 변경, 고객 커뮤니케이션</li>
          </ul>
          <p>여기서 중요한 것은 승인 UI도 모델 친화적으로 만드는 일입니다. 단순히 “승인/반려” 버튼만 두기보다, 모델이 본 근거와 누락 정보, 예상 영향, 실행될 도구 목록을 함께 보여줘야 검토 시간이 짧아집니다. 사람이 빨리 읽고 판단할 수 없으면 자동화는 결국 병목을 옮긴 것밖에 되지 않습니다.</p>

          <h3>롤아웃은 20건 데모보다 300건 평가셋이 낫다</h3>
          <p>Anthropic의 평가 가이드에서 특히 좋은 부분은 성공 기준을 한 가지로 잡지 말라는 대목입니다. 내부 자동화라면 최소한 정확도만 볼 수 없습니다. 업무 적합도, 개인정보 보존, 지연시간, 비용, 사람 검토 시간까지 같이 봐야 합니다.</p>
          <p>처음 붙일 때는 실제 요청 200건에서 500건 정도를 모아서 평가셋으로 만드는 편이 좋습니다. 문서에도 자동화 가능한 평가에서는 적은 수의 고급 수작업 채점보다, 더 많은 케이스를 자동 채점하는 편이 낫다고 나와 있습니다.</p>
          <p>제가 먼저 볼 지표는 보통 이렇습니다.</p>
          <ul>
            <li>정확한 큐 분류율</li>
            <li>누락 필드 탐지 재현율</li>
            <li>사람 승인 필요 여부 판단 정확도</li>
            <li>잘못된 자동 실행 비율</li>
            <li>평균 검토 시간과 평균 처리 시간</li>
            <li>요청 1건당 토큰 비용</li>
          </ul>
          <p>오프라인 백로그 처리처럼 실시간이 아닌 작업은 Message Batches API를 검토할 수도 있습니다. 다만 이 역시 ZDR 대상이 아니라는 점을 기억해야 합니다. 보안 요구가 높은 조직이라면 실시간 Messages API 기반의 짧은 루프가 오히려 운영상 더 편할 수 있습니다.</p>

          <h3>실무에서 잘 먹히는 운영 팁은 의외로 단순하다</h3>
          <p>마지막으로, 실제 붙여 보면 금방 체감되는 팁만 추리면 이 정도입니다.</p>
          <ul>
            <li>Claude Opus는 파서보다 심사관에 가깝게 씁니다. OCR, 단순 정규화, 거친 전처리는 더 싼 계층에 둡니다.</li>
            <li>도구 이름은 동사 중심으로 짧게 짓고, 입력 스키마는 가능한 한 좁게 유지합니다.</li>
            <li>사내 백엔드가 이미 아는 정보는 다시 모델에게 묻지 않습니다. 사용자 부서, 권한, 비용센터 같은 값은 서버가 채웁니다.</li>
            <li>모델이 읽는 문맥은 “관련 있는 최소한”으로 줄입니다. 데이터베이스 덤프 전체를 넘기면 오히려 흔들립니다.</li>
            <li>첫 워크플로는 한 팀, 한 큐, 한 승인자 구조로 시작합니다. 성공 범위를 넓히는 일은 두 번째입니다.</li>
          </ul>
          <p>Claude Opus로 내부 서비스를 자동화한다는 말은 결국 사람의 판단을 통째로 치우는 일이 아닙니다. 사람이 정말 판단해야 할 순간만 더 또렷하게 남기고, 그 앞뒤의 마찰을 걷어내는 쪽에 가깝습니다. 그 순서를 지키면 첫 자동화는 생각보다 빨리 붙고, 그다음부터는 확장할 근거도 훨씬 분명해집니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://platform.claude.com/docs/en/get-started" target="_blank" rel="noreferrer">Anthropic Docs: Get started with Claude</a></li>
            <li><a href="https://platform.claude.com/docs/en/api/typescript/messages/create" target="_blank" rel="noreferrer">Anthropic Docs: Create a Message (TypeScript)</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" target="_blank" rel="noreferrer">Anthropic Docs: Define tools</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/working-with-messages" target="_blank" rel="noreferrer">Anthropic Docs: Using the Messages API</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/files" target="_blank" rel="noreferrer">Anthropic Docs: Files API</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/mcp-connector" target="_blank" rel="noreferrer">Anthropic Docs: MCP connector</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching" target="_blank" rel="noreferrer">Anthropic Docs: Prompt caching</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noreferrer">Anthropic Docs: Prompting best practices</a></li>
            <li><a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks" target="_blank" rel="noreferrer">Anthropic Docs: Mitigate jailbreaks and prompt injections</a></li>
            <li><a href="https://platform.claude.com/docs/en/test-and-evaluate/develop-tests" target="_blank" rel="noreferrer">Anthropic Docs: Define success criteria and build evaluations</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/zero-data-retention" target="_blank" rel="noreferrer">Anthropic Docs: Zero Data Retention</a></li>
          </ul>
        `,
      },
      en: {
        title: 'The Most Practical Way to Automate Internal Services with Claude Opus',
        keywords: ['AI'],
        excerpt: 'Internal automation works better when Claude Opus is treated as a judgment engine inside a narrow workflow, not as a free-form chatbot sitting on top of every internal system.',
        heroImage: {
          alt: 'An operations lead reviewing an internal automation dashboard with a ticket queue, document summary, and approval checklist',
          caption: 'Claude Opus becomes more useful in internal operations when it sits inside a tool-and-approval workflow rather than a generic chat interface.',
        },
        contentHtml: `
          <p>When teams first try internal automation, they often start by building a chat interface. In practice, the faster win usually comes from a much smaller move: pick one reversible workflow, keep the boundaries tight, and let Claude Opus handle judgment inside that loop.</p>
          <p>As of April 2, 2026, Anthropic’s official tool-use documentation recommends the latest Claude Opus 4.6 for complex tools and ambiguous queries. That makes Claude Opus a strong fit not for “chatting with internal systems,” but for deciding what should happen next inside a controlled service workflow.</p>
          <p>That is the lens that matters for real rollout. The useful questions are not only prompt quality or model intelligence. They are which jobs to automate first, what the output contract should be, where human approval belongs, and how retention and tool boundaries should be handled.</p>

          <h3>Start with work that is reversible, structured, and annoying</h3>
          <p>The first internal workflow should not be the most strategic one. It should be the one that creates friction every day but can still be reviewed and corrected easily.</p>
          <blockquote>The safest first automation target is not a final decision. It is a bounded operational judgment that a human can inspect quickly and reverse safely.</blockquote>
          <p>That usually means tasks like these.</p>
          <ul>
            <li>Routing internal requests into the right queue</li>
            <li>Turning Slack, email, or form submissions into ticket drafts</li>
            <li>Summarizing long incident notes or policy documents into action items</li>
            <li>Drafting responses for internal FAQ or operations support</li>
            <li>Preparing review memos before a human approval step</li>
          </ul>
          <p>It usually does not mean direct external communication, irreversible financial actions, permission changes, or sensitive people decisions on day one.</p>

          <h3>The right architecture is a thin operations pipeline</h3>
          <p>The stable pattern is rarely “user asks the model, then the model does everything.” A better pattern is a narrow pipeline.</p>
          <ol>
            <li>Collect the request from Slack, email, forms, or an internal portal.</li>
            <li>Run a lightweight pre-screen for malformed input, prompt-injection signs, and policy violations.</li>
            <li>Retrieve only the policy, history, and user context needed for this step.</li>
            <li>Ask Claude Opus to classify, summarize, identify missing fields, and decide whether approval is required.</li>
            <li>Expose only narrow write tools such as draft creation or internal note creation.</li>
            <li>Pause at approval gates before any irreversible action.</li>
            <li>Store an audit trail of context, decision, human approver, and final execution.</li>
          </ol>
          <p>Anthropic’s own guidance on tool definitions points in this direction. Tool descriptions and schemas are not documentation fluff. They are part of the control surface.</p>
          <p>It is also worth splitting cheap filtering from deep reasoning. Anthropic’s jailbreak guidance explicitly notes that a lightweight model such as Claude Haiku 4.5 can be used for screens and validation before a stronger model takes over.</p>

          <h3>API setup should begin on the server, not in the browser</h3>
          <p>This is the part many teams skip too quickly. After creating an API key in Anthropic Console, store it only as a server-side environment variable. The moment it lands in frontend code, the security model is already broken.</p>
          <p>This matters even more in Vite. Variables prefixed with <code>VITE_</code> are exposed to the browser bundle, so <code>VITE_ANTHROPIC_API_KEY</code> is exactly what you should not create. The safe shape is always “browser → your server → Anthropic API.”</p>
          <p>If your current product is only a static frontend, that does not change the rule. Add a small Node service or a serverless function and call Anthropic only there.</p>
          <p>The first setup path can stay very small.</p>
          <ol>
            <li>Create an API key in Anthropic Console.</li>
            <li>Store it as <code>ANTHROPIC_API_KEY</code> in your backend or serverless runtime.</li>
            <li>Create one narrow endpoint such as <code>/api/internal-triage</code>.</li>
            <li>Point the browser UI only at that endpoint, never at Anthropic directly.</li>
          </ol>
          <p>A minimal Node example is enough for the first smoke test.</p>
          <pre><code>npm install @anthropic-ai/sdk express dotenv</code></pre>
          <pre><code>ANTHROPIC_API_KEY=your_api_key_here
PORT=3001</code></pre>
          <pre><code>import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/internal-triage', async (req, res) => {
  const { requestText, requester } = req.body ?? {};

  if (!requestText || !requestText.trim()) {
    return res.status(400).json({ error: 'requestText is required' });
  }

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 800,
    system: 'You classify internal support requests and respond with JSON only.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text:
              'requester: ' +
              (requester ?? 'unknown') +
              '\nrequest: ' +
              requestText,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');

  res.json({
    model: message.model,
    result: textBlock?.text ?? '',
  });
});

app.listen(process.env.PORT ?? 3001);</code></pre>
          <p>This is not the final workflow. It is the first connectivity check. Once this route responds safely, replace the free-form <code>result</code> with the structured contract from the next section and then add tool calls and approval gates.</p>
          <pre><code>curl http://localhost:3001/api/internal-triage \
  -H "Content-Type: application/json" \
  -d '{"requestText":"I need a laptop replacement. I do not have the asset number yet.","requester":"minji@company.com"}'</code></pre>
          <p>On the frontend, keep the browser dumb. It should call your server, not Anthropic.</p>
          <pre><code>const response = await fetch('/api/internal-triage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    requestText,
    requester: currentUser.email,
  }),
});

const data = await response.json();</code></pre>
          <p>The practical rule is simple: keep the key on the server, prove the first request with one narrow endpoint, and make the response shape something your backend can validate.</p>

          <h3>Define the output contract before you write the prompt</h3>
          <p>Suppose the workflow is internal support intake. The user writes freely. Claude Opus reads the request and returns the queue, priority, summary, missing fields, and whether human approval is required. That output shape should be fixed before you start tuning prompts.</p>
          <p>The Messages API is stateless, so your application should own the workflow state and only send the model what the current step actually needs. In production, that keeps the system more inspectable and easier to recover.</p>
          <p>A minimal first response object might look like this.</p>
          <pre><code>{
  "queue": "it_support | finance_ops | people_ops",
  "priority": "low | normal | high",
  "summary": "one or two sentence summary",
  "missing_fields": ["asset_id", "cost_center"],
  "needs_human_approval": true,
  "reason": "why this queue and priority were selected"
}</code></pre>
          <p>Then make the write tool just as narrow.</p>
          <pre><code>{
  "name": "create_ticket_draft",
  "description": "Create an internal ticket draft only after classification and summarization. Never send externally. Use this for draft creation only.",
  "strict": true,
  "input_schema": {
    "type": "object",
    "properties": {
      "queue": { "type": "string", "enum": ["it_support", "finance_ops", "people_ops"] },
      "priority": { "type": "string", "enum": ["low", "normal", "high"] },
      "summary": { "type": "string" },
      "requester": { "type": "string" },
      "needs_human_approval": { "type": "boolean" }
    },
    "required": ["queue", "priority", "summary", "requester", "needs_human_approval"],
    "additionalProperties": false
  }
}</code></pre>
          <p>That is much easier to trust than free-form text plus downstream parsing. Structured outputs and strict tools are one of the biggest reliability upgrades you can make for internal service automation.</p>

          <h3>Prompts matter, but boundaries matter more</h3>
          <p>Claude Opus can handle long context, but long prompts are not the main source of quality. Clear boundaries usually matter more. Anthropic’s prompting guide emphasizes direct instructions, examples, XML tags, and self-checks.</p>
          <p>In practice, five things should always be explicit.</p>
          <ul>
            <li>The model’s role in this step</li>
            <li>Which data it may read</li>
            <li>Which tools it may call and under what conditions</li>
            <li>Which actions are forbidden</li>
            <li>Which conditions require it to stop and ask for human review</li>
          </ul>
          <p>Adding a self-check at the end of the instruction set is especially useful: verify required fields, verify policy compliance, and verify whether the task crossed an approval boundary.</p>

          <h3>Security decisions start before Files API or MCP</h3>
          <p>This is where many internal projects get sloppy. Anthropic’s documentation notes that the Messages API can be eligible for Zero Data Retention when an organization has a ZDR arrangement. Files API is different: it is beta, not ZDR eligible, scoped to the workspace of the API key, and files persist until deleted.</p>
          <p>That means convenience should not drive the first design. Files API is useful for repeated documents, but it should not become the default place to push sensitive HR, legal, finance, or regulated records without a retention review. Anthropic’s current limits also matter operationally: up to 500 MB per file and 100 GB total storage per organization.</p>
          <p>The MCP connector has a similar warning profile. Anthropic documents it as beta and not ZDR eligible. For a first internal automation rollout, it is often cleaner to keep the execution layer inside your own backend and expose only narrow client-side tools to Claude instead of opening broad remote tool surfaces too early.</p>
          <p>Prompt caching can be helpful when you repeatedly send long policy blocks or internal playbooks. Anthropic’s current docs say prompt caching stores KV cache representations and cryptographic hashes rather than raw prompt text, with an ephemeral 5-minute default lifetime. Still, caching should be an optimization choice, not an excuse to skip data classification.</p>

          <h3>Approval design is what makes automation feel safe</h3>
          <p>The strongest internal automations do not remove humans everywhere. They remove humans from the wrong places and keep them exactly where accountability matters. Anthropic’s guidance on agentic behavior also recommends explicit confirmation for destructive or hard-to-reverse actions.</p>
          <p>A practical split looks like this.</p>
          <ul>
            <li>Auto-allow: classification, tagging, summarization, internal drafts</li>
            <li>Conditionally allow: ticket draft creation, assignee suggestion, priority recommendation</li>
            <li>Always require approval: external send, data mutation, permission changes, cost impact, customer-facing output</li>
          </ul>
          <p>The approval screen should show more than buttons. Show the evidence the model used, missing fields, expected side effects, and the exact tool call that would run next. If the reviewer cannot read it quickly, the automation has only moved the bottleneck.</p>

          <h3>Roll out with an evaluation set, not a pretty demo</h3>
          <p>Anthropic’s evaluation guidance is unusually practical here. Success should be multidimensional. For internal service automation, accuracy alone is not enough. You also need privacy preservation, latency, price, and review effort.</p>
          <p>A good first rollout usually starts with a few hundred real historical cases. Anthropic explicitly recommends prioritizing volume over perfect manual grading when you can automate evaluation. That matches operational reality.</p>
          <p>The first dashboard should probably include metrics like these.</p>
          <ul>
            <li>Correct queue-routing rate</li>
            <li>Recall for missing required fields</li>
            <li>Approval-needed classification accuracy</li>
            <li>Unsafe auto-action rate</li>
            <li>Average review time and end-to-end handling time</li>
            <li>Token cost per request</li>
          </ul>
          <p>For offline backlogs, Message Batches can be useful, but note the retention implications before reaching for them.</p>

          <h3>The operational tips that matter most are surprisingly simple</h3>
          <ul>
            <li>Use Claude Opus as the reviewer and planner, not as the cheapest parser in the stack.</li>
            <li>Keep tools narrow, action-oriented, and schema-constrained.</li>
            <li>Let your backend fill values it already knows instead of asking the model again.</li>
            <li>Pass only the minimum relevant context, not raw database dumps.</li>
            <li>Start with one team, one queue, and one reviewer before broadening scope.</li>
          </ul>
          <p>Automating internal services with Claude Opus is not really about removing human judgment. It is about preserving the moments where judgment matters and stripping away the operational friction around them. Once that boundary is designed well, the first automation usually lands faster than expected.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://platform.claude.com/docs/en/get-started" target="_blank" rel="noreferrer">Anthropic Docs: Get started with Claude</a></li>
            <li><a href="https://platform.claude.com/docs/en/api/typescript/messages/create" target="_blank" rel="noreferrer">Anthropic Docs: Create a Message (TypeScript)</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" target="_blank" rel="noreferrer">Anthropic Docs: Define tools</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/working-with-messages" target="_blank" rel="noreferrer">Anthropic Docs: Using the Messages API</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/files" target="_blank" rel="noreferrer">Anthropic Docs: Files API</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/mcp-connector" target="_blank" rel="noreferrer">Anthropic Docs: MCP connector</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching" target="_blank" rel="noreferrer">Anthropic Docs: Prompt caching</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noreferrer">Anthropic Docs: Prompting best practices</a></li>
            <li><a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks" target="_blank" rel="noreferrer">Anthropic Docs: Mitigate jailbreaks and prompt injections</a></li>
            <li><a href="https://platform.claude.com/docs/en/test-and-evaluate/develop-tests" target="_blank" rel="noreferrer">Anthropic Docs: Define success criteria and build evaluations</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/zero-data-retention" target="_blank" rel="noreferrer">Anthropic Docs: Zero Data Retention</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'Claude Opusで社内サービス自動化を組み込む、いちばん現実的な進め方',
        keywords: ['AI'],
        excerpt: '社内自動化は、Claude Opusを何でも答えるチャットとして置くより、狭い業務ループの判断エンジンとして使うほうがはるかに安定します。',
        heroImage: {
          alt: 'チケットキュー、文書要約、承認チェックリストが表示された社内自動化ダッシュボードを運用担当者が確認している様子',
          caption: 'Claude Opusは汎用チャット画面より、社内ツールと承認フローの中に置いたほうが実務で力を発揮します。',
        },
        contentHtml: `
          <p>社内サービス自動化を始めるとき、多くのチームは先にチャット画面を作ろうとします。けれど実務では、自由会話の入り口より、ひとつの業務を最後まで安全に流せる小さな運用ループを先に作るほうがずっと現実的です。</p>
          <p>2026年4月2日時点で、Anthropicの公式ドキュメントは複雑なツール利用や曖昧な問い合わせには最新の Claude Opus 4.6 を勧めています。つまり Claude Opus は「社内システムに話しかけるAI」より、<strong>判断と調整の中心</strong>として置くほうが向いています。</p>
          <p>実際に重要なのは、どの業務から始めるか、出力の形をどう固定するか、どこで人に戻すか、そして保持と権限の境界をどう切るかです。</p>

          <h3>最初に自動化すべきなのは、戻せる業務です</h3>
          <p>最初の対象は、最も重要な意思決定ではありません。毎日面倒で、でも人が見ればすぐに直せる業務です。</p>
          <blockquote>最初の自動化対象は、最終判断そのものではなく、人が素早く確認し、必要なら安全に差し戻せる運用判断であるべきです。</blockquote>
          <p>たとえば次のような仕事です。</p>
          <ul>
            <li>社内依頼を適切なキューへ振り分ける</li>
            <li>Slack、メール、フォームの依頼をチケット草案に変える</li>
            <li>長い障害メモや運用文書を要約し、次のアクションを整理する</li>
            <li>社内FAQや運用サポートの返答草案を作る</li>
            <li>承認前の確認メモをまとめる</li>
          </ul>
          <p>逆に、外部送信、権限変更、金額反映、人事判断のような戻しにくい操作を最初から任せるのは避けたほうが安全です。</p>

          <h3>安定する形は、薄い運用パイプラインです</h3>
          <p>実務でうまくいきやすいのは、「ユーザーが話す、モデルが全部やる」という形ではありません。もっと細いパイプラインです。</p>
          <ol>
            <li>Slack、メール、フォーム、社内ポータルから依頼を受ける</li>
            <li>入力形式エラー、プロンプトインジェクション兆候、ポリシー違反を軽く先に弾く</li>
            <li>必要な規程、履歴、ユーザー属性だけを絞って文脈として渡す</li>
            <li>Claude Opusに分類、要約、不足項目、承認要否を判断させる</li>
            <li>下書き作成など狭いスキーマのツールだけを見せる</li>
            <li>不可逆な操作の前で承認を要求する</li>
            <li>根拠、判断、承認者、実行結果を監査ログとして残す</li>
          </ol>
          <p>Anthropicのツール定義ガイドが説明文とスキーマを丁寧に書くよう勧めるのはこのためです。自動化は結局、モデルに見せる道具の幅をどう切るかで安定度が変わります。</p>
          <p>また、安価な前段フィルタと深い判断を分けるのも有効です。Anthropicのガードレール文書でも、入力スクリーニングには Claude Haiku 4.5 のような軽量モデルを使えると案内されています。</p>

          <h3>API設定は、必ずサーバー側から始めます</h3>
          <p>ここが最初のつまずきやすい場所です。Anthropic Console で API キーを発行したら、そのキーは必ずサーバー環境変数としてだけ保管します。フロントエンドに置いた時点で、保護の前提が崩れます。</p>
          <p>特に Vite では、<code>VITE_</code> で始まる環境変数はブラウザ用バンドルに公開されます。つまり <code>VITE_ANTHROPIC_API_KEY</code> のような名前は作ってはいけません。安全な形は常に「ブラウザ → 自分のサーバー → Anthropic API」です。</p>
          <p>今のプロダクトが静的フロントエンドだけでも同じです。小さな Node サービスかサーバーレス関数を用意し、Anthropic の呼び出しはそこだけに閉じ込めます。</p>
          <p>最初のセットアップは次の四段階で十分です。</p>
          <ol>
            <li>Anthropic Console で API キーを発行する</li>
            <li>バックエンドまたはサーバーレス実行環境に <code>ANTHROPIC_API_KEY</code> として保存する</li>
            <li><code>/api/internal-triage</code> のような細い内部エンドポイントを一つ作る</li>
            <li>ブラウザ UI は Anthropic ではなく、そのエンドポイントだけを呼ぶ</li>
          </ol>
          <p>最初の接続確認なら、Node の最小例で十分です。</p>
          <pre><code>npm install @anthropic-ai/sdk express dotenv</code></pre>
          <pre><code>ANTHROPIC_API_KEY=your_api_key_here
PORT=3001</code></pre>
          <pre><code>import 'dotenv/config';
import express from 'express';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post('/api/internal-triage', async (req, res) => {
  const { requestText, requester } = req.body ?? {};

  if (!requestText || !requestText.trim()) {
    return res.status(400).json({ error: 'requestText is required' });
  }

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 800,
    system: 'You classify internal support requests and respond with JSON only.',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text:
              'requester: ' +
              (requester ?? 'unknown') +
              '\nrequest: ' +
              requestText,
          },
        ],
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');

  res.json({
    model: message.model,
    result: textBlock?.text ?? '',
  });
});

app.listen(process.env.PORT ?? 3001);</code></pre>
          <p>これは完成版の自動化ではなく、最初の疎通確認です。まずこの段階で安全に応答することを確かめ、その後で次の節にある構造化出力契約とツール呼び出し、承認ゲートを足していきます。</p>
          <pre><code>curl http://localhost:3001/api/internal-triage \
  -H "Content-Type: application/json" \
  -d '{"requestText":"ノートPCの交換を依頼したいです。資産番号はまだ分かりません。","requester":"minji@company.com"}'</code></pre>
          <p>フロントエンドは Anthropic SDK を直接使わず、自分のサーバーだけを呼びます。</p>
          <pre><code>const response = await fetch('/api/internal-triage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    requestText,
    requester: currentUser.email,
  }),
});

const data = await response.json();</code></pre>
          <p>実務上のルールは単純です。キーはサーバーにだけ置く。最初の一回は細いエンドポイントで疎通確認する。モデルの返答はバックエンドで検証できる形に固定する。この三つです。</p>

          <h3>プロンプトより先に、出力契約を決めます</h3>
          <p>たとえば運用サポート受付を自動化するなら、ユーザーは自由入力で依頼を出し、Claude Opusはキュー、優先度、要約、不足項目、人の承認が必要かどうかを返します。この出力の形は、プロンプト調整より先に固定したほうがうまくいきます。</p>
          <p>Messages APIは stateless なので、会話状態はアプリ側が持ち、モデルには今のステップに必要な情報だけを渡します。そのほうが障害時の復元もしやすく、監査もしやすくなります。</p>
          <p>最小構成なら次のような形です。</p>
          <pre><code>{
  "queue": "it_support | finance_ops | people_ops",
  "priority": "low | normal | high",
  "summary": "一文から二文の要約",
  "missing_fields": ["asset_id", "cost_center"],
  "needs_human_approval": true,
  "reason": "なぜそのキューと優先度にしたか"
}</code></pre>
          <p>書き込み側のツールも同じくらい狭く保ちます。</p>
          <pre><code>{
  "name": "create_ticket_draft",
  "description": "分類と要約が済んだ後にだけ、社内チケットの草案を作成する。外部送信には使わない。草案作成専用。",
  "strict": true,
  "input_schema": {
    "type": "object",
    "properties": {
      "queue": { "type": "string", "enum": ["it_support", "finance_ops", "people_ops"] },
      "priority": { "type": "string", "enum": ["low", "normal", "high"] },
      "summary": { "type": "string" },
      "requester": { "type": "string" },
      "needs_human_approval": { "type": "boolean" }
    },
    "required": ["queue", "priority", "summary", "requester", "needs_human_approval"],
    "additionalProperties": false
  }
}</code></pre>
          <p>自由文を後で解析する方式より、構造化出力と strict tool use のほうが社内自動化では圧倒的に運用しやすくなります。</p>

          <h3>長いプロンプトより、境界の明確さが効きます</h3>
          <p>Claude Opusは長い文脈を扱えますが、品質を決めるのはプロンプトの長さより境界の明確さです。Anthropicのプロンプトガイドも、明確で直接的な指示、例示、XMLタグ、自己確認を勧めています。</p>
          <p>実務では、少なくとも次の五つを必ず明示します。</p>
          <ul>
            <li>このステップでの役割</li>
            <li>読んでよいデータ範囲</li>
            <li>呼び出してよいツールと条件</li>
            <li>禁止される操作</li>
            <li>止まって人に戻すべき条件</li>
          </ul>
          <p>最後に、必須項目とポリシー整合性を自己確認させる一文を入れるだけでも、仕上がりはかなり安定します。</p>

          <h3>Files APIとMCPを使う前に、保持方針を決めます</h3>
          <p>ここが運用で一番差が出るところです。Anthropicの文書では、Messages APIはZDR契約のある組織では Zero Data Retention の対象になりえます。一方で Files API はベータで、ZDR対象ではなく、APIキーの属するワークスペース単位で共有され、削除するまで残ります。</p>
          <p>つまり便利だからという理由だけで、HR文書、契約書、財務データ、規制対象データをそのまま上げるべきではありません。最初の社内自動化では、社内バックエンドで必要な事実だけを抽出して Claude Opus に渡す構成のほうが安全です。現行ドキュメントでは Files API の上限は1ファイル500MB、組織全体100GBです。</p>
          <p>MCP connector も同様に、Anthropic文書ではベータかつ ZDR対象外です。最初の社内自動化では、遠隔MCPを広く開くより、自社バックエンドで実行レイヤーを管理し、Claudeには狭いクライアントツールだけを見せるほうが監査しやすいです。</p>
          <p>長い規程文書を何度も渡す場合は prompt caching が役立ちます。Anthropicの最近の文書では、キャッシュは生の文章ではなくKVキャッシュ表現とハッシュを保持し、既定寿命は5分の ephemeral です。ただし Opus 4.6 と Opus 4.5 では最低4096トークンが必要なので、短い入力に無理に使う必要はありません。</p>

          <h3>承認の置き方で、自動化の安心感は決まります</h3>
          <p>強い自動化は、人をすべて外すことではありません。人が要らない場所から外し、責任が残る場所には確実に残すことです。Anthropicのガイドも、破壊的または戻しにくい操作には明示的な確認を置くことを勧めています。</p>
          <p>実務では次の分け方が扱いやすいです。</p>
          <ul>
            <li>自動許可: 分類、タグ付け、要約、社内草案作成</li>
            <li>条件付き許可: チケット草案作成、担当候補提案、優先度提案</li>
            <li>必ず承認: 外部送信、データ変更、権限変更、金額反映、顧客向け文面</li>
          </ul>
          <p>承認画面はボタンだけでは不十分です。モデルが見た根拠、不足項目、予想される影響、次に実行されるツール呼び出しまで見せて、レビュアーが短時間で読めるようにする必要があります。</p>

          <h3>きれいなデモより、評価セットで始めたほうが伸びます</h3>
          <p>Anthropicの評価ガイドで特に実務的なのは、成功基準を一つにしないことです。社内自動化では正答率だけでは足りません。業務適合性、プライバシー保全、遅延、コスト、レビュー負荷を一緒に見なければなりません。</p>
          <p>最初の導入では、実際の履歴ケースを数百件集めて評価セットを作るほうが有効です。文書でも、自動評価が可能なら、少数の高品質手採点より多くのケースを回すほうがよいと勧めています。</p>
          <p>最初に追う指標は次のようなものです。</p>
          <ul>
            <li>正しいキュー振り分け率</li>
            <li>必須不足項目の検出再現率</li>
            <li>承認必要判定の精度</li>
            <li>危険な自動実行率</li>
            <li>平均レビュー時間と処理時間</li>
            <li>1件あたりのトークン費用</li>
          </ul>

          <h3>最後に残る運用コツは、むしろ単純です</h3>
          <ul>
            <li>Claude Opusはパーサーより審査役として使います。</li>
            <li>ツールは狭く、動詞中心で、スキーマを厳しく保ちます。</li>
            <li>バックエンドがすでに知っている値はモデルに再推論させません。</li>
            <li>渡す文脈は必要最小限に絞ります。</li>
            <li>最初は一つのチーム、一つのキュー、一人のレビュアーで始めます。</li>
          </ul>
          <p>Claude Opusで社内サービスを自動化するというのは、人間の判断そのものを消すことではありません。本当に判断が必要な瞬間だけを鮮明に残し、その前後の摩擦を減らすことに近いです。その境界がきれいに引ければ、最初の自動化は思ったより早く現場に乗ります。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://platform.claude.com/docs/en/get-started" target="_blank" rel="noreferrer">Anthropic Docs: Get started with Claude</a></li>
            <li><a href="https://platform.claude.com/docs/en/api/typescript/messages/create" target="_blank" rel="noreferrer">Anthropic Docs: Create a Message (TypeScript)</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools" target="_blank" rel="noreferrer">Anthropic Docs: Define tools</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/working-with-messages" target="_blank" rel="noreferrer">Anthropic Docs: Using the Messages API</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/files" target="_blank" rel="noreferrer">Anthropic Docs: Files API</a></li>
            <li><a href="https://platform.claude.com/docs/en/agents-and-tools/mcp-connector" target="_blank" rel="noreferrer">Anthropic Docs: MCP connector</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching" target="_blank" rel="noreferrer">Anthropic Docs: Prompt caching</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices" target="_blank" rel="noreferrer">Anthropic Docs: Prompting best practices</a></li>
            <li><a href="https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks" target="_blank" rel="noreferrer">Anthropic Docs: Mitigate jailbreaks and prompt injections</a></li>
            <li><a href="https://platform.claude.com/docs/en/test-and-evaluate/develop-tests" target="_blank" rel="noreferrer">Anthropic Docs: Define success criteria and build evaluations</a></li>
            <li><a href="https://platform.claude.com/docs/en/build-with-claude/zero-data-retention" target="_blank" rel="noreferrer">Anthropic Docs: Zero Data Retention</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'how-agentic-ai-physical-ai-and-digital-twin-come-together-in-healthcare',
    category: 'healthcare',
    createdAt: '2026-04-01T12:40:00+09:00',
    heroImage: {
      src: '/blog/healthcare-ai-workflow-hero-generated.webp',
    },
    locales: {
      ko: {
        title: '헬스케어에서 Agentic AI, Physical AI, Digital Twin은 결국 한 흐름으로 만납니다',
        keywords: ['헬스케어'],
        excerpt: '헬스케어 AI의 다음 장면은 챗봇 하나가 아니라, 에이전트가 조정하고 물리 시스템이 실행하며 디지털 트윈이 미리 시뮬레이션하는 운영 구조에 더 가깝습니다.',
        heroImage: {
          alt: '의료진 대시보드와 병실 센서, 환자 상태 모델이 하나의 운영 화면처럼 연결된 의료 AI 일러스트',
          caption: '헬스케어의 다음 AI는 답변형 인터페이스 하나보다, 예측하고 조정하고 실행하는 운영 루프에 가까워 보입니다.',
        },
        contentHtml: `
          <p>지금 헬스케어 AI 글을 보다 보면 <strong>Agentic AI</strong>, <strong>Physical AI</strong>, <strong>Digital Twin</strong>이 자주 같이 등장합니다. 하지만 세 단어가 비슷한 뜻처럼 묶여 버리면 실제로 무엇이 다른지, 병원과 돌봄 현장에서 어떻게 쓰이는지가 잘 보이지 않습니다.</p>
          <p>그래서 이 글에서는 세 개념을 분리해서 보려 합니다. 각각 <strong>무엇인지</strong>, 그리고 <strong>헬스케어에서 어디에 쓰이는지</strong>를 먼저 설명한 뒤, 마지막에 왜 이 셋이 결국 하나의 운영 구조로 만나는지를 정리해 보겠습니다.</p>

          <h3>Agentic AI란 무엇인가</h3>
          <p>Agentic AI는 질문에 답만 하는 모델보다 한 단계 더 나아간 개념입니다. 현재 상황을 읽고, 목표를 세우고, 필요한 도구를 부르고, 다음 행동을 순서대로 정리하는 <strong>소프트웨어 에이전트</strong>에 가깝습니다. 쉽게 말하면 “설명하는 AI”보다 “일을 진행시키는 AI”입니다. 다만 헬스케어 문헌에서도 AI agent와 Agentic AI의 구분은 아직 완전히 표준화되지는 않았습니다.</p>
          <p>헬스케어에서 이 개념이 중요한 이유는 의료 업무가 하나의 화면 안에서 끝나지 않기 때문입니다. 예약 시스템, 문진 기록, EMR, 검사 일정, 환자 메시지, 보험 서류처럼 정보가 여러 군데로 흩어져 있고, 그 사이를 누군가 계속 이어 붙여야 합니다.</p>

          <h3>Agentic AI는 헬스케어에서 어떻게 사용되나</h3>
          <p>현재 공개된 제품과 초기 연구를 기준으로 보면, 외래 예약 변경, 입원 전 사전 문진 수집, 퇴원 후 추적 연락, 원격 모니터링 알림 정리, 진료 문서 초안 생성, 보험 청구 전 확인 작업처럼 <strong>반복적이고 조정이 많은 업무</strong>에서 먼저 가치가 날 가능성이 큽니다.</p>
          <p>예를 들어 만성질환 관리 프로그램에서는 에이전트가 혈당 기록과 누락된 설문, 예약 이력, 메시지 응답률을 함께 읽고 어떤 환자를 먼저 연락해야 하는지 정리할 수 있습니다. 중요한 점은 이 에이전트가 의학적 최종 판단을 대신하는 것이 아니라, 의료진과 코디네이터가 더 중요한 판단에 집중하도록 마찰을 줄인다는 데 있습니다.</p>
          <blockquote>헬스케어에서 Agentic AI의 핵심은 “의사를 대체하는 AI”가 아니라 “복잡한 의료 흐름을 정리하는 운영 에이전트”입니다.</blockquote>

          <h3>Physical AI란 무엇인가</h3>
          <p>Physical AI는 디지털 화면 안에만 머무르지 않고, 센서와 장비, 로봇, 웨어러블처럼 <strong>현실 공간에서 움직이거나 반응하는 시스템</strong>에 AI가 붙은 형태를 말합니다. 즉 상태를 인식하는 것에서 멈추지 않고, 실제 환경 안에서 측정하거나 움직이거나 피드백을 주는 쪽까지 포함합니다.</p>
          <p>헬스케어는 본질적으로 물리적인 환경입니다. 환자는 병실에 있고, 장비는 침상 옆에 있으며, 재활은 몸의 움직임 속에서 이뤄집니다. 다만 의료 문헌에서는 이를 하나의 표준 용어로 묶기보다, 의료 로보틱스, 웨어러블, 환경 센싱처럼 더 구체적인 분야로 설명하는 경우가 많습니다.</p>

          <h3>Physical AI는 헬스케어에서 어떻게 사용되나</h3>
          <p>병원에서는 물품 운반 로봇, 스마트 병상, 낙상 감지 센서, 자동 측정 장비, 표본 이송, 병동 환경 모니터링 같은 영역에서 활용될 수 있습니다. 재활에서는 환자의 자세와 관절 움직임을 읽어 실시간 피드백을 주는 보조 장치나 운동 코칭 시스템으로 연결될 수 있습니다.</p>
          <p>재택 돌봄으로 가면 활용 범위는 더 넓어집니다. 웨어러블 기기가 바이탈을 측정하고, 스마트 스피커나 홈 센서가 생활 패턴 변화를 감지하며, 복약 보조 장치가 실제 행동을 유도하는 식입니다. 이 글에서는 Physical AI를 이런 여러 현실-연동 시스템을 넓게 가리키는 표현으로 쓰겠습니다.</p>

          <h3>Digital Twin이란 무엇인가</h3>
          <p>Digital Twin은 환자, 병실, 장비, 병동, 병원 운영 같은 대상을 디지털 공간 안에 계속 업데이트되는 모델로 만들어 두는 개념입니다. 단순한 대시보드와 다른 점은, 현재 상태를 보여주는 데서 그치지 않고 그 상태를 바탕으로 다음 변화를 <strong>시뮬레이션하고 예측</strong>하려 한다는 데 있습니다.</p>
          <p>헬스케어에서 디지털 트윈은 하나의 형태로만 존재하지 않습니다. 환자 개인의 바이탈과 검사 수치, 약물, 생활 데이터를 묶은 환자 트윈이 될 수도 있고, 병상 가동률과 인력 흐름을 반영하는 병동 트윈이 될 수도 있습니다. 더 크게는 응급실 체류 시간, 수술실 회전율, 장비 가동률을 보는 병원 운영 트윈이 될 수도 있습니다.</p>

          <h3>Digital Twin은 헬스케어에서 어떻게 사용되나</h3>
          <p>환자 수준에서는 악화 가능성, 재입원 위험, 재활 경과, 약물 반응 변화를 더 빨리 읽는 데 쓸 수 있습니다. 운영 수준에서는 병상 배치, 중환자실 자원 배분, 검사 장비 스케줄, 간호 인력 분산 같은 문제를 실제 적용 전에 미리 시험하는 데 의미가 있습니다.</p>
          <p>디지털 트윈이 특히 유용한 이유는 의료 현장에서 모든 결정을 바로 실험할 수 없기 때문입니다. 실제 환자와 실제 병동을 대상으로 시행착오를 반복하기 어렵기 때문에, 먼저 디지털 공간에서 “이 선택을 하면 어떤 변화가 생길까”를 보는 가치가 큽니다.</p>

          <h3>세 기술은 왜 함께 언급되나</h3>
          <p>한 가지 유용한 해석으로 보면 역할을 이렇게 나눠 볼 수 있습니다. <strong>Digital Twin은 상태를 이해하고 예측하는 모델</strong>이고, <strong>Agentic AI는 그 정보를 바탕으로 다음 행동을 정리하는 조정자</strong>이며, <strong>Physical AI는 현실 공간에서 실제 개입을 수행하는 실행자</strong>입니다.</p>
          <p>예를 들어 재택 만성질환 관리 프로그램을 생각해 볼 수 있습니다. 디지털 트윈이 혈압, 활동량, 복약 이력, 최근 증상을 종합해 위험 신호를 먼저 포착합니다. Agentic AI는 그 환자를 우선 연락 대상에 올리고, 간호사에게 어떤 확인 질문이 필요한지 제안합니다. 이후 Physical AI나 연결된 디바이스는 실제 측정, 복약 알림, 생활 습관 피드백 같은 개입을 수행합니다.</p>
          <p>즉 세 기술은 따로 보면 각각 데이터, 소프트웨어, 장비 이야기처럼 보이지만, 함께 보면 “예측하고, 정리하고, 실행하는” 하나의 의료 운영 루프로 이어질 수 있습니다.</p>

          <h3>현장 도입에서는 보통 무엇부터 붙일까</h3>
          <p>현실적인 현장 도입은 세 기술을 동시에 붙이는 방식보다 단계적으로 이뤄지는 경우가 많습니다. 한 가지 실무적 접근은 먼저 EMR, 간호 기록, 센서 로그, 운영 데이터를 정리해 디지털 트윈의 기초가 되는 데이터 레이어를 만들고, 그 위에 Agentic AI를 올려 저위험 조정 업무를 자동화한 뒤, 마지막으로 충분히 검증된 워크플로에 한해 Physical AI를 연결해 실제 실행 루프를 넓혀 가는 방식입니다.</p>
          <p>다만 이것이 모든 기관에 적용되는 표준 순서를 뜻하는 것은 아닙니다. 데이터 인프라, 규제 환경, 조직의 준비 수준에 따라 출발점은 달라질 수 있습니다.</p>
          <p>이 순서가 중요한 이유는 헬스케어에서 실패가 자주 기술 성능 부족보다 <strong>데이터 품질, 책임 경계, 예외 처리 부족</strong>에서 나오기 때문입니다. 설명은 쉬워도, 병원은 결국 누가 승인하고 누가 책임지는지를 분명히 해야 움직입니다.</p>

          <h3>결국 중요한 것은 안전성과 역할 분담입니다</h3>
          <p>세 키워드 모두 매력적이지만, 헬스케어에서 실제로 살아남는 시스템은 멋진 데모보다 안전한 handoff를 잘 설계한 시스템일 가능성이 큽니다. 어디까지 자동화할지, 어디서 사람에게 넘길지, 어떤 로그를 남길지, 어떤 예외를 즉시 사람 검토로 돌릴지를 분명히 해야 합니다.</p>
          <p>그래서 Agentic AI, Physical AI, Digital Twin을 볼 때는 각각을 독립된 유행어로 소비하기보다, <strong>설명 가능한 의료 운영 구조의 세 레이어</strong>로 보는 편이 더 실용적입니다. 헬스케어에서 이 세 기술의 진짜 가치는, 답변을 더 잘하는 데가 아니라 환자와 의료진 사이의 실제 흐름을 더 안전하고 효율적으로 만드는 데 있습니다.</p>
        `,
      },
      en: {
        title: 'In Healthcare, Agentic AI, Physical AI, and Digital Twin Are Starting to Converge',
        keywords: ['Healthcare'],
        excerpt: 'The next healthcare AI stack looks less like a single chatbot and more like an operating loop where agents coordinate, physical systems execute, and digital twins simulate ahead of action.',
        heroImage: {
          alt: 'A healthcare AI illustration combining a clinical dashboard, room sensors, and a patient-state model in one operational scene',
          caption: 'The next layer of healthcare AI may be less a conversational interface and more an operating loop that predicts, coordinates, and executes.',
        },
        contentHtml: `
          <p>In healthcare writing, <strong>agentic AI</strong>, <strong>physical AI</strong>, and <strong>digital twin</strong> are often grouped together so quickly that their differences become blurry. That makes it harder to understand what each one actually is and how each one is used in care delivery.</p>
          <p>So it helps to separate them first. For each concept, the practical question is simple: <strong>what is it</strong>, and <strong>where does it get used in healthcare</strong>? Once that is clear, it becomes much easier to see why the three are starting to converge.</p>

          <h3>What agentic AI is</h3>
          <p>Agentic AI is more than a model that answers questions. It behaves more like a software agent: it reads context, identifies a goal, decides the next step, and uses tools or systems to move the workflow forward. In plain terms, it is less “an AI that explains” and more “an AI that helps run a process.” The terminology, however, is still not fully standardized in healthcare literature.</p>
          <p>That matters in healthcare because many care workflows stretch across multiple systems: intake forms, scheduling, EMR, messages, follow-up tasks, billing checks, and monitoring alerts. Someone has to connect those steps, and much of that work is repetitive coordination.</p>

          <h3>How agentic AI is used in healthcare</h3>
          <p>Based on current products and early studies, early value is most visible in high-friction coordination work: pre-visit intake, appointment changes, discharge follow-up, remote-monitoring escalation, documentation drafts, and administrative task routing. These are all jobs where the challenge is not one hard medical decision, but the repeated movement of information between people and systems.</p>
          <p>For example, in a chronic-care program, an agent can review home readings, missing questionnaires, response patterns, and appointment history to identify which patient should be contacted first. The important point is that the agent does not replace final clinical judgment. It reduces operational friction so clinicians can spend more time on decisions that actually require them.</p>
          <blockquote>In healthcare, agentic AI is best understood not as doctor replacement, but as an operating agent that organizes complex care workflows.</blockquote>

          <h3>What physical AI is</h3>
          <p>Physical AI refers to AI systems connected to the real world through sensors, devices, robots, wearables, or smart equipment. It does not stop at analyzing data on a screen. It senses what is happening in a physical environment and can trigger or guide action within that environment.</p>
          <p>This matters because healthcare is not only a software problem. Patients are in beds, in homes, in rehab spaces, and around equipment. Care happens in rooms, corridors, and living spaces, not only in interfaces. In healthcare literature, though, the label itself is less standardized than terms such as medical robotics, wearables, or ambient sensing.</p>

          <h3>How physical AI is used in healthcare</h3>
          <p>In hospitals, physical AI can appear in transport robots, smart beds, fall-detection systems, automated measurement devices, ward sensors, and environment-monitoring systems. In rehabilitation, it can support devices that track posture and movement and provide immediate feedback. In home care, it can connect with wearables, medication-assistance devices, motion sensors, or voice interfaces that help patients follow care plans.</p>
          <p>In this article, physical AI is used as a broad umbrella for AI systems that do not only interpret care conditions, but also participate in the physical execution of care-related actions.</p>

          <h3>What a digital twin is</h3>
          <p>A digital twin is a continuously updated digital model of a real entity such as a patient, room, device fleet, ward, or hospital operation. It is more than a dashboard because it does not only display current status. It is meant to support simulation, forecasting, and scenario testing based on that status.</p>
          <p>In healthcare, a twin can exist at different levels. It may be a patient twin that combines vitals, labs, medications, and behavior patterns. It may be a ward twin that tracks beds, staffing, and device use. It may even be a hospital operations twin that helps teams understand emergency flow, operating room turnover, or resource bottlenecks.</p>

          <h3>How digital twins are used in healthcare</h3>
          <p>At the patient level, digital twins can support deterioration prediction, readmission risk tracking, rehab progress assessment, or medication-response monitoring. At the operational level, they can help teams test staffing models, bed allocation, ICU capacity, diagnostic scheduling, or patient-flow scenarios before making changes in the real environment.</p>
          <p>The reason digital twins are especially useful in healthcare is simple: many decisions are too costly, risky, or slow to test directly on real patients and real hospitals. A reliable twin creates a safer place to examine likely outcomes before acting.</p>

          <h3>Why the three are starting to converge</h3>
          <p>A useful way to read their convergence is this: <strong>a digital twin models and predicts</strong>, <strong>agentic AI prioritizes and coordinates</strong>, and <strong>physical AI senses and executes in the real world</strong>. Taken together, they can form a closed operational loop.</p>
          <p>Consider a home-monitoring program. The digital twin reflects blood pressure, activity, medication adherence, and symptom patterns. Agentic AI reviews that information and decides who needs outreach, what questions should be asked, and which follow-up task should be created. Physical AI or connected devices then handle measurement, reminders, movement feedback, or environmental prompts. That is no longer just an AI chat experience. It is a care operations system.</p>

          <h3>In practice, rollout is usually staged</h3>
          <p>Healthcare teams do not usually introduce all three layers at once. One practical pattern is to first build the data foundation that makes a useful twin possible, then add agentic AI for lower-risk coordination work, and only later connect physical automation once the workflow is stable and validated.</p>
          <p>That does not mean there is a universal standard order. The starting point depends on the organization’s data maturity, regulatory context, and operational readiness.</p>
          <p>That order matters because many healthcare failures come less from weak models than from unclear accountability, poor data quality, and missing exception handling. Hospitals need clear human approval points, auditability, and safe escalation paths before they trust deeper automation.</p>

          <h3>The real differentiator is safe role design</h3>
          <p>In the end, the strongest healthcare systems will not be the ones with the most impressive demos. They will be the ones that define exactly what the model predicts, what the agent coordinates, what the device executes, and where control always returns to a human.</p>
          <p>That is why agentic AI, physical AI, and digital twin are better read not as three separate buzzwords, but as three layers of an explainable healthcare operating stack.</p>
        `,
      },
      ja: {
        title: 'ヘルスケアでは Agentic AI、Physical AI、Digital Twin がひとつの流れとしてつながり始めています',
        keywords: ['ヘルスケア'],
        excerpt: 'これからのヘルスケアAIは、単一のチャットボットよりも、デジタルツインが予測し、エージェントが調整し、フィジカルAIが実行する運用ループに近づいていきます。',
        heroImage: {
          alt: '臨床ダッシュボード、病室センサー、患者状態モデルが一つの画面でつながって見える医療AIイラスト',
          caption: '次のヘルスケアAIは、会話インターフェース単体より、予測と調整と実行がつながる運用ループとして見たほうが自然です。',
        },
        contentHtml: `
          <p>ヘルスケアAIの文脈では、<strong>Agentic AI</strong>、<strong>Physical AI</strong>、<strong>Digital Twin</strong> がよく一緒に語られます。ただ、あまりに一括りにされると、それぞれが何を指し、医療現場でどう使われるのかが見えにくくなります。</p>
          <p>そのため、この三つはまず分けて理解するほうが分かりやすいです。つまり、それぞれが<strong>何なのか</strong>、そして<strong>ヘルスケアでどう使われるのか</strong>を見たうえで、最後にどうつながるかを考えるのが実務的です。</p>

          <h3>Agentic AI とは何か</h3>
          <p>Agentic AI は、質問に答えるだけのモデルより一歩進んだ存在です。状況を読み、目標を定め、次の行動を決め、必要なツールやシステムを使って処理を進める <strong>ソフトウェアエージェント</strong> に近い考え方です。言い換えると、「説明するAI」より「流れを動かすAI」です。ただし、ヘルスケア文献でも AI agent と Agentic AI の区別はまだ完全には標準化されていません。</p>
          <p>医療でこれが重要なのは、業務が一つの画面で完結しないからです。問診、予約、EMR、メッセージ、フォローアップ、請求確認、遠隔モニタリングなど、多くの工程が分かれており、その間をつなぐ調整業務が大量にあります。</p>

          <h3>Agentic AI はヘルスケアでどう使われるか</h3>
          <p>現在の公式製品や初期研究を見ると、初期に価値が出やすいのは、外来前の問診収集、予約変更、退院後フォロー、遠隔モニタリングの優先順位付け、文書ドラフト作成、事務タスクの振り分けといった、<strong>調整負荷の高い反復業務</strong>です。</p>
          <p>たとえば慢性疾患管理では、在宅測定値、未回答アンケート、返信状況、受診履歴をまとめて見て、どの患者に先に連絡すべきかをエージェントが整理できます。ここで大事なのは、最終的な臨床判断をエージェントに任せることではなく、医療者が本当に人間の判断を要する場面に集中できるようにすることです。</p>
          <blockquote>ヘルスケアにおける Agentic AI は、医師の代替ではなく、複雑な医療フローを整理する運用エージェントとして見るほうが自然です。</blockquote>

          <h3>Physical AI とは何か</h3>
          <p>Physical AI は、センサー、ウェアラブル、ロボット、スマート機器などを通じて、現実空間を認識し、そこに反応するAIを指します。画面上で情報を解釈するだけでなく、現実の環境で計測、動作、フィードバックに関わる点が特徴です。</p>
          <p>医療はそもそも物理的な現場です。患者は病床や自宅にいて、リハビリは身体の動きの中で行われ、ケアは機器や空間と切り離せません。ただし、医療文献ではこれを一つの標準用語でまとめるより、医療ロボティクス、ウェアラブル、環境センシングのような、より具体的な領域として説明する場合が多いです。</p>

          <h3>Physical AI はヘルスケアでどう使われるか</h3>
          <p>病院では搬送ロボット、スマートベッド、転倒検知、病棟センサー、自動測定機器、環境モニタリングなどに応用できます。リハビリでは姿勢や関節運動を捉えてリアルタイムでフィードバックする支援機器につながります。在宅ケアではウェアラブル、服薬支援機器、生活センサー、音声インターフェースなどと組み合わさります。</p>
          <p>この文章では、Physical AI を、医療の状態を読むだけでなく、ケアに関わる現実の動作に参加するAIを広く指す表現として使っています。</p>

          <h3>Digital Twin とは何か</h3>
          <p>Digital Twin は、患者、病室、機器群、病棟、病院運営などの対象を、継続的に更新されるデジタルモデルとして持つ考え方です。単なる可視化ダッシュボードとの違いは、現在の状態を表示するだけでなく、その状態をもとに <strong>予測やシミュレーション</strong> を行おうとする点にあります。</p>
          <p>ヘルスケアにおけるデジタルツインは一種類ではありません。バイタル、検査値、服薬、生活行動をまとめた患者ツインもあれば、病床稼働や人員配置、機器利用を映す病棟ツインもあります。さらに救急外来の滞留や手術室回転率を扱う病院運営ツインも考えられます。</p>

          <h3>Digital Twin はヘルスケアでどう使われるか</h3>
          <p>患者レベルでは、悪化予測、再入院リスク、リハビリ進行、薬剤反応の変化を見る用途があります。運用レベルでは、病床配分、人員配置、ICU容量、検査スケジュール、患者フローの改善案を、実環境に適用する前に検討する用途があります。</p>
          <p>医療でデジタルツインが有用なのは、多くの判断を実患者や実病院で直接試すのが難しいからです。信頼できるツインがあれば、本番前に変化を見積もる余地が生まれます。</p>

          <h3>なぜこの三つが一緒に語られるのか</h3>
          <p>一つの見方として、役割をこう整理できます。<strong>Digital Twin は状態をモデル化し予測する</strong>、<strong>Agentic AI は次の行動を整理し調整する</strong>、<strong>Physical AI は現実空間で実行する</strong>。この三つが合わさると、ひとつの運用ループになりえます。</p>
          <p>たとえば在宅モニタリングでは、デジタルツインが血圧、活動量、服薬、症状の変化を反映し、Agentic AI が誰に先に連絡すべきか、どの確認項目が必要かを整理します。そのうえで、Physical AI や接続デバイスが測定、通知、運動フィードバック、生活介入を担います。これは単なる会話AIではなく、医療運用システムです。</p>

          <h3>導入は通常、段階的に進みます</h3>
          <p>現実には、この三つを同時に入れることはあまりありません。一つの実務的な進め方は、まずデジタルツインを成立させるためのデータ基盤を整え、次に Agentic AI で比較的低リスクな調整業務を自動化し、最後に Physical AI を安定したワークフローへ接続していく流れです。</p>
          <p>ただし、これはすべての機関に当てはまる標準順序を意味するわけではありません。データ基盤、規制環境、組織の準備度によって出発点は変わりえます。</p>
          <p>この順序が大切なのは、医療での失敗がモデル性能そのものより、責任分界の曖昧さ、データ品質不足、例外処理の不足から起こりやすいからです。病院は人の承認ポイントや監査可能性が見えないままでは深い自動化を受け入れません。</p>

          <h3>本当に重要なのは安全な役割分担です</h3>
          <p>最終的に強いシステムは、派手なデモを見せるものではなく、何を予測し、何を調整し、何を実行し、どこで必ず人に戻すのかを明確に設計できるものです。</p>
          <p>だから Agentic AI、Physical AI、Digital Twin は、別々の流行語としてではなく、説明可能なヘルスケア運用スタックの三つのレイヤーとして読むほうが実務に近いと感じます。</p>
        `,
      },
    },
  },
  {
    slug: 'why-naver-healthcare-looks-more-like-a-clinical-ai-stack',
    category: 'healthcare',
    createdAt: '2026-04-01T11:20:00+09:00',
    heroImage: {
      src: '/blog/naver-healthcare-stack-hero-generated.webp',
    },
    locales: {
      ko: {
        title: '네이버헬스케어를 보다 보면 앱보다 병원 쪽 AI가 먼저 보입니다',
        keywords: ['헬스케어'],
        excerpt: '지금 네이버헬스케어를 읽는 더 흥미로운 방법은 환자용 앱 하나를 찾는 것이 아니라, CareCall과 Voice EMR, Nursing Agent, 의료데이터 보안을 함께 묶은 의료 AI 운영 구조를 보는 일에 가깝습니다.',
        heroImage: {
          alt: '병동 스테이션에서 간호사와 의사가 디지털 문서화 화면을 함께 검토하는 모습',
          caption: '네이버헬스케어의 흥미로운 지점은 환자용 앱 하나보다, 병동과 문서화, 돌봄 흐름을 잇는 의료 AI 운영 구조에 있습니다.',
        },
        contentHtml: `
          <p>네이버헬스케어를 떠올리면 많은 사람들이 아직 하나의 서비스 이름부터 찾게 됩니다. 그런데 공개 자료를 이어서 보면 네이버의 헬스케어 움직임은 환자용 앱 하나를 크게 키우는 그림보다, 의료 현장과 공공 영역에 들어가는 여러 AI 기능을 층층이 쌓는 방식에 더 가깝게 보입니다.</p>
          <p>이건 제가 공개 자료를 묶어 읽은 해석입니다. 하지만 근거는 꽤 분명합니다. 2026년 3월 16일 시행 기준 네이버클라우드 프라이버시 센터에는 CLOVA CareCall, CLOVA Charty, CLOVA Nursing Agent가 함께 보이고, 의료 음성인식 기반 의무기록 처리 내용도 따로 남아 있습니다. 여기에 2025년 3월 11일 CLOVA 기술 블로그의 Voice EMR, Nursing Agent 설명을 겹쳐 읽으면 그림은 더 선명해집니다.</p>
          <p>그래서 지금 네이버헬스케어를 볼 때 더 흥미로운 질문은 “대중 앱이 무엇인가”보다 “어떤 의료 업무 층을 먼저 바꾸고 있는가”일지 모릅니다.</p>

          <h3>공개된 서비스 조각만 봐도 단일 앱 그림과는 조금 다릅니다</h3>
          <p>현재 공개된 프라이버시 센터 기준으로 보면 네이버클라우드가 의료 쪽에서 다루는 서비스 표면은 한 가지가 아닙니다. CareCall은 돌봄과 안부 확인 쪽에 가깝고, Charty와 Voice EMR은 음성 기반 의무기록과 진료 문서화 흐름에 닿아 있으며, Nursing Agent는 병동 커뮤니케이션과 우선순위 판단 쪽에 가깝습니다.</p>
          <p>물론 이런 목록만으로 곧바로 사업 전략 전체를 단정할 수는 없습니다. 다만 이 조합이 의미하는 바는 분명합니다. 네이버가 헬스케어에서 보고 있는 문제를 ‘환자에게 앱 하나 더 주는 일’보다, 실제 의료 현장에서 반복되고 시간이 많이 드는 커뮤니케이션과 기록, 분류 업무로 읽고 있다는 신호에 더 가깝습니다.</p>
          <blockquote>네이버헬스케어의 중심은 소비자용 건강관리 앱보다, 의료진의 시간을 다시 배분하게 만드는 운영 레이어일 가능성이 더 커 보입니다.</blockquote>

          <h3>Voice EMR과 Nursing Agent는 진료실과 병동의 시간을 줄이는 쪽을 보여줍니다</h3>
          <p>CLOVA 기술 블로그에서 가장 인상적인 부분도 이 지점입니다. Voice EMR은 의사와 환자 대화를 실시간으로 분석해 의무기록을 정리하는 서비스로 소개되고, Healthcare AI 팀은 응급실처럼 소음과 발음 오류가 많은 환경에서도 필요한 정보만 가려내기 위해 경량 모델과 LLM을 함께 쓰는 구조를 설명합니다.</p>
          <p>Nursing Agent 쪽은 더 직접적입니다. 네이버는 병동에서 환자 요청을 우선순위별로 분류하고, 간호사가 바로 대응해야 할 일과 에이전트가 먼저 처리할 수 있는 일을 가르는 흐름을 보여줍니다. 기술 블로그에 따르면 현재 서비스는 80~90%대 정확도를 유지하며 개선 중이라고 합니다. 핵심은 화려한 AI 데모가 아니라 병동의 병목을 줄이는 운영 자동화에 있습니다.</p>
          <p>이 구조는 네이버헬스케어를 이해하는 데 중요합니다. 지금 네이버가 앞세우는 의료 AI의 장면은 “의학적 판단을 대신하는 AI”보다 “의료진이 환자를 보는 시간과 문서를 쓰는 시간을 다시 나누게 하는 AI”에 훨씬 가깝습니다.</p>

          <h3>CareCall이 있다는 점은 병원 밖 돌봄과 공공 보건까지 시야에 둔다는 뜻일 수 있습니다</h3>
          <p>여기에 CareCall이 더해지면 그림이 조금 더 넓어집니다. CLOVA AI Research 페이지는 CareCall 연구를 HCI와 디지털 헬스·웰빙 영역 안에 두고 있습니다. 즉 네이버의 헬스케어 AI가 진료실 안 기록 업무만 겨냥하는 것이 아니라, 사람과 AI가 어떻게 상호작용하며 돌봄을 이어 갈 것인가까지 함께 다루고 있다는 뜻으로 읽힙니다.</p>
          <p>이 대목이 중요한 이유는 국내 헬스케어 AI가 자주 “진단 AI” 이미지로만 소비되기 때문입니다. 하지만 실제 현장에서 먼저 도입되는 것은 의외로 안부 확인, 상담 연결, 문서 정리, 요청 분류 같은 커뮤니케이션 업무인 경우가 많습니다. CareCall과 EMR, Nursing Agent가 같이 보인다는 사실은 네이버도 이 우선순위를 꽤 현실적으로 잡고 있다는 인상을 줍니다.</p>

          <h3>결국 병원이 쓰려면 보안과 인프라 신뢰가 같이 보여야 합니다</h3>
          <p>헬스케어에서 서비스 아이디어만으로는 충분하지 않습니다. 병원과 공공기관은 실제로 데이터를 어디에 두고, 누가 접근하고, 어떤 기준으로 보호하는지를 함께 봅니다. 네이버클라우드의 현재 인증 페이지에 ISO/IEC 27799가 명시돼 있는 점은 이런 맥락에서 꽤 상징적입니다. 이 인증은 의료정보 보호 경영체계와 연결되는 국제 기준이기 때문입니다.</p>
          <p>네이버클라우드가 공개한 2025년 11월 회사 브로슈어도 같은 결을 보여줍니다. 삼성서울병원은 의료데이터 연구·분석용 보안 플랫폼 사례로, 서울대학교병원은 네트워크 분리를 통한 의료데이터 보안 강화 사례로 소개됩니다. 이건 네이버헬스케어의 무게 중심이 단순한 앱 배포보다, 병원이 실제로 받아들일 수 있는 데이터·보안 기반에 놓여 있음을 시사합니다.</p>

          <h3>그래서 네이버헬스케어는 ‘앱’보다 ‘의료 AI 운영 스택’으로 읽는 편이 더 자연스럽습니다</h3>
          <p>공개 자료만 놓고 보면 아직 네이버헬스케어 전체를 하나의 제품 이름으로 묶어 설명하기는 어렵습니다. 상용화 범위, 매출 기여, 실제 도입 규모처럼 더 확인해야 할 부분도 남아 있습니다. 그렇지만 지금 보이는 조각들은 꽤 같은 방향을 가리킵니다. 병원과 공공 영역에서 반복되는 음성, 문서, 요청, 돌봄 업무를 AI로 줄이고, 그 위를 보안과 인프라로 받치는 구조 말입니다.</p>
          <p>그래서 저는 네이버헬스케어를 볼 때 환자용 앱 이름부터 찾기보다, 한국어 음성 기반 의무기록, 병동 에이전트, 공공 돌봄형 상호작용, 의료데이터 보안이라는 네 개의 층을 함께 봐야 한다고 생각합니다. 그 편이 지금 네이버가 의료에서 어디로 가고 있는지를 더 정확하게 보여주기 때문입니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://clova.ai/tech-blog/%EB%84%A4%EC%9D%B4%EB%B2%84-ai-%EC%9D%98%EB%A3%8C%EC%A7%84%EC%9D%98-%EC%8B%9C%EA%B0%84%EC%9D%84-%EB%90%98%EC%B0%BE%EB%8B%A4-healthcare-ai%ED%8C%80%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0" target="_blank" rel="noreferrer">CLOVA Tech Blog: 네이버 AI, 의료진의 시간을 되찾다 | Healthcare AI팀의 이야기</a></li>
            <li><a href="https://clova.ai/en/ai-research" target="_blank" rel="noreferrer">CLOVA AI Research: AI Research &amp; Safety</a></li>
            <li><a href="https://privacy.navercloudcorp.com/" target="_blank" rel="noreferrer">NAVER Cloud Privacy Center</a></li>
            <li><a href="https://privacy.navercloudcorp.com/Compliance/certificate_ncc" target="_blank" rel="noreferrer">NAVER Cloud Privacy Center: Certifications</a></li>
            <li><a href="https://www.navercloudcorp.com/NAVER_Cloud_251114_EN.pdf" target="_blank" rel="noreferrer">NAVER Cloud company brochure (Nov. 2025)</a></li>
          </ul>
        `,
      },
      en: {
        title: 'When I Look at NAVER Healthcare, Hospital AI Stands Out More Than Consumer Apps',
        keywords: ['Healthcare'],
        excerpt: 'The more useful way to read NAVER healthcare now is not to look for one patient-facing app, but to look at a layered operational stack built around CareCall, voice documentation, ward agents, medical-data security and hospital infrastructure.',
        heroImage: {
          alt: 'A nurse and a physician reviewing a digital documentation screen together at a ward station',
          caption: 'The more interesting part of NAVER healthcare may be less a single patient app and more an operating layer connecting wards, documentation and care workflows.',
        },
        contentHtml: `
          <p>When people hear NAVER healthcare, many still look first for a patient-facing app. But if you line up NAVER's public materials, the more convincing picture looks different. It looks less like a single consumer health product and more like a layered AI stack entering hospitals and public-care workflows.</p>
          <p>This is an inference from public materials, not a line NAVER states in one place. Still, the pattern is fairly consistent. In the current NAVER Cloud privacy center policy effective March 16, 2026, CLOVA CareCall, CLOVA Charty and CLOVA Nursing Agent appear together, while AI speech-recognition-based medical records are also described. Read that next to the March 11, 2025 CLOVA tech blog on Voice EMR and Nursing Agent, and the direction becomes easier to see.</p>
          <p>So the more interesting question is not “what is NAVER's consumer health app?” but “which layers of healthcare work is NAVER trying to change first?”</p>

          <h3>The public service surface already looks broader than a single app</h3>
          <p>Based on the currently public privacy-center materials, NAVER Cloud's healthcare surface is not one thing. CareCall sits closer to outreach and follow-up. Charty and Voice EMR sit closer to voice-based documentation and clinical records. Nursing Agent sits closer to ward communication and prioritization.</p>
          <p>That list alone does not prove the full business strategy. But it does suggest what kind of problems NAVER is choosing to work on. The signal looks less like “one more wellness app” and more like communication, documentation and triage tasks that repeatedly consume clinical time.</p>
          <blockquote>The center of gravity appears to be less consumer health management and more the operating layer that gives clinicians time back.</blockquote>

          <h3>Voice EMR and Nursing Agent point to the clinic room and the ward, not just the patient phone</h3>
          <p>The March 2025 CLOVA tech blog makes that especially clear. Voice EMR is introduced as a service that analyzes physician-patient conversation in real time and organizes medical records. The Healthcare AI team also explains a structure where a lightweight model filters noisy, messy clinical speech before handing selected information to an LLM.</p>
          <p>Nursing Agent is even more operational. NAVER describes a system that classifies patient requests by priority and separates what nurses need to address immediately from what an agent can handle first. In NAVER's own description, the service is operating in the 80 to 90 percent accuracy range and continues to improve. That sounds much more like ward workflow automation than a flashy AI demo.</p>
          <p>This distinction matters. The public face of NAVER's healthcare AI is still closer to redistributing clinical time and documentation load than to replacing medical judgment.</p>

          <h3>CareCall widens the story beyond the hospital walls</h3>
          <p>CareCall makes the picture broader. On the CLOVA AI Research page, the CareCall papers sit inside HCI and digital health and well-being work. That placement suggests NAVER is not thinking only about clinical documentation, but also about how AI supports interaction, follow-up and continuity of care.</p>
          <p>That is important because healthcare AI is often discussed as if the main story were diagnostic intelligence. In reality, many of the earliest practical deployments happen in check-ins, follow-up calls, documentation support and request routing. Seeing CareCall next to EMR and Nursing Agent makes NAVER's priorities look more grounded in that operational reality.</p>

          <h3>Hospitals care about trust, so infrastructure and security matter as much as models</h3>
          <p>In healthcare, a compelling feature is never enough by itself. Hospitals and public institutions also care where data sits, who can access it and how it is protected. NAVER Cloud's current certification page explicitly lists ISO/IEC 27799, which is closely tied to medical information security management.</p>
          <p>The November 2025 NAVER Cloud company brochure points in the same direction. Samsung Medical Center is presented as a case of a secure platform for medical-data research and analysis, while Seoul National University Hospital is presented as a medical-data security case based on network isolation. That makes NAVER's healthcare posture look heavier on hospital-grade data and security foundations than on app distribution alone.</p>

          <h3>So the better way to read NAVER healthcare may be as a Korean clinical AI operating stack</h3>
          <p>Public materials still leave real gaps. They do not fully show commercialization scale, adoption depth or how tightly the pieces are integrated. So it would be too strong to claim a single unified strategy with certainty.</p>
          <p>But the visible pieces do point in the same direction: Korean-language voice documentation, ward agents, care interaction and hospital-grade security infrastructure. That is why NAVER healthcare looks easier to understand as a clinical AI operating stack than as a single consumer app story.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://clova.ai/tech-blog/%EB%84%A4%EC%9D%B4%EB%B2%84-ai-%EC%9D%98%EB%A3%8C%EC%A7%84%EC%9D%98-%EC%8B%9C%EA%B0%84%EC%9D%84-%EB%90%98%EC%B0%BE%EB%8B%A4-healthcare-ai%ED%8C%80%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0" target="_blank" rel="noreferrer">CLOVA Tech Blog: NAVER AI, giving time back to medical staff</a></li>
            <li><a href="https://clova.ai/en/ai-research" target="_blank" rel="noreferrer">CLOVA AI Research: AI Research &amp; Safety</a></li>
            <li><a href="https://privacy.navercloudcorp.com/" target="_blank" rel="noreferrer">NAVER Cloud Privacy Center</a></li>
            <li><a href="https://privacy.navercloudcorp.com/Compliance/certificate_ncc" target="_blank" rel="noreferrer">NAVER Cloud Privacy Center: Certifications</a></li>
            <li><a href="https://www.navercloudcorp.com/NAVER_Cloud_251114_EN.pdf" target="_blank" rel="noreferrer">NAVER Cloud company brochure (Nov. 2025)</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'NAVERヘルスケアを見ていると、アプリより病院のAIが先に浮かびます',
        keywords: ['ヘルスケア'],
        excerpt: 'いまNAVERヘルスケアを読むうえで大事なのは、単一の患者向けアプリを探すことより、CareCall、音声記録、病棟エージェント、医療データ保護を束ねた運用レイヤーを見ることです。',
        heroImage: {
          alt: '病棟ステーションで看護師と医師がデジタル記録画面を一緒に確認している様子',
          caption: 'NAVERヘルスケアの面白さは、患者向けアプリ一つより、病棟と記録業務、ケア動線をつなぐAI運用構造にあるように見えます。',
        },
        contentHtml: `
          <p>NAVERヘルスケアと聞くと、多くの人はまず患者向けアプリの名前を探したくなります。けれど公開資料をつなげて読むと、見えてくる姿は少し違います。消費者向けの健康アプリを一つ大きくするというより、病院や公的ケアの現場に入っていくAIの層を積み上げているように見えるのです。</p>
          <p>これは公開資料をまとめて読んだうえでの解釈です。ただし根拠はあります。2026年3月16日施行のNAVER Cloudプライバシーセンターでは、CLOVA CareCall、CLOVA Charty、CLOVA Nursing Agentが並び、医療向け音声認識による記録処理も示されています。これを2025年3月11日のCLOVA技術ブログにあるVoice EMRとNursing Agentの説明と重ねると、方向性はかなり見えやすくなります。</p>
          <p>だから今見るべき問いは、「NAVERの患者向けアプリは何か」より、「医療業務のどの層から先に変えようとしているのか」なのだと思います。</p>

          <h3>公開されているサービスの断片だけでも、単一アプリの絵には見えません</h3>
          <p>現在公開されているプライバシーセンターの情報を見ると、NAVER Cloudの医療向けサービス面は一つではありません。CareCallはフォローアップや安否確認に近く、ChartyやVoice EMRは音声ベースの文書化や診療記録に近く、Nursing Agentは病棟内コミュニケーションと優先度判断に近い位置にあります。</p>
          <p>もちろん、この一覧だけで事業戦略の全体像を断定することはできません。ただ、どの課題に重心を置いているかはかなり伝わります。つまり「もう一つの健康管理アプリ」より、医療現場で時間を消耗しやすいコミュニケーション、記録、振り分け作業のほうに近いのです。</p>
          <blockquote>重心は消費者向け健康管理より、医療者に時間を返す運用レイヤーのほうにあるように見えます。</blockquote>

          <h3>Voice EMRとNursing Agentは、患者のスマホより診察室と病棟を向いています</h3>
          <p>2025年3月のCLOVA技術ブログでも、その点はかなり明確です。Voice EMRは医師と患者の会話をリアルタイムに解析し、診療記録を整理するサービスとして紹介されています。またHealthcare AIチームは、騒音や発音の乱れが多い臨床環境で、軽量モデルとLLMを組み合わせて必要な情報だけを扱う仕組みを説明しています。</p>
          <p>Nursing Agentはさらに運用寄りです。患者の依頼を優先度で分類し、看護師がすぐ対応すべきものと、エージェントが先に処理できるものを分ける流れが描かれています。NAVERの説明では精度は80〜90%台を維持しながら改善中とのことで、これは派手なAI演出というより病棟業務の自動化に近い話です。</p>
          <p>ここで重要なのは、NAVERの医療AIが今のところ「医療判断の代替」より「記録と対応の時間を再配分する仕組み」として見えていることです。</p>

          <h3>CareCallがあることで、病院の外のケアまで視野に入っているように見えます</h3>
          <p>CareCallが入ると全体像は少し広がります。CLOVA AI Researchのページでは、CareCallの研究がHCIとデジタルヘルス・ウェルビーイングの文脈に置かれています。つまりNAVERは診療記録だけでなく、人とAIの相互作用、フォローアップ、ケアの連続性まで含めて考えているように見えます。</p>
          <p>この点はかなり重要です。ヘルスケアAIはしばしば診断AIとして語られますが、実際に先に入るのは安否確認、問い合わせ対応、文書整理、依頼の振り分けのようなコミュニケーション業務であることが少なくありません。CareCallとEMR、Nursing Agentが並んで見えること自体、NAVERの優先順位がかなり現実的であることを示しているように思えます。</p>

          <h3>病院で使われるには、モデル性能だけでなく保護基盤も必要です</h3>
          <p>ヘルスケアでは、機能の面白さだけでは足りません。病院や公的機関は、データがどこに置かれ、誰がアクセスし、どう守られるのかも同時に見ます。NAVER Cloudの認証ページにISO/IEC 27799が明記されていることは、その意味でかなり象徴的です。医療情報保護と結びついた国際認証だからです。</p>
          <p>2025年11月のNAVER Cloud会社紹介資料も同じ方向を示します。Samsung Medical Centerは医療データ研究・分析向けの安全なプラットフォーム事例として、Seoul National University Hospitalはネットワーク分離による医療データ保護の事例として紹介されています。これはNAVERヘルスケアの重心が、アプリ配布より病院で受け入れられるデータ・保護基盤にあることをうかがわせます。</p>

          <h3>だからNAVERヘルスケアは、患者向けアプリより医療AI運用スタックとして読むほうが自然です</h3>
          <p>公開資料だけでは、商用化の規模や導入の深さ、各要素の結びつきを完全には判断できません。なので単一の統合戦略を断定するのはまだ早いと思います。</p>
          <p>それでも見えている断片はかなり同じ方向を指しています。韓国語の音声記録、病棟エージェント、ケアの相互作用、そして病院向けのデータ保護基盤です。だからこそNAVERヘルスケアは、単一の消費者アプリより、医療現場向けAIの運用スタックとして見るほうが理解しやすいのだと思います。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://clova.ai/tech-blog/%EB%84%A4%EC%9D%B4%EB%B2%84-ai-%EC%9D%98%EB%A3%8C%EC%A7%84%EC%9D%98-%EC%8B%9C%EA%B0%84%EC%9D%84-%EB%90%98%EC%B0%BE%EB%8B%A4-healthcare-ai%ED%8C%80%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0" target="_blank" rel="noreferrer">CLOVA Tech Blog: NAVER AI, 医療者の時間を取り戻す</a></li>
            <li><a href="https://clova.ai/en/ai-research" target="_blank" rel="noreferrer">CLOVA AI Research: AI Research &amp; Safety</a></li>
            <li><a href="https://privacy.navercloudcorp.com/" target="_blank" rel="noreferrer">NAVER Cloud Privacy Center</a></li>
            <li><a href="https://privacy.navercloudcorp.com/Compliance/certificate_ncc" target="_blank" rel="noreferrer">NAVER Cloud Privacy Center: Certifications</a></li>
            <li><a href="https://www.navercloudcorp.com/NAVER_Cloud_251114_EN.pdf" target="_blank" rel="noreferrer">NAVER Cloud company brochure (Nov. 2025)</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'why-ai-trends-now-are-about-productization-speed',
    category: 'ai',
    createdAt: '2026-03-31T22:08:00+09:00',
    heroImage: {
      src: '/blog/ai-productization-speed-hero-generated.webp',
    },
    locales: {
      ko: {
        title: '지금 AI 최신 동향의 핵심은 왜 모델 경쟁보다 제품화 속도에 있을까',
        keywords: ['AI'],
        excerpt: '최근 AI 흐름의 중심은 더 높은 성능표보다, 검색과 도구 호출, 긴 문맥, 실제 실행까지 묶어 일을 끝내는 제품으로 바뀌고 있다는 점에 있습니다.',
        heroImage: {
          alt: '여러 개의 업무 패널과 브라우저 창, 지원 인터페이스가 한 화면에 겹쳐진 에디토리얼 스타일 일러스트',
          caption: '요즘 AI의 차이는 모델 이름 하나보다, 검색하고 정리하고 실행까지 이어지는 제품 경험에서 더 또렷하게 드러납니다.',
        },
        contentHtml: `
          <p>요즘 AI 뉴스를 따라가다 보면 흐름이 너무 빠르게 바뀌어서, 결국 누가 더 똑똑한 모델을 냈는지만 보게 될 때가 많습니다. 이번 주에는 어떤 모델이 더 높은 점수를 받았는지, 누가 더 긴 문맥을 처리하는지, 어떤 벤더가 또 새 버전을 붙였는지부터 확인하게 되니까요.</p>
          <p>그런데 최근 공식 발표들을 이어서 읽어보면 초점은 조금 다른 쪽으로 이동하고 있습니다. 모델 하나의 성능보다, 검색하고, 파일을 읽고, 도구를 부르고, 경우에 따라 컴퓨터까지 직접 다루면서 실제 업무를 끝내게 만드는 제품 구조가 더 중요해지고 있습니다.</p>
          <p>그래서 저는 지금 AI 최신 동향의 핵심을 단순한 모델 경쟁보다 <strong>제품화 속도</strong>에서 보는 편이 더 정확하다고 생각합니다. AI가 얼마나 똑똑한가보다, 얼마나 빨리 실제 작업 흐름 안으로 들어가고 있는가가 시장의 결을 더 잘 보여주기 때문입니다.</p>

          <h3>이제 경쟁 단위는 모델 점수보다 완료율에 가까워졌습니다</h3>
          <p>OpenAI 개발자 문서는 지금 시작 모델로 GPT-5.4를 전면에 두고 있습니다. 그런데 그 설명을 보면 단순한 텍스트 모델 소개에 머물지 않습니다. Web search, file search, image generation, code interpreter, hosted shell, computer use, MCP 같은 도구 지원이 같은 문맥 안에서 함께 제시됩니다.</p>
          <p>Google도 비슷합니다. 최근 Gemini 3.1 Pro와 3.1 Flash-Lite를 소개하면서 API, Vertex AI, 앱, NotebookLM까지 한 번에 묶어 말하고 있습니다. Anthropic 역시 Sonnet 4.6 발표에서 1M 토큰 문맥, computer use, web search, memory, compaction, 각종 도구 연계를 함께 전면에 세웠습니다.</p>
          <blockquote>지금 AI 시장의 질문은 누가 가장 똑똑한가보다, 누가 가장 자주 일을 끝내게 만드는가에 더 가까워졌습니다.</blockquote>
          <p>이 변화는 꽤 중요합니다. 예전에는 모델이 좋으면 그 위에 제품을 얹는다는 느낌이 강했다면, 지금은 모델과 도구, 실행 환경, UI, 비용 구조가 하나의 제품으로 묶여 움직입니다. 실무자 입장에서는 성능표 한 줄보다 실제 완료율과 handoff 감소가 더 중요한 지표가 됩니다.</p>

          <h3>멀티모달과 긴 문맥은 더 이상 부가 기능이 아닙니다</h3>
          <p>최근 발표를 보면 멀티모달과 긴 문맥은 더 이상 “있으면 좋은 기능”처럼 소개되지 않습니다. Google은 Gemini 3.1 Flash-Lite를 대규모 고빈도 워크로드용 모델로 설명하면서 속도와 비용을 강조했고, 앞선 2.5 계열에서는 도구 연결과 1M 문맥 길이를 분명히 전면에 내세웠습니다.</p>
          <p>Anthropic도 Sonnet 4.6에서 1M 토큰 문맥을 코드베이스, 계약서, 연구 문서처럼 실제로 긴 자료를 한 번에 다뤄야 하는 작업과 연결해 설명합니다. OpenAI 역시 최신 모델 페이지에서 긴 문맥과 함께 vision, file search, computer use 같은 실전 도구를 묶어서 보여줍니다.</p>
          <p>이 말은 결국 AI가 더 이상 한두 문단짜리 프롬프트 놀이에 머물지 않는다는 뜻입니다. 이제는 문서 묶음, 스프레드시트, 브라우저 탭, 이미지, 검색 결과처럼 실제 업무에 흩어진 재료를 같은 흐름 안에서 다루는 쪽이 표준에 가까워지고 있습니다.</p>

          <h3>코파일럿에서 오퍼레이터로 이동하지만, 인간 검토는 더 중요해졌습니다</h3>
          <p>흥미로운 점은 제품 경험이 더 자율적으로 바뀌고 있다는 사실입니다. Meta는 최근 Facebook과 Instagram 안에서 Meta AI support assistant를 글로벌하게 확대하면서, 단순 답변이 아니라 비밀번호 재설정이나 프로필 설정 변경처럼 사용자의 문제를 처음부터 끝까지 해결하도록 설계했다고 설명했습니다.</p>
          <p>이런 움직임만 보면 이제 AI가 곧바로 사람을 완전히 대신할 것처럼 보일 수 있습니다. 하지만 같은 시기에 나온 Anthropic Economic Index는 조금 더 현실적인 장면을 보여줍니다. Claude.ai에서는 자동화보다 보조와 협업이 다시 더 많아졌고, 가장 많이 쓰이는 작업도 여전히 코딩 수정이나 문서 작업처럼 사람의 검토가 남아 있는 영역에 집중되어 있습니다.</p>
          <p>즉, 최근 흐름은 “완전 자동화가 바로 온다”보다 “AI가 더 많은 단계를 맡되, 중요한 판단은 여전히 사람과 함께 묶인다”에 가깝습니다. 제품은 점점 오퍼레이터처럼 보이지만, 실제 실무에서는 인간 검토 지점을 어디에 두는지가 오히려 더 중요해지고 있습니다.</p>

          <h3>지금 실무자가 진짜 봐야 할 것은 모델 순위표가 아닙니다</h3>
          <p>그래서 AI 흐름을 빠르게 따라가야 하는 사람이라면, 매주 모델 이름만 바뀌는 뉴스를 좇는 것보다 아래 질문을 먼저 보는 편이 낫습니다.</p>
          <ul>
            <li>이 모델은 검색, 파일, 브라우저, 사내 도구까지 실제 작업 재료를 얼마나 자연스럽게 연결하는가</li>
            <li>속도와 비용, reasoning 설정이 내 업무 빈도와 맞는가</li>
            <li>결과를 바로 실행해도 되는가, 아니면 어디에서 사람 검토를 넣어야 하는가</li>
            <li>한 번의 멋진 데모가 아니라, 반복 업무에서 실제로 시간을 줄여주는가</li>
          </ul>
          <p>지금 강한 팀은 가장 비싼 모델만 붙이는 팀이 아니라, 어떤 작업은 빠르게 처리하고 어떤 작업은 깊게 검토해야 하는지 구분하는 팀입니다. 모델을 고르는 일보다 흐름을 설계하는 일이 더 중요해진 셈입니다.</p>

          <h3>결국 최신성의 핵심은 더 좋은 모델이 아니라 더 빠른 제품화입니다</h3>
          <p>물론 모델 성능 경쟁 자체가 끝난 것은 아닙니다. 여전히 더 긴 문맥, 더 나은 추론, 더 강한 코드 처리 능력은 중요합니다. 다만 그 성능이 시장에서 의미를 가지는 방식이 달라졌습니다. 이제는 그 성능이 얼마나 빨리 실제 UI와 도구, 워크플로 안으로 들어가느냐가 더 큰 차이를 만듭니다.</p>
          <p>그래서 지금 AI 최신 동향을 한 줄로 요약하면 이렇습니다. <strong>벤치마크 경쟁은 계속되지만, 진짜 승부는 제품화 속도에서 난다.</strong> 앞으로도 새 모델 소식은 계속 쏟아지겠지만, 실제로 오래 남는 차이는 결국 일을 끝내는 경험을 누가 더 잘 만들었는지에서 드러날 가능성이 높습니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://developers.openai.com/api/docs/models" target="_blank" rel="noreferrer">OpenAI API Docs: Models overview</a></li>
            <li><a href="https://developers.openai.com/api/docs/models/gpt-5.4" target="_blank" rel="noreferrer">OpenAI API Docs: GPT-5.4</a></li>
            <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/" target="_blank" rel="noreferrer">Google: Gemini 3.1 Pro</a></li>
            <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite" target="_blank" rel="noreferrer">Google: Gemini 3.1 Flash-Lite</a></li>
            <li><a href="https://www.anthropic.com/news/claude-sonnet-4-6" target="_blank" rel="noreferrer">Anthropic: Introducing Claude Sonnet 4.6</a></li>
            <li><a href="https://www.anthropic.com/research/anthropic-economic-index-january-2026-report" target="_blank" rel="noreferrer">Anthropic Economic Index report: Economic primitives</a></li>
            <li><a href="https://about.fb.com/news/2026/03/boosting-your-support-and-safety-on-metas-apps-with-ai/" target="_blank" rel="noreferrer">Meta: Boosting Your Support and Safety on Meta's Apps With AI</a></li>
          </ul>
        `,
      },
      en: {
        title: 'Why the Real AI Trend Now Is Productization Speed, Not Just Model Rankings',
        keywords: ['AI'],
        excerpt: 'The latest AI shift is not only about higher benchmark scores. It is about turning search, tools, long context, and execution into products that actually finish work.',
        heroImage: {
          alt: 'An editorial-style illustration of overlapping work panels, browser windows, and support interfaces on a single screen',
          caption: 'The clearest AI differences now show up less in model names and more in product experiences that can search, organize, and act in one flow.',
        },
        contentHtml: `
          <p>If you follow AI news every day, it is easy to think the whole story is still a race of model names. Which model scored higher, which lab shipped the longer context window, which release looks strongest this week.</p>
          <p>But when you line up the recent official announcements, the center of gravity looks a little different. What matters more now is not only how smart the model is on its own, but how quickly it is being turned into a product that can search, read files, call tools, and in some cases even operate a computer to finish real work.</p>
          <p>That is why I think the most useful way to read the latest AI trend is through <strong>productization speed</strong>, not just model competition. The smarter question is no longer only who built the best model, but who is moving that capability into everyday workflows the fastest.</p>

          <h3>The unit of competition is moving closer to completion rate</h3>
          <p>OpenAI's current API docs place GPT-5.4 at the front, but the important part is how it is presented. The model page is not just about text generation. It sits next to web search, file search, image generation, code interpreter, hosted shell, computer use, and MCP support as part of one usable system.</p>
          <p>Google is telling a similar story. Its recent Gemini 3.1 Pro and 3.1 Flash-Lite releases are framed across the API, Vertex AI, consumer products, and enterprise surfaces at once. Anthropic does the same with Sonnet 4.6, emphasizing a 1M-token context window, computer use, web search, memory, compaction, and broader tool support.</p>
          <blockquote>The market question is shifting from who is smartest to who can help users finish work more often.</blockquote>
          <p>That change matters. A year ago, it still made sense to think of a model first and a product second. Now the model, the tool layer, the interface, and the cost-speed tradeoff increasingly arrive as one package. In practice, users care less about a leaderboard line and more about whether the system reduces handoffs and actually closes the loop.</p>

          <h3>Multimodality and long context are becoming work conditions, not bonus features</h3>
          <p>Recent releases no longer treat multimodality and long context as side benefits. Google describes Gemini 3.1 Flash-Lite as a model for high-volume workloads where cost and speed matter, while its recent Gemini family messaging also keeps tools and large context lengths close to the center. Anthropic describes Sonnet 4.6's 1M-token context in terms of codebases, contracts, and research documents, not as a lab curiosity.</p>
          <p>OpenAI's latest model pages also combine long context with vision and tool use in a way that points to real task environments rather than isolated prompts. The practical meaning is simple: AI is moving away from short prompt-response moments and toward handling the messy set of materials that real work actually uses.</p>
          <p>Documents, spreadsheets, browser tabs, images, search results, and internal tools are becoming part of the same operating surface. That is a bigger shift than any single benchmark chart.</p>

          <h3>We are moving from copilots to operators, but human review matters more, not less</h3>
          <p>Another notable change is that AI products are becoming more action-oriented. Meta's recent support announcement describes the Meta AI support assistant not as a system that only answers questions, but as one that can help resolve account problems from start to finish, including actions like password resets and profile updates.</p>
          <p>That could make the present moment look more automated than it really is. Anthropic's January 15, 2026 Economic Index offers a more grounded picture. On Claude.ai, augmentation became more common again than automation, and the most common tasks remained concentrated in coding fixes and other domains where people still review, refine, and steer the work.</p>
          <p>So the real direction is not full replacement overnight. It is that AI is taking over more steps while humans keep the review points that matter. Products are starting to feel more like operators, but in real work the placement of human judgment is becoming even more important.</p>

          <h3>What professionals should watch now</h3>
          <p>For anyone trying to keep up with AI seriously, it is more useful to ask a few practical questions than to chase every new ranking.</p>
          <ul>
            <li>How well does this system connect search, files, browsers, and internal tools into one workflow?</li>
            <li>Do its latency, cost, and reasoning settings fit the frequency and stakes of my work?</li>
            <li>Where should a person still review before the output is allowed to act?</li>
            <li>Does it save time in repeated work, not just in a polished demo?</li>
          </ul>
          <p>The teams that use AI well are rarely the teams that only buy the biggest model. They are the teams that separate fast tasks from deep ones and design the handoff between automation and judgment carefully.</p>

          <h3>The latest edge comes from shipping, not just inventing</h3>
          <p>None of this means model quality stopped mattering. Better reasoning, stronger coding, and larger usable context windows are still central. What has changed is how that quality becomes valuable in the market. The bigger difference now comes from how quickly those gains are turned into tools, interfaces, and workflow products people can actually use.</p>
          <p>So if I had to summarize the current AI trend in one line, it would be this: <strong>benchmark competition continues, but the real race is in productization speed.</strong> New models will keep arriving. The more durable difference, though, will likely be who turns them into dependable work experiences the fastest.</p>

          <h3>Sources</h3>
          <ul>
            <li><a href="https://developers.openai.com/api/docs/models" target="_blank" rel="noreferrer">OpenAI API Docs: Models overview</a></li>
            <li><a href="https://developers.openai.com/api/docs/models/gpt-5.4" target="_blank" rel="noreferrer">OpenAI API Docs: GPT-5.4</a></li>
            <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/" target="_blank" rel="noreferrer">Google: Gemini 3.1 Pro</a></li>
            <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite" target="_blank" rel="noreferrer">Google: Gemini 3.1 Flash-Lite</a></li>
            <li><a href="https://www.anthropic.com/news/claude-sonnet-4-6" target="_blank" rel="noreferrer">Anthropic: Introducing Claude Sonnet 4.6</a></li>
            <li><a href="https://www.anthropic.com/research/anthropic-economic-index-january-2026-report" target="_blank" rel="noreferrer">Anthropic Economic Index report: Economic primitives</a></li>
            <li><a href="https://about.fb.com/news/2026/03/boosting-your-support-and-safety-on-metas-apps-with-ai/" target="_blank" rel="noreferrer">Meta: Boosting Your Support and Safety on Meta's Apps With AI</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'いまAIの最新動向で本当に重要なのは、モデル競争より製品化の速さです',
        keywords: ['AI'],
        excerpt: '最近のAIの変化は、単に性能表が上がることではありません。検索、ツール、長い文脈、実行までを束ねて、実際に仕事を終わらせる製品へ移っている点にあります。',
        heroImage: {
          alt: '複数の業務パネル、ブラウザ画面、サポート画面が重なって見えるエディトリアル風のイラスト',
          caption: 'いまAIの差が最もはっきり出るのは、モデル名よりも、検索して整理し実行までつなぐ製品体験のほうです。',
        },
        contentHtml: `
          <p>毎日のようにAIニュースを追っていると、結局はモデル名の競争だけが続いているように見えることがあります。どこがより高いスコアを出したのか、どのモデルがより長い文脈を扱えるのか、今週は誰が新しい版を出したのか。</p>
          <p>ただ、最近の公式発表を並べて読むと、重心は少し別の場所へ移っています。大事なのはモデル単体の賢さだけではなく、それがどれだけ早く検索、ファイル読解、ツール呼び出し、場合によってはコンピュータ操作まで含む製品へ変わり、現実の仕事を終わらせるところまで届いているかです。</p>
          <p>だから私は、いまのAI最新動向を読むとき、単純なモデル競争より <strong>製品化の速さ</strong> を軸に見るほうが自然だと思っています。誰が最も強いモデルを作ったかだけでなく、その能力を誰がいちばん早く日常のワークフローに落とし込んでいるかが、いまの市場をよく表しているからです。</p>

          <h3>競争の単位は、スコアより完了率に近づいています</h3>
          <p>OpenAIの現行APIドキュメントはGPT-5.4を前面に置いていますが、重要なのはその見せ方です。単なるテキスト生成モデルとしてではなく、web search、file search、image generation、code interpreter、hosted shell、computer use、MCPといった機能群と一体のものとして提示されています。</p>
          <p>Googleも似た流れです。Gemini 3.1 Proや3.1 Flash-Liteの説明では、API、Vertex AI、一般向け製品、企業向け製品までを一つの流れで語っています。AnthropicもSonnet 4.6で、1Mトークン文脈、computer use、web search、memory、compaction、各種ツール連携をまとめて前面に出しています。</p>
          <blockquote>いまの市場の問いは、誰が最も賢いかより、誰が最も多くの仕事を最後まで終わらせられるかに近づいています。</blockquote>
          <p>この変化は小さくありません。以前はまずモデルがあり、その上に製品が載る感覚でした。今はモデル、ツール層、UI、速度とコストの設計が最初から一つの製品として動いています。実務では、リーダーボードの順位より、手戻りを減らして本当にループを閉じられるかが重要になります。</p>

          <h3>マルチモーダルと長い文脈は、もう追加機能ではありません</h3>
          <p>最近の発表では、マルチモーダルや長い文脈は「あると便利」な要素として扱われていません。GoogleはGemini 3.1 Flash-Liteを高頻度・大規模ワークロード向けに位置づけ、速度とコストを前面に出していますし、近年のGemini系発表でもツール連携と大きな文脈長が中心にあります。AnthropicもSonnet 4.6の1Mトークン文脈を、コードベース、契約書、研究資料のような現実の長い作業材料と結びつけて説明しています。</p>
          <p>OpenAIの最新モデルページも、長い文脈をvisionや各種ツールと並べて示しています。つまりAIは、短いプロンプト一往復の世界から離れ、実際の仕事で散らばっている材料を同じ流れで扱う方向へ進んでいるということです。</p>
          <p>文書、表計算、ブラウザのタブ、画像、検索結果、社内ツールが同じ作業面に乗ってくる。ここが最近の大きな変化であり、単一のベンチマークより意味のある動きだと思います。</p>

          <h3>コパイロットからオペレーターへ進みつつありますが、人の確認はむしろ重要です</h3>
          <p>もう一つ目立つのは、AI製品がより行動的になっていることです。Metaは最近、FacebookとInstagramでMeta AI support assistantの展開を広げ、単に質問に答えるだけでなく、パスワード再設定やプロフィール設定変更のように、問題解決を最初から最後まで支援する形を打ち出しました。</p>
          <p>こうした動きだけを見ると、すぐに完全自動化へ向かっているようにも見えます。ただ、Anthropicが2026年1月15日に公開したEconomic Indexは、もう少し現実的な景色を見せています。Claude.aiでは自動化よりも補助・協働の利用が再び多くなり、中心的な用途も依然としてコード修正や文書作業のように、人が見直しながら進める領域に集中していました。</p>
          <p>つまり本当の流れは、「一気に完全代替」ではなく、「AIが受け持つ工程は増えるが、重要な判断点には人が残る」という方向です。製品はますますオペレーターのように見えても、実務では人間の判断をどこに置くかが、かえって前より重要になっています。</p>

          <h3>いま実務者が本当に見るべきもの</h3>
          <p>だからAIを本気で追う人ほど、毎週のモデル順位より、次のような問いを先に見たほうが実用的です。</p>
          <ul>
            <li>検索、ファイル、ブラウザ、社内ツールを一つの流れにどれだけ自然につなげられるか</li>
            <li>速度、コスト、reasoning設定が自分の仕事の頻度と重さに合っているか</li>
            <li>どこまで自動で動かし、どこで人が確認すべきか</li>
            <li>一度きりのデモではなく、繰り返し業務で本当に時間を減らせるか</li>
          </ul>
          <p>AIをうまく使っているチームは、常に一番大きいモデルだけを選んでいるわけではありません。速く終える仕事と、深く考える仕事を分け、そこに合う流れを設計しているチームです。モデル選び以上に、フロー設計が重要になってきたとも言えます。</p>

          <h3>結局、最新性の本質は発明より実装の速さにあります</h3>
          <p>もちろんモデル性能そのものが不要になったわけではありません。より良い推論、より強いコーディング能力、より大きく使える文脈長は今も重要です。ただ、その価値が市場で現れる仕方が変わりました。いま大きな差になるのは、その能力がどれだけ早くツール、UI、実務ワークフローへ組み込まれるかです。</p>
          <p>だから、いまのAI最新動向を一行でまとめるならこうです。<strong>ベンチマーク競争は続いているが、本当の勝負は製品化の速さで決まる。</strong> 新しいモデルはこれからも次々に出てくるはずです。でも長く残る差は、結局それを誰がいちばん信頼できる仕事体験へ変えたかに表れる可能性が高いと思います。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://developers.openai.com/api/docs/models" target="_blank" rel="noreferrer">OpenAI API Docs: Models overview</a></li>
            <li><a href="https://developers.openai.com/api/docs/models/gpt-5.4" target="_blank" rel="noreferrer">OpenAI API Docs: GPT-5.4</a></li>
            <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/" target="_blank" rel="noreferrer">Google: Gemini 3.1 Pro</a></li>
            <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-flash-lite" target="_blank" rel="noreferrer">Google: Gemini 3.1 Flash-Lite</a></li>
            <li><a href="https://www.anthropic.com/news/claude-sonnet-4-6" target="_blank" rel="noreferrer">Anthropic: Introducing Claude Sonnet 4.6</a></li>
            <li><a href="https://www.anthropic.com/research/anthropic-economic-index-january-2026-report" target="_blank" rel="noreferrer">Anthropic Economic Index report: Economic primitives</a></li>
            <li><a href="https://about.fb.com/news/2026/03/boosting-your-support-and-safety-on-metas-apps-with-ai/" target="_blank" rel="noreferrer">Meta: Boosting Your Support and Safety on Meta's Apps With AI</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'what-you-miss-if-you-see-jnpmedi-only-as-clinical-trial-saas',
    category: 'healthcare',
    createdAt: '2026-03-31T11:55:00+09:00',
    heroImage: {
      src: '/blog/jnpmedi-rdc-hero-generated.webp',
    },
    locales: {
      ko: {
        title: '제이앤피메디를 임상시험 SaaS로만 보면 놓치는 것들',
        keywords: ['헬스케어'],
        excerpt: '제이앤피메디를 단순한 임상시험 소프트웨어 회사로 이해하면 사업의 절반만 보게 됩니다. 메이븐 클리니컬 클라우드와 프로페셔널 서비스가 함께 움직이는 구조를 봐야 이 회사의 방향이 더 선명해집니다.',
        heroImage: {
          alt: '임상 운영 전략 회의실에서 세 명의 실무자가 데이터 대시보드와 시험 운영 흐름도를 함께 검토하는 모습',
          caption: '제이앤피메디를 이해할 때 중요한 것은 화면 하나보다, 임상 운영과 데이터, 규제 대응을 한 흐름으로 엮으려는 방식입니다.',
        },
        contentHtml: `
          <p>제이앤피메디를 처음 접하면 많은 사람이 먼저 소프트웨어 회사를 떠올립니다. 실제로 가장 먼저 눈에 들어오는 것도 메이븐 클리니컬 클라우드이고, 외부 기사에서도 종종 임상시험 데이터 플랫폼 기업으로 소개되기 때문입니다.</p>
          <p>그런데 회사가 스스로를 설명하는 문장을 조금만 더 자세히 보면 이야기가 달라집니다. 제이앤피메디는 단순한 임상시험 SaaS 기업이 아니라, 메이븐 클리니컬 클라우드를 중심으로 프로페셔널 서비스를 결합해 연구개발과 상용화까지 잇는 <strong>Life Science RDC company</strong>라고 자신을 소개합니다.</p>
          <p>이 차이는 생각보다 큽니다. 임상시험용 소프트웨어를 파는 회사로 읽느냐, 라이프사이언스 사업의 실행 구조를 설계하는 회사로 읽느냐에 따라 제이앤피메디의 현재 위치와 앞으로의 방향이 완전히 다르게 보이기 때문입니다.</p>

          <h3>메이븐이 있다는 사실보다, 메이븐만으로 설명되지 않는다는 점이 중요합니다</h3>
          <p>메이븐 클리니컬 클라우드는 분명 제이앤피메디의 중심축입니다. 설립 초기 투자 유치 기사에서도 회사는 메이븐을 제약, 바이오, 디지털 치료제, 디지털 의료기기까지 폭넓게 적용 가능한 임상시험 데이터 관리 플랫폼으로 설명했습니다. 여기까지만 보면 “국산 임상시험 SaaS 회사”라는 이해가 크게 틀린 말은 아닙니다.</p>
          <p>하지만 지금의 제이앤피메디를 보려면 이 한 줄 설명에서 한 발 더 나아가야 합니다. 회사 메인 페이지와 프로페셔널 서비스 소개를 보면, 메이븐은 단일 제품이라기보다 임상 운영과 데이터 관리 전반을 얹을 수 있는 운영 레이어에 가깝게 배치되어 있습니다.</p>
          <blockquote>즉, 메이븐은 이 회사의 전부라기보다 기반에 가깝고, 제이앤피메디는 그 기반 위에 어떤 서비스를 얹을 것인가까지 같이 설계하려는 회사로 읽는 편이 더 정확합니다.</blockquote>

          <h3>핵심은 기능 수보다 모듈이 닿는 범위입니다</h3>
          <p>프로페셔널 서비스 페이지를 보면 제이앤피메디가 왜 자신을 RDC라고 부르는지 감이 옵니다. 이 회사는 대상자 모집과 원격 방문, 전자 동의, 무작위배정 같은 분산형 임상시험 요소를 묶은 DCT 스위트뿐 아니라, 투자와 라이선싱을 위한 가상 데이터룸, 문서 관리, eTMF, 프로젝트 매니지먼트, 클라우드 운영까지 한 회사의 범위 안에 두고 있습니다.</p>
          <p>이 구조가 의미 있는 이유는 임상 현장에서 문제가 늘 한 군데에서만 생기지 않기 때문입니다. 실제 프로젝트에서는 피험자 모집, 데이터 수집, 문서 관리, 규제 대응, 투자 실사, 해외 파트너 커뮤니케이션이 따로 움직이지 않습니다. 어느 한쪽이 막히면 나머지도 같이 느려집니다.</p>
          <p>그래서 제이앤피메디를 제대로 보려면 “어떤 기능이 있나”보다 “어디까지 하나의 흐름으로 엮으려 하나”를 먼저 봐야 합니다. 그 기준으로 보면 이 회사는 기능형 툴 벤더보다 운영형 파트너에 조금 더 가까워 보입니다.</p>

          <h3>분산형 임상시험을 대하는 태도도 이 회사의 성격을 잘 보여줍니다</h3>
          <p>제이앤피메디가 일찍부터 분산형 임상시험을 전면에 둔 것도 같은 맥락에서 읽힙니다. 회사는 KiMES와 KoNECT 같은 현장에서 DCT 플랫폼을 꾸준히 소개해 왔고, 미국 FDA가 분산형 요소를 포함한 임상시험 최종 가이드를 내놓았을 때는 한국어 번역본까지 배포했습니다.</p>
          <p>이 장면이 중요한 이유는, 단순히 원격 전자 동의나 eCOA 같은 기능을 갖췄다는 얘기에서 끝나지 않기 때문입니다. 규제가 어떻게 정리되고 있고, 현장에서는 그 변화가 어떤 운영 문제로 이어지는지까지 같이 해석해 주는 쪽으로 움직였다는 뜻에 가깝습니다.</p>
          <p>헬스케어 산업에서는 기능보다 해석이 더 비쌀 때가 많습니다. 특히 디지털 치료제나 디지털 의료기기처럼 제품과 임상, 규제 문서, 데이터 설계가 서로 강하게 얽힌 분야에서는 더 그렇습니다.</p>

          <h3>최근의 확장 포인트는 소프트웨어 판매보다 실행 서비스 쪽에 더 가깝습니다</h3>
          <p>외부 보도를 보면 제이앤피메디는 최근 CRO와 컨설팅 서비스 확장을 전면에 내세우고 있습니다. 전자신문은 회사가 CRO와 컨설팅 서비스 확대를 통해 매출이 크게 성장했다고 전했고, 공식 행사인 JNPMEDI CONNECT도 규제, 임상 운영, AI 기반 데이터 전략, 투자 트렌드를 한꺼번에 다루는 방식으로 기획됐습니다.</p>
          <p>이 흐름은 꽤 상징적입니다. 보통 소프트웨어 기업이라면 제품 기능 고도화를 중심 서사로 밀기 쉽습니다. 그런데 제이앤피메디는 최근 커뮤니케이션에서 오히려 제품 기능 자체보다, 규제 대응부터 글로벌 개발 전략, 데이터 운영, 투자와 라이선스까지 이어지는 실행 역량을 함께 보여주려는 모습이 더 강합니다.</p>
          <ul>
            <li>메이븐은 데이터와 운영의 기반으로 남고,</li>
            <li>프로페셔널 서비스는 그 위에서 실제 프로젝트를 굴리는 손발 역할을 하며,</li>
            <li>회사의 자기 정의는 점점 “툴 제공자”보다 “실행 구조를 설계하는 파트너” 쪽으로 옮겨갑니다.</li>
          </ul>

          <h3>그래서 제이앤피메디는 임상시험용 소프트웨어 회사보다 ‘실행 레이어 회사’로 보는 편이 맞습니다</h3>
          <p>개인적으로 제이앤피메디를 흥미롭게 보는 이유도 여기에 있습니다. 국내에서 임상시험 디지털화 이야기를 하면 종종 eConsent나 ePRO 같은 개별 기능 단위로 대화가 쪼개지는데, 제이앤피메디는 비교적 일찍부터 그 기능들을 한 회사의 운영 모델 안에 넣으려 했기 때문입니다.</p>
          <p>물론 앞으로 봐야 할 숙제도 분명합니다. 서비스 범위가 넓어질수록 특정 영역의 깊이가 약해질 수 있고, 플랫폼과 컨설팅을 동시에 가져가는 구조는 반복 가능한 표준화와 사람 의존도를 함께 관리해야 합니다. 또 글로벌 확장 국면에서는 규제 준수, 문서 품질, 데이터 표준화 수준이 더 날카롭게 검증될 수밖에 없습니다.</p>
          <p>그럼에도 지금 시점에서 제이앤피메디를 단순한 임상시험 SaaS로만 읽는 것은 아쉽습니다. 이 회사는 메이븐을 파는 곳이라기보다, 메이븐을 기반으로 임상과 데이터, 규제, 사업 개발의 접점을 하나의 실행 구조로 묶으려는 회사에 더 가깝기 때문입니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://www.jnpmedi.com/" target="_blank" rel="noreferrer">JNPMEDI 공식 홈페이지</a></li>
            <li><a href="https://www.jnpmedi.com/professional_services" target="_blank" rel="noreferrer">JNPMEDI Professional Services</a></li>
            <li><a href="https://www.jnpmedi.com/media/?bmode=view&idx=112327110" target="_blank" rel="noreferrer">제이앤피메디, FDA DCT 최종 지침 한국어 번역본 배포</a></li>
            <li><a href="https://www.jnpmedi.com/media/?bmode=view&idx=167442583" target="_blank" rel="noreferrer">2025 JNPMEDI CONNECT 개최</a></li>
            <li><a href="https://www.etnews.com/20221122000152" target="_blank" rel="noreferrer">전자신문, 140억원 시리즈A 투자 유치</a></li>
            <li><a href="https://m.etnews.com/20250130000049?obj=Tzo4OiJzdGRDbGFzcyI6Mjp7czo3OiJyZWZlcmVyIjtOO3M6NzoiZm9yd2FyZCI7czoxMzoid2ViIHRvIG1vYmlsZSI7fQ%3D%3D" target="_blank" rel="noreferrer">전자신문, CRO·컨설팅 서비스 확장과 매출 성장</a></li>
            <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/decentralized-clinical-trials-drugs-biological-products-and-devices" target="_blank" rel="noreferrer">FDA, Conducting Clinical Trials With Decentralized Elements</a></li>
          </ul>
        `,
      },
      en: {
        title: 'What You Miss If You See JNPMEDI Only as a Clinical Trial SaaS Company',
        keywords: ['Healthcare'],
        excerpt: 'If you describe JNPMEDI only as a clinical trial software company, you only see half of the picture. The combination of Maven Clinical Cloud and professional services explains the company much better.',
        heroImage: {
          alt: 'Three professionals in a clinical operations meeting reviewing dashboards and trial workflow diagrams on a large screen',
          caption: 'The point of JNPMEDI is not a single interface but the attempt to connect trial operations, data management, and regulatory execution into one working structure.',
        },
        contentHtml: `
          <p>When people first come across JNPMEDI, many of them naturally think of a software company. That reaction makes sense. Maven Clinical Cloud is the most visible product, and outside coverage often introduces the company as a clinical trial data platform provider.</p>
          <p>But once you look more carefully at how the company describes itself, the framing starts to shift. JNPMEDI does not stop at calling itself a clinical trial SaaS business. On its official site, it describes itself as a <strong>Life Science RDC company</strong> that combines Maven Clinical Cloud with professional services spanning development, clinical research, regulatory work, and licensing.</p>
          <p>That difference matters. Reading JNPMEDI as a software vendor leads to one conclusion. Reading it as a company trying to design the execution layer of life science projects leads to a very different one.</p>

          <h3>Maven matters, but Maven alone does not explain the company anymore</h3>
          <p>Maven Clinical Cloud is still the core foundation. Earlier investment coverage described it as a proprietary clinical trial data platform that could be applied across pharma, biotech, digital therapeutics, and digital medical devices. At that stage, the “clinical SaaS” label was understandable.</p>
          <p>Today, though, that label feels incomplete. JNPMEDI’s homepage and service pages make it clear that Maven is being positioned less like a standalone product and more like an operating layer on top of which the company can deliver broader execution support.</p>
          <blockquote>In other words, Maven looks less like the whole business and more like the base layer that allows the rest of the business to exist.</blockquote>

          <h3>The real signal is not the feature list but the range of workflow it touches</h3>
          <p>The professional services page is especially revealing. JNPMEDI places decentralized trial modules such as eConsent, screening, remote visits, and RTSM next to investment and licensing support, document management, eTMF, project management, and AWS-based cloud services.</p>
          <p>That mix is important because clinical projects rarely break in just one place. Recruitment, data capture, documentation, compliance, due diligence, and partner communication usually move together. When one layer slows down, the rest of the program tends to feel it as well.</p>
          <p>That is why JNPMEDI makes more sense when you ask not “what features does it sell?” but “how much of the operating chain is it trying to connect?” By that standard, it increasingly looks closer to an execution partner than a narrow tool vendor.</p>

          <h3>Its approach to decentralized trials says a lot about how the company thinks</h3>
          <p>JNPMEDI has been early and explicit about decentralized clinical trials. The company has repeatedly presented DCT-related capabilities in industry venues, and when the FDA finalized its guidance on conducting clinical trials with decentralized elements, JNPMEDI even distributed a Korean translation.</p>
          <p>That is a meaningful signal. It suggests the company is not only selling remote-trial features but also trying to interpret how regulatory change should be translated into actual operating practice for local teams.</p>
          <p>In healthcare, interpretation can be as valuable as functionality. That is especially true in areas such as digital therapeutics and digital medical devices, where product strategy, trial design, documentation, and data architecture are tightly linked.</p>

          <h3>The recent expansion story is really about services as much as software</h3>
          <p>Recent coverage also points in that direction. External reporting has highlighted the company’s expansion in CRO and consulting services, while JNPMEDI’s own CONNECT event has framed its agenda around regulation, clinical operations, AI-based data strategy, and investment trends rather than software features alone.</p>
          <p>That is telling. A pure software company usually keeps the spotlight on product capability. JNPMEDI, by contrast, increasingly presents itself through the lens of execution across the full life science pathway.</p>
          <ul>
            <li>Maven remains the data and operations foundation.</li>
            <li>Professional services become the hands-on layer that moves projects forward.</li>
            <li>The company’s identity shifts from selling tools to shaping execution structure.</li>
          </ul>

          <h3>So the better way to read JNPMEDI is as an execution-layer company</h3>
          <p>That is what makes JNPMEDI interesting to watch. Discussions about clinical trial digitization often get fragmented into feature-level talk about eConsent, ePRO, or remote visits. JNPMEDI has been trying to place those pieces inside a larger operating model much earlier than many people realize.</p>
          <p>There are still open questions, of course. The broader the service scope becomes, the harder it is to keep depth and repeatability at the same time. A company that combines platform and consulting has to manage both product standardization and human dependency very carefully. Global expansion will also bring sharper scrutiny on compliance, document quality, and data standards.</p>
          <p>Even so, calling JNPMEDI only a clinical trial SaaS company now feels too small. It looks more like a company trying to bind clinical operations, data, regulation, and business development into one practical execution model built on top of Maven.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://www.jnpmedi.com/" target="_blank" rel="noreferrer">JNPMEDI official website</a></li>
            <li><a href="https://www.jnpmedi.com/professional_services" target="_blank" rel="noreferrer">JNPMEDI Professional Services</a></li>
            <li><a href="https://www.jnpmedi.com/media/?bmode=view&idx=112327110" target="_blank" rel="noreferrer">JNPMEDI: Korean translation of FDA DCT final guidance</a></li>
            <li><a href="https://www.jnpmedi.com/media/?bmode=view&idx=167442583" target="_blank" rel="noreferrer">2025 JNPMEDI CONNECT</a></li>
            <li><a href="https://www.etnews.com/20221122000152" target="_blank" rel="noreferrer">ETNews: Series A investment in JNPMEDI</a></li>
            <li><a href="https://m.etnews.com/20250130000049?obj=Tzo4OiJzdGRDbGFzcyI6Mjp7czo3OiJyZWZlcmVyIjtOO3M6NzoiZm9yd2FyZCI7czoxMzoid2ViIHRvIG1vYmlsZSI7fQ%3D%3D" target="_blank" rel="noreferrer">ETNews: CRO and consulting expansion with rapid revenue growth</a></li>
            <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/decentralized-clinical-trials-drugs-biological-products-and-devices" target="_blank" rel="noreferrer">FDA: Conducting Clinical Trials With Decentralized Elements</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'JNPMEDIを単なる臨床試験SaaSとして見ると見落とすこと',
        keywords: ['ヘルスケア'],
        heroImage: {
          alt: '臨床オペレーション会議で三人の実務者が大きな画面のダッシュボードと試験フロー図を確認している様子',
          caption: 'JNPMEDIを理解するうえで大事なのは、一つの画面よりも、臨床運営とデータ、規制対応を一つの流れとして束ねようとする姿勢です。',
        },
        excerpt: 'JNPMEDIを単なる臨床試験ソフトウェア会社として理解すると、会社の半分しか見えてきません。Maven Clinical CloudとProfessional Servicesを一緒に見ると、この会社の輪郭がかなりはっきりします。',
        contentHtml: `
          <p>JNPMEDIを初めて見ると、多くの人はまずソフトウェア会社だと感じると思います。実際、最初に目に入るのはMaven Clinical Cloudですし、外部記事でも臨床試験データプラットフォーム企業として紹介されることが多いからです。</p>
          <p>ただ、会社が自分自身をどう説明しているかを少し丁寧に見ると、印象は変わってきます。JNPMEDIは単なる臨床試験SaaS企業ではなく、Maven Clinical Cloudを基盤にProfessional Servicesを組み合わせ、研究開発から商用化までつなぐ <strong>Life Science RDC company</strong> と自らを定義しています。</p>
          <p>この違いは小さくありません。ソフトウェア会社として読むのか、ライフサイエンス事業の実行レイヤーを設計する会社として読むのかで、会社の位置づけはかなり変わって見えるからです。</p>

          <h3>Mavenは重要ですが、それだけではもう説明しきれません</h3>
          <p>Maven Clinical Cloudは今でも中心です。初期の投資記事でも、Mavenは製薬、バイオ、デジタル治療、デジタル医療機器まで幅広く使える臨床試験データプラットフォームとして説明されていました。その段階では「臨床SaaS」という見方も自然でした。</p>
          <p>ただ、今のJNPMEDIを見ると、その説明だけでは足りません。公式サイトやサービス紹介を見ると、Mavenは単独プロダクトというより、より大きな実行支援を載せるための基盤レイヤーとして置かれています。</p>
          <blockquote>つまりMavenは会社そのものではなく、会社全体を支える土台として読むほうがしっくりきます。</blockquote>

          <h3>本当に見るべきなのは機能の数ではなく、つなごうとしている範囲です</h3>
          <p>Professional Servicesの説明を見ると、この会社がなぜ自分をRDCと呼ぶのかがよく分かります。JNPMEDIはeConsent、遠隔訪問、RTSMのような分散型試験モジュールだけでなく、投資・ライセンシング支援、文書管理、eTMF、プロジェクトマネジメント、AWS基盤支援まで、一つの流れの中に置いています。</p>
          <p>これは実務的に重要です。臨床プロジェクトは、被験者募集だけ、データだけ、文書だけで止まることはほとんどありません。採用、運用、記録、規制、実査、パートナー対応が同時に動くからです。</p>
          <p>だからJNPMEDIを理解するには、「何を売っているか」より「どこまでを一つの運営構造として束ねようとしているか」を見る必要があります。その意味では、ツールベンダーというより実行パートナーに近づいているように見えます。</p>

          <h3>分散型臨床試験への向き合い方にも会社の性格が出ています</h3>
          <p>JNPMEDIは分散型臨床試験を早い段階から前に出してきました。業界イベントでDCT関連機能を紹介してきただけでなく、FDAが分散型要素を含む臨床試験の最終ガイダンスを出した際には、韓国語翻訳版まで配布しています。</p>
          <p>ここが重要なのは、単に遠隔機能を売っているだけではないからです。規制の変化を現場がどう受け止め、どう実装すべきかまで一緒に解釈しようとしているように見えるからです。</p>
          <p>ヘルスケアでは、機能そのものより解釈の価値が大きい場面が少なくありません。特にデジタル治療やデジタル医療機器のように、製品、臨床、規制文書、データ設計が強く結びつく領域ではなおさらです。</p>

          <h3>最近の拡張は、ソフト販売より実行サービス寄りです</h3>
          <p>最近の報道を見ても、その方向ははっきりしています。外部記事ではCROやコンサルティングサービスの拡張が強調されており、JNPMEDI CONNECTの公式アジェンダも規制、臨床運営、AIベースのデータ戦略、投資トレンドを横断する形で組まれていました。</p>
          <p>これは象徴的です。純粋なソフトウェア企業なら、もっと製品機能の進化を前面に出すはずです。JNPMEDIはむしろ、ライフサイエンス事業全体の実行力をどう支えるかという文脈で自社を見せようとしている印象が強いです。</p>
          <ul>
            <li>Mavenはデータと運営の基盤として残り、</li>
            <li>Professional Servicesがその上で現実のプロジェクトを動かし、</li>
            <li>会社の自己定義はツール提供者から実行構造の設計者へと少しずつ移っています。</li>
          </ul>

          <h3>だからJNPMEDIは“臨床SaaS企業”より“実行レイヤー企業”として見るほうが自然です</h3>
          <p>私がJNPMEDIを面白いと思うのもそこです。臨床のデジタル化を語るとき、話題はeConsentやePROのような機能単位に割れがちですが、JNPMEDIはそれらを早い段階から一つの運営モデルにまとめようとしてきました。</p>
          <p>もちろん課題もあります。サービス範囲が広がるほど、各領域の深さと再現性を両立するのは難しくなります。プラットフォームとコンサルティングを同時に持つ企業は、標準化と人依存のバランスをかなり慎重に扱う必要があります。グローバル展開が進めば、規制順守、文書品質、データ標準化もより厳しく見られるはずです。</p>
          <p>それでも今のJNPMEDIを単なる臨床試験SaaSとしてだけ見るのは少し小さすぎます。Mavenを土台にしながら、臨床運営、データ、規制、事業開発を一つの実行構造に束ねようとしている会社として見るほうが、今の姿に近いと思います。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://www.jnpmedi.com/" target="_blank" rel="noreferrer">JNPMEDI公式サイト</a></li>
            <li><a href="https://www.jnpmedi.com/professional_services" target="_blank" rel="noreferrer">JNPMEDI Professional Services</a></li>
            <li><a href="https://www.jnpmedi.com/media/?bmode=view&idx=112327110" target="_blank" rel="noreferrer">FDA DCT最終ガイダンス韓国語版配布</a></li>
            <li><a href="https://www.jnpmedi.com/media/?bmode=view&idx=167442583" target="_blank" rel="noreferrer">2025 JNPMEDI CONNECT</a></li>
            <li><a href="https://www.etnews.com/20221122000152" target="_blank" rel="noreferrer">ETNews: シリーズA投資誘致</a></li>
            <li><a href="https://m.etnews.com/20250130000049?obj=Tzo4OiJzdGRDbGFzcyI6Mjp7czo3OiJyZWZlcmVyIjtOO3M6NzoiZm9yd2FyZCI7czoxMzoid2ViIHRvIG1vYmlsZSI7fQ%3D%3D" target="_blank" rel="noreferrer">ETNews: CRO・コンサル拡張と売上成長</a></li>
            <li><a href="https://www.fda.gov/regulatory-information/search-fda-guidance-documents/decentralized-clinical-trials-drugs-biological-products-and-devices" target="_blank" rel="noreferrer">FDA: Conducting Clinical Trials With Decentralized Elements</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'practical-way-to-connect-obsidian-and-claude-code',
    category: 'ai',
    createdAt: '2026-03-31T15:40:00+09:00',
    heroImage: {
      src: '/blog/obsidian-claude-code-hero-generated.webp',
    },
    locales: {
      ko: {
        title: '옵시디언과 Claude Code를 연결해 쓰는 가장 현실적인 방법',
        keywords: ['AI'],
        excerpt: '요즘 커뮤니티에서 말하는 옵시디언과 Claude 연결은 대체로 세 갈래입니다. shared vault, 옵시디언 내부 플러그인, MCP 서버형을 구분해서 보면 어떤 방식이 내 작업에 맞는지 훨씬 선명해집니다.',
        heroImage: {
          alt: '책상 위에서 노트를 적으며 노트북으로 작업하는 손과 메모 공간이 함께 보이는 장면',
          caption: '옵시디언과 Claude Code의 연결은 거창한 대시보드보다, 메모와 작업 화면이 같은 흐름 안에 놓일 때 가장 실용적으로 느껴집니다.',
        },
        contentHtml: `
          <p>요즘 Reddit이나 포럼에서 “옵시디언과 Claude를 붙여 쓴다”는 이야기를 자주 보게 됩니다. 그런데 막상 내용을 들여다보면 모두 같은 기술을 말하는 것은 아닙니다. 겉으로는 비슷해 보여도 실제 구조는 제법 다릅니다.</p>
          <p>어떤 사람은 볼트 폴더를 Claude Code 작업 디렉터리로 그대로 쓰고 있고, 어떤 사람은 옵시디언 사이드바 안에 Claude를 넣는 플러그인을 보여주고, 또 어떤 사람은 MCP 서버를 붙여서 노트를 도구처럼 다루고 있습니다.</p>
          <p>그래서 이 주제는 “연동된다/안 된다”보다, 요즘 커뮤니티에서 말하는 연결이 정확히 어떤 층위인지 나눠서 보는 편이 훨씬 이해가 쉽습니다.</p>

          <h3>요즘 커뮤니티에서 말하는 연동은 크게 세 가지입니다</h3>
          <p>최근 Reddit와 Obsidian 커뮤니티를 보면 흐름이 꽤 선명합니다. 첫째는 <strong>shared vault 방식</strong>입니다. 옵시디언 볼트를 Claude Code가 그대로 읽고 쓰는 방식입니다. 둘째는 <strong>옵시디언 내부 플러그인형</strong>입니다. 사이드바나 패널에 Claude Code 또는 Claude 계열 에이전트를 직접 띄워서, 앱 안에서 바로 작업하는 식입니다. 셋째는 <strong>MCP 서버형</strong>입니다. Claude Code나 Claude 계열 도구가 외부 도구로서 볼트를 호출하게 만드는 구조입니다.</p>
          <p>즉, 요즘 자주 보이는 “Obsidian + Claude” 게시물은 하나의 통합 기술이 아니라 세 가지 접근이 한데 묶여 보이는 현상에 가깝습니다.</p>
          <blockquote>겉보기에는 모두 ‘옵시디언과 클로드를 붙여 쓴다’는 말이지만, 실제로는 작업 폴더 공유, 앱 내장 UI, 외부 도구 프로토콜이라는 서로 다른 층위가 섞여 있습니다.</blockquote>

          <h3>1. shared vault 방식은 가장 단순하지만 여전히 가장 실용적입니다</h3>
          <p>옵시디언 공식 문서를 보면 볼트는 결국 로컬 파일 기반 작업 공간입니다. 이 점 때문에 Claude Code와의 기본 연결은 의외로 단순합니다. 볼트 폴더를 터미널에서 열고 그 안에서 <code>claude</code>를 실행하면, Claude Code는 이미 정리된 마크다운 노트, 폴더 구조, 첨부 파일 흐름을 그대로 작업 문맥으로 삼게 됩니다.</p>
          <p>여기서 바로 해둘 만한 일은 볼트 루트에 <code>CLAUDE.md</code>를 두는 것입니다. Anthropic 공식 문서 기준으로 이 파일은 세션 시작 시 읽히는 프로젝트 지침 역할을 합니다. 위키링크를 유지할지, 프론트매터는 어떤 형식으로 둘지, 첨부 파일 경로는 바꾸지 말지 같은 규칙을 여기 적어두면 생각보다 안정감이 큽니다.</p>
          <p>또 이 방식은 URI와 CLI를 붙일 때 훨씬 강해집니다. <code>obsidian://</code> URI로 노트를 바로 열고, 공식 CLI의 <code>obsidian daily</code>, <code>obsidian search</code>, <code>obsidian create</code> 같은 명령으로 반복 동작을 줄일 수 있습니다. 실전에서는 이 조합만으로도 상당히 쓸 만합니다.</p>
          <ul>
            <li>긴 회의록을 요약해 짧은 메모로 줄이기</li>
            <li>흩어진 노트를 하나의 글 초안으로 묶기</li>
            <li>폴더 구조를 정리하면서 링크를 유지하기</li>
            <li>리서치 노트에서 핵심 문단만 뽑아 글 뼈대 만들기</li>
          </ul>

          <h3>2. 옵시디언 내부 플러그인형은 요즘 가장 눈에 띄는 방식입니다</h3>
          <p>사용자가 최근 많이 보셨을 게시물은 이쪽일 가능성이 큽니다. Reddit와 Obsidian 커뮤니티에는 Claude Code를 옵시디언 사이드바에서 돌리거나, 옵시디언 안에 에이전트 패널을 넣는 플러그인 예시가 계속 올라오고 있습니다. 겉으로 보기에는 가장 “직접 연결된” 느낌이 강합니다.</p>
          <p>다만 구조를 보면 완전히 다른 세계라기보다, shared vault 방식 위에 <strong>옵시디언 안에서 쓰는 UI 레이어</strong>가 얹힌 경우가 많습니다. 즉 본질은 여전히 볼트와 파일을 다루는 것이고, 차이는 그걸 터미널 바깥이 아니라 옵시디언 내부 패널에서 하느냐에 가깝습니다.</p>
          <p>장점은 분명합니다. 컨텍스트 전환이 적고, 현재 열어둔 노트나 선택 영역을 바로 넘기기 쉽고, “노트를 쓰다가 바로 에이전트에게 넘기는 감각”이 좋습니다. 반면 플러그인 성숙도, 유지보수 상태, 어떤 Claude 백엔드에 기대는지, 로컬 명령 실행 범위를 어디까지 허용하는지는 꼭 따져봐야 합니다.</p>
          <blockquote>플러그인 내장형은 가장 멋져 보이지만, 핵심은 화면이 아니라 그 플러그인이 실제로 무엇을 실행하고 어떤 권한을 갖는지입니다.</blockquote>

          <h3>3. MCP 서버형은 가장 강한 대신 가장 기술적입니다</h3>
          <p>MCP는 Anthropic이 설명하는 대로 외부 데이터와 도구를 AI에 연결하는 개방형 표준입니다. 그래서 정말로 “옵시디언 볼트를 Claude의 도구처럼 다루고 싶다”면 MCP가 가장 강합니다. 노트 조회, 생성, 검색, 특정 명령 수행을 더 도구적인 방식으로 연결할 수 있기 때문입니다.</p>
          <p>최근 커뮤니티에도 옵시디언과 Claude를 잇는 MCP 서버 프로젝트가 여럿 보입니다. 이 방식은 shared vault보다 강하고, 플러그인 UI보다 더 범용적일 수 있습니다. 대신 설정 부담도 가장 큽니다. 로컬 API, 플러그인 의존성, 권한 범위, 민감한 노트 노출 범위 같은 판단이 같이 따라옵니다.</p>
          <p>옵시디언 공식 보안 문서도 커뮤니티 플러그인은 파일 접근, 인터넷 연결, 추가 프로그램 설치까지 가능한 만큼 신중하게 판단하라고 안내합니다. MCP를 붙일 때는 이 주의가 더 중요해집니다. 보기보다 단순한 장난감 설정이 아니기 때문입니다.</p>

          <h3>그래서 어떤 순서가 현실적일까</h3>
          <ol>
            <li>먼저 shared vault 방식으로 시작합니다.</li>
            <li>볼트 루트에 <code>CLAUDE.md</code>를 두고 마크다운 규칙과 링크 규칙을 고정합니다.</li>
            <li>반복 동작이 불편해질 때 URI와 CLI를 붙입니다.</li>
            <li>옵시디언 내부에서 바로 쓰고 싶다면 그다음에 플러그인 내장형을 검토합니다.</li>
            <li>그래도 더 강한 툴 연결이 필요하고 보안 범위까지 감당할 수 있을 때 MCP로 갑니다.</li>
          </ol>
          <p>이 순서를 권하는 이유는 shared vault가 가장 싸고 단단한 출발점이기 때문입니다. 플러그인 내장형은 경험이 좋지만 아직은 도구별 편차가 있고, MCP는 가장 강하지만 가장 기술적입니다.</p>

          <h3>결국 중요한 것은 ‘무슨 이름의 연동인가’보다 내 작업에 어디까지 필요한가입니다</h3>
          <p>요즘 커뮤니티에서 보이는 “옵시디언과 클로드의 결합”은 맞는 말입니다. 다만 그걸 하나의 기술처럼 받아들이면 오해가 생깁니다. 실제로는 shared vault, 플러그인 내장형, MCP 서버형이 각각 다른 장단점을 가진 별도 선택지에 가깝습니다.</p>
          <p>대부분의 사람에게는 shared vault와 약간의 URI·CLI 자동화만으로도 충분합니다. 옵시디언 안에서 바로 대화하고 싶은 분에게는 플러그인형이 매력적이고, 도구 수준으로 강하게 연결하고 싶은 분에게는 MCP가 맞습니다. 요즘 자주 보이는 게시물도 결국 이 세 갈래 중 하나를 보여주는 경우가 많습니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer">Anthropic Claude Code overview</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/mcp" target="_blank" rel="noreferrer">Anthropic Model Context Protocol documentation</a></li>
            <li><a href="https://help.obsidian.md/vault" target="_blank" rel="noreferrer">Obsidian Help: vaults</a></li>
            <li><a href="https://help.obsidian.md/Extending%2BObsidian/Obsidian%2BURI" target="_blank" rel="noreferrer">Obsidian Help: Obsidian URI</a></li>
            <li><a href="https://help.obsidian.md/cli" target="_blank" rel="noreferrer">Obsidian Help: CLI</a></li>
            <li><a href="https://help.obsidian.md/community-plugins" target="_blank" rel="noreferrer">Obsidian Help: community plugins</a></li>
            <li><a href="https://help.obsidian.md/plugin-security" target="_blank" rel="noreferrer">Obsidian Help: plugin security</a></li>
            <li><a href="https://forum.obsidian.md/t/claude-code-from-the-sidebar/109634" target="_blank" rel="noreferrer">Obsidian Forum: Claude Code from the sidebar</a></li>
            <li><a href="https://www.reddit.com/r/ObsidianMD/comments/1rz89qh/connect_obsidian_to_claude_code/" target="_blank" rel="noreferrer">Reddit: connect Obsidian to Claude Code</a></li>
            <li><a href="https://www.reddit.com/r/ObsidianMD/comments/1s0njnb/i_built_an_obsidian_plugin_that_runs_claude_code/" target="_blank" rel="noreferrer">Reddit: Obsidian plugin that runs Claude Code</a></li>
            <li><a href="https://github.com/iansinnott/obsidian-claude-code-mcp" target="_blank" rel="noreferrer">iansinnott/obsidian-claude-code-mcp</a></li>
          </ul>
        `,
      },
      en: {
        title: 'The Most Practical Way to Connect Obsidian and Claude Code',
        keywords: ['AI'],
        excerpt: 'What people call “Obsidian plus Claude” now usually means three different things: a shared vault workflow, an embedded Obsidian plugin, or an MCP server bridge. Once those are separated, the tradeoffs become much clearer.',
        heroImage: {
          alt: 'Hands writing notes beside an open laptop on a wooden desk',
          caption: 'The practical value of Obsidian and Claude Code shows up when note-taking and active work stay in the same flow instead of living in separate tools.',
        },
        contentHtml: `
          <p>If you have been seeing more posts about “connecting Obsidian and Claude,” your impression is right, but those posts are not all talking about the same layer. Some show Claude Code working directly against a vault folder. Others show Claude inside an Obsidian sidebar. Others are really about MCP servers.</p>
          <p>So the useful question is not just whether Obsidian and Claude can be connected. It is what kind of connection people are actually referring to.</p>
          <p>Right now, the community conversation mostly falls into three buckets: shared vault workflows, embedded plugin workflows, and MCP bridge workflows.</p>

          <h3>What people mean by “Obsidian plus Claude” usually comes in three forms</h3>
          <p>Recent Reddit posts and Obsidian community threads make this pretty clear. The first form is the <strong>shared vault approach</strong>: Claude Code works directly in the same vault folder Obsidian uses. The second is the <strong>embedded plugin approach</strong>: Claude or Claude Code appears in an Obsidian sidebar or panel. The third is the <strong>MCP server approach</strong>: Claude tools talk to the vault through a tool protocol layer.</p>
          <blockquote>These all look like “Obsidian connected to Claude,” but technically they are different things: shared files, in-app interface, and external tool protocol.</blockquote>

          <h3>1. The shared vault approach is still the simplest and often the most useful</h3>
          <p>Obsidian vaults are local working spaces, which makes the first connection surprisingly straightforward. Open the vault folder in terminal and run <code>claude</code> there. Claude Code can then work directly with the markdown notes, folder structure and attachments already living in the vault.</p>
          <p>This is also the best place to add <code>CLAUDE.md</code> at the root so Claude Code preserves wikilinks, frontmatter and attachment paths. If you want tighter loops, Obsidian URI and the official CLI are a strong second layer: <code>obsidian://</code>, <code>obsidian daily</code>, <code>obsidian search</code> and <code>obsidian create</code> remove a lot of repetitive friction.</p>

          <h3>2. Embedded Obsidian plugins are the most visible community trend</h3>
          <p>This is probably the category behind many of the screenshots people are sharing now. Recent Reddit posts and forum threads show plugins that run Claude Code or Claude-like agent workflows from an Obsidian sidebar. Visually, this feels like the most direct integration.</p>
          <p>But under the surface, it is often less a totally different architecture and more a UI layer built on top of the same vault-oriented workflow. The main gain is fewer context switches: you stay inside Obsidian, send the current note or selection, and get the response without leaving the app.</p>
          <p>The tradeoff is maturity and trust. You need to look at how the plugin is maintained, which backend it relies on and what local permissions it can touch.</p>

          <h3>3. MCP bridges are the strongest and also the most technical</h3>
          <p>MCP is Anthropic's open protocol for connecting Claude tools to external systems. If you want Obsidian to feel less like a folder and more like a callable tool surface, this is the most powerful route.</p>
          <p>Community MCP projects for Obsidian already exist, but this is where setup complexity rises quickly. You are no longer just sharing files. You are dealing with tool permissions, local APIs, plugin boundaries and the practical risk of exposing sensitive notes too broadly.</p>
          <p>That is why Obsidian's plugin security guidance matters even more here. MCP is not just a neat extra. It changes the trust model of the workflow.</p>

          <h3>The order that usually makes the most sense</h3>
          <ol>
            <li>Start with the shared vault setup.</li>
            <li>Add <code>CLAUDE.md</code> and lock in note-handling rules.</li>
            <li>Use URI and CLI when repetition becomes annoying.</li>
            <li>Try embedded plugins if staying inside Obsidian matters to you.</li>
            <li>Move to MCP only if you need real tool-level integration and can evaluate the security tradeoffs.</li>
          </ol>
          <p>That order tends to work because the cheapest setup already gives real value, while plugin and MCP paths add convenience and power at the cost of more moving parts.</p>

          <h3>The important point is not the label but the layer</h3>
          <p>So yes, the topic you are seeing all over community spaces is real. But it is better understood as a family of related setups than as one single integration method.</p>
          <p>For many people, a shared vault plus light automation is enough. For others, embedded plugins are the appealing middle ground. MCP is the heavy-duty option when you truly want the vault to behave like a tool surface.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer">Anthropic Claude Code overview</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/mcp" target="_blank" rel="noreferrer">Anthropic Model Context Protocol documentation</a></li>
            <li><a href="https://help.obsidian.md/vault" target="_blank" rel="noreferrer">Obsidian Help: vaults</a></li>
            <li><a href="https://help.obsidian.md/Extending%2BObsidian/Obsidian%2BURI" target="_blank" rel="noreferrer">Obsidian Help: Obsidian URI</a></li>
            <li><a href="https://help.obsidian.md/cli" target="_blank" rel="noreferrer">Obsidian Help: CLI</a></li>
            <li><a href="https://help.obsidian.md/community-plugins" target="_blank" rel="noreferrer">Obsidian Help: community plugins</a></li>
            <li><a href="https://help.obsidian.md/plugin-security" target="_blank" rel="noreferrer">Obsidian Help: plugin security</a></li>
            <li><a href="https://forum.obsidian.md/t/claude-code-from-the-sidebar/109634" target="_blank" rel="noreferrer">Obsidian Forum: Claude Code from the sidebar</a></li>
            <li><a href="https://www.reddit.com/r/ObsidianMD/comments/1rz89qh/connect_obsidian_to_claude_code/" target="_blank" rel="noreferrer">Reddit: connect Obsidian to Claude Code</a></li>
            <li><a href="https://www.reddit.com/r/ObsidianMD/comments/1s0njnb/i_built_an_obsidian_plugin_that_runs_claude_code/" target="_blank" rel="noreferrer">Reddit: Obsidian plugin that runs Claude Code</a></li>
            <li><a href="https://github.com/iansinnott/obsidian-claude-code-mcp" target="_blank" rel="noreferrer">iansinnott/obsidian-claude-code-mcp</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'ObsidianとClaude Codeをつなげて使う、いちばん現実的な方法',
        keywords: ['AI'],
        excerpt: '最近よく見かける「ObsidianとClaudeの連携」は、実は一つの方法ではありません。shared vault、Obsidian内プラグイン、MCPサーバー型を分けて見ると、自分に合う形がかなりわかりやすくなります。',
        heroImage: {
          alt: '木の机でノートを書きながらノートPCを操作している手元の様子',
          caption: 'ObsidianとClaude Codeのよさは、派手な統合画面より、メモと実作業が同じ流れに収まるところにあります。',
        },
        contentHtml: `
          <p>最近、Redditやフォーラムで「ObsidianとClaudeをつなげて使う」という話をよく見かけます。ただ、そこで語られているものは必ずしも同じ技術ではありません。見た目は似ていても、中身はかなり違います。</p>
          <p>ある人はVaultフォルダをClaude Codeの作業場所として使い、ある人はObsidianのサイドバーにClaudeを埋め込み、また別の人はMCPサーバーでVaultをツールのように扱っています。</p>
          <p>なので、この話題は「連携できるかどうか」より、「いまコミュニティで言われている連携がどの層の話なのか」を分けて見るほうが理解しやすいです。</p>

          <h3>最近よく言われる連携は、大きく三つに分かれます</h3>
          <p>最近のRedditやObsidianコミュニティを見ると、流れは比較的はっきりしています。ひとつ目は <strong>shared vault方式</strong> です。ObsidianのVaultをClaude Codeがそのまま読む形です。ふたつ目は <strong>Obsidian内プラグイン型</strong> です。サイドバーやパネルの中でClaudeやClaude Code系のエージェントを動かします。三つ目は <strong>MCPサーバー型</strong> です。Claude系ツールが外部ツールとしてVaultを呼び出す構成です。</p>
          <blockquote>どれも「ObsidianとClaudeをつなぐ」と言えますが、実際には共有フォルダ、アプリ内UI、外部ツールプロトコルという別の層の話です。</blockquote>

          <h3>1. shared vault方式は地味ですが、今でもいちばん実用的です</h3>
          <p>ObsidianのVaultはローカルの作業空間なので、Claude Codeとの基本接続は意外と単純です。Vaultフォルダをターミナルで開き、その中で <code>claude</code> を実行すれば、Claude CodeはMarkdownノートやフォルダ構造、添付ファイルをそのまま文脈として扱えます。</p>
          <p>ここで <code>CLAUDE.md</code> をルートに置いて、Wikiリンクの維持やフロントマターの扱いを固定しておくと安定します。さらにURIや公式CLIの <code>obsidian daily</code>、<code>obsidian search</code>、<code>obsidian create</code> を足せば、実務ではかなり十分な構成になります。</p>

          <h3>2. Obsidian内プラグイン型は、今いちばん目立つ流れです</h3>
          <p>最近よく見かけるスクリーンショットは、このタイプであることが多いと思います。Redditやフォーラムには、Claude CodeをObsidianのサイドバーから動かしたり、エージェントパネルを直接埋め込んだりするプラグイン例が出てきています。見た目としては最も「直結している」感じが強いです。</p>
          <p>ただし中身を見ると、まったく別の世界というより、shared vault方式の上に <strong>Obsidian内部で使うためのUIレイヤー</strong> が乗っている場合が多いです。利点は明快で、ノートを書いている流れを切らずに、その場でエージェントへ渡せることです。</p>
          <p>その代わり、プラグインの成熟度、保守状況、どのClaudeバックエンドに依存しているか、ローカルで何を実行できるかは必ず見たほうがいいです。</p>

          <h3>3. MCPサーバー型は最も強力ですが、最も技術寄りです</h3>
          <p>MCPはAnthropicが案内している外部ツール接続のためのオープンな仕組みです。Obsidianを単なる共有フォルダではなく、Claudeから呼び出せる道具のようにしたいなら、この方向がいちばん強いです。</p>
          <p>最近はObsidian向けのMCPサーバープロジェクトも見かけますが、ここから先は設定の重さが一段上がります。共有ファイルの話ではなく、ツール権限、ローカルAPI、プラグイン境界、機密ノートの露出範囲まで考える必要が出てきます。</p>
          <p>だからこそ、Obsidianのプラグインセキュリティに関する公式ガイドが重要になります。MCPは便利な追加機能というより、信頼モデルそのものを変える要素でもあるからです。</p>

          <h3>私ならこの順番で考えます</h3>
          <ol>
            <li>まずshared vault方式から始めます。</li>
            <li><code>CLAUDE.md</code> を置いてノートの扱いを固定します。</li>
            <li>繰り返し作業が増えたらURIやCLIを足します。</li>
            <li>Obsidianの中で完結したいなら、その次にプラグイン型を検討します。</li>
            <li>さらに深いツール連携が必要で、安全性も評価できるならMCPに進みます。</li>
          </ol>
          <p>この順番がいいのは、いちばん安い構成でまず十分な効果を得られるからです。プラグイン型は体験がよく、MCPは強力ですが、どちらも動く部品が増えます。</p>

          <h3>結局大事なのは、名前より層の違いを見分けることです</h3>
          <p>最近コミュニティで見かける「ObsidianとClaudeの結合」は、たしかに実在する流れです。ただ、それを一つの技術としてまとめてしまうと誤解しやすくなります。実際には、shared vault、プラグイン内蔵型、MCPサーバー型という別々の選択肢が並んでいると考えたほうが正確です。</p>
          <p>多くの人にとっては、shared vaultに軽い自動化を足すだけで十分です。Obsidianの中でそのまま対話したいならプラグイン型、Vaultを本当にツールのように扱いたいならMCP型が向いています。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer">Anthropic Claude Code overview</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/mcp" target="_blank" rel="noreferrer">Anthropic Model Context Protocol documentation</a></li>
            <li><a href="https://help.obsidian.md/vault" target="_blank" rel="noreferrer">Obsidian Help: vaults</a></li>
            <li><a href="https://help.obsidian.md/Extending%2BObsidian/Obsidian%2BURI" target="_blank" rel="noreferrer">Obsidian Help: Obsidian URI</a></li>
            <li><a href="https://help.obsidian.md/cli" target="_blank" rel="noreferrer">Obsidian Help: CLI</a></li>
            <li><a href="https://help.obsidian.md/community-plugins" target="_blank" rel="noreferrer">Obsidian Help: community plugins</a></li>
            <li><a href="https://help.obsidian.md/plugin-security" target="_blank" rel="noreferrer">Obsidian Help: plugin security</a></li>
            <li><a href="https://forum.obsidian.md/t/claude-code-from-the-sidebar/109634" target="_blank" rel="noreferrer">Obsidian Forum: Claude Code from the sidebar</a></li>
            <li><a href="https://www.reddit.com/r/ObsidianMD/comments/1rz89qh/connect_obsidian_to_claude_code/" target="_blank" rel="noreferrer">Reddit: connect Obsidian to Claude Code</a></li>
            <li><a href="https://www.reddit.com/r/ObsidianMD/comments/1s0njnb/i_built_an_obsidian_plugin_that_runs_claude_code/" target="_blank" rel="noreferrer">Reddit: Obsidian plugin that runs Claude Code</a></li>
            <li><a href="https://github.com/iansinnott/obsidian-claude-code-mcp" target="_blank" rel="noreferrer">iansinnott/obsidian-claude-code-mcp</a></li>
          </ul>
        `,
      },
    },
  },
  {
    slug: 'why-kakao-healthcare-looks-bigger-than-a-single-diabetes-app',
    category: 'healthcare',
    createdAt: '2026-03-31T14:20:00+09:00',
    heroImage: {
      src: '/blog/healthcare-ai-workflow-hero-generated.webp',
    },
    locales: {
      ko: {
        title: '카카오헬스케어는 왜 ‘파스타 앱’보다 연결 구조가 더 중요해 보일까',
        keywords: ['헬스케어'],
        excerpt: '카카오헬스케어를 보고 있으면 요즘 디지털 헬스의 승부가 단일 앱 기능보다 생활 데이터, 병원 EHR, 카카오톡 접점을 어떻게 하나의 흐름으로 잇느냐에 달려 있다는 점이 더 선명하게 보입니다.',
        heroImage: {
          alt: '의료진이 병원 컴퓨터 앞에서 환자 데이터와 디지털 건강관리 흐름을 함께 확인하는 모습',
          caption: '카카오헬스케어의 핵심은 앱 하나보다 생활 데이터와 병원 워크플로를 이어 붙이는 연결 구조에 더 가까워 보입니다.',
        },
        contentHtml: `
          <p>디지털 헬스 서비스는 생각보다 쉽게 잊힙니다. 처음에는 흥미롭지만 기록이 번거롭고, 병원 진료와 연결되지 않고, 결국 내 생활 안에서 따로 노는 순간 손이 잘 안 가게 되기 때문입니다.</p>
          <p>그래서 카카오헬스케어를 볼 때도 저는 단순히 “혈당 관리 앱을 잘 만들었나”보다 조금 다른 지점을 먼저 보게 됩니다. 파스타, 병원 EHR 연동, 카카오톡 기반 케어챗이 실제로 하나의 환자 흐름처럼 이어질 수 있느냐가 더 중요해 보입니다.</p>
          <p>지금 이 회사가 흥미로운 이유도 바로 그 연결 구조에 있습니다.</p>

          <h3>앱 하나만으로는 오래 남기 어렵습니다</h3>
          <p>건강관리 앱이 자주 부딪히는 한계는 분명합니다. 사용자는 열심히 기록하지만, 그 데이터가 진료실 안에서는 잘 보이지 않습니다. 반대로 병원은 진료 중 쓸 수 있는 정보가 필요하지만, 환자 일상 데이터가 병원 시스템과 따로 놀면 결국 참고 자료 이상이 되기 어렵습니다.</p>
          <p>카카오헬스케어가 이 문제를 꽤 정확하게 짚고 있다는 느낌이 드는 대목은, 처음부터 회사를 <code>Virtual Care</code>, <code>Digital Transformation of Hospitals</code>, <code>Data Enabler</code> 세 축으로 설명하고 있다는 점입니다. 소비자용 앱만 키우는 회사라기보다, 생활 속 데이터와 병원 업무 흐름을 한 줄로 잇는 회사를 지향하고 있다는 뜻에 가깝습니다.</p>
          <blockquote>디지털 헬스의 승부는 데이터를 더 많이 모으는 데보다, 그 데이터가 다시 의료 현장 안으로 들어오게 만드는 데서 갈리는 경우가 많습니다.</blockquote>

          <h3>파스타의 진짜 포인트는 기록을 쉽게 만들고, 읽히게 만든다는 점입니다</h3>
          <p>파스타는 연속혈당측정기와 바로 연결되고, 식사나 운동을 사진과 음성으로 기록할 수 있게 설계됐습니다. iF 디자인 어워드 수상 소개에서도 카카오헬스케어는 입력의 번거로움, 데이터 리터러시 문제, 가족 간 공유의 불편, 병원 EMR 연동까지를 함께 풀어야 할 사용자 문제로 제시했습니다.</p>
          <p>이건 꽤 중요한 포인트입니다. 헬스케어 앱이 실패하는 이유 중 하나는 데이터가 없어서가 아니라, 데이터를 남기는 과정이 피곤하고 결과를 읽는 일이 더 어렵기 때문입니다. 파스타는 이 지점을 먼저 줄이려는 방향으로 보입니다.</p>
          <p>여기에 최근에는 체중 관리와 비만 환자 지원 기능까지 더해지면서, 단일 혈당 앱보다는 대사질환 관리 플랫폼 쪽으로 조금씩 몸집을 넓히는 모습도 보입니다.</p>

          <h3>분기점은 병원 EHR 안으로 들어가기 시작했다는 점입니다</h3>
          <p>그래도 결국 더 중요한 장면은 병원 쪽입니다. 전자신문 보도를 보면 파스타는 주요 병원 EHR 연동을 확대하고 있고, 의료진용 대시보드인 <code>파스타 커넥트 프로</code>는 이미 많은 병원에서 활용되고 있습니다. 이 단계로 넘어가면 환자가 앱에 남긴 생활 데이터가 병원 밖 자기관리 기록에서 끝나지 않고, 진료 과정에서 다시 읽히는 정보가 됩니다.</p>
          <p>이 변화는 생각보다 큽니다. 의료진이 별도 플랫폼을 또 열지 않아도 병원 시스템 안에서 데이터를 볼 수 있다면, 디지털 헬스는 더 이상 부가 기능이 아니라 실제 진료 보조 흐름에 가까워집니다. 환자 입장에서도 “내가 기록한 것이 결국 아무 데도 쓰이지 않는다”는 허탈감이 줄어듭니다.</p>
          <ul>
            <li>환자는 일상 데이터를 남기고</li>
            <li>의료진은 그 데이터를 기존 업무 화면 안에서 확인하고</li>
            <li>진료 이후 관리도 다시 디지털 채널로 이어집니다.</li>
          </ul>
          <p>카카오헬스케어의 전략이 의미 있어 보이는 이유는 이 세 단계를 한 번에 보려 한다는 점입니다.</p>

          <h3>케어챗은 병원 앞과 뒤를 붙이는 접점에 가깝습니다</h3>
          <p>여기서 케어챗이 들어옵니다. 케어챗은 카카오톡 기반으로 예약, 결제, 증명서 발급 같은 병원 컨시어지 기능을 처리하는 서비스입니다. 이미 여러 병원에 도입돼 가입자가 늘고 있다는 기사도 나왔습니다.</p>
          <p>파스타가 생활 속 건강 데이터를 다루는 쪽이라면, 케어챗은 환자가 병원을 이용하는 접점을 다룹니다. 이 두 서비스가 같이 움직이면 진료 전, 진료 중, 진료 후의 동선이 조금 더 한 회사의 흐름 안으로 모이게 됩니다. 병원 입장에서 보면 업무 효율과 환자 접점 관리가 연결되고, 환자 입장에서는 익숙한 카카오톡 환경에서 병원 경험이 이어진다는 장점이 생깁니다.</p>

          <h3>그래서 카카오헬스케어는 앱 회사보다 ‘연결 회사’로 보는 편이 더 맞을 수 있습니다</h3>
          <p>최근 카카오헬스케어의 움직임을 보면, 혈당 관리에 머물지 않고 체중, 비만, 시니어하우징 같은 생활 밀착형 만성질환 관리 쪽으로 범위를 넓히려는 의도가 비교적 선명합니다. 이 확장이 설득력을 가지려면 결국 각 서비스가 따로 성장하는 것보다, 생활 데이터와 병원 데이터, 환자 접점이 실제로 한 줄로 이어져야 합니다.</p>
          <p>물론 아직은 풀어야 할 숙제도 분명합니다. 사용자가 얼마나 오래 남는지, 의료진이 실제 진료에 얼마나 자주 참고하는지, 앱 편의성이 임상적 유용성으로 이어지는지 같은 질문은 계속 남습니다. 디지털 헬스에서는 다운로드 수만으로는 충분하지 않기 때문입니다.</p>
          <p>그래도 지금 카카오헬스케어를 볼 때 가장 흥미로운 지점은, 좋은 앱 하나를 만드는 데서 멈추지 않으려 한다는 점입니다. 파스타보다 더 크게 봐야 할 것은, 이 회사가 건강관리와 병원 이용의 사이를 어떻게 잇고 있는가 하는 구조 그 자체인지도 모르겠습니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://recruit.kakaohealthcare.com/" target="_blank" rel="noreferrer">Kakao Healthcare recruit site: company vision and business structure</a></li>
            <li><a href="https://kakaohealthcare.com/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4-%ED%99%A9%ED%9D%AC-jpm-healthcare-conference-%ED%98%88%EB%8B%B9-%EA%B4%80%EB%A6%AC-%ED%8C%8C%EC%8A%A4%ED%83%80-2%EC%9B%94-%EA%B5%AD/" target="_blank" rel="noreferrer">Kakao Healthcare: JPM Healthcare Conference and PASTA/EMR linkage plan</a></li>
            <li><a href="https://kakaohealthcare.com/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4-if-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%96%B4%EC%9B%8C%EB%93%9C/" target="_blank" rel="noreferrer">Kakao Healthcare: iF Design Award 2025 note on PASTA UX and EMR linkage</a></li>
            <li><a href="https://www.etnews.com/20250410000235" target="_blank" rel="noreferrer">ETNews: PASTA EHR integration expansion and Connect Pro adoption</a></li>
            <li><a href="https://www.etnews.com/20240731000094" target="_blank" rel="noreferrer">ETNews: Karechat adoption in hospitals</a></li>
            <li><a href="https://www.etnews.com/20250217000092" target="_blank" rel="noreferrer">ETNews: senior housing and PHR-based care linkage with Caring</a></li>
            <li><a href="https://www.newsis.com/view/NISX20260203_0003500235" target="_blank" rel="noreferrer">Newsis: obesity patient support added to PASTA with Novo Nordisk</a></li>
          </ul>
        `,
      },
      en: {
        title: 'Why Kakao Healthcare Looks Bigger Than a Single Diabetes App',
        keywords: ['Healthcare'],
        excerpt: 'Kakao Healthcare is interesting not just because of PASTA itself, but because it is trying to connect daily health data, hospital EHR workflows and KakaoTalk-based patient touchpoints into one continuous path.',
        heroImage: {
          alt: 'Clinical staff reviewing patient data and digital health workflows in front of a hospital computer',
          caption: 'The more interesting part of Kakao Healthcare may be less the app itself and more the structure connecting personal data, hospital workflows and patient touchpoints.',
        },
        contentHtml: `
          <p>Digital health products disappear more easily than they should. People try them, record diligently for a while, and then quietly stop when the data never really comes back into care.</p>
          <p>That is why Kakao Healthcare feels interesting in a slightly different way. The real question is not only whether PASTA is a good diabetes app. It is whether Kakao Healthcare can connect everyday patient data, hospital EHR workflows and KakaoTalk-based hospital touchpoints into one usable path.</p>
          <p>That wider structure is what makes the company worth watching.</p>

          <h3>A standalone app is rarely enough</h3>
          <p>Many health apps run into the same wall. Patients log data, but clinicians do not see it inside their normal workflow. Hospitals want useful patient context, but if that information lives outside the clinical system, it often stays optional and fragmented.</p>
          <p>Kakao Healthcare seems aware of this from the way it describes itself: hyper-personalized virtual care, digital transformation of hospitals and data infrastructure. That framing matters. It suggests a company trying to connect personal health management with institutional care operations rather than just scaling a consumer wellness app.</p>
          <blockquote>The harder problem in digital health is often not collecting data, but making that data reappear where care decisions actually happen.</blockquote>

          <h3>PASTA matters because it lowers input friction and makes data readable</h3>
          <p>PASTA was designed around CGM connectivity, easy food and exercise logging, and simplified reporting. Kakao Healthcare's own product and design materials repeatedly frame the challenge as one of input burden, data readability, family sharing and EMR linkage, not just analytics.</p>
          <p>That is a practical choice. Health apps often fail because the record-keeping is tiring and the output is harder to understand than the raw numbers themselves. PASTA appears to be trying to reduce both problems at once.</p>
          <p>More recently, the service has also been expanding beyond glucose alone into weight and obesity support, which makes it look less like a single-condition app and more like an expanding chronic care platform.</p>

          <h3>The real inflection point is when the data enters hospital workflow</h3>
          <p>The more important signal, though, is on the provider side. ETNews reported that PASTA's EHR integration has been expanding across major hospitals, while the clinician dashboard <code>PASTA Connect Pro</code> has already been adopted widely. Once everyday app data starts appearing inside hospital workflow, digital health changes status. It stops being a side record and starts becoming part of care support.</p>
          <p>That shift matters for both sides. Clinicians can review patient lifestyle and glucose patterns without opening a separate system, and patients have a clearer reason to keep logging because the information may actually be used in care.</p>
          <ul>
            <li>Patients generate data in daily life.</li>
            <li>Clinicians review it inside familiar systems.</li>
            <li>Follow-up then continues through digital touchpoints.</li>
          </ul>

          <h3>Karechat handles the hospital touchpoints before and after the visit</h3>
          <p>This is where Karechat becomes important. Kakao Healthcare has been expanding Karechat as a KakaoTalk-based hospital concierge layer for booking, payment and related patient tasks. PASTA handles self-management data, while Karechat handles hospital-facing touchpoints.</p>
          <p>Together, those services create a more continuous patient path: before the visit, during clinical review and after the encounter. From the hospital perspective, that can mean better operational flow and a cleaner digital front door. From the patient perspective, it means less switching between disconnected tools.</p>

          <h3>So Kakao Healthcare may be more interesting as a connector than as an app company</h3>
          <p>Recent moves into obesity support, senior housing partnerships and broader chronic care suggest the company is trying to grow along the line of connected care rather than remain narrowly tied to one diabetes product. That strategy makes sense only if the pieces really connect.</p>
          <p>There are still obvious questions. Retention matters. Clinical usefulness matters. Wide deployment does not automatically mean better outcomes. But the company becomes easier to read if you look at the architecture first: app data, hospital systems and patient channel working together.</p>
          <p>That may be the most useful way to understand Kakao Healthcare right now. The real story is probably larger than PASTA alone.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://recruit.kakaohealthcare.com/" target="_blank" rel="noreferrer">Kakao Healthcare recruit site: company vision and business structure</a></li>
            <li><a href="https://kakaohealthcare.com/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4-%ED%99%A9%ED%9D%AC-jpm-healthcare-conference-%ED%98%88%EB%8B%B9-%EA%B4%80%EB%A6%AC-%ED%8C%8C%EC%8A%A4%ED%83%80-2%EC%9B%94-%EA%B5%AD/" target="_blank" rel="noreferrer">Kakao Healthcare: JPM Healthcare Conference and PASTA/EMR linkage plan</a></li>
            <li><a href="https://kakaohealthcare.com/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4-if-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%96%B4%EC%9B%8C%EB%93%9C/" target="_blank" rel="noreferrer">Kakao Healthcare: iF Design Award 2025 note on PASTA UX and EMR linkage</a></li>
            <li><a href="https://www.etnews.com/20250410000235" target="_blank" rel="noreferrer">ETNews: PASTA EHR integration expansion and Connect Pro adoption</a></li>
            <li><a href="https://www.etnews.com/20240731000094" target="_blank" rel="noreferrer">ETNews: Karechat adoption in hospitals</a></li>
            <li><a href="https://www.etnews.com/20250217000092" target="_blank" rel="noreferrer">ETNews: senior housing and PHR-based care linkage with Caring</a></li>
            <li><a href="https://www.newsis.com/view/NISX20260203_0003500235" target="_blank" rel="noreferrer">Newsis: obesity patient support added to PASTA with Novo Nordisk</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'カカオヘルスケアは、なぜ単なる糖尿病アプリ以上に見えるのか',
        keywords: ['ヘルスケア'],
        excerpt: 'カカオヘルスケアが面白く見えるのは、PASTAというアプリ単体よりも、日常データ、病院EHR、そしてカカオトーク基盤の患者接点を一つの流れとして結ぼうとしているからです。',
        heroImage: {
          alt: '病院で医療スタッフが患者データとデジタルヘルスの流れを同時に確認している様子',
          caption: 'カカオヘルスケアの本当のポイントは、アプリ単体よりも、個人データと病院ワークフローをつなぐ構造にあるように見えます。',
        },
        contentHtml: `
          <p>デジタルヘルスのサービスは、思っている以上に忘れられやすいものです。最初は面白くても、記録が面倒で、そのデータが診療の中でほとんど使われなければ、だんだん続かなくなってしまいます。</p>
          <p>だからカカオヘルスケアを見るときも、私は「PASTAという糖尿病アプリがどれだけ良いか」だけではなく、日常の健康データ、病院EHR、そしてカカオトーク基盤の患者接点を本当に一つの流れとしてつなげられるのかを先に見たくなります。</p>
          <p>この会社の面白さは、むしろその接続構造にあるように思えます。</p>

          <h3>アプリ単体では長く残りにくいです</h3>
          <p>多くの健康アプリがぶつかる壁は似ています。患者は日々の情報を記録しますが、そのデータが医療者の通常業務の中で見られません。病院側も役に立つ生活情報は欲しいのに、診療システムとつながっていなければ、結局は周辺的な参考情報にとどまりがちです。</p>
          <p>カカオヘルスケアがこの問題を意識していることは、会社の説明の仕方からも感じられます。<code>Virtual Care</code>、<code>Digital Transformation of Hospitals</code>、<code>Data Enabler</code>という三つの軸は、単なる消費者向けアプリ会社ではなく、個人の管理と医療機関の運用をつなぐ会社を目指していることを示しています。</p>
          <blockquote>デジタルヘルスで難しいのは、データを集めることより、そのデータを医療の現場に戻していくことなのかもしれません。</blockquote>

          <h3>PASTAの価値は、記録の負担を下げて読みやすくすることです</h3>
          <p>PASTAはCGMとの連携、写真や音声での食事・運動記録、わかりやすいレポートに重点を置いています。iFデザインアワードの紹介でも、入力の負担、データの読みづらさ、家族共有の不便さ、EMR連携までがまとめて課題として挙げられていました。</p>
          <p>これはとても現実的です。健康アプリが続かない理由は、分析が足りないからではなく、記録が面倒で、結果が理解しづらいからという場合が少なくありません。PASTAはその両方を減らそうとしているように見えます。</p>
          <p>さらに最近は体重や肥満支援にも広がっていて、単一の血糖アプリより、慢性疾患管理の基盤に近づこうとしている印象があります。</p>

          <h3>本当の分岐点は、データが病院ワークフローに入ることです</h3>
          <p>より大きなポイントは病院側にあります。報道によれば、PASTAのEHR連携は主要病院で広がっており、医療者向けの<code>PASTA Connect Pro</code>もすでに多くの病院で使われています。生活データが病院の業務画面に入ってくると、デジタルヘルスは外側の記録ではなく、診療支援の一部に近づきます。</p>
          <p>これは患者にとっても医療者にとっても意味があります。医療者は別システムを開かずに生活パターンを見られ、患者は自分の記録が実際のケアに活かされる可能性を感じやすくなります。</p>
          <ul>
            <li>患者は日常の中でデータを残し、</li>
            <li>医療者はその情報を既存システムの中で確認し、</li>
            <li>診療後の接点は再びデジタルチャネルに戻ります。</li>
          </ul>

          <h3>Karechatは来院前後の接点をつなぐ役割に近いです</h3>
          <p>ここでKarechatの意味が出てきます。Karechatはカカオトーク基盤で予約、決済、証明書発行などを扱う病院コンシェルジュ型サービスです。PASTAが自己管理データを扱う側なら、Karechatは病院利用の接点を扱う側です。</p>
          <p>この二つが一緒に動くと、診療前、診療中、診療後の流れが少しずつ一つの会社の体験設計の中に収まってきます。病院にとっては運用効率と患者接点がつながり、患者にとっては慣れたカカオトーク環境で病院利用の体験がつながっていく構造になります。</p>

          <h3>だからカカオヘルスケアはアプリ会社より“つなぐ会社”として見るほうがしっくりきます</h3>
          <p>最近の動きを見ると、カカオヘルスケアは血糖管理だけにとどまらず、肥満支援、シニアハウジング、より広い慢性疾患管理へと広げようとしています。ただし、その戦略が本当に意味を持つのは、それぞれのサービスが別々に増えるのではなく、一つの流れとして接続されるときです。</p>
          <p>もちろん課題も残ります。利用継続率はどうか、医療者がどれだけ実際に参照するのか、利便性が臨床的価値につながるのか。デジタルヘルスでは、導入件数だけでは十分ではありません。</p>
          <p>それでも今のカカオヘルスケアを理解するうえでは、PASTA単体より、その後ろにある接続構造を見るほうがずっと面白いと思います。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://recruit.kakaohealthcare.com/" target="_blank" rel="noreferrer">Kakao Healthcare recruit site: company vision and business structure</a></li>
            <li><a href="https://kakaohealthcare.com/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4-%ED%99%A9%ED%9D%AC-jpm-healthcare-conference-%ED%98%88%EB%8B%B9-%EA%B4%80%EB%A6%AC-%ED%8C%8C%EC%8A%A4%ED%83%80-2%EC%9B%94-%EA%B5%AD/" target="_blank" rel="noreferrer">Kakao Healthcare: JPM Healthcare Conference and PASTA/EMR linkage plan</a></li>
            <li><a href="https://kakaohealthcare.com/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%97%AC%EC%8A%A4%EC%BC%80%EC%96%B4-if-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%96%B4%EC%9B%8C%EB%93%9C/" target="_blank" rel="noreferrer">Kakao Healthcare: iF Design Award 2025 note on PASTA UX and EMR linkage</a></li>
            <li><a href="https://www.etnews.com/20250410000235" target="_blank" rel="noreferrer">ETNews: PASTA EHR integration expansion and Connect Pro adoption</a></li>
            <li><a href="https://www.etnews.com/20240731000094" target="_blank" rel="noreferrer">ETNews: Karechat adoption in hospitals</a></li>
            <li><a href="https://www.etnews.com/20250217000092" target="_blank" rel="noreferrer">ETNews: senior housing and PHR-based care linkage with Caring</a></li>
            <li><a href="https://www.newsis.com/view/NISX20260203_0003500235" target="_blank" rel="noreferrer">Newsis: obesity patient support added to PASTA with Novo Nordisk</a></li>
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
      src: '/blog/openclaw-manus-hero-generated.webp',
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
      src: '/blog/ai-workflow-teams-hero-generated.webp',
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
      src: '/blog/first-daily-post-hero-generated.webp',
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
