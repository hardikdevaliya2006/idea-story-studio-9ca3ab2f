import { describe, expect, it } from "vitest";
import { APPROACH, SERVICES, findService } from "@/data/services";

describe("services data", () => {
  it("gives every service the fields the pages render", () => {
    for (const service of SERVICES) {
      expect(service.slug).toMatch(/^[a-z0-9-]+$/);
      expect(service.title.length).toBeGreaterThan(0);
      expect(service.includes.length).toBeGreaterThan(0);
      expect(service.outcomes.length).toBeGreaterThan(0);
      expect(service.tools.length).toBeGreaterThan(0);
    }
  });

  it("keeps slugs unique so static params cannot collide", () => {
    const slugs = SERVICES.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("finds a service by slug and returns undefined otherwise", () => {
    const first = SERVICES[0]!;
    expect(findService(first.slug)?.title).toBe(first.title);
    expect(findService("does-not-exist")).toBeUndefined();
    expect(findService(undefined)).toBeUndefined();
  });

  it("documents the four approach steps", () => {
    expect(APPROACH).toHaveLength(4);
  });
});
