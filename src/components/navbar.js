const NAV_LINKS = [
  { label: "Home",     href: "/#home" },
  { label: "About",    href: "/#about" },
  { label: "Projects", href: "/projects/" },
  { label: "Blog",     href: "/blogs/" },
  { label: "Contact",  href: "/#contact" },
];

const RESUME_HREF =
  "https://docs.google.com/document/d/1cpi7Gid61lW3T3jTxbhPf_bfajchCAo8/edit?usp=sharing&ouid=103277840525621454634&rtpof=true&sd=true";

function buildLinks(activePage, mobile = false) {
  return NAV_LINKS.map(({ label, href }) => {
    const isActive = label.toLowerCase() === activePage.toLowerCase();
    return `<a href="${href}"${isActive ? ' class="active"' : ""}>${label}</a>`;
  }).join("");
}

export function createNavbar(activePage = "home") {
  const nav = document.createElement("nav");
  nav.id = "navbar";
  nav.innerHTML = `
    <a class="nav-logo" href="/">AK</a>
    <div class="nav-links">
      ${buildLinks(activePage)}
      <a href="${RESUME_HREF}" target="_blank" class="btn-outline">Resume</a>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">&#9776;</button>
  `;

  const mobileMenu = document.createElement("div");
  mobileMenu.className = "nav-mobile-menu";
  mobileMenu.id = "nav-mobile-menu";
  mobileMenu.innerHTML = `
    ${buildLinks(activePage, true)}
    <a href="${RESUME_HREF}" target="_blank" class="btn-outline" style="align-self:flex-start">Resume</a>
  `;

  return { nav, mobileMenu };
}

export function initNavbar(activePage = "home") {
  const toggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("nav-mobile-menu");

  toggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    toggle.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      toggle.innerHTML = "&#9776;";
    });
  });

  // Scroll-based active link — only relevant on index.html
  if (activePage === "home") {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener(
      "scroll",
      () => {
        const scrollY = window.scrollY + 100;
        sections.forEach((section) => {
          if (
            scrollY >= section.offsetTop &&
            scrollY < section.offsetTop + section.offsetHeight
          ) {
            navLinks.forEach((link) => {
              const href = link.getAttribute("href");
              link.classList.toggle(
                "active",
                href === `/#${section.id}` || href === `#${section.id}`
              );
            });
          }
        });
      },
      { passive: true }
    );
  }
}
