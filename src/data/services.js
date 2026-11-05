import {
  Workflow,
  Bot,
  TrendingUp,
  Search,
  LayoutGrid,
  Palette,
  Globe,
  ShoppingBag,
  Megaphone,
} from "lucide-react";
export const APPROACH = [
  [
    "Discover",
    "We start by understanding your goals, audience, and challenges. This is where insights surface and opportunities begin to take shape.",
  ],
  [
    "Plan",
    "We map out a clear strategy, aligned with your vision. Every step is focused on solving real problems and unlocking growth.",
  ],
  [
    "Build",
    "We bring the plan to life, building and connecting everything it needs so it fits seamlessly into your workflow.",
  ],
  [
    "Scale",
    "We refine and expand what we've built, track results, improve performance, and grow it alongside your business.",
  ],
];
export const SERVICES = [
  {
    slug: "ai-workflow-automation",
    icon: Workflow,
    title: "AI Workflow Automation",
    short:
      "Transform repetitive processes into intelligent, automated workflows that save time and improve efficiency.",
    intro:
      "Turn the repetitive work your team does every day into automated workflows that run reliably in the background.",
    tagline: "Less manual work, fewer dropped handoffs",
    overview:
      "We map the manual steps your team repeats daily — approvals, data entry, handoffs, follow-ups — and rebuild them as automated workflows connected to the tools you already use. Every workflow is documented, monitored, and easy to adjust when your process changes.",
    includes: [
      "Process mapping and workflow design",
      "Approval and handoff automation",
      "Automated notifications and reminders",
      "Error handling, retries, and logging",
      "Dashboards that show what ran and when",
      "Documentation and team handover",
    ],
    tools: ["n8n", "Make", "Zapier", "Slack", "Google Sheets", "Airtable", "HubSpot", "Notion"],
    outcomes: [
      "Manual steps removed from daily operations",
      "Fewer missed handoffs and forgotten follow-ups",
      "The same result every time the process runs",
      "Time back for the team to do real work",
    ],
    ctaTitle: "Ready to automate the busywork?",
    ctaText:
      "Tell us which process eats the most time, and we'll show you what automation looks like there.",
  },
  {
    slug: "custom-ai-agents",
    icon: Bot,
    title: "Custom AI Agents",
    short:
      "Build intelligent AI agents designed around your business processes, data, tools, and everyday tasks.",
    intro:
      "AI agents built around your processes, your data, and the tasks your team repeats every day.",
    tagline: "An agent with one clear job, done well",
    overview:
      "We build agents that read your documents and systems, take the right action, and hand off to a person when they should. Each agent is scoped to a clear job, connected to your real data, and tested against your own examples before it touches live work.",
    includes: [
      "An agent scoped to one clear job",
      "Connections to your tools and knowledge sources",
      "Retrieval over your own documents and data",
      "Guardrails, permissions, and human handoff",
      "Evaluation tests before rollout",
      "Monitoring and tuning after launch",
    ],
    tools: [
      "OpenAI",
      "Claude",
      "LangChain",
      "Pinecone",
      "Supabase",
      "Slack",
      "Zendesk",
      "Custom APIs",
    ],
    outcomes: [
      "Faster answers for support and internal teams",
      "Repetitive requests handled without waiting",
      "Knowledge spread across the team, not one person",
      "An agent that keeps improving with feedback",
    ],
    ctaTitle: "Want an agent that knows your business?",
    ctaText:
      "Bring us one task your team keeps doing by hand, and we'll scope what an agent could own.",
  },
  {
    slug: "ai-for-business-growth",
    icon: TrendingUp,
    title: "AI for Business Growth",
    short:
      "Bring AI into your existing platforms and workflows to create smarter, more connected operations.",
    intro:
      "Bring AI into the platforms you already use, so everyday operations get smarter without new tools.",
    tagline: "Smarter work inside the tools you already pay for",
    overview:
      "You don't need a new platform to benefit from AI. We look at where your team already works — CRM, helpdesk, store, spreadsheets — and add AI where it removes friction: writing, sorting, summarising, scoring, and connecting data that used to sit in separate places.",
    includes: [
      "AI opportunities ranked by impact and effort",
      "Integration into your existing platforms",
      "Lead scoring and prioritisation",
      "Automated summaries and reporting",
      "Shared dashboards for the numbers that matter",
      "Team training on the new workflow",
    ],
    tools: [
      "HubSpot",
      "Salesforce",
      "Shopify",
      "Slack",
      "Looker Studio",
      "Google Sheets",
      "Stripe",
      "Zapier",
    ],
    outcomes: [
      "Better decisions from connected data",
      "Sales and support work that moves faster",
      "Reporting that builds itself each week",
      "AI adoption the team actually uses",
    ],
    ctaTitle: "Let's find where AI pays off first",
    ctaText:
      "We'll review your current stack and point to the two or three places AI is worth adding.",
  },
  {
    slug: "aeo-geo",
    icon: Search,
    title: "AEO & GEO",
    short:
      "Get your business seen and cited by AI answer engines, not just ranked by traditional search.",
    intro:
      "Get your business seen and cited by AI answer engines, not just ranked by traditional search.",
    tagline: "Show up in the answers people actually read",
    overview:
      "Buyers now ask ChatGPT, Gemini, and Perplexity who to work with. We structure your content, schema, and entity signals so AI systems can read, trust, and cite your business when someone asks for what you offer.",
    includes: [
      "Audit of how AI engines currently see you",
      "Content structured for question-and-answer retrieval",
      "Schema and entity markup",
      "Trusted citations and directory coverage",
      "Tracking of AI mentions and referrals",
      "Ongoing updates as the engines change",
    ],
    tools: [
      "ChatGPT",
      "Gemini",
      "Perplexity",
      "Google Search Console",
      "Schema.org",
      "Ahrefs",
      "Semrush",
    ],
    outcomes: [
      "Your brand appears inside AI answers",
      "Traffic from answer engines, not only Google",
      "Content written the way people actually ask",
      "AI visibility you can measure month to month",
    ],
    ctaTitle: "Curious what AI says about you today?",
    ctaText:
      "We'll check how the major answer engines describe your business right now, and where the gaps are.",
  },
  {
    slug: "custom-solutions-crm",
    icon: LayoutGrid,
    title: "Custom Solutions & CRM",
    short: "Connected CRM setups and internal tools that replace manual, scattered processes.",
    intro:
      "Connected CRM setups and internal tools that replace scattered spreadsheets and manual data entry.",
    tagline: "One place for your customer information",
    overview:
      "When customer information is split across spreadsheets, inboxes, and half-used tools, everything slows down. We build or configure the CRM and internal tools your team actually needs, connected to the rest of your stack so data moves on its own.",
    includes: [
      "CRM setup, cleanup, or rebuild",
      "Custom internal tools and dashboards",
      "Data model and pipeline design",
      "Two-way sync with your other systems",
      "Automated follow-ups and task creation",
      "Migration off spreadsheets",
    ],
    tools: [
      "HubSpot",
      "Salesforce",
      "Zoho",
      "Airtable",
      "Retool",
      "Supabase",
      "Notion",
      "Google Sheets",
    ],
    outcomes: [
      "One trusted place for customer data",
      "No duplicate data entry",
      "Clear pipeline visibility for the team",
      "Tools shaped around your process",
    ],
    ctaTitle: "Let's tidy up where your data lives",
    ctaText:
      "Show us how customer information moves today, and we'll map what a cleaner setup looks like.",
  },
  {
    slug: "branding-designing",
    icon: Palette,
    title: "Branding & Designing",
    short:
      "Brand identity and design systems that keep every touchpoint consistent and recognisable.",
    intro:
      "Brand identity and design systems that keep every touchpoint consistent and recognisable.",
    tagline: "Look as capable as you actually are",
    overview:
      "We shape how your business looks and reads — logo, colours, type, and the rules that keep it all consistent — then hand over organised files your team and developers can use without guessing.",
    includes: [
      "Logo and visual identity",
      "Colour, typography, and usage rules",
      "Pitch deck and sales collateral",
      "Social media and ad templates",
      "Design system for your website",
      "Editable source files",
    ],
    tools: ["Figma", "Adobe Illustrator", "Canva", "Framer", "Webflow"],
    outcomes: [
      "A consistent, professional appearance",
      "Marketing materials quick to produce",
      "Design your team can reuse safely",
      "A stronger first impression",
    ],
    ctaTitle: "Need a brand that holds together?",
    ctaText:
      "Send us what you have now and we'll tell you the few things that would make the biggest difference.",
  },
  {
    slug: "website-development",
    icon: Globe,
    title: "Website Development",
    short: "Fast, modern websites built to turn visitors into enquiries.",
    intro: "Fast, modern websites built to turn visitors into enquiries, not just look nice.",
    tagline: "A site that loads fast and asks for the sale",
    overview:
      "We design and build marketing sites that load quickly, read well on a phone, and guide visitors toward getting in touch — with clean structure, sensible copy layout, and analytics so you can see what's working.",
    includes: [
      "Responsive design and build",
      "Clear page and content structure",
      "Contact and enquiry forms",
      "Speed, SEO, and accessibility basics",
      "Analytics and conversion tracking",
      "Hosting setup and handover",
    ],
    tools: ["React", "Vite", "Next.js", "Webflow", "Framer", "Google Analytics"],
    outcomes: [
      "A site that feels fast on any device",
      "A clear path from visitor to enquiry",
      "Pages your team can update easily",
      "Data on what visitors actually do",
    ],
    ctaTitle: "Thinking about a new site?",
    ctaText:
      "Tell us the goal of the page and who it's for — we'll suggest the simplest build that gets there.",
  },
  {
    slug: "shopify-ecommerce",
    icon: ShoppingBag,
    title: "Shopify & Ecommerce Websites",
    short: "Shopify stores set up to sell smoothly and run without constant manual work.",
    intro:
      "Shopify stores set up to sell smoothly and run without constant manual work behind the scenes.",
    tagline: "A store that sells and runs itself",
    overview:
      "We build and fine-tune Shopify stores — theme setup, product structure, checkout flow, and the automations behind them — so orders, inventory, and customer data stay connected as you grow.",
    includes: [
      "Store setup and theme customisation",
      "Product and collection structure",
      "Checkout and upsell optimisation",
      "Order, inventory, and shipping automation",
      "Abandoned-cart and post-purchase flows",
      "Analytics on what actually sells",
    ],
    tools: [
      "Shopify",
      "Klaviyo",
      "Recharge",
      "ShipStation",
      "Gorgias",
      "Meta Ads",
      "Google Merchant Center",
    ],
    outcomes: [
      "A store that converts on mobile",
      "Fewer manual order and inventory tasks",
      "Follow-up flows that run themselves",
      "Clear numbers on what's profitable",
    ],
    ctaTitle: "Let's get your store running smoothly",
    ctaText:
      "Tell us what's slowing you down today — orders, inventory, or follow-ups — and we'll start there.",
  },
  {
    slug: "social-media",
    icon: Megaphone,
    title: "Social Media",
    short: "Social content and posting systems that stay consistent without daily scrambling.",
    intro: "Social content and posting systems that stay consistent without daily scrambling.",
    tagline: "A posting rhythm you can keep",
    overview:
      "We set up the content engine behind your channels: what to post, how it looks, and how it gets published — with AI helping draft and repurpose, and your team approving what goes out.",
    includes: [
      "Content pillars and monthly calendar",
      "Post designs and copy templates",
      "AI-assisted drafting and repurposing",
      "Scheduling and auto-publishing",
      "Comment and DM handling workflow",
      "Monthly performance reporting",
    ],
    tools: ["Meta Business Suite", "LinkedIn", "Instagram", "Buffer", "Later", "Canva", "Notion"],
    outcomes: [
      "A consistent posting rhythm",
      "Less time making each post",
      "Content reused across channels",
      "Reporting you can act on",
    ],
    ctaTitle: "Want posting that runs itself?",
    ctaText: "We'll set up a month of content and the system that keeps it going after that.",
  },
];
export function findService(slug) {
  return SERVICES.find((s) => s.slug === slug);
}
