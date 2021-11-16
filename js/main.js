"use strict";

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


//add Event listner on load
$(document).ready(function () {
    smoothScroll();
    responsiveMenu();
});

/*---------------------------------------------------------------------
    Javascript Function For Sticky Navigation Bar AND SMOOTH SCROLLING
----------------------------------------------------------------------*/

//  add scrolled class to navigation bar & scroll class to links after scroll from top
function fixedNav() {
    const navHeight = $('.main-nav').innerHeight();
    const actualPos = $(window).scrollTop();
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
    $("a").on('click', function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').stop().animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {
                window.location.hash = hash;
            });
        };
    });
};


//  add active class to links after scroll from top
function onScroll() {
    const scrollPos = $(document).scrollTop();
    $('.main-nav a').each(function () {
        let currLink = $(this);
        let refElement = $(currLink.attr("href"));
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
    }, 500);
});


/*------------------------------------------------------------------------
    Javascript Function for Validate
   -------------------------------------------------------------------------*/
// Get the form.
const form = $('#contact-form'),
    reg = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{3,4})$/,
    inputs = $(".input-field");

function validateForm() {

    if ($(this).is("#email")) {

        const email = $(this).val(),
            res = reg.test(email);

        if (res) {
            $(".email-error").html("");
        } else {
            $(".email-error").html("please enter a valid email.");
            return false;
        }

    } else {

        const target = ($(this).attr("id")),
            targetMessage = $("." + target + "-error");

        if ($(this).val() === "") {

            targetMessage.html("please enter a valid " + target + ".");
            return false;

        } else {
            targetMessage.html(" ");
        }

    }
} 

$.each(inputs, function (i, val) {
    $(this).on("blur", validateForm);
});

//----------------------------------------------------//

$(window).on('scroll', function () {
    fixedNav();
    onScroll();
});