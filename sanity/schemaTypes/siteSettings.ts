import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "站点设计设置",
  type: "document",
  fields: [
    defineField({ name: "title", title: "设置名称", type: "string", initialValue: "默认站点设计" }),
    defineField({
      name: "postCardAspect",
      title: "文章卡片图片比例",
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
    }),
    defineField({
      name: "categoryCardAspect",
      title: "分类卡片比例",
      type: "string",
      initialValue: "portrait",
      options: {
        list: [
          { title: "横版", value: "wide" },
          { title: "正方形", value: "square" },
          { title: "竖版", value: "portrait" }
        ],
        layout: "radio"
      }
    }),
    defineField({
      name: "articleCoverAspect",
      title: "文章封面比例",
      type: "string",
      initialValue: "wide",
      options: {
        list: [
          { title: "横版 16:9", value: "wide" },
          { title: "标准 4:3", value: "standard" },
          { title: "电影感 21:9", value: "cinema" }
        ],
        layout: "radio"
      }
    }),
    defineField({ name: "showAds", title: "显示广告位", type: "boolean", initialValue: true }),
    defineField({ name: "showArticleSidebar", title: "文章页显示侧边栏", type: "boolean", initialValue: true })
  ]
});
