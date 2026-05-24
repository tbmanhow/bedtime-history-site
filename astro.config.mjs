import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "replace-me";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";

export default defineConfig({
  site: process.env.SITE_URL || "https://lucyhasnomoney.com",
  integrations: [
    sitemap(),
    sanity({
      projectId,
      dataset,
      apiVersion: "2026-05-23",
      useCdn: true
    })
  ]
});
