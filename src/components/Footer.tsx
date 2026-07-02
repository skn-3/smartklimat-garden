import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 bg-skogsgron text-papper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight max-w-3xl">
          Tänk smart, vi har ett gemensamt klimat.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-papper/70">
            <Link to="/" className="hover:text-papper">Hem</Link>
            <Link to="/projekt" className="hover:text-papper">Projekt</Link>
            <Link to="/foretag" className="hover:text-papper">För företag</Link>
            <Link to="/smaarty" className="hover:text-papper">Smaarty</Link>
            <Link to="/om-oss" className="hover:text-papper">Om oss</Link>
            <Link to="/kalkylator" className="hover:text-papper">Kalkylator</Link>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-papper/60">
            © {new Date().getFullYear()} SmartKlimat
          </p>
        </div>
      </div>
    </footer>
  );
}
