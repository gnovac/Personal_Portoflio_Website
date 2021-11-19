$('.carousel').slick({
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    mobileFirst: true,
    responsive: [{
            breakpoint: 0,
            settings: {
                dost: false,
                slidesToShow: 1,
            }
        },
        {
            breakpoint: 576,
            settings: {
                dots: false,
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