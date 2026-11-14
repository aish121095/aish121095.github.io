import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export async function getSite() {
  const entry = await getEntry("site", "site");
  if (!entry) throw new Error("Missing src/content/settings/site.json");
  return entry.data;
}

const byOrder = (a?: number | null, b?: number | null) =>
  (a ?? Number.POSITIVE_INFINITY) - (b ?? Number.POSITIVE_INFINITY);

/** Current roles first, then most recent start date; `order` overrides both. */
export async function getExperience() {
  const items = await getCollection("experience");
  const time = (d?: Date) => d?.getTime() ?? 0;
  return items.sort(
    (a, b) =>
      byOrder(a.data.order, b.data.order) ||
      Number(b.data.current) - Number(a.data.current) ||
      time(b.data.startDate) - time(a.data.startDate),
  );
}

export async function getPublications() {
  const items = await getCollection("publications");
  return items.sort(
    (a, b) =>
      b.data.year - a.data.year ||
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.title.localeCompare(b.data.title),
  );
}

export async function getEducation() {
  return (await getCollection("education")).sort((a, b) => byOrder(a.data.order, b.data.order));
}

export async function getAwards() {
  return (await getCollection("awards")).sort(
    (a, b) => byOrder(a.data.order, b.data.order) || (b.data.year ?? 0) - (a.data.year ?? 0),
  );
}

export async function getResearch() {
  return (await getCollection("research")).sort(
    (a, b) => byOrder(a.data.order, b.data.order) || a.data.title.localeCompare(b.data.title),
  );
}

// Dates are entered from India; format them there so a date picked as
// "1 June" never shows as "May" after UTC conversion.
const monthYear = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export function formatPeriod(data: CollectionEntry<"experience">["data"]) {
  const start = data.startDate ? monthYear.format(data.startDate) : undefined;
  const end = data.current ? "Present" : data.endDate ? monthYear.format(data.endDate) : undefined;
  if (start && end) return `${start} – ${end}`;
  if (start) return start;
  if (data.current) return "Current";
  return end;
}

/** Normalise a DOI ("10.xxxx/…") or bare link into a usable URL. */
export function publicationHref(url?: string) {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (/^10\.\d{4,}\//.test(trimmed)) return `https://doi.org/${trimmed}`;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}
