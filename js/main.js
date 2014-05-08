jQuery(document).ready(function($){

    // Init simple sliders for projects
    $('.project-slider').each(function() {
        $(this).projectSlider();
    });


    // Sections navigation
    $(function() {
        cbpFixedScrollLayout.init();
    });

},jQuery);