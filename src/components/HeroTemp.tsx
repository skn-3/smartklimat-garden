import { Eyebrow } from "./Eyebrow";
import { CtaButton } from "./CtaButton";
import { FadeUp } from "./FadeUp";

/**
 * TILLFÄLLIG hero. Ersätts senare av en scroll-sekvens som levereras via GitHub.
 * Håll komponenten fristående och lätt att byta ut — importera inget som
 * hem-sidan behöver direkt, och exportera inga hjälpare härifrån.
 */
export function HeroTemp() {
  return (
    <section className="relative isolate min-h-[100dvh] flex items-center pt-36 pb-24 px-6">
      <div className="mx-auto w-full max-w-5xl">
        <FadeUp>
          <Eyebrow>Tech möter klimat</Eyebrow>
        </FadeUp>

        <FadeUp delay={80}>
          <h1 className="mt-6 font-display font-bold leading-[0.95] tracking-tight text-skogsgron text-[clamp(3rem,12vw,7.5rem)]">
            Tänk smart.
            <br />
            <span className="text-smaragd">Vi har ett gemensamt klimat.</span>
          </h1>
        </FadeUp>

        <FadeUp delay={160}>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-skogsgron/75">
            Klimatkompensation, byggd som teknik.
          </p>
        </FadeUp>

        <FadeUp delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <CtaButton to="/kalkylator">Plantera träd</CtaButton>
            <CtaButton to="/projekt" variant="secondary">Våra projekt</CtaButton>
          </div>
        </FadeUp>

        <FadeUp delay={320}>
          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/70 ring-1 ring-linje px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-smaragd opacity-60 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-smaragd" />
            </span>
            <span className="font-mono text-xs tracking-wider text-skogsgron">
              27 393 träd planterade · live
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
