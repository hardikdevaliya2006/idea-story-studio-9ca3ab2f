"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-32 text-center"
    >
      <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
        This page didn't load
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground md:text-base">
        Something went wrong on our end. Try again, or head back home.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-medium transition hover:bg-foreground hover:text-background"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
