const toggle = document.getElementById('nav-toggle') as HTMLButtonElement | null;
const mobileMenu = document.getElementById('nav-mobile-menu');
const nav = document.getElementById('navbar');
const activePage = nav?.dataset.activePage;

if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.innerHTML = '&#9776;';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (activePage === 'home') {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a');

  window.addEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY + 100;

      sections.forEach((section) => {
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `/#${section.id}` || href === `#${section.id}`);
          });
        }
      });
    },
    { passive: true },
  );
}

export {};
