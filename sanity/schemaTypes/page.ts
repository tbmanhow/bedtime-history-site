import { defineArrayMember, defineField, defineType } from "sanity";

const backgroundField = defineField({
  name: "background",
  title: "背景",
  type: "string",
  initialValue: "white",
  options: {
    list: [
      { title: "白色", value: "white" },
      { title: "浅灰", value: "soft" },
      { title: "深色", value: "dark" },
      { title: "渐变", value: "gradient" }
    ],
    layout: "radio"
  }
});

const spacingField = defineField({
  name: "spacing",
  title: "上下间距",
  type: "string",
  initialValue: "normal",
  options: {
    list: [
      { title: "紧凑", value: "compact" },
      { title: "标准", value: "normal" },
      { title: "宽松", value: "spacious" }
    ],
    layout: "radio"
  }
});

const columnsField = defineField({
  name: "columns",
  title: "列数",
  type: "number",
  initialValue: 3,
  options: {
    list: [
      { title: "1 列", value: 1 },
      { title: "2 列", value: 2 },
      { title: "3 列", value: 3 },
      { title: "4 列", value: 4 }
    ],
    layout: "radio"
  }
});

const cardAspectField = defineField({
  name: "cardAspect",
  title: "卡片图片比例",
  type: "string",
  initialValue: "wide",
  options: {
    list: [
      { title: "横版 16:10", value: "wide" },
      { title: "标准 4:3", value: "standard" },
      { title: "正方形 1:1", value: "square" },
      { title: "竖版 4:5", value: "portrait" }
    ],
    layout: "radio"
  }
});

export const pageType = defineType({
  name: "page",
  title: "页面",
  type: "document",
  fields: [
    defineField({ name: "title", title: "页面标题", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "页面地址",
      type: "slug",
      description: "首页请使用 home。其他页面例如 about、contact、privacy。",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({ name: "description", title: "SEO 摘要", type: "text", rows: 3 }),
    defineField({
      name: "sections",
      title: "页面板块",
      type: "array",
      of: [
        defineArrayMember({
          name: "heroSection",
          title: "大标题板块",
          type: "object",
          fields: [
            { name: "eyebrow", title: "小标题", type: "string" },
            { name: "heading", title: "主标题", type: "string" },
            { name: "text", title: "说明文字", type: "text", rows: 3 },
            { name: "image", title: "背景/主视觉图片", type: "image", options: { hotspot: true } },
            {
              name: "style",
              title: "风格",
              type: "string",
              initialValue: "light",
              options: {
                list: [
                  { title: "浅色简洁", value: "light" },
                  { title: "深色沉浸", value: "dark" }
                ],
                layout: "radio"
              }
            },
            { name: "primaryLabel", title: "主按钮文字", type: "string" },
            { name: "primaryHref", title: "主按钮链接", type: "string" },
            spacingField
          ]
        }),
        defineArrayMember({
          name: "richTextSection",
          title: "文字板块",
          type: "object",
          fields: [
            { name: "eyebrow", title: "小标题", type: "string" },
            { name: "heading", title: "标题", type: "string" },
            { name: "body", title: "正文", type: "array", of: [{ type: "block" }] },
            backgroundField,
            spacingField
          ]
        }),
        defineArrayMember({
          name: "postGridSection",
          title: "文章列表板块",
          type: "object",
          fields: [
            { name: "eyebrow", title: "小标题", type: "string" },
            { name: "heading", title: "标题", type: "string" },
            { name: "text", title: "说明文字", type: "text", rows: 2 },
            {
              name: "source",
              title: "内容来源",
              type: "string",
              initialValue: "latest",
              options: {
                list: [
                  { title: "最新文章", value: "latest" },
                  { title: "精选文章", value: "featured" },
                  { title: "指定分类", value: "category" },
                  { title: "手动选择", value: "manual" }
                ],
                layout: "radio"
              }
            },
            { name: "category", title: "指定分类", type: "reference", to: [{ type: "category" }] },
            { name: "manualPosts", title: "手动选择文章", type: "array", of: [{ type: "reference", to: [{ type: "post" }] }] },
            { name: "limit", title: "显示文章数量", type: "number", initialValue: 6 },
            columnsField,
            cardAspectField,
            backgroundField,
            spacingField
          ]
        }),
        defineArrayMember({
          name: "categoryGridSection",
          title: "分类列表板块",
          type: "object",
          fields: [
            { name: "eyebrow", title: "小标题", type: "string" },
            { name: "heading", title: "标题", type: "string" },
            { name: "text", title: "说明文字", type: "text", rows: 2 },
            columnsField,
            cardAspectField,
            backgroundField,
            spacingField
          ]
        }),
        defineArrayMember({
          name: "featureSection",
          title: "双列图文板块",
          type: "object",
          fields: [
            { name: "eyebrow", title: "小标题", type: "string" },
            { name: "heading", title: "标题", type: "string" },
            { name: "text", title: "说明文字", type: "text", rows: 3 },
            { name: "image", title: "图片", type: "image", options: { hotspot: true } },
            {
              name: "imageSide",
              title: "图片位置",
              type: "string",
              initialValue: "right",
              options: {
                list: [
                  { title: "左侧", value: "left" },
                  { title: "右侧", value: "right" }
                ],
                layout: "radio"
              }
            },
            { name: "buttonLabel", title: "按钮文字", type: "string" },
            { name: "buttonHref", title: "按钮链接", type: "string" },
            backgroundField,
            spacingField
          ]
        }),
        defineArrayMember({
          name: "bannerSection",
          title: "横幅板块",
          type: "object",
          fields: [
            { name: "eyebrow", title: "小标题", type: "string" },
            { name: "heading", title: "标题", type: "string" },
            { name: "text", title: "说明文字", type: "text", rows: 2 },
            { name: "image", title: "背景图片", type: "image", options: { hotspot: true } },
            { name: "buttonLabel", title: "按钮文字", type: "string" },
            { name: "buttonHref", title: "按钮链接", type: "string" },
            backgroundField,
            spacingField
          ]
        }),
        defineArrayMember({
          name: "mediaEmbedSection",
          title: "视频板块",
          type: "object",
          fields: [
            { name: "eyebrow", title: "小标题", type: "string" },
            { name: "heading", title: "标题", type: "string" },
            { name: "youtubeId", title: "YouTube 视频 ID", type: "string" },
            backgroundField,
            spacingField
          ]
        }),
        defineArrayMember({
          name: "adSection",
          title: "广告位板块",
          type: "object",
          fields: [
            { name: "label", title: "广告位提示文字", type: "string", initialValue: "广告位预留：AdSense 审核通过后接入" },
            backgroundField,
            spacingField
          ]
        })
      ]
    })
  ]
});
