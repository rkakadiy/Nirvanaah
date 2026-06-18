import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteSections, type SitePageSlug } from "@/components/site-sections";
import { brand, giftCardCopy } from "@/data/site";

const validSlugs: SitePageSlug[] = [
  "about",
  "menu",
  "flavors",
  "sundaes",
  "catering",
  "birthday-club",
  "contact",
  "order-online",
  "gift-cards",
  "novelties"
];

const metadataBySlug: Record<Exclude<SitePageSlug, "home">, { title: string; description: string }> = {
  about: {
    title: "Our Story",
    description: brand.about
  },
  menu: {
    title: "Menu",
    description: "Explore scoops, kulfi-coolers, sundaes, cakes, shakes and grab-and-go dessert formats."
  },
  flavors: {
    title: "Flavor Universe",
    description: "A premium, horizontal flavor journey featuring fusion blend, nutty world and fruit zone collections."
  },
  sundaes: {
    title: "Sundaes",
    description: "Signature desserts, sundae builds, shakes and celebration-ready compositions."
  },
  catering: {
    title: "Catering",
    description: "Luxury catering packages for birthdays, weddings, corporate events and family gatherings."
  },
  "birthday-club": {
    title: "Birthday Club",
    description: "Join the Nirvanaah Birthday Club and receive special offers on your special day."
  },
  contact: {
    title: "Contact",
    description: "Store locations, phone numbers, email and directions for Sunnyvale and Fremont."
  },
  "order-online": {
    title: "Order Online",
    description: "Submit custom order details for parties, family gatherings and pickup requests."
  },
  "gift-cards": {
    title: "Gift Cards",
    description: giftCardCopy.body
  },
  novelties: {
    title: "Novelties",
    description: "Cassatta, Falooda Kulfi, Badshaahi Falooda Drink and Traditional Matka Kulfi."
  }
};

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = slug as Exclude<SitePageSlug, "home">;
  const meta = metadataBySlug[route];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description
  };
}

export default async function MarketingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = slug as Exclude<SitePageSlug, "home">;

  if (!validSlugs.includes(route)) {
    notFound();
  }

  return <SiteSections slug={route} />;
}
