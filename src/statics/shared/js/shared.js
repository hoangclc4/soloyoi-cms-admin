/*!
 * ScriptName: shared.js
 *
 * FoodConnection
 * http://foodconnection.jp/
 * http://foodconnection.vn/
 *
 */

$(document).ready(function() {
	$(".close_btn,#menu_toggle a").click(function () {
			$('body').removeClass('nav--opened');
			$('body').addClass('navClose');			
			$(".hamburger").removeClass('is-active');
			$('body').css('position', 'static');
		});
	
	
	
	$(function () {
		var carouselWidth = 999;
    var ttCarousel;
			var ttCarousel_Config = {
	          minSlides: 1,
	          maxSlides: 3,
	          controls: true,
			  pager: true,
	          mode: 'fade'
	}
	 if( jQuery(window).width() <= carouselWidth) {
        if(ttCarousel == null)
            ttCarousel = jQuery('#rmbxSlider').bxSlider(ttCarousel_Config);
	
    };	
		  jQuery(window).resize(function() {
        if( jQuery(window).width() <= carouselWidth) {
            if(ttCarousel) {
                ttCarousel.reloadSlider();
            } else {
                ttCarousel = jQuery('#rmbxSlider').bxSlider(ttCarousel_Config); 
            }
        } else {
            if(ttCarousel) {
                ttCarousel.destroySlider();
            }
        }
    });
	});

	$(function () {

	var navBox = $(".scroll");
	var TargetPos = 500;
	$(window).scroll(function () {
	
		var ScrollPos = $(window).scrollTop();
		if (ScrollPos > TargetPos) {

			navBox.addClass('pagetop');
			
		} else {

			navBox.removeClass('pagetop');
			
			
		}


	});
		});
});
	
