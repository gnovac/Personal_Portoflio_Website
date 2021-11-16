$('.carousel').slick({
    slidesToShow: 3,
    autoplay: true,
    arrows: true,
    prevArrow: '<button type = "button" class = "slick-prev" > <i class="fas fa-arrow-circle-left"></i> </button>',
    nextArrow: '<button type = "button" class = "slick-next" > <i class="fas fa-arrow-circle-right"></i></button>',
    autoplaySpeed: 2000,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 0,
            settings: {
                arrows: false,
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 576,
            settings: {
                arrows: false,
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
            }
        }
    ]
});