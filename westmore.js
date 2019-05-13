/* Sample JavaScript file added with ScriptTag resource. 
This sample file is meant to teach best practices.
Your app will load jQuery if it's not defined. 
Your app will load jQuery if jQuery is defined but is too old, e.g. < 1.7. 
Your app does not change the definition of $ or jQuery outside the app. 
Example: if a Shopify theme uses jQuery 1.4.2, both of these statements run in the console will still return '1.4.2'
once the app is installed, even if the app uses jQuery 1.9.1:
jQuery.fn.jquery => "1.4.2" 
$.fn.jquery -> "1.4.2"
*/

/* Using a self-executing anonymous function - (function(){})(); - so that all variables and functions defined within 
aren’t available to the outside world. */
var img_height;
var img_width;
var player1;
var player2;
var trivideo_clicked = false;
var beforeaftervideo_clicked = false;

(function () {

    /* Load Script function we may need to load jQuery from the Google's CDN */
    /* That code is world-reknown. */
    /* One source: http://snipplr.com/view/18756/loadscript/ */

    var loadScript = function (url, callback) {

        var script = document.createElement("script");
        script.type = "text/javascript";

        // If the browser is Internet Explorer.
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
            // For any other browser.
        } else {
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);

    };

    /* This is my app's JavaScript */
    var myAppJavaScript = function ($) {
        
        document.addEventListener("DOMContentLoaded", yall);

        // $ in this scope references the jQuery object we'll use.
        // Don't use jQuery, or jQuery191, use the dollar sign.
        // Do this and do that, using $.
        // $('body').append('<p>Your app is using jQuery version ' + $.fn.jquery + '</p>');
        $(document).ready(function(){
            // $('.open-popup-link').magnificPopup({
            //     type:'inline',
            //     closeBtnInside: true
            // }).magnificPopup('open');

            if ( $('.container__full-width.heading').length ) {
                //$('.container__full-width.heading').css('opacity', '1');
            }
            

            // make sure there is a flexslider element before initializing
            if ( $('.flexslider').length ) {
                $('.flexslider').flexslider({
                    animation: "fade",
                    controlNav: false,
                    prevText: '',
                    nextText: '',
                    // before: function(slider){
                    //     $('.flexslider').resize();
                    // },
                    // after: function(slider){
                    //     $('.flexslider').resize();
                    // }                
                });
            }

            if ( $('.flexslider-checkout').length ) {
                $('.flexslider-checkout').flexslider({
                    animation: "fade",
                    directionNav: false,
                    slideshow: false,
                });
            }

            // details/summary html tag polyfill for IE/Edge
            if ( $('details').length ) {
                $('details').details();
            }

            tvOfferNavNoHover();
            resizeBcpSwatches();
            setSlideDotsTop();
            equalizeShadePopupColumns();
            equalizeUnretouchedBadges();
            setupShades();
            autoSelectSystem();
            $(window).on('resize', function() {
                tvOfferNavNoHover();
                resizeBcpSwatches();
                calcBcpSystemBox();
                setBadgeTop();
                equalizeShadeSelectorColumns();
                setSlideDotsTop();
                equalizeShadePopupColumns();
                equalizeUnretouchedBadges();
                setupShades();
                if (typeof userSelectedSystem !== 'undefined') {
                    if ( ! userSelectedSystem ) {
                        autoSelectSystem();
                    }
                }
            });

            if ( $('.open-popup-link').length ) {
                $('.open-popup-link').magnificPopup({
                    type: 'inline',
                    closeBtnInside: true,
                    callbacks: {
                        open: equalizeShadePopupColumns,
                    },
                });
            }
            
            
            // Change the background of the selected system,
            // add a checkmark to the selected system
            $('.choose-system .desktop-platinum, .choose-system .mobile-platinum').on( 'click', function() {
                userSelectedSystem = true;
                onClickSelectPlatinum($(this));
            })
            $('.choose-system .desktop-essentials, .choose-system .mobile-essentials').on( 'click', function() {
                userSelectedSystem = true;
                onClickSelectEssentials($(this));
            })

            // set the default data on page load
            if ( $('#order-summary-selected').length ) {
                
                $('#order-summary-selected').data('bcp-shade', 'natural radiance');
                $('#order-summary-selected').data('browgel-shade', 'brunette');
            }

            // checkout page mobile sizing the smaller column to the same size
            // as the larger column
            function equalizeCheckoutColumns() {
                // only run this function on mobile sizes
                if ( $(document).width() > 720 ) {
                    return;
                }

                if ( $('.mobile-platinum').length ) {
                    $('.mobile-essentials').height(function () {
                        var my_height = $('.mobile-platinum').height();
                        if ( my_height != 0 ) {
                            return my_height;
                        }
                    });
                }
            }
            function updateOwlStuff() {
                equalizeCheckoutColumns();
                updateOwlPadding();
            }

            if ( $('.owl-carousel').length ) {
                var owl = $('.owl-carousel');
                owl.owlCarousel({
                    items: 1,
                    center: false,
                    stagePadding: 32,
                    margin: 4,
                    mouseDrag: false,
                    touchDrag: true,
                    // nav: true,
                    // navText: ["<i class='fas fa-caret-left fa-4x'></i>","<i class='fas fa-caret-right fa-4x'></i>"],
                    onChanged: checkOwlNavArrows,
                    onInitialized: updateOwlStuff,
                    onResized: updateOwlStuff,
                    onRefreshed: updateOwlStuff,
                    // onTranslated: updateOwlPadding,
                });
            }

            // put a purple border around the selected image
            // and update the text associated with the selected image
            $('.shade-swatches.bcp img').on('click', function () {
                var $this = $(this);

                if ( $(window).width() < (721 - 17) ) {
                    bcpShadeExtendedSelectMobile($this);
                } else {
                    bcpShadeSelect($this, true);
                }
            })

            $('.shade-swatches.lasting-effects img').on('click', function () {
                var $this = $(this);

                if ( $(window).width() < (721 - 17) ) {
                    browGelExtendedShadeSelectMobile($this);
                } else {
                    browGelShadeSelect($this, true);
                }
            })

            if ( $('.tri-video').length ) {
                // load the API since this selector is unique to the page where
                // this script needs to load
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
                $('.tri-video').on('click', function() {
                    // set the player size
                    img_height = $('.tri-video').height();
                    img_width = $('.tri-video').width();
                    $('#tri-video-player').height(img_height);
                    $('#tri-video-player').width(img_width);

                    // hide the thumbnail, show the player
                    $(this).hide();
                    $('#tri-video-player').show();
                    player1.playVideo();
                });
            }

            if ( $('#before-after-thumbnail').length ) {
                $('#before-after-thumbnail').on('click', function() {
                    // set the player size
                    img_height = $('#before-after-thumbnail').height();
                    img_width = $('#before-after-thumbnail').width();
                    $('#beforeafter-player').height(img_height);
                    $('#beforeafter-player').width(img_width);

                    // hide the thumbnail, show the player
                    $(this).hide();
                    $('#beforeafter-player').show();
                    player2.playVideo();
                });
            }

            if ( $('.badge-mobile').length ) {
                setBadgeTop();
            }

            if ( $('.shade-selector').length ) {
                equalizeShadeSelectorColumns();
            }
            if ( $('.read-more-trigger').length ) {
                $('.read-more-trigger').on( 'click', function() {
                    $('.read-more-target').toggle(500, function() {
                        if ( $('.read-more-trigger').html() == '(+) SEE MORE' ) {
                            $('.read-more-trigger').html('(-) SEE LESS');
                        } else {
                            $('.read-more-trigger').html('(+) SEE MORE');
                        }
                    });
                });
            }

            if ( $('.bcp-checkout').length ) {
                $('.bcp-checkout').magnificPopup({
                    items: [
                        {
                        src: '#deluxe-offer-popup',
                        type: 'inline'
                        },
                        {
                        src: '#last-offer-popup',
                        type: 'inline'
                        },
                    ],
                    modal: true,
                });

                // $('.bcp-checkout').on( 'click', function() {
                //     addBcp();
                // });
            }

            if ( $('.error-message').length ) {
                $('.error-message i').on( 'click', function() {
                    $('.error-message').hide();
                });
            }
            if ( $('.step1-progress').length ) {
                $('.step1-progress').on( 'click', function() {
                    $('body, html').animate({
                        scrollTop: 0
                    }, 350);
                    $('.step2-progress').removeClass('selected');
                });
            }
            if ( $('.step2-progress').length ) {
                $('.step2-progress').on( 'click', function() {
                    scrollStep2();
                });
            }
            if ( $('.right-arrow').length ) {
                $('.right-arrow').on( 'click', function() {
                    owl.trigger('next.owl.carousel');
                    owlNext();
                });
            }
            if ( $('.left-arrow').length ) {
                $('.left-arrow').on( 'click', function() {
                    owl.trigger('prev.owl.carousel');
                    owlPrev();
                });
            }
        });

        function tvOfferNavNoHover() {
            if ( $('.regular-nav a img').length ){
                if ( $(window).width() > (1021-17) ) {
                    $('.regular-nav a img').parent().addClass('no-hover');
                } else {
                    $('.regular-nav a img').parent().removeClass('no-hover');
                }
            }
        }

        function owlNext() {
            $('.right-arrow').removeClass('show');
            $('.left-arrow').addClass('show');
        }
        function owlPrev() {
            $('.left-arrow').removeClass('show');
            $('.right-arrow').addClass('show');
        }

        var owl_index = 0;

        function checkOwlNavArrows(event) {
            var item = event.item.index;     // Position of the current item

            // console.log(event);

            if ( owl_index != item ) {
                if ( item == 0 ) {
                    owlPrev();
                } else {
                    owlNext();
                }

                owl_index = item;
            }
        }
        function autoSelectSystem() {
            if ( ! $('#order-summary-selected').length ) {
                return;
            }
            // set the default system on mobile to Essentials
            if ( $(window).width() < (721 - 17) ) {
                selectedSystem = 'Essentials OTP';
                // $('#order-summary-selected').data('system', 'essentials');
                // console.log('set system to essentials');
                updateSummary('Essentials OTP', '$49.95');
            } else {
                selectedSystem = 'Essentials VIP';
                updateSummary('Essentials VIP', '$39.95');
                
                // console.log('set system to platinum');
            }
            // $('#order-summary-selected').data('system', selectedSystem.toLowerCase());
            // $('#order-summary-selected').html('The ' + selectedSystem + ' System');
        }
    
        function updateOwlPadding() {
            $('.owl-stage').css('padding-left', '0');
            // $('.owl-stage').css('padding-right', '0');
            // var stage_width = $('.owl-stage').width();
            // console.log('stage width: ' + stage_width);
            // stage_width += 32;
            // console.log('new stage width: ' + stage_width);
            // $('.owl-stage').width(stage_width);
        }

        function onClickSelectPlatinum(element) {
            var $this = element;

            // set both desktop and mobile classes on each click
            if ( $this.hasClass('desktop-platinum') ) {
                desktopSelectPlatinum($this);
            } else {
                desktopSelectPlatinum($('.choose-system .desktop-platinum'));

                // need to set this manually since the $this function below
                // will not set the checkmark
                $('.choose-system .desktop-platinum').find('.checkmark').html('✔');
            }
            
            if ( $this.hasClass('mobile-platinum') ) {
                mobileSelectPlatinum($this);
            } else {
                mobileSelectPlatinum($('.choose-system .mobile-platinum'));

                // need to set this manually since the $this function below
                // will not set the checkmark
                $('.choose-system .mobile-platinum').find('.checkmark').html('✔');
            }

            $this.find('.checkmark').html('✔');
            updateSummary('Essentials VIP', '$39.95');
            $this.addClass('selected');
            scrollStep2();
        }

        function onClickSelectEssentials(element) {
            var $this = element;
            if ( $this.hasClass('desktop-essentials') ) {
                desktopSelectEssentials($this);
            } else {
                desktopSelectEssentials($('.choose-system .desktop-essentials'));

                // need to set this manually since the $this function below
                // will not set the checkmark
                $('.choose-system .desktop-essentials').find('.checkmark').html('✔');
            }
            
            if ( $this.hasClass('mobile-essentials') ) {
                mobileSelectEssentials($this);
            } else {
                mobileSelectEssentials($('.choose-system .mobile-essentials'));

                // need to set this manually since the $this function below
                // will not set the checkmark
                $('.choose-system .mobile-essentials').find('.checkmark').html('✔');
            }
            $this.find('.checkmark').html('✔');
            updateSummary('Essentials OTP', '$49.95');
            $this.addClass('selected');
            scrollStep2();
        }
        

        function desktopSelectPlatinum($this) {
            $('.choose-system .desktop-essentials').removeClass('selected');
            $('.choose-system .desktop-essentials .checkmark').html('SELECT');

            $('.choose-system .desktop-platinum').addClass('selected');
        }

        function mobileSelectPlatinum($this) {
            $('.choose-system .mobile-essentials').removeClass('selected');
            $('.choose-system .mobile-essentials .checkmark').html('SELECT');

            $('.choose-system .mobile-platinum').addClass('selected');
        }

        function desktopSelectEssentials($this) {
            $('.choose-system .desktop-platinum').removeClass('selected');
            $('.choose-system .desktop-platinum .checkmark').html('SELECT');

            $('.choose-system .desktop-essentials').addClass('selected');
        }
        function mobileSelectEssentials($this) {
            $('.choose-system .mobile-platinum').removeClass('selected');
            $('.choose-system .mobile-platinum .checkmark').html('SELECT');

            $('.choose-system .mobile-essentials').addClass('selected');
        }

        function showCheckoutErrorMessage() {
            $('.error-message').show();
            $('.bcp-checkout').prop('disabled', false);
            $('.bcp-checkout').css('cursor', 'pointer');
            $('.bcp-checkout').html('NEXT: CHECKOUT');

            var resetState = setTimeout(function () {
                $('.error-message').fadeOut();
            }, 2500);
        }

        function equalizeUnretouchedBadges() {
            if ( $('.badge .mint-bg').length ) {
                var max_height;
                
                if ( $('.badge .mint-bg').length > 1 ) {
                    var mintbg_height = $('.badge .mint-bg');
                    max_height = mintbg_height[0].getBoundingClientRect().height;

                    // the first one may be hidden, in which case its height is 0
                    if ( ! max_height ) {
                        max_height = mintbg_height[1].getBoundingClientRect().height;
                    }
                } else {
                    max_height = $('.badge .mint-bg').getBoundingClientRect().height;
                }

                $('.badge .purple-bg').outerHeight(max_height + 'px');
                $('.badge .white-bg').outerHeight(max_height + 'px');
            }
        }
        function equalizeShadePopupColumns() {
            if ( $('.shade-box-description.bronze-radiance').length ) {
                var max_height = $('.shade-box-description.bronze-radiance').outerHeight();

                $('.fair-radiance, .natural-radiance, .golden-radiance').each( function(element) {
                    $(this).outerHeight(max_height + 'px');
                });
            }
            if ( $('.shade-box-description.dark-brunette').length ) {
                var max_height = $('.shade-box-description.dark-brunette').outerHeight();
                $('.blonde, .brunette').each( function(element) {
                    $(this).outerHeight(max_height + 'px');
                });
            }
        }

        function equalizeShadeSelectorColumns() {
            if ( $('.shade-selector').length ) {
                var boxes = $('.box');
                var max_height = 0;

                // remove the previous height settings if any
                $('.box').css('height', '');

                // now run the max height checking again with the actual heights
                boxes.each(function (element) {
                    
                    var height = $(this).outerHeight();
                    if ( height > max_height ) {
                        max_height = height;
                    }
                });

                boxes.outerHeight(max_height + 'px');
            }
        }

        function setSlideDotsTop() {
            if ( $('.flexslider-checkout').length ) {
                var slide_height = $('.flexslider-checkout').height();
                slide_height += 16;
                $('.choose-system .flex-control-nav').css('top', slide_height+'px');
                $('.choose-system .flex-control-nav').css('bottom', 'unset');
            }
        }
        function setBadgeTop() {
            if ( $('.badge-mobile').length ) {
                var slide_height = $('.flexslider img').height();
                slide_height += 16;
                $('.badge-mobile').css('top', slide_height+'px')
            }
        }
        function calcBcpSystemBox() {
            $('.flexslider-checkout .column-right').height(function () {
                return $('.flexslider-checkout .column-left').height();
            });            
        }
        function resizeBcpSwatches() {
            var box_width = $('.all-shades .box').css("width");
            $('.all-shades2 .box2 > img').width(box_width);           
        }

        function calcResultsBcpFinalOfferMargin() {
            var rightMargin = parseFloat($('.results .row .column-right').css("margin-right"));
            console.log("margin" + rightMargin);
            $('.results .row .column-right .image-right img').css("margin-right", "-"+rightMargin+"px");
        }
        function updateSummary(selectedSystem, price) {
            $('#summary-selected').html('The ' + selectedSystem + ' System');
            $('#summary-selected-price').html('Only ' + price + '+S/H');
            $('#order-summary-selected').html('The ' + selectedSystem + ' System');
            $('#order-summary-selected').data('system', selectedSystem.replace(/\s+/g, '-').toLowerCase());

            // update other text fields
            $('#summary-name').text(selectedSystem);
            $('#summary-price').text(price);

            if ( selectedSystem == 'Essentials VIP') {
                $('#subscription-summary').show();
                $('#otp-summary').hide();
                $('.subscription-addons').show();
            } else {
                $('#subscription-summary').hide();
                $('#otp-summary').show();
                $('.subscription-addons').hide();
            }
        }

        function scrollStep2() {
            $('.step-progress .step2-progress').addClass('selected');            
            var position = $('#step2').offset().top;
            // need to factor in the fixed top bar
            position -= 80;
            $('body, html').animate({
                scrollTop: position
            }, 350);
        }
        function setupShades() {
            // need to subtract the width of the scrollbar to match the media query
            if ( $(window).width() < (721 - 17) ) {
                $('.shade-swatches.bcp img.selected').length ? bcpShadeExtendedSelectMobile($('.shade-swatches.bcp img.selected')) : null;
                $('.shade-swatches.lasting-effects img.selected').length ? browGelExtendedShadeSelectMobile($('.shade-swatches.lasting-effects img.selected')) : null;
            } else {
                $('.shade-swatches.bcp img.selected').length ? bcpShadeSelect($('.shade-swatches.bcp img.selected'), true) : null;
                $('.shade-swatches.lasting-effects img.selected').length ? browGelShadeSelect($('.shade-swatches.lasting-effects img.selected'), true) : null;
            }        
        }
        function bcpShadeSelect(element, printShade) {
            var $this = element;
            $('.shade-swatches.bcp img').removeClass('selected');
        
            // var shadeText = 'Shade: ' + $this.data('shade');
            var shadeText;
            if ( printShade ) {
                shadeText = 'Shade: ' + $this.data('shade');
            } else {
                shadeText = $this.data('shade');
            }
        
            $('#bcp-shade-selected').text(shadeText);
            $('#order-summary-selected').data('bcp-shade', $this.data('shade').toLowerCase());
            $('.selected-bcpshade').text($this.data('shade'));

            // remove the background color with the jQuery shortcut
            $('.description-group.bcp').css('background-color', '');
        
            return $this.addClass('selected');
        }
        function bcpShadeExtendedSelectMobile(element) {
            bcpShadeSelect(element, false);
            var $this = element;
            $('.description-group.bcp').css('background-color', getBcpShadeColor($this.data('shade')));
        
            $('#bcp-shade-selected').append(getBcpShadeDescriptor($this.data('shade')));
            $('#bcp-shade-description').text(getBcpShadeDescription($this.data('shade')));
        
            var pos = $this.position();
            var middle = $this.outerWidth() / 2;
            pos.left += middle;

            $('.css-triangle.bcp').css('left', pos.left);
        }
        function getBcpShadeDescription(dataShade) {
            switch (dataShade) {
                case 'Fair Radiance':
                    return 'For fair to light complexions with pink undertones';
                case 'Natural Radiance':
                    return 'For Light to Medium complexions, will give some incremental color to the skin';
                case 'Golden Radiance':
                    return 'For Medium to Tan complexions or all tones for a sunkissed look';
                case 'Bronze Radiance':
                    return 'For Tan to Deep Complexions or all tones or for lighter complexions looking for a deep bronzed look';
                default:
                    break;
            }            
        }
        function getBcpShadeDescriptor(dataShade) {
            switch (dataShade) {
                case 'Fair Radiance':
                    return ' <span class="smaller">(Porcelain)</span>';
                case 'Natural Radiance':
                    return ' <span class="smaller">(Medium Beige)</span>';
                case 'Golden Radiance':
                    return ' <span class="smaller">(Golden Beige)</span>';
                case 'Bronze Radiance':
                    return ' <span class="smaller">(Coppery Bronze)</span>';
                default:
                    break;
            }
        }
        function getBcpShadeColor(dataShade) {
            switch (dataShade) {
                case 'Fair Radiance':
                    return '#f4d7c3';
                case 'Natural Radiance':
                    return '#efc6aa';
                case 'Golden Radiance':
                    return '#dba581';
                case 'Bronze Radiance':
                    return '#af754c';
                default:
                    break;
            }
        }
        
        function browGelShadeSelect(element, printShade) {
            var $this = element;
            $('.shade-swatches.lasting-effects img').removeClass('selected');
            
            var shadeText;
            if ( printShade ) {
                shadeText = 'Shade: ' + $this.data('shade');
            } else {
                shadeText = $this.data('shade');
            }
             
            $('#lasting-effects-shade-selected').text(shadeText);
            $('#order-summary-selected').data('browgel-shade', $this.data('shade').toLowerCase());
            $('.selected-browgelshade').text($this.data('shade'));

            // remove the background color with the jQuery shortcut
            $('.description-group.brow-gel').css('background-color', '');
        
            return $this.addClass('selected');
        }
        function browGelExtendedShadeSelectMobile(element) {
            browGelShadeSelect(element, false);
            var $this = element;
            $('.description-group.brow-gel').css('background-color', getBrowGelShadeColor($this.data('shade')));
            $('#lasting-effects-shade-description').text(getBrowGelShadeDescription($this.data('shade')));
        
            var pos = $this.position();
            var middle = $this.outerWidth() / 2;
            pos.left += middle;

            $('.css-triangle.brow-gel').css('left', pos.left);
        }
        function getBrowGelShadeDescription(dataShade) {
            switch (dataShade) {
                case 'Blonde':
                    return 'Light Blonde to Dark Blonde Hair';
                case 'Brunette':
                    return 'Light Brown to Dark Brown Hair';
                case 'Dark Brunette':
                    return 'Dark Brown to Soft Black Hair';
                default:
                    break;
            }
        }
        function getBrowGelShadeColor(dataShade) {
            switch (dataShade) {
                case 'Blonde':
                    return '#dbc0a7';
                case 'Brunette':
                    return '#997a68';
                case 'Dark Brunette':
                    return '#3d2f24';
                default:
                    break;
            }
        }
    };

    /* If jQuery has not yet been loaded or if it has but it's too old for our needs,
    we will load jQuery from the Google CDN, and when it's fully loaded, we will run
    our app's JavaScript. Set your own limits here, the sample's code below uses 1.7
    as the minimum version we are ready to use, and if the jQuery is older, we load 1.9. */
    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 3.2)) {
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', function () {
            jQuery321 = jQuery.noConflict(true);
            myAppJavaScript(jQuery321);
        });
    } else {
        myAppJavaScript(jQuery);
    }

})();

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('tri-video-player', {
        height: 640,
        width: 360,
        videoId: 'rcZHEIhsW50',
        events: {
            // 'onReady': onPlayerReady,
        },
        origin: '//westmorebeauty.com',
        rel: 0
    });

    player2 = new YT.Player('beforeafter-player', {
        height: 640,
        width: 360,
        videoId: 'lIA20XU4sj0',
        events: {
            // 'onReady': onPlayerReady,
        },
        origin: '//westmorebeauty.com',
        rel: 0
    });
}

function onPlayerReady(event) {
    // $('#tri-video-player').height(img_height);
    event.target.playVideo();
}

