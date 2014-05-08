// **********************************************************************// 
// ! Architecture images slider
// ! Author: Sergey Sokhatskiy
// **********************************************************************//

$.fn.projectSlider = function ( options ) {
    var methods = {
        init: function(el) {
            var slider = $(el);
            var index = 0;
            var autoSlide;
            var imagesList = slider.data('images-list');
            imagesList = imagesList.split(",");
            var counterHTML = '<div class="slider-control"><span class="btn-left"></span><span class="slider-counter"><span class="current-index">1</span>/<span class="slides-count">' + imagesList.length + '</span></span><span class="btn-right"></span></div>';

            if(imagesList.length > 1) {
                slider.append(counterHTML);

                // Previous image on click on left arrow
                slider.find('.btn-left').click(function(event) {
                    if(index > 0) {
                        index--; 
                    } else {
                        index = imagesList.length-1; // if the first item set it to last
                    }
                    slider.find('img').fadeOut(100, function() {
                        slider.find('img').attr('src', imagesList[index]);// change image src
                        slider.find('img').fadeIn(100);
                    });

                    slider.find('.current-index').text(index + 1); // update slider counter
                });

                // Next image on click on left arrow
                slider.find('.btn-right').click(function(event) {
                    if(index < imagesList.length - 1) {
                        index++;
                    } else {
                        index = 0; // if the last image set it to first
                    }

                    slider.find('img').fadeOut(100, function() {
                        slider.find('img').attr('src', imagesList[index]);// change image src
                        slider.find('img').fadeIn(100);
                    });

                    slider.find('.current-index').text(index + 1);// update slider counter
                });


            }
        }
    };

    methods.init(this);

    return this;
}

/**
 * cbpFixedScrollLayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpFixedScrollLayout = (function() {

    // cache and initialize some values
    var config = {
        // the cbp-fbscroller's sections
        $sections : $( '.content-sections > section' ),
        // the navigation
        $nav: $( '.main-navigation' ),
        // the navigation links
        $navlinks : $( '.main-navigation li' ),
        // index of current link / section
        currentLink : 0,
        // the body element
        $body : $( 'html, body' ),
        // the body animation speed
        animspeed : 650,
        // the body animation easing (jquery easing)
        animeasing : 'easeInOutExpo'
    };

    function init() {
    	
    	$(window).resize(function() {
	    	var viewPortWidth = $(window).width();
	    	var contentWidth = $('.site-wrapper').width();
	    	var rightSpace = (viewPortWidth - contentWidth) / 2;
	    	if(rightSpace > 40) { // fit main navigation in the site content
		    	$('.main-navigation-wrap').animate({'right': 40 + rightSpace}, 1);
	    	} else {
		    	$('.main-navigation-wrap').attr('style', '');
	    	}
	    	
    	});
    	
    	$(window).resize();
    	
    	
        if($(window).width() < 767) {
            config.$nav.addClass('collapsed');
        }
        $(window).scroll(function() {
            if($(document).scrollTop() > 100 || $(window).width() < 767) {
                collapseNavigation();
            } else {
                expandNavigation();
            }
        });

        config.$nav.hover(function(){
            config.$nav.addClass('hover');
            expandNavigation();
        }, function() {
            config.$nav.removeClass('hover');
            collapseNavigation();
        });

        // click on a navigation link: the body is scrolled to the position of the respective section
        config.$navlinks.on( 'click', function() {
            scrollAnim( config.$sections.eq( $( this ).index() ).offset().top );
            return false;
        } );

        // 2 waypoints defined:
        // First one when we scroll down: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
        // Second one when we scroll up: the current navigation link gets updated. A "new section" is reached when it occupies more than 70% of the viewport
        config.$sections.waypoint( function( direction ) {
            if( direction === 'down' ) { changeNav( $( this ) ); }
        }, { offset: '30%' } ).waypoint( function( direction ) {
            if( direction === 'up' ) { changeNav( $( this ) ); }
        }, { offset: '-30%' } );

        // on window resize: the body is scrolled to the position of the current section
        $( window ).on( 'debouncedresize', function() {
            scrollAnim( config.$sections.eq( config.currentLink ).offset().top );
        } );
        
    }

    function expandNavigation() {
        clearTimeout($.data(this, 'scrollTimer'));
        if(config.$nav.hasClass('collapsed'))
            config.$nav.removeClass('collapsed');
    }

    function collapseNavigation() {
        if(config.$nav.hasClass('collapsed') || config.$nav.hasClass('hover')) return;
        $.data(this, 'scrollTimer', setTimeout(function() {
            if($(document).scrollTop() > 100 || $(window).width() < 767) {
                config.$nav.addClass('collapsed');
            }
        }, 500));
    }

    // update the current navigation link
    function changeNav( $section ) {
        config.$navlinks.eq( config.currentLink ).removeClass( 'active' );
        config.currentLink = $section.index( 'section' );
        config.$navlinks.eq( config.currentLink ).addClass( 'active' );
    }

    // function to scroll / animate the body
    function scrollAnim( top ) {
        config.$body.stop().animate( { scrollTop : top }, config.animspeed);
    }

    return { init : init };

})();