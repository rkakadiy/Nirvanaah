import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FloatingNode = {
  className: string;
  style: CSSProperties;
  children: ReactNode;
};

function FloatingNode({ className, style, children }: FloatingNode) {
  return (
    <div
      className={cn("absolute animate-float will-change-transform", className)}
      style={style}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="hero-tilt relative isolate h-[32rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,248,240,0.96),rgba(255,241,226,0.84))] shadow-[0_30px_100px_rgba(58,36,24,0.18)] md:h-[42rem]">
      <div
        className="absolute inset-0 liquid-gradient opacity-90 mix-blend-soft-light animate-shimmer"
        data-liquid
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.75),transparent_28%),radial-gradient(circle_at_30%_20%,rgba(246,183,60,0.18),transparent_20%),radial-gradient(circle_at_75%_70%,rgba(244,209,209,0.18),transparent_24%)]" />

      <FloatingNode className="left-[8%] top-[18%]" style={{ animationDelay: "-2s" }}>
        <div className="relative h-28 w-20 rotate-[-12deg]">
          <div className="absolute inset-x-5 bottom-0 h-24 rounded-t-[1.4rem] rounded-b-[1.8rem] bg-[linear-gradient(180deg,#fff3e0,#f6b73c)] shadow-lg shadow-black/10" />
          <div className="absolute inset-x-[34%] bottom-2 h-14 rounded-t-full bg-[linear-gradient(180deg,#f4d1d1,#fff)] opacity-90" />
          <div className="absolute left-1/2 top-0 h-9 w-9 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#fff7ed,#f4d1d1)] shadow-inner" />
        </div>
      </FloatingNode>

      <FloatingNode className="right-[9%] top-[14%]" style={{ animationDelay: "-5s" }}>
        <div className="grid h-28 w-28 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.9),rgba(246,183,60,0.7))] shadow-2xl shadow-black/10">
          <div className="h-20 w-20 rounded-full border border-white/60 bg-[radial-gradient(circle_at_32%_30%,rgba(255,255,255,0.8),rgba(184,216,168,0.9))]" />
        </div>
      </FloatingNode>

      <FloatingNode className="left-[12%] bottom-[14%]" style={{ animationDelay: "-4s" }}>
        <div className="rounded-[2rem] border border-white/40 bg-[rgba(255,255,255,0.62)] px-5 py-4 shadow-xl backdrop-blur-md">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-black/45">Flavor of the month</p>
          <p className="mt-2 font-display text-2xl text-[var(--chocolate)]">Mango Pomegranate</p>
          <p className="mt-1 max-w-[12rem] text-sm leading-6 text-black/60">Bright, silky and perfectly aligned with the brand&apos;s fruit-led storytelling.</p>
        </div>
      </FloatingNode>

      <FloatingNode className="right-[13%] bottom-[10%]" style={{ animationDelay: "-3s" }}>
        <div className="flex items-center gap-3 rounded-[2rem] border border-white/40 bg-[rgba(58,36,24,0.8)] px-5 py-4 text-[var(--cream)] shadow-2xl backdrop-blur-md">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(246,183,60,0.18)]">
            <span className="h-6 w-6 rounded-full bg-[linear-gradient(180deg,#fff7ed,#f4d1d1)]" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/55">Signature</p>
            <p className="font-display text-xl">Falooda Kulfi</p>
          </div>
        </div>
      </FloatingNode>

      <FloatingNode className="left-[50%] top-[11%]" style={{ animationDelay: "-6s" }}>
        <div className="flex h-20 w-52 -translate-x-1/2 items-center justify-center gap-3 rounded-full border border-white/40 bg-[rgba(255,255,255,0.72)] px-5 shadow-lg backdrop-blur-md">
          <span className="h-3 w-20 rounded-full bg-[rgba(246,183,60,0.75)]" />
          <span className="h-3 w-3 rounded-full bg-[rgba(184,216,168,0.95)]" />
          <span className="h-3 w-16 rounded-full bg-[rgba(244,209,209,0.85)]" />
        </div>
      </FloatingNode>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,248,240,0.92))] dark:bg-[linear-gradient(180deg,transparent,rgba(18,18,18,0.96))]" />
    </div>
  );
}
