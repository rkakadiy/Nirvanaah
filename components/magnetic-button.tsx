"use client";

import Link from "next/link";
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

function magneticStyle(event: React.PointerEvent<HTMLElement>) {
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - bounds.left - bounds.width / 2;
  const y = event.clientY - bounds.top - bounds.height / 2;
  const strength = 0.18;

  return {
    transform: `translate3d(${x * strength}px, ${y * strength}px, 0)`
  };
}

const base =
  "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition will-change-transform";

const variants = {
  primary:
    "liquid-gradient text-ink shadow-[0_18px_50px_rgba(246,183,60,0.25)] hover:shadow-[0_24px_70px_rgba(246,183,60,0.34)]",
  secondary:
    "bg-[var(--surface-strong)] text-[var(--ink)] border border-[var(--border)] hover:border-[rgba(246,183,60,0.22)] hover:bg-white/80 dark:hover:bg-white/10",
  ghost: "bg-transparent text-[var(--ink)] hover:bg-black/5 dark:hover:bg-white/5"
};

export function MagneticButton(props: ButtonProps): ReactElement;
export function MagneticButton(props: LinkProps): ReactElement;
export function MagneticButton(props: ButtonProps | LinkProps) {
  const common = {
    className: cn(base, variants[props.variant ?? "primary"], props.className),
    onPointerMove: (event: React.PointerEvent<HTMLElement>) => {
      event.currentTarget.style.transform = magneticStyle(event).transform;
    },
    onPointerLeave: (event: React.PointerEvent<HTMLElement>) => {
      event.currentTarget.style.transform = "translate3d(0, 0, 0)";
    }
  };

  if ("href" in props) {
    const linkProps = props as LinkProps;
    const { href, children, ...rest } = linkProps;
    return (
      <Link href={href} {...rest} {...common}>
        {children}
      </Link>
    );
  }

  const { children, variant, className, ...rest } = props;
  return (
    <button type="button" {...rest} {...common}>
      {children}
    </button>
  );
}
