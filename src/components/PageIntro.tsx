import { Eyebrow } from "./Eyebrow";
import { FadeUp } from "./FadeUp";

export function PageIntro({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6">
      <div className="mx-auto w-full max-w-4xl">
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
