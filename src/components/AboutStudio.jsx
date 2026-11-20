"use client";
/**
 * Stageshow lens on the crew column: a miniature studio presence panel. Two
 * named rows carry the scene; two shorter filler rows keep the list's pitch
 * without inventing more copy. A still — no cursor, no loop, no decorations.
 */
import { Sailboat } from "lucide-react";

const PEOPLE = [
  { initials: "MO", name: "Marcus Okafor", action: "reviewing a workflow", color: "#3f8f74" },
  { initials: "OB", name: "Olivia Bennett", action: "shipped an agent", color: "#b07d3a" },
];

export default function AboutStudio() {
  return (
    <div className="about-scene about-studio" aria-hidden="true">
      <div className="about-scene-window about-stu-window">
        <div className="about-stu-head">
          <span className="about-stu-mark">
            <Sailboat size={14} strokeWidth={2} />
          </span>
          <span className="about-stu-title">Studio</span>
          <span className="about-stu-online">
            <i />4 online
          </span>
        </div>

        <div className="about-stu-list">
          {PEOPLE.map((person) => (
            <div className="about-stu-row" key={person.name}>
              <span className="about-stu-avatar" style={{ "--avatar": person.color }}>
                {person.initials}
              </span>
              <span className="about-stu-line">
                <span className="about-stu-name">{person.name}</span>
                <span className="about-stu-action">{person.action}</span>
              </span>
            </div>
          ))}

          <div className="about-stu-row">
            <span className="about-stu-disc" />
            <span className="about-stu-line">
              <span className="about-stu-bar" style={{ width: 78 }} />
              <span className="about-stu-bar about-stu-bar--soft" style={{ width: 52 }} />
            </span>
          </div>
          <div className="about-stu-row">
            <span className="about-stu-disc" />
            <span className="about-stu-line">
              <span className="about-stu-bar" style={{ width: 64 }} />
              <span className="about-stu-bar about-stu-bar--soft" style={{ width: 44 }} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
