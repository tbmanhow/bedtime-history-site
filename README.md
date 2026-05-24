# 睡前历史频道个人网站

这是一个面向“睡前历史频道”的独立内容网站项目。前台使用 Astro 生成静态网站，内容后台预留 Sanity CMS，部署目标为 Vercel。

## 当前状态

- 已包含首页、分类页、文章页、搜索页、关于页、联系页、隐私政策页和免责声明页。
- 已整理 8 篇样板文章与封面图，来源于当前素材目录。
- 已预留广告位，但没有插入 Google AdSense 代码。
- 已加入 Sanity 内容模型，后续可用后台发布文章和图片。

## 本机预览

当前电脑没有检测到 npm。可以先用无需安装依赖的静态预览：

```bash
node scripts/build-static-preview.mjs
python3 -m http.server 4321 -d dist
```

然后打开：

```text
http://localhost:4321
```

如果后面安装好 Node 包管理器：

```bash
npm install
npm run dev
```

## Sanity 后台

1. 在 Sanity 创建项目。
2. 复制 `.env.example` 为 `.env`，填写 `SANITY_STUDIO_PROJECT_ID` 和 `SANITY_STUDIO_DATASET`。
3. 安装依赖后运行：

```bash
npm run studio
```

## Vercel 上线

1. 把本项目上传到 GitHub。
2. 在 Vercel 导入该仓库。
3. 设置环境变量：

```text
SANITY_STUDIO_PROJECT_ID=bjuyde7l
SANITY_STUDIO_DATASET=production
SITE_URL=https://your-domain.com
```

不要把 `.env` 上传到 GitHub。`.env` 里有写入 Token，只能留在本机。

4. 部署成功后绑定正式域名。

## AdSense 准备

申请广告前建议先完成：

- 至少发布一批原创文章。
- 确认关于页、联系页、隐私政策页、免责声明页可访问。
- 确认没有空页面、坏链接和明显占位内容。
- 通过 Google Search Console 提交站点地图。
