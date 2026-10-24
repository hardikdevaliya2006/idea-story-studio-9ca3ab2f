
import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders its children only after hydration, so browser-only libraries never
 * run during server rendering.
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? <>{children}</> : <>{fallback}</>;
}
