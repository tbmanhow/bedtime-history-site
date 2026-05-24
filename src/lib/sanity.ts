import { posts as fallbackPosts, categories as fallbackCategories } from "@/data/content";

const hasSanityConfig = true;

export async function getAllPosts() {
  if (!hasSanityConfig) return fallbackPosts;

  try {
    const { sanityClient: client } = await import("sanity:client");
    const data = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      subtitle,
      excerpt,
      "category": category->slug.current,
      tags,
      featured,
      "date": publishedAt,
      readMinutes,
      "image": mainImage.asset->url,
      audio[]{
        title,
        "src": url,
        duration
      },
      video{
        title,
        "src": url,
        youtubeId,
        "poster": poster.asset->url
      },
      "body": body[]{
        ...,
        _type == "block" => {
          "text": children[].text
        }
      }
    }`);

    return data.map((post: any) => {
      const fallback = fallbackPosts.find((item) => item.slug === post.slug);
      return {
      ...post,
      image: post.image || fallback?.image || "/images/chunqiu-greece.jpg",
      date: post.date || fallback?.date || "",
      body: Array.isArray(post.body)
        ? post.body.map((block: any) => block.text).filter(Boolean)
        : fallback?.body || []
      };
    });
  } catch {
    return fallbackPosts;
  }
}

export async function getAllCategories() {
  if (!hasSanityConfig) return fallbackCategories;

  try {
    const { sanityClient: client } = await import("sanity:client");
    const data = await client.fetch(`*[_type == "category"] | order(name asc) {
      "slug": slug.current,
      name,
      description,
      "image": image.asset->url
    }`);

    return data.map((category: any) => {
      const fallback = fallbackCategories.find((item) => item.slug === category.slug);
      return {
        ...category,
        image: category.image || fallback?.image || "/images/chunqiu-greece.jpg"
      };
    });
  } catch {
    return fallbackCategories;
  }
}

export async function getSiteSettings() {
  try {
    const { sanityClient: client } = await import("sanity:client");
    return await client.fetch(`*[_type == "siteSettings"][0] {
      postCardAspect,
      categoryCardAspect,
      articleCoverAspect,
      showAds,
      showArticleSidebar
    }`);
  } catch {
    return null;
  }
}

export async function getAllPages() {
  try {
    const { sanityClient: client } = await import("sanity:client");
    return await client.fetch(`*[_type == "page"] {
      "slug": slug.current,
      title,
      description
    }`);
  } catch {
    return [];
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const { sanityClient: client } = await import("sanity:client");
    return await client.fetch(`*[_type == "page" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      description,
      sections[]{
        ...,
        image{
          "url": asset->url
        },
        body[]{
          ...,
          _type == "block" => {
            "text": children[].text
          }
        }
      }
    }`, { slug });
  } catch {
    return null;
  }
}
