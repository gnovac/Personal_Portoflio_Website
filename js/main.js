$(function () {
    "use strict";

    // Define Some Elements
    var allWindow = $(window),
        top = $(window).scrollTop();


    //add Event listner on load
    $(document).ready(function () {
        setTimeout(function () {
            typewrite();
        }, 1500);
        smoothScroll();
        responsiveMenu();
    });


    // add Event listener on scroll
    $(window).on('scroll', function () {
        fixedNav();
        onScroll();
        progressFunction();
    });




    /*------------------------------------------------
      Javascript Function for The Preloader
    --------------------------------------------------*/

    const preLoader = document.querySelector('.loader-con');
    preLoader.classList.add('show-preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preLoader.classList.remove('show-preloader')
        }, 1500)
    });
    /*-----------------------------------------------------
      Javascript Function To check Aniamtion support
    -------------------------------------------------------*/

    var animation = false,
        animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx = '',
        elm = document.createElement('div');

    if (elm.style.animationName !== undefined) {
        animation = true;
    }

    if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
            if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }



    /*-----------------------------------------------------
      Javascript Function For Slow Smooth Mouse Scrolling
    -------------------------------------------------------*/

    jQuery.scrollSpeed = function (step, speed) {

        var $document = $(document),
            $body = $('html, body'),
            option = 'default',
            root = top,
            scroll = false,
            scrollY,
            view;

        if (window.navigator.msPointerEnabled) {
            return false;
        }

        allWindow.on('mousewheel DOMMouseScroll', function (e) {

            var deltaY = e.originalEvent.wheelDeltaY,
                detail = e.originalEvent.detail;
            scrollY = $document.height() > allWindow.height();
            scroll = true;

            if (scrollY) {

                view = allWindow.height();

                if (deltaY < 0 || detail > 0) {
                    root = (root + view) >= $document.height() ? root : root += step;
                }

                if (deltaY > 0 || detail < 0) {
                    root = root <= 0 ? 0 : root -= step;
                }

                $body.stop().animate({
                    scrollTop: root
                }, speed, option, function () {
                    scroll = false;
                });
            }

            return false;

        }).on('scroll', function () {

            if (scrollY && !scroll) root = top;
            if (!scroll) root = allWindow.scrollTop();

        }).on('resize', function () {

            if (scrollY && !scroll) view = allWindow.height();

        });
    };

    jQuery.easing.default = function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    };

    // initialize Smooth Scrolling Only in Modern browsers
    if (animation) {
        jQuery.scrollSpeed(100, 700);
    }



    /*---------------------------------------------------------------------
        Javascript Function For Sticky Navigation Bar AND SMOOTH SCROLLING
    ----------------------------------------------------------------------*/

    //  add scrolled class to navigation bar & scroll class to links after scroll from top
    function fixedNav() {
        var navHeight = $('.main-nav').innerHeight();
        var actualPos = $(window).scrollTop();
        if (actualPos >= navHeight) {
            $('.main-nav').addClass('scrolled');
            $('li a, .logo, .nav-container').addClass('scroll');
        } else {
            $('.main-nav').removeClass('scrolled');
            $('li a, .logo, .nav-container').removeClass('scroll');
        };
    };

    //  smooth scroll after link click   
    function smoothScroll() {
        $("a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $('html, body').stop().animate({
                    scrollTop: $(hash).offset().top
                }, 900, function () {
                    window.location.hash = hash;
                });
            };
        });
    };


    //  add active class to links after scroll from top
    function onScroll() {
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


    //  javascript for mobile devices navigation
    function responsiveMenu() {
        $('.nav-container').on('click', function () {
            if (!$(this).hasClass('change')) {
                $(this).addClass('change');
                $(".navbar").slideToggle(function () {
                    $(this).css('display', 'block');
                });
            } else {
                $(this).removeClass('change');
                $(".navbar").slideToggle(function () {
                    $(this).css('display', '');
                });
            }
        });

        $('a').on('click', function () {
            $('.nav-container').removeClass('change');
            //smooth hide drop down navigation menu
            if ($(window).width() < 922) {
                $(".navbar").slideUp(function () {
                    $(this).css('display', '');
                });
            }
        })
    };

    //  fixed scroll-up button
    $(".scroll-up").on('click', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            scrollTop: 0
        }, 900);
    });



    /*-----------------------------------------------------------------
      Javascript Function for PROGRESS BAR LINES  SCRIPT
    ------------------------------------------------------------------*/

    var linesHead = $(".features-section"),
        line = $(".progress-bar-line");

    //  Progress Bars function
    function progressFunction(e) {

        if (linesHead.length) {

            if (!linesHead.hasClass("done")) {

                var linesHeadTop = linesHead.offset().top,
                    top = allWindow.scrollTop(),
                    winH = allWindow.height() - 160;

                if (top >= linesHeadTop - winH) {

                    linesHead.addClass("done");
                    $.each(line, function (i, val) {

                        var thisLine = $(this),
                            value = thisLine.data("percent"),
                            progressCont = $(thisLine).closest('.progress-bar-linear').find(".progress-cont span");

                        thisLine.css("width", value + "%");
                        progressCont.html(value + "%")

                    });
                };
            };
        };
    };

    /*------------------------------------------
        Javascript for initialize text Typer
    --------------------------------------------*/

    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
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

    /*------------------------------------------------------------------------
        Javascript Function for Validate
       -------------------------------------------------------------------------*/
    // Get the form.
    var form = $('#contact-form'),
        reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})$/,
        inputs = $(".input-field");

    function validateForm() {

        if ($(this).is("#email")) {

            var email = $(this).val(),
                res = reg.test(email);

            if (res) {
                $(".email-error").html("");
            } else {
                $(".email-error").html("please enter a valid email.");
                return false;
            }

        } else {

            var target = ($(this).attr("id")),
                targetMessage = $("." + target + "-error");

            if ($(this).val() === "") {

                targetMessage.html("please enter a valid " + target + ".");
                return false;

            } else {
                targetMessage.html(" ");
            }

        }
    } // End ValidateForm Function

    $.each(inputs, function (i, val) {
        $(this).on("blur", validateForm);
    });
});

/*------------------------------------------
    Javascript for initialize Google Maps
--------------------------------------------*/

function initMap() {
    var uluru = {
        lat: 50.06465009999999,
        lng: 19.94497990000002
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}