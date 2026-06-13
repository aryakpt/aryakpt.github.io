export function createBlogCard(blog) {
  const hasDetail = blog.slug && blog.content;
  const href = hasDetail ? `/blogs/?post=${blog.slug}` : (blog.externalUrl ?? null);
  const dateLabel = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : blog.date ?? "Coming Soon";

  const card = document.createElement(href ? "a" : "div");
  card.className = "blog-card";
  if (href) {
    card.href = href;
    if (!hasDetail) card.target = "_blank";
    card.rel = "noopener";
  }

  card.innerHTML = `
    <span class="blog-card-cat">${blog.category}</span>
    <div class="blog-card-title">${blog.title}</div>
    <div class="blog-card-excerpt">${blog.excerpt}</div>
    <div class="blog-card-footer">
      <span class="blog-card-date">${dateLabel}</span>
      ${href ? `<span class="blog-card-read">${hasDetail ? "Read More →" : "Read Post ↗"}</span>` : ""}
    </div>
  `;
  return card;
}
