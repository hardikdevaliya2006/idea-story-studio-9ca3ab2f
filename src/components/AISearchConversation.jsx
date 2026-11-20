"use client";
/**
 * Small, self-playing AI search conversation used in the AI SEO hero.
 *
 * The visitor's question is typed into the composer, posted into the thread,
 * handed to a typing indicator, answered, and followed by related questions.
 * The related questions are real buttons: choosing one starts the next leg of
 * the conversation. Everything pauses while off-screen and respects reduced
 * motion by showing the settled, answered frame straight away.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CheckCheck, Globe2, Sparkles } from "lucide-react";
import sailboat from "@/assets/sailboat-emblem.png";

const SCENES = [
  {
    question: "Who should I trust to grow my brand online?",
    answer:
      "Look for proven expertise, clear reporting and content that answers the questions people actually ask.",
    sources: "4 trusted sources analysed",
    bars: [42, 61, 74, 94],
    related: [
      { label: "Check proven experience", next: 1 },
      { label: "How AI picks its sources", next: 1 },
      { label: "What to fix on my site", next: 2 },
    ],
  },
  {
    question: "How do AI engines decide what to cite?",
    answer:
      "They favour clear, well-structured and credible pages that answer the question directly and stay consistent across the web.",
    sources: "6 answer signals connected",
    bars: [34, 52, 68, 88],
    related: [
      { label: "Improve my entity signals", next: 2 },
      { label: "Make answers easier to read", next: 2 },
      { label: "Find a growth partner", next: 0 },
    ],
  },
  {
    question: "What should I fix on my website first?",
    answer:
      "Start with technical health, then clarify your most useful pages and strengthen the content around the topics you own.",
    sources: "3 priority actions prepared",
    bars: [48, 57, 79, 96],
    related: [
      { label: "See the full SEO audit", next: 0 },
      { label: "Plan my content roadmap", next: 1 },
      { label: "Understand AI visibility", next: 1 },
    ],
  },
];

export default function AISearchConversation() {
  const rootRef = useRef(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  // 0 typing the question · 1 posted / thinking · 2 answer · 3 related questions
  const [phase, setPhase] = useState(0);
  const [typed, setTyped] = useState(0);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const scene = SCENES[sceneIndex];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setTyped(scene.question.length);
      setPhase(3);
      return undefined;
    }
    if (!inView) return undefined;

    let delay;
    if (phase === 0 && typed < scene.question.length) {
      delay = window.setTimeout(() => setTyped((value) => value + 1), 55);
    } else if (phase === 0) {
      delay = window.setTimeout(() => setPhase(1), 520);
    } else if (phase === 1) {
      delay = window.setTimeout(() => setPhase(2), 1500);
    } else if (phase === 2) {
      delay = window.setTimeout(() => setPhase(3), 1250);
    } else {
      delay = window.setTimeout(() => {
        setSceneIndex((index) => (index + 1) % SCENES.length);
        setTyped(0);
        setPhase(0);
      }, 4300);
    }
    return () => window.clearTimeout(delay);
  }, [reducedMotion, inView, phase, typed, scene.question.length]);

  const chooseQuestion = (next) => {
    setSceneIndex(next);
    setTyped(0);
    setPhase(0);
  };

  const on = (condition) => (condition ? "" : undefined);

  return (
    <div className="aig-live-chat" ref={rootRef}>
      <div className="aig-live-chat-head">
        <span className="aig-live-avatar">
          <img src={sailboat.src} alt="" />
        </span>
        <span className="aig-live-who">
          <strong>Ideaboat</strong>
          <small>
            <i /> Online · AI search assistant
          </small>
        </span>
        <span className="aig-live-more">•••</span>
      </div>

      <div className="aig-live-thread">
        <div className="aig-live-date">TODAY · AI SEARCH SESSION</div>

        <div className="aig-live-msg aig-live-msg--user" data-on={on(phase >= 1)}>
          <div className="aig-live-bubble">{scene.question}</div>
          <span className="aig-live-stamp">
            <CheckCheck size={11} /> Just now
          </span>
        </div>

        <div className="aig-live-msg aig-live-msg--ai aig-live-thinking" data-on={on(phase === 1)}>
          <div className="aig-live-bubble aig-live-dots">
            <i />
            <i />
            <i />
          </div>
          <span>Searching trusted sources…</span>
        </div>

        <div className="aig-live-msg aig-live-msg--ai" data-on={on(phase >= 2)}>
          <div className="aig-live-answer">
            <div className="aig-live-answer-head">
              <span className="aig-live-avatar is-small">
                <img src={sailboat.src} alt="" />
              </span>
              <strong>Ideaboat</strong>
              <i>ANSWER</i>
            </div>
            <p>{scene.answer}</p>
            <div className="aig-live-bars" key={sceneIndex} aria-hidden="true">
              {scene.bars.map((height, index) => (
                <i
                  key={index}
                  style={{ "--bar-h": `${height}%`, "--bar-delay": `${index * 130}ms` }}
                />
              ))}
              <svg viewBox="0 0 120 30" preserveAspectRatio="none" aria-hidden="true">
                <polyline points="2,25 28,20 52,22 78,11 104,13 118,3" />
              </svg>
            </div>
            <div className="aig-live-source">
              <Globe2 size={11} /> {scene.sources}
            </div>
          </div>
        </div>

        <div className="aig-live-related" data-on={on(phase >= 3)}>
          <span className="aig-live-related-label">
            <Sparkles size={10} /> RELATED QUESTIONS
          </span>
          {scene.related.map((item) => (
            <button type="button" key={item.label} onClick={() => chooseQuestion(item.next)}>
              {item.label}
              <ArrowUpRight size={11} />
            </button>
          ))}
        </div>
      </div>

      <div className="aig-live-compose">
        <span className="aig-live-compose-text">
          {phase === 0 ? scene.question.slice(0, typed) : "Ask about AI visibility…"}
        </span>
        <i className={phase === 0 ? "is-typing" : undefined} aria-hidden="true" />
        <b>
          <ArrowUpRight size={13} />
        </b>
      </div>
    </div>
  );
}
