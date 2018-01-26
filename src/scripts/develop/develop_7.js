function checkDropdown(){
  $('.header-menu li').each(function () {
    if ( $(this).find('ul').length > 0 ) {
      $(this).addClass('dropdown');
    } 
  });
}

// function dropdown(){
//   if( $(window).width() <= 1024 ) {
//     $('.dropdown a').on('click', function(e) {
//       e.preventDefault();
//       var hideMenu = $(this).next('ul');
//       if ( hideMenu.css('display') == 'none' ) {
//         hideMenu.slideDown();
//       } else {
//         hideMenu.slideUp();
//       };
//     });
//   }
// }


function mainSlider(selector){
  $(selector).slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false
  });
};

//Begin Google Map
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: mapCenterY, lng: mapCenterX},
    zoom: mapZoom,
    scrollwheel: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
  });

  var marker = new google.maps.Marker({
    position: {lat: mapCenterY, lng: mapCenterX},
    map: map
  });
}
//End Google Map



//Burger Menu 1024
function burger(){
  var menu = $('.header-menu');
  $('.burger').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('open');

    if ($('.burger').hasClass('active')) {
      menu.slideUp('fast');
      $(this).removeClass('active');
    } else {
      menu.slideDown('fast');
      menu.attr( "style", "display: flex" );
      $(this).addClass('active');
    }
  });

  $(window).resize(function() {
    var menu = $('.header-menu');
    var w = $(window).width();
    if(w > 1024) {
      menu.removeAttr('style');
      $('.burger').removeClass('open');
      $('.burger').removeClass('active');
    }
  });
};

$(document).ready(function(){
  checkDropdown();
  burger();
  mainSlider('.main-slider');
  if ( $('.contacts').length > 0
    && mapCenterY !== "undefined"
    && mapCenterX !== "undefined"
    && mapZoom !== "undefined" ) {
    initMap();
  }
  $('.lang-wrap .lang').click(function(e) {
    e.preventDefault();
    $(this).closest('.lang-wrap').toggleClass('active');
    return false;
  });

  // dropdown();

});

$(document).click(function(e) {
  if ($(e.target).closest('.lang-wrap .lang').length)
    return;
  $('.lang-wrap').removeClass('active');

  e.stopPropagation();
});

$(window).load(function(){

});

$(window).resize(function(){

});