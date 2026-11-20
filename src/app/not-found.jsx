import Link from "next/link";
export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="page-container flex min-h-screen max-w-3xl flex-col items-center justify-center py-32 text-center"
    >
      <p className="font-display text-7xl font-semibold text-primary">404</p>
      <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        This page has sailed off
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
        The page you're looking for doesn't exist or has moved. Try the services page, or head back
        to the homepage.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Go home
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition hover:bg-foreground hover:text-background"
        >
          Browse services
        </Link>
      </div>
    </main>
  );
}
