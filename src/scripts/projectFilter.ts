const filterButtons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');
const projectCards = document.querySelectorAll<HTMLElement>('.project-card');
const emptyState = document.getElementById('projects-empty');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const activeFilter = button.dataset.filter ?? 'all';
    let visibleCount = 0;

    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach((card) => {
      const isVisible = activeFilter === 'all' || card.dataset.status === activeFilter;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyState) emptyState.hidden = visibleCount > 0;
  });
});

export {};
