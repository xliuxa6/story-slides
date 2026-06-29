import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MC0003 的故事 · 在不确定中，用科学推动确定性" },
      {
        name: "description",
        content:
          "一次 governance meeting 的复盘：从 117 页 slides 到 5 句话的精准 framing，再到 endorsement 与执行。",
      },
      { property: "og:title", content: "MC0003 的故事" },
      {
        property: "og:description",
        content: "在不确定中，用科学推动确定性。",
      },
    ],
  }),
  component: StoryDeck,
});

// ---------- 视觉 token ----------
const BG = "#0B1220";
const PANEL = "#101a2e";
const INK = "#F4EFE6";
const MUTED = "#9AA7BD";
const GOLD = "#E6B566";
const GOLD_SOFT = "#F2D38A";
const LINE = "rgba(244,239,230,0.12)";

// ---------- 类型 ----------
type Slide = {
  id: string;
  kicker?: string;
  render: () => ReactNode;
};

// ---------- 通用排版块 ----------
function Kicker({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        color: GOLD,
        fontSize: 22,
        letterSpacing: "0.32em",
        fontWeight: 500,
        textTransform: "uppercase",
        fontFamily: "'Noto Sans SC', sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function Title({ children, size = 88 }: { children: ReactNode; size?: number }) {
  return (
    <h2
      style={{
        fontFamily: "'Noto Serif SC', serif",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.1,
        letterSpacing: "-0.02em",
        color: INK,
        margin: 0,
      }}
    >
      {children}
    </h2>
  );
}

function Body({
  children,
  size = 30,
  color = INK,
  maxWidth = 1500,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  maxWidth?: number | string;
}) {
  return (
    <p
      style={{
        fontFamily: "'Noto Sans SC', sans-serif",
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1.6,
        color,
        maxWidth,
        margin: 0,
      }}
    >
      {children}
    </p>
  );
}

function GoldRule() {
  return (
    <div
      style={{
        width: 96,
        height: 3,
        background: GOLD,
        borderRadius: 2,
      }}
    />
  );
}

function SlideShell({
  children,
  align = "start",
  paddingX = 140,
  paddingY = 120,
}: {
  children: ReactNode;
  align?: "start" | "center";
  paddingX?: number;
  paddingY?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: `${paddingY}px ${paddingX}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: 48,
      }}
    >
      {children}
    </div>
  );
}

// ---------- 各幻灯片内容 ----------
const slides: Slide[] = [
  {
    id: "cover",
    render: () => (
      <SlideShell align="center" paddingX={180}>
        <Kicker>MC0003 · A Story</Kicker>
        <h1
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontWeight: 900,
            fontSize: 140,
            lineHeight: 1.05,
            color: INK,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          在不确定中
          <br />
          <span style={{ color: GOLD }}>用科学推动确定性</span>
        </h1>
        <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 24 }}>
          <div style={{ width: 64, height: 2, background: GOLD }} />
          <Body size={28} color={MUTED}>
            一次 governance meeting 的复盘 · MC0003 的 endorsement 之路
          </Body>
        </div>
      </SlideShell>
    ),
  },
  {
    id: "context",
    render: () => (
      <SlideShell>
        <Kicker>背景</Kicker>
        <Title>第二次 governance meeting 的压力</Title>
        <GoldRule />
        <Body size={34} maxWidth={1500}>
          第一次 meeting 我们 proposed 了 <span style={{ color: GOLD_SOFT }}>3 个项目</span>
          ，却没有明确 endorse 哪一个。
          <br />
          所以到了第二次会议，<span style={{ color: GOLD_SOFT }}>必须有结果</span>—— 我们带着很大的压力上场。
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "why-mdg",
    render: () => (
      <SlideShell>
        <Kicker>一 · 会议准备</Kicker>
        <Title size={76}>为什么是分子胶降解剂（MDG）？</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32, marginTop: 12 }}>
          {[
            {
              h: "病人可及与依从",
              p: "小分子口服热度持续上升，规避大分子类似 ADA 的问题。",
            },
            {
              h: "Degrader 的独特价值",
              p: "解决抑制剂的耐药问题，覆盖激酶以外的活性。",
            },
            {
              h: "默沙东内部空白",
              p: "MDG 资产薄弱，值得系统性补位。",
            },
          ].map((c) => (
            <div
              key={c.h}
              style={{
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 18,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                minHeight: 280,
              }}
            >
              <div style={{ color: GOLD, fontSize: 22, fontWeight: 500 }}>{c.h}</div>
              <Body size={24} color={MUTED}>
                {c.p}
              </Body>
            </div>
          ))}
        </div>
        <Body size={24} color={MUTED} maxWidth={1500}>
          自己原是做大分子的，这一轮边做边学：怎么评价小分子，怎么评估 MDG，怎么识别 differentiation 与控制风险。
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "from-117-to-49",
    render: () => (
      <SlideShell>
        <Kicker>一 · 会议准备</Kicker>
        <Title size={76}>从 117 页，到 49 页</Title>
        <GoldRule />
        <div style={{ display: "flex", alignItems: "center", gap: 64, marginTop: 16 }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 180,
                color: INK,
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              117
            </div>
            <Body size={22} color={MUTED}>
              第一版 review slides
            </Body>
          </div>
          <div style={{ fontSize: 64, color: GOLD }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Noto Serif SC', serif",
                fontSize: 180,
                color: GOLD,
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              49
            </div>
            <Body size={22} color={MUTED}>
              ZQ comment 后定稿（数据 42 页）
            </Body>
          </div>
          <div style={{ flex: 1 }}>
            <Body size={26} maxWidth={680}>
              在原本 5 个已完成 deep dive 的项目之上，又陆续加进 10 个 high-level 项目。
              <br />
              <br />
              <span style={{ color: GOLD_SOFT }}>定稿到上会只有 6 天</span>
              ，但 117 页里任何一张数据都能拎出来讲—— 没有图，也能说清楚。
            </Body>
          </div>
        </div>
      </SlideShell>
    ),
  },
  {
    id: "challenge",
    render: () => (
      <SlideShell>
        <Kicker>二 · 会上</Kicker>
        <Title size={80}>像"拿着菜单点戏"</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 12 }}>
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              padding: "40px 36px",
            }}
          >
            <div style={{ color: GOLD, fontSize: 24, marginBottom: 16 }}>5 个主项目</div>
            <div style={{ fontSize: 56, color: INK, fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}>
              10–15<span style={{ fontSize: 28, color: MUTED, marginLeft: 8 }}>分钟 / 个</span>
            </div>
          </div>
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              padding: "40px 36px",
            }}
          >
            <div style={{ color: GOLD, fontSize: 24, marginBottom: 16 }}>10 个 high-level</div>
            <div style={{ fontSize: 56, color: INK, fontFamily: "'Noto Serif SC', serif", fontWeight: 700 }}>
              5<span style={{ fontSize: 28, color: MUTED, marginLeft: 8 }}>分钟 / 个 · 看 committee 兴趣</span>
            </div>
          </div>
        </div>
        <Body size={26} color={MUTED} maxWidth={1500}>
          时间紧到每一句话都要斟酌；讨论一旦展开就容易超时。到了会议后半段，HQ 领导已经很累，
          不太熟悉的靶点几乎没人有精力继续追问。
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "decision",
    render: () => (
      <SlideShell align="center" paddingX={200}>
        <Kicker>二 · 会上 · 我的判断</Kicker>
        <h2
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontWeight: 900,
            fontSize: 110,
            lineHeight: 1.1,
            color: INK,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          不能再铺细节，
          <br />
          要用<span style={{ color: GOLD }}>最少的话</span>，
          <br />
          打进<span style={{ color: GOLD }}>最关键的科学判断点</span>。
        </h2>
        <Body size={28} color={MUTED} maxWidth={1300}>
          "Nothing to lose，拼一把"—— 切换到主动推荐模式，用精准的科学 framing
          把大家拉回最重要的决策维度。
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "five-points",
    render: () => (
      <SlideShell paddingX={110}>
        <Kicker>二 · 会上 · 我只争取到 5 句话</Kicker>
        <Title size={64}>这 5 句话，分别对应一个关键维度</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, marginTop: 12 }}>
          {[
            {
              n: "01",
              tag: "创新性",
              t: "新的 MDG 平台",
              p: "逻辑合理，能持续产出新靶点；平台本身具备价值。",
            },
            {
              n: "02",
              tag: "中国优势",
              t: "中国优势癌种 + 泛瘤潜力",
              p: "已显示良好药效，不只是概念，而是有数据支撑。",
            },
            {
              n: "03",
              tag: "科学差异化",
              t: "新的 / 多重 MOA",
              p: "科学上更有差异化，更易形成长期价值。",
            },
            {
              n: "04",
              tag: "风险可控",
              t: "选择性与安全性可接受",
              p: "安全性与选择性是项目能否往前的必答题。",
            },
            {
              n: "05",
              tag: "Asset Stage",
              t: "IND 已 submitted",
              p: "不早不晚，正处于适合推进的阶段。",
            },
          ].map((c) => (
            <div
              key={c.n}
              style={{
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderTop: `3px solid ${GOLD}`,
                borderRadius: 14,
                padding: "28px 22px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                minHeight: 420,
              }}
            >
              <div style={{ color: GOLD, fontSize: 18, letterSpacing: "0.2em" }}>{c.n}</div>
              <div style={{ color: MUTED, fontSize: 18 }}>{c.tag}</div>
              <div
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 28,
                  color: INK,
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {c.t}
              </div>
              <div style={{ height: 1, background: LINE }} />
              <Body size={20} color={MUTED}>
                {c.p}
              </Body>
            </div>
          ))}
        </div>
      </SlideShell>
    ),
  },
  {
    id: "reaction",
    render: () => (
      <SlideShell align="center" paddingX={200}>
        <Kicker>二 · 会上 · 现场反应</Kicker>
        <h2
          style={{
            fontFamily: "'Noto Serif SC', serif",
            fontWeight: 700,
            fontSize: 88,
            lineHeight: 1.15,
            color: INK,
            margin: 0,
          }}
        >
          虽然大家已经很疲劳，
          <br />
          但这几句话<span style={{ color: GOLD }}>把项目核心价值重新打出来了</span>。
        </h2>
        <div
          style={{
            background: PANEL,
            border: `1px solid ${LINE}`,
            borderLeft: `4px solid ${GOLD}`,
            borderRadius: 12,
            padding: "32px 40px",
            maxWidth: 1300,
          }}
        >
          <Body size={28}>
            当场结论：让 chemistry 的 <span style={{ color: GOLD_SOFT }}>Johnny</span> 看一下，
            如果没问题，就可以推进。
          </Body>
        </div>
      </SlideShell>
    ),
  },
  {
    id: "learning",
    render: () => (
      <SlideShell align="center" paddingX={220}>
        <Kicker>二 · 会上 · 我学到了什么</Kicker>
        <Title size={92}>
          科学表达<span style={{ color: GOLD }}>真的影响了决策方向</span>，
          <br />
          而不是只停留在信息传递层面。
        </Title>
        <Body size={28} color={MUTED} maxWidth={1300}>
          这件事让我后续在会议交流中更有底气。
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "post-meeting",
    render: () => (
      <SlideShell>
        <Kicker>三 · 会后</Kicker>
        <Title size={76}>越接近成功，越要谨慎</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 16 }}>
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              padding: "36px 32px",
            }}
          >
            <div style={{ color: GOLD, fontSize: 22, marginBottom: 14 }}>寇总赴美</div>
            <Body size={26}>专门去 engage Johnny，确保 chemistry 这关稳。</Body>
          </div>
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              padding: "36px 32px",
            }}
          >
            <div style={{ color: GOLD, fontSize: 22, marginBottom: 14 }}>我做了什么</div>
            <Body size={26}>
              准备一份详细数据版，notes 标上重点，进一步展示项目优势。
            </Body>
          </div>
        </div>
        <div
          style={{
            marginTop: 8,
            padding: "28px 36px",
            border: `1px solid ${GOLD}`,
            borderRadius: 14,
            display: "inline-flex",
            alignSelf: "flex-start",
          }}
        >
          <Body size={30} color={GOLD_SOFT}>
            ✓ 最终拿到 endorsement
          </Body>
        </div>
      </SlideShell>
    ),
  },
  {
    id: "exec-rigor",
    render: () => (
      <SlideShell>
        <Kicker>四 · Endorse 之后的执行</Kicker>
        <Title size={72}>拿到 endorsement，只是第一步</Title>
        <GoldRule />
        <Body size={32} maxWidth={1500}>
          推进结果的同时，<span style={{ color: GOLD_SOFT }}>不放弃科学严谨性</span>。
          Deep dive 流程不能少—— 它是我们控制风险的关键环节。
        </Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 16 }}>
          {[
            "化合物理化性质",
            "体内外药效模型合理性",
            "PK / PD",
            "临床方案设计",
          ].map((t, i) => (
            <div
              key={t}
              style={{
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 14,
                padding: "28px 24px",
                minHeight: 200,
              }}
            >
              <div style={{ color: GOLD, fontSize: 18, letterSpacing: "0.2em" }}>
                STEP {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 26,
                  color: INK,
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {t}
              </div>
            </div>
          ))}
        </div>
        <Body size={22} color={MUTED} maxWidth={1500}>
          新 MOA 对多数团队成员是第一次接触，和各个 function 都做了线下 1:1 对齐策略。
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "exec-validation",
    render: () => (
      <SlideShell>
        <Kicker>四 · 执行 · 实验验证的硬骨头</Kicker>
        <Title size={72}>每一个点，都在考验我们能不能在科学上真正站得住</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 16 }}>
          {[
            { t: "三元复合亲和力检测", p: "新 MOA 的关键证据，方法本身就要被反复打磨。" },
            { t: "3D 模型才能看到药效", p: "体外读出更难，但更接近真实生物学。" },
            { t: "体外模型怎么选", p: "选择决定了后续数据的可解释性。" },
            { t: "药效读出怎么定义", p: "不只是"有效"，而是"如何度量有效"。" },
          ].map((c) => (
            <div
              key={c.t}
              style={{
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 16,
                padding: "32px 32px",
                display: "flex",
                gap: 24,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: GOLD,
                  marginTop: 18,
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    fontFamily: "'Noto Serif SC', serif",
                    fontSize: 30,
                    color: INK,
                    fontWeight: 700,
                  }}
                >
                  {c.t}
                </div>
                <Body size={22} color={MUTED}>
                  {c.p}
                </Body>
              </div>
            </div>
          ))}
        </div>
        <Body size={22} color={MUTED} maxWidth={1500}>
          验证不是完全重复，要从更宽的范围去看数据是否潜藏风险。
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "summary",
    render: () => (
      <SlideShell paddingX={140}>
        <Kicker>五 · 总结</Kicker>
        <Title size={72}>真正的 Scientific Leadership</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, marginTop: 16 }}>
          {[
            {
              n: "01",
              t: "识别关键科学维度",
              p: "在不确定的环境里，快速看清最该被讨论的那几件事。",
            },
            {
              n: "02",
              t: "简洁影响 stakeholder",
              p: "用最准确、最简洁的方式影响判断，不只传递信息。",
            },
            {
              n: "03",
              t: "坚持科学风险控制",
              p: "在推动结果的同时，不放弃 deep dive 与严谨性。",
            },
          ].map((c) => (
            <div
              key={c.n}
              style={{
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 18,
                padding: "36px 32px",
                minHeight: 320,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 64,
                  color: GOLD,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {c.n}
              </div>
              <div
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  fontSize: 32,
                  color: INK,
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {c.t}
              </div>
              <Body size={22} color={MUTED}>
                {c.p}
              </Body>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            padding: "32px 40px",
            borderLeft: `4px solid ${GOLD}`,
            background: "rgba(230,181,102,0.06)",
            borderRadius: 8,
          }}
        >
          <div
            style={{
              fontFamily: "'Noto Serif SC', serif",
              fontSize: 44,
              color: INK,
              fontWeight: 700,
              lineHeight: 1.3,
            }}
          >
            在不确定中，<span style={{ color: GOLD }}>用科学推动确定性</span>。
          </div>
        </div>
      </SlideShell>
    ),
  },
];

// ---------- 缩放 16:9 画布 ----------
function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const sx = window.innerWidth / 1920;
      const sy = window.innerHeight / 1080;
      setScale(Math.min(sx, sy));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return scale;
}

function StoryDeck() {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const scale = useScale();

  // hash sync
  useEffect(() => {
    const fromHash = () => {
      const m = /^#(\d+)$/.exec(window.location.hash);
      if (m) {
        const n = Math.max(1, Math.min(total, parseInt(m[1], 10))) - 1;
        setIndex(n);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [total]);

  const go = useCallback(
    (next: number) => {
      const n = Math.max(0, Math.min(total - 1, next));
      setIndex(n);
      if (typeof window !== "undefined") {
        history.replaceState(null, "", `#${n + 1}`);
      }
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") {
        go(0);
      } else if (e.key === "End") {
        go(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, total]);

  const slide = slides[index];
  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: BG,
        color: INK,
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Noto Sans SC', sans-serif",
      }}
    >
      {/* 顶部进度条 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 3,
          width: `${progress}%`,
          background: GOLD,
          transition: "width 360ms ease",
          zIndex: 50,
        }}
      />

      {/* 画布容器 */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            left: "50%",
            top: "50%",
            marginLeft: -960,
            marginTop: -540,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            background: BG,
          }}
        >
          {/* 装饰背景 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(1100px 700px at 88% 12%, rgba(230,181,102,0.10), transparent 60%), radial-gradient(900px 600px at 8% 92%, rgba(72,120,200,0.12), transparent 60%)",
              pointerEvents: "none",
            }}
          />
          {/* 角标 */}
          <div
            style={{
              position: "absolute",
              top: 56,
              left: 64,
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: MUTED,
              fontSize: 20,
              letterSpacing: "0.24em",
            }}
          >
            <div style={{ width: 28, height: 2, background: GOLD }} />
            MC0003
          </div>
          <div
            style={{
              position: "absolute",
              top: 56,
              right: 64,
              color: MUTED,
              fontSize: 20,
              letterSpacing: "0.24em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(index + 1).padStart(2, "0")} <span style={{ color: GOLD }}>/</span>{" "}
            {String(total).padStart(2, "0")}
          </div>

          {/* 内容（带入场动画 key） */}
          <div
            key={slide.id}
            style={{
              position: "absolute",
              inset: 0,
              animation: "slideIn 480ms cubic-bezier(.2,.7,.2,1)",
            }}
          >
            {slide.render()}
          </div>
        </div>
      </div>

      {/* 底部控制 */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "rgba(16,26,46,0.85)",
          border: `1px solid ${LINE}`,
          borderRadius: 999,
          padding: "10px 14px",
          backdropFilter: "blur(10px)",
          zIndex: 40,
        }}
      >
        <NavBtn onClick={() => go(index - 1)} disabled={index === 0} label="← 上一页" />
        <div
          style={{
            color: MUTED,
            fontSize: 14,
            letterSpacing: "0.2em",
            padding: "0 10px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {index + 1} / {total}
        </div>
        <NavBtn onClick={() => go(index + 1)} disabled={index === total - 1} label="下一页 →" />
      </div>

      {/* 提示 */}
      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          color: MUTED,
          fontSize: 12,
          letterSpacing: "0.2em",
          opacity: 0.6,
        }}
      >
        ← → 翻页
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        html, body { background: ${BG}; }
      `}</style>
    </div>
  );
}

function NavBtn({
  onClick,
  disabled,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "transparent" : GOLD,
        color: disabled ? MUTED : "#0B1220",
        border: disabled ? `1px solid ${LINE}` : "none",
        borderRadius: 999,
        padding: "10px 22px",
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: "0.08em",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'Noto Sans SC', sans-serif",
        transition: "transform 120ms ease",
      }}
    >
      {label}
    </button>
  );
}
