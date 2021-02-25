




// $('.scroll-page').on('click', function(e){
//     //ambil isi href page-scroll
//     var tujuan = $(this).attr('href');
//     //tangkap elemen tujuan
//     var elemenTujuan = $(tujuan);
    
//     $('body').animate({
//         scrollTop: elemenTujuan.offset().top
//     });
//     e.preventDefault();  
// });


// function navSlide(){
//     const burger = document.querySelector('.menu-toggle');
//     const nav = document.querySelector('.nav-links');
    
//     burger.addEventListener('click',() => {
//         //Toggle Nav
//         nav.classList.toggle('nav-active');
//         // Burger Animate
//         burger.classList.toggle('toggle');
//     });

// }

// $(document).ready(function(){
//     $(window).scroll(function(){
//         var scroll = $(window).scrollTop();
//         if (scroll > 700) {
//             $("nav").css("top" , "0px");
//             $("nav").css("opacity" , "1");
//         } else {
//             $("nav").css("top" , "-50px");
//         }
//         dh = $(document).height();
//         wh = $(window).height();
//         var height = (scroll / (dh-wh)) * 60;
//         var top = 50 - (scroll / (dh-wh)) * 30;
//         $(".scrollBar").css("height" , height + "vh");
//         $(".scrollBar").css("top" , top + "vh");
//     })
// })

// function call(){
//     // navSlide();
// }
// call();


