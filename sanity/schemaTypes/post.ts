import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "文章",
  type: "document",
  fields: [
    defineField({ name: "title", title: "标题", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "subtitle", title: "副标题", type: "string" }),
    defineField({
      name: "slug",
      title: "URL 标识",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "摘要",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(180)
    }),
    defineField({
      name: "category",
      title: "分类",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "tags", title: "标签", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "mainImage", title: "封面图", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "发布日期", type: "datetime", validation: (Rule) => Rule.required() }),
    defineField({ name: "featured", title: "首页精选", type: "boolean", initialValue: false }),
    defineField({ name: "readMinutes", title: "预计阅读分钟", type: "number", initialValue: 8 }),
    defineField({
      name: "audio",
      title: "音频",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "音频标题", type: "string" },
            { name: "url", title: "音频链接", type: "url" },
            { name: "duration", title: "时长", type: "string" }
          ]
        }
      ]
    }),
    defineField({
      name: "video",
      title: "视频",
      type: "object",
      fields: [
        { name: "title", title: "视频标题", type: "string" },
        { name: "youtubeId", title: "YouTube 视频 ID", type: "string", description: "例如 https://www.youtube.com/watch?v=abc123 中的 abc123" },
        { name: "url", title: "备用视频文件链接", type: "url" },
        { name: "poster", title: "视频封面", type: "image", options: { hotspot: true } }
      ]
    }),
    defineField({
      name: "body",
      title: "正文",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } }
      ]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.name",
      media: "mainImage"
    }
  }
});
