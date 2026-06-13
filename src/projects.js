import { createProjectCard } from "./components/projectCard.js";
import { createNavbar, initNavbar } from "./components/navbar.js";
import { createFooter } from "./components/footer.js";

let allProjects = [];
let activeFilter = "all";

async function fetchProjects() {
  const res = await fetch("./src/data/projects.json");
  if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
  return res.json();
}

function renderGrid(projects) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="projects-empty">No projects found.</p>`;
    return;
  }

  filtered.forEach((project) => {
    grid.append(createProjectCard(project));
  });
}

function initFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      renderGrid(allProjects);
    });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const navRoot = document.getElementById("nav-root");
  const { nav, mobileMenu } = createNavbar("projects");
  navRoot.replaceWith(nav, mobileMenu);
  initNavbar("projects");

  document.getElementById("footer-root").replaceWith(createFooter());

  initFilter();

  allProjects = await fetchProjects();
  renderGrid(allProjects);
});
