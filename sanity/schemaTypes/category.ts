import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "分类",
  type: "document",
  fields: [
    defineField({ name: "name", title: "名称", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "name", maxLength: 64 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "description", title: "说明", type: "text", rows: 3 }),
    defineField({ name: "image", title: "封面图", type: "image", options: { hotspot: true } })
  ]
});
