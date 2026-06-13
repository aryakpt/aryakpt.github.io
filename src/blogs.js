import { createBlogCard } from "./components/blogCard.js";
import { createNavbar, initNavbar } from "./components/navbar.js";
import { createFooter } from "./components/footer.js";

let allBlogs = [];
let activeFilter = "all";

async function fetchBlogs() {
  const res = await fetch("/src/data/blogs.json");
  if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.status}`);
  return res.json();
}

function renderGrid(blogs) {
  const grid = document.getElementById("blogs-grid");
  const note = document.getElementById("coming-soon-note");
  grid.innerHTML = "";

  const filtered =
    activeFilter === "all"
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

function initFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderGrid(allBlogs);
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const navRoot = document.getElementById("nav-root");
  const { nav, mobileMenu } = createNavbar("blog");
  navRoot.replaceWith(nav, mobileMenu);
  initNavbar("blog");

  document.getElementById("footer-root").replaceWith(createFooter());

  initFilter();

  allBlogs = await fetchBlogs();
  renderGrid(allBlogs);
});
