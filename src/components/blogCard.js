export function createBlogCard(blog) {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.innerHTML = `
    <span class="blog-card-cat">${blog.category}</span>
    <div class="blog-card-title">${blog.title}</div>
    <div class="blog-card-excerpt">${blog.excerpt}</div>
    <div class="blog-card-footer">
      <span class="blog-card-date">${blog.date}</span>
      <span class="blog-card-read">Read More →</span>
    </div>
  `;
  return card;
}
