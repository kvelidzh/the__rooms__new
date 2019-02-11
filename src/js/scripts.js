new WOW().init();
$(document).ready(function(){
// $('.about__text').addClass('d-none');
  $('.testimonial').slick({
  	// autoplay: true,
  	// autoplaySpeed: 5000,
  	// dots: true,
  	// infinite: true,
  	speed: 600,
 	slidesToShow: 1,
 	prevArrow: '<img class="slick-prev" src="img/arrowLeft.png" alt="">',
 	nextArrow: '<svg class="slick-next" width="32px" height="32px"><use xlink:href="#arrowRight"></use></svg>',
  	// adaptiveHeight: true
  	responsive: [
	    {
	      breakpoint: 768,
	      settings: { 

		  infinite: true,
		  dots: true,
		  arrows: false
	      }
    }]
  });

   $('.multiple-items').slick({
      infinite: true,
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,

  responsive: [
      {
        breakpoint: 768,
        settings: {        
      infinite: true,
      dots: true,
      arrows: false
        }
    }]
    });

$('.portfolios').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 5,
 	nextArrow: '<svg class="slick-next" width="32px" height="32px"><use xlink:href="#arrowRight"></use></svg>',
  // slidesToShow: 3,
  // slidesToScroll: 1,
  // infinite: true,
  // dots: true,
  // arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {        
    slidesToShow: 1,
    infinite: true,
    dots: true,
    arrows: false,
      }
    }]
  // prevArrow: '<img class="slick-prev" src="img/arrowLeft.png" alt="">',


});


// $('.carousel').carousel({
//   interval: 10000
// });
});