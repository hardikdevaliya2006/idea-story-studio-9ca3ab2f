"use client";
import { useState } from "react";
import { Pause, Play } from "lucide-react";

const testimonials = [
  {
    q: "Ideaboat turned our business around in just three months. Leads doubled and our brand finally feels premium.",
    name: "Aarav Mehta",
    role: "Founder, Brewline",
    stat: "+212% revenue",
  },
  {
    q: "A pleasure to work with - fast, thoughtful and always on brand. They felt like part of our team.",
    name: "Sara Kapoor",
    role: "CMO, Northwind",
    stat: "4.9★ rating",
  },
  {
    q: "They brought our vision to life with an app our users genuinely love using every day.",
    name: "Rohan Iyer",
    role: "CEO, Fitloop",
    stat: "120k installs",
  },
  {
    q: "Results beyond expectation. Our new website finally converts visitors into customers.",
    name: "Neha Shah",
    role: "Head of Growth, Lumen",
    stat: "3.4x conversions",
  },
  {
    q: "The best creative partner we've had. Clear process, sharp design and zero stress.",
    name: "Kabir Singh",
    role: "Director, Studio K",
    stat: "8 campaigns",
  },
  {
    q: "Our ads finally make sense. Lower cost per lead and a team that explains every number.",
    name: "Priya Nair",
    role: "Owner, Bloom Café",
    stat: "-46% cost per lead",
  },
];

const TONES = testimonials.map((_, i) => `tm-tone-${i}`);
const initials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

/**
 * The original testimonial marquee, polished in place: same loop, same copy,
 * same hover-to-focus. The card now has a clear reading order - quote mark and
 * result on one line, the words in the middle, a named author at the foot - and
 * the edges fade with a mask instead of two opaque slabs. A small control
 * gives the loop a real pause state.
 */
export function TestimonialCarousel() {
  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const items = [...testimonials, ...testimonials];
  const isPaused = paused || hovering;

  return (
    <div className="tm-wrap">
      <div className="tm-toolbar">
        <button
          type="button"
          className="tm-toggle"
          aria-pressed={paused}
          aria-label={paused ? "Resume testimonials" : "Pause testimonials"}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          <span>{paused ? "Play" : "Pause"}</span>
        </button>
      </div>

      <div
        className="tm-viewport"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div
          className="marquee tm-marquee"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {items.map((t, i) => (
            <article key={i} className="tm-card" aria-hidden={i >= testimonials.length}>
              <div className="tm-card-top">
                <span className="tm-quote-mark" aria-hidden="true">
                  “
                </span>
                <span className="tm-stat">{t.stat}</span>
              </div>

              <p className="tm-quote">{t.q}</p>

              <div className="tm-author">
                <span className={`tm-avatar ${TONES[i % testimonials.length]}`} aria-hidden="true">
                  {initials(t.name)}
                </span>
                <div className="tm-author-copy">
                  <h3 className="tm-name">{t.name}</h3>
                  <p className="tm-role">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
