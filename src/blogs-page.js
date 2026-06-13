import { createBlogCard } from "./components/blogCard.js";
import { createNavbar, initNavbar } from "./components/navbar.js";
import { createFooter } from "./components/footer.js";

async function fetchBlogs() {
  const res = await fetch("/src/data/blogs.json");
  if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
  return res.json();
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === "Coming Soon") return dateStr;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ─── LIST VIEW ───────────────────────────────────────────────────────────────

function renderList(blogs) {
  document.title = "Blog — Arya Krisna Putra";

  document.getElementById("blogs-page-root").innerHTML = `
    <section class="page-header">
      <div class="page-header-inner">
        <a href="/" class="back-link"><span>←</span> Back to Home</a>
        <p class="section-label">BLOG</p>
        <h1 class="page-header-title">Writings &amp; Research Notes</h1>
        <p class="page-header-desc">
          Technical articles, research summaries, and engineering insights — from frontend architecture to AI research.
        </p>
      </div>
    </section>

    <div class="blogs-page-filter">
      <div class="blogs-page-filter-inner">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="Artificial Intelligence">Artificial Intelligence</button>
        <button class="filter-btn" data-filter="Engineering">Engineering</button>
        <button class="filter-btn" data-filter="Tutorial">Tutorial</button>
      </div>
    </div>

    <section class="blogs-page">
      <div class="blogs-page-inner">
        <div class="blogs-grid" id="blogs-grid"></div>
        <p class="blog-coming-soon" id="coming-soon-note" style="display:none">
          Articles coming soon — more posts will be published here.
        </p>
      </div>
    </section>
  `;

  let activeFilter = "all";

  function renderGrid() {
    const grid = document.getElementById("blogs-grid");
    const note = document.getElementById("coming-soon-note");
    grid.innerHTML = "";

    const filtered = activeFilter === "all"
      ? blogs
      : blogs.filter((b) => b.category === activeFilter);

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="blogs-empty">No posts found in this category.</p>`;
      note.style.display = "none";
      return;
    }

    filtered.forEach((blog) => grid.append(createBlogCard(blog)));
    note.style.display = "flex";
  }

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderGrid();
    });
  });

  renderGrid();
}

// ─── DETAIL VIEW ─────────────────────────────────────────────────────────────

function renderDetail(post) {
  document.title = `${post.title} — Arya Krisna Putra`;

  document.getElementById("blogs-page-root").innerHTML = `
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
  document.getElementById("blogs-page-root").innerHTML = `
    <section class="blog-detail-page">
      <div class="blog-detail-inner">
        <div class="blog-detail-back">
          <a href="/blogs/" class="back-link"><span>←</span> Back to Blog</a>
        </div>
        <h1 class="blog-detail-title">Post not found</h1>
        <p style="color: var(--mid); margin-top: 12px;">The article you're looking for doesn't exist or has been moved.</p>
      </div>
    </section>
  `;
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
  const navRoot = document.getElementById("nav-root");
  const { nav, mobileMenu } = createNavbar("blog");
  navRoot.replaceWith(nav, mobileMenu);
  initNavbar("blog");

  document.getElementById("footer-root").replaceWith(createFooter());

  const slug = new URLSearchParams(window.location.search).get("post");
  const blogs = await fetchBlogs();

  if (slug) {
    const post = blogs.find((b) => b.slug === slug);
    if (post && post.content) {
      renderDetail(post);
    } else {
      renderNotFound();
    }
  } else {
    renderList(blogs);
  }
});
