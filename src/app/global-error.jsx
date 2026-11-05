"use client";
export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#0b0f0d",
          color: "#f3f7f4",
          padding: "1.5rem",
        }}
      >
        <div style={{ maxWidth: "28rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.5rem" }}>This page didn't load</h1>
          <p style={{ color: "#9aa8a0", margin: "0 0 1.5rem" }}>
            Something went wrong on our end. Try again or reload the page.
          </p>
          <div
            style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              onClick={reset}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "1px solid transparent",
                background: "#47c86e",
                color: "#0b140f",
                font: "inherit",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                border: "1px solid #2c4a37",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
          {error.digest ? (
            <p style={{ marginTop: "1.5rem", fontSize: "12px", color: "#6f7c74" }}>
              Error code: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
