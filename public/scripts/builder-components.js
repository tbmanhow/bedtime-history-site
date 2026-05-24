(function () {
  if (typeof window === "undefined") return;
  if (window.__bedtimeHistoryBuilderRegistered) return;
  window.__bedtimeHistoryBuilderRegistered = true;

  const escapeHtml = (value = "") =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const safeUrl = (value = "#") => {
    const text = String(value || "").trim();
    return text || "#";
  };

  const createButton = (label, href, variant = "primary") => {
    if (!label) return "";
    const className = variant === "secondary" ? "bh-button bh-button-secondary" : "bh-button";
    return `<a class="${className}" href="${escapeHtml(safeUrl(href))}">${escapeHtml(label)}</a>`;
  };

  class BedtimeHero extends HTMLElement {
    static get observedAttributes() {
      return [
        "eyebrow",
        "title",
        "subtitle",
        "description",
        "primary-label",
        "primary-href",
        "secondary-label",
        "secondary-href",
        "feature-eyebrow",
        "feature-title",
        "feature-description",
        "feature-meta",
        "feature-image"
      ];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const eyebrow = this.getAttribute("eyebrow") || "BEDTIME HISTORY STUDIO";
      const title = this.getAttribute("title") || "睡前历史";
      const subtitle = this.getAttribute("subtitle") || "把历史变成睡前的一场电影。";
      const description =
        this.getAttribute("description") ||
        "面向睡前听众的历史文字与图片内容库，整理中国史、世界史、历史人物、历史大事与城市故事。";
      const featureEyebrow = this.getAttribute("feature-eyebrow") || "TONIGHT'S FEATURE";
      const featureTitle = this.getAttribute("feature-title") || "东周与希腊：同一时代的不同答案";
      const featureDescription =
        this.getAttribute("feature-description") ||
        "当周天子在洛邑失去权威，地中海另一端正推动公民事务。同一时间，不同文明给出了完全不同的政治答案。";
      const featureMeta = this.getAttribute("feature-meta") || "睡前听段历史";
      const featureImage = this.getAttribute("feature-image") || "/images/chunqiu-greece.jpg";

      this.innerHTML = `
        <section class="bh-hero">
          <div class="bh-hero-grid">
            <div class="bh-hero-copy">
              <p class="bh-eyebrow">${escapeHtml(eyebrow)}</p>
              <h1>${escapeHtml(title)}</h1>
              <p class="bh-subtitle">${escapeHtml(subtitle)}</p>
              <p class="bh-description">${escapeHtml(description)}</p>
              <div class="bh-button-row">
                ${createButton(this.getAttribute("primary-label") || "进入今晚精选", this.getAttribute("primary-href") || "/search/")}
                ${createButton(
                  this.getAttribute("secondary-label") || "浏览历史档案",
                  this.getAttribute("secondary-href") || "/categories/",
                  "secondary"
                )}
              </div>
            </div>
            <article class="bh-feature-card">
              <img src="${escapeHtml(featureImage)}" alt="${escapeHtml(featureTitle)}" loading="lazy" />
              <div class="bh-feature-overlay"></div>
              <div class="bh-feature-copy">
                <p class="bh-eyebrow">${escapeHtml(featureEyebrow)}</p>
                <h2>${escapeHtml(featureTitle)}</h2>
                <p class="bh-feature-meta">${escapeHtml(featureMeta)}</p>
                <p class="bh-feature-description">${escapeHtml(featureDescription)}</p>
              </div>
            </article>
          </div>
        </section>
      `;
    }
  }

  class BedtimeSplitStory extends HTMLElement {
    static get observedAttributes() {
      return ["eyebrow", "title", "body", "image", "image-alt", "alignment"];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const alignment = this.getAttribute("alignment") === "image-left" ? "image-left" : "";
      const image = this.getAttribute("image") || "/images/suitang-world.jpg";
      const imageAlt = this.getAttribute("image-alt") || this.getAttribute("title") || "故事配图";

      this.innerHTML = `
        <section class="bh-section-band">
          <div class="bh-split-story ${alignment}">
            <div class="bh-story-copy">
              <p class="bh-eyebrow">${escapeHtml(this.getAttribute("eyebrow") || "BRAND STORY")}</p>
              <h2>${escapeHtml(this.getAttribute("title") || "把历史整理成适合夜间进入的版本")}</h2>
              <p>${escapeHtml(
                this.getAttribute("body") ||
                  "这里不是碎片化知识流，而是把一个人物、一座城市、一个朝代、一段制度慢慢讲清楚。听众不是为了刷过，而是为了在安静的时候反复回来。"
              )}</p>
            </div>
            <div class="bh-story-media">
              <img src="${escapeHtml(image)}" alt="${escapeHtml(imageAlt)}" loading="lazy" />
            </div>
          </div>
        </section>
      `;
    }
  }

  class BedtimeStatStrip extends HTMLElement {
    static get observedAttributes() {
      return ["item-1", "item-2", "item-3", "item-4"];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const items = [
        this.getAttribute("item-1") || "长篇历史内容",
        this.getAttribute("item-2") || "音频 / YouTube 预留",
        this.getAttribute("item-3") || "未来商品与会员",
        this.getAttribute("item-4") || "AdSense Ready"
      ];

      this.innerHTML = `
        <section class="bh-stat-strip">
          <div class="bh-stat-grid">
            ${items.map((item) => `<div class="bh-stat-item">${escapeHtml(item)}</div>`).join("")}
          </div>
        </section>
      `;
    }
  }

  class BedtimeNewsletter extends HTMLElement {
    static get observedAttributes() {
      return ["eyebrow", "title", "body", "button-label", "placeholder"];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = `
        <section class="bh-newsletter-band">
          <div class="bh-newsletter-card">
            <div>
              <p class="bh-eyebrow">${escapeHtml(this.getAttribute("eyebrow") || "NEWSLETTER")}</p>
              <h2>${escapeHtml(this.getAttribute("title") || "每周收到一封睡前历史信")}</h2>
              <p>${escapeHtml(
                this.getAttribute("body") ||
                  "把一段值得慢慢讲完的历史人物、制度、城市或战争整理成更适合收藏和转发的版本。"
              )}</p>
            </div>
            <form class="bh-newsletter-form">
              <input type="email" placeholder="${escapeHtml(this.getAttribute("placeholder") || "输入你的邮箱")}" />
              <button type="button">${escapeHtml(this.getAttribute("button-label") || "加入名单")}</button>
            </form>
          </div>
        </section>
      `;
    }
  }

  class BedtimeFooter extends HTMLElement {
    static get observedAttributes() {
      return ["brand", "description", "link-1-label", "link-1-href", "link-2-label", "link-2-href", "link-3-label", "link-3-href"];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const links = [
        [this.getAttribute("link-1-label") || "隐私政策", this.getAttribute("link-1-href") || "/privacy/"],
        [this.getAttribute("link-2-label") || "免责声明", this.getAttribute("link-2-href") || "/disclaimer/"],
        [this.getAttribute("link-3-label") || "联系", this.getAttribute("link-3-href") || "/contact/"]
      ];

      this.innerHTML = `
        <footer class="bh-footer-band">
          <div class="bh-footer-grid">
            <div>
              <strong>${escapeHtml(this.getAttribute("brand") || "睡前历史")}</strong>
              <p>${escapeHtml(
                this.getAttribute("description") ||
                  "面向睡前听众的历史文字与图片内容站，未来将逐步接入音频、视频、会员和精选内容产品。"
              )}</p>
            </div>
            <nav class="bh-footer-links">
              ${links
                .map(([label, href]) => `<a href="${escapeHtml(safeUrl(href))}">${escapeHtml(label)}</a>`)
                .join("")}
            </nav>
          </div>
        </footer>
      `;
    }
  }

  const define = (tag, Klass) => {
    if (!customElements.get(tag)) {
      customElements.define(tag, Klass);
    }
  };

  define("bh-hero", BedtimeHero);
  define("bh-split-story", BedtimeSplitStory);
  define("bh-stat-strip", BedtimeStatStrip);
  define("bh-newsletter", BedtimeNewsletter);
  define("bh-footer", BedtimeFooter);

  const builderInputs = {
    hero: [
      { name: "eyebrow", type: "string", defaultValue: "BEDTIME HISTORY STUDIO" },
      { name: "title", type: "string", defaultValue: "睡前历史" },
      { name: "subtitle", type: "string", defaultValue: "把历史变成睡前的一场电影。" },
      { name: "description", type: "longText" },
      { name: "primary-label", type: "string", defaultValue: "进入今晚精选" },
      { name: "primary-href", type: "url", defaultValue: "/search/" },
      { name: "secondary-label", type: "string", defaultValue: "浏览历史档案" },
      { name: "secondary-href", type: "url", defaultValue: "/categories/" },
      { name: "feature-eyebrow", type: "string", defaultValue: "TONIGHT'S FEATURE" },
      { name: "feature-title", type: "string", defaultValue: "东周与希腊：同一时代的不同答案" },
      { name: "feature-meta", type: "string", defaultValue: "睡前听段历史" },
      { name: "feature-description", type: "longText" },
      { name: "feature-image", type: "file", allowedFileTypes: ["jpeg", "jpg", "png", "webp"] }
    ],
    split: [
      { name: "eyebrow", type: "string", defaultValue: "BRAND STORY" },
      { name: "title", type: "string", defaultValue: "把历史整理成适合夜间进入的版本" },
      { name: "body", type: "longText" },
      { name: "image", type: "file", allowedFileTypes: ["jpeg", "jpg", "png", "webp"] },
      { name: "image-alt", type: "string" },
      {
        name: "alignment",
        type: "string",
        enum: ["image-right", "image-left"],
        defaultValue: "image-right"
      }
    ],
    strip: [
      { name: "item-1", type: "string", defaultValue: "长篇历史内容" },
      { name: "item-2", type: "string", defaultValue: "音频 / YouTube 预留" },
      { name: "item-3", type: "string", defaultValue: "未来商品与会员" },
      { name: "item-4", type: "string", defaultValue: "AdSense Ready" }
    ],
    newsletter: [
      { name: "eyebrow", type: "string", defaultValue: "NEWSLETTER" },
      { name: "title", type: "string", defaultValue: "每周收到一封睡前历史信" },
      { name: "body", type: "longText" },
      { name: "placeholder", type: "string", defaultValue: "输入你的邮箱" },
      { name: "button-label", type: "string", defaultValue: "加入名单" }
    ],
    footer: [
      { name: "brand", type: "string", defaultValue: "睡前历史" },
      { name: "description", type: "longText" },
      { name: "link-1-label", type: "string", defaultValue: "隐私政策" },
      { name: "link-1-href", type: "url", defaultValue: "/privacy/" },
      { name: "link-2-label", type: "string", defaultValue: "免责声明" },
      { name: "link-2-href", type: "url", defaultValue: "/disclaimer/" },
      { name: "link-3-label", type: "string", defaultValue: "联系" },
      { name: "link-3-href", type: "url", defaultValue: "/contact/" }
    ]
  };

  window.builderWcLoadCallbacks = window.builderWcLoadCallbacks || [];
  window.builderWcLoadCallbacks.push((Builder) => {
    Builder.registerComponent("bh-hero", {
      name: "首页 Hero",
      inputs: builderInputs.hero
    });
    Builder.registerComponent("bh-split-story", {
      name: "图文故事区",
      inputs: builderInputs.split
    });
    Builder.registerComponent("bh-stat-strip", {
      name: "短条信息区",
      inputs: builderInputs.strip
    });
    Builder.registerComponent("bh-newsletter", {
      name: "订阅区",
      inputs: builderInputs.newsletter
    });
    Builder.registerComponent("bh-footer", {
      name: "页脚区",
      inputs: builderInputs.footer
    });
  });
})();
