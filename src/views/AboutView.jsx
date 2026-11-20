"use client";
import {
  ArrowUpRight,
  Compass,
  Gem,
  Users,
  Target,
  Lightbulb,
  Layers,
  Rocket,
  Quote,
} from "lucide-react";
import { Reveal, useReveal } from "@/components/site-chrome";
import AboutApproach from "@/components/AboutApproach";
import AboutControlPlane from "@/components/AboutControlPlane";
import AboutStudio from "@/components/AboutStudio";

const pillars = [
  {
    icon: Lightbulb,
    title: "What we do",
    desc: "AI solutions, intelligent automation, custom AI agents & integrations",
  },
  {
    icon: Compass,
    title: "How we work",
    desc: "Strategy-led, collaborative & focused on practical business outcomes",
  },
  {
    icon: Users,
    title: "Who we work with",
    desc: "Startups, growing businesses & teams across industries",
  },
  {
    icon: Target,
    title: "Our focus",
    desc: "Practical AI, smarter workflows & scalable solutions",
  },
];
const stats = [
  ["2x", "More qualified leads"],
  ["35%", "Faster lead response"],
  ["20+ HRS", "Saved monthly through AI automation"],
];
const values = [
  {
    icon: Lightbulb,
    title: "Innovation with Purpose",
    desc: "We explore AI and emerging technologies with a clear purpose-solving real business challenges and creating smarter ways to work.",
  },
  {
    icon: Gem,
    title: "Built for Quality",
    desc: "We focus on reliable, practical solutions designed to perform consistently and create long-term value for businesses.",
  },
  {
    icon: Users,
    title: "Better Together",
    desc: "We work closely with our clients, combining their industry knowledge with our AI expertise to build solutions that truly fit their needs.",
  },
  {
    icon: Target,
    title: "Results That Matter",
    desc: "We measure success by meaningful outcomes-from reducing repetitive work to improving efficiency and supporting sustainable growth.",
  },
];
const steps = [
  [
    "Insights. Surfaced.",
    "We start by understanding your goals, audience, and challenges. This is where insights surface and opportunities begin to take shape.",
  ],
  [
    "Strategy. Mapped.",
    "We map out a clear strategy, aligning AI solutions with your vision. Every step is focused on solving real problems and unlocking growth.",
  ],
  [
    "Built. To Fit.",
    "We bring ideas to life by developing custom AI agents and automations designed to fit seamlessly into your workflow.",
  ],
  [
    "Results. Measured.",
    "We refine and expand your solution, track results, improve performance, and scale your AI systems as your business grows.",
  ],
];
const team = [
  { name: "Marcus Okafor", role: "Founder & CEO", icon: Rocket },
  { name: "Olivia Bennett", role: "Head of Automation", icon: Layers },
  { name: "Christopher Hayes", role: "Chief AI Architect", icon: Lightbulb },
  { name: "Ethan Walker", role: "Client Success", icon: Users },
];
const testimonials = [
  {
    name: "Michael Rodriguez",
    role: "VP of Sales, GrowthLabs",
    quote:
      "The team understood our complex integration requirements and built something that just works. Worth every penny.",
  },
  {
    name: "Alex Rivera",
    role: "COO, Haus",
    quote:
      "The team didn't just build an automation; they re-engineered our entire operations workflow. We're moving twice as fast now.",
  },
  {
    name: "Sarah Jenkins",
    role: "VP Engineering, DataCorp",
    quote:
      "Finally, an automation partner who actually understands enterprise security requirements. No hand-waving, just solid execution.",
  },
  {
    name: "Adam Smith",
    role: "CEO, TechSpace",
    quote:
      "They quickly grasped our complicated integration needs and delivered a solution that works flawlessly. Absolutely worth the investment.",
  },
];

export default function AboutPage() {
  useReveal();
  return (
    <div className="overflow-x-clip">
      <main
        id="main-content"
        className="mx-auto max-w-6xl space-y-16 px-6 pb-20 pt-28 md:space-y-24 md:pb-24 md:pt-36"
      >
        {/* MISSION + CONTROL PLANE SCENE */}
        <section className="about-hero" aria-labelledby="about-title">
          <Reveal className="about-hero-copy">
            <p className="about-eyebrow">About Ideaboat</p>
            <h1 id="about-title" className="about-title">
              AI that makes business simpler, not more complicated
            </h1>
            <p className="about-lead">
              To empower businesses with AI solutions that simplify work, spark innovation, and
              create lasting impact. IdeaBoat combines intelligent automation with practical
              technology to solve real business challenges and help teams work smarter.
            </p>
            <p className="about-lead">
              Our focus is on building intelligent solutions that reduce repetitive work and improve
              everyday operations. From custom AI agents to workflow automation, we help businesses
              turn new opportunities into practical systems designed for efficiency and sustainable
              growth.
            </p>
            <div className="about-jump">
              <a href="#approach">
                How we work
                <ArrowUpRight />
              </a>
              <a href="#crew">
                Meet the crew
                <ArrowUpRight />
              </a>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AboutControlPlane />
          </Reveal>
        </section>

        {/* BY THE NUMBERS */}
        <section aria-labelledby="about-numbers">
          <Reveal className="about-section-head">
            <p id="about-numbers" className="about-eyebrow">
              By the numbers
            </p>
          </Reveal>
          <div className="about-band">
            {stats.map(([value, label]) => (
              <Reveal key={label} className="about-stat">
                <span className="about-stat-value">{value}</span>
                <span className="about-stat-label">{label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* IN BRIEF */}
        <section aria-label="Ideaboat in brief">
          <Reveal className="about-section-head">
            <p className="about-eyebrow">In brief</p>
          </Reveal>
          <div className="about-principles">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80} className="about-principle">
                <span className="about-index">0{i + 1}</span>
                <span className="about-principle-icon">
                  <pillar.icon size={16} strokeWidth={1.9} />
                </span>
                <h3 className="about-principle-title">{pillar.title}</h3>
                <p className="about-principle-desc">{pillar.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* WHAT WE CARE ABOUT */}
        <section className="about-values" aria-labelledby="about-values-title">
          <Reveal className="about-values-head">
            <p className="about-eyebrow">Our values</p>
            <h2 id="about-values-title" className="about-section-title">
              What we care about
            </h2>
          </Reveal>
          <div>
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80} className="about-value">
                <span className="about-index">0{i + 1}</span>
                <span className="about-value-icon">
                  <value.icon size={16} strokeWidth={1.9} />
                </span>
                <div>
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-desc">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* HOW WE WORK + RAIL SCENE */}
        <section id="approach" aria-labelledby="about-approach-title">
          <Reveal className="about-section-head about-section-row">
            <div>
              <p className="about-eyebrow">How we work</p>
              <h2 id="about-approach-title" className="about-section-title">
                How an idea becomes a product
              </h2>
            </div>
            <p className="about-section-note">
              From understanding your goals to building and scaling AI solutions, IdeaBoat follows a
              clear approach focused on real business results.
            </p>
          </Reveal>
          <AboutApproach steps={steps} />
        </section>

        {/* MEET THE CREW + PRESENCE SCENE */}
        <section id="crew" className="about-team" aria-labelledby="about-team-title">
          <Reveal className="about-team-head">
            <p className="about-eyebrow">The people</p>
            <h2 id="about-team-title" className="about-section-title">
              Meet the crew
            </h2>
          </Reveal>
          <Reveal>
            <AboutStudio />
            <div className="about-roster mt-7">
              {team.map((member, i) => (
                <div className="about-roster-row" key={member.name}>
                  <span className="about-index">0{i + 1}</span>
                  <span className="about-roster-avatar">
                    <member.icon size={18} strokeWidth={1.9} />
                  </span>
                  <span className="about-roster-name">{member.name}</span>
                  <span className="about-roster-role">{member.role}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* IN THEIR WORDS */}
        <section aria-labelledby="about-voices-title">
          <Reveal className="about-section-head">
            <p className="about-eyebrow">In their words</p>
            <h2 id="about-voices-title" className="about-section-title">
              The humans in the loop
            </h2>
          </Reveal>
          <Reveal>
            <div className="about-quotes">
              {testimonials.map((item) => (
                <figure className="about-quote" key={item.name}>
                  <Quote className="about-quote-mark" strokeWidth={1.9} />
                  <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption>
                    <span>{item.name}</span>
                    <span>{item.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </section>

      </main>
    </div>
  );
}
