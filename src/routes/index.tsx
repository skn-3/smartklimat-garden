import { createFileRoute, Link } from "@tanstack/react-router";
import { OpeningSequence } from "@/components/OpeningSequence";
import { PlantedCounter } from "@/components/PlantedCounter";
import { DoubleFrame } from "@/components/DoubleFrame";
import { FadeUp } from "@/components/FadeUp";
import { Eyebrow } from "@/components/Eyebrow";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

const cards = [
  {
    to: "/foretag" as const,
    eyebrow: "För företag",
    title: "Gör varje affär till skog",
    body: "Automatisk klimatkompensation kopplad till era intäkter.",
  },
  {
    to: "/smaarty" as const,
    eyebrow: "Smaarty",
    title: "För lag och skolor",
    body: "Samla in, plantera, följ tillväxten tillsammans.",
  },
  {
    to: "/projekt" as const,
    eyebrow: "Våra projekt",
    title: "Skogen vi bygger",
    body: "Certifierade planteringar med spårbarhet i varje träd.",
  },
];

function Home() {
  return (
    <>
      <OpeningSequence />

      <PlantedCounter />

      <section className="px-6 pb-24 md:pb-32">
        <div className="mx-auto w-full max-w-6xl">
          <FadeUp>
            <Eyebrow>Kort översikt</Eyebrow>
          </FadeUp>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {cards.map((c, i) => (
              <FadeUp key={c.to} delay={i * 80}>
                <Link to={c.to} className="group block">
                  <DoubleFrame innerClassName="min-h-[220px] flex flex-col justify-between gap-8 p-7">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smaragd-dark">
                        {c.eyebrow}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-skogsgron">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-sm text-skogsgron/70">{c.body}</p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-mintpapper text-skogsgron transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                    </span>
                  </DoubleFrame>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
