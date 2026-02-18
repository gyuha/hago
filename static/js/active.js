(function ($) {
    'use strict';

    var $window = $(window);

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

    var $searchForm = $('#search-wrapper form');
    var $searchInput = $searchForm.find('input.search');
    var $searchTrigger = $searchForm.find('.search-trigger');

    var focusSearchInput = function () {
        window.requestAnimationFrame(function () {
            $searchInput.trigger('focus');
        });
    };

    $searchTrigger.on('click', function (event) {
        event.preventDefault();
        $searchForm.addClass('is-active');
        focusSearchInput();
    });

    $searchForm.on('mouseenter', function () {
        if (!$searchInput.is(':focus')) {
            focusSearchInput();
        }
    });

    $searchInput.on('blur', function () {
        if (!$(this).val()) {
            $searchForm.removeClass('is-active');
        }
    });
})(jQuery);
