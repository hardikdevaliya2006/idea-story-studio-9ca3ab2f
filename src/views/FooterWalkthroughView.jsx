import FooterWalkthrough from "@/components/FooterWalkthrough";

export default function FooterWalkthroughView() {
  return (
    <main
      id="main-content"
      className="page-container space-y-10 pb-20 pt-28 md:space-y-14 md:pt-36"
    >
      <header className="max-w-2xl space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
          Stageshow · footer only
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          A walkthrough of the footer
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
          One cropped frame of the real footer. The cursor lights the wordmark, reads each link
          column, tours the contact and social strip, draws the legal rule, then returns for the
          full glow before the scene settles and loops.
        </p>
      </header>
      <FooterWalkthrough />
    </main>
  );
}
