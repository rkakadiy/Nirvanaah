import type { MetadataRoute } from "next";

const routes = [
  "/",
  "/about",
  "/menu",
  "/flavors",
  "/sundaes",
  "/catering",
  "/birthday-club",
  "/contact",
  "/order-online",
  "/gift-cards",
  "/novelties"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `https://nirvanaah.com${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.7
  }));
}
