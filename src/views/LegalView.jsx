import { siteConfig } from "@/lib/site";

/* Starter policy copy for the linked footer pages. Review with counsel before
   treating these as final legal documents for the business. */
const UPDATED = "November 18, 2026";

function LegalShell({ title, intro, sections }) {
  return (
    <main id="main-content" className="page-container max-w-3xl space-y-10 pb-24 pt-28 md:pt-36">
      <header className="space-y-4">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">Legal</p>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
        <p className="text-sm text-muted-foreground">Last updated: {UPDATED}</p>
      </header>
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{intro}</p>
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.title} className="space-y-3">
            <h2 className="font-display text-xl font-semibold tracking-tight">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-muted-foreground md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
      <section className="rounded-2xl border p-6 text-sm leading-relaxed text-muted-foreground">
        Questions about this page? Email{" "}
        <a className="font-medium text-primary hover:underline" href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </a>{" "}
        or write to {siteConfig.address.join(", ")}.
      </section>
    </main>
  );
}

export function PrivacyPolicyView() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="This policy explains what information Ideaboat collects when you use this website and how we handle it. We keep it simple: we only ask for what we need to reply to you and deliver the work you request."
      sections={[
        {
          title: "Information we collect",
          paragraphs: [
            "When you contact us or book a discovery call, we collect the details you enter into the form, such as your name, email address, phone number, company and message.",
            "We may also receive basic technical information from your browser when you visit the site, such as your IP address and the pages you view, to keep the site secure and understand which pages are useful.",
          ],
        },
        {
          title: "How we use your information",
          paragraphs: [
            "We use your details to respond to enquiries, plan and deliver services, and keep in touch about the work you asked us to do. We do not use your information for unsolicited marketing.",
          ],
        },
        {
          title: "Sharing and retention",
          paragraphs: [
            "We do not sell your information. We share it only with the service providers we need to operate our business and deliver a project, and when the law requires us to. We keep enquiry details only as long as they are useful for the purpose they were collected.",
          ],
        },
        {
          title: "Your choices",
          paragraphs: [
            "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email hello@ideaboat.com and we will respond to reasonable requests.",
          ],
        },
      ]}
    />
  );
}

export function TermsOfServiceView() {
  return (
    <LegalShell
      title="Terms of Service"
      intro="These terms govern your use of the Ideaboat website. By browsing or contacting us through this site, you agree to them. Project work is governed separately by the agreement we sign with each client."
      sections={[
        {
          title: "Using this site",
          paragraphs: [
            "You may browse and share this website for lawful purposes. Do not attempt to interfere with its operation, copy its content as your own, or use it to distribute harmful material.",
          ],
        },
        {
          title: "Content and intellectual property",
          paragraphs: [
            "The text, design, graphics and code on this site belong to Ideaboat or our licensors. You may link to the site, but reproducing its content without permission is not allowed.",
          ],
        },
        {
          title: "Information on this site",
          paragraphs: [
            "We aim to keep the information here accurate and current, but it is general information, not professional advice for your specific situation. Contact us to discuss your particular needs.",
          ],
        },
        {
          title: "External links and liability",
          paragraphs: [
            "Links to third-party sites are provided for convenience; we are not responsible for their content or practices. To the extent permitted by law, Ideaboat is not liable for indirect losses arising from use of this website.",
          ],
        },
        {
          title: "Changes to these terms",
          paragraphs: [
            "We may update these terms as the site or our business changes. The date at the top of this page always shows when the current version was last revised.",
          ],
        },
      ]}
    />
  );
}
