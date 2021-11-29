/*------------------------------------------
     Javascript for initialize text Typer
 --------------------------------------------*/
'use strict'
class TxtType {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        $(this.el).html('<span class="wrap">' + this.txt + '<span class="dash">_</span> ' + '</span>');

        let that = this;
        let delta = 200 - Math.random() * 150;

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
    }
}



function typewrite() {
    const elements = $('.typewrite');
    for (let i = 0; i < elements.length; i++) {
        let toRotate = $(elements).eq(i).attr('data-type');
        let period = $(elements).eq(i).attr('data-period');
        if (toRotate) {
            new TxtType($(elements).eq(i), $.parseJSON(toRotate), period);
        }
    }
}


$(document).ready(function () {
    setTimeout(function () {
        typewrite();
    }, 300);
});