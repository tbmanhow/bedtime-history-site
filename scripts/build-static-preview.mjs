import { mkdir, rm, cp, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { categories, posts } from "../src/data/content.ts";
import { site } from "../src/data/site.ts";

const outDir = new URL("../dist/", import.meta.url);
const publicDir = new URL("../public/", import.meta.url);

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
}[char]));

const categoryName = (slug) => categories.find((item) => item.slug === slug)?.name || slug;

function shell(title, description, content) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)} | ${esc(site.name)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="/"><strong>${esc(site.name)}</strong><span>${esc(site.tagline)}</span></a>
      <nav class="nav">
        <a href="/">首页</a><a href="/categories/">分类</a><a href="/search/">搜索</a><a href="/about/">关于</a><a href="/contact/">联系</a>
      </nav>
    </div>
  </header>
  <main>${content}</main>
  <footer class="footer"><div class="container footer-inner"><div><strong>${esc(site.name)}</strong><p>${esc(site.description)}</p></div><div class="footer-links"><a href="/privacy/">隐私政策</a><a href="/disclaimer/">免责声明</a><a href="/contact/">联系</a></div></div></footer>
</body>
</html>`;
}

const postCard = (post) => `<article class="card">
  <a href="/articles/${post.slug}/"><img class="card-image" src="${post.image}" alt="${esc(post.title)}" loading="lazy"></a>
  <div class="card-body">
    <div class="meta"><span>${esc(categoryName(post.category))}</span><span>${post.readMinutes} 分钟阅读</span></div>
    <h3><a href="/articles/${post.slug}/">${esc(post.title)}</a></h3>
    <p>${esc(post.excerpt)}</p>
    <div class="meta">${post.tags.slice(0, 3).map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div>
  </div>
</article>`;

async function page(path, html) {
  const normalized = path ? `${path.replace(/\/$/, "")}/` : "";
  const dir = new URL(normalized, outDir);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL("index.html", dir), html);
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
if (existsSync(publicDir)) {
  await cp(publicDir, outDir, { recursive: true });
}
await cp(new URL("../src/styles/global.css", import.meta.url), new URL("style.css", outDir));

const hero = posts.find((post) => post.featured) || posts[0];
await page("", shell(site.name, site.description, `
<section class="hero"><img src="${hero.image}" alt="${esc(hero.title)}"><div class="container hero-content"><p class="eyebrow">睡前历史频道内容库</p><h1>${esc(site.name)}</h1><p>${esc(site.description)}</p><div class="actions"><a class="button" href="/articles/${hero.slug}/">阅读精选</a><a class="button secondary" href="/categories/">浏览分类</a></div></div></section>
<section><div class="container feature"><div class="feature-media"><img src="${hero.image}" alt="${esc(hero.title)}"></div><div><p class="eyebrow">精选文章</p><h2>${esc(hero.title)}</h2><p>${esc(hero.excerpt)}</p><a class="button" href="/articles/${hero.slug}/">进入正文</a></div></div></section>
<section><div class="container"><div class="section-head"><div><p class="eyebrow">内容分类</p><h2>按主题进入历史现场</h2></div><p>中国史、世界史、人物、事件、百科与城市故事，后续都可以通过后台持续扩充。</p></div><div class="grid category-grid">${categories.map((category) => `<a class="card" href="/categories/${category.slug}/"><img class="card-image" src="${category.image}" alt="${esc(category.name)}" loading="lazy"><div class="card-body"><h3>${esc(category.name)}</h3><p>${esc(category.description)}</p></div></a>`).join("")}</div></div></section>
<section><div class="container"><aside class="ad-slot">广告位预留：AdSense 审核通过后接入</aside></div></section>
<section><div class="container"><div class="section-head"><div><p class="eyebrow">最新内容</p><h2>最近整理的文字与图片</h2></div><a class="button" href="/search/">搜索文章</a></div><div class="grid posts-grid">${posts.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map(postCard).join("")}</div></div></section>
`));

await page("categories", shell("全部分类", "浏览全部分类", `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">分类</p><h1>全部历史主题</h1><p>每个分类都对应后续后台发布的内容入口。</p></div></section><section><div class="container grid category-grid">${categories.map((category) => `<a class="card" href="/categories/${category.slug}/"><img class="card-image" src="${category.image}" alt="${esc(category.name)}" loading="lazy"><div class="card-body"><div class="meta"><span>${posts.filter((post) => post.category === category.slug).length} 篇文章</span></div><h3>${esc(category.name)}</h3><p>${esc(category.description)}</p></div></a>`).join("")}</div></section>`));

for (const category of categories) {
  await page(`categories/${category.slug}`, shell(category.name, category.description, `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">分类</p><h1>${esc(category.name)}</h1><p>${esc(category.description)}</p></div></section><section><div class="container grid posts-grid">${posts.filter((post) => post.category === category.slug).map(postCard).join("")}</div></section>`));
}

for (const post of posts) {
  const related = posts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 2);
  await page(`articles/${post.slug}`, shell(post.title, post.excerpt, `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">${esc(categoryName(post.category))}</p><h1>${esc(post.title)}</h1><p>${esc(post.subtitle)}</p><div class="meta"><span>${post.date}</span><span>${post.readMinutes} 分钟阅读</span>${post.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}</div></div></section><section><div class="container article-layout"><article><img class="article-cover" src="${post.image}" alt="${esc(post.title)}"><div class="article-body">${post.body.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</div></article><aside class="sidebar"><aside class="ad-slot">文章侧边广告位预留</aside><div class="panel"><h3>内容来源</h3><p>样板文章整理自本地素材：${esc(post.sourcePath)}</p></div><div class="panel"><h3>继续阅读</h3>${related.length ? related.map((item) => `<p><a href="/articles/${item.slug}/">${esc(item.title)}</a></p>`).join("") : `<p><a href="/search/">浏览全部文章</a></p>`}</div></aside></div></section>`));
}

await page("search", shell("搜索", "搜索文章", `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">搜索</p><h1>查找文章</h1><p>按标题、摘要、标签或分类关键词筛选内容。</p></div></section><section><div class="container"><div class="search-box"><input id="searchInput" type="search" placeholder="输入关键词，例如：赤壁、韩信、一战、福州" autocomplete="off"></div><div id="searchResults" class="grid posts-grid">${posts.map(postCard).join("")}</div></div></section><script>
const posts = ${JSON.stringify(posts)};
const results = document.querySelector("#searchResults");
const input = document.querySelector("#searchInput");
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const card = (post) => \`<article class="card"><a href="/articles/\${post.slug}/"><img class="card-image" src="\${post.image}" alt="\${esc(post.title)}" loading="lazy"></a><div class="card-body"><div class="meta"><span>\${post.readMinutes} 分钟阅读</span><span>\${post.date}</span></div><h3><a href="/articles/\${post.slug}/">\${esc(post.title)}</a></h3><p>\${esc(post.excerpt)}</p><div class="meta">\${post.tags.slice(0, 3).map((tag) => \`<span class="tag">\${esc(tag)}</span>\`).join("")}</div></div></article>\`;
function render(items) { results.innerHTML = items.map(card).join(""); }
input.addEventListener("input", () => {
  const kw = input.value.trim().toLowerCase();
  render(kw ? posts.filter((post) => [post.title, post.subtitle, post.excerpt, post.category, post.tags.join(" ")].join(" ").toLowerCase().includes(kw)) : posts);
});
</script>`));

await page("about", shell("关于", "关于睡前历史频道", `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">关于频道</p><h1>${esc(site.name)}</h1><p>${esc(site.tagline)}</p></div></section><section><div class="container article-body"><p>睡前历史是一个面向夜间听众的历史内容频道。网站用于整理频道中的文字稿、封面图、配图和延伸阅读，让听众在听完节目后，也能用文字方式回看内容。</p><p>网站内容以中国历史、世界历史、历史人物、历史大事、历史百科和城市历史为主。第一版先展示精选样板文章，后续会通过后台持续发布更多稿件。</p></div></section>`));
await page("contact", shell("联系", "联系睡前历史频道", `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">联系</p><h1>联系频道</h1><p>商务合作、内容勘误、转载授权和听众反馈，都可以通过这里联系。</p></div></section><section><div class="container article-body"><p>邮箱：<a href="mailto:${site.email}">${site.email}</a></p><p>外部平台链接目前为占位，正式上线前可替换为 YouTube、Bilibili、小红书或播客平台主页。</p></div></section>`));
await page("privacy", shell("隐私政策", "隐私政策", `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">Privacy</p><h1>隐私政策</h1><p>本页面用于说明网站可能收集和使用的信息，后续接入广告前需要根据实际服务继续完善。</p></div></section><section><div class="container article-body"><p>本网站主要用于展示历史文字与图片内容。访问网站时，服务器和托管平台可能会记录基础访问日志，例如访问时间、浏览器类型、设备信息和页面请求，用于安全、性能和故障排查。</p><p>当网站后续接入 Google AdSense 或其他第三方广告服务时，第三方供应商包括 Google 可能会使用 Cookie 根据用户此前访问本网站或其他网站的情况投放广告。</p><p>用户可以访问 Google 广告设置页面选择停用个性化广告。若未来接入其他广告网络，本政策会补充相关供应商信息和退出方式。</p></div></section>`));
await page("disclaimer", shell("免责声明", "免责声明", `<section class="page-hero"><div class="container page-intro"><p class="eyebrow">Disclaimer</p><h1>免责声明</h1><p>历史内容会尽量保持准确、清晰和可读，但仍可能存在疏漏。</p></div></section><section><div class="container article-body"><p>本网站内容以历史科普和通俗讲述为目的，不构成专业学术结论或任何法律、投资、医疗等专业建议。</p><p>如发现事实错误、图片版权问题或引用不当，请通过联系页提供具体信息，我们会核查并及时处理。</p></div></section>`));

await writeFile(new URL("robots.txt", outDir), "User-agent: *\nAllow: /\n\nSitemap: /sitemap-index.xml\n");
await writeFile(new URL("sitemap-index.xml", outDir), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${["", "categories", "search", "about", "contact", "privacy", "disclaimer", ...categories.map((c) => `categories/${c.slug}`), ...posts.map((p) => `articles/${p.slug}`)].map((path) => `<url><loc>/${path}${path ? "/" : ""}</loc></url>`).join("")}</urlset>`);

console.log(`Static preview built at ${outDir.pathname}`);
