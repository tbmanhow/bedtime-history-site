import { createClient } from "@sanity/client";
import { categories, posts } from "../src/data/content.ts";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID in .env");
}

if (!token) {
  throw new Error("Missing SANITY_WRITE_TOKEN in .env");
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-05-24",
  useCdn: false
});

const key = (value) => value.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80);

const block = (text, index) => ({
  _type: "block",
  _key: `block-${index}`,
  style: "normal",
  markDefs: [],
  children: [
    {
      _type: "span",
      _key: `span-${index}`,
      text,
      marks: []
    }
  ]
});

const categoryDocs = categories.map((category) => ({
  _id: `category.${category.slug}`,
  _type: "category",
  name: category.name,
  slug: {
    _type: "slug",
    current: category.slug
  },
  description: category.description
}));

const postDocs = posts.map((post) => ({
  _id: `post.${post.slug}`,
  _type: "post",
  title: post.title,
  subtitle: post.subtitle,
  slug: {
    _type: "slug",
    current: post.slug
  },
  excerpt: post.excerpt,
  category: {
    _type: "reference",
    _ref: `category.${post.category}`
  },
  tags: post.tags,
  publishedAt: `${post.date}T00:00:00.000Z`,
  featured: post.featured,
  readMinutes: post.readMinutes,
  audio: post.audio?.map((audio, index) => ({
    _key: `audio-${key(audio.title || String(index))}`,
    title: audio.title,
    url: audio.src?.startsWith("http") ? audio.src : undefined,
    duration: audio.duration
  })),
  video: post.video
    ? {
        title: post.video.title,
        youtubeId: post.video.youtubeId,
        url: post.video.src?.startsWith("http") ? post.video.src : undefined
      }
    : undefined,
  body: post.body.map(block)
}));

const settingsDoc = {
  _id: "siteSettings.default",
  _type: "siteSettings",
  title: "默认站点设计",
  postCardAspect: "wide",
  categoryCardAspect: "portrait",
  articleCoverAspect: "wide",
  showAds: true,
  showArticleSidebar: true
};

const pageDocs = [
  {
    _id: "page.home",
    _type: "page",
    title: "睡前历史",
    slug: { _type: "slug", current: "home" },
    description: "睡前历史频道首页",
    sections: [
      {
        _type: "heroSection",
        _key: "home-hero",
        eyebrow: "睡前历史频道内容库",
        heading: "睡前历史",
        text: "面向睡前听众的历史文字、音频与视频内容库。",
        style: "dark",
        primaryLabel: "阅读精选",
        primaryHref: "/articles/chunqiu-greece-parallel-worlds/"
      },
      {
        _type: "categoryGridSection",
        _key: "home-categories",
        eyebrow: "内容分类",
        heading: "像浏览一座历史展馆一样进入主题",
        text: "中国史、世界史、人物、事件、百科与城市故事。",
        columns: 3,
        cardAspect: "portrait",
        background: "soft",
        spacing: "normal"
      },
      {
        _type: "featureSection",
        _key: "home-feature",
        eyebrow: "频道精选",
        heading: "边听边读，把一期节目变成一套可回看的资料",
        text: "文章页支持文字、音频和 YouTube 视频，适合听众睡前收听，也适合观众回看画面内容。",
        imageSide: "right",
        buttonLabel: "查看赤壁之战",
        buttonHref: "/articles/battle-of-chibi/",
        background: "white",
        spacing: "normal"
      },
      {
        _type: "postGridSection",
        _key: "home-posts",
        eyebrow: "最新内容",
        heading: "最近整理的文字与图片",
        text: "从频道内容中整理适合继续阅读的文章。",
        source: "latest",
        limit: 6,
        columns: 3,
        cardAspect: "wide",
        background: "white",
        spacing: "normal"
      },
      {
        _type: "bannerSection",
        _key: "home-banner",
        eyebrow: "页面装修",
        heading: "每个页面都可以用板块自由组合",
        text: "你可以在后台调整板块顺序、背景、间距、卡片比例、列数和内容来源。",
        buttonLabel: "进入分类",
        buttonHref: "/categories/",
        background: "soft",
        spacing: "normal"
      },
      {
        _type: "adSection",
        _key: "home-ad",
        label: "广告位预留：AdSense 审核通过后接入",
        background: "gradient",
        spacing: "compact"
      }
    ]
  },
  {
    _id: "page.about",
    _type: "page",
    title: "关于睡前历史",
    slug: { _type: "slug", current: "about" },
    description: "关于睡前历史频道",
    sections: [
      {
        _type: "heroSection",
        _key: "about-hero",
        eyebrow: "关于频道",
        heading: "睡前历史",
        text: "别刷了，就这里，听着历史开睡吧。",
        style: "light"
      },
      {
        _type: "richTextSection",
        _key: "about-text",
        eyebrow: "频道介绍",
        heading: "把历史内容整理成可以反复观看的资料库",
        background: "white",
        spacing: "normal",
        body: [
          block("睡前历史是一个面向夜间听众的历史内容频道。网站用于整理频道中的文字稿、封面图、配图和延伸阅读。", 1),
          block("你可以在后台继续编辑这段文字，增加频道介绍、合作方式和平台链接。", 2)
        ]
      }
    ]
  }
];

const transaction = client.transaction();
for (const doc of [settingsDoc, ...pageDocs, ...categoryDocs, ...postDocs]) {
  transaction.createOrReplace(doc);
}

try {
  const result = await transaction.commit();
  console.log(`Imported ${categoryDocs.length} categories, ${postDocs.length} posts, ${pageDocs.length} pages, and site settings into ${projectId}/${dataset}.`);
  console.log(`Transaction ID: ${result.transactionId}`);
} catch (error) {
  console.error("Failed to import sample content.");
  console.error(`Reason: ${error?.message || "Unknown error"}`);
  process.exit(1);
}
