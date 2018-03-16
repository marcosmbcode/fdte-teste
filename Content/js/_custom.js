$(document).ready(function(){
    var colorsCase = ['#ffffff','#f9e3d7','#145d8a', '#600507', '#b69d70'];

    // FULL PAGE PLUGIN
    var elFullpage = $('#fullpage');
    var slideIndex2 = 1, sliding = false;

    if (elFullpage[0]) {        
    	elFullpage.fullpage({
            sectionsColor: ['#cacdd4', '#dbd5c9', '#ffffff', '#397ff3', '#e4b200'],
            anchors: ['Beacons', 'Pedalike', 'Cases', 'Clientes', 'Contato'],
            menu: '#menu',
            css3: true,
            slidesNavigation: true,
            scrollingSpeed: 650,
            onLeave: function(index, nextIndex, direction){
                
                console.log('onLeave ' + index + ' ** ' + direction);

                if ((index == 1 && nextIndex == 2 && direction == 'down') || index == 2 && direction == 'up') {
                    $('.hero-intro').find('.intro:eq('+(nextIndex-2)+')').removeClass('active');
                    $('.hero-intro').find('.intro:eq('+(nextIndex-2)+')').addClass('up');
                    $('.hero-intro').find('.intro:eq('+(nextIndex-1)+')').addClass('active');
                }

                if (index == 2 && direction == 'down'){
                    $('.hero-intro').find('.intro:eq('+(index-1)+')').removeClass('active');
                    //$('.half-cloud').addClass('full-width');
                }

                if (index == 3 && !sliding) {
                    if (direction == 'down' && slideIndex2 < 2) {
                        sliding = true;
                        $.fn.fullpage.moveSlideRight();
                        return false;
                    } else if (direction == 'up' && slideIndex2 > 1) {
                        sliding = true;
                        $.fn.fullpage.moveSlideLeft();
                        return false;
                    }
                } else if (sliding) {
                    return false;
                }

            },
            afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
                sliding = false;
            },
            onSlideLeave  : function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
                if (index == 3) {
                    console.log('onSlideLeave ' + index + ' ** ' + direction + ' ** ' + nextSlideIndex);
                    if (direction == 'right') {
                        sliding = true;
                        slideIndex2++;
                    }

                    if (direction == 'left') {
                        sliding = true;
                        slideIndex2--;
                    }
                }
            },
            afterLoad: function (anchorLink, index) {
                console.log('afterLoad ' + index + ' ** ' + anchorLink);

                if (index == 1 || index == 2) {
                    $('.hero-intro').find('.intro:eq('+(index-1)+')').addClass('active');
                } else {
                    $('.hero-intro').find('.intro').removeClass('active');
                }

                if (index == 3) {
                    //casesSlide();
                }

                if (index == 4){ // || index == 3){
                    changeHeader('dark');
                } else {
                    changeHeader('light');
                }
            }
        });


    }
    

    function casesSlide() {
        $('.hero-intro').find('.intro').removeClass('active');
        $('.section:eq(2)').find('.fp-slides').animate({opacity: 1});
    }

    
    // FORM BOTOES
    $('.js-form-nome').on('click', function(){
        if ($(this).prev().val() != '') {
            $(this).css({opacity: 0});
            $('.form-group__email').addClass('is-open');
        }
        return false;
    });
    $('.js-form-email').on('click', function(){
        if ($(this).prev().val() != '') {
            $(this).css({opacity: 0});
            $('.form-group__msg').addClass('is-open');
        }
        return false;
    });

    setTimeout(function(){
        $('.load').fadeOut();
    }, 1000);

    $('#toggle, #toggle2').click(function() {
       $('#toggle, #toggle2').toggleClass('active');
       $('#overlay').toggleClass('open');
    });

});

function changeHeader (param) {
    $('.header-'+param).removeClass('active').siblings('.header-container').addClass('active');
}