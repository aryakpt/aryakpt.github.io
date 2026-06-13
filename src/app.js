import { createSkillChip } from "./utils/createElementUtil.js";
import { createProjectCard } from "./components/projectCard.js";
import { createBlogCard } from "./components/blogCard.js";
import { createNavbar, initNavbar } from "./components/navbar.js";
import { createFooter } from "./components/footer.js";

const skills = [
  "JavaScript", "TypeScript", "ReactJS", "Dart", "Flutter",
  "PHP", "Laravel", "CodeIgniter 4", "FastAPI", "NestJS",
  "Bootstrap", "Tailwind CSS", "Material UI", "Ant Design", "HTML/CSS",
];

async function fetchData(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json();
}

function pickRandom(list, count) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, count);
}

function renderSkills() {
  const container = document.getElementById("skills-list");
  skills.forEach((skill) => {
    container.append(createSkillChip(skill));
  });
}

function renderProjects(projects) {
  const container = document.getElementById("project-list");
  const count = Math.random() < 0.5 ? 4 : 5;
  pickRandom(projects, count).forEach((project) => {
    container.append(createProjectCard(project));
  });
}

function renderBlogs(blogs) {
  const container = document.getElementById("blog-list");
  pickRandom(blogs, 3).forEach((blog) => {
    container.append(createBlogCard(blog));
  });
}

function initCarousel() {
  const carousel = document.getElementById("project-list");
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const onDragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = (e.pageX ?? e.touches?.[0]?.pageX) - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = (e.pageX ?? e.touches?.[0]?.pageX) - carousel.offsetLeft;
    carousel.scrollLeft = scrollLeft - (x - startX);
  };

  const onDragEnd = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  carousel.addEventListener("mousedown", onDragStart);
  carousel.addEventListener("mousemove", onDragMove);
  carousel.addEventListener("mouseup", onDragEnd);
  carousel.addEventListener("mouseleave", onDragEnd);
  carousel.addEventListener("touchstart", onDragStart, { passive: true });
  carousel.addEventListener("touchmove", onDragMove, { passive: false });
  carousel.addEventListener("touchend", onDragEnd);
}

document.addEventListener("DOMContentLoaded", async () => {
  const navRoot = document.getElementById("nav-root");
  const { nav, mobileMenu } = createNavbar("home");
  navRoot.replaceWith(nav, mobileMenu);
  initNavbar("home");

  document.getElementById("footer-root").replaceWith(createFooter());

  renderSkills();
  initCarousel();

  const [projects, blogs] = await Promise.all([
    fetchData("./src/data/projects.json"),
    fetchData("./src/data/blogs.json"),
  ]);

  renderProjects(projects);
  renderBlogs(blogs);
});
