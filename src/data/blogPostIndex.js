const SUPPORTED_BLOG_LOCALES = ['ko', 'en', 'ja'];
const DEFAULT_BLOG_LOCALE = 'ko';

const BLOG_CATEGORY_LABELS = {
  ai: { ko: 'AI', en: 'AI', ja: 'AI' },
  healthcare: { ko: '헬스케어', en: 'Healthcare', ja: 'ヘルスケア' },
  daily: { ko: '일상', en: 'Daily', ja: '日常' },
};

export const resolveBlogLocale = (language = DEFAULT_BLOG_LOCALE) => {
  const normalized = language.toLowerCase().split('-')[0];
  return SUPPORTED_BLOG_LOCALES.includes(normalized) ? normalized : DEFAULT_BLOG_LOCALE;
};

export const getBlogCategoryLabel = (category, language = DEFAULT_BLOG_LOCALE) => {
  const locale = resolveBlogLocale(language);
  return BLOG_CATEGORY_LABELS[category]?.[locale] ?? category ?? 'Post';
};

export const getLocalizedBlogPostPreview = (post, language = DEFAULT_BLOG_LOCALE) => {
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

export const blogPostIndex = [
  {
    "slug": "how-to-use-ai-agents-well-in-2026",
    "category": "ai",
    "createdAt": "2026-04-10T00:18:00+09:00",
    "heroImage": {
      "src": "/blog/ai-agent-cli-workflow-hero.svg"
    },
    "locales": {
      "ko": {
        "title": "왜 AI Agent는 CLI에서 먼저 강해지는가",
        "excerpt": "2026년 4월 10일 기준으로 실전 AI agent는 채팅 UI보다 CLI에서 더 자주 성공합니다. 파일, Git, 로그, API, MCP, 승인 흐름을 같은 작업면에 둘 수 있기 때문입니다.",
        "keywords": [
          "AI",
          "AI Agent",
          "CLI",
          "MCP"
        ],
        "heroImage": {
          "alt": "터미널 창, 작업 카드, MCP 연결, 승인 게이트, 백그라운드 잡이 한 화면에 정리된 CLI 중심 AI agent 워크플로 일러스트",
          "caption": "요즘 실전 AI agent는 화려한 채팅창보다 CLI 위에서 더 빨리 안정화됩니다. 이유는 도구 연결, 재현성, 승인 경계를 한 자리에서 다룰 수 있기 때문입니다."
        }
      },
      "en": {
        "title": "Why AI Agents Work Best in CLI-First Workflows",
        "excerpt": "As of April 10, 2026, practical AI agents often succeed in the CLI before they succeed in a chat UI, because files, Git, logs, APIs, MCP, and approvals can all live on the same execution surface.",
        "keywords": [
          "AI",
          "AI Agent",
          "CLI",
          "MCP"
        ],
        "heroImage": {
          "alt": "A CLI-first AI agent workflow illustration with terminal windows, MCP links, approval gates, and background jobs arranged around a central execution board",
          "caption": "The practical advantage of CLI-first agents is not nostalgia. It is that tools, approvals, logs, and repeatable execution can all be kept in one place."
        }
      },
      "ja": {
        "title": "なぜAIエージェントはCLIで先に強くなるのか",
        "excerpt": "2026年4月10日時点で、実務で使えるAIエージェントは洗練されたチャットUIより先にCLIで成功することが多いです。ファイル、Git、ログ、API、MCP、承認フローを同じ実行面に置けるからです。",
        "keywords": [
          "AI",
          "AI Agent",
          "CLI",
          "MCP"
        ],
        "heroImage": {
          "alt": "ターミナル画面、MCP接続、承認ゲート、バックグラウンドジョブが一つのボードに整理されたCLI中心のAIエージェント運用イラスト",
          "caption": "CLI-firstの強みは古い操作感ではありません。ツール接続、承認、ログ、再現可能な実行を一つの面で扱えることです。"
        }
      }
    }
  },
  {
    "slug": "why-ai-agent-design-is-now-about-state-and-tool-boundaries",
    "category": "ai",
    "createdAt": "2026-04-02T23:45:00+09:00",
    "heroImage": {
      "src": "/blog/ai-agent-state-tools-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "지금 AI 에이전트 설계의 핵심은 왜 모델보다 상태 관리와 도구 경계에 있을까",
        "excerpt": "요즘 공식 자료를 읽어보면 AI 에이전트 경쟁의 무게중심이 모델 점수보다 상태 관리, 도구 실행 위치, 승인 경계 쪽으로 빠르게 이동하고 있습니다.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "상태 타임라인, 승인 게이트, 도구 호출 카드가 보이는 AI 에이전트 워크플로 대시보드를 개발자가 검토하는 장면",
          "caption": "지금의 AI 에이전트 설계는 모델 하나의 지능보다, 상태를 어디에 두고 도구를 어떻게 열어 줄지에서 더 크게 갈립니다."
        }
      },
      "en": {
        "title": "Why AI Agent Design Is Now More About State and Tool Boundaries Than Model Rankings",
        "excerpt": "Recent official docs from OpenAI, Anthropic, and Google all suggest the same shift: real agent quality now depends less on model rankings and more on state ownership, tool execution, and approval boundaries.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "A developer reviewing an AI agent workflow dashboard with state timeline, approval gates, and tool-call cards",
          "caption": "In current agent design, the harder problem is rarely the model alone. It is where state lives and how tool access is bounded."
        }
      },
      "ja": {
        "title": "なぜ今のAIエージェント設計では、モデル性能より状態管理とツール境界が重要なのか",
        "excerpt": "最近の公式資料を読むと、AIエージェントの競争軸はモデル順位そのものより、状態の持ち方、ツール実行の位置、承認境界へと移りつつあります。",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "状態タイムライン、承認ゲート、ツール呼び出しカードが表示されたAIエージェントのワークフローダッシュボードを開発者が見ている様子",
          "caption": "いまのAIエージェント設計では、モデル単体の賢さより、状態をどこに置き、ツールをどう制限するかが大きな差になります。"
        }
      }
    }
  },
  {
    "slug": "practical-way-to-automate-internal-services-with-claude-opus",
    "category": "ai",
    "createdAt": "2026-04-02T19:35:00+09:00",
    "heroImage": {
      "src": "/blog/claude-opus-internal-automation-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "Claude Opus로 내부 서비스 자동화를 붙이는 가장 현실적인 방법",
        "excerpt": "사내 자동화는 챗봇 하나를 붙이는 일보다, 되돌릴 수 있는 업무를 좁게 잡고 Claude Opus를 판단 엔진으로 쓰는 쪽이 훨씬 빨리 성과가 납니다.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "운영 담당자가 티켓 큐와 문서 요약, 승인 체크리스트가 보이는 내부 자동화 대시보드를 검토하는 장면",
          "caption": "Claude Opus 자동화는 채팅창보다, 내부 도구와 승인 흐름을 묶은 운영 화면으로 볼 때 더 정확해집니다."
        }
      },
      "en": {
        "title": "The Most Practical Way to Automate Internal Services with Claude Opus",
        "excerpt": "Internal automation works better when Claude Opus is treated as a judgment engine inside a narrow workflow, not as a free-form chatbot sitting on top of every internal system.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "An operations lead reviewing an internal automation dashboard with a ticket queue, document summary, and approval checklist",
          "caption": "Claude Opus becomes more useful in internal operations when it sits inside a tool-and-approval workflow rather than a generic chat interface."
        }
      },
      "ja": {
        "title": "Claude Opusで社内サービス自動化を組み込む、いちばん現実的な進め方",
        "excerpt": "社内自動化は、Claude Opusを何でも答えるチャットとして置くより、狭い業務ループの判断エンジンとして使うほうがはるかに安定します。",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "チケットキュー、文書要約、承認チェックリストが表示された社内自動化ダッシュボードを運用担当者が確認している様子",
          "caption": "Claude Opusは汎用チャット画面より、社内ツールと承認フローの中に置いたほうが実務で力を発揮します。"
        }
      }
    }
  },
  {
    "slug": "how-agentic-ai-physical-ai-and-digital-twin-come-together-in-healthcare",
    "category": "healthcare",
    "createdAt": "2026-04-01T12:40:00+09:00",
    "heroImage": {
      "src": "/blog/healthcare-ai-workflow-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "헬스케어에서 Agentic AI, Physical AI, Digital Twin은 결국 한 흐름으로 만납니다",
        "excerpt": "헬스케어 AI의 다음 장면은 챗봇 하나가 아니라, 에이전트가 조정하고 물리 시스템이 실행하며 디지털 트윈이 미리 시뮬레이션하는 운영 구조에 더 가깝습니다.",
        "keywords": [
          "헬스케어"
        ],
        "heroImage": {
          "alt": "의료진 대시보드와 병실 센서, 환자 상태 모델이 하나의 운영 화면처럼 연결된 의료 AI 일러스트",
          "caption": "헬스케어의 다음 AI는 답변형 인터페이스 하나보다, 예측하고 조정하고 실행하는 운영 루프에 가까워 보입니다."
        }
      },
      "en": {
        "title": "In Healthcare, Agentic AI, Physical AI, and Digital Twin Are Starting to Converge",
        "excerpt": "The next healthcare AI stack looks less like a single chatbot and more like an operating loop where agents coordinate, physical systems execute, and digital twins simulate ahead of action.",
        "keywords": [
          "Healthcare"
        ],
        "heroImage": {
          "alt": "A healthcare AI illustration combining a clinical dashboard, room sensors, and a patient-state model in one operational scene",
          "caption": "The next layer of healthcare AI may be less a conversational interface and more an operating loop that predicts, coordinates, and executes."
        }
      },
      "ja": {
        "title": "ヘルスケアでは Agentic AI、Physical AI、Digital Twin がひとつの流れとしてつながり始めています",
        "excerpt": "これからのヘルスケアAIは、単一のチャットボットよりも、デジタルツインが予測し、エージェントが調整し、フィジカルAIが実行する運用ループに近づいていきます。",
        "keywords": [
          "ヘルスケア"
        ],
        "heroImage": {
          "alt": "臨床ダッシュボード、病室センサー、患者状態モデルが一つの画面でつながって見える医療AIイラスト",
          "caption": "次のヘルスケアAIは、会話インターフェース単体より、予測と調整と実行がつながる運用ループとして見たほうが自然です。"
        }
      }
    }
  },
  {
    "slug": "why-naver-healthcare-looks-more-like-a-clinical-ai-stack",
    "category": "healthcare",
    "createdAt": "2026-04-01T11:20:00+09:00",
    "heroImage": {
      "src": "/blog/naver-healthcare-stack-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "네이버헬스케어를 보다 보면 앱보다 병원 쪽 AI가 먼저 보입니다",
        "excerpt": "지금 네이버헬스케어를 읽는 더 흥미로운 방법은 환자용 앱 하나를 찾는 것이 아니라, CareCall과 Voice EMR, Nursing Agent, 의료데이터 보안을 함께 묶은 의료 AI 운영 구조를 보는 일에 가깝습니다.",
        "keywords": [
          "헬스케어"
        ],
        "heroImage": {
          "alt": "병동 스테이션에서 간호사와 의사가 디지털 문서화 화면을 함께 검토하는 모습",
          "caption": "네이버헬스케어의 흥미로운 지점은 환자용 앱 하나보다, 병동과 문서화, 돌봄 흐름을 잇는 의료 AI 운영 구조에 있습니다."
        }
      },
      "en": {
        "title": "When I Look at NAVER Healthcare, Hospital AI Stands Out More Than Consumer Apps",
        "excerpt": "The more useful way to read NAVER healthcare now is not to look for one patient-facing app, but to look at a layered operational stack built around CareCall, voice documentation, ward agents, medical-data security and hospital infrastructure.",
        "keywords": [
          "Healthcare"
        ],
        "heroImage": {
          "alt": "A nurse and a physician reviewing a digital documentation screen together at a ward station",
          "caption": "The more interesting part of NAVER healthcare may be less a single patient app and more an operating layer connecting wards, documentation and care workflows."
        }
      },
      "ja": {
        "title": "NAVERヘルスケアを見ていると、アプリより病院のAIが先に浮かびます",
        "excerpt": "いまNAVERヘルスケアを読むうえで大事なのは、単一の患者向けアプリを探すことより、CareCall、音声記録、病棟エージェント、医療データ保護を束ねた運用レイヤーを見ることです。",
        "keywords": [
          "ヘルスケア"
        ],
        "heroImage": {
          "alt": "病棟ステーションで看護師と医師がデジタル記録画面を一緒に確認している様子",
          "caption": "NAVERヘルスケアの面白さは、患者向けアプリ一つより、病棟と記録業務、ケア動線をつなぐAI運用構造にあるように見えます。"
        }
      }
    }
  },
  {
    "slug": "why-ai-trends-now-are-about-productization-speed",
    "category": "ai",
    "createdAt": "2026-03-31T22:08:00+09:00",
    "heroImage": {
      "src": "/blog/ai-productization-speed-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "지금 AI 최신 동향의 핵심은 왜 모델 경쟁보다 제품화 속도에 있을까",
        "excerpt": "최근 AI 흐름의 중심은 더 높은 성능표보다, 검색과 도구 호출, 긴 문맥, 실제 실행까지 묶어 일을 끝내는 제품으로 바뀌고 있다는 점에 있습니다.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "여러 개의 업무 패널과 브라우저 창, 지원 인터페이스가 한 화면에 겹쳐진 에디토리얼 스타일 일러스트",
          "caption": "요즘 AI의 차이는 모델 이름 하나보다, 검색하고 정리하고 실행까지 이어지는 제품 경험에서 더 또렷하게 드러납니다."
        }
      },
      "en": {
        "title": "Why the Real AI Trend Now Is Productization Speed, Not Just Model Rankings",
        "excerpt": "The latest AI shift is not only about higher benchmark scores. It is about turning search, tools, long context, and execution into products that actually finish work.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "An editorial-style illustration of overlapping work panels, browser windows, and support interfaces on a single screen",
          "caption": "The clearest AI differences now show up less in model names and more in product experiences that can search, organize, and act in one flow."
        }
      },
      "ja": {
        "title": "いまAIの最新動向で本当に重要なのは、モデル競争より製品化の速さです",
        "excerpt": "最近のAIの変化は、単に性能表が上がることではありません。検索、ツール、長い文脈、実行までを束ねて、実際に仕事を終わらせる製品へ移っている点にあります。",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "複数の業務パネル、ブラウザ画面、サポート画面が重なって見えるエディトリアル風のイラスト",
          "caption": "いまAIの差が最もはっきり出るのは、モデル名よりも、検索して整理し実行までつなぐ製品体験のほうです。"
        }
      }
    }
  },
  {
    "slug": "what-you-miss-if-you-see-jnpmedi-only-as-clinical-trial-saas",
    "category": "healthcare",
    "createdAt": "2026-03-31T11:55:00+09:00",
    "heroImage": {
      "src": "/blog/jnpmedi-rdc-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "제이앤피메디를 임상시험 SaaS로만 보면 놓치는 것들",
        "excerpt": "제이앤피메디를 단순한 임상시험 소프트웨어 회사로 이해하면 사업의 절반만 보게 됩니다. 메이븐 클리니컬 클라우드와 프로페셔널 서비스가 함께 움직이는 구조를 봐야 이 회사의 방향이 더 선명해집니다.",
        "keywords": [
          "헬스케어"
        ],
        "heroImage": {
          "alt": "임상 운영 전략 회의실에서 세 명의 실무자가 데이터 대시보드와 시험 운영 흐름도를 함께 검토하는 모습",
          "caption": "제이앤피메디를 이해할 때 중요한 것은 화면 하나보다, 임상 운영과 데이터, 규제 대응을 한 흐름으로 엮으려는 방식입니다."
        }
      },
      "en": {
        "title": "What You Miss If You See JNPMEDI Only as a Clinical Trial SaaS Company",
        "excerpt": "If you describe JNPMEDI only as a clinical trial software company, you only see half of the picture. The combination of Maven Clinical Cloud and professional services explains the company much better.",
        "keywords": [
          "Healthcare"
        ],
        "heroImage": {
          "alt": "Three professionals in a clinical operations meeting reviewing dashboards and trial workflow diagrams on a large screen",
          "caption": "The point of JNPMEDI is not a single interface but the attempt to connect trial operations, data management, and regulatory execution into one working structure."
        }
      },
      "ja": {
        "title": "JNPMEDIを単なる臨床試験SaaSとして見ると見落とすこと",
        "excerpt": "JNPMEDIを単なる臨床試験ソフトウェア会社として理解すると、会社の半分しか見えてきません。Maven Clinical CloudとProfessional Servicesを一緒に見ると、この会社の輪郭がかなりはっきりします。",
        "keywords": [
          "ヘルスケア"
        ],
        "heroImage": {
          "alt": "臨床オペレーション会議で三人の実務者が大きな画面のダッシュボードと試験フロー図を確認している様子",
          "caption": "JNPMEDIを理解するうえで大事なのは、一つの画面よりも、臨床運営とデータ、規制対応を一つの流れとして束ねようとする姿勢です。"
        }
      }
    }
  },
  {
    "slug": "practical-way-to-connect-obsidian-and-claude-code",
    "category": "ai",
    "createdAt": "2026-03-31T15:40:00+09:00",
    "heroImage": {
      "src": "/blog/obsidian-claude-code-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "옵시디언과 Claude Code를 연결해 쓰는 가장 현실적인 방법",
        "excerpt": "요즘 커뮤니티에서 말하는 옵시디언과 Claude 연결은 대체로 세 갈래입니다. shared vault, 옵시디언 내부 플러그인, MCP 서버형을 구분해서 보면 어떤 방식이 내 작업에 맞는지 훨씬 선명해집니다.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "책상 위에서 노트를 적으며 노트북으로 작업하는 손과 메모 공간이 함께 보이는 장면",
          "caption": "옵시디언과 Claude Code의 연결은 거창한 대시보드보다, 메모와 작업 화면이 같은 흐름 안에 놓일 때 가장 실용적으로 느껴집니다."
        }
      },
      "en": {
        "title": "The Most Practical Way to Connect Obsidian and Claude Code",
        "excerpt": "What people call “Obsidian plus Claude” now usually means three different things: a shared vault workflow, an embedded Obsidian plugin, or an MCP server bridge. Once those are separated, the tradeoffs become much clearer.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "Hands writing notes beside an open laptop on a wooden desk",
          "caption": "The practical value of Obsidian and Claude Code shows up when note-taking and active work stay in the same flow instead of living in separate tools."
        }
      },
      "ja": {
        "title": "ObsidianとClaude Codeをつなげて使う、いちばん現実的な方法",
        "excerpt": "最近よく見かける「ObsidianとClaudeの連携」は、実は一つの方法ではありません。shared vault、Obsidian内プラグイン、MCPサーバー型を分けて見ると、自分に合う形がかなりわかりやすくなります。",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "木の机でノートを書きながらノートPCを操作している手元の様子",
          "caption": "ObsidianとClaude Codeのよさは、派手な統合画面より、メモと実作業が同じ流れに収まるところにあります。"
        }
      }
    }
  },
  {
    "slug": "why-kakao-healthcare-looks-bigger-than-a-single-diabetes-app",
    "category": "healthcare",
    "createdAt": "2026-03-31T14:20:00+09:00",
    "heroImage": {
      "src": "/blog/healthcare-ai-workflow-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "카카오헬스케어는 왜 ‘파스타 앱’보다 연결 구조가 더 중요해 보일까",
        "excerpt": "카카오헬스케어를 보고 있으면 요즘 디지털 헬스의 승부가 단일 앱 기능보다 생활 데이터, 병원 EHR, 카카오톡 접점을 어떻게 하나의 흐름으로 잇느냐에 달려 있다는 점이 더 선명하게 보입니다.",
        "keywords": [
          "헬스케어"
        ],
        "heroImage": {
          "alt": "의료진이 병원 컴퓨터 앞에서 환자 데이터와 디지털 건강관리 흐름을 함께 확인하는 모습",
          "caption": "카카오헬스케어의 핵심은 앱 하나보다 생활 데이터와 병원 워크플로를 이어 붙이는 연결 구조에 더 가까워 보입니다."
        }
      },
      "en": {
        "title": "Why Kakao Healthcare Looks Bigger Than a Single Diabetes App",
        "excerpt": "Kakao Healthcare is interesting not just because of PASTA itself, but because it is trying to connect daily health data, hospital EHR workflows and KakaoTalk-based patient touchpoints into one continuous path.",
        "keywords": [
          "Healthcare"
        ],
        "heroImage": {
          "alt": "Clinical staff reviewing patient data and digital health workflows in front of a hospital computer",
          "caption": "The more interesting part of Kakao Healthcare may be less the app itself and more the structure connecting personal data, hospital workflows and patient touchpoints."
        }
      },
      "ja": {
        "title": "カカオヘルスケアは、なぜ単なる糖尿病アプリ以上に見えるのか",
        "excerpt": "カカオヘルスケアが面白く見えるのは、PASTAというアプリ単体よりも、日常データ、病院EHR、そしてカカオトーク基盤の患者接点を一つの流れとして結ぼうとしているからです。",
        "keywords": [
          "ヘルスケア"
        ],
        "heroImage": {
          "alt": "病院で医療スタッフが患者データとデジタルヘルスの流れを同時に確認している様子",
          "caption": "カカオヘルスケアの本当のポイントは、アプリ単体よりも、個人データと病院ワークフローをつなぐ構造にあるように見えます。"
        }
      }
    }
  },
  {
    "slug": "openclaw-vs-manus-ai-agent-direction",
    "category": "ai",
    "createdAt": "2026-03-31T10:10:00+09:00",
    "heroImage": {
      "src": "/blog/openclaw-manus-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "오픈클로(OpenClaw)와 마누스, 지금 AI 에이전트의 결이 어떻게 갈리는가",
        "excerpt": "둘 다 에이전트라는 이름을 쓰지만, 오픈클로는 내가 소유하는 게이트웨이에 가깝고 마누스는 결과물을 받아보는 클라우드 동료에 더 가깝습니다.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "노트북 여러 대가 놓인 협업 책상에서 팀원들이 디지털 업무 흐름을 논의하는 장면",
          "caption": "같은 AI 에이전트라도 누구의 환경에서, 어떤 방식으로 일을 대신하느냐에 따라 성격은 꽤 달라집니다."
        }
      },
      "en": {
        "title": "OpenClaw and Manus: How the Shape of AI Agents Is Splitting Right Now",
        "excerpt": "Both are called agents, but OpenClaw feels closer to a gateway you operate and own, while Manus feels closer to a cloud coworker that brings finished work back to you.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "A collaborative desk with multiple laptops where a team is discussing digital workflows",
          "caption": "Even when two products are both called AI agents, their character changes a lot depending on whose environment they run in and how they get work done."
        }
      },
      "ja": {
        "title": "OpenClawとManus、いまAIエージェントの方向性はどう分かれているのか",
        "excerpt": "どちらもエージェントと呼ばれますが、OpenClawは自分で運用するゲートウェイに近く、Manusは完成した仕事を返してくれるクラウドの同僚に近い存在です。",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "複数のノートパソコンが並ぶ机でチームがデジタル業務フローを話し合っている様子",
          "caption": "同じAIエージェントでも、誰の環境で、どのように仕事を進めるのかによって性格はかなり変わります。"
        }
      }
    }
  },
  {
    "slug": "what-teams-using-ai-well-do-differently",
    "category": "ai",
    "createdAt": "2026-03-30T18:45:00+09:00",
    "heroImage": {
      "src": "/blog/ai-workflow-teams-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "지금 AI를 잘 쓰는 팀은 무엇이 다른가",
        "excerpt": "요즘 팀의 차이는 더 강한 모델을 먼저 찾았는지보다, 반복 업무를 어디서 줄였는지에서 더 선명하게 드러납니다.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "사무실에서 노트북을 보며 함께 업무 흐름을 점검하는 팀원들의 모습",
          "caption": "AI를 잘 쓰는 팀은 새 모델을 좇기보다, 실제 일의 흐름을 먼저 다시 봅니다."
        }
      },
      "en": {
        "title": "What Sets Teams That Use AI Well Apart Right Now",
        "excerpt": "The gap between teams is showing up less in who found the strongest model first and more in who reduced repetitive work first.",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "Team members in an office reviewing workflow ideas together on laptops",
          "caption": "Teams that use AI well usually start by redesigning real work, not by chasing every new model release."
        }
      },
      "ja": {
        "title": "今、AIをうまく使うチームは何が違うのか",
        "excerpt": "いま差が出ているのは、強いモデルを先に見つけたチームよりも、反復業務をどこで減らしたかを先に見たチームです。",
        "keywords": [
          "AI"
        ],
        "heroImage": {
          "alt": "オフィスでノートパソコンを見ながら業務フローを確認しているチームメンバー",
          "caption": "AIをうまく使うチームは、新しいモデルを追い続ける前に、実際の仕事の流れを見直します。"
        }
      }
    }
  },
  {
    "slug": "first-daily-post-starting-this-blog",
    "category": "daily",
    "createdAt": "2026-03-30T18:05:00+09:00",
    "heroImage": {
      "src": "/blog/first-daily-post-hero-generated.webp"
    },
    "locales": {
      "ko": {
        "title": "첫 글을 올리며, 기록을 다시 시작해보려 합니다",
        "excerpt": "오래 비워두었던 블로그 칸에 첫 글을 올리며, 앞으로 이 공간에 어떤 기록을 남기고 싶은지 차분히 적어보았습니다.",
        "keywords": [
          "일상"
        ],
        "heroImage": {
          "alt": "햇살이 드는 책상 위에 펼쳐진 노트와 펜, 그리고 스마트폰이 놓여 있는 장면",
          "caption": "첫 문장을 남기기 전의 조용한 책상처럼, 이 블로그도 너무 요란하지 않게 시작해보려 합니다."
        }
      },
      "en": {
        "title": "With This First Post, I Want to Start Writing Again",
        "excerpt": "As I upload the first post to a blog space that sat empty for a while, I wanted to write down what kind of record I hope to leave here.",
        "keywords": [
          "Daily"
        ],
        "heroImage": {
          "alt": "A quiet desk with warm sunlight, a notebook, a pen, and a smartphone",
          "caption": "Like a quiet desk before the first sentence, I wanted this blog to begin without too much noise."
        }
      },
      "ja": {
        "title": "最初の投稿として、また記録を始めてみようと思います",
        "excerpt": "しばらく空いていたブログ欄に最初の文章を載せながら、この場所にどんな記録を残したいのかを静かに書いてみました。",
        "keywords": [
          "日常"
        ],
        "heroImage": {
          "alt": "やわらかな日差しが差し込む机の上にノートとペン、スマートフォンが置かれている様子",
          "caption": "最初の一文を書く前の静かな机のように、このブログもあまり騒がしくなく始めたいと思いました。"
        }
      }
    }
  }
];
