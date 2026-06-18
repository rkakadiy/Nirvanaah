import { MagneticButton } from "@/components/magnetic-button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-4 py-24 text-center">
      <div className="glass premium-border mx-auto w-full rounded-[2rem] p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-black/45 dark:text-white/45">404</p>
        <h1 className="mt-4 font-display text-5xl text-[var(--chocolate)] dark:text-[var(--ink)]">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-black/68 dark:text-white/68">
          The dessert trail ended early. Let’s get you back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <MagneticButton href="/">Back home</MagneticButton>
          <MagneticButton href="/menu" variant="secondary">
            View menu
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
