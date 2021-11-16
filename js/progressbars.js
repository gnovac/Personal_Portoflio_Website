/*-----------------------------------------------------------------
      Javascript Function for PROGRESS BAR LINES  SCRIPT
------------------------------------------------------------------*/
'use strict'

let allWindow = $(window),
    topWindow = $(window).scrollTop();


let linesHead = $(".features-section"),
    line = $(".progress-bar-line");

//  Progress Bars function
function progressFunction(e) {

    if (linesHead.length) {

        if (!linesHead.hasClass("done")) {

            let linesHeadTop = linesHead.offset().top,
                top = allWindow.scrollTop(),
                winH = allWindow.height() - 160;

            if (top >= linesHeadTop - winH) {

                linesHead.addClass("done");
                $.each(line, function (i, val) {

                    let thisLine = $(this),
                        value = thisLine.data("percent"),
                        progressCont = $(thisLine).closest('.progress-bar-linear').find(".progress-cont span");

                    thisLine.css("width", value + "%");
                    progressCont.html(value + "%")

                });
            };
        };
    };
};


$(window).on('scroll', function () {
    progressFunction();
});