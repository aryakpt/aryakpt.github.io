import { createNavbar, initNavbar } from "./components/navbar.js";
import { createFooter } from "./components/footer.js";

function getSlugFromPath() {
  // Path is /blogs/<slug>/
  const parts = window.location.pathname.replace(/\/$/, "").split("/");
  return parts[parts.length - 1];
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === "Coming Soon") return dateStr;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderPost(post) {
  document.title = `${post.title} — Arya Krisna Putra`;

  const page = document.getElementById("blog-detail-root");

  page.innerHTML = `
    <section class="blog-detail-page">
      <div class="blog-detail-inner">
        <div class="blog-detail-back">
          <a href="/blogs/" class="back-link"><span>←</span> Back to Blog</a>
        </div>
        <header class="blog-detail-header">
          <span class="blog-detail-cat">${post.category}</span>
          <h1 class="blog-detail-title">${post.title}</h1>
          <div class="blog-detail-meta">
            <span class="blog-detail-date">${formatDate(post.created_at)}</span>
            ${post.externalUrl ? `<a href="${post.externalUrl}" target="_blank" rel="noopener" class="blog-detail-external">View original post ↗</a>` : ""}
          </div>
        </header>
        <div class="blog-detail-content">
          ${post.content}
        </div>
      </div>
    </section>
  `;
}

function renderNotFound() {
  document.title = "Post Not Found — Arya Krisna Putra";
  document.getElementById("blog-detail-root").innerHTML = `
    <section class="blog-detail-page">
      <div class="blog-detail-inner">
        <div class="blog-detail-back">
          <a href="/blogs/" class="back-link"><span>←</span> Back to Blog</a>
        </div>
        <h1 class="blog-detail-title">Post not found</h1>
        <p style="color: var(--mid)">The article you're looking for doesn't exist or has been moved.</p>
      </div>
    </section>
  `;
}

document.addEventListener("DOMContentLoaded", async () => {
  const navRoot = document.getElementById("nav-root");
  const { nav, mobileMenu } = createNavbar("blog");
  navRoot.replaceWith(nav, mobileMenu);
  initNavbar("blog");

  document.getElementById("footer-root").replaceWith(createFooter());

  const slug = getSlugFromPath();

  try {
    const res = await fetch("/src/data/blogs.json");
    const blogs = await res.json();
    const post = blogs.find((b) => b.slug === slug);

    if (post && post.content) {
      renderPost(post);
    } else {
      renderNotFound();
    }
  } catch {
    renderNotFound();
  }
});
