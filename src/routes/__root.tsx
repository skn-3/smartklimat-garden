import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-smaragd-dark">404</p>
        <h1 className="mt-4 font-display text-5xl font-bold text-skogsgron">Sidan finns inte</h1>
        <p className="mt-4 text-sm text-skogsgron/70">
          Sidan du letar efter har flyttats eller aldrig funnits.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-skogsgron px-5 py-2.5 text-sm font-medium text-papper"
          >
            Till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-bold text-skogsgron">Något gick fel</h1>
        <p className="mt-3 text-sm text-skogsgron/70">Försök igen eller gå tillbaka till start.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center rounded-full bg-skogsgron px-5 py-2.5 text-sm font-medium text-papper"
          >
            Försök igen
          </button>
          <a
            href="/"
            className="inline-flex items-center rounded-full border border-linje bg-white px-5 py-2.5 text-sm font-medium text-skogsgron"
          >
            Till start
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SmartKlimat — Tänk smart, vi har ett gemensamt klimat" },
      {
        name: "description",
        content:
          "Klimatkompensation, byggd som teknik. Varje affär hos våra partners planterar träd.",
      },
      { property: "og:site_name", content: "SmartKlimat" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "SmartKlimat — Tänk smart, vi har ett gemensamt klimat" },
      {
        property: "og:description",
        content: "Klimatkompensation, byggd som teknik.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      // Google Fonts — laddas via <link>, aldrig @import (bryter Lightning CSS-bygget).
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Familjen+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* overflow-x: clip (INTE hidden) — sticky/pin-sektioner kräver clip. */}
      <div className="min-h-[100dvh] flex flex-col bg-papper text-skogsgron [overflow-x:clip]">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
