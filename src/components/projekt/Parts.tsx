import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { DoubleFrame } from "@/components/DoubleFrame";
import { FadeUp } from "@/components/FadeUp";
import { Eyebrow } from "@/components/Eyebrow";
import { CtaButton } from "@/components/CtaButton";

// Statband — hairline ovan/under, 3–4 stora mono-tal med etiketter.
export function StatBand({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <section className="px-6">
      <div className="mx-auto w-full max-w-6xl border-y border-linje py-10 md:py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {items.map((it, i) => (
            <FadeUp key={i} delay={i * 60}>
              <div>
                <div className="font-mono text-3xl md:text-4xl font-semibold tracking-tight text-skogsgron">
                  {it.value}
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                  {it.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// Berättelsekort — sandfärgad panel med eyebrow.
export function StoryCard({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <FadeUp>
          <div className="rounded-[2rem] bg-sand px-7 py-10 md:px-14 md:py-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-skogsgron/70">
              {eyebrow}
            </p>
            <h3 className="mt-5 font-display text-2xl md:text-4xl font-bold leading-[1.15] tracking-tight text-skogsgron max-w-3xl">
              {title}
            </h3>
            <p className="mt-6 text-base md:text-lg text-skogsgron/80 max-w-3xl">{body}</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// Artchips — vita pills med hairline.
export function ArtChips({ items }: { items: string[] }) {
  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-5xl">
        <FadeUp>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
            Arter i återväxten
          </p>
        </FadeUp>
        <FadeUp delay={80}>
          <ul className="mt-6 flex flex-wrap gap-2">
            {items.map((s) => (
              <li
                key={s}
                className="rounded-full bg-white ring-1 ring-linje px-4 py-2 font-mono text-xs text-skogsgron/85"
              >
                {s}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}

// Fotomosaik — tre bilder, rundade 24px.
export function PhotoMosaic({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="mx-auto w-full max-w-6xl grid gap-4 md:grid-cols-3">
        {images.map((img, i) => (
          <FadeUp key={img.src} delay={i * 80}>
            <div className="overflow-hidden rounded-[24px] ring-1 ring-linje">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-64 md:h-80 w-full object-cover"
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// Text i två kolumner.
export function TwoColumnText({
  columns,
}: {
  columns: { eyebrow: string; body: string }[];
}) {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl grid gap-12 md:grid-cols-2 md:gap-16">
        {columns.map((c, i) => (
          <FadeUp key={i} delay={i * 100}>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                {c.eyebrow}
              </p>
              <p className="mt-5 text-base md:text-lg text-skogsgron/80 leading-relaxed">
                {c.body}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// Hero för undersida.
export function ProjectHero({
  image,
  eyebrow,
  title,
  kicker,
}: {
  image: string;
  eyebrow: string;
  title: string;
  kicker: string;
}) {
  return (
    <section className="px-4 pt-32 md:pt-36">
      <div className="mx-auto w-full max-w-6xl">
        <FadeUp>
          <div className="relative overflow-hidden rounded-[28px] ring-1 ring-linje">
            <img
              src={image}
              alt=""
              className="h-[70vh] min-h-[440px] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-skogsgron/85 via-skogsgron/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 font-mono uppercase tracking-[0.2em] text-[10px] text-papper backdrop-blur-md">
                    {eyebrow}
                  </span>
                  <h1 className="mt-5 font-display font-bold leading-[0.95] tracking-tight text-papper text-[clamp(2.75rem,10vw,6rem)]">
                    {title}
                  </h1>
                </div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-papper/80 md:pb-4">
                  {kicker}
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// Avslutande "Ditt träd här"-band — double-bezel.
export function DittTradHar() {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="mx-auto w-full max-w-6xl">
        <FadeUp>
          <DoubleFrame innerClassName="px-6 py-12 md:px-14 md:py-20">
            <div className="grid gap-10 md:grid-cols-[1.3fr_1fr] md:items-end">
              <div>
                <Eyebrow>Ditt träd här</Eyebrow>
                <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight text-skogsgron">
                  Ett träd i något av projekten,
                  <br className="hidden md:block" /> med ditt namn på.
                </h2>
                <p className="mt-6 max-w-xl text-base md:text-lg text-skogsgron/75">
                  Räkna på ditt avtryck eller lägg planteringen i händerna på
                  människorna som redan är där.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <CtaButton to="/kalkylator">Plantera träd</CtaButton>
                <CtaButton to="/projekt" variant="secondary">
                  Alla projekt
                </CtaButton>
              </div>
            </div>
          </DoubleFrame>
        </FadeUp>
      </div>
    </section>
  );
}

// Översiktens projektkort — foto vänster, innehåll höger.
export function ProjectCard({
  to,
  image,
  eyebrow,
  title,
  body,
  stats,
}: {
  to: "/projekt/khasi-hills" | "/projekt/copperbelt" | "/projekt/pontal";
  image: string;
  eyebrow: string;
  title: string;
  body: string;
  stats: [string, string];
}) {
  return (
    <FadeUp>
      <Link
        to={to}
        className={cn(
          "group block rounded-[28px] bg-white ring-1 ring-linje overflow-hidden",
          "transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5",
        )}
      >
        <div className="grid md:grid-cols-[45%_1fr]">
          <div className="relative overflow-hidden md:min-h-[420px]">
            <img
              src={image}
              alt=""
              loading="lazy"
              className="h-64 md:h-full w-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-smart)] group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-7 md:p-10 flex flex-col justify-between gap-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                {eyebrow}
              </p>
              <h3 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight text-skogsgron">
                {title}
              </h3>
              <p className="mt-5 text-base text-skogsgron/75 max-w-md">{body}</p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-linje pt-6">
              {stats.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[11px] uppercase tracking-[0.18em] text-skogsgron"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </FadeUp>
  );
}
