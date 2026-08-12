const carousel = document.getElementById('project-list');

if (carousel) {
  let isDragging = false;
  let startX = 0;
  let scrollLeft = 0;

  const getPageX = (event: MouseEvent | TouchEvent): number => {
    if ('touches' in event) return event.touches[0]?.pageX ?? startX;
    return event.pageX;
  };

  const onDragStart = (event: MouseEvent | TouchEvent): void => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = getPageX(event) - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  };

  const onDragMove = (event: MouseEvent | TouchEvent): void => {
    if (!isDragging) return;

    event.preventDefault();
    const x = getPageX(event) - carousel.offsetLeft;
    carousel.scrollLeft = scrollLeft - (x - startX);
  };

  const onDragEnd = (): void => {
    isDragging = false;
    carousel.classList.remove('dragging');
  };

  carousel.addEventListener('mousedown', onDragStart);
  carousel.addEventListener('mousemove', onDragMove);
  carousel.addEventListener('mouseup', onDragEnd);
  carousel.addEventListener('mouseleave', onDragEnd);
  carousel.addEventListener('touchstart', onDragStart, { passive: true });
  carousel.addEventListener('touchmove', onDragMove, { passive: false });
  carousel.addEventListener('touchend', onDragEnd);
}

export {};
