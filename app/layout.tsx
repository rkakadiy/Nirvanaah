import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/700.css";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";
import { brand } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://nirvanaah.com"),
  title: {
    default: "Nirvanaah | Authentic Indian Desserts. Pure Bliss.",
    template: "%s | Nirvanaah"
  },
  description:
    "Premium Indian desserts in Sunnyvale and Fremont, including Falooda Kulfi, Cassata, Kulfi, sundaes, cakes, shakes and catering.",
  openGraph: {
    title: brand.name,
    description: brand.heroCopy,
    url: "https://nirvanaah.com",
    siteName: "Nirvanaah",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.heroCopy
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
        <script
          type="application/ld+json"
          // JSON-LD for search engines
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: brand.name,
              servesCuisine: "Indian Desserts",
              url: "https://nirvanaah.com",
              telephone: "+1-408-781-1743",
              address: {
                "@type": "PostalAddress",
                streetAddress: "1038 E El Camino Real",
                addressLocality: "Sunnyvale",
                addressRegion: "CA",
                postalCode: "94087",
                addressCountry: "US"
              },
              sameAs: ["https://twitter.com", "https://facebook.com"]
            })
          }}
        />
      </body>
    </html>
  );
}
