"use client";
/**
 * Stageshow lens on the closing CTA's right column: a miniature, believable
 * Ideaboat conversation rather than a decorative dial or a bare block of copy.
 *
 * A short scripted history plays once on scroll into view (draft -> posted ->
 * typing -> reply), so the settled frame still tells the story on its own.
 * After that intro the composer goes live: a visitor can type a message, send
 * it (click or Enter), and get a reply in the same window, as many times as
 * they like. The window is inset on three sides and bleeds off the foot of its
 * well; the cut crosses only empty window surface. Reduced-motion visitors get
 * the settled frame immediately and replies without the typing delay.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, CheckCheck, Heart, MoreHorizontal } from "lucide-react";
import sailboat from "@/assets/sailboat-emblem.png";

const DRAFT = "A smarter workflow.";
const GREETING = "Hi! What are you building?";
const REPLY = "Let's make it real.";
const CANNED_REPLIES = [
  "Love that — let's shape the strategy first.",
  "Got it. We'll map the build around that.",
  "Great starting point. Want to book a quick call?",
  "Perfect — we'll take it from here. hello@ideaboat.com",
];

export default function CtaConversation() {
  const wellRef = useRef(null);
  const threadRef = useRef(null);
  const timers = useRef([]);
  const idRef = useRef(1);
  const replyRef = useRef(0);
  const wasVisible = useRef(false);

  const [messages, setMessages] = useState([{ id: 0, from: "agent", text: GREETING }]);
  // pending -> intro -> live. The composer only becomes a real input at "live".
  const [phase, setPhase] = useState("pending");
  const [showDraft, setShowDraft] = useState(true);
  const [typing, setTyping] = useState(false);
  // The typing pill stays mounted briefly after the reply arrives so the two
  // can hand off; `data-leaving` collapses it on the reply's entrance clock.
  const [handoff, setHandoff] = useState(false);
  const [draft, setDraft] = useState("");
  const [interacted, setInteracted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nextId = () => idRef.current++;
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // The reply answers the newest outgoing message: its receipt turns to read
  // and it earns the tapback that lands with the answer. Older messages stay.
  const acknowledge = (list) => {
    let done = false;
    return list.map((m) => {
      if (!done && m.from === "me" && !m.react) {
        done = true;
        return { ...m, read: true, react: true };
      }
      return m;
    });
  };
  const handoffTimers = () => timers.current.push(window.setTimeout(() => setHandoff(false), 280));

  useEffect(() => {
    const well = wellRef.current;
    if (!well) return undefined;

    const settle = () => {
      setMessages([
        { id: 0, from: "agent", text: GREETING },
        { id: nextId(), from: "me", text: DRAFT, stamp: true, read: true, react: true },
        { id: nextId(), from: "agent", text: REPLY },
      ]);
      setShowDraft(false);
      setTyping(false);
      setHandoff(false);
      setPhase("live");
    };

    if (reducedMotion()) {
      settle();
      return undefined;
    }

    const clear = () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };

    // Reset to the opening history and run the whole beat again. Called every
    // time the card re-enters the viewport, so arriving at the card always
    // shows the conversation being written.
    const replay = () => {
      clear();
      setMessages([{ id: 0, from: "agent", text: GREETING }]);
      setShowDraft(true);
      setTyping(false);
      setHandoff(false);
      setInteracted(false);
      setScrolled(false);
      setPhase("intro");
      if (threadRef.current) threadRef.current.scrollTop = 0;
      timers.current = [
        window.setTimeout(() => {
          setMessages((m) => [
            ...m,
            { id: nextId(), from: "me", text: DRAFT, stamp: true, read: false, react: false },
          ]);
          setShowDraft(false);
        }, 900),
        window.setTimeout(() => setTyping(true), 1650),
        window.setTimeout(() => {
          setTyping(false);
          setHandoff(true);
          setMessages((m) => [...acknowledge(m), { id: nextId(), from: "agent", text: REPLY }]);
          setPhase("live");
          handoffTimers();
        }, 2750),
      ];
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (wasVisible.current) return;
          wasVisible.current = true;
          replay();
        } else {
          // Left the card: stop a half-finished run so re-entry starts clean.
          wasVisible.current = false;
          clear();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(well);
    return () => {
      io.disconnect();
      clear();
    };
  }, []);

  // Keep the newest message in view as the thread grows. The second pass runs
  // after the 520ms row animation, so a message that expanded from 0fr is not
  // left clipped behind the composer.
  useEffect(() => {
    const t = threadRef.current;
    if (!t) return undefined;
    const scroll = () => {
      t.scrollTop = t.scrollHeight;
    };
    scroll();
    const raf = window.requestAnimationFrame(scroll);
    const timer = window.setTimeout(scroll, 560);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [messages, typing]);

  const send = () => {
    if (phase !== "live" || typing) return;
    const text = draft.trim();
    if (!text) return;

    const instant = reducedMotion();
    setInteracted(true);
    setMessages((m) => [
      ...m,
      { id: nextId(), from: "me", text, stamp: true, read: false, react: false },
    ]);
    setDraft("");
    setTyping(true);

    const timer = window.setTimeout(
      () => {
        const reply = CANNED_REPLIES[replyRef.current % CANNED_REPLIES.length];
        replyRef.current += 1;
        setTyping(false);
        setMessages((m) => [...acknowledge(m), { id: nextId(), from: "agent", text: reply }]);
        if (!instant) {
          setHandoff(true);
          handoffTimers();
        }
      },
      instant ? 0 : 900,
    );
    timers.current.push(timer);
  };

  const on = (condition) => (condition ? "" : undefined);

  return (
    <div className="cta-conv">
      <div className="cta-conv-well" ref={wellRef}>
        <div className="cta-conv-window" role="group" aria-label="Chat with Ideaboat">
          <div className="cta-conv-head">
            <span className="cta-conv-avatar">
              <img src={sailboat.src} alt="" />
            </span>
            <span className="cta-conv-who">
              <span className="cta-conv-name">Ideaboat</span>
              <span className="cta-conv-status">
                <i aria-hidden="true" />
                Active now
              </span>
            </span>
            <MoreHorizontal className="cta-conv-more" size={16} strokeWidth={2} />
          </div>

          <div
            className={`cta-conv-thread${scrolled ? " is-scrolled" : ""}`}
            ref={threadRef}
            role="log"
            aria-label="Conversation"
            aria-live={interacted ? "polite" : "off"}
            onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
          >
            {messages.map((m) => (
              <div className={`cta-conv-msg cta-conv-msg--${m.from}`} key={m.id}>
                <div className="cta-conv-msg-inner">
                  {m.from === "me" ? (
                    <div className="cta-conv-stack cta-conv-stack--me">
                      <div className="cta-conv-bubble">
                        {m.text}
                        {m.react && (
                          <span className="cta-conv-tapback" data-on="" aria-hidden="true">
                            <Heart size={11} strokeWidth={0} fill="currentColor" />
                          </span>
                        )}
                      </div>
                      <div className="cta-conv-stamp">
                        <span className="cta-conv-receipt" aria-hidden="true">
                          <Check size={12} strokeWidth={2.4} data-on={m.read ? undefined : ""} />
                          <CheckCheck
                            size={12}
                            strokeWidth={2.4}
                            data-on={m.read ? "" : undefined}
                          />
                        </span>
                        Just now
                      </div>
                    </div>
                  ) : (
                    <div className="cta-conv-bubble">{m.text}</div>
                  )}
                </div>
              </div>
            ))}

            {(typing || handoff) && (
              <div
                className="cta-conv-msg cta-conv-msg--agent cta-conv-msg--typing"
                data-leaving={typing ? undefined : ""}
              >
                <div className="cta-conv-msg-inner">
                  <div className="cta-conv-bubble cta-conv-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="cta-conv-compose">
            {phase === "live" ? (
              <>
                <div className="cta-conv-field">
                  <input
                    className="cta-conv-input"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Message Ideaboat"
                    aria-label="Message Ideaboat"
                    maxLength={160}
                  />
                </div>
                <button
                  type="button"
                  className="cta-conv-send"
                  onClick={send}
                  disabled={typing || !draft.trim()}
                  aria-label="Send message"
                >
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </button>
              </>
            ) : (
              <>
                <span className="cta-conv-field">
                  <span className="cta-conv-field-txt" data-on={on(showDraft)}>
                    {DRAFT}
                  </span>
                  <span className="cta-conv-field-txt" data-on={on(!showDraft)}>
                    Message Ideaboat
                  </span>
                </span>
                <span className="cta-conv-send">
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
