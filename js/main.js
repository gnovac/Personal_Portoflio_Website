$(function () {
    "use strict";

    // Define Some Elements
    var allWindow = $(window),
        body = $('body'),
        top = $(window).scrollTop();


    //add Event listner on load
    $(document).ready(function () {
        typewrite();
        smoothScroll();

    });


    // add Event listener on scroll
    $(window).on('scroll', function () {
        parallax();
        fixedNav();
        onScroll();
    });



    /*------------------------------------------------
      Javascript Function for The Preloader
    --------------------------------------------------*/

    $(window).on("load", function () {
        $('.loader-con').fadeOut('slow');
    });




    /*---------------------------------------------------------------------
        Javascript Function For Sticky Navigation Bar AND SMOOTH SCROLLING
    ----------------------------------------------------------------------*/

    //add scrolled class to navigation bar & scroll class to links after scroll from top
    function fixedNav() {
        var navHeight = $('.main-nav').outerHeight();
        var actualPos = $(window).scrollTop();
        if (actualPos >= navHeight) {
            $('.main-nav').addClass('scrolled');
            $('li a').addClass('scroll');
        } else {
            $('.main-nav').removeClass('scrolled');
            $('li a').removeClass('scroll');
        };
    };

    //smooth scroll after link click
    function smoothScroll() {
        $('a').click(function (e) {
            e.preventDefault();
            $('body,html').stop().animate({
                scrollTop: $(this.hash).offset().top
            }, 1000);
        });
    };


    //add active class to links after scroll from top
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('.main-nav a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (!refElement.length) return;
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.main-nav a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            };
        });
    };

    /*---------------------------------------------------
        Javascript Function FOR PARALLAX EFFECT
    ---------------------------------------------------*/

    // create variables
    var backgrounds = $('.parallax');

    function parallax() {

        // for each of background parallax element
        $.each(backgrounds, function (i, val) {

            var backgroundObj = $(this),
                backgroundObjTop = backgroundObj.offset().top,
                backgroundHeight = backgroundObj.height();

            // update positions
            top = allWindow.scrollTop();

            var yPos = ((top - backgroundObjTop)) / 2;

            if (yPos <= backgroundHeight + backgroundObjTop) {
                backgroundObj.css({
                    backgroundPosition: '50% ' + yPos + 'px'
                });
            };
        });
    };


    /*------------------------------------------
        Javascript for initialize text Typer
    --------------------------------------------*/

    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 12) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        $(this.el).html('<span class="wrap">' + this.txt + '<span class="dash">_</span> ' + '</span>');

        var that = this;
        var delta = 200 - Math.random() * 150;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };


    function typewrite() {
        var elements = $('.typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = $(elements).eq(i).attr('data-type');
            var period = $(elements).eq(i).attr('data-period');
            if (toRotate) {
                new TxtType($(elements).eq(i), $.parseJSON(toRotate), period);
            }
        }
    }
});
