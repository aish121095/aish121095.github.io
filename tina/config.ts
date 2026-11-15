import { defineConfig, type Collection, type TinaField } from "tinacms";

// Tina Cloud edits the branch the site is built from. GitHub Actions sets
// GITHUB_REF_NAME; locally we default to main.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.GITHUB_HEAD_REF ||
  process.env.GITHUB_REF_NAME ||
  process.env.HEAD ||
  "main";

const slugify = (value?: string) =>
  (value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

/** Single-document collections cannot be created or deleted from the CMS. */
const singleton = { allowedActions: { create: false, delete: false } } as const;

const orderField: TinaField = {
  type: "number",
  name: "order",
  label: "Display order",
  description: "Optional. Lower numbers appear first.",
};

const researchIcons = [
  { value: "leaf", label: "Leaf (tobacco control, environment)" },
  { value: "monitor", label: "Monitor (digital health)" },
  { value: "brain", label: "Brain (AI, mental health)" },
  { value: "heart-pulse", label: "Heart pulse (nutrition, cardiovascular)" },
  { value: "flask-conical", label: "Flask (implementation science, lab)" },
  { value: "trending-up", label: "Trend (health research, data)" },
  { value: "stethoscope", label: "Stethoscope (clinical care)" },
  { value: "microscope", label: "Microscope (research)" },
  { value: "shield-plus", label: "Shield (prevention, policy)" },
  { value: "users", label: "People (community health)" },
  { value: "globe", label: "Globe (global health)" },
  { value: "apple", label: "Apple (diet, wellbeing)" },
  { value: "syringe", label: "Syringe (immunisation)" },
  { value: "baby", label: "Baby (maternal & child health)" },
  { value: "hospital", label: "Hospital (health systems)" },
  { value: "book-open", label: "Book (education, writing)" },
];

const site: Collection = {
  name: "site",
  label: "Site settings",
  path: "src/content/settings",
  format: "json",
  match: { include: "site" },
  ui: singleton,
  fields: [
    { type: "string", name: "name", label: "Full name", required: true },
    { type: "string", name: "shortName", label: "Name in header", required: true },
    { type: "string", name: "credentials", label: "Qualifications badge", description: "Shown above your name, e.g. BDS • MPH" },
    { type: "string", name: "jobTitle", label: "Professional title", description: "Used by search engines, e.g. Public Health Researcher and Dentist" },
    {
      type: "string",
      name: "roles",
      label: "Roles (typed out on the home page)",
      list: true,
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Search engine description",
      description: "One or two sentences shown by Google and when the site is shared.",
      ui: { component: "textarea" },
      required: true,
    },
    { type: "string", name: "heroPrimaryLabel", label: "Home page button text" },
    { type: "string", name: "heroPrimaryLink", label: "Home page button link", description: "e.g. /about" },
    { type: "string", name: "cvLabel", label: "CV button text" },
    { type: "image", name: "cv", label: "CV (PDF)", description: "Upload the latest CV as a PDF." },
    { type: "string", name: "footerMotto", label: "Footer motto" },
    {
      type: "object",
      name: "contact",
      label: "Contact details",
      fields: [
        { type: "string", name: "heading", label: "Heading", required: true },
        { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
        { type: "string", name: "email", label: "Email" },
        { type: "string", name: "phone", label: "Phone" },
        { type: "string", name: "linkedin", label: "LinkedIn URL" },
        { type: "string", name: "location", label: "Location" },
      ],
    },
    {
      type: "object",
      name: "notFound",
      label: "Page not found (404)",
      fields: [
        { type: "string", name: "heading", label: "Heading", required: true },
        { type: "string", name: "message", label: "Message", ui: { component: "textarea" }, required: true },
      ],
    },
  ],
};

const about: Collection = {
  name: "about",
  label: "About page",
  path: "src/content/pages",
  format: "md",
  match: { include: "about" },
  ui: singleton,
  fields: [
    { type: "string", name: "title", label: "Heading", required: true, isTitle: true },
    { type: "image", name: "photo", label: "Profile photo" },
    { type: "string", name: "photoAlt", label: "Photo description (for screen readers)" },
    { type: "string", name: "expertiseHeading", label: "Expertise heading" },
    { type: "string", name: "expertise", label: "Areas of expertise", list: true },
    { type: "string", name: "languagesHeading", label: "Languages heading" },
    { type: "string", name: "languages", label: "Languages", list: true, description: "e.g. Japanese (JLPT N5)" },
    { type: "rich-text", name: "body", label: "Biography", isBody: true },
  ],
};

const creative: Collection = {
  name: "creative",
  label: "Creative page",
  path: "src/content/pages",
  format: "json",
  match: { include: "creative" },
  ui: singleton,
  fields: [
    { type: "string", name: "title", label: "Heading", required: true, isTitle: true },
    { type: "string", name: "subtitle", label: "Subtitle" },
    {
      type: "object",
      name: "pillars",
      label: "Creative practice cards",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "New card" }) },
      fields: [
        { type: "string", name: "title", label: "Title", required: true },
        { type: "string", name: "body", label: "Text", ui: { component: "textarea" }, required: true },
      ],
    },
    { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
    {
      type: "object",
      name: "galleries",
      label: "Photo galleries",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "New gallery" }) },
      fields: [
        { type: "string", name: "title", label: "Gallery title", required: true },
        { type: "string", name: "caption", label: "Caption" },
        {
          type: "string",
          name: "layout",
          label: "Layout",
          options: [
            { value: "masonry", label: "Masonry (keeps each photo's shape)" },
            { value: "grid", label: "Grid (portrait tiles)" },
          ],
        },
        {
          type: "object",
          name: "images",
          label: "Photos",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.alt || "Photo" }) },
          fields: [
            { type: "image", name: "src", label: "Photo", required: true },
            { type: "string", name: "alt", label: "Description", description: "Shown in the lightbox and read by screen readers." },
          ],
        },
      ],
    },
  ],
};

const experience: Collection = {
  name: "experience",
  label: "Experience",
  path: "src/content/experience",
  format: "md",
  ui: {
    filename: { readonly: false, slugify: (v) => slugify(`${v?.organization ?? ""} ${v?.role ?? ""}`) },
  },
  defaultItem: () => ({ current: false }),
  fields: [
    { type: "string", name: "role", label: "Role / position", required: true, isTitle: true },
    { type: "string", name: "organization", label: "Organisation", required: true },
    { type: "string", name: "location", label: "Location" },
    {
      type: "string",
      name: "employmentType",
      label: "Type of role",
      options: ["Full-time", "Part-time", "Consultancy", "Advisory", "Editorial", "Partnership", "Fellowship", "Internship", "Volunteer"],
    },
    { type: "datetime", name: "startDate", label: "Start date", ui: { dateFormat: "MMM YYYY" } },
    { type: "datetime", name: "endDate", label: "End date", description: "Leave empty if this is your current role.", ui: { dateFormat: "MMM YYYY" } },
    { type: "boolean", name: "current", label: "I currently hold this role" },
    orderField,
    { type: "rich-text", name: "body", label: "Responsibilities & achievements (optional)", isBody: true },
  ],
};

const publications: Collection = {
  name: "publications",
  label: "Publications",
  path: "src/content/publications",
  format: "md",
  ui: {
    filename: { readonly: false, slugify: (v) => slugify(`${v?.year ?? ""} ${v?.title ?? ""}`) },
  },
  defaultItem: () => ({ year: new Date().getFullYear(), type: "Journal article" }),
  fields: [
    { type: "string", name: "title", label: "Title", required: true, isTitle: true, ui: { component: "textarea" } },
    { type: "string", name: "authors", label: "Authors", description: "e.g. Aishwariya R, Sharma P, et al." },
    { type: "string", name: "venue", label: "Journal / publisher" },
    { type: "number", name: "year", label: "Year", required: true },
    {
      type: "string",
      name: "type",
      label: "Publication type",
      options: ["Journal article", "Review article", "Opinion editorial", "White paper", "Policy brief", "Report", "Conference abstract", "Book chapter", "Preprint"],
    },
    { type: "string", name: "url", label: "Link (DOI or URL)", description: "e.g. https://doi.org/10.7759/cureus.12345" },
    { type: "boolean", name: "featured", label: "Highlight this publication" },
    { type: "rich-text", name: "body", label: "Summary (optional)", isBody: true },
  ],
};

const education: Collection = {
  name: "education",
  label: "Education",
  path: "src/content/education",
  format: "md",
  ui: { filename: { readonly: false, slugify: (v) => slugify(`${v?.degree ?? ""} ${v?.institution ?? ""}`) } },
  fields: [
    { type: "string", name: "degree", label: "Degree / qualification", required: true, isTitle: true },
    { type: "string", name: "institution", label: "Institution", required: true },
    { type: "string", name: "location", label: "Location" },
    { type: "string", name: "period", label: "Years", description: "e.g. 2020 – 2022" },
    { type: "string", name: "honours", label: "Honours & distinctions", list: true },
    orderField,
    { type: "rich-text", name: "body", label: "Notes (optional)", description: "Thesis, specialisation, key coursework…", isBody: true },
  ],
};

const awards: Collection = {
  name: "awards",
  label: "Awards & certifications",
  path: "src/content/awards",
  format: "md",
  ui: { filename: { readonly: false, slugify: (v) => slugify(v?.title) } },
  defaultItem: () => ({ category: "Certification" }),
  fields: [
    { type: "string", name: "title", label: "Title", required: true, isTitle: true },
    {
      type: "string",
      name: "category",
      label: "Category",
      description: "Awards appear under “Awards & Achievements”; certifications and training under “Courses & Certifications”.",
      options: ["Award", "Certification", "Training"],
    },
    { type: "string", name: "issuer", label: "Awarded by / provider" },
    { type: "string", name: "description", label: "Details (optional)", ui: { component: "textarea" } },
    { type: "number", name: "year", label: "Year" },
    orderField,
  ],
};

const research: Collection = {
  name: "research",
  label: "Research interests",
  path: "src/content/research",
  format: "md",
  ui: { filename: { readonly: false, slugify: (v) => slugify(v?.title) } },
  defaultItem: () => ({ icon: "microscope" }),
  fields: [
    { type: "string", name: "title", label: "Area", required: true, isTitle: true },
    { type: "string", name: "icon", label: "Icon", options: researchIcons },
    { type: "string", name: "summary", label: "Short description (optional)", ui: { component: "textarea" } },
    orderField,
  ],
};

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,
  // The site reads content files directly through Astro content collections,
  // so Tina's generated GraphQL client isn't needed.
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [site, about, experience, publications, education, awards, research, creative],
  },
});
