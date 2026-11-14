// Astro content collections. Every file under src/content/ is editable in
// TinaCMS (see tina/config.ts) — keep the two schemas in step.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const optionalString = z.string().nullish().transform((v) => v || undefined);
const optionalDate = z.coerce.date().nullish().transform((v) => v || undefined);
const stringList = z.array(z.string()).nullish().transform((v) => (v ?? []).filter(Boolean));

/** Global site settings: identity, hero, contact details, footer, 404 copy. */
const site = defineCollection({
  loader: glob({ pattern: "site.json", base: "./src/content/settings" }),
  schema: z.object({
    name: z.string(),
    shortName: z.string(),
    credentials: optionalString,
    jobTitle: optionalString,
    roles: stringList,
    seoDescription: z.string(),
    heroPrimaryLabel: z.string().default("Explore"),
    heroPrimaryLink: z.string().default("/about"),
    cvLabel: z.string().default("Download CV"),
    cv: optionalString,
    footerMotto: optionalString,
    contact: z.object({
      heading: z.string(),
      intro: optionalString,
      email: optionalString,
      phone: optionalString,
      linkedin: optionalString,
      location: optionalString,
    }),
    notFound: z.object({
      heading: z.string(),
      message: z.string(),
    }),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: "about.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    photo: optionalString,
    photoAlt: optionalString,
    expertiseHeading: z.string().default("Core Expertise"),
    expertise: stringList,
  }),
});

const creative = defineCollection({
  loader: glob({ pattern: "creative.json", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    subtitle: optionalString,
    pillars: z
      .array(z.object({ title: z.string(), body: z.string() }))
      .nullish()
      .transform((v) => v ?? []),
    quote: optionalString,
    galleries: z
      .array(
        z.object({
          title: z.string(),
          caption: optionalString,
          layout: z.enum(["masonry", "grid"]).default("masonry"),
          images: z
            .array(z.object({ src: z.string(), alt: z.string().default("") }))
            .nullish()
            .transform((v) => v ?? []),
        }),
      )
      .nullish()
      .transform((v) => v ?? []),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: z.object({
    role: z.string(),
    organization: z.string(),
    location: optionalString,
    employmentType: optionalString,
    startDate: optionalDate,
    endDate: optionalDate,
    current: z.boolean().default(false),
    order: z.number().nullish(),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: optionalString,
    venue: optionalString,
    year: z.coerce.number().int(),
    type: z.string().default("Journal article"),
    url: optionalString,
    featured: z.boolean().default(false),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    location: optionalString,
    period: optionalString,
    honours: stringList,
    order: z.number().nullish(),
  }),
});

const awards = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/awards" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(["Award", "Certification", "Training"]).default("Certification"),
    issuer: optionalString,
    year: z.coerce.number().int().nullish(),
    order: z.number().nullish(),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    icon: z.string().default("microscope"),
    summary: optionalString,
    order: z.number().nullish(),
  }),
});

export const collections = { site, about, creative, experience, publications, education, awards, research };
