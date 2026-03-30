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
    slug: 'practical-way-to-connect-obsidian-and-claude-code',
    category: 'ai',
    createdAt: '2026-03-31T15:40:00+09:00',
    heroImage: {
      src: '/blog/ai-workflow-hero.jpg',
    },
    locales: {
      ko: {
        title: '옵시디언과 Claude Code를 연결해 쓰는 가장 현실적인 방법',
        keywords: ['AI'],
        excerpt: '옵시디언과 Claude Code를 묶는 원클릭 버튼이 따로 있는 것은 아니지만, 볼트 폴더를 함께 쓰고 URI·CLI·MCP를 단계적으로 붙이면 생각보다 단단한 작업 흐름을 만들 수 있습니다.',
        heroImage: {
          alt: '노트와 코드 작업이 함께 열려 있는 데스크 위 노트북과 문서 화면',
          caption: '옵시디언과 Claude Code의 조합은 화려한 통합 버튼보다, 같은 작업 공간을 공유하면서 마찰을 줄이는 쪽에서 힘이 나옵니다.',
        },
        contentHtml: `
          <p>옵시디언을 오래 쓰다 보면 비슷한 순간이 자주 옵니다. 메모는 점점 쌓이는데, 정리와 재구성은 늘 손이 많이 갑니다. 반대로 Claude Code 같은 도구를 붙이면 초안 정리, 구조 재편, 문서 요약은 빨라지지만, 노트 앱과 작업 환경이 따로 놀기 쉽습니다.</p>
          <p>그래서 많은 분이 “옵시디언과 Claude Code를 직접 연결하는 공식 방법이 있나?”를 먼저 찾게 됩니다. 결론부터 말하면, 모두가 바로 누르는 원클릭 통합이 있는 구조는 아닙니다.</p>
          <p>대신 현실적으로는 더 좋은 길이 있습니다. 옵시디언 볼트를 Claude Code의 작업 공간으로 쓰고, 필요할 때 URI와 CLI를 붙이고, 정말 도구 수준으로 엮고 싶을 때만 MCP로 가는 방식입니다.</p>

          <h3>먼저 전제를 바로잡자: 핵심은 전용 버튼보다 같은 작업 공간입니다</h3>
          <p>옵시디언 공식 문서를 보면 볼트는 결국 내 로컬 파일을 담는 작업 공간입니다. 이 점이 중요합니다. Claude Code는 특정 “옵시디언 전용 통합”이 아니라, 내가 연 폴더와 파일을 기준으로 가장 잘 작동하는 도구에 가깝기 때문입니다.</p>
          <p>즉 두 도구를 연결하는 첫 단계는 복잡한 플러그인 설치가 아니라, 옵시디언이 쓰는 볼트 폴더를 Claude Code도 그대로 읽고 다루게 만드는 것입니다. 이 접근이 생각보다 강한 이유는 메모, 초안, 회의록, 블로그 문서가 한 자리에서 이어지기 시작하기 때문입니다.</p>
          <blockquote>이 조합에서 가장 중요한 것은 “직접 연결”보다 “같은 볼트를 두 도구가 같이 쓰는가”입니다.</blockquote>

          <h3>1단계: 옵시디언 볼트 폴더를 Claude Code 작업 디렉터리로 씁니다</h3>
          <p>가장 안정적인 시작은 단순합니다. 옵시디언 볼트 폴더를 터미널에서 열고 그 안에서 <code>claude</code>를 실행하면 됩니다. 그러면 Claude Code는 이미 정리된 마크다운 노트, 폴더 구조, 첨부 파일 흐름을 그대로 문맥으로 삼을 수 있습니다.</p>
          <p>여기서 바로 해둘 만한 일은 볼트 루트에 <code>CLAUDE.md</code>를 두는 것입니다. Anthropic 공식 문서 기준으로 이 파일은 세션 시작 시 읽히는 프로젝트 지침 역할을 합니다. 옵시디언을 쓰는 분이라면 여기에 위키링크를 유지할지, 프론트매터 형식은 어떻게 둘지, 첨부 파일 경로는 건드리지 말지 같은 규칙을 적어두는 편이 좋습니다.</p>
          <ul>
            <li>긴 회의록을 요약해 짧은 메모로 줄이기</li>
            <li>흩어진 노트를 하나의 글 초안으로 묶기</li>
            <li>폴더 구조를 정리하면서 제목과 링크를 함께 손보기</li>
            <li>리서치 노트에서 핵심 문단만 추려 블로그 뼈대 만들기</li>
          </ul>
          <p>이 단계만으로도 체감은 꽤 큽니다. 굳이 대단한 자동화를 하지 않아도, “노트 앱 따로, AI 도구 따로”였던 흐름이 하나로 붙기 시작하기 때문입니다.</p>

          <h3>2단계: URI와 CLI를 붙이면 작업 흐름이 훨씬 짧아집니다</h3>
          <p>기본 연결이 끝나면 다음은 여기를 자동화하는 문제입니다. 옵시디언 공식 도움말을 보면 <code>obsidian://</code> URI는 노트 열기, 새 노트 만들기, 데일리 노트 열기, 검색 실행 같은 작업을 다른 앱이나 단축어에서 바로 부를 수 있게 해줍니다. 이건 Claude Code와의 연결에서도 꽤 쓸모가 있습니다.</p>
          <p>예를 들어 Claude Code가 특정 문서를 정리한 뒤, 마지막에 <code>obsidian://open</code>이나 <code>obsidian://new</code> 흐름으로 넘겨서 해당 노트를 바로 띄우게 할 수 있습니다. 브라우저, 단축어 앱, 런처와도 잘 이어집니다.</p>
          <p>여기서 한 단계 더 가면 Obsidian CLI가 있습니다. 최근 공식 CLI는 <code>obsidian daily</code>, <code>obsidian search</code>, <code>obsidian create</code>, <code>obsidian read</code> 같은 명령을 지원하고, 앱이 실행 중이면 터미널에서 바로 노트를 다루게 해줍니다. 개인적으로는 대부분의 사용자가 이 단계까지만 해도 충분하다고 봅니다.</p>
          <ul>
            <li>오늘 메모를 열고 싶을 때: <code>obsidian daily</code></li>
            <li>특정 키워드가 들어간 노트를 찾을 때: <code>obsidian search query="..."</code></li>
            <li>새 글 초안을 만들 때: <code>obsidian create name="..."</code></li>
            <li>외부 도구에서 노트 하나를 바로 열 때: <code>obsidian://open</code></li>
          </ul>
          <p>즉, Claude Code가 내용을 만들고 다듬는 쪽이라면, URI와 CLI는 그 결과물을 옵시디언의 실제 노트 흐름 안으로 다시 밀어 넣는 접착제에 가깝습니다.</p>

          <h3>3단계: MCP는 가장 강하지만, 그만큼 판단이 더 필요합니다</h3>
          <p>MCP는 Anthropic이 설명하는 대로 외부 데이터와 도구를 AI에 연결하는 개방형 표준입니다. 그래서 정말로 “옵시디언 노트를 Claude Code의 도구처럼 다루고 싶다”면 MCP 방향이 가장 강한 선택지입니다.</p>
          <p>실제로 커뮤니티에는 옵시디언과 Claude Code를 잇는 MCP 서버 프로젝트도 나와 있습니다. 다만 여기부터는 성격이 조금 달라집니다. 단순히 같은 폴더를 읽는 수준이 아니라, 플러그인과 로컬 API, 툴 권한, 민감한 노트 처리 같은 보안 판단이 같이 따라옵니다.</p>
          <p>옵시디언 공식 보안 문서도 커뮤니티 플러그인은 파일 접근, 인터넷 연결, 추가 프로그램 설치까지 가능한 만큼 신중하게 판단하라고 안내합니다. 민감한 볼트를 다루는 분이라면 이 부분을 가볍게 보면 안 됩니다.</p>
          <blockquote>MCP는 가장 멋져 보이는 단계이기도 하지만, 대부분의 사람에게는 가장 먼저 할 일이 아니라 가장 나중에 붙일 일에 가깝습니다.</blockquote>

          <h3>그래서 저는 이런 순서를 권합니다</h3>
          <ol>
            <li>먼저 옵시디언 볼트를 Claude Code 작업 폴더로 둡니다.</li>
            <li>볼트 루트에 <code>CLAUDE.md</code>를 두고 마크다운 규칙과 링크 규칙을 고정합니다.</li>
            <li>반복 동작이 불편해질 때 URI나 CLI를 붙입니다.</li>
            <li>그래도 실시간 툴 연동이 아쉽고, 보안 범위를 감당할 수 있을 때만 MCP로 갑니다.</li>
          </ol>
          <p>이 순서가 좋은 이유는 단순합니다. 처음부터 복잡한 통합을 만들지 않아도 충분히 생산성이 올라가고, 어디까지가 내게 필요한 연결인지도 더 빨리 보이기 때문입니다.</p>

          <h3>결국 중요한 것은 연결감보다 마찰 감소입니다</h3>
          <p>옵시디언과 Claude Code를 같이 쓰는 목적은 보기 좋은 통합 화면을 만드는 데 있지 않습니다. 노트를 다시 찾고, 초안을 만들고, 정리한 결과를 다시 볼트 안으로 넣는 과정을 덜 귀찮게 만드는 데 있습니다.</p>
          <p>그래서 이 조합은 오히려 화려하지 않을 때 더 좋습니다. 같은 볼트를 공유하고, 필요한 자동화만 얹고, 정말 필요할 때만 더 강한 연결을 선택하는 쪽이 오래 갑니다. 실전에서는 그 정도가 가장 단단합니다.</p>

          <h3>참고자료</h3>
          <ul>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer">Anthropic Claude Code overview</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/mcp" target="_blank" rel="noreferrer">Anthropic Model Context Protocol documentation</a></li>
            <li><a href="https://help.obsidian.md/vault" target="_blank" rel="noreferrer">Obsidian Help: vaults</a></li>
            <li><a href="https://help.obsidian.md/Extending%2BObsidian/Obsidian%2BURI" target="_blank" rel="noreferrer">Obsidian Help: Obsidian URI</a></li>
            <li><a href="https://help.obsidian.md/cli" target="_blank" rel="noreferrer">Obsidian Help: CLI</a></li>
            <li><a href="https://help.obsidian.md/plugin-security" target="_blank" rel="noreferrer">Obsidian Help: plugin security</a></li>
            <li><a href="https://github.com/iansinnott/obsidian-claude-code-mcp" target="_blank" rel="noreferrer">iansinnott/obsidian-claude-code-mcp</a></li>
          </ul>
        `,
      },
      en: {
        title: 'The Most Practical Way to Connect Obsidian and Claude Code',
        keywords: ['AI'],
        excerpt: 'There is no universal one-click integration between Obsidian and Claude Code, but a shared vault folder plus URI, CLI and MCP in the right order creates a workflow that is much more useful than it first sounds.',
        heroImage: {
          alt: 'Laptop screens showing notes and development tools on a tidy desk',
          caption: 'The useful connection between Obsidian and Claude Code comes less from a flashy integration and more from reducing friction inside the same working space.',
        },
        contentHtml: `
          <p>If you keep a serious Obsidian vault, the same problem eventually shows up. Your notes become rich, but turning them into drafts, summaries and reusable documents still takes time. Claude Code can speed that part up, yet it is easy for the note app and the AI workflow to live in separate lanes.</p>
          <p>That is why people often start with the same question: is there an official direct way to connect Obsidian and Claude Code? The practical answer is not a simple yes.</p>
          <p>There is no universal first-party one-click bridge. What works better in practice is a layered setup: share the vault folder first, add URI or CLI automation next, and only move to MCP if you truly need a deeper tool-level connection.</p>

          <h3>Start with the right assumption: shared workspace matters more than a dedicated button</h3>
          <p>Obsidian vaults are local working spaces. That matters because Claude Code is strongest when it can operate directly on the files and folders you already use. In other words, the first real connection between the two tools is not a plugin. It is the fact that both of them can work on the same vault.</p>
          <p>Once Claude Code is pointed at the vault folder, your notes, drafts, research files and markdown structure stop being background material and start becoming live working context.</p>
          <blockquote>The most useful version of this setup is not “Obsidian integrated into Claude Code.” It is “both tools operating on the same vault without friction.”</blockquote>

          <h3>Step 1: use the Obsidian vault as the Claude Code working directory</h3>
          <p>The most stable starting point is simple: open the vault folder in your terminal and run <code>claude</code> there. Claude Code can then work directly with the markdown files, folders and attachments you already maintain in Obsidian.</p>
          <p>This is also the right place to add a <code>CLAUDE.md</code> file at the vault root. Anthropic documents <code>CLAUDE.md</code> as the instruction file Claude Code reads at the beginning of a session. For an Obsidian workflow, that is where you define rules such as preserving wikilinks, keeping frontmatter intact and avoiding attachment path changes.</p>
          <ul>
            <li>Condense long meeting notes into cleaner summaries.</li>
            <li>Merge scattered notes into a blog draft.</li>
            <li>Refactor folder structure while preserving note links.</li>
            <li>Turn research notes into a publishable outline.</li>
          </ul>
          <p>Even without deeper automation, this alone already changes the feel of the workflow.</p>

          <h3>Step 2: add Obsidian URI and CLI when you want shorter loops</h3>
          <p>Once the basic setup is working, the next improvement is reducing the number of manual steps. Obsidian URI is built exactly for that kind of bridge. The official documentation shows that <code>obsidian://</code> can open notes, create notes, open the daily note and run searches from outside the app.</p>
          <p>That means Claude Code can help generate or clean content, and your shortcuts or scripts can immediately bounce you back into the exact note you want to review.</p>
          <p>The newer Obsidian CLI pushes this idea further. The official CLI supports commands such as <code>obsidian daily</code>, <code>obsidian search</code>, <code>obsidian create</code> and <code>obsidian read</code>. For most users, this is the sweet spot: enough automation to feel fast, without taking on too much complexity.</p>
          <ul>
            <li><code>obsidian daily</code> to jump into the daily note</li>
            <li><code>obsidian search query="..."</code> to find notes quickly</li>
            <li><code>obsidian create name="..."</code> to create a new draft from terminal flow</li>
            <li><code>obsidian://open</code> to jump into a specific note from another tool</li>
          </ul>

          <h3>Step 3: use MCP only if you need a stronger tool-level connection</h3>
          <p>MCP, as Anthropic describes it, is the open protocol for connecting Claude Code to external tools and data sources. So if your goal is to make Obsidian feel less like a folder and more like a live tool surface, MCP is the strongest path.</p>
          <p>Community projects already exist for this, including an Obsidian-Claude Code MCP server on GitHub. But this is where the setup stops being light. You are now dealing with plugin trust, local APIs, permission boundaries and the reality of sensitive notes.</p>
          <p>Obsidian's own security guidance is clear that community plugins can access files, reach the internet and even install additional programs. That does not mean you should avoid them entirely. It means this is the stage where security judgment matters.</p>
          <blockquote>MCP is the most powerful layer, but it is usually the last layer to add, not the first.</blockquote>

          <h3>The order I would recommend</h3>
          <ol>
            <li>Point Claude Code at the Obsidian vault folder.</li>
            <li>Add <code>CLAUDE.md</code> to lock in markdown and link conventions.</li>
            <li>Bring in URI or CLI once repetition starts getting annoying.</li>
            <li>Move to MCP only if you need live tool integration and can evaluate the security tradeoffs.</li>
          </ol>
          <p>That order works because it gets you useful gains early without forcing complexity too soon.</p>

          <h3>What really matters is not integration theater but lower friction</h3>
          <p>The value here is not in saying that your note app and AI tool are “fully integrated.” The value is in making it easier to find notes, shape drafts and return the result to the vault without breaking your working rhythm.</p>
          <p>In practice, the calmer setup is often the better one. Shared vault first, lightweight automation next, deeper integration only when it is truly earned.</p>

          <h3>References</h3>
          <ul>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer">Anthropic Claude Code overview</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/mcp" target="_blank" rel="noreferrer">Anthropic Model Context Protocol documentation</a></li>
            <li><a href="https://help.obsidian.md/vault" target="_blank" rel="noreferrer">Obsidian Help: vaults</a></li>
            <li><a href="https://help.obsidian.md/Extending%2BObsidian/Obsidian%2BURI" target="_blank" rel="noreferrer">Obsidian Help: Obsidian URI</a></li>
            <li><a href="https://help.obsidian.md/cli" target="_blank" rel="noreferrer">Obsidian Help: CLI</a></li>
            <li><a href="https://help.obsidian.md/plugin-security" target="_blank" rel="noreferrer">Obsidian Help: plugin security</a></li>
            <li><a href="https://github.com/iansinnott/obsidian-claude-code-mcp" target="_blank" rel="noreferrer">iansinnott/obsidian-claude-code-mcp</a></li>
          </ul>
        `,
      },
      ja: {
        title: 'ObsidianとClaude Codeをつなげて使う、いちばん現実的な方法',
        keywords: ['AI'],
        excerpt: 'ObsidianとClaude Codeに万能なワンクリック統合があるわけではありませんが、同じVaultを共有し、URI・CLI・MCPを順番に足していくと、かなり実用的な作業フローになります。',
        heroImage: {
          alt: 'ノートと開発ツールが並んだノートPC画面と整った作業机',
          caption: 'ObsidianとClaude Codeの組み合わせは、派手な統合機能より、同じ作業空間の中で摩擦を減らすことに強みがあります。',
        },
        contentHtml: `
          <p>ObsidianのVaultを長く育てていると、似た悩みが出てきます。メモは増えるのに、それを要約したり、下書きにまとめたり、使いやすい形に整えたりする作業は意外と手間がかかります。Claude Codeを使えばそこはかなり速くなりますが、ノートの世界とAIの作業が別々に動いてしまいやすいのも事実です。</p>
          <p>そこで多くの人がまず気になるのが、「ObsidianとClaude Codeを直接つなぐ公式な方法はあるのか」という点だと思います。実際には、そこは少し整理して考えたほうがわかりやすいです。</p>
          <p>万能なワンクリック統合があるというより、同じVaultを共有し、必要に応じてURIやCLIを足し、さらに必要ならMCPへ進むという段階的な組み方のほうが現実的です。</p>

          <h3>まず前提を整えると、専用ボタンより同じ作業空間の共有が重要です</h3>
          <p>ObsidianのVaultはローカルの作業空間です。Claude Codeは、そのフォルダとファイルを直接扱えるときに最も実用的に働きます。つまり、この二つを結ぶ最初の一歩は特別なプラグインではなく、同じVaultを両方が扱うことです。</p>
          <p>この形にすると、メモ、下書き、調査ノート、Markdown構造そのものが、Claude Codeにとって生きた作業コンテキストになります。</p>
          <blockquote>この組み合わせの本質は「完全統合」より、「同じVaultを共有しながら切り替えの面倒を減らすこと」にあります。</blockquote>

          <h3>1段階目: ObsidianのVaultをClaude Codeの作業ディレクトリにします</h3>
          <p>いちばん安定した出発点はとても単純です。Vaultフォルダをターミナルで開き、その中で <code>claude</code> を実行します。これでClaude Codeは、ObsidianのMarkdownノート、フォルダ構成、添付ファイルの流れをそのまま前提に扱えるようになります。</p>
          <p>この段階でVaultのルートに <code>CLAUDE.md</code> を置いておくと便利です。Anthropicの公式説明では、これはClaude Codeがセッション開始時に読む指示ファイルです。Obsidian用途なら、Wikiリンクを維持すること、フロントマターを壊さないこと、添付ファイルの参照先を勝手に変えないことなどを書いておくと安定します。</p>
          <ul>
            <li>長い会議メモを短く整理する</li>
            <li>散らばったノートをひとつの下書きにまとめる</li>
            <li>リンクを保ちながら構造を整える</li>
            <li>調査ノートから記事の骨組みを作る</li>
          </ul>
          <p>この段階だけでも、作業感はかなり変わります。</p>

          <h3>2段階目: URIとCLIを足すと往復がかなり短くなります</h3>
          <p>基本形が動いたら、次は手数を減らす段階です。Obsidian URIは、ノートを開く、新規作成する、デイリーノートを開く、検索する、といった操作を他のアプリやショートカットから呼び出せる仕組みです。</p>
          <p>Claude Codeで内容を整えたあと、そのまま目的のノートを開いて見直したい場面では、この仕組みがとても便利です。</p>
          <p>さらに最近のObsidian CLIでは、<code>obsidian daily</code>、<code>obsidian search</code>、<code>obsidian create</code>、<code>obsidian read</code> などが使えます。多くの人にとっては、この段階がいちばん扱いやすい落としどころだと思います。</p>
          <ul>
            <li><code>obsidian daily</code> でその日のノートを開く</li>
            <li><code>obsidian search query="..."</code> で素早く検索する</li>
            <li><code>obsidian create name="..."</code> で新規下書きを作る</li>
            <li><code>obsidian://open</code> で他ツールから特定ノートへ飛ぶ</li>
          </ul>

          <h3>3段階目: 本当に強く結びたいときだけMCPを使います</h3>
          <p>MCPは、Anthropicが案内している外部ツール接続のためのオープンな仕組みです。Obsidianを単なる共有フォルダではなく、Claude Codeから扱える道具のようにしたいなら、この方向が最も強力です。</p>
          <p>実際、コミュニティにはObsidianとClaude CodeをつなぐMCPサーバープロジェクトもあります。ただし、ここから先は軽い設定では済みません。プラグインの信頼性、ローカルAPI、権限範囲、機密ノートの扱いまで考える必要が出てきます。</p>
          <p>Obsidianの公式セキュリティ文書でも、コミュニティプラグインはファイル、ネットワーク、追加プログラムにまで触れうるので慎重に判断するよう案内されています。機密性の高いVaultなら、ここは特に重要です。</p>
          <blockquote>MCPは最も強力ですが、最初に入れるべきものというより、必要になってから最後に足すものだと考えたほうが安全です。</blockquote>

          <h3>私ならこの順番をすすめます</h3>
          <ol>
            <li>まずClaude CodeをObsidianのVaultフォルダで動かします。</li>
            <li><code>CLAUDE.md</code> を置いてMarkdownとリンクのルールを固定します。</li>
            <li>繰り返し操作が増えたらURIかCLIを足します。</li>
            <li>それでも足りず、権限や安全性を見極められるならMCPへ進みます。</li>
          </ol>
          <p>この順番のよいところは、早い段階で十分な効果を得ながら、必要以上に複雑にしないことです。</p>

          <h3>結局大事なのは、統合感より摩擦を減らすことです</h3>
          <p>ObsidianとClaude Codeを一緒に使う価値は、「完全統合された」と言えることではありません。ノートを探し、下書きを整え、結果をまたVaultへ戻す流れを、少しでも自然にすることにあります。</p>
          <p>実際には、派手すぎない構成のほうが長く使えます。同じVaultを共有し、必要な自動化だけを足し、本当に必要なときだけ深い連携に進む。そのくらいが、いちばん実務的です。</p>

          <h3>参考資料</h3>
          <ul>
            <li><a href="https://code.claude.com/docs/en/overview" target="_blank" rel="noreferrer">Anthropic Claude Code overview</a></li>
            <li><a href="https://docs.anthropic.com/en/docs/mcp" target="_blank" rel="noreferrer">Anthropic Model Context Protocol documentation</a></li>
            <li><a href="https://help.obsidian.md/vault" target="_blank" rel="noreferrer">Obsidian Help: vaults</a></li>
            <li><a href="https://help.obsidian.md/Extending%2BObsidian/Obsidian%2BURI" target="_blank" rel="noreferrer">Obsidian Help: Obsidian URI</a></li>
            <li><a href="https://help.obsidian.md/cli" target="_blank" rel="noreferrer">Obsidian Help: CLI</a></li>
            <li><a href="https://help.obsidian.md/plugin-security" target="_blank" rel="noreferrer">Obsidian Help: plugin security</a></li>
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
      src: '/blog/healthcare-ai-workflow-hero.jpg',
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
