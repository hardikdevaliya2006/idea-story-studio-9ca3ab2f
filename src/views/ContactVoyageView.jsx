import ContactVoyageScene from "@/components/ContactVoyageScene";

export default function ContactVoyageView() {
  return (
    <main
      id="main-content"
      className="page-container space-y-10 pb-20 pt-28 md:space-y-14 md:pt-36"
    >
      <header className="max-w-2xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
          Stageshow · contact panel only
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          From brief to live
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          The Ideaboat Studio workspace that replaces the flat contact panel. A cursor presses Set
          sail, the four voyage steps fill, the brief resolves into a live site, and a URL chip
          strides the window corner before the conveyor reset returns a fresh brief.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="h-[520px] rounded-3xl border border-dashed border-border" />
        <div className="h-[520px]">
          <ContactVoyageScene />
        </div>
      </div>
    </main>
  );
}
