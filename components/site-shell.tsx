"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MoonStar, Phone, SunMedium, X, Sparkles, ArrowUpRight, MapPin, Mail } from "lucide-react";
import Lenis from "lenis";
import { animate } from "motion";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { brand, contactCopy, navigation } from "@/data/site";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/magnetic-button";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLead, setShowLead] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = window.localStorage.getItem("nirvanaah-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolved = stored === "dark" || (!stored && prefersDark) ? "dark" : "light";
    setTheme(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");

    const timer = window.setTimeout(() => setShowLead(true), 38000);
    const onLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) setShowLead(true);
    };

    window.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);

    const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    reveals.forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 28, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%"
          }
        }
      );
    });

    document.querySelectorAll<HTMLElement>("[data-liquid]").forEach((element) => {
      animate(
        element as any,
        { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] } as any,
        { duration: 12, repeat: Infinity, easing: "ease-in-out" } as any
      );
    });

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("nirvanaah-theme", theme);
  }, [mounted, theme]);

  const activeHref = useMemo(() => pathname?.replace(/\/$/, "") || "/", [pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="shell-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_50%_0%,rgba(246,183,60,0.22),transparent_34%),radial-gradient(circle_at_20%_20%,rgba(244,209,209,0.16),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(184,216,168,0.12),transparent_22%)]" />

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color:var(--surface-strong)]/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--chocolate)] text-[var(--cream)] shadow-lg shadow-black/10">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-xl leading-none text-[var(--chocolate)] dark:text-[var(--ink)]">
                {brand.name}
              </div>
              <div className="text-xs uppercase tracking-[0.28em] text-black/45 dark:text-white/50">
                {brand.shortTagline}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-1.5 lg:flex">
            {navigation.map((item) => {
              const isActive = item.href === "/"
                ? activeHref === "/"
                : activeHref.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition focus-ring",
                    isActive
                      ? "bg-[var(--chocolate)] text-[var(--cream)]"
                      : "text-black/70 hover:bg-black/5 dark:text-white/72 dark:hover:bg-white/8"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition hover:scale-[1.03]"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            </button>

            <MagneticButton
              href="/order-online"
              variant="secondary"
              className="hidden sm:inline-flex"
            >
              Order Online
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>

            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] transition hover:scale-[1.03] lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[var(--border)] bg-[var(--surface-strong)] lg:hidden"
            >
              <div className="mx-auto grid max-w-7xl gap-2 px-4 py-4 sm:px-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--ink)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface-strong)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
          <div className="space-y-5">
            <div className="font-display text-3xl text-[var(--chocolate)] dark:text-[var(--ink)]">
              {brand.name}
            </div>
            <p className="max-w-xl text-sm leading-7 text-black/70 dark:text-white/68">
              Authentic Indian desserts, crafted as a warm, premium Bay Area destination for celebration, sampling, gifting and everyday bliss.
            </p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton href="tel:+14087811743" variant="secondary">
                <Phone className="h-4 w-4" />
                Call
              </MagneticButton>
              <MagneticButton href={`mailto:${contactCopy.email}`} variant="secondary">
                <Mail className="h-4 w-4" />
                Email
              </MagneticButton>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-black/50 dark:text-white/45">
              Quick Links
            </h3>
            <div className="grid gap-2 text-sm">
              {navigation.slice(0, 8).map((item) => (
                <Link key={item.href} href={item.href} className="text-black/72 transition hover:text-[var(--chocolate)] dark:text-white/70">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-black/50 dark:text-white/45">
              Visit
            </h3>
            <div className="space-y-3 text-sm leading-6 text-black/72 dark:text-white/72">
              <p className="flex gap-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--saffron)]" />
                <span>{contactCopy.sunnyvaleAddress}</span>
              </p>
              <p className="flex gap-2">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-[var(--saffron)]" />
                <span>{contactCopy.primaryPhone} · {contactCopy.email}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <span>Copyright 2010. Nirvanaah.</span>
            <span>Authentic Indian flavors · 100% vegetarian · no eggs · all natural ingredients · real fruits and nuts</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showLead ? (
          <motion.div
            className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
          >
            <div className="glass premium-border rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.26em] text-black/45 dark:text-white/45">
                Special offer
              </p>
              <h3 className="mt-2 font-display text-2xl text-[var(--chocolate)] dark:text-[var(--ink)]">
                Join the Birthday Club.
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/70 dark:text-white/70">
                Receive special offers on your special day and turn the next celebration into a signature Nirvanaah moment.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <MagneticButton href="/birthday-club" onClick={() => setShowLead(false)}>
                  Reserve rewards
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => setShowLead(false)}
                  className="text-sm font-medium text-black/55 underline-offset-4 hover:underline dark:text-white/55"
                >
                  Not now
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {mounted ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--surface-strong)]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center gap-2">
            <MagneticButton href="/order-online" className="flex-1">
              Order now
            </MagneticButton>
            <MagneticButton href="tel:+14087811743" variant="secondary" className="flex-1">
              <Phone className="h-4 w-4" />
              Call store
            </MagneticButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}
