import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FloatingCardProps = {
  className: string;
  style?: CSSProperties;
  children: ReactNode;
};

function FloatingCard({ className, style, children }: FloatingCardProps) {
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

function ImageCard({
  src,
  title,
  subtitle,
  className,
  imageClassName = "object-cover"
}: {
  src: string;
  title: string;
  subtitle: string;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("glass relative overflow-hidden rounded-[2rem] border border-white/30 shadow-2xl", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.22),transparent_32%),radial-gradient(circle_at_70%_70%,rgba(246,183,60,0.12),transparent_32%)]" />
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={src} alt="" fill className={imageClassName} priority />
      </div>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/30 bg-[linear-gradient(180deg,rgba(255,248,240,0.22),rgba(255,248,240,0.78))] px-4 py-3 backdrop-blur-md">
        <p className="text-[0.65rem] uppercase tracking-[0.24em] text-black/45">{subtitle}</p>
        <p className="mt-1 font-display text-2xl text-[var(--chocolate)]">{title}</p>
      </div>
    </div>
  );
}

export function HeroScene() {
  return (
    <div className="hero-tilt relative isolate min-h-[34rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,248,240,0.96),rgba(255,241,226,0.84))] shadow-[0_30px_100px_rgba(58,36,24,0.18)] md:min-h-[44rem]">
      <div
        className="absolute inset-0 liquid-gradient opacity-90 mix-blend-soft-light animate-shimmer"
        data-liquid
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.82),transparent_28%),radial-gradient(circle_at_30%_20%,rgba(246,183,60,0.18),transparent_20%),radial-gradient(circle_at_75%_70%,rgba(244,209,209,0.18),transparent_24%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,248,240,0.18)_15%,rgba(255,248,240,0.62)_100%)]" />

      <FloatingCard className="left-[5%] top-[12%]" style={{ animationDelay: "-2s" }}>
        <ImageCard
          src="/assets/ingredients-texture.png"
          title="Ingredients"
          subtitle="Texture study"
          className="h-44 w-36 rotate-[-10deg]"
          imageClassName="object-cover"
        />
      </FloatingCard>

      <FloatingCard className="right-[6%] top-[12%]" style={{ animationDelay: "-4s" }}>
        <ImageCard
          src="/assets/falooda-kulfi.png"
          title="Falooda Kulfi"
          subtitle="Signature pour"
          className="h-52 w-40 rotate-[8deg]"
          imageClassName="object-cover"
        />
      </FloatingCard>

      <FloatingCard className="left-[8%] bottom-[10%]" style={{ animationDelay: "-5s" }}>
        <ImageCard
          src="/assets/sundae-nirvana.png"
          title="Sundae"
          subtitle="Nirvana bowl"
          className="h-52 w-40 rotate-[6deg]"
          imageClassName="object-cover"
        />
      </FloatingCard>

      <FloatingCard className="right-[10%] bottom-[8%]" style={{ animationDelay: "-3s" }}>
        <ImageCard
          src="/assets/birthday-cake.png"
          title="Celebration"
          subtitle="Birthday cake"
          className="h-52 w-40 rotate-[-7deg]"
          imageClassName="object-cover"
        />
      </FloatingCard>

      <div className="absolute left-1/2 top-[48%] w-[70%] -translate-x-1/2 -translate-y-1/2">
        <div className="glass premium-border relative overflow-hidden rounded-[2.4rem] p-4 shadow-2xl">
          <div className="relative aspect-[16/12] overflow-hidden rounded-[1.8rem]">
            <Image
              src="/assets/hero-kulfi.png"
              alt=""
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute left-6 top-6 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.24em] text-black/50 backdrop-blur-md">
            Authentic Indian desserts
          </div>
          <div className="absolute bottom-6 left-6 rounded-[1.4rem] border border-white/40 bg-[rgba(255,248,240,0.82)] px-4 py-3 backdrop-blur-md">
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-black/45">Hero dessert</p>
            <p className="mt-1 font-display text-2xl text-[var(--chocolate)]">Pure Bliss</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,248,240,0.92))] dark:bg-[linear-gradient(180deg,transparent,rgba(18,18,18,0.96))]" />
    </div>
  );
}
