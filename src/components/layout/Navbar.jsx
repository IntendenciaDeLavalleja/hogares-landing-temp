import { useEffect, useState } from "react";
import { Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { NAV_LINKS, SITE } from "../../data/content";
import { useActiveSection } from "../../hooks/useActiveSection";
import Logo from "../ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((link) => link.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b-2 border-ink bg-paper/95 backdrop-blur-md"
            : "border-b-2 border-transparent bg-ochre"
        }`}
      >
        <div className="shell flex h-[4.4rem] items-center justify-between gap-6 lg:h-[4.9rem]">
          <Logo />

          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-8 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-ink/75 transition-colors hover:text-ink"
                data-active={active === link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.phoneHref}
              className="btn btn-sm hidden rounded-full border-2 border-ink bg-ink px-5 font-mono text-[0.64rem] font-medium uppercase tracking-[0.12em] text-paper shadow-hard-sm transition-all hover:-translate-y-0.5 hover:border-plum hover:bg-plum hover:shadow-hard sm:inline-flex lg:btn-md"
              aria-label={`Llamar al ${SITE.phone}, interno ${SITE.phoneExtension}`}
            >
              <Phone size={14} aria-hidden="true" />
              {SITE.phone}
            </a>

            <button
              type="button"
              className="btn btn-square btn-sm rounded-full border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper lg:hidden"
              aria-label="Abrir menú de navegación"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movil"
        className={`fixed inset-0 z-[60] flex flex-col bg-paper transition-all duration-400 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="shell flex h-[4.4rem] shrink-0 items-center justify-between border-b-2 border-ink">
          <Logo />
          <button
            type="button"
            className="btn btn-square btn-sm rounded-full border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-paper"
            aria-label="Cerrar menú de navegación"
            onClick={() => setOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label="Navegación móvil"
          className="shell flex flex-1 flex-col justify-center overflow-y-auto py-8"
        >
          <ul>
            {NAV_LINKS.map((link, index) => (
              <li key={link.href} className="border-b border-ink/15">
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="font-display text-[clamp(2rem,9vw,2.8rem)] font-black uppercase leading-none tracking-[-0.04em]">
                    {link.label}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.14em] text-ink/45">
                    0{index + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={SITE.phoneHref}
            className="btn btn-lg mt-8 w-full rounded-full border-2 border-ink bg-ink font-mono text-xs uppercase tracking-[0.12em] text-paper shadow-hard-sm hover:bg-plum"
          >
            <Phone size={16} aria-hidden="true" />
            Llamar a Servicios Sociales
          </a>

          <div className="mt-8 space-y-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-ink/65">
            <p className="flex items-center gap-2">
              <MapPin size={13} aria-hidden="true" />
              {SITE.addressDetail}
            </p>
            <p className="flex items-center gap-2">
              <Clock size={13} aria-hidden="true" />
              {SITE.hours}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
