/**
 * Prefixes an internal path with the configured base path.
 * Lets the same source build at the domain root (production) or under a
 * subpath (e.g. a GitHub Pages preview) without touching any links.
 */
export const url = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path}` || "/";
};

export const site = {
  name: "Mishpat Capital Management",
  shortName: "Mishpat",
  tagline: "Alternative credit for complex markets.",
  description:
    "Mishpat Capital Management is a specialized alternative investment manager focused on legal assets, secured credit, distressed assets, and special situations in Colombia and select emerging markets.",
  url: "https://www.mishpatcapital.com",
  founded: "2019",
  contact: {
    name: "Uri Szapiro",
    title: "Co-Founder and Managing Partner",
    email: "uri@mishpatventures.com",
    phone: "+1 305.467.5619",
  },
  /** Single-page site — every nav item scrolls to a section on the home page. */
  nav: [
    { label: "About", href: "#about" },
    { label: "Investment Philosophy", href: "#philosophy" },
    { label: "Strategies", href: "#strategies" },
    { label: "Contact", href: "#contact" },
  ],
};
