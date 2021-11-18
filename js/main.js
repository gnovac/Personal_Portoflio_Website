"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.main-nav');
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo span');
    const navLinks = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.forJS');
    const burgerIcon = document.querySelector('.toggle');
    const burgerBars = document.querySelectorAll('.bars')

    const addShadow = () => {
        if (window.scrollY >= 300) {
            nav.classList.add('scrolled');
            navbar.classList.add('scroll');
            logo.style.color = '#000'
            burgerBars.forEach(bar => bar.classList.add('scroll-bar'));
        } else {
            nav.classList.remove('scrolled');
            navbar.classList.remove('scroll');
            logo.style.color = '#fff';
            burgerBars.forEach(bar => bar.classList.remove('scroll-bar'));
        }
    }

    const changeLinkState = () => {
        let index = sections.length;
        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    burgerIcon.addEventListener('click', function () {
        this.classList.toggle("change");
        navbar.classList.toggle("overlay");
        if (burgerIcon.classList.contains('change') || !nav.classList.contains('scrolled')) {
            burgerBars.forEach(bar => bar.classList.remove('scroll-bar'));
        } else {
            burgerBars.forEach(bar => bar.classList.add('scroll-bar'));
        }
    });

    navLinks.forEach(item => {
        item.addEventListener('click', () => {
            burgerIcon.classList.toggle("change");
            navbar.classList.toggle("overlay");
        });
    });

    window.addEventListener('scroll', changeLinkState);
    window.addEventListener('scroll', addShadow);
})

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