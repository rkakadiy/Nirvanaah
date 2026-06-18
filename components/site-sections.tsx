import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Crown,
  Gem,
  Heart,
  IceCreamCone,
  MapPin,
  Phone,
  Sparkles,
  Star,
  UtensilsCrossed
} from "lucide-react";
import { brand, cateringPackages, contactCopy, flavorColumns, giftCardCopy, locations, menuCategories, menuHighlightCopy, novelties, orderFields, signatureDesserts, storyMoments, trustStats, whyPoints } from "@/data/site";
import { MagneticButton } from "@/components/magnetic-button";
import { HeroScene } from "@/components/hero-scene";
import { InquiryForm } from "@/components/inquiry-form";
import { cn } from "@/lib/utils";

export type SitePageSlug =
  | "home"
  | "about"
  | "menu"
  | "flavors"
  | "sundaes"
  | "catering"
  | "birthday-club"
  | "contact"
  | "order-online"
  | "gift-cards"
  | "novelties";

type SiteSectionsProps = {
  slug: SitePageSlug;
};

function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" ? "mx-auto text-center" : "")}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.28em] text-black/45 dark:text-white/48">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-4xl text-[var(--chocolate)] dark:text-[var(--ink)] md:text-5xl">
        {title}
      </h2>
      {copy ? (
        <p className="mt-4 text-base leading-8 text-black/68 dark:text-white/68">{copy}</p>
      ) : null}
    </div>
  );
}

function SoftCard({
  title,
  description,
  icon,
  className
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("glass premium-border rounded-[1.8rem] p-6", className)} data-reveal>
      {icon ? <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(246,183,60,0.14)]">{icon}</div> : null}
      <h3 className="font-display text-2xl text-[var(--chocolate)] dark:text-[var(--ink)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-black/68 dark:text-white/70">{description}</p>
    </article>
  );
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-center" data-reveal>
      <p className="font-display text-2xl text-[var(--chocolate)] dark:text-[var(--ink)]">{value}</p>
      <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-black/45 dark:text-white/45">{label}</p>
    </div>
  );
}

function PageHero({
  eyebrow,
  title,
  copy,
  actions,
  note,
  compact = false
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  actions?: ReactNode;
  note?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", compact ? "py-10 lg:py-14" : "py-10 lg:py-16")}>
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-7" data-reveal>
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.32em] text-black/45 dark:text-white/45">{eyebrow}</p>
          ) : null}
          <div className="space-y-4">
            <h1 className="font-display text-5xl text-[var(--chocolate)] dark:text-[var(--ink)] md:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-black/70 dark:text-white/70">{copy}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          {note ? <div>{note}</div> : null}
        </div>
        <div className={cn(compact ? "lg:ml-auto lg:max-w-[34rem]" : "")}>
          <HeroScene />
        </div>
      </div>
    </section>
  );
}

function FlavorJourney() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Flavor Universe"
        title="A horizontal journey through India-inspired flavor worlds."
        copy="Each column frames the brand through real flavor families, with cards that invite hover, scroll and discovery."
      />
      <div className="no-scrollbar soft-mask flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3">
        {flavorColumns.map((column) => (
          <div
            key={column.title}
            className="glass premium-border min-w-[19rem] snap-start rounded-[2rem] p-6 md:min-w-[24rem]"
            data-reveal
          >
            <p className="text-xs uppercase tracking-[0.24em] text-black/45 dark:text-white/45">{column.title}</p>
            <div className="mt-5 grid gap-3">
              {column.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--border)] bg-white/55 px-4 py-3 text-sm font-medium text-[var(--chocolate)] transition hover:-translate-y-0.5 dark:bg-white/5 dark:text-[var(--ink)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SignatureDesserts() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Signature Desserts"
        title="The hero products, re-imagined as premium showcases."
        copy="Falooda Kulfi, Cassata, Kulfi, Badshahi Falooda, Ice Cream Cakes, Shakes and Sundaes all get their own moment."
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {signatureDesserts.map((item, index) => (
          <SoftCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={<Sparkles className="h-4 w-4" />}
            className={index === 0 ? "md:col-span-2 xl:col-span-1" : ""}
          />
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="why" className="space-y-8">
      <SectionHeading
        eyebrow="Why Nirvanaah"
        title="Trust signals that are easy to understand at a glance."
        copy="The original brand story already had strong proof points. We turn them into a clearer conversion layer."
        align="center"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {trustStats.map((stat) => (
          <StatPill key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {whyPoints.map((point, index) => (
          <SoftCard
            key={point}
            title={point}
            description={
              index === 0
                ? "Vegetarian comfort, intentional and clear."
                : index === 1
                  ? "The whole menu stays accessible to broader audiences and family gatherings."
                  : index === 2
                    ? "The premium feel comes from sourcing and story, not just visual polish."
                    : index === 3
                      ? "Textural richness is part of the brand's appeal, from fruit to nut to cream."
                      : "The language of the original store is kept visible in the redesign."
            }
            icon={<Heart className="h-4 w-4" />}
          />
        ))}
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Our Story"
        title="An emotional Indian dessert story, now told with more movement."
        copy="The original site explains the philosophy plainly. This version keeps the meaning while making the journey feel cinematic."
      />
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass premium-border rounded-[2rem] p-6" data-reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(246,183,60,0.3),rgba(244,209,209,0.25),rgba(184,216,168,0.22))] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_26%),radial-gradient(circle_at_70%_80%,rgba(58,36,24,0.18),transparent_24%)]" />
            <div className="relative grid gap-4">
              <p className="text-xs uppercase tracking-[0.26em] text-black/50">Ingredients in motion</p>
              <div className="flex flex-wrap gap-3">
                {["Real Indian fruits", "Nuts", "Rabri", "Kulfi", "Kwality Foods"].map((item) => (
                  <span key={item} className="rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-[var(--chocolate)] shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            <p className="text-sm leading-7 text-black/68 dark:text-white/68">{brand.about}</p>
            <p className="text-sm leading-7 text-black/68 dark:text-white/68">{brand.aboutClose}</p>
          </div>
        </div>
        <div className="grid gap-4">
          {storyMoments.map((moment) => (
            <article key={moment.year} className="glass premium-border rounded-[2rem] p-6" data-reveal>
              <p className="text-xs uppercase tracking-[0.26em] text-black/45 dark:text-white/45">{moment.year}</p>
              <h3 className="mt-3 font-display text-3xl text-[var(--chocolate)] dark:text-[var(--ink)]">{moment.title}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-black/68 dark:text-white/68">{moment.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuGrid() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Menu"
        title={menuHighlightCopy.headline}
        copy={menuHighlightCopy.body}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {menuCategories.map((category) => (
          <article key={category.title} className="glass premium-border rounded-[2rem] p-6" data-reveal>
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-3xl text-[var(--chocolate)] dark:text-[var(--ink)]">{category.title}</h3>
              <span className="rounded-full border border-[var(--border)] bg-white/55 px-3 py-1 text-xs uppercase tracking-[0.2em] text-black/45 dark:bg-white/5 dark:text-white/45">
                {category.items.length} items
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-[var(--border)] bg-white/50 p-4 dark:bg-white/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-semibold text-[var(--chocolate)] dark:text-[var(--ink)]">{item.name}</h4>
                      <p className="mt-1 text-sm leading-6 text-black/66 dark:text-white/66">{item.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[rgba(246,183,60,0.16)] px-3 py-1 text-sm font-semibold text-[var(--chocolate)]">
                      {item.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NoveltiesGrid() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Novelties"
        title="The original novelty line, lifted into a premium product story."
        copy="Cassatta, Falooda Kulfi, Badshaahi Falooda Drink and Traditional Matka Kulfi all remain part of the brand universe."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {novelties.map((item, index) => (
          <SoftCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={<Gem className="h-4 w-4" />}
            className={index === 0 ? "md:col-span-2" : ""}
          />
        ))}
      </div>
    </section>
  );
}

function CateringSection() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Catering Experience"
        title="Luxury catering for weddings, birthdays, family gatherings and corporate moments."
        copy="The original copy already had a strong promise. Here it becomes a polished inquiry journey with clearer packages and a stronger call to action."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.95fr]">
        <div className="grid gap-4">
          {cateringPackages.map((pkg) => (
            <SoftCard
              key={pkg.title}
              title={pkg.title}
              description={`${pkg.description} ${pkg.price}.`}
              icon={<Crown className="h-4 w-4" />}
            />
          ))}
        </div>
        <InquiryForm
          title="Start your catering inquiry"
          intro="Tell us the occasion, guest count and service style. We’ll shape a dessert plan that feels as premium as the event itself."
          kind="catering"
          fields={[
            { id: "name", label: "Name" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "tel" },
            { id: "occasion", label: "Occasion", placeholder: "Birthday, wedding, corporate event..." },
            { id: "date", label: "Event date", type: "date" },
            { id: "message", label: "Details", type: "textarea", placeholder: "Guest count, flavors, timing and venue" }
          ]}
          submitLabel="Request catering"
        />
      </div>
    </section>
  );
}

function BirthdayClubSection() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Birthday Club"
        title="Gamified signup, confetti, and a reward reveal."
        copy="The original club promise becomes a more delightful conversion path without changing the offer."
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
        <div className="glass premium-border relative overflow-hidden rounded-[2rem] p-6" data-reveal>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(246,183,60,0.18),transparent_22%),radial-gradient(circle_at_70%_25%,rgba(244,209,209,0.18),transparent_20%),radial-gradient(circle_at_55%_80%,rgba(184,216,168,0.15),transparent_24%)]" />
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/60 px-4 py-2 text-xs uppercase tracking-[0.22em] text-black/50">
              <Sparkles className="h-4 w-4" />
              Birthday rewards
            </div>
            <h3 className="font-display text-4xl text-[var(--chocolate)] dark:text-[var(--ink)]">Join the Nirvanaah Birthday Club</h3>
            <p className="max-w-xl text-sm leading-7 text-black/68 dark:text-white/68">
              Receive special offers on your special day and unlock a personalized dessert moment when your birthday arrives.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {["Free birthday message", "Birthday rewards reveal", "Celebration reminders", "Offer updates"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--border)] bg-white/55 px-4 py-3 text-sm text-[var(--chocolate)] dark:bg-white/5 dark:text-[var(--ink)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <InquiryForm
          title="Sign up for the club"
          intro="Fill in your details and we’ll keep the celebration flowing with birthday-only offers."
          kind="birthday"
          fields={[
            { id: "name", label: "Name" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "tel" },
            { id: "date", label: "Birthday", type: "date" },
            { id: "message", label: "Message", type: "textarea", placeholder: "Anything you want us to know?" }
          ]}
          submitLabel="Join the club"
          successHeadline="Reward unlocked"
          successBody="You’re now set for future birthday surprises."
          successBullets={["Birthday-only offers", "Celebration reminder saved", "Perfect excuse for an extra scoop"]}
        />
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Location"
        title="Two Bay Area locations, one premium dessert language."
        copy="The original site clearly carried Sunnyvale and Fremont as the core store details. We preserve both, with stronger direction and tap-to-call actions."
      />
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          {locations.map((location) => (
            <article key={location.city} className="glass premium-border rounded-[2rem] p-6" data-reveal>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.26em] text-black/45 dark:text-white/45">{location.city}</p>
                  <h3 className="mt-3 font-display text-3xl text-[var(--chocolate)] dark:text-[var(--ink)]">{location.address}</h3>
                </div>
                <span className="rounded-full bg-[rgba(246,183,60,0.14)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--chocolate)]">
                  Store
                </span>
              </div>
              <div className="mt-5 grid gap-2 text-sm leading-7 text-black/68 dark:text-white/68">
                <p className="flex gap-2">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-[var(--saffron)]" />
                  <span>{location.phone} · {location.phoneSecondary}</span>
                </p>
                <p className="flex gap-2">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--saffron)]" />
                  <span>{location.address}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="glass premium-border overflow-hidden rounded-[2rem]" data-reveal>
          <iframe
            title="Nirvanaah location map"
            src="https://www.google.com/maps?q=1038%20E%20El%20Camino%20Real%20Sunnyvale%20CA%2094087&output=embed"
            loading="lazy"
            className="h-[34rem] w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}

function GiftCardsSection() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Gift Cards"
        title="A gift card story that feels as polished as the dessert experience."
        copy={giftCardCopy.body}
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <SoftCard
          title={giftCardCopy.headline}
          description={giftCardCopy.body}
          icon={<GiftCardIcon />}
        />
        <SoftCard
          title="What it does"
          description="The original page also included a COVID-era announcement. We keep the gift card page focused on what still matters today: flexible gifting and a premium, heartfelt gesture."
          icon={<Heart className="h-4 w-4" />}
        />
      </div>
    </section>
  );
}

function GiftCardIcon() {
  return <UtensilsCrossed className="h-4 w-4" />;
}

function FlavorStoryBanner() {
  return (
    <div className="glass premium-border rounded-[2rem] p-5" data-reveal>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          "Meetha Pan",
          "Zafarani Pistachio Passion",
          "Banana Split Delight",
          "Falooda Kulfi",
          "Badshahi Falooda Drink",
          "Tutti Frutti Ice Cream",
          "Spumoni",
          "Alphonso Mango"
        ].map((item) => (
          <span key={item} className="rounded-full border border-[var(--border)] bg-white/55 px-4 py-2 text-sm font-medium text-[var(--chocolate)] dark:bg-white/5 dark:text-[var(--ink)]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Contact"
        title="Store details, click-to-call and an easy inquiry path."
        copy="The original contact page was plain and practical. The redesign keeps that information but makes the action hierarchy much clearer."
      />
      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <SoftCard
            title="Sunnyvale"
            description={`${contactCopy.sunnyvaleAddress}. ${contactCopy.primaryPhone} · ${contactCopy.email}`}
            icon={<MapPin className="h-4 w-4" />}
          />
          <SoftCard
            title="Fremont"
            description={`${contactCopy.fremontAddress}. (510) 796-2547 · (510) 509-8707`}
            icon={<MapPin className="h-4 w-4" />}
          />
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="tel:+14087811743">
              <Phone className="h-4 w-4" />
              Call Sunnyvale
            </MagneticButton>
            <MagneticButton href={`mailto:${contactCopy.email}`} variant="secondary">
              <ArrowUpRight className="h-4 w-4" />
              Email bliss
            </MagneticButton>
          </div>
        </div>
        <InquiryForm
          title="Send a message"
          intro="Use this for store questions, private events or anything else the team should know."
          kind="contact"
          fields={[
            { id: "name", label: "Name" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "tel" },
            { id: "message", label: "Message", type: "textarea", placeholder: "How can we help?" }
          ]}
          submitLabel="Send message"
        />
      </div>
    </section>
  );
}

function OrderSection() {
  return (
    <section className="space-y-8">
      <SectionHeading
        eyebrow="Order Online"
        title="Make it easy to place large orders or special requests."
        copy="We preserve the original order form fields but present them in a more modern, trust-building structure."
      />
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <SoftCard
          title="Order notes"
          description="Planning for a big party? Or just a small family get-together? Make the occasion extra special with authentic Indian desserts. Tell us what your guests would cherish."
          icon={<IceCreamCone className="h-4 w-4" />}
        />
        <InquiryForm
          title="Place an online order"
          intro="Use the exact order fields from the original site, now with a more elegant, lower-friction flow."
          kind="order"
          fields={[
            { id: "name", label: "Name" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "tel" },
            { id: "address", label: "Address" },
            { id: "want", label: "Describe what you want", type: "textarea", placeholder: "Desserts, quantities, delivery or pickup..." },
            { id: "date", label: "When do you want it", type: "date" },
            { id: "reach", label: "When can we reach you (if needed)", placeholder: "Best time window" }
          ]}
          submitLabel="Request order"
        />
      </div>
    </section>
  );
}

export function SiteSections({ slug }: SiteSectionsProps) {
  if (slug === "home") {
    return (
      <>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-7" data-reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-black/45 dark:text-white/45">Modern Indian luxury</p>
              <div className="space-y-4">
                <h1 className="font-display text-5xl text-[var(--chocolate)] dark:text-[var(--ink)] md:text-7xl">
                  Authentic Indian Desserts.
                  <br />
                  Pure Bliss.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-black/70 dark:text-white/70">
                  {brand.heroCopy} {brand.heroSubcopy}
                </p>
                <p className="max-w-2xl text-base leading-8 text-black/60 dark:text-white/60">{brand.heroPromise}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <MagneticButton href="/flavors">
                  Explore Flavors
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton href="/order-online" variant="secondary">
                  Order Online
                </MagneticButton>
              </div>
              <FlavorStoryBanner />
            </div>
            <HeroScene />
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="announcement glass premium-border rounded-[2rem] px-5 py-4" data-reveal>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.26em] text-black/45 dark:text-white/45">Announcement</p>
                <p className="text-sm leading-6 text-black/70 dark:text-white/70">
                  All desserts made by Kwality Ice Creams. Find us on Twitter and Facebook.
                </p>
              </div>
              <MagneticButton href="/birthday-club" variant="secondary">
                Join the Birthday Club
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl space-y-24 px-4 py-24 sm:px-6 lg:px-8">
          <StorySection />
          <FlavorJourney />
          <SignatureDesserts />
          <WhySection />
          <CateringSection />
          <BirthdayClubSection />
          <LocationSection />
          <GiftCardsSection />
        </div>
      </>
    );
  }

  const heroMap: Record<Exclude<SitePageSlug, "home">, { eyebrow: string; title: string; copy: string }> = {
    about: {
      eyebrow: "Our Story",
      title: "A luxury Indian dessert brand with a clearly rooted identity.",
      copy: brand.about
    },
    menu: {
      eyebrow: "Menu",
      title: "A refined menu architecture for scoops, shakes, sundaes and cakes.",
      copy: "The original menu is preserved as a clear product system with stronger photography, spacing and hierarchy."
    },
    flavors: {
      eyebrow: "Flavor Universe",
      title: "A horizontal flavor journey through Indian classics and fruit-led signatures.",
      copy: "Grouped into Fusion Blend, Nutty World and Fruit Zone, the flavors tell a richer story than a standard scoop board."
    },
    sundaes: {
      eyebrow: "Signature Sundaes",
      title: "Dessert builds that feel playful, layered and premium.",
      copy: "The redesign surfaces sundae and shake moments as premium compositions rather than just menu rows."
    },
    catering: {
      eyebrow: "Catering",
      title: "Dessert catering for events that need a luxurious finish.",
      copy: "Corporate events, birthdays, weddings and family gatherings all deserve a desert table that reads as premium from the first glance."
    },
    "birthday-club": {
      eyebrow: "Birthday Club",
      title: "Turn birthday signups into a celebration ritual.",
      copy: "The reward-led signup flow encourages micro-conversions while keeping the original special-offers promise intact."
    },
    contact: {
      eyebrow: "Contact",
      title: "Store details, directions and instant follow-up.",
      copy: "Sunnyvale and Fremont stay easy to find, and the contact layer makes call and email actions obvious."
    },
    "order-online": {
      eyebrow: "Order Online",
      title: "A clear ordering path for families, parties and custom requests.",
      copy: "The form keeps the original fields but upgrades the experience with better spacing and confidence signals."
    },
    "gift-cards": {
      eyebrow: "Gift Cards",
      title: "Gifting that feels warm, flexible and timeless.",
      copy: giftCardCopy.body
    },
    novelties: {
      eyebrow: "Novelties",
      title: "The heritage novelty line, rebuilt as a premium product story.",
      copy: "Cassatta, Falooda Kulfi, Badshaahi Falooda Drink and Traditional Matka Kulfi remain the anchor products."
    }
  };

  const hero = heroMap[slug];

  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <PageHero
        compact
        eyebrow={hero.eyebrow}
        title={hero.title}
        copy={hero.copy}
        actions={
          <>
            <MagneticButton href="/order-online">
              Order Online
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="/contact" variant="secondary">
              Contact
            </MagneticButton>
          </>
        }
      />

      {slug === "about" ? (
        <>
          <StorySection />
          <WhySection />
        </>
      ) : null}

      {slug === "menu" ? <MenuGrid /> : null}
      {slug === "flavors" ? <FlavorJourney /> : null}

      {slug === "sundaes" ? (
        <>
          <SignatureDesserts />
          <MenuGrid />
        </>
      ) : null}

      {slug === "novelties" ? <NoveltiesGrid /> : null}
      {slug === "catering" ? <CateringSection /> : null}
      {slug === "birthday-club" ? <BirthdayClubSection /> : null}
      {slug === "contact" ? <ContactSection /> : null}
      {slug === "order-online" ? <OrderSection /> : null}
      {slug === "gift-cards" ? <GiftCardsSection /> : null}

      {slug !== "contact" && slug !== "order-online" ? (
        <div className="grid gap-5 xl:grid-cols-[1fr_1.05fr]">
          <SoftCard
            title="Visit the stores"
            description="Sunnyvale and Fremont details are preserved from the original site, now with a clearer action hierarchy."
            icon={<MapPin className="h-4 w-4" />}
          />
          <SoftCard
            title="Need help fast?"
            description="Use the quick call and email links in the footer, or jump straight to the order and catering forms."
            icon={<Phone className="h-4 w-4" />}
          />
        </div>
      ) : null}
    </div>
  );
}
