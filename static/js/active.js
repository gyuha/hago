(function ($) {
    'use strict';

    var $window = $(window);

    // Preloader
    $window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // Sticky Active Code
    $window.on('scroll', function () {
        if ($window.scrollTop() > 20) {
            $('.header-area').addClass('sticky');
        } else {
            $('.header-area').removeClass('sticky');
        }
        if ($('#post-toc').length > 0) {
            if ($window.scrollTop() > 157) {
                $('.post-sidebar-area').addClass('sticky');
            } else {
                $('.post-sidebar-area').removeClass('sticky');
            }
        }
    });

    // ScrollUp
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }
})(jQuery);