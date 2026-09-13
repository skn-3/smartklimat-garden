import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

const PLACEHOLDER_CARD = {
  eyebrow: "DITT FÖRETAG HÄR",
  name: "Företag 1",
  description: "En rad om samarbetet.",
  image: "/foretag/stam-hero.jpg",
  imagePosition: "60% 28%",
  href: "#",
} as const;

const INSTAGRAM_CARD = {
  username: "babasburgers",
  location: "Stockholm",
  likes: "2 647 gilla-markeringar",
  comments: "Visa alla 153 kommentarer",
  caption: "Ett träd för varje såld burgare — tillsammans med SmartKlimat",
  // TODO: Johannes laddar upp den riktiga stillbilden som public/foretag/babas-still.jpg.
  image: "/foretag/stam-hero.jpg",
  href: "https://www.instagram.com/reel/BwZNUWsAiAu/",
} as const;

function AsteriskIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-label="Verifierat konto" className="h-3.5 w-3.5">
      <circle cx="8" cy="8" r="8" fill="#3897f0" />
      <path d="m4.5 8.1 2.1 2.1 4.8-4.8" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeartIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-[#ed4956] text-[#ed4956]"><path d="M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z" /></svg>;
}

function CommentIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6"><path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.6 9.6 0 0 1-3.8-.8L3 21l1.8-5.2A8.5 8.5 0 1 1 21 11.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}

function SendIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6"><path d="m22 2-9.8 20-2.4-8.2L2 10 22 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="m9.8 13.8 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function BookmarkIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6"><path d="M6 3h12v18l-6-4-6 4V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}

function ReelIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5 drop-shadow"><rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" /><path d="m8 4 3 5m3-5 3 5M3 9h18" stroke="currentColor" strokeWidth="1.7" /><path d="m10 12 5 3-5 3v-6Z" fill="currentColor" /></svg>;
}

function PlaceholderCard() {
  return (
    <a
      href={PLACEHOLDER_CARD.href}
      className="group block w-full rounded-3xl bg-papper/80 p-2.5 text-skogsgron shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-1 hover:shadow-[0_32px_84px_rgba(0,0,0,0.38)]"
    >
      <img
        src={PLACEHOLDER_CARD.image}
        alt="Mosstäckt stam mot mörk bakgrund"
        loading="lazy"
        className="h-[210px] w-full rounded-2xl object-cover"
        style={{ objectPosition: PLACEHOLDER_CARD.imagePosition }}
      />
      <div className="relative px-4 pb-4 pt-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-skogsgron/55">{PLACEHOLDER_CARD.eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl font-bold">{PLACEHOLDER_CARD.name}</h3>
        <p className="mt-1 pr-12 text-sm text-skogsgron/65">{PLACEHOLDER_CARD.description}</p>
        <span className="absolute bottom-2 right-2 grid h-10 w-10 place-items-center rounded-full bg-skogsgron text-guld transition-transform duration-500 [transition-timing-function:var(--ease-smart)] group-hover:rotate-45">
          <AsteriskIcon />
        </span>
      </div>
    </a>
  );
}

function InstagramCard() {
  return (
    <a
      href={INSTAGRAM_CARD.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Se inlägget på Instagram"
      className="block w-full overflow-hidden rounded-2xl bg-white text-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-1 hover:shadow-[0_32px_84px_rgba(0,0,0,0.38)]"
    >
      <div className="flex items-center gap-2.5 px-3.5 py-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#DCBE6E,#1E9E6A)] p-[1.5px]">
          <span className="grid h-full w-full place-items-center rounded-full bg-skogsgron font-display text-[9px] font-bold text-white">BB</span>
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="flex items-center gap-1 text-[13px] font-bold">{INSTAGRAM_CARD.username}<VerifiedIcon /></span>
          <span className="text-[11px] text-[#737373]">{INSTAGRAM_CARD.location}</span>
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden bg-skogsgron">
        <img src={INSTAGRAM_CARD.image} alt="Babas Burgers samarbete med SmartKlimat" loading="lazy" className="h-full w-full object-cover object-center" />
        <span className="absolute right-3 top-3 text-white"><ReelIcon /></span>
      </div>
      <div className="px-3.5 pb-4 pt-3">
        <div className="flex items-center gap-3"><HeartIcon /><CommentIcon /><SendIcon /><span className="ml-auto"><BookmarkIcon /></span></div>
        <p className="mt-3 text-sm font-bold">{INSTAGRAM_CARD.likes}</p>
        <p className="mt-1 text-[13px] leading-[1.35]"><strong>{INSTAGRAM_CARD.username}</strong>{" "}{INSTAGRAM_CARD.caption}</p>
        <p className="mt-2 text-[13px] text-[#8e8e8e]">{INSTAGRAM_CARD.comments}</p>
      </div>
    </a>
  );
}

export function ForetagHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight));
      image.style.transform = `scale(1.1) translate3d(0, ${progress * 30}px, 0)`;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] overflow-clip bg-skogsgron text-papper">
      <img
        ref={imageRef}
        src="/foretag/stam-hero.jpg"
        alt="Mosstäckt stam som svävar mot en mörk studiobakgrund"
        loading="lazy"
        className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_62%] will-change-transform"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,20,16,0.88)_0%,rgba(12,20,16,0.72)_42%,rgba(12,20,16,0)_72%)] md:bg-[linear-gradient(90deg,rgba(12,20,16,0.62)_0%,rgba(12,20,16,0.62)_28%,rgba(12,20,16,0)_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0f0c_0%,rgba(10,15,12,0)_12%,rgba(10,15,12,0)_90%,#0a0f0c_100%)]" />

      <div className="relative mx-auto flex min-h-[100dvh] max-w-6xl flex-col px-6 py-20 md:justify-center md:py-28">
        <div className="max-w-xl md:w-[45%]">
          <span className="inline-flex items-center rounded-full border border-guld/50 bg-skogsgron/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-guld backdrop-blur-sm">För företag</span>
          <h2 className="mt-7 font-display text-5xl font-light leading-[1.02] tracking-normal text-papper sm:text-6xl md:text-[64px]">
            Låt varje affär<br />slå rot<span className="text-guld">.</span>
          </h2>
          <Link
            to="/kontakt"
            className="mt-8 inline-flex items-center gap-3 rounded-full border-[1.4px] border-salvia/60 bg-white/10 py-2 pl-2 pr-5 text-sm font-medium text-papper backdrop-blur-sm transition-transform duration-500 [transition-timing-function:var(--ease-smart)] hover:-translate-y-0.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-smaragd/70 text-papper"><AsteriskIcon className="h-4 w-4" /></span>
            Bli partner
          </Link>
        </div>

        <div className="mt-14 flex flex-col gap-6 md:absolute md:inset-y-0 md:right-6 md:mt-0 md:w-[43%]">
          <div className="order-1 w-full md:absolute md:bottom-[7%] md:left-0 md:w-[66%]"><InstagramCard /></div>
          <div className="order-2 w-full md:absolute md:right-0 md:top-[9%] md:w-[62%]"><PlaceholderCard /></div>
        </div>
      </div>
    </section>
  );
}