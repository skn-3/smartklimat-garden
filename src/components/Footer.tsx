import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 bg-skogsgron text-papper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="font-display text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight max-w-3xl">
          Tänk smart, vi har ett gemensamt klimat.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">SIDOR</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm text-papper/70">
              <Link to="/" className="hover:text-papper">Hem</Link>
              <Link to="/projekt" className="hover:text-papper">Projekt</Link>
              <Link to="/foretag" className="hover:text-papper">För företag</Link>
              <Link to="/smaarty" className="hover:text-papper">Smaarty</Link>
              <Link to="/om-oss" className="hover:text-papper">Om oss</Link>
              <Link to="/kalkylator" className="hover:text-papper">Kalkylator</Link>
            </nav>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">KONTAKT</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a href="mailto:kontakt@smartklimat.org" className="text-papper/70 hover:text-papper">kontakt@smartklimat.org</a>
              <p className="text-papper/50">Stockholm, Sverige</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">PLANTERAT MED</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-papper/70">
              <p>WeForest</p>
              <p>Granskat av Preferred by Nature</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-papper/15" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-papper/60">
            © {new Date().getFullYear()} SmartKlimat
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">Tech möter klimat</p>
        </div>
      </div>
    </footer>
  );
}
