(function ($) {

    "use strict";

    var lastScroll = 0,
            simpleDropdown = 0,
            linkDropdown = 0,
            isotopeObjs = [],
            swiperObjs = [],
            wow = '';
    var sliderBreakPoint = 991;

    /* check for browser os */
    var isMobile = false;
    var isiPhoneiPad = false;
    var mobileAnimation = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        isiPhoneiPad = true;
    }

    /* jQuery appear */
    $('.pie-chart-style-01, .pie-chart-style-02, .pie-chart-style-03, .counter, .progress-bar').each(function () {
        $(this).appear().trigger('resize');
    });

    /* swiper slider using params */
    setupSwiper();
    destroySwiperLoop();
    setHeaderPosition();

    $(window).on('scroll', init_scroll_navigate);


    function init_scroll_navigate() {

        /* one page navigation */
        var menu_links = $(".navbar-nav li a");
        var scrollPos = $(document).scrollTop();
        scrollPos = scrollPos + 60;
        menu_links.each(function () {
            var currLink = $(this);
            var hasPos = currLink.attr("href").indexOf("#");
            if (hasPos > -1) {
                var res = currLink.attr("href").substring(hasPos);
                if (res != '' && res != '#' && $(res).length > 0) {
                    var refElement = $(res);
                    if (refElement.offset().top <= scrollPos && refElement.offset().top + refElement.height() > scrollPos) {
                        menu_links.not(currLink).removeClass("active");
                        currLink.addClass("active");
                    } else {
                        currLink.removeClass("active");
                    }
                }
            }
        });

        /* background color slider */
        var $window = $(window),
                $body = $('.bg-background-fade'),
                $panel = $('.color-code');
        var scroll = $window.scrollTop() + ($window.height() / 2);
        $panel.each(function () {
            var _self = $(this);
            if (_self.position().top <= scroll && _self.position().top + _self.height() > scroll) {
                $body.removeClass(function (index, css) {
                    return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
                });
                $body.addClass('color-' + _self.data('color'));
            }
        });

        /* sticky nav */
        setHeaderPosition()

        /* header appear on scroll up */
        var st = $(this).scrollTop();
        if (st >= lastScroll) {
            $('.sticky').removeClass('header-appear');
        } else {
            $('.sticky').addClass('header-appear');
        }

        lastScroll = st;
        var headerHeight = $('nav').outerHeight();
        if (lastScroll <= headerHeight)
            $('header').removeClass('header-appear');
    }

    /* header search */
    function ScrollStop() {
        return false;
    }
    function ScrollStart() {
        return true;
    }

    function setHeaderPosition()
    {
        var headerHeight = $('nav').outerHeight();
        if (!$('header').hasClass('no-sticky')) {
            if ($(document).scrollTop() >= headerHeight) {
                $('header').addClass('sticky');

            } else if ($(document).scrollTop() <= headerHeight) {
                $('header').removeClass('sticky');
                setTimeout(function () {
                    setPageTitleSpace();
                }, 500);
            }
            SetMegamenuPosition();
        }
    }

    /* parallax background */
    function setParallax() {
        if (!isIE()) {
            $('[data-parallax-background-ratio]').each(function () {
                var ratio = $(this).attr('data-parallax-background-ratio') || 0.5;
                $(this).parallax('0%', ratio);
            });
            $('[data-parallax-layout-ratio]').each(function () {
                var ratio = $(this).attr('data-parallax-layout-ratio') || 1;
                $(this).parallaxImg(ratio);
            });
        }
    }

    /* full screen */
    function fullScreenHeight() {
        var element = $(".full-screen");
        var $minheight = $(window).height();
        element.parents('section').imagesLoaded(function () {
            if ($(".top-space .full-screen").length > 0) {
                var $headerheight = $("header nav.navbar").outerHeight();
                $(".top-space .full-screen").css('height', $minheight - $headerheight);
            } else {
                element.css('height', $minheight);
            }
        });

        var minwidth = $(window).width();
        $(".full-screen-width").css('width', minwidth);

        var sidebarNavHeight = $('.sidebar-nav-style-1').height() - $('.logo-holder').parent().height() - $('.footer-holder').parent().height() - 10;
        $(".sidebar-nav-style-1 .nav").css('height', (sidebarNavHeight));
        var style2NavHeight = parseInt($('.sidebar-part2').height() - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-top')) - parseInt($('.sidebar-part2 .sidebar-middle').css('padding-bottom')) - parseInt($(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('margin-bottom')));
        $(".sidebar-part2 .sidebar-middle .sidebar-middle-menu .nav").css('height', (style2NavHeight));
    }

    /* function call */
    function SetResizeContent() {
        SetMegamenuPosition();
        setPageTitleSpace();
        setTimeout(function () {
            setButtonPosition();
        }, 600);
        parallax_text();
        setParallax();
        fullScreenHeight();
        if ( $( '.swiper-container:not( .swiper-auto-slide ):not( .swiper-bottom-scrollbar-full ):not( .instafeed-wrapper )' ).length > 0 ) {
            resetSwiperLoop();
        }
    }

    /* window load */
    $(window).on('load', function () {
        setParallax();
        SetResizeContent();
    });

    /* window resize */
    $(window).resize(function (event) {
        destroySwiperLoop();

        setTimeout(function () {
            SetResizeContent();
        }, 500);
        $('.menu-back-div').each(function () {
            $(this).attr('style', '');
        });
        $('.navbar-collapse').collapse('hide');
        $('ul.navbar-nav').find('.open').removeClass('open');

        event.preventDefault();
    });

    /* document ready */
    $(document).ready(function () {

        /* active class to current menu for only html */
        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
        var $hash = window.location.hash.substring(1);

        if ($hash) {
            $hash = "#" + $hash;
            pgurl = pgurl.replace($hash, "");
        } else {
            pgurl = pgurl.replace("#", "");
        }

        $(".nav li a").each(function () {
            if ($(this).attr("href") == pgurl || $(this).attr("href") == pgurl + '.html') {
                $(this).parent().addClass("active");
                $(this).parents('li.dropdown').addClass("active");
            }
        });
        $(window).scroll(function () {
            if ($(this).scrollTop() > 150)
                $('.scroll-top-arrow').fadeIn('slow');
            else
                $('.scroll-top-arrow').fadeOut('slow');
        });

        /* scroll to top */
        $(document).on('click', '.scroll-top-arrow', function () {
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });

        /* portfolio filter */
        $('.portfolio-wrapper').each(function () {
            var _this = $(this);
            if (!_this.find('.wow').length > 0) {
                _this.find('.grid-item').css('visibility', 'hidden');
            }
            _this.imagesLoaded(function () {
                if (!_this.find('.wow').length > 0) {
                    _this.find('.grid-item').css('visibility', '');
                } else if (!isMobile) {
                    _this.find('.grid-item').css('visibility', 'hidden');
                }
                _this.removeClass('grid-loading');
                _this.removeClass('grid-loading-white');
                _this.isotope({
                    layoutMode: 'masonry',
                    itemSelector: '.grid-item',
                    percentPosition: true,
                    stagger: 0,
                    masonry: {
                        columnWidth: '.grid-sizer',
                    }
                });
                _this.isotope();
                isotopeObjs.push(_this);
            });
        });
        $(document).on('click', '.portfolio-filter > li > a', function () {
            var _this = $(this),
                    parentSectionObj = _this.parents('section');
            parentSectionObj.find('.portfolio-filter > li').removeClass('active');
            _this.parent().addClass('active');
            var selector = _this.attr('data-filter'),
                    portfolioFilter = parentSectionObj.find('.portfolio-wrapper');
            removeWowAnimation(portfolioFilter);
            portfolioFilter.isotope({filter: selector});
            return false;
        });

        /* smooth scroll */
        var scrollAnimationTime = 1200, scrollAnimation = 'easeInOutExpo';
        $(document).on('click.smoothscroll', 'a.scrollto', function (event) {
            event.preventDefault();
            var target = this.hash;
            if ($(target).length != 0) {
                $('html, body').stop()
                        .animate({
                            'scrollTop': $(target)
                                    .offset()
                                    .top
                        }, scrollAnimationTime, scrollAnimation, function () {
                            window.location.hash = target;
                        });
            }
        });

        /* humburger menu one page navigation */
        if ($('.full-width-pull-menu').length > 0) {
            $(document).on('click', '.full-width-pull-menu .inner-link', function (e) {
                $(".full-width-pull-menu .close-button-menu").trigger("click");
                var _this = $(this);
                setTimeout(function () {
                    var target = _this.attr("href");
                    if ($(target).length > 0) {
                        $('html, body').stop()
                                .animate({
                                    'scrollTop': $(target).offset().top
                                });
                    }
                }, 500);
            });
        }

        /* inner link */
        if ($('.navbar-top').length > 0 || $('.navbar-scroll-top').length > 0 || $('.navbar-top-scroll').length > 0) {
            $('.inner-link').smoothScroll({
                speed: 900,
                offset: 0
            });
        } else {
            $('.inner-link').smoothScroll({
                speed: 900,
                offset: -59
            });
        }

        $('.section-link').smoothScroll({
            speed: 900,
            offset: 1
        });
        
        /* pie chart */
        if ($('.pie-chart-style-01').length > 0) {
            $(document.body).on('appear', '.pie-chart-style-01', function (e) {
                $('.pie-chart-style-01').easyPieChart({
                    barColor: '#929292',
                    trackColor: '#d9d9d9',
                    scaleColor: false,
                    easing: 'easeOutBounce',
                    scaleLength: 1,
                    lineCap: 'round',
                    lineWidth: 3, //12
                    size: 150, //110
                    animate: {
                        duration: 2000,
                        enabled: true
                    },
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent) + '%');
                    }
                });
            });
        }

        if ($('.pie-chart-style-02').length > 0) {
            $(document.body).on('appear', '.pie-chart-style-02', function (e) {
                $('.pie-chart-style-02').easyPieChart({
                    easing: 'easeOutCirc',
                    barColor: '#ff214f',
                    trackColor: '#c7c7c7',
                    scaleColor: false,
                    scaleLength: 1,
                    lineCap: 'round',
                    lineWidth: 2, //12
                    size: 120, //110
                    animate: {
                        duration: 2000,
                        enabled: true
                    },
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent) + '%');
                    }
                });
            });
        }

        if ($('.pie-chart-style-03').length > 0) {
            $(document.body).on('appear', '.pie-chart-style-03', function (e) {
                $('.pie-chart-style-03').easyPieChart({
                    easing: 'easeOutCirc',
                    barColor: '#ff214f',
                    trackColor: '',
                    scaleColor: false,
                    scaleLength: 1,
                    lineCap: 'round',
                    lineWidth: 3, //12
                    size: 140, //110
                    animate: {
                        duration: 2000,
                        enabled: true
                    },
                    onStep: function (from, to, percent) {
                        $(this.el).find('.percent').text(Math.round(percent) + '%');
                    }
                });
            });
        }
        
        /* masonry blog */
        var $blog_filter = $('.blog-wrapper');
        $blog_filter.imagesLoaded(function () {
            $blog_filter.removeClass('grid-loading');
            $blog_filter.isotope({
                layoutMode: 'masonry',
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
        });

        $(window).resize(function () {
            setTimeout(function () {
                $blog_filter.find('.grid-item').removeClass('wow').removeClass('animated'); // avoid problem to filter after window resize
                $blog_filter.isotope('layout');
            }, 300);
        });

        /* lightbox gallery */
        $('.lightbox-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            fixedContentPos: true,
            closeBtnInside: false,
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            }
        });

        /* group gallery */
        var lightboxgallerygroups = {};
        $('.lightbox-group-gallery-item').each(function () {
            var id = $(this).attr('data-group');
            if (!lightboxgallerygroups[id]) {
                lightboxgallerygroups[id] = [];
            }
            lightboxgallerygroups[id].push(this);
        });
        $.each(lightboxgallerygroups, function () {
            $(this).magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                fixedContentPos: true,
                gallery: {enabled: true}
            });
        });

        $('.lightbox-portfolio').magnificPopup({
            delegate: '.gallery-link',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade',
            fixedContentPos: true,
            closeBtnInside: false,
            closeOnContentClick: true,
            gallery: {
                enabled: true,
                navigateByImgClick: false,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            }
        });
        
         /* single image lightbox - zoom animation */
        $('.single-image-lightbox').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            fixedContentPos: true,
            closeBtnInside: false,
            mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
            image: {
                verticalFit: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
        
        /* zoom gallery */
        $('.zoom-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            fixedContentPos: true,
            closeBtnInside: false,
            image: {
                verticalFit: true,
                titleSrc: function (item) {
                    return item.el.attr('title');
                }
            },
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300, // don't foget to change the duration also in CSS
                opener: function (element) {
                    return element.find('img');
                }
            }
        });
        
        /* modal popup */
        $('.modal-popup').magnificPopup({
            type: 'inline',
            preloader: false,
            // modal: true,
            blackbg: true,
            callbacks: {
                open: function () {
                    $('html').css('margin-right', 0);
                }
            }
        });
        $(document).on('click', '.popup-modal-dismiss', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
        
        /* modal popup - zoom animation */
        $('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            blackbg: true,
            mainClass: 'my-mfp-zoom-in'
        });

        $('.popup-with-move-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            blackbg: true,
            mainClass: 'my-mfp-slide-bottom'
        });
        
        /* popup with form */
        $('.popup-with-form').magnificPopup({
            type: 'inline',
            preloader: false,
            closeBtnInside: false,
            fixedContentPos: true,
            focus: '#name',
            callbacks: {
                beforeOpen: function () {
                    if (getWindowWidth() < 700) {
                        this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                }
            }
        });
        
        /* video magnific popup */
        $('.popup-youtube, .popup-vimeo, .popup-googlemap').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: "auto",
            closeBtnInside: false
        });
        
        /* ajax magnific popup for onepage portfolio */
        $('.ajax-popup').magnificPopup({
            type: 'ajax',
            alignTop: true,
            fixedContentPos: true,
            overflowY: 'scroll', // as we know that popup content is tall we set scroll overflow by default to avoid jump
            callbacks: {
                open: function () {
                    $('.navbar .collapse').removeClass('show');
                    $('.navbar a.dropdown-toggle').addClass('collapsed');
                }
            }
        });
        
        /* mega menu width */
        $("ul.mega-menu-full").each(function (idx, elm) {
            var megaMenuWidth = 0;
            $(this).children('li').each(function (idx, elm) {
                var LIheight = 0;
                megaMenuWidth += $(this).outerWidth();
            });
            $(this).width(megaMenuWidth + 95);
            megaMenuWidth = 0;
        });
        
        /* fit videos */
        $(".fit-videos").fitVids();
        
        /* form to email */
        /* contact form validation on submit */
        $(document).on('click', '.submit', function () {
            var error = false,
                    captchaFlag = false,
                    _this = $(this),
                    formObj = _this.parents('form'),
                    emailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                    telFormat = /[0-9 -()+]+$/,
                    actionURL = formObj.attr('action'),
                    resultsObj = formObj.find('.form-results'),
                    grecaptchav3 = _this.attr('data-sitekey') || '',
                    redirectVal = formObj.find('[name="redirect"]').val();
            formObj.find('.required').removeClass('required-error');
            formObj.find('.required').each(function () {
                var __this = $(this),
                        fieldVal = __this.val();
                if (fieldVal == '' || fieldVal == undefined) {
                    error = true;
                    __this.addClass('required-error');
                } else if (__this.attr('type') == 'email' && !emailFormat.test(fieldVal)) {
                    error = true;
                    __this.addClass('required-error');
                } else if (__this.attr('type') == 'tel' && !telFormat.test(fieldVal)) {
                    error = true;
                    __this.addClass('required-error');
                }
            });
            var termsObj = formObj.find('.terms-condition');
            if (termsObj.length > 0) {
                if (!termsObj.is(':checked')) {
                    error = true;
                    termsObj.addClass('required-error');
                }
            }
            
            /* google reCaptcha verify */
            if (typeof (grecaptcha) !== 'undefined' && grecaptcha !== null) {
                if (formObj.find('.g-recaptcha').length > 0) { // For Version 2
                    var gResponse = grecaptcha.getResponse();
                    if (!(gResponse.length)) {
                        error = true;
                        formObj.find('.g-recaptcha').addClass('required-error');
                    }
                } else if (grecaptchav3 != '' && grecaptchav3 != undefined) { // For Version 3
                    captchaFlag = true;
                    formObj.find('input[name=action],input[name=g-recaptcha-response]').remove();
                    grecaptcha.ready(function () {
                        grecaptcha.execute(grecaptchav3, {action: 'subscribe_newsletter'}).then(function (token) {
                            formObj.prepend('<input type="hidden" name="g-recaptcha-response" value="' + token + '">');
                            formObj.prepend('<input type="hidden" name="action" value="subscribe_newsletter">');

                            if (!error) {
                                submitAJAXForm(_this);
                            }
                        });
                    });
                }
            }
            if (!error && !captchaFlag) { // Check no errors && no google reCaptcha V3
                submitAJAXForm(_this);
            }
            return false;
        });

        /* Contact form validation on blur */
        $(document).on('blur', '.required', function () {
            var emailFormat = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                    telFormat = /[0-9 -()+]+$/,
                    fieldVal = $(this).val();
            if (fieldVal == '' || fieldVal == undefined) {
                $(this).addClass('required-error');
            } else if ($(this).attr('type') == 'email' && !emailFormat.test(fieldVal)) {
                $(this).addClass('required-error');
            } else if ($(this).attr('type') == 'tel' && !telFormat.test(fieldVal)) {
                $(this).addClass('required-error');
            } else {
                $(this).removeClass('required-error');
            }
        });

        /* Validate terms and conditions in form */
        $(document).on('click', '.terms-condition', function () {
            var termsObj = $(this);
            if (!termsObj.is(':checked')) {
                termsObj.addClass('required-error');
            } else {
                termsObj.removeClass('required-error');
            }
        });
        
        /* wow animation - on scroll */
        if ($('.wow').length > 0) {
            wow = new WOW({
                boxClass: 'wow',
                animateClass: 'animate__animated',
                offset: 30,
                mobile: mobileAnimation,
                live: true
            });
            $(document).imagesLoaded(function () {
                wow.init();
            });
        }
        
        /* counter */
        /* counter number reset on jQuery appear */
        if ($('.counter').length > 0) {
            $(document).on('appear', '.counter', function (e) {
                var _this = $(this);
                if (!_this.hasClass('appear')) {
                    var options = _this.data('countToOptions') || {};
                    _this.countTo(options);
                    _this.addClass('appear');
                }
            });
        }
        
        /* counter number reset while scrolling */
        $('.countdown').countdown($('.countdown').attr("data-enddate")).on('update.countdown', function (event) {
            $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'));
        });
        
        /* left nav */
        $(document).on('click', '.right-menu-button', function (e) {
            $('body').toggleClass('left-nav-on');
        });
        
        /* hamburger menu */
        $(document).on('click', '.btn-hamburger', function () {
            $('.hamburger-menu').toggleClass('show-menu');
            $('body').removeClass('show-menu');
        });
        
        /* sidebar nav open */
        $(document).on('click', '#mobileToggleSidenav', function () {
            $(this).closest('nav').toggleClass('sidemenu-open');
        });
        
        /* justified Gallery */
        if ($('.justified-gallery').length > 0) {
            $('.justified-gallery').each(function () {
                var _this = $(this),
                        justifiedOptions = _this.attr('data-justified-options') || '{ "rowHeight": 500, "maxRowHeight": false, "captions": true, "margins": 15, "waitThumbnailsLoad": true }';
                if (typeof (justifiedOptions) !== 'undefined' && justifiedOptions !== null) {
                    _this.imagesLoaded(function () {
                        justifiedOptions = $.parseJSON(justifiedOptions);
                        _this.justifiedGallery(justifiedOptions);
                    });
                }
            });
        }

        $('.atr-nav').on("click", function () {
            $(".atr-div").append("<a class='close-cross' href='#'>X</a>");
            $(".atr-div").animate({
                width: "toggle"
            });
        });

        $('.close-cross').on("click", function () {
            $(".atr-div").hide();
        });

        var menuRight = document.getElementById('cbp-spmenu-s2'),
                showRightPush = document.getElementById('showRightPush'),
                body = document.body;
        if (showRightPush) {
            showRightPush.onclick = function () {
                classie.toggle(this, 'active');
                if (menuRight)
                    classie.toggle(menuRight, 'cbp-spmenu-open');
            };
        }

        var test = document.getElementById('close-pushmenu');
        if (test) {
            test.onclick = function () {
                classie.toggle(this, 'active');
                if (menuRight)
                    classie.toggle(menuRight, 'cbp-spmenu-open');
            };
        }
        
        /* blog page header animation */
        $(".blog-header-style1 li").hover(function () {
            $('.blog-header-style1 li.blog-column-active').removeClass('blog-column-active');
            $(this).addClass('blog-column-active');
        }, function () {
            $(this).removeClass('blog-column-active');
            $('.blog-header-style1 li:first-child').addClass('blog-column-active');
        });
        
        /* big menu open close */
        $('.big-menu-open').on("click", function () {
            $('.big-menu-right').addClass("open");
        });

        $('.big-menu-close').on("click", function () {
            $('.big-menu-right').removeClass("open");
        });
        
        /* swiper auto slider */
        var $swiperAutoSlideIndex = 0;
        var swiperAutoSlideObj = undefined;
        var swiperAutoSlide = document.querySelectorAll( '.swiper-auto-slide' );
        swiperAutoSlide.forEach(function ( swiperItem, index ) {
            var _this = $(swiperItem),
                sliderOptions = _this.attr( 'data-slider-options' );

            if ( typeof ( sliderOptions ) !== 'undefined' && sliderOptions !== null ) {
                /* apply swiper */
                var sliderOptions = $.parseJSON( sliderOptions );
                    sliderOptions['on'] = {
                        resize: function () {
                            this.update();
                        }
                    };
                swiperAutoSlideObj = new Swiper(swiperItem, sliderOptions);
            }
        });

        $( window ).resize( function () {
            if ( $( '.swiper-auto-slide' ).length > 0 && swiperAutoSlideObj ) {
                $swiperAutoSlideIndex = swiperAutoSlideObj.activeIndex;
                swiperAutoSlideObj.detachEvents();
                swiperAutoSlideObj.destroy( true, false );
                swiperAutoSlideObj = undefined;
                $( '.swiper-auto-slide .swiper-wrapper' ).css( 'transform', '' ).css( 'transition-duration', '' );
                $( '.swiper-auto-slide .swiper-slide' ).css( 'margin-right', '' ); 

                setTimeout(function () {
                    swiperAutoSlide.forEach(function ( swiperItem, index ) {
                        var _this = $( swiperItem ),
                            sliderOptions = _this.attr( 'data-slider-options' );
                        if ( typeof ( sliderOptions ) !== 'undefined' && sliderOptions !== null ) {
                            var sliderOptions = $.parseJSON(sliderOptions);
                            sliderOptions['on'] = {
                                init: function () {
                                    this.update();
                                }
                            };
                            swiperAutoSlideObj = new Swiper( swiperItem, sliderOptions );
                            swiperAutoSlideObj.slideTo( $swiperAutoSlideIndex, 1200, false );
                        }
                    });
                }, 1000 );
            }
        });
        
        /* swiper bottom scrollbar slider */
        var resizeId;
        var swiperBottomScrollbarFullObj = undefined;
        var swiperBottomScrollbarFull = document.querySelectorAll('.swiper-bottom-scrollbar-full');
        if ($(window).width() > 767) {
            swiperBottomScrollbarFull.forEach(function (swiperItem, index) {
                var _this = $(swiperItem),
                        sliderOptions = _this.attr('data-slider-options');

                if (typeof (sliderOptions) !== 'undefined' && sliderOptions !== null) {
                    var sliderOptions = $.parseJSON(sliderOptions);
                    swiperBottomScrollbarFullObj = new Swiper(swiperItem, sliderOptions);
                }
            });
        }

        if ($(".swiper-bottom-scrollbar-full").length > 0) {
            $(window).resize(function () {
                clearTimeout(resizeId);
                resizeId = setTimeout(doneResizing, 1000);
            });
        }


        function doneResizing() {
            if (typeof (swiperBottomScrollbarFullObj) !== 'undefined' && swiperBottomScrollbarFullObj !== null) {
                swiperBottomScrollbarFullObj.detachEvents();
                swiperBottomScrollbarFullObj.destroy(true, true);
                swiperBottomScrollbarFullObj = undefined;
            }

            $(".swiper-bottom-scrollbar-full .swiper-wrapper").css("transform", "").css("transition-duration", "").removeAttr("style");
            $(".swiper-bottom-scrollbar-full .swiper-slide").css("margin-right", "").removeAttr("style");

            if ($(window).width() > 767) {
                setTimeout(function () {
                    swiperBottomScrollbarFull.forEach(function (swiperItem, index) {
                        var _this = $(swiperItem),
                                sliderOptions = _this.attr('data-slider-options');

                        if (typeof (sliderOptions) !== 'undefined' && sliderOptions !== null) {
                            var sliderOptions = $.parseJSON(sliderOptions);
                            swiperBottomScrollbarFullObj = new Swiper(swiperItem, sliderOptions);
                        }
                    });
                }, 500);
            }
        }
        
        /* instagramfeed */
        var instagramWrapperItems = document.querySelectorAll('.instafeed-wrapper');
        instagramWrapperItems.forEach(function (instagramWrapperItem, index) {
            var token = 'IGQVJWQTBhSG1rY3pBTzBvSjFIanQzZA09ZAbllUYmJlZA0ZARb0x0dVJNSHFTSVlOYXRFeXppbnZAkVTlLa1IxYlRPNlQ2WC0tLXRKWkRoVldOLU1aeFVsbEpfeVVhWnRXQl9QWUo5aVlCUG1zdGFPZAVl2RQZDZD',
                    _this = $(instagramWrapperItem),
                    token = _this.attr('data-token') || token,
                    total = _this.attr('data-total') || '6', // how much photos do you want to get
                    slider = _this.attr('data-slider-options'),
                    _html = _this.html(),
                    outputHTML = '';
            if (typeof (slider) !== 'undefined' && slider !== null) {
                _this.html('');
            }
            $.ajax({
                url: 'https://graph.instagram.com/me/media?fields=id,media_type,media_url,timestamp,permalink,comments_count,like_count&access_token=' + token,
                type: 'GET',
                success: function (response) {
                    outputHTML += _this.find('.grid-item').length > 0 ? '<li class="grid-sizer"></li>' : '';
                    for (var x in response.data) {
                        if (x < parseInt(total)) {
                            if (response.data[x]['media_type'] == 'IMAGE') {
                                var link = response.data[x]['permalink'] || '',
                                        image = response.data[x]['media_url'] || '',
                                        likes = response.data[x]['like_count'] || '',
                                        comments = response.data[x]['comments_count'] || '',
                                        output = _html;

                                output = output.replace(' href="#"', '');
                                output = output.replace(' src="#"', '');
                                output = output.replace('data-href', 'href');
                                output = output.replace('data-src', 'src');
                                output = output.replace('{{link}}', link);
                                output = output.replace('{{image}}', image);
                                output = output.replace('{{likes}}', likes);
                                output = output.replace('{{comments}}', comments);
                                outputHTML += output;
                            }
                        }
                    }
                    _this.html(outputHTML);
                    if (typeof (slider) !== 'undefined' && slider !== null) {
                        // Apply swiper
                        var sliderOptions = $.parseJSON(slider);
                        var swiperObj = instagramWrapperItem.parentElement;
                        new Swiper(swiperObj, sliderOptions);
                    } else {
                        // Apply isotope
                        if (!_this.find('.wow').length > 0) {
                            _this.find('.grid-item').css('visibility', 'hidden');
                        }
                        _this.imagesLoaded(function () {
                            if (!_this.find('.wow').length > 0) {
                                _this.find('.grid-item').css('visibility', '');
                            } else if (!isMobile) {
                                _this.find('.grid-item').css('visibility', 'hidden');
                            }
                            _this.removeClass('grid-loading');
                            _this.isotope({
                                layoutMode: 'masonry',
                                itemSelector: '.grid-item',
                                percentPosition: true,
                                stagger: 0,
                                masonry: {
                                    columnWidth: '.grid-sizer',
                                }
                            });
                            isotopeObjs.push(_this);
                        });
                    }
                },
                error: function (data) {
                    var output = '<div class="col-12"><span class=text-center>No Images Found</span></div>';
                    _this.append(output);
                }
            });
        });
        
        /* revolution */
        /* home-creative-studio */
        if ($("#rev_slider_151_1").length > 0 && $("#rev_slider_151_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_151_1");
        } else if ($("#rev_slider_151_1").length > 0) {
            $("#rev_slider_151_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: "revolution/js/",
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "off",
                    keyboard_direction: "vertical",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    touch: {
                        touchenabled: "on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    },
                    arrows: {
                        style: "uranus",
                        enable: true,
                        hide_onmobile: false,
                        hide_over: 479,
                        hide_onleave: false,
                        tmp: '',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 0,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 0,
                            v_offset: 0
                        }
                    }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                scrolleffect: {
                    blur: "on",
                    maxblur: "20",
                    on_slidebg: "on",
                    direction: "top",
                    multiplicator: "2",
                    multiplicator_layers: "2",
                    tilt: "10",
                    disable_on_mobile: "off"
                },
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 400,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55]
                },
                shadow: 0,
                spinner: "spinner3",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "0px",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false
                }
            });
        }
        
        /* home classic web agency */
        if ($("#rev_slider_1174_1").length > 0 && $("#rev_slider_1174_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_1174_1");
        } else if ($("#rev_slider_1174_1").length > 0) {
            $("#rev_slider_1174_1").show().revolution({
                sliderType: "hero",
                jsFileLocation: "revolution/js/",
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 400,
                    levels: [10, 15, 20, 25, 30, 35, 40, -10, -15, -20, -25, -30, -35, -40, -45, 55]
                },
                shadow: 0,
                spinner: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                disableProgressBar: "on",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    disableFocusListener: false
                }
            });
        }
        
        /* home classic corporate */
        if ($("#rev_slider_1078_1").length > 0 && $("#rev_slider_1078_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_1078_1");
        } else if ($("#rev_slider_1078_1").length > 0) {
            $("#rev_slider_1078_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: "revolution/js/",
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "on",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    touch: {
                        touchenabled: "on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    }
                    ,
                    arrows: {
                        style: "zeus",
                        enable: true,
                        hide_onmobile: true,
                        hide_under: 600,
                        hide_onleave: true,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        tmp: '<div class="tp-title-wrap">  	<div class="tp-arr-imgholder"></div> </div>',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 30,
                            v_offset: 0
                        }
                    }
                    ,
                    bullets: {
                        enable: true,
                        hide_onmobile: false,
                        hide_under: 300,
                        style: "hermes",
                        hide_onleave: false,
                        hide_delay: 200,
                        hide_delay_mobile: 1200,
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 30,
                        space: 8,
                        tmp: '<span class="tp-bullet-img-wrap">  <span class="tp-bullet-image"></span></span><span class="tp-bullet-title">{{title}}</span>'
                    }
                },
                viewPort: {
                    enable: true,
                    outof: "pause",
                    visible_area: "80%",
                    presize: false
                },
                responsiveLevels: [1240, 1024, 778, 480],
                visibilityLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [600, 600, 500, 400],
                lazyType: "none",
                parallax: {
                    type: "mouse",
                    origo: "slidercenter",
                    speed: 2000,
                    levels: [2, 3, 4, 5, 6, 7, 12, 16, 10, 50, 46, 47, 48, 49, 50, 55]
                },
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false
                }
            });
        }
        
        /* home creative minimalist portfolio */
        if ($("#rev_slider_26_1").length > 0 && $("#rev_slider_26_1").revolution == undefined) {
            revslider_showDoubleJqueryError("#rev_slider_26_1");
        } else if ($("#rev_slider_26_1").length > 0) {
            $("#rev_slider_26_1").show().revolution({
                sliderType: "standard",
                jsFileLocation: "revolution/js/",
                sliderLayout: "fullscreen",
                dottedOverlay: "none",
                delay: 9000,
                navigation: {
                    keyboardNavigation: "on",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation: "off",
                    mouseScrollReverse: "default",
                    onHoverStop: "off",
                    touch: {
                        touchenabled: "on",
                        touchOnDesktop: "on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    }
                    ,
                    arrows: {
                        style: "uranus",
                        enable: false,
                        hide_onmobile: true,
                        hide_under: 778,
                        hide_onleave: false,
                        tmp: '',
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 15,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 15,
                            v_offset: 0
                        }
                    }
                    ,
                    bullets: {
                        enable: true,
                        hide_onmobile: false,
                        style: "hermes",
                        hide_onleave: false,
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        h_offset: 0,
                        v_offset: 30,
                        space: 6,
                        tmp: ''
                    }
                },
                responsiveLevels: [1240, 1025, 778, 480],
                visibilityLevels: [1240, 1025, 778, 480],
                gridwidth: [1240, 1025, 778, 480],
                gridheight: [868, 768, 960, 720],
                lazyType: "none",
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 2000,
                    levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 46, 47, 48, 49, 50, 51, 55],
                },
                shadow: 0,
                spinner: "off",
                stopLoop: "off",
                stopAfterLoops: -1,
                stopAtSlide: -1,
                shuffle: "off",
                autoHeight: "off",
                fullScreenAutoWidth: "off",
                fullScreenAlignForce: "off",
                fullScreenOffsetContainer: "",
                fullScreenOffset: "0px",
                hideThumbsOnMobile: "off",
                hideSliderAtLimit: 0,
                hideCaptionAtLimit: 0,
                hideAllCaptionAtLilmit: 0,
                debugMode: false,
                fallbacks: {
                    simplifyAll: "off",
                    nextSlideOnWindowFocus: "off",
                    disableFocusListener: false,
                }
            });
        }
        
        /* magnific popup */
        $('.header-search-form').magnificPopup({
            mainClass: 'mfp-fade',
            closeOnBgClick: true,
            preloader: false,
            // for white backgriund
            fixedContentPos: false,
            closeBtnInside: false,
            callbacks: {
                open: function () {
                    setTimeout(function () {
                        $('.search-input').focus();
                    }, 500);
                    $('#search-header').parent().addClass('search-popup');
                    if (!isMobile) {
                        $('body').addClass('overflow-hidden');
                        $('body').addClass('w-100');
                        document.onmousewheel = ScrollStop;
                    } else {
                        $('body, html').on('touchmove', function (e) {
                            e.preventDefault();
                        });
                    }
                },
                close: function () {
                    if (!isMobile) {
                        $('body').removeClass('overflow-hidden');
                        $('body').removeClass('w-100');
                        $('#search-header input[type=text]').each(function (index) {
                            if (index == 0) {
                                $(this).val('');
                                $("#search-header").find("input:eq(" + index + ")").css({"border": "none", "border-bottom": "2px solid rgba(255,255,255,0.5)"});
                            }
                        });
                        document.onmousewheel = ScrollStart;
                    } else {
                        $('body, html').unbind('touchmove');
                    }
                }
            }
        });

        $(document).on('click', '.search-button', function () {
            var error = true;
            var formObj = $(this).parents('form');
            formObj.find('input[type=text]').each(function (index) {
                var _this = $(this),
                        searchVal = _this.val();
                if (searchVal === null || searchVal === '') {
                    formObj.find('input:eq(' + index + ')').addClass('required-error');
                    error = false;
                } else {
                    formObj.find('input:eq(' + index + ')').removeClass('required-error');
                }
            });
            return error;
        });

        $(document).on("click", '.navbar .navbar-collapse a.dropdown-toggle, .accordion-style1 .panel-heading a, .accordion-style2 .panel-heading a, .accordion-style3 .panel-heading a, .toggles .panel-heading a, .toggles-style2 .panel-heading a, .toggles-style3 .panel-heading a, a.carousel-control, .nav-tabs a[data-bs-toggle="tab"], a.shopping-cart', function (e) {
            e.preventDefault();
            resetIsotopeLayoutLoop(isotopeObjs, true);
        });

        $(document).on('touchstart click', 'body', function (e) {
            if ($(window).width() < 992) {
                if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse').hasClass('show') && !$(e.target).hasClass('navbar-toggle')) {
                    $('.navbar-collapse').collapse('hide');
                }
            } else {
                if (!$('.navbar-collapse').has(e.target).is('.navbar-collapse') && $('.navbar-collapse').hasClass('show')) {
                    $('.navbar-collapse').find('a.dropdown-toggle').addClass('collapsed');
                    $('.navbar-collapse').find('ul.dropdown-menu').removeClass('show');
                    $('.navbar-collapse a.dropdown-toggle').removeClass('active');
                }
            }
        });

        $('.navbar-collapse a.dropdown-toggle').on('touchstart', function (e) {
            $('.navbar-collapse a.dropdown-toggle').not(this).removeClass('active');
            if ($(this).hasClass('active'))
                $(this).removeClass('active');
            else
                $(this).addClass('active');
        });

        $('button.navbar-toggle').on("click", function (e) {
            if (isMobile) {
                $(".cart-content").css('opacity', '0');
                $(".cart-content").css('visibility', 'hidden');
            }
        });

        $('a.dropdown-toggle').on("click", function (e) {
            if (isMobile) {
                $(".cart-content").css('opacity', '0');
                $(".cart-content").css('visibility', 'hidden');
            }
        });

        $(document).on('click', '.navbar-toggler', function () {
            if ($(this).hasClass('collapsed')) {
                $('ul.navbar-nav').find('.open').removeClass('open');
            }
        });

        $(document).on('click', '.navbar-collapse [data-bs-toggle="dropdown"]', function (event) {

            event.preventDefault();
            var _thisParent = $(this).parent();
            if (!_thisParent.hasClass('open')) {
                _thisParent.siblings('.dropdown').removeClass('open');
                _thisParent.addClass('open');
            } else {
                $('ul.navbar-nav').find('.open').removeClass('open');
            }

            var $innerLinkLI = $(this).parents('ul.navbar-nav').find('li.dropdown a.inner-link').parent('li.dropdown');
            if (!$(this).hasClass('inner-link') && !$(this).hasClass('dropdown-toggle') && $innerLinkLI.hasClass('show')) {
                $innerLinkLI.removeClass('show');
            }
            var target = $(this).attr('target');
            if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').indexOf("#") <= -1 && !$(event.target).is('i')) {
                if (event.ctrlKey || event.metaKey) {
                    window.open($(this).attr('href'), "_blank");
                    return false;
                } else if (!target)
                    window.location = $(this).attr('href');
                else
                    window.open($(this).attr('href'), target);

            } else if ($(window).width() > 991 && $(this).attr('href').indexOf("#") <= -1) {
                if (event.ctrlKey || event.metaKey) {
                    window.open($(this).attr('href'), "_blank");
                    return false;
                } else if (!target)
                    window.location = $(this).attr('href');
                else
                    window.open($(this).attr('href'), target);

            } else if ($(window).width() <= 991 && $(this).attr('href') && $(this).attr('href').length > 1 && $(this).attr('href').indexOf("#") >= 0 && $(this).hasClass('inner-link')) {
                $(this).parents('ul.navbar-nav').find('li.dropdown').not($(this).parent('.dropdown')).removeClass('show');
                if ($(this).parent('.dropdown').hasClass('show')) {
                    $(this).parent('.dropdown').removeClass('show');
                } else {
                    $(this).parent('.dropdown').addClass('show');
                }
                $(this).toggleClass('active');
            }
        });

        /* progress bar on jQuery appear */
        if ($('.progress-bar').length > 0) {
            $(document).on('appear', '.progress-bar', function (e) {
                if (!$(this).hasClass('appear')) {
                    $(this).addClass('appear');
                    var total = $(this).attr('aria-valuenow'),
                            delay = 300;
                    $(this).animate({'width': total + '%'}, {
                        duration: delay,
                        easing: "swing",
                        progress: function (animation, progress, msRemaining) {
                            var counter = parseInt(total * progress);
                            $(this).find('span').html(counter + '%');
                        }
                    });
                }
            });
        }
        
        /* resize header menu */
        $('nav.full-width-pull-menu ul li.dropdown .dropdown-toggle').on('click', function (e) {

            var _thisParent = $(this).parent('li');
            if (_thisParent.find('ul.dropdown-menu').length > 0) {
                if (!_thisParent.hasClass('show')) {
                    _thisParent.siblings('.dropdown').removeClass('show');
                    _thisParent.addClass('show');
                } else {
                    $('nav.full-width-pull-menu ul').find('.show').removeClass('show');
                }
            }
        });
        
        /* accordion */
        $('.accordion-event').each(function () {
            var _this = $(this),
                    activeIconClass = _this.attr('data-active-icon') || '',
                    inactiveIconClass = _this.attr('data-inactive-icon') || '';
            $('.collapse', this).on('show.bs.collapse', function () {
                var id = $(this).attr('id');
                $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
                $('a[href="#' + id + '"] .panel-title i').addClass(activeIconClass).removeClass(inactiveIconClass);
            }).on('hide.bs.collapse', function () {
                var id = $(this).attr('id');
                $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
                $('a[href="#' + id + '"] .panel-title i').addClass(inactiveIconClass).removeClass(activeIconClass);
            });
        });

        $(document).on('click', '.nav.navbar-nav a.inner-link', function (e) {
            $(this).parents('ul.navbar-nav').find('a.inner-link').removeClass('active');
            var $this = $(this);
            $(this).parents('.navbar-collapse').collapse('hide');

            setTimeout(function () {
                $this.addClass('active');
            }, 1000);
        });
        
        /* blog hover box */
        $(document).on("mouseenter", ".blog-post-style4 .grid-item", function (e) {
            $(this).find("figcaption .blog-hover-text").slideDown(300);
        });
        $(document).on("mouseleave", ".blog-post-style4 .grid-item", function (e) {
            $(this).find("figcaption .blog-hover-text").slideUp(300);
        });

        SetResizeContent();
        
        /* demo button */
        var $buythemediv = '<div class="buy-theme alt-font d-none d-lg-block"><a href="https://themeforest.net/item/pofo-creative-agency-corporate-and-portfolio-multipurpose-template/20645944?ref=themezaa" target="_blank"><i class="ti-shopping-cart"></i><span>Buy Theme</span></a></div><div class="all-demo alt-font d-none d-lg-block"><a href="mailto:info@themezaa.com?subject=POFO - Creative Agency, Corporate and Portfolio Multi-purpose Template - Quick Question"><i class="ti-email"></i><span>Quick Question?</span></a></div>';
        $('body').append($buythemediv);

        $(document).on("touchstart", ".sidebar-wrapper", function () {
            clearOpen();
        });

        var getNav = $("nav.navbar.bootsnav"), getIn = getNav.find("ul.nav").data("in"), getOut = getNav.find("ul.nav").data("out");
        function clearOpen() {
            $('li.dropdown').removeClass("on").removeClass("show");
            $(".dropdown-menu").stop().fadeOut('fast');
            $(".dropdown-menu").removeClass(getIn);
            $(".dropdown-menu").addClass(getOut);
        }

    });

    /* non retina image code */
    $( "img:not([data-at2x])" ).each( function() {
        $( this ).attr( 'data-no-retina', '' );
    });
    
    /* page load */
    $(document).on('load', function () {
        var hash = window.location.hash.substr(1);
        if (hash != "") {
            setTimeout(function () {
                $(document).imagesLoaded(function () {
                    var scrollAnimationTime = 1200,
                            scrollAnimation = 'easeInOutExpo';
                    var target = '#' + hash;
                    if ($(target).length > 0) {
                        $('html, body').stop()
                                .animate({
                                    'scrollTop': $(target).offset().top
                                }, scrollAnimationTime, scrollAnimation, function () {
                                    window.location.hash = target;
                                });
                    }
                });
            }, 500);
        }

        fullScreenHeight();
    });

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    function isIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
            return true;
        } else  // If another browser, return 0
        {
            return false;
        }
    }

    /* reset isotope loop */
    resetIsotopeLayoutLoop(isotopeObjs, false);

    /* window resize */
    $(window).resize(function () {

        setTimeout(function () {
            resetIsotopeLayoutLoop(isotopeObjs, true);
        }, 300);

    });

    /* get window width */
    function getWindowWidth() {
        return $(window).width();
    }

    /* get window height */
    function getWindowHeight() {
        return $(window).height();
    }

    /* megamenu position */
    function SetMegamenuPosition() {
        if ($(window).width() > 991) {
            setTimeout(function () {
                var totalHeight = $('nav.navbar').outerHeight();
                $('.mega-menu').css({top: totalHeight});
                if ($('.navbar-brand-top').length === 0)
                    $('.dropdown.simple-dropdown > .dropdown-menu').css({top: totalHeight});
            }, 200);
        } else {
            $('.mega-menu').css('top', '');
            $('.dropdown.simple-dropdown > .dropdown-menu').css('top', '');
        }
    }
    
    /* page title space */
    function setPageTitleSpace() {
        if ($('.navbar').hasClass('navbar-top') || $('nav').hasClass('navbar-fixed-top')) {
            if ($('.top-space').length > 0) {
                var top_space_height = $('.navbar').outerHeight();
                if ($('.top-header-area').length > 0) {
                    top_space_height = top_space_height + $('.top-header-area').outerHeight();
                }
                $('.top-space').css('margin-top', top_space_height + "px");
            }
        }
    }
    
    /* swiper button position in auto height slider */
    function setButtonPosition() {
        if ($(window).width() > 767 && $(".swiper-auto-height-container").length > 0) {
            var leftPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-left'));
            var bottomPosition = parseInt($('.swiper-auto-height-container .swiper-slide').css('padding-bottom'));
            var bannerWidth = parseInt($('.swiper-auto-height-container .slide-banner').outerWidth());
            $('.navigation-area').css({'left': bannerWidth + leftPosition + 'px', 'bottom': bottomPosition + 'px'});
        } else if ($(".swiper-auto-height-container").length > 0) {
            $('.navigation-area').css({'left': '', 'bottom': ''});
        }
    }
    
    /* parallax text */
    function parallax_text() {
        var window_width = $(window).width();
        if (window_width > 1024) {
            if ($('.swiper-auto-slide .swiper-slide').length !== 0) {
                $(document).on("mousemove", ".swiper-auto-slide .swiper-slide", function (e) {
                    var positionX = e.clientX;
                    var positionY = e.clientY;
                    positionX = Math.round(positionX / 10) - 80;
                    positionY = Math.round(positionY / 10) - 40;
                    $(this).find('.parallax-text').css({'transform': 'translate(' + positionX + 'px,' + positionY + 'px)', 'transition-duration': '0s'});
                });

                $(document).on("mouseout", ".swiper-auto-slide .swiper-slide", function (e) {
                    $('.parallax-text').css({'transform': 'translate(0,0)', 'transition-duration': '0.5s'});
                });
            }
        }
    }

    /* setup swiper slider */
    function setupSwiper() {

        /* swiper slider using params */
        var swiperItems = document.querySelectorAll(".swiper-container:not( .swiper-auto-slide ):not( .swiper-bottom-scrollbar-full ):not( .instafeed-wrapper )");
        swiperItems.forEach(function (swiperItem, index) {
            var _this = $(swiperItem),
                    sliderOptions = _this.attr('data-slider-options'),
                    swiperAutoSlideIndex = 0;
            if (typeof (sliderOptions) !== 'undefined' && sliderOptions !== null) {

                sliderOptions = $.parseJSON(sliderOptions);

                /* If user have provided "data-slider-md-direction" attribute then below code will execute */
                var mdDirection = _this.attr('data-slider-md-direction');
                if (mdDirection != '' && mdDirection != undefined) {

                    var direction = (sliderOptions['direction'] != '' && sliderOptions['direction'] != undefined) ? sliderOptions['direction'] : mdDirection;
                    sliderOptions['on'] = {
                        init: function () {
                            if (getWindowWidth() <= sliderBreakPoint) {
                                this.changeDirection(mdDirection);
                            } else {
                                this.changeDirection(direction);
                            }
                            this.update();
                        },
                        resize: function () {
                            if (getWindowWidth() <= sliderBreakPoint) {
                                this.changeDirection(mdDirection);
                            } else {
                                this.changeDirection(direction);
                            }
                            this.update();
                        }
                    };
                }

                /* If user have provided "data-thumb-slider-md-direction" attribute then below code will execute */
                if (sliderOptions['thumbs'] != '' && sliderOptions['thumbs'] != undefined) {

                    var mdThumbDirection = _this.attr('data-thumb-slider-md-direction');
                    if (mdThumbDirection != '' && mdThumbDirection != undefined) {

                        var thumbDirection = (sliderOptions['thumbs']['swiper']['direction'] != '' && sliderOptions['thumbs']['swiper']['direction'] != undefined) ? sliderOptions['thumbs']['swiper']['direction'] : mdThumbDirection;
                        sliderOptions['thumbs']['swiper']['on'] = {
                            init: function () {
                                if (getWindowWidth() <= sliderBreakPoint) {
                                    this.changeDirection(mdThumbDirection);
                                } else {
                                    this.changeDirection(thumbDirection);
                                }
                                this.update();
                            },
                            resize: function () {
                                if (getWindowWidth() <= sliderBreakPoint) {
                                    this.changeDirection(mdThumbDirection);
                                } else {
                                    this.changeDirection(thumbDirection);
                                }
                                this.update();
                            },
                            click: function () {
                                /* Product thumbs automatic next / previous on click slide */
                                if (this.activeIndex == this.clickedIndex) {
                                    this.slidePrev();
                                } else {
                                    this.slideNext();
                                }
                            }
                        };
                    }
                }

                /* If user have provided "data-slider-number-pagination" attribute then below code will execute */
                var numberPagination = _this.attr('data-slider-number-pagination');
                if (numberPagination != '' && numberPagination != undefined) {

                    sliderOptions['pagination']['renderBullet'] = function (index, className) {
                        return '<span class="' + className + '">' + pad((index + 1)) + '</span>';
                    };

                    sliderOptions['on'] = {
                        resize: function () {
                            this.update();
                        }
                    };
                }

                /* If user have provided "data-slide-change-on-click" attribute then below code will execute */
                var changeOnClick = _this.attr('data-slide-change-on-click');
                if (changeOnClick != '' && changeOnClick != undefined) {

                    sliderOptions['on'] = {
                        click: function () {
                            if (this.activeIndex > this.clickedIndex) {
                                this.slidePrev();
                            } else if (this.activeIndex < this.clickedIndex) {
                                this.slideNext();
                            }
                        }
                    };
                }

                /* If user have provided "data-thumbs" attribute then below code will execute */
                var dataThumbs = _this.attr('data-thumbs');
                if (dataThumbs != '' && dataThumbs != undefined) {
                    dataThumbs = $.parseJSON(dataThumbs);
                    if (typeof (dataThumbs) !== 'undefined' && dataThumbs !== null) {
                        sliderOptions['pagination']['renderBullet'] = function (index, className) {
                            return '<span class="' + className + '" style="background-image: url( ' + dataThumbs[index] + ' )"></span>';
                        }
                    }
                }

                var swiperObj = new Swiper(swiperItem, sliderOptions);
                swiperObjs.push(swiperObj);
            }
        });
    }

    /* destroy swiper loop */
    function destroySwiperLoop() {
        for (var i = 0; i < swiperObjs.length; i++) {
            var swiperObj = swiperObjs[i],
                    destroyWidth = swiperObj.$el.attr('data-slider-destroy');
            // If user have provided "data-slider-destroy" attribute then below code will execute
            if (destroyWidth != '' && destroyWidth != undefined) {
                if (getWindowWidth() <= destroyWidth) {
                    swiperObj.destroy(false, true); // Destroy swiper
                } else if (swiperObj.destroyed) {
                    swiperObjs.splice(i, 1);
                    setupSwiper(); // Initialize swiper again
                }
            }
        }
        ;
    }

    /* reset swiper loop */
    function resetSwiperLoop() {
        setTimeout(function () {
            for (var i = 0; i < swiperObjs.length; i++) {
                var swiperObj = swiperObjs[i];
                swiperObj.update();
            }
        }, 500);
    }

    /* remove wow animation */
    function removeWowAnimation(gridObj) {
        gridObj.find('.grid-item').removeClass('animate__animated').css('visibility', ''); // avoid problem to filter after sorting
        if ($('.wow').length > 0) {
            gridObj.find('.grid-item').each(function () {
                var _this = $(this);
                // remove perticular element from WOW array when you don't want animation on element after DOM lead
                wow.removeBox(this);
                _this.css('-webkit-animation', 'none');
                _this.css('-moz-animation', 'none');
                _this.css('-ms-animation', 'none');
                _this.css('animation', 'none');
            });
        }
    }

    /* reset isotope loop */
    function resetIsotopeLayoutLoop(isotopeObjs, removeAnimation) {
        for (var i = 0; i < isotopeObjs.length; i++) {
            if (removeAnimation) {
                removeWowAnimation(isotopeObjs[i]);
            }
            if (isotopeObjs[i].data('isotope')) {
                isotopeObjs[i].isotope('layout');
            }
        }
        ;
    }

    /* submit form using ajax */
    function submitAJAXForm(_this) {

        var formObj = _this.parents('form'),
                actionURL = formObj.attr('action'),
                resultsObj = formObj.find('.form-results'),
                redirectVal = formObj.find('[name="redirect"]').val();

        if (actionURL != '' && actionURL != undefined) {
            _this.addClass('loading');
            $.ajax({
                type: 'POST',
                url: actionURL,
                data: formObj.serialize(),
                success: function (result) {
                    _this.removeClass('loading');
                    if (redirectVal != '' && redirectVal != undefined) {
                        window.location.href = redirectVal;
                    } else {
                        if (typeof (result) !== 'undefined' && result !== null) {
                            result = $.parseJSON(result);
                        }
                        formObj.find('input[type=text],input[type=email],input[type=tel],input[type=password],textarea').each(function () {
                            $(this).val('');
                            $(this).removeClass('required-error');
                        });
                        formObj.find('.g-recaptcha').removeClass('required-error');
                        formObj.find('input[type=checkbox],input[type=radio]').prop('checked', false);
                        if (formObj.find('.g-recaptcha').length > 0) {
                            grecaptcha.reset();
                        }
                        formObj.find('input[name=action],input[name=g-recaptcha-response]').remove();
                        resultsObj.removeClass('alert-success').removeClass('alert-danger').hide();
                        resultsObj.addClass(result.alert).html(result.message);
                        resultsObj.removeClass('d-none').fadeIn('slow').delay(4000).fadeOut('slow');
                    }
                }
            });
        }
    }

})(jQuery);