import { SITE_URL } from "@/components/seo/JsonLd";
import { POSTS_PER_PAGE, blogPagePath, postPath } from "./blog";

const abs = (path) => `${SITE_URL}${path === "/" ? "" : path}`;

const slugifyAuthor = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** BlogPosting + the WebPage it lives on, for a single article. */
export function articleSchema(post) {
  const url = abs(postPath(post.slug));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        isPartOf: { "@id": `${url}#webpage` },
        mainEntityOfPage: { "@id": `${url}#webpage` },
        headline: post.title,
        description: post.metaDescription,
        articleSection: post.category.name,
        inLanguage: "en-MY",
        wordCount: post.words,
        timeRequired: `PT${post.minutes}M`,
        datePublished: post.date,
        dateModified: post.modified || post.date,
        author: {
          "@type": "Organization",
          "@id": `${SITE_URL}#author-${slugifyAuthor(post.author)}`,
          name: post.author,
          url: `${SITE_URL}/about`,
          parentOrganization: { "@id": `${SITE_URL}#organization` },
        },
        publisher: { "@id": `${SITE_URL}#organization` },
        ...(post.image
          ? { image: { "@type": "ImageObject", url: post.image, caption: post.imageAlt } }
          : {}),
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: post.metaTitle,
        description: post.metaDescription,
        isPartOf: { "@id": `${SITE_URL}#website` },
        inLanguage: "en-MY",
        datePublished: post.date,
        dateModified: post.modified || post.date,
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(post.image ? { primaryImageOfPage: { "@type": "ImageObject", url: post.image } } : {}),
      },
    ],
  };
}

export function faqSchema(post) {
  if (!post.faqs?.length) return null;
  const url = abs(postPath(post.slug));

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": `${url}#webpage` },
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function blogListingSchema({ posts, page }) {
  const path = blogPagePath(page);
  const url = abs(path);
  const name = page === 1 ? "Launch Laundry Blog" : `Launch Laundry Blog — Page ${page}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${abs("/blog")}#blog`,
        url: abs("/blog"),
        name: "Launch Laundry Blog",
        description:
          "Guides on commercial laundry equipment, spare parts and running a profitable laundromat in Malaysia.",
        inLanguage: "en-MY",
        publisher: { "@id": `${SITE_URL}#organization` },
      },
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name,
        isPartOf: { "@id": `${SITE_URL}#website` },
        about: { "@id": `${abs("/blog")}#blog` },
        inLanguage: "en-MY",
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: posts.length,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: posts.map((post, i) => ({
            "@type": "ListItem",
            position: (page - 1) * POSTS_PER_PAGE + i + 1,
            url: abs(postPath(post.slug)),
            name: post.title,
          })),
        },
      },
    ],
  };
}
