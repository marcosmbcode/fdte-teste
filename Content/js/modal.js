// JavaScript Document
// Modal
var varConfirm = null;
$(function () {
    setModalEvent();
});

function setModalEvent() {
    $('a[class~=modal]').on('click', function () {
        var id = $(this).attr('href');
        id = id.split("#");
        var idNome = id[1];
        id = "#" + id[1];
        var numeroMask = $('.mask').size();

        if (numeroMask > 0) {
            if ($('.mask[class~=mask-' + idNome + ']')[0]) {
                //console.log('igual carai');
                return false;
            } else {
                //console.log('vai q vai');
            }
        }

        var numeroZindexMask = 9000 + numeroMask;
        var numeroZindexWindow = 9001 + numeroMask;
        //alert(idNome);
        $('body').append('<div class="mask mask-' + idNome + '" style="z-index:' + numeroZindexMask + '"></div>');
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
        var winH = $(window).height();
        var winW = $('#wrap').width();
        $('.mask').css({ 'width': maskWidth, 'height': maskHeight });
        $('.mask').fadeTo("fast", 0.8);
        $(id).css('z-index', '' + numeroZindexWindow + '');
        $(id).css('top', winH / 2 - $(id).height() / 2);
        $(id).css('left', winW / 2 - $(id).width() / 2);
        $(id).fadeIn('fast', function () {
            //setMask();
            if (id = '#modalLogin' || id == '#modalSenha') {
                $(id).find('.form-ipt:eq(0)').focus();
            }
        });
        $(id).find('.close').attr('rel', '' + idNome + '');
        // $("html, body").animate({
        //     scrollTop: 0
        // }, 1000);
        
        return false;
    });
    $('.window').on('click', '.close', function () {
        var objetoAtual = $(this);
        var idObjetoAtual = objetoAtual.attr('rel');
        if (idObjetoAtual == 'modalTreinamento') {
            $('.vjs-play-control').click();
        }
        $('.mask-' + idObjetoAtual).fadeOut(function () { $(this).remove() });
        //$('#' + idObjetoAtual).css('top','-300%');
        $('#' + idObjetoAtual).fadeOut('fast');
        return false;
    });
}

function modalStateButtonClose(idModal, stateButtonClose) {
    if (stateButtonClose == 'show') {
        $(idModal).find('.close').stop().fadeIn();
    } else {
        $(idModal).find('.close').stop().fadeOut();
    }
}

function abreModal(idModal, msg, obj) {

    if (obj && obj.redirect) {
        if ($(idModal).find('.bt-modal-redirect')[0]) {
            $(idModal).find('.bt-modal-redirect').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                location.href = obj.redirect;
            });
        }
    }
    if (obj && obj.confirmAction) {
        $(idModal).find('.bt-modal-positive').unbind().on('click', function (e) {
            window.location = obj.confirmAction.parent().find('.btn-confirm-action-' + obj.confirmAction.attr('class').split('btn-confirm-')[1]).attr('href');
            //fechaModal(idModal);
            return false;
        });
    }

    if ($(idModal).find('.bt-modal-negative')[0]) {
        $(idModal).find('.bt-modal-negative').unbind().on('click', function (e) {
            e.stopImmediatePropagation();
            fechaModal(idModal);
            return false;
        });
    }

    if (msg) { $(idModal).find('.msg').html(msg); }
    $('.modal[href='+idModal+']').click();
}

function fechaModal(idModal) {
    $(idModal).find('.close').click();
}