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
