const listView = document.getElementById('blog-list-view');
const detailViews = document.querySelectorAll<HTMLElement>('.blog-detail-view');
const notFoundView = document.getElementById('blog-not-found');
const blogCards = document.querySelectorAll<HTMLElement>('.blog-card');
const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
const emptyState = document.getElementById('blogs-empty');
const comingSoonNote = document.getElementById('coming-soon-note');
const slug = new URLSearchParams(window.location.search).get('post');

function setDocumentTitle(title: string): void {
  document.title = `${title} - Arya Krisna Putra`;
}

if (slug) {
  listView?.setAttribute('hidden', '');

  let found = false;
  detailViews.forEach((view) => {
    const isMatch = view.dataset.postSlug === slug;
    view.hidden = !isMatch;
    if (isMatch) {
      found = true;
      const title = view.querySelector('.blog-detail-title')?.textContent;
      if (title) setDocumentTitle(title);
    }
  });

  if (!found) {
    notFoundView?.removeAttribute('hidden');
    setDocumentTitle('Post Not Found');
  }
} else {
  detailViews.forEach((view) => {
    view.hidden = true;
  });
  notFoundView?.setAttribute('hidden', '');
  setDocumentTitle('Blog');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const activeFilter = button.dataset.filter ?? 'all';
    let visibleCount = 0;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    blogCards.forEach((card) => {
      const category = card.querySelector('.blog-card-cat')?.textContent;
      const isVisible = activeFilter === 'all' || category === activeFilter;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount > 0;
    if (comingSoonNote) comingSoonNote.style.display = visibleCount > 0 ? 'flex' : 'none';
  });
});

export {};
