import { Eyebrow } from "./Eyebrow";
import { FadeUp } from "./FadeUp";
import { Bakgrundsliv, type LivPreset } from "./liv/Bakgrundsliv";

export function PageIntro({
  eyebrow,
  title,
  lead,
  liv,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  liv?: LivPreset;
}) {
  return (
    <section className={liv ? "relative isolate overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32 px-6" : "pt-40 pb-24 md:pt-48 md:pb-32 px-6"}>
      {liv ? <Bakgrundsliv preset={liv} /> : null}
      <div className="relative mx-auto w-full max-w-4xl">
        <FadeUp>
          <Eyebrow>{eyebrow}</Eyebrow>
        </FadeUp>
        <FadeUp delay={80}>
          <h1 className="mt-6 font-display font-bold leading-[1] tracking-tight text-skogsgron text-[clamp(2.5rem,9vw,5.5rem)]">
            {title}
          </h1>
        </FadeUp>
        <FadeUp delay={160}>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-skogsgron/75">{lead}</p>
        </FadeUp>
      </div>
    </section>
  );
}
