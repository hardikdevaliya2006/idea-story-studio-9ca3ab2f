"use client";
import "@/styles/ai-seo-generation.css";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  CircleCheck,
  Compass,
  FileSearch,
  Globe2,
  LineChart,
  MessageSquareText,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";
import AISearchConversation from "@/components/AISearchConversation";

const rotatingPhrases = ["AI Search", "Google Search"];

const features = [
  {
    icon: Search,
    title: "Get discovered",
    text: "Build a clear search foundation around the topics, questions, and services your audience is already looking for.",
  },
  {
    icon: Bot,
    title: "Become the answer",
    text: "Make your expertise easier for AI answer engines to understand, reference, and connect to your brand.",
  },
  {
    icon: Target,
    title: "Reach the right intent",
    text: "Connect keywords, search intent, and useful pages so visibility brings relevant visitors, not empty traffic.",
  },
  {
    icon: BarChart3,
    title: "Measure what matters",
    text: "Track visibility, engagement, and qualified actions with a roadmap for continuous improvement.",
  },
];
const processSteps = [
  [
    FileSearch,
    "Visibility audit",
    "Review technical health, current rankings, content gaps, and how answer engines describe your brand.",
  ],
  [
    Compass,
    "Strategy development",
    "Map search intent, topics, entities, and priority pages into a focused growth plan.",
  ],
  [
    Workflow,
    "Content & authority build",
    "Create useful content, strengthen internal links, and clarify the signals that establish expertise.",
  ],
  [
    LineChart,
    "Monitor & optimise",
    "Measure movement, learn from the data, and keep improving as search behaviour changes.",
  ],
];
const plans = [
  {
    name: "Foundation",
    price: "$1,499",
    note: "For a clear starting point",
    items: [
      "SEO and AI visibility audit",
      "Keyword & intent research",
      "Technical priority roadmap",
      "Content opportunity plan",
    ],
  },
  {
    name: "Growth",
    price: "$2,499",
    note: "For consistent momentum",
    popular: true,
    items: [
      "Everything in Foundation",
      "Content optimisation plan",
      "Entity & schema improvements",
      "Monthly performance review",
    ],
  },
  {
    name: "Authority",
    price: "$4,999",
    note: "For ambitious growth goals",
    items: [
      "Everything in Growth",
      "Expanded content programme",
      "Digital authority development",
      "Advanced reporting & roadmap",
    ],
  },
];
const faqs = [
  [
    "What is AI SEO Generation?",
    "It combines search engine optimisation with content and entity improvements that help AI answer engines understand your business and its expertise.",
  ],
  [
    "How is GEO different from traditional SEO?",
    "Traditional SEO focuses on visibility in search results. Generative Engine Optimisation also considers how AI systems interpret, summarise, and cite information.",
  ],
  [
    "Will this replace my existing SEO strategy?",
    "No. It builds on sound technical SEO and helpful content, extending that foundation for newer discovery experiences.",
  ],
  [
    "How long does it take to see results?",
    "Timing depends on your website, competition, authority, and implementation speed. We establish a baseline and report progress rather than promise fixed rankings.",
  ],
  [
    "Do you guarantee AI citations?",
    "No provider can guarantee that an independent AI platform will cite a particular business. We improve clarity, relevance, and trust signals that can support discoverability.",
  ],
  [
    "Can you work with our existing website?",
    "Yes. We start by reviewing your current website and recommend improvements before suggesting a rebuild.",
  ],
];

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div className={`aig-reveal ${className}`} style={{ "--aig-delay": `${delay}ms` }}>
      {children}
    </div>
  );
}

function RotatingPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = rotatingPhrases[phraseIndex];
    let delay = deleting ? 42 : 82;

    if (!deleting && typedText === phrase) delay = 1750;
    if (deleting && typedText === "") delay = 360;

    const timer = window.setTimeout(() => {
      if (!deleting && typedText === phrase) {
        setDeleting(true);
      } else if (deleting && typedText === "") {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % rotatingPhrases.length);
      } else if (deleting) {
        setTypedText((value) => value.slice(0, -1));
      } else {
        setTypedText(phrase.slice(0, typedText.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typedText, deleting, phraseIndex]);

  return (
    <span className="aig-typewriter" aria-label={rotatingPhrases[phraseIndex]}>
      <span>{typedText || "\u00a0"}</span>
      <i aria-hidden="true" />
    </span>
  );
}

const TREND_MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
const TREND_VALUES = [28, 36, 33, 51, 64, 82];

function VisibilityTrendChart() {
  const chartId = useId().replace(/:/g, "");
  const [active, setActive] = useState(-1);
  const points = TREND_VALUES.map((value, index) => ({
    x: 24 + index * 106,
    y: 150 - value * 1.35,
  }));
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x} 156 L${points[0].x} 156 Z`;

  const show = (index) => setActive(index);
  const hide = () => setActive(-1);

  return (
    <div className="aig-trend-card">
      <div className="aig-trend-top">
        <div>
          <span className="aig-kicker">VISIBILITY TREND</span>
          <h4>AI answer presence</h4>
        </div>
        <span className="aig-trend-period">LAST 6 MONTHS</span>
      </div>
      <div className="aig-trend-headline">
        <strong>
          82<span>/100</span>
        </strong>
        <span className="aig-trend-delta">
          <TrendingUp size={12} /> +18 pts
        </span>
      </div>
      <div className="aig-trend-stage">
        <div className="aig-trend-grid" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <svg
          viewBox="0 0 560 170"
          preserveAspectRatio="none"
          role="img"
          aria-label="Illustrative rise in AI visibility across six months"
        >
          <defs>
            <linearGradient id={`${chartId}-area`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity=".34" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${chartId}-line`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity=".55" />
              <stop offset="100%" stopColor="var(--primary)" />
            </linearGradient>
          </defs>
          <path className="aig-trend-area" d={areaPath} fill={`url(#${chartId}-area)`} />
          <path className="aig-trend-line" d={linePath} stroke={`url(#${chartId}-line)`} />
          {points.map((point, index) => (
            <g
              key={TREND_MONTHS[index]}
              className={`aig-trend-point ${active === index ? "is-active" : ""}`}
            >
              <circle className="aig-trend-halo" cx={point.x} cy={point.y} r="13" />
              <circle
                className="aig-trend-dot"
                cx={point.x}
                cy={point.y}
                r={index === points.length - 1 ? 5.5 : 4}
              />
              <circle
                className="aig-trend-hit"
                cx={point.x}
                cy={point.y}
                r="19"
                tabIndex="0"
                role="button"
                aria-label={`${TREND_MONTHS[index]}: ${TREND_VALUES[index]}`}
                onMouseEnter={() => show(index)}
                onMouseLeave={hide}
                onFocus={() => show(index)}
                onBlur={hide}
                onClick={() => setActive(active === index ? -1 : index)}
              />
            </g>
          ))}
        </svg>
        {active >= 0 && (
          <div
            className="aig-trend-tip"
            style={{ "--tip-x": `${(points[active].x / 560) * 100}%` }}
            role="status"
          >
            <span>{TREND_MONTHS[active]}</span>
            <strong>
              {TREND_VALUES[active]}
              <small>/100</small>
            </strong>
          </div>
        )}
      </div>
      <div className="aig-trend-months">
        {TREND_MONTHS.map((month, index) => (
          <button
            type="button"
            key={month}
            className={active === index ? "is-active" : ""}
            onMouseEnter={() => show(index)}
            onMouseLeave={hide}
            onFocus={() => show(index)}
            onBlur={hide}
            onClick={() => setActive(active === index ? -1 : index)}
          >
            {month}
          </button>
        ))}
      </div>
      <div className="aig-trend-foot">
        <span>
          <i /> AI visibility score
        </span>
        <span>Illustrative data</span>
      </div>
    </div>
  );
}

function BaselineProgressCard() {
  return (
    <div className="aig-baseline-card">
      <div className="aig-baseline-top">
        <span className="aig-kicker">REPORT SNAPSHOT</span>
        <span className="aig-baseline-badge">MONTH 06</span>
      </div>
      <div className="aig-baseline-score">
        <div className="aig-baseline-ring">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle className="aig-ring-bg" cx="50" cy="50" r="42" />
            <circle className="aig-ring-fill" cx="50" cy="50" r="42" />
          </svg>
          <div className="aig-baseline-ring-copy">
            <strong>78</strong>
            <span>/ 100</span>
          </div>
        </div>
        <div className="aig-baseline-summary">
          <span className="aig-baseline-delta">
            <TrendingUp size={13} /> +44 points
          </span>
          <p>Visibility score measured against your own starting point.</p>
        </div>
      </div>
      <div className="aig-baseline-bars">
        <div className="aig-baseline-row">
          <div className="aig-baseline-label">
            <span>Baseline</span>
            <strong>34</strong>
          </div>
          <div className="aig-baseline-track">
            <i style={{ "--fill": "34%" }} />
          </div>
        </div>
        <div className="aig-baseline-row is-current">
          <div className="aig-baseline-label">
            <span>Current</span>
            <strong>78</strong>
          </div>
          <div className="aig-baseline-track">
            <i style={{ "--fill": "78%" }} />
          </div>
        </div>
      </div>
      <div className="aig-baseline-foot">
        <CircleCheck size={12} /> Clear reporting, grounded in your analytics
      </div>
    </div>
  );
}

export default function AISEOGenerationView() {
  const rootRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.add("aig-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aig-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    root.querySelectorAll(".aig-reveal").forEach((node) => revealObserver.observe(node));
    return () => revealObserver.disconnect();
  }, []);

  return (
    <div className="aig-page" ref={rootRef}>
      <main id="main-content">
        <section className="aig-hero">
          <div className="aig-hero-grid" aria-hidden="true" />
          <div className="aig-container aig-hero-layout">
            <Reveal className="aig-hero-copy">
              <span className="aig-eyebrow">
                <i className="aig-live-dot" /> SEARCH IS CHANGING
              </span>
              <h1>
                Own the top spot in <RotatingPhrase /> before anyone else can.
              </h1>
              <p>
                Build your visibility across Google and AI answer engines with a strategy designed
                for the next era of discovery.
              </p>
              <div className="aig-hero-actions">
                <Link className="aig-button" href="/book-a-discovery-call">
                  Book a discovery call <ArrowUpRight size={16} />
                </Link>
                <a className="aig-text-link" href="#geo-process">
                  Explore our process <ArrowDown size={15} />
                </a>
              </div>
              <p className="aig-hero-note">
                <span>●</span> SEO foundations · AI visibility · Generative search
              </p>
            </Reveal>
            <Reveal className="aig-hero-visual" delay={180}>
              <div className="aig-search-art aig-phone-scene">
                <div className="aig-phone-orbit aig-phone-orbit-one" aria-hidden="true" />
                <div className="aig-phone-orbit aig-phone-orbit-two" aria-hidden="true" />
                <div className="aig-phone-float-tag aig-phone-tag-top">
                  <span className="aig-mini-dot" /> AI SEARCH LIVE
                </div>
                <div className="aig-phone-float-tag aig-phone-tag-bottom">
                  <TrendingUp size={14} /> Visibility signals connected
                </div>
                <div className="aig-hero-art-image" aria-hidden="true" />
                <div className="aig-phone-frame">
                  <div className="aig-phone-island" />
                  <div className="aig-phone-status">
                    <span>9:41</span>
                    <span>●●● ▰</span>
                  </div>
                  <AISearchConversation />
                </div>
              </div>
            </Reveal>
          </div>
          <div className="aig-hero-bottom">
            <span>SEARCH ENGINE OPTIMISATION</span>
            <span>GENERATIVE ENGINE OPTIMISATION</span>
            <span>AI DISCOVERABILITY</span>
          </div>
        </section>

        <section className="aig-section aig-features">
          <div className="aig-container">
            <Reveal className="aig-heading">
              <span className="aig-eyebrow">WHY IT MATTERS</span>
              <h2>Here's why your clients win in AI answers.</h2>
              <p>
                Search visibility is no longer just about a blue link. Make every useful signal work
                harder for your brand.
              </p>
            </Reveal>
            <div className="aig-feature-grid">
              {features.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.title} delay={i * 100}>
                    <article className="aig-feature-card">
                      <span className="aig-card-index">0{i + 1}</span>
                      <span className="aig-feature-icon">
                        <Icon size={21} />
                      </span>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      <ArrowUpRight className="aig-card-arrow" size={17} />
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="aig-section">
          <div className="aig-container aig-change-layout">
            <Reveal>
              <span className="aig-eyebrow">THE NEW SEARCH REALITY</span>
              <h2>
                Google's 10 blue links don't matter <span>anymore.</span>
              </h2>
              <p>
                People are discovering brands through summaries, conversations, and recommendations.
                Your content needs to be understood wherever decisions begin.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="aig-stat-row">
                <strong>63%</strong>
                <span>of discovery journeys are changing with AI-assisted search experiences.</span>
                <ArrowUpRight size={17} />
              </div>
              <div className="aig-stat-row">
                <strong>24/7</strong>
                <span>Your information needs to be clear and accessible whenever people ask.</span>
                <ArrowUpRight size={17} />
              </div>
              <div className="aig-stat-row">
                <strong>ONE</strong>
                <span>connected strategy for search engines and generative answer platforms.</span>
                <ArrowUpRight size={17} />
              </div>
              <div className="aig-stat-row">
                <strong>AI</strong>
                <span>visibility signals built on useful content and credible information.</span>
                <ArrowUpRight size={17} />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="aig-section aig-presence">
          <div className="aig-container">
            <Reveal className="aig-heading">
              <span className="aig-eyebrow">YOUR AI PRESENCE</span>
              <h2>Know your AI presence. Grow your advantage.</h2>
              <p>
                Understand how your business appears and where stronger signals can make a
                difference.
              </p>
            </Reveal>
            <Reveal>
              <div className="aig-presence-panel">
                <div className="aig-presence-top">
                  <span>
                    <i className="aig-live-dot" /> VISIBILITY OVERVIEW
                  </span>
                  <span>ILLUSTRATIVE DASHBOARD</span>
                </div>
                <div className="aig-presence-columns">
                  <div className="aig-presence-main">
                    <span className="aig-graph-label">GENERATIVE SEARCH PERFORMANCE</span>
                    <h3>Build a presence that compounds.</h3>
                    <p>
                      Connect technical foundations, useful answers, and consistent authority
                      signals.
                    </p>
                    <VisibilityTrendChart />
                  </div>
                  <div className="aig-presence-side">
                    {[
                      ["Content clarity", "Strong foundation", "82%"],
                      ["Technical health", "Room to improve", "68%"],
                      ["Entity signals", "Growth opportunity", "54%"],
                      ["AI discoverability", "In development", "41%"],
                    ].map((x) => (
                      <div className="aig-signal" key={x[0]}>
                        <span>{x[0]}</span>
                        <strong>{x[1]}</strong>
                        <div className="aig-signal-track">
                          <i style={{ "--signal-width": x[2] }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="aig-pricing">
          <div className="aig-pricing-pattern" />
          <div className="aig-container">
            <Reveal className="aig-heading">
              <span className="aig-eyebrow">BUILT AROUND YOUR GOALS</span>
              <h2>AI SEO Service Plans</h2>
              <p>
                Choose a starting point that matches your current visibility and growth priorities.
              </p>
            </Reveal>
            <div className="aig-plan-grid">
              {plans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 130}>
                  <article className={`aig-plan-card ${plan.popular ? "is-featured" : ""}`}>
                    <div className="aig-plan-top">
                      <span>
                        0{i + 1} / {plan.name.toUpperCase()}
                      </span>
                      {plan.popular && <span className="aig-popular">RECOMMENDED</span>}
                    </div>
                    <h3>{plan.name}</h3>
                    <p>{plan.note}</p>
                    <div className="aig-price">
                      {plan.price}
                      <small> / project scope</small>
                    </div>
                    <div className="aig-plan-rule" />
                    <ul>
                      {plan.items.map((item) => (
                        <li key={item}>
                          <Check size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link className="aig-plan-button" href="/book-a-discovery-call">
                      Discuss this plan <ArrowUpRight size={14} />
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="aig-plan-foot">
              <span>✓ Clear scope</span>
              <span>✓ Practical priorities</span>
              <span>✓ Measurable progress</span>
            </div>
          </div>
        </section>

        <section className="aig-section" id="geo-process">
          <div className="aig-container">
            <Reveal className="aig-heading">
              <span className="aig-eyebrow">A CLEAR PATH FORWARD</span>
              <h2>Our GEO Process</h2>
              <p>
                A focused process that turns discovery into a repeatable programme of improvement.
              </p>
            </Reveal>
            <div className="aig-process-grid">
              {processSteps.map(([Icon, title, text], i) => (
                <Reveal key={title} delay={i * 110}>
                  <article className="aig-process-card">
                    <div className="aig-process-top">
                      <Icon size={23} />
                      <span>STEP 0{i + 1}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <div className="aig-process-bottom">
                      <span>DISCOVER</span>
                      <ArrowRight size={14} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="aig-section aig-comparison">
          <div className="aig-container">
            <Reveal className="aig-heading">
              <span className="aig-eyebrow">A NEW DISCOVERY EXPERIENCE</span>
              <h2>GEO vs SEO: What Changed</h2>
              <p>
                Traditional search still matters. Generative discovery adds another layer to how
                people find and evaluate businesses.
              </p>
            </Reveal>
            <Reveal>
              <div className="aig-comparison-block">
                <h3>Traditional SEO</h3>
                <div className="aig-traditional-grid">
                  {[
                    ["Crawlable pages", "Make your site accessible to search engines."],
                    ["Relevant keywords", "Match pages to what people search."],
                    ["Useful content", "Answer questions with depth and clarity."],
                    ["Search results", "Earn visibility in organic listings."],
                  ].map(([title, text], i) => (
                    <article className="aig-compare-card" key={title}>
                      <span>0{i + 1} / SEO FOUNDATION</span>
                      <div className="aig-serp-mock">
                        <i />
                        <i />
                        <i />
                      </div>
                      <h4>{title}</h4>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <h3 className="aig-geo-statement">
                How GEO delivers results traditional SEO can't do alone.
              </h3>
              <div className="aig-geo-grid">
                {[
                  [
                    Sparkles,
                    "AI-readable answers",
                    "Structure information so generative systems can interpret it.",
                  ],
                  [
                    Globe2,
                    "Entity understanding",
                    "Connect your brand, expertise, and relevant topics.",
                  ],
                  [
                    MessageSquareText,
                    "Citation readiness",
                    "Publish clear, useful information worth referencing.",
                  ],
                  [Zap, "Continuous learning", "Monitor changes and improve as discovery evolves."],
                ].map(([Icon, title, text]) => (
                  <article className="aig-geo-card" key={title}>
                    <Icon size={23} />
                    <span>{title}</span>
                    <p>{text}</p>
                    <i className="aig-geo-card-line" />
                  </article>
                ))}
              </div>
            </Reveal>
            <div className="aig-comparison-link">
              <Link href="/book-a-discovery-call">
                Explore AI SEO services <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="aig-section">
          <div className="aig-container">
            <Reveal className="aig-heading">
              <span className="aig-eyebrow">MEASURE WHAT MOVES</span>
              <h2>Real Results Start With a Clear Baseline</h2>
              <p>We report against your own starting point, priorities, and business goals.</p>
            </Reveal>
            <Reveal>
              <div className="aig-result-card">
                <div className="aig-result-info">
                  <span className="aig-eyebrow">A TRANSPARENT APPROACH</span>
                  <h3>Progress you can understand.</h3>
                  <p>
                    No made-up ranking promises. We define the baseline, agree what success means,
                    and show the work and movement behind each reporting period.
                  </p>
                  <div className="aig-result-metrics">
                    <div>
                      <strong>01</strong>
                      <span>Baseline</span>
                    </div>
                    <div>
                      <strong>02</strong>
                      <span>Improve</span>
                    </div>
                    <div>
                      <strong>03</strong>
                      <span>Measure</span>
                    </div>
                  </div>
                  <p className="aig-result-note">
                    <CircleCheck size={15} /> Clear reporting, grounded in your analytics.
                  </p>
                </div>
                <div className="aig-result-visual">
                  <BaselineProgressCard />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="aig-mid-cta">
          <div className="aig-container">
            <Reveal>
              <div className="aig-mid-cta-inner">
                <span className="aig-eyebrow">THE NEXT SEARCH OPPORTUNITY</span>
                <h2>Ready to Own AI Search in Your Market?</h2>
                <p>
                  Start with a conversation about where your brand is visible today and where it
                  could be next.
                </p>
                <Link className="aig-button" href="/book-a-discovery-call">
                  Book a discovery call <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="aig-section aig-knowledge">
          <div className="aig-container">
            <Reveal className="aig-heading">
              <span className="aig-eyebrow">KEEP LEARNING</span>
              <h2>Knowledge Hub</h2>
              <p>Understand the ideas shaping search, AI answers, and digital visibility.</p>
            </Reveal>
            <div className="aig-article-grid">
              {[
                [
                  "AI SEARCH BASICS",
                  "The New Era of AI Search",
                  "Understand how AI-powered discovery is changing the way people research and choose businesses.",
                  Globe2,
                ],
                [
                  "GENERATIVE ENGINE OPTIMISATION",
                  "The GEO Playbook",
                  "Learn the foundations of making your expertise easier for answer engines to interpret.",
                  Sparkles,
                ],
                [
                  "CONTENT STRATEGY",
                  "Build Topical Authority",
                  "Explore how helpful, connected content builds a stronger and more consistent presence.",
                  Target,
                ],
              ].map(([tag, title, text, Icon], i) => (
                <Reveal key={title} delay={i * 120}>
                  <article className={`aig-article-card aig-article-${i + 1}`}>
                    <div className={`aig-article-art ${i === 0 ? "aig-article-art-photo" : ""}`}>
                      <span>{tag}</span>
                      <Icon size={48} />
                      <i className="aig-article-orbit" />
                    </div>
                    <div className="aig-article-content">
                      <span>INSIGHT 0{i + 1}</span>
                      <h3>{title}</h3>
                      <p>{text}</p>
                      <Link href="/services">
                        Explore our services <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="aig-section aig-faq-section">
          <div className="aig-container aig-faq-layout">
            <Reveal className="aig-faq-aside">
              <span className="aig-eyebrow">QUICK ANSWERS</span>
              <h2>Frequently Asked Questions</h2>
              <p>Some useful context before you get started.</p>
              <div className="aig-faq-orb" aria-hidden="true">
                <span className="aig-faq-orb-ring aig-faq-orb-ring-one" />
                <span className="aig-faq-orb-ring aig-faq-orb-ring-two" />
                <span className="aig-faq-orb-core">
                  <Sparkles size={21} />
                </span>
              </div>
              <Link className="aig-faq-help" href="/book-a-discovery-call">
                Still have a question? <ArrowUpRight size={14} />
              </Link>
            </Reveal>
            <div className="aig-faq-list">
              {faqs.map(([q, a], i) => (
                <Reveal key={q} delay={(i % 2) * 70}>
                  <div className={`aig-faq-item ${openFaq === i ? "is-open" : ""}`}>
                    <button
                      type="button"
                      aria-expanded={openFaq === i}
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    >
                      <span className="aig-faq-index">0{i + 1}</span>
                      <span className="aig-faq-question">{q}</span>
                      <span className="aig-faq-toggle">
                        <ChevronDown size={16} />
                      </span>
                    </button>
                    <div className="aig-faq-answer" aria-hidden={openFaq !== i}>
                      <p>{a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="aig-final">
          <div className="aig-container">
            <Reveal>
              <div className="aig-final-panel">
                <span className="aig-eyebrow">LET'S FIND YOUR NEXT OPPORTUNITY</span>
                <h2>Still not sure if AI SEO is right for you?</h2>
                <p>
                  Tell us what you want to achieve. We'll help you understand the best next step for
                  your search visibility.
                </p>
                <div className="aig-final-pills">
                  <span>
                    <Check size={13} /> SEO audit
                  </span>
                  <span>
                    <Check size={13} /> AI visibility
                  </span>
                  <span>
                    <Check size={13} /> GEO strategy
                  </span>
                  <span>
                    <Check size={13} /> Content plan
                  </span>
                </div>
                <Link className="aig-button" href="/book-a-discovery-call">
                  Let's talk about your goals <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}
