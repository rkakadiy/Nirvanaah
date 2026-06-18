"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Sparkles } from "lucide-react";

type Field = {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "date" | "textarea";
  required?: boolean;
};

type InquiryFormProps = {
  title: string;
  intro: string;
  kind: "catering" | "birthday" | "order" | "contact";
  fields: Field[];
  submitLabel: string;
  successHeadline?: string;
  successBody?: string;
  successBullets?: string[];
};

export function InquiryForm({
  title,
  intro,
  kind,
  fields,
  submitLabel,
  successHeadline,
  successBody,
  successBullets
}: InquiryFormProps) {
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const payloadKind = useMemo(() => kind, [kind]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus("idle");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ kind: payloadKind, data })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("Thanks. Your request has been captured and the team can follow up.");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or use the phone number in the contact section.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="glass premium-border rounded-[2rem] p-6 md:p-8" data-reveal>
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(246,183,60,0.14)] text-[var(--chocolate)]">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-display text-2xl text-[var(--chocolate)] dark:text-[var(--ink)]">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-black/65 dark:text-white/65">{intro}</p>
        </div>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className={cn("grid gap-4", fields.length > 2 ? "md:grid-cols-2" : "md:grid-cols-1")}>
          {fields.map((field) => {
            const Input = field.type === "textarea" ? "textarea" : "input";
            return (
              <label key={field.id} className="grid gap-2 text-sm font-medium text-black/80 dark:text-white/80">
                <span>{field.label}</span>
                <Input
                  name={field.id}
                  required={field.required ?? true}
                  placeholder={field.placeholder ?? field.label}
                  type={field.type && field.type !== "textarea" ? field.type : "text"}
                  rows={field.type === "textarea" ? 5 : undefined}
                  className="focus-ring min-h-12 rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-base text-[var(--ink)] outline-none placeholder:text-black/35 dark:placeholder:text-white/35"
                />
              </label>
            );
          })}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-[var(--chocolate)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitLabel}
        </button>

        {message ? (
          <div
            className={cn(
              "grid gap-3 rounded-2xl border px-4 py-4 text-sm",
              status === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100"
                : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-100"
            )}
          >
            <p>{message}</p>
            {status === "success" && successHeadline ? (
              <div className="rounded-2xl bg-white/60 p-4 text-[var(--chocolate)] dark:bg-black/20 dark:text-[var(--cream)]">
                <p className="font-display text-xl">{successHeadline}</p>
                {successBody ? <p className="mt-2 leading-6 text-black/70 dark:text-white/72">{successBody}</p> : null}
                {successBullets?.length ? (
                  <ul className="mt-3 grid gap-2">
                    {successBullets.map((bullet) => (
                      <li key={bullet} className="text-sm">
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </form>
    </div>
  );
}
