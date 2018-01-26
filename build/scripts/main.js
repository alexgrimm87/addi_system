'use strict';

/**
* Check scroll-bar width
* exemple ->   let scroll = $.scrollbarWidth();
*/
$.scrollbarWidth = function () {
    var a, b, c;if (c === undefined) {
        a = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');b = a.children();c = b.innerWidth() - b.height(99).innerWidth();a.remove();
    }return c;
};

/**
* Scroll to the block
* @param {block} str - For what we click
* @param {targetBlock} str - to what we should scroll
*/
function scrollUp(block, targetBlock) {
    $(block).click(function (e) {
        var target = $(targetBlock).offset().top;

        $('body,html').stop().animate({ scrollTop: target }, 800);
        return false;

        e.preventDefault();
    });
}

/**
* Scroll animation
* @param {item} jquery obj - Wrapper for class 'animate-it';
*/
function animationBlock(item) {

    $(window).scroll(function () {
        checkForAnimate();
    });

    function checkForAnimate() {
        var bottomCheck = $(window).height() + $(window).scrollTop();
        var windowTop = $(window).scrollTop() + $(window).height() / 1.5;
        item.each(function () {
            if (windowTop > $(this).offset().top || bottomCheck > $('body').height() * 0.98) {

                var itemSect = $(this);
                var point = 0;
                itemSect.find('.animate-it').addClass('animated');

                var timer = setInterval(function () {
                    itemSect.find('.animate-delay').eq(point).addClass('animated');
                    point++;
                    if (itemSect.find('.animate-delay').length == point) {
                        clearInterval(timer);
                    }
                }, 200);
            }
        });
    }
    checkForAnimate();
}

/**
* GO TO href (smooth)
*/
function goTo() {
    $('.js-nav').click(function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var target = $(href).offset().top - 65;
        $('body,html').animate({ scrollTop: target }, 500);
    });
}

/**
* Cut text script
* (Add to  div class "cut-text" width data-attr "data-cut"(length letters to show) )
*/
function cutText() {
    var filler = '...';
    var filler_length = filler.length;
    $('.cut-text').each(function () {
        var value = $(this).data('cut') - filler_length;
        var text = $.trim($(this).text());
        if (text.length > value && value > 0) {
            var newText = text.substring(0, value) + filler;
            $(this).text(newText);
        }
    });
};

/**
* Functional header butter
* @param {menuMobile} jquery obj - For what we click
* @param {toggleMenu} jquery obj - to what menu we will slideToggle
*/
function headeButer(menuMobile, toggleMenu) {
    if (menuMobile) {
        menuMobile.click(function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                $(this).toggleClass('active');
                toggleMenu.stop().slideToggle();
            }
        });

        $(document).on('click touchstart', function (event) {
            if ($(window).width() < 1024 - $.scrollbarWidth()) {
                var div = toggleMenu;
                if (!div.is(event.target) && div.has(event.target).length === 0 && !menuMobile.is(event.target) && menuMobile.has(event.target).length === 0) {
                    toggleMenu.slideUp();
                    menuMobile.removeClass('active');
                }
            }
        });
    }
}

/**
* Expresion for numbers with spaces
* @param {x} number
* @return {string}
*/
function numberWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

$(document).ready(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());

    goTo();
});

$(window).resize(function () {

    $('.footer_placeholder').height($('.footer').outerHeight());
});
'use strict';

function checkDropdown() {
  $('.header-menu li').each(function () {
    if ($(this).find('ul').length > 0) {
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


function mainSlider(selector) {
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
    center: { lat: mapCenterY, lng: mapCenterX },
    zoom: mapZoom,
    scrollwheel: false,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false
  });

  var marker = new google.maps.Marker({
    position: { lat: mapCenterY, lng: mapCenterX },
    map: map
  });
}
//End Google Map


//Burger Menu 1024
function burger() {
  var menu = $('.header-menu');
  $('.burger').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('open');

    if ($('.burger').hasClass('active')) {
      menu.slideUp('fast');
      $(this).removeClass('active');
    } else {
      menu.slideDown('fast');
      menu.attr("style", "display: flex");
      $(this).addClass('active');
    }
  });

  $(window).resize(function () {
    var menu = $('.header-menu');
    var w = $(window).width();
    if (w > 1024) {
      menu.removeAttr('style');
      $('.burger').removeClass('open');
      $('.burger').removeClass('active');
    }
  });
};

$(document).ready(function () {
  checkDropdown();
  burger();
  mainSlider('.main-slider');
  if ($('.contacts').length > 0 && mapCenterY !== "undefined" && mapCenterX !== "undefined" && mapZoom !== "undefined") {
    initMap();
  }
  $('.lang-wrap .lang').click(function (e) {
    e.preventDefault();
    $(this).closest('.lang-wrap').toggleClass('active');
    return false;
  });

  // dropdown();
});

$(document).click(function (e) {
  if ($(e.target).closest('.lang-wrap .lang').length) return;
  $('.lang-wrap').removeClass('active');

  e.stopPropagation();
});

$(window).load(function () {});

$(window).resize(function () {});