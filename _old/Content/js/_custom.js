$(document).ready(function(){
    var colorsCase = ['#ffffff','#f9e3d7','#145d8a', '#600507', '#b69d70'];

    // FULL PAGE PLUGIN
    var elFullpage = $('#fullpage');
    if (elFullpage[0]) {        
    	elFullpage.fullpage({
            sectionsColor: ['#cacdd4', '#dbd5c9', '#ffffff', '#397ff3', '#e4b200'],
            anchors: ['Beacons', 'Pedalike', 'Cases', 'Clientes', 'Contato'],
            menu: '#menu',
            css3: true,
            scrollingSpeed: 650,
            fixedElements: '#halfCloud',
            onLeave: function(index, nextIndex, direction){
                
                //console.log('onLeave ' + index + ' ** ' + direction);

                if ((index == 1 && nextIndex == 2 && direction == 'down') || index == 2 && direction == 'up') {
                    $('.hero-intro').find('.intro:eq('+(nextIndex-2)+')').removeClass('active');
                    $('.hero-intro').find('.intro:eq('+(nextIndex-2)+')').addClass('up');
                    $('.hero-intro').find('.intro:eq('+(nextIndex-1)+')').addClass('active');
                }

                if (index == 2 && direction == 'down'){
                    $('.hero-intro').find('.intro:eq('+(index-1)+')').removeClass('active');
                    $('.half-cloud').addClass('full-width');
                }

            },
            afterLoad: function (anchorLink, index) {
                //console.log('afterLoad ' + index + ' ** ' + anchorLink);

                setNav();

                if (index == 1 || index == 2) {
                    $('.hero-intro').find('.intro:eq('+(index-1)+')').addClass('active');
                } else {
                    $('.hero-intro').find('.intro').removeClass('active');
                }

                if (index == 3) {
                    casesSlide();
                }

                if (index == 4 || index == 3){ // || index == 3){
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

    // CASES LISTA
    $('.grid-item').on('click', 'a', function(){
        var itemCurrent = $(this).parent().attr('class');
        var letraCurrent = itemCurrent.split('item-');
            letraCurrent = letraCurrent[1];
        // console.log('case ' + letraCurrent.toUpperCase());
        $('.container-cases-detalhe').addClass('is-visible');
        $('#CaseDetalhe'+letraCurrent.toUpperCase()).removeClass('none').siblings('.case-detalhe').addClass('none');
        return false;
    });
    $('.btn-close-case').on('click', function(){
        $('.container-cases-detalhe').removeClass('is-visible');
        return false;
    });
    


    setTimeout(function(){
        $('.load').fadeOut();
    }, 1000);

    setNav();

});

function setNav () {
    var itemAdd = 0;
    $('nav').find('li').each(function(){
        var linkAttr = $(this).find('a').attr('href');
        var urlParam = window.location.href;
        if (urlParam.indexOf(linkAttr) > 0) {
            itemAdd++;
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
        }
    });
    if (itemAdd == 0){
        $('nav').find('li').removeClass('active');
    }
}

function changeHeader (param) {
    $('.header-'+param).removeClass('active').siblings('.header-container').addClass('active');
}

