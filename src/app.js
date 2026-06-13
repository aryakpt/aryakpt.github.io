import projects from "./constants/projects.js";
import blogs from "./constants/blogs.js";
import createElementUtil from "./utils/createElementUtil.js";

const skills = [
  "JavaScript", "TypeScript", "ReactJS", "Dart", "Flutter",
  "PHP", "Laravel", "CodeIgniter 4", "FastAPI", "NestJS",
  "Bootstrap", "Tailwind CSS", "Material UI", "Ant Design", "HTML/CSS",
];

function renderSkills() {
  const container = document.getElementById("skills-list");
  skills.forEach((skill) => {
    container.append(createElementUtil.createSkillChip(skill));
  });
}

function pickRandomProjects(list) {
  const count = Math.random() < 0.5 ? 4 : 5;
  const shuffled = [...list].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function renderProjects() {
  const container = document.getElementById("project-list");
  const selected = pickRandomProjects(projects);
  selected.forEach((project) => {
    container.append(createElementUtil.createProjectCard(project));
  });
}

function renderBlogs() {
  const container = document.getElementById("blog-list");
  blogs.forEach((blog) => {
    container.append(createElementUtil.createBlogCard(blog));
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

function initNavbar() {
  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-mobile-menu");

  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    toggle.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggle.innerHTML = "&#9776;";
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
      if (
        scrollY >= section.offsetTop &&
        scrollY < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${section.id}`);
        });
      }
    });
  }, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects();
  renderBlogs();
  initCarousel();
  initNavbar();
});
