(function ($) {
    'use strict';

    var $window = $(window);

    // :: Preloader Active Code
    $window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: Fullscreen Active Code
    $window.on('resizeEnd', function () {
        $(".full_height").height($window.height());
    });

    $window.on('resize', function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 300);
    }).trigger("resize");

    // :: Sticky Active Code
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

    // :: Tooltip Active Code
    $('[data-toggle="tooltip"]').tooltip();

    // :: MatchHeight Active Code
    if ($.fn.matchHeight) {
        $('.equalize').matchHeight({
            byRow: true,
            property: 'height'
        });
    }

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: PreventDefault a Click
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    /* Search Area */
    var search = document.getElementById('search'),
        searchWrapper = document.getElementById('search-wrapper'),
        closeIcon = document.getElementById('close-icon');
    search.onfocus = function () {
        searchWrapper.classList.add('search-expanded');
        this.addEventListener('transitionend', function () {
            closeIcon.style.display = 'block';
        });
    }
    search.onblur = function () {
        searchWrapper.classList.remove('search-expanded');
        closeIcon.classList.add('closing');
        this.addEventListener('transitionend', function () {
            closeIcon.classList.remove('closing');
            closeIcon.style.display = 'none';
        });
    }
    closeIcon.onclick = function () {
        this.classList.add('closing');
        document.activeElement.blur();
        setTimeout(function () {
            closeIcon.classList.remove('closing');
        }, 1000);
    }

})(jQuery);