import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The MC0003 Story · Driving Certainty Through Science" },
      {
        name: "description",
        content:
          "A governance-meeting retrospective: from 117 slides to 5 sentences of precise framing, to endorsement and execution.",
      },
      { property: "og:title", content: "The MC0003 Story" },
      {
        property: "og:description",
        content: "In uncertainty, drive certainty through science.",
      },
    ],
  }),
  component: StoryDeck,
});

// ---------- visual tokens ----------
const BG = "#0B1220";
const PANEL = "#101a2e";
const INK = "#F4EFE6";
const MUTED = "#9AA7BD";
const GOLD = "#E6B566";
const GOLD_SOFT = "#F2D38A";
const LINE = "rgba(244,239,230,0.12)";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Inter', system-ui, sans-serif";

type Slide = {
  id: string;
  render: () => ReactNode;
};

// ---------- typography ----------
function Kicker({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        color: GOLD,
        fontSize: 20,
        letterSpacing: "0.32em",
        fontWeight: 500,
        textTransform: "uppercase",
        fontFamily: SANS,
      }}
    >
      {children}
    </div>
  );
}

function Title({ children, size = 80 }: { children: ReactNode; size?: number }) {
  return (
    <h2
      style={{
        fontFamily: SERIF,
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
  size = 26,
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
        fontFamily: SANS,
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
  return <div style={{ width: 96, height: 3, background: GOLD, borderRadius: 2 }} />;
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
        minHeight: 1080,
        padding: `${paddingY}px ${paddingX}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: 44,
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>

  );
}

// ---------- slides ----------
const slides: Slide[] = [
  {
    id: "cover",
    render: () => (
      <SlideShell align="center" paddingX={180}>
        <Kicker>MC0003 · A Story</Kicker>
        <h1
          style={{
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 132,
            lineHeight: 1.05,
            color: INK,
            margin: 0,
            letterSpacing: "-0.03em",
          }}
        >
          In Uncertainty,
          <br />
          <span style={{ color: GOLD, fontStyle: "italic" }}>Drive Certainty</span> Through Science.
        </h1>
        <div style={{ display: "flex", gap: 32, alignItems: "center", marginTop: 16 }}>
          <div style={{ width: 64, height: 2, background: GOLD }} />
          <Body size={26} color={MUTED}>
            A governance-meeting retrospective · The road to MC0003's endorsement
          </Body>
        </div>
      </SlideShell>
    ),
  },
  {
    id: "context",
    render: () => (
      <SlideShell>
        <Kicker>The Context</Kicker>
        <Title>Pressure going into the second governance meeting</Title>
        <GoldRule />
        <Body size={32} maxWidth={1500}>
          In the first meeting we proposed <span style={{ color: GOLD_SOFT }}>three projects</span>,
          but none were explicitly endorsed.
          <br />
          So the second meeting had to produce a decision —{" "}
          <span style={{ color: GOLD_SOFT }}>we walked in carrying real pressure</span>.
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "why-mdg",
    render: () => (
      <SlideShell>
        <Kicker>Part 1 · Preparation</Kicker>
        <Title size={70}>Why molecular glue degraders (MGDs)?</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 28, marginTop: 8 }}>
          {[
            {
              h: "Patient access & adherence",
              p: "Oral small molecules keep gaining momentum, avoiding ADA-style issues seen with biologics.",
            },
            {
              h: "What degraders unlock",
              p: "Address inhibitor resistance and reach activities beyond the kinase domain.",
            },
            {
              h: "An internal gap at Merck",
              p: "Our MGD portfolio is thin — a meaningful white space worth filling.",
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
              <div style={{ color: GOLD, fontSize: 22, fontWeight: 600, fontFamily: SANS }}>
                {c.h}
              </div>
              <Body size={22} color={MUTED}>
                {c.p}
              </Body>
            </div>
          ))}
        </div>
        <Body size={22} color={MUTED} maxWidth={1500}>
          Coming from a biologics background, I learned on the fly how to evaluate small molecules
          and MGDs — how to spot differentiation and manage risk.
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "from-117-to-49",
    render: () => (
      <SlideShell>
        <Kicker>Part 1 · Preparation</Kicker>
        <Title size={72}>From 117 pages to 49</Title>
        <GoldRule />
        <div style={{ display: "flex", alignItems: "center", gap: 56, marginTop: 16 }}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 180,
                color: INK,
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              117
            </div>
            <div style={{ marginTop: 16 }}>
              <Body size={24} color={MUTED}>
                First review draft
              </Body>
            </div>
          </div>
          <div style={{ fontSize: 64, color: GOLD }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: SERIF,
                fontSize: 180,
                color: GOLD,
                lineHeight: 1,
                fontWeight: 900,
              }}
            >
              49
            </div>
            <div style={{ marginTop: 16 }}>
              <Body size={24} color={MUTED}>
                Final version after ZQ's comments (42 data pages)
              </Body>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Body size={24} maxWidth={680}>
              On top of five projects with completed deep dives, ten more high-level projects were
              folded in along the way.
              <br />
              <br />
              <span style={{ color: GOLD_SOFT }}>Only six days from lock to meeting</span> — yet
              every chart in the original 117 pages could be talked through from memory, without the
              slide on screen.
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
        <Kicker>Part 2 · In the Meeting</Kicker>
        <Title size={76}>Like ordering from a menu</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginTop: 8 }}>
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              padding: "40px 36px",
            }}
          >
            <div style={{ color: GOLD, fontSize: 22, marginBottom: 16, fontFamily: SANS }}>
              5 main projects
            </div>
            <div style={{ fontSize: 56, color: INK, fontFamily: SERIF, fontWeight: 700 }}>
              10–15
              <span style={{ fontSize: 26, color: MUTED, marginLeft: 10, fontFamily: SANS }}>
                min each
              </span>
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
            <div style={{ color: GOLD, fontSize: 22, marginBottom: 16, fontFamily: SANS }}>
              10 high-level projects
            </div>
            <div style={{ fontSize: 56, color: INK, fontFamily: SERIF, fontWeight: 700 }}>
              5
              <span style={{ fontSize: 26, color: MUTED, marginLeft: 10, fontFamily: SANS }}>
                min each · only if the committee was curious
              </span>
            </div>
          </div>
        </div>
        <Body size={24} color={MUTED} maxWidth={1500}>
          Every sentence had to be weighed. Discussions ran long. By the back half of the meeting,
          HQ leaders were tired — for unfamiliar targets, there was barely any energy left to dig in.
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "decision",
    render: () => (
      <SlideShell align="center" paddingX={200}>
        <Kicker>Part 2 · The Call I Made</Kicker>
        <h2
          style={{
            fontFamily: SERIF,
            fontWeight: 900,
            fontSize: 100,
            lineHeight: 1.1,
            color: INK,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Stop layering detail.
          <br />
          Land the <span style={{ color: GOLD, fontStyle: "italic" }}>
            decisive scientific point
          </span>
          <br />
          in the <span style={{ color: GOLD, fontStyle: "italic" }}>fewest words possible</span>.
        </h2>
        <Body size={26} color={MUTED} maxWidth={1300}>
          "Nothing to lose — let's go." I switched into active-recommendation mode and used precise
          scientific framing to pull the room back to what actually mattered.
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "five-points",
    render: () => (
      <SlideShell paddingX={100}>
        <Kicker>Part 2 · I got 5 sentences. Here they are.</Kicker>
        <Title size={56}>Each sentence mapped to a key decision dimension</Title>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18, marginTop: 8 }}>
          {[
            {
              n: "01",
              tag: "Innovation",
              t: "A new MGD platform",
              p: "Mechanistically sound and capable of generating new targets — platform value, not a one-off.",
            },
            {
              n: "02",
              tag: "China advantage",
              t: "China-prevalent cancers + pan-tumor potential",
              p: "Strong efficacy already shown — not a concept, but backed by data.",
            },
            {
              n: "03",
              tag: "Differentiation",
              t: "Novel or multi-MOA",
              p: "Scientifically more differentiated, and likelier to create long-term value.",
            },
            {
              n: "04",
              tag: "Risk in check",
              t: "Acceptable selectivity & safety",
              p: "Always the must-answer question for whether a project can move forward.",
            },
            {
              n: "05",
              tag: "Asset stage",
              t: "IND already submitted",
              p: "Neither too early nor too late — right in the sweet spot to advance.",
            },
          ].map((c) => (
            <div
              key={c.n}
              style={{
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderTop: `3px solid ${GOLD}`,
                borderRadius: 14,
                padding: "26px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                minHeight: 440,
              }}
            >
              <div style={{ color: GOLD, fontSize: 16, letterSpacing: "0.22em", fontFamily: SANS }}>
                {c.n}
              </div>
              <div style={{ color: MUTED, fontSize: 16, fontFamily: SANS }}>{c.tag}</div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 26,
                  color: INK,
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                {c.t}
              </div>
              <div style={{ height: 1, background: LINE }} />
              <Body size={18} color={MUTED}>
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
        <Kicker>Part 2 · The Reaction</Kicker>
        <h2
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: 82,
            lineHeight: 1.15,
            color: INK,
            margin: 0,
          }}
        >
          Even with a tired room,
          <br />
          those few sentences{" "}
          <span style={{ color: GOLD, fontStyle: "italic" }}>
            put the project's core value back on the table
          </span>
          .
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
          <Body size={26}>
            On-the-spot decision: have <span style={{ color: GOLD_SOFT }}>Johnny</span> in chemistry
            take a look — if it checks out, we move forward.
          </Body>
        </div>
      </SlideShell>
    ),
  },
  {
    id: "learning",
    render: () => (
      <SlideShell align="center" paddingX={220}>
        <Kicker>Part 2 · What I Took Away</Kicker>
        <Title size={84}>
          Scientific communication{" "}
          <span style={{ color: GOLD, fontStyle: "italic" }}>actually shaped the decision</span> —
          <br />
          not just relayed information.
        </Title>
        <Body size={26} color={MUTED} maxWidth={1300}>
          That experience gave me real confidence going into every subsequent leadership
          conversation.
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "post-meeting",
    render: () => (
      <SlideShell>
        <Kicker>Part 3 · After the Meeting</Kicker>
        <Title size={72}>The closer you get to a yes, the more careful you have to be</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginTop: 12 }}>
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              padding: "36px 32px",
            }}
          >
            <div style={{ color: GOLD, fontSize: 20, marginBottom: 14, fontFamily: SANS }}>
              Director Kou's U.S. trip
            </div>
            <Body size={24}>Met with Johnny in person to make sure chemistry was solid.</Body>
          </div>
          <div
            style={{
              background: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 18,
              padding: "36px 32px",
            }}
          >
            <div style={{ color: GOLD, fontSize: 20, marginBottom: 14, fontFamily: SANS }}>
              What I prepared
            </div>
            <Body size={24}>
              A detailed data deck with annotated speaker notes to deepen the case for the asset.
            </Body>
          </div>
        </div>
        <div
          style={{
            marginTop: 4,
            padding: "26px 36px",
            border: `1px solid ${GOLD}`,
            borderRadius: 14,
            display: "inline-flex",
            alignSelf: "flex-start",
          }}
        >
          <Body size={28} color={GOLD_SOFT}>
            ✓ Endorsement secured.
          </Body>
        </div>
      </SlideShell>
    ),
  },
  {
    id: "exec-rigor",
    render: () => (
      <SlideShell>
        <Kicker>Part 4 · After the Endorsement</Kicker>
        <Title size={68}>Getting endorsed was only step one</Title>
        <GoldRule />
        <Body size={28} maxWidth={1500}>
          Push for results, but{" "}
          <span style={{ color: GOLD_SOFT }}>never let go of scientific rigor</span>. The deep-dive
          process stays — it's the core of how we control risk.
        </Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginTop: 12 }}>
          {[
            "Physicochemical properties",
            "In vitro / in vivo efficacy models",
            "PK / PD",
            "Clinical study design",
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
              <div style={{ color: GOLD, fontSize: 16, letterSpacing: "0.22em", fontFamily: SANS }}>
                STEP {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: SERIF,
                  fontSize: 24,
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
        <Body size={20} color={MUTED} maxWidth={1500}>
          With a new MOA — new to most of the team — I ran 1:1 alignments with every function to
          settle the overall strategy.
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "exec-validation",
    render: () => (
      <SlideShell>
        <Kicker>Part 4 · The Validation Work</Kicker>
        <Title size={62}>Every point tested whether we could really stand on the science</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 12 }}>
          {[
            {
              t: "Ternary-complex affinity assay",
              p: "The pivotal evidence for a new MOA — the method itself had to be refined repeatedly.",
            },
            {
              t: "Efficacy only visible in 3D models",
              p: "Harder readout, but far closer to real biology.",
            },
            {
              t: "Choosing the right in vitro model",
              p: "Model choice determines how interpretable every downstream dataset becomes.",
            },
            {
              t: "Defining the efficacy readout",
              p: "Not just \"does it work\" — but \"how do we measure that it works\".",
            },
          ].map((c) => (
            <div
              key={c.t}
              style={{
                background: PANEL,
                border: `1px solid ${LINE}`,
                borderRadius: 16,
                padding: "30px 32px",
                display: "flex",
                gap: 22,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: GOLD,
                  marginTop: 16,
                  flexShrink: 0,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontFamily: SERIF, fontSize: 28, color: INK, fontWeight: 700 }}>
                  {c.t}
                </div>
                <Body size={20} color={MUTED}>
                  {c.p}
                </Body>
              </div>
            </div>
          ))}
        </div>
        <Body size={20} color={MUTED} maxWidth={1500}>
          Validation isn't repetition — it's looking across a wider surface for risks the original
          data may have hidden.
        </Body>
      </SlideShell>
    ),
  },
  {
    id: "summary",
    render: () => (
      <SlideShell paddingX={140}>
        <Kicker>Part 5 · The Takeaway</Kicker>
        <Title size={68}>What scientific leadership really means</Title>
        <GoldRule />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 12 }}>
          {[
            {
              n: "01",
              t: "Identify the decisive scientific dimensions",
              p: "In uncertain environments, quickly see which few things actually matter.",
            },
            {
              n: "02",
              t: "Move stakeholders with concise framing",
              p: "Influence judgment with precision — don't just transmit information.",
            },
            {
              n: "03",
              t: "Hold the line on scientific rigor",
              p: "Drive outcomes without ever giving up deep-dives and disciplined risk control.",
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
                  fontFamily: SERIF,
                  fontSize: 60,
                  color: GOLD,
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {c.n}
              </div>
              <div
                style={{
                  fontFamily: SERIF,
                  fontSize: 28,
                  color: INK,
                  fontWeight: 700,
                  lineHeight: 1.3,
                }}
              >
                {c.t}
              </div>
              <Body size={20} color={MUTED}>
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
              fontFamily: SERIF,
              fontSize: 44,
              color: INK,
              fontWeight: 700,
              lineHeight: 1.3,
              fontStyle: "italic",
            }}
          >
            In uncertainty, <span style={{ color: GOLD }}>drive certainty through science.</span>
          </div>
        </div>
      </SlideShell>
    ),
  },
];

// ---------- width-based scaling (allows vertical scroll) ----------
function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      setScale(Math.min(1, window.innerWidth / 1920));
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
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go, total]);


  const slide = slides[index];
  const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [index]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: BG,
        color: INK,
        position: "relative",
        fontFamily: SANS,
      }}
    >
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

      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: 1920,
            minHeight: 1080,
            position: "relative",
            background: BG,
            zoom: scale,
          }}

        >

          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(1100px 700px at 88% 12%, rgba(230,181,102,0.10), transparent 60%), radial-gradient(900px 600px at 8% 92%, rgba(72,120,200,0.12), transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 56,
              left: 64,
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: MUTED,
              fontSize: 18,
              letterSpacing: "0.28em",
              fontFamily: SANS,
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
              fontSize: 18,
              letterSpacing: "0.28em",
              fontVariantNumeric: "tabular-nums",
              fontFamily: SANS,
            }}
          >
            {String(index + 1).padStart(2, "0")} <span style={{ color: GOLD }}>/</span>{" "}
            {String(total).padStart(2, "0")}
          </div>

          <div
            key={slide.id}
            style={{
              position: "relative",
              animation: "slideIn 480ms cubic-bezier(.2,.7,.2,1)",
            }}
          >
            {slide.render()}
          </div>
        </div>
      </div>


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
        <NavBtn onClick={() => go(index - 1)} disabled={index === 0} label="← Prev" />
        <div
          style={{
            color: MUTED,
            fontSize: 13,
            letterSpacing: "0.2em",
            padding: "0 10px",
            fontVariantNumeric: "tabular-nums",
            fontFamily: SANS,
          }}
        >
          {index + 1} / {total}
        </div>
        <NavBtn onClick={() => go(index + 1)} disabled={index === total - 1} label="Next →" />
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          color: MUTED,
          fontSize: 12,
          letterSpacing: "0.22em",
          opacity: 0.6,
          fontFamily: SANS,
        }}
      >
        ← → to navigate
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
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.08em",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: SANS,
        transition: "transform 120ms ease",
      }}
    >
      {label}
    </button>
  );
}
