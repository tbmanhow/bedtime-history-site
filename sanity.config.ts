import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { zhHansLocale } from "@sanity/locale-zh-hans";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "bedtime-history",
  title: "睡前历史内容后台",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "replace-me",
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production",
  plugins: [structureTool(), visionTool(), zhHansLocale({ title: "简体中文" })],
  schema: {
    types: schemaTypes
  }
});
