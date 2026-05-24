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
BUILDER_HOMEPAGE_ENABLED=false
```

Vercel 后台也要添加相同环境变量，然后重新部署。

## 首页切换开关

默认网站首页仍然使用 Astro 原生首页，保证线上稳定。

当你已经在 Builder 里把首页内容做好并发布后，再把：

```bash
BUILDER_HOMEPAGE_ENABLED=true
```

加到本地 `.env` 和 Vercel 环境变量里。这样首页 `/` 才会真正切换为 Builder 驱动。

## Builder 预览地址

本地：

```text
http://localhost:4321/builder-preview/
```

线上：

```text
https://lucyhasnomoney.com/builder-preview/
```

## Builder 编辑方式

现在不要把 Builder 当成“整页截图编辑器”，而是当成“首页模块编辑器”来用。

在 Builder 里新建或清空首页后，从 `Insert -> Custom Components` 插入这些模块：

- `首页 Hero`
- `图文故事区`
- `短条信息区`
- `订阅区`
- `页脚区`

每个模块都可以在右侧面板直接编辑标题、说明、按钮、图片和链接。

推荐首页顺序：

1. `首页 Hero`
2. `短条信息区`
3. `图文故事区`
4. `图文故事区`
5. `订阅区`
6. `页脚区`

## 当前边界

- Builder.io 现在用于首页可视化模块编辑，不替代 Sanity 的文章后台。
- 没有配置 Builder API Key 时，网站不会坏，会显示现有 Astro 首页。
- `BUILDER_HOMEPAGE_ENABLED=false` 时，首页继续使用现有 Astro 首页。
- `BUILDER_HOMEPAGE_ENABLED=true` 时，首页 `/` 改由 Builder 接管。
- 后续可以继续往 Builder 注册更多首页模块，例如文章卡片墙、视频区、商品区、会员区。
