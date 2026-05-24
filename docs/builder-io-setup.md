# Builder.io 可视化设计接入说明

当前策略：Sanity 继续管理文章、分类、音频、视频等结构化内容；Builder.io 用来做可视化页面设计，例如首页、活动页、落地页、未来商品页。

## 需要准备

1. 注册或登录 Builder.io。
2. 创建一个 Space。
3. 创建一个 `page` model。
4. 找到 Public API Key。

## 本地环境变量

在 `.env` 中加入：

```bash
BUILDER_API_PUBLIC_KEY=你的Builder公开APIKey
BUILDER_PAGE_MODEL=page
```

Vercel 后台也要添加相同环境变量，然后重新部署。

## Builder 预览地址

本地：

```text
http://localhost:4321/builder-preview/
```

线上：

```text
https://lucyhasnomoney.com/builder-preview/
```

## 当前边界

- Builder.io 先作为页面设计器，不替代 Sanity 的文章后台。
- 没有配置 Builder API Key 时，网站不会坏，会显示现有 Astro 首页。
- 后续可以让 Builder 接管首页，或只负责专题页、商品页、活动页。
