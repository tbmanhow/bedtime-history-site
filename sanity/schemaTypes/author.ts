import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "频道信息",
  type: "document",
  fields: [
    defineField({ name: "name", title: "频道名称", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "bio", title: "简介", type: "text", rows: 4 }),
    defineField({ name: "avatar", title: "头像", type: "image", options: { hotspot: true } }),
    defineField({
      name: "links",
      title: "外部链接",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "平台名称", type: "string" },
            { name: "url", title: "链接", type: "url" }
          ]
        }
      ]
    })
  ]
});
