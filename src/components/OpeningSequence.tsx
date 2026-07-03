import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eyebrow } from "./Eyebrow";
import { CtaButton } from "./CtaButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Öppningssekvensen v5. Nytt mot v3: text-beatsen graderas filmiskt (kantlös
 * gradient över textzonen + mjuk textskugga) istället för frostad platta.
 * Hero-looparna är Johannes egna tagningar, positionslåsta och sömlöst loopade
 * i efterbearbetning. Fixar mot v1:
 * - var(--p, 0) överallt + inline-default => inget textkaos före hydrering
 * - pinnhöjd via responsiva klasser (mobil 380vh, desktop 560vh) => rätt scrubbsträcka
 * - scrub: 0.7 => mjuk eftersläpning, inget teleport-känsla med mushjul
 * - 96 frames à 640px på mobil => inom iOS Safaris minnesbudget (Lodra-lärdomen)
 * - trapets-branten räknas per beat => full opacity med platå
 * - filmen scrubbas till 97 % och payoff-texten stannar in i släppet => ingen död svans
 */

const FILM = {
  desktopSrc: "/opening/film.mp4",
  frame: (i: number) => `/opening/frames/f-${String(i).padStart(4, "0")}.webp`,
  frameCount: 96,
};

const FILM_START = 0.1;
const FILM_END = 0.97;

// [in-start, ut-slut] i scroll-progress. Sista beatens b > 1 => tonar aldrig ut.
const BEATS = [
  { a: 0.26, b: 0.44, dark: true,  h: "Ett frö.",              sub: "En affär signeras. Ett träd planteras." },
  { a: 0.46, b: 0.62, dark: false, h: "Ett träd.",             sub: "Binder ungefär 20 kg koldioxid. Varje år." },
  { a: 0.64, b: 0.78, dark: false, h: "En skog.",              sub: "Från rader i ett system till rötter i marken." },
  { a: 0.82, b: 1.2,  dark: false, h: "Ett gemensamt klimat.", sub: "Vi bygger bryggan mellan affärer och skog.", tag: "Zambia · Brasilien · Indien" },
] as const;

function beatStyle(a: number, b: number): React.CSSProperties {
  const k = (4 / (b - a)).toFixed(3); // ramp = 25 % av fönstret, platå på 1
  return {
    opacity: `min(calc((var(--p, 0) - ${a}) * ${k}), calc((${b} - var(--p, 0)) * ${k}), 1)` as unknown as number,
    willChange: "opacity",
  };
}

export function OpeningSequence() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduced) return; // stillbilds-läge: hero + poster räcker

    let cleanupFrames: (() => void) | undefined;
    let applyProgress: (p: number) => void = () => {};

    if (isDesktop) {
      const video = videoRef.current;
      if (!video) return;
      video.preload = "auto";
      video.load();
      let target = 0;
      let raf = 0;
      const tick = () => {
        const d = video.duration;
        if (d && Number.isFinite(d)) {
          const t = target * d;
          if (Math.abs(video.currentTime - t) > 0.001) video.currentTime = t;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      cleanupFrames = () => cancelAnimationFrame(raf);
      applyProgress = (p) => {
        target = gsap.utils.clamp(0, 1, (p - FILM_START) / (FILM_END - FILM_START));
      };
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = () => {
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
      };
      size();
      const imgs: (HTMLImageElement | undefined)[] = new Array(FILM.frameCount);
      const loaded = new Set<number>();
      let current = -1;
      let pending = -1;
      const draw = (idx: number) => {
        let j = idx;
        while (j > 0 && !loaded.has(j)) j--;
        if (!loaded.has(j)) { pending = idx; return; }
        const im = imgs[j];
        if (!im || j === current) return;
        current = j;
        const cw = canvas.width, ch = canvas.height;
        const s = Math.max(cw / im.width, ch / im.height); // cover
        const w = im.width * s, h = im.height * s;
        ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
      };
      const load = (i: number, retried = false) => {
        const im = new Image();
        im.decoding = "async";
        im.src = FILM.frame(i + 1);
        im.onload = () => {
          loaded.add(i);
          if (pending >= 0) { const p2 = pending; pending = -1; draw(p2); }
          else if (i > current && current >= 0 && i <= current + 2) draw(i);
        };
        im.onerror = () => { if (!retried) setTimeout(() => load(i, true), 400); };
        imgs[i] = im;
      };
      for (let i = 0; i < 24 && i < FILM.frameCount; i++) load(i);
      let next = 24;
      let idle = 0;
      const trickle = () => {
        for (let n = 0; n < 6 && next < FILM.frameCount; n++, next++) load(next);
        if (next < FILM.frameCount) idle = window.setTimeout(trickle, 100);
      };
      idle = window.setTimeout(trickle, 250);
      const onResize = () => { size(); current = -1; draw(pending >= 0 ? pending : 0); };
      window.addEventListener("resize", onResize);
      cleanupFrames = () => { clearTimeout(idle); window.removeEventListener("resize", onResize); };
      applyProgress = (p) => {
        const f = gsap.utils.clamp(0, 1, (p - FILM_START) / (FILM_END - FILM_START));
        draw(Math.round(f * (FILM.frameCount - 1)));
      };
    }

    const st = ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      onUpdate: (self) => {
        const p = self.progress;
        root.style.setProperty("--p", p.toFixed(4));
        if (heroRef.current) heroRef.current.dataset.faded = p > 0.13 ? "true" : "false";
        applyProgress(p);
      },
    });

    return () => { st.kill(); cleanupFrames?.(); };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative h-[380vh] md:h-[560vh]"
      style={{ ["--p" as string]: 0 }}
    >
      <style>{`[data-opening-hero][data-faded="true"] { pointer-events: none; }`}</style>

      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-mintpapper">
        {/* FILMLAGER */}
        <video
          ref={videoRef}
          src={FILM.desktopSrc}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full md:hidden" />

        {/* HEROLAGER: glob-loop + rubrik, tonar ut i dyket */}
        <div
          ref={heroRef}
          data-opening-hero
          data-faded="false"
          className="absolute inset-0"
          style={{ opacity: `min(1, calc((0.13 - var(--p, 0)) * 12))` as unknown as number, willChange: "opacity" }}
        >
          <video
            src="/opening/loop.mp4"
            poster="/opening/loop-poster.jpg"
            autoPlay muted loop playsInline
            className="absolute inset-0 hidden h-full w-full object-cover md:block"
          />
          <video
            src="/opening/loop-m.mp4"
            poster="/opening/loop-m-poster.jpg"
            autoPlay muted loop playsInline
            className="absolute inset-0 h-full w-full object-cover md:hidden"
          />
          <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-mintpapper via-mintpapper/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-mintpapper/60 to-transparent" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-start px-6 pt-28 text-center md:pt-36">
            <Eyebrow>Tech möter klimat</Eyebrow>
            <h1 className="mt-6 font-display font-bold leading-[0.95] tracking-tight text-skogsgron text-[clamp(3rem,12vw,7.5rem)]">
              Tänk smart.
            </h1>
            <p className="mt-3 font-display font-bold text-smaragd text-[clamp(1.4rem,4.5vw,2.6rem)]">
              Vi har ett gemensamt klimat.
            </p>
            <p className="mt-5 max-w-md text-base text-skogsgron/75 md:text-lg">
              Klimatkompensation, byggd som teknik.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <CtaButton to="/kalkylator" variant="primary">Plantera träd</CtaButton>
              <CtaButton to="/projekt" variant="secondary">Våra projekt</CtaButton>
            </div>
            {/* TODO: hämta talet från publika stats-endpointen (SUM över betalda köp) när den finns */}
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-smaragd-dark">
              27 393 träd planterade · live
            </p>
          </div>
        </div>

        {/* TEXT-BEATS */}
        {BEATS.map((b) => (
          <div
            key={b.h}
            className="pointer-events-none absolute inset-0 z-20"
            style={beatStyle(b.a, b.b)}
          >
            <div
              className={`absolute inset-x-0 top-0 h-[52%] bg-gradient-to-b to-transparent ${
                b.dark ? "from-skogsgron/70 via-skogsgron/35" : "from-mintpapper/80 via-mintpapper/40"
              }`}
            />
            <div className="absolute inset-x-0 top-[19%] px-6 text-center">
              <h2
                className={`font-display font-bold tracking-tight text-[clamp(2.4rem,9vw,5.5rem)] ${
                  b.dark
                    ? "text-papper [text-shadow:0_2px_26px_rgba(7,40,30,0.85)]"
                    : "text-skogsgron [text-shadow:0_2px_26px_rgba(234,247,238,0.95)]"
                }`}
              >
                {b.h}
              </h2>
              <p className={`mx-auto mt-3 max-w-md text-base md:text-lg ${b.dark ? "text-mint" : "text-skogsgron/85 [text-shadow:0_1px_18px_rgba(234,247,238,0.9)]"}`}>
                {b.sub}
              </p>
              {"tag" in b && b.tag ? (
                <p className={`mt-4 font-mono text-[11px] uppercase tracking-[0.2em] ${b.dark ? "text-mint/80" : "text-smaragd-dark"}`}>
                  {b.tag}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
