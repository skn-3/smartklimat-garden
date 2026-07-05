import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 bg-skogsgron text-papper">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <img src="/brand/logo-stamp-vit.png" alt="SmartKlimat" className="h-16 w-16 md:h-20 md:w-20" />

        <p className="mt-8 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          Tänk smart, vi har ett gemensamt klimat.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">Sidor</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-papper/70">
              <Link to="/" className="hover:text-papper">Hem</Link>
              <Link to="/projekt" className="hover:text-papper">Projekt</Link>
              <Link to="/foretag" className="hover:text-papper">För företag</Link>
              <Link to="/smaarty" className="hover:text-papper">Smaarty</Link>
              <Link to="/om-oss" className="hover:text-papper">Om oss</Link>
              <Link to="/kalkylator" className="hover:text-papper">Kalkylator</Link>
              <Link to="/kontakt" className="hover:text-papper">Kontakt</Link>
            </nav>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">Kontakt</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm">
              <a href="mailto:kontakt@smartklimat.org" className="text-papper/70 hover:text-papper">
                kontakt@smartklimat.org
              </a>
              <p className="text-papper/50">Stockholm, Sverige</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">Planterat med</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-papper/70">
              <p>WeForest</p>
              <p>Granskat av Preferred by Nature</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-papper/15 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-papper/60">
            © {new Date().getFullYear()} SmartKlimat
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-papper/40">
            Tech möter klimat
          </p>
        </div>
      </div>
    </footer>
  );
}
