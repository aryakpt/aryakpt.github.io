//=============== Home =====================//
// const model = document.querySelector(".model");
// const container = document.querySelector("#home .container");

// container.addEventListener("mousemove", (e) => {
//   let xAxis = (window.innerWidth / 2 - e.pageX) / 15;
//   let yAxis = (window.innerHeight / 2 - e.pageY) / 20;

//   console.log(xAxis, yAxis);
//   model.style.transform = "rotateY(" + xAxis + "deg) rotateX(" + yAxis + "deg)";
// });

// container.addEventListener("mouseleave", (e) => {
//   model.style.transform = "rotateY(0deg) rotateX(0deg)";
//   model.style.transition = "all ease-in 0.5s";
// });

// container.addEventListener("mousein", (e) => {
//   model.style.transition = "none";
// });
const titleAnimate = document.querySelector(".title-animate");
window.addEventListener("scroll", (e) => {
  const nav = document.querySelector("nav");
  const position = window.scrollY;
  // console.log(window.innerHeight, window.scrollY);

  nav.classList.toggle("scrolled-down", position > 0);

  const titleAnimate = document.querySelector(".title-animate");
  titleAnimate.style.right = position / 1.5 + "px";
  titleAnimate.style.letterSpacing = position / 15 + "px";

  const titleAnimate2 = document.querySelector(".title-animate2");
  console.log(position / 3);
  titleAnimate2.style.left = position / 5 + "px";
  titleAnimate2.style.letterSpacing = position / 100 + "px";
});
