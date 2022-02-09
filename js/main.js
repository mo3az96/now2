$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    //////////** main slider **//////////
    var mainswiper = new Swiper('.main-slider .swiper-container', {
        spaceBetween: 15,
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.main-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.main-slider .swiper-btn-next',
            prevEl: '.main-slider .swiper-btn-prev',
        },
    });
    //////////** products slider **//////////
    var productswiper = new Swiper('.products-slider .swiper-container', {
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 23,
            },
            1199: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
        pagination: {
            el: '.products-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.products-slider .swiper-btn-next',
            prevEl: '.products-slider .swiper-btn-prev',
        },
    });
    //////////** services slider **//////////
    var serviceswiper = new Swiper('.services-slider .swiper-container', {
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 23,
            },
            1199: {
                slidesPerView: 4,
                spaceBetween: 30,
            },
        },
        pagination: {
            el: '.services-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.services-slider .swiper-btn-next',
            prevEl: '.services-slider .swiper-btn-prev',
        },
    });

    ///////// **product-qty** ///////// 
    $(".qty-plus").on('click', function () {
        var $parentElm = $(this).parents(".item-qty");
        var maxVal = parseInt($parentElm.find(".qty-input").attr("data-max"));
        var value = $parentElm.find(".qty-input").val();
        if (value < maxVal) {
            value++;
        }
        $parentElm.find(".qty-input").val(value);
    });
    $(".qty-minus").on('click', function () {
        var $parentElm = $(this).parents(".item-qty");
        var minVal = parseInt($parentElm.find(".qty-input").attr("data-min"));
        var value = $parentElm.find(".qty-input").val();
        if (value > minVal) {
            value--;
        }
        $parentElm.find(".qty-input").val(value);
    });
    ///////// ** menu ** ///////// 
    if ($(window).width() <= 991) {
        $('.menu-btn').click(function () {
            $("nav").addClass("active");
            $(".menu-overlay").fadeIn(300);
            $("body").addClass("overflow");
        })
        $('.menu-overlay,.menu-close').click(function () {
            $("nav").removeClass("active");
            $(".menu-overlay").fadeOut(400);
            $("body").removeClass("overflow");
        })
    }
    ///////// ** select address ** ///////// 
    $(".adress-item>input").on('change', function () {
        if ($(this).is(":checked")) {

            var addressText = $.trim($(this).siblings(".address-text").text())
            $(".locationInput").val(addressText)
            $('#addressBook-modal').modal('hide')
        }
    });
    ///////// ** select time ** ///////// 
    $(".select-date").on('click', function () {
        if ($("input.select-date").is(":checked")) {
            $('#date-modal').modal('show')
        }
    });
    if ($(window).width() > 1199) {
        $(".datePicker").flatpickr({
            locale: document.dir == 'rtl' ? "ar" : "en",
            minDate: "today",
            dateFormat: "d M Y",
            defaultDate: "today"
        });
    }
    ///////// ** select2 ** /////////
    $(".new-address-select").select2();
    ///////// ** gallery thumbs ** /////////
    var productThumbs = new Swiper(".product-thumbs", {

        slidesPerView: 4,
        // loop: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        breakpoints: {
            0: {
                spaceBetween: 10,
            },
            767: {
                spaceBetween: 15,
            },
            1199: {
                spaceBetween: 15,
            },
        },
        navigation: {
            nextEl: '.product-thumbs .swiper-btn-next',
            prevEl: '.product-thumbs .swiper-btn-prev',
        },
    });
    var productImgs = new Swiper(".product-imgs", {
        spaceBetween: 15,
        // loop: true,
        thumbs: {
            swiper: productThumbs,
        },
        pagination: {
            el: '.product-imgs .swiper-pagination',
            clickable: true,
        },
    });
    lazyLoad();
});


function lazyLoad() {
    const images = document.querySelectorAll('.lazy-img');

    const optionsLazyLoad = {
        //  rootMargin: '-50px',
        // threshold: 1
    }

    const imageObserver = new IntersectionObserver(function (enteries) {
        enteries.forEach(function (entery) {
            if (!entery.isIntersecting) {
                return;
            } else {
                preloadImage(entery.target);
                imageObserver.unobserve(entery.target);
            }
        });

    }, optionsLazyLoad);

    images.forEach(function (image) {
        imageObserver.observe(image)
    });
}

function preloadImage(img) {
    img.src = img.getAttribute('data-src');
    img.onload = function () {
        img.parentElement.classList.remove('loading-img');
        img.parentElement.classList.add("loaded-img");
        img.parentElement.parentElement.classList.add("lazy-head-img");
    }
}