const titleAnimate = document.querySelector('.title-animate');
window.addEventListener('scroll', (e) => {
  const position = window.scrollY;

  const nav = document.querySelector('nav');
  nav.classList.toggle('scrolled-down', position > 0);

  const titleAnimate = document.querySelector('.title-animate');
  titleAnimate.style.right = position / 1.5 + 'px';
  titleAnimate.style.letterSpacing = position / 15 + 'px';

  const titleAnimate2 = document.querySelector('.title-animate2');
  titleAnimate2.style.left = position / 5 + 'px';
  titleAnimate2.style.letterSpacing = position / 100 + 'px';
});
