window.onload = () =>{

    if (JSON.parse( localStorage.getItem('highscore') != null )) {
        highscore = JSON.parse( localStorage.getItem('highscore')) ;
        console.log(highscore.length);
    }
    if ( highscore.length > 1){
        highscore.sort(function(a,b){
            return b.score - a.score
        })
    }

    if (highscore.length > 5){
        let x = highscore.slice(0,5);
        highscore = x;
    }
    let info = document.querySelector('#resultHigh');

    let newHighscore = highscore.map( (elem, i) =>{
        return `<li>${i+1}. ${elem.name} <span>${elem.score}</span></li>`
    })
    console.log(newHighscore);
    info.innerHTML =`<h2>Highscore:</h2> ${newHighscore.join("")}` ;
}

$(function(){


//Sounds

    let ammoOut = new Audio('./sounds/ammo-empty.wav');
    let reload1 = new Audio('./sounds/reload-nowy.mp3');
    let reload2 = new Audio('./sounds/reload-nowy2.mp3');

// event

    let highElemHide = $('#resultHigh');
    let highElem = $('#highscore');


    highElem.on('mouseenter', function(){
        highElemHide.css({
            'opacity':1,
            'visibility':'visible'
        })

    })

    highElem.on('mouseleave', function(){
        highElemHide.css({
            'opacity':0,
            'visibility':'hidden'
        })

    })

    let hideElem = $('.instruction-hide');
    let inst = $('#instruction');
    inst.on('mouseenter',function(e){

        hideElem.css({
            'opacity':1,
            'visibility':'visible'
        })
    })
    inst.on('mouseleave',function(e){
        hideElem.css({
            'opacity':0,
            'visibility':'none'
        })
    })
    // future start game btn
    // $('body').on('click', '.btnStart', startGame);


    let btnStart = $('#start');
    function startGame(){
        event.stopPropagation();

        // shot.play();

        $('.start').hide();
        $('.game').show();

        // Counting to start
        let counterStart  = 3;
        let timer = setInterval(function(){
            counterStart--;
            $('#timerStart').text(counterStart);
            let sound = new Audio('./sounds/bip.mp3');
            sound.play();
            if ( counterStart == 0) {
                let sound = new Audio('./sounds/gogo.mp3');
                sound.play();
                $('#timerStart').hide();
                //// Tu URUCHAMIAM GRE !!!!!!!!!!!!
                clearInterval(timer);
                gameTime(); // time  30 s
            }

        },1000);
    }
    btnStart.on('click', startGame)

    var ammo = 5;
$('.game').on('click', function(event){
    event.stopPropagation();
    if ( ammo > 0) {
	let shot = new Audio('./sounds/shot-short.mp3');
        shot.play();
        $('.bullet').find('img').eq(ammo - 1).hide();
        ammo -= 1;
    } else {
        ammoOut.play();

    }

})
 $(document).on('keyup.reload', function(event){
    if ( event.which == 82 ){

        reload2.play();
        ammo = 5;
        $('.bullet').find('img').show();
    }

})


// SLOW MOTION
$(document).on('keyup.slow', function(event){
    if ( event.which == 83 ){


    setTimeout(function(){
        clearInterval(interval);
        clearInterval(addTimeInt);
        $('.game').css('filter', 'none');

        $(document).off('keyup.slow');
    },4000);

    let addTimeInt = setInterval( function(){
        timerCounter++;
         counterHost1++;
         counterHost2++;
         counterHost3++;
         counterHost4++;
         counterHost5++;
    },1000);
    let interval = setInterval(function(){

        let sat = Math.floor(Math.random() * (5-2) + 2);

        $('.game').css('filter', 'blur('+sat+ 'px' +')');


    },10)

    }

})



///// MAIN SCORE
let wynik = 0;
/////////////////

/////  TARGETS EVENTS
$('.score10').on('click', function(e){
    e.stopPropagation();


    if ( ammo > 0) {
        //play sound , remove bullet
        let shot = new Audio('./sounds/shot-short.mp3');
        shot.play();
        $('.bullet').find('img').eq(ammo - 1).hide();
        ammo -= 1;
        // upgrade score
        wynik += parseInt($(this).attr('data-score'));
        $('.score').find('span').text(wynik);
        // hide target
        if ($(this).parent().parent().parent().parent().parent().data('id') === 'small'){
            $(this).parent().parent().parent().parent().parent().animate({top: '170px'});
        } else if ($(this).parent().parent().parent().parent().parent().data('id') == 'small-right') {
            $(this).parent().parent().parent().parent().parent().animate({right: '300px'});

        } else {
            $(this).parent().parent().parent().parent().parent().animate({top: '320px'});

        }
        $(this).parent().parent().parent().parent().parent().attr('data-show', 'false');

        // warunkowe blokowanie odliczania egzekucji hosta
        let host = $(this).parent().parent().parent().parent().parent().find('.hostage');

        if ( host.data('id') == 1 ){
            clearInterval(int1);
        } else if ( host.data('id') == 2 ){
            clearInterval(int2);
        } else if ( host.data('id') == 3 ) {
            clearInterval(int3);
        } else if ( host.data('id') == 4 ) {
            clearInterval(int4);
        } else {
            clearInterval(int5);
        }


    } else {
        ammoOut.play();
}
})
$('.score7').on('click', function(e){
    e.stopPropagation();


    if ( ammo > 0) {
        //play sound , remove bullet
        let shot = new Audio('./sounds/shot-short.mp3');
        shot.play();
        $('.bullet').find('img').eq(ammo - 1).hide();
        ammo -= 1;
        // upgrade score
        wynik += parseInt($(this).attr('data-score'));
        $('.score').find('span').text(wynik);
        // hide target
        if ($(this).parent().parent().parent().parent().data('id') === 'small'){
            $(this).parent().parent().parent().parent().animate({top: '170px'});
        } else if ($(this).parent().parent().parent().parent().data('id') == 'small-right') {
            $(this).parent().parent().parent().parent().animate({right: '300px'});

        } else {
            $(this).parent().parent().parent().parent().animate({top: '320px'});

        }
        $(this).parent().parent().parent().parent().attr('data-show', 'false');

        // warunkowe blokowanie odliczania egzekucji hosta
        let host = $(this).parent().parent().parent().parent().find('.hostage');

        if ( host.data('id') == 1 ){
            clearInterval(int1);
        } else if ( host.data('id') == 2 ){
            clearInterval(int2);
        } else if ( host.data('id') == 3 ) {
            clearInterval(int3);
        } else if ( host.data('id') == 4 ) {
            clearInterval(int4);
        } else {
            clearInterval(int5);
        }
    } else {
        ammoOut.play();
}
})
$('.score5').on('click', function(e){
    e.stopPropagation();


    if ( ammo > 0) {
        //play sound , remove bullet
        let shot = new Audio('./sounds/shot-short.mp3');
        shot.play();
        $('.bullet').find('img').eq(ammo - 1).hide();
        ammo -= 1;
        // upgrade score
        wynik += parseInt($(this).attr('data-score'));
        $('.score').find('span').text(wynik);
        // hide target
        if ($(this).parent().parent().parent().data('id') === 'small'){
            $(this).parent().parent().parent().animate({top: '170px'});
        } else if ($(this).parent().parent().parent().data('id') == 'small-right') {
            $(this).parent().parent().parent().animate({right: '300px'});

        } else {
            $(this).parent().parent().parent().animate({top: '320px'});

        }
        $(this).parent().parent().parent().attr('data-show', 'false');

        // warunkowe blokowanie odliczania egzekucji hosta
        let host = $(this).parent().parent().parent().find('.hostage');

        if ( host.data('id') == 1 ){
            clearInterval(int1);
        } else if ( host.data('id') == 2 ){
            clearInterval(int2);
        } else if ( host.data('id') == 3 ) {
            clearInterval(int3);
        } else if ( host.data('id') == 4 ) {
            clearInterval(int4);
        } else {
            clearInterval(int5);
        }
    } else {
        ammoOut.play();
}
})



$('.score4').on('click', function(e){
    e.stopPropagation();

    if ( ammo > 0) {
        //play sound , remove bullet
        let shot = new Audio('./sounds/shot-short.mp3');
        shot.play();
        $('.bullet').find('img').eq(ammo - 1).hide();
        ammo -= 1;
        // upgrade score
        wynik += parseInt($(this).attr('data-score'));
        $('.score').find('span').text(wynik);
        // hide target

        if ($(this).parent().parent().data('id') === 'small'){
            $(this).parent().parent().animate({top: '170px'});
        } else if ($(this).parent().parent().data('id') == 'small-right') {
            $(this).parent().parent().animate({right: '300px'});

        }else {
            $(this).parent().parent().animate({top: '320px'});

        }
        // sett data-sho to false
        $(this).parent().parent().attr('data-show', 'false');

        $(this).parent().parent().find('.hostage');

        // warunkowe blokowanie odliczania egzekucji hosta
        let host = $(this).parent().parent().find('.hostage');

        if ( host.data('id') == 1 ){
            clearInterval(int1);
        } else if ( host.data('id') == 2 ){
            clearInterval(int2);
        } else if ( host.data('id') == 3 ) {
            clearInterval(int3);
        } else if ( host.data('id') == 4 ) {
            clearInterval(int4);
        } else {
            clearInterval(int5);
        }


    } else {
        ammoOut.play();
    }
})

$('.score3').on('click', function(e){
    e.stopPropagation();

    if ( ammo > 0) {
        //play sound , remove bullet
        let shot = new Audio('./sounds/shot-short.mp3');
        shot.play();
        $('.bullet').find('img').eq(ammo - 1).hide();
        ammo -= 1;
        // upgrade score
        wynik += parseInt($(this).attr('data-score'));
        $('.score').find('span').text(wynik);
        // hide target
        if ($(this).parent().data('id') === 'small'){
            $(this).parent().animate({top: '170px'});
        } else if ($(this).parent().data('id') == 'small-right') {
            $(this).parent().animate({right: '300px'});

        } else {
            $(this).parent().animate({top: '320px'});

        }
        $(this).parent().attr('data-show', 'false');
        // warunkowe blokowanie odliczania egzekucji hosta
        let host = $(this).parent().find('.hostage');

        if ( host.data('id') == 1 ){
            clearInterval(int1);
        } else if ( host.data('id') == 2 ){
            clearInterval(int2);
        } else if ( host.data('id') == 3 ) {
            clearInterval(int3);
        } else if ( host.data('id') == 4 ) {
            clearInterval(int4);
        } else {
            clearInterval(int5);
        }

    } else {
        ammoOut.play();
}
})


$('.hostage').on('click', function(e){
    e.stopPropagation();
    if ( ammo > 0) {
        //play sound , remove bullet
        let shot = new Audio('./sounds/shot-short.mp3');
        shot.play();
        let death = new Audio('./sounds/death.wav');
        death.play();
        let hostage = new Audio('./sounds/hostageDown.mp3');
        hostage.play();
        $('.bullet').find('img').eq(ammo - 1).hide();
        ammo -= 1;
        // upgrade score
        wynik += parseInt($(this).attr('data-score'));
        $('.score').find('span').text(wynik);
        // hide target
        $(this).hide();

    } else {
        ammoOut.play();
    }
})

////////////////////////////   Functions   ////////////////////////////
var timerCounter = 29 ;
let highscore = [];
 function gameTime(){
     let timer =  $('.time');

      // Wlaczam movingElem
     movingElem();
     let timerInt = setInterval(function(){
         timer.text(" " + 'TIME:' + " " + timerCounter);
         timerCounter--;

         if ( timerCounter == -1){
             // GAME OVER FUNCTION
             ammo = 0;
             clearInterval(int1);
             clearInterval(int2);
             clearInterval(int3);
             clearInterval(int4);
             clearInterval(int5);

             $(document).off('keyup.reload');
             $('.game').css('opacity', 0.4);
             let endText = $('<span>');
             let lastScore = $('<span>');
             lastScore.text('SCORE:' + " " +wynik);
             endText.text('GAME OVER');
             endText.addClass('timeEnd');
             lastScore.addClass('lastScore');
             $('body').append(endText);
             $('body').append(lastScore);
             clearInterval(timerInt);
            //  let btnEnd = $('<span>');
            //  btnEnd.text('PLAY AGAIN');
            //  btnEnd.addClass('btnStart');
            //  $('body').append(btnEnd);


             setTimeout(()=>{
                 let name = prompt('Enter Your name').slice(0,9);
                 let userObj = {
                     name:name,
                     score:wynik
                 }
                 highscore.push(userObj);
                 localStorage.setItem('highscore', JSON.stringify(highscore));
             },1000);
         }

     },1000);
 }

// host timer to kill
var int1;
var int2;
var int3;
var int4;
var int5;
let counterHost1;
let counterHost2;
let counterHost3;
let counterHost4;
let counterHost5;
var killHost1 = function(elem){


    if ( elem.data('id') == 1) {
        counterHost1 = 4;
        int1 = setInterval(function(){
            counterHost1--;

            if ( counterHost1 == 0 ){
                // audio
                let death = new Audio('./sounds/death.wav');
                death.play();
                let hostage = new Audio('./sounds/hostageDown.mp3');
                hostage.play();
                // ugprade score
                wynik -= 10;
                $('.score').find('span').text(wynik);
                // hide host

                clearInterval(int1);
                elem.find('span').text('3');
                elem.hide();
            }
            elem.find('span').text(counterHost1);
        },1000);
    } else if ( elem.data('id') == 2 ) {
         counterHost2 = 4;
        int2 = setInterval(function(){
            counterHost2--;

            if ( counterHost2 == 0 ){
                // audio
                let death = new Audio('./sounds/death.wav');
                death.play();
                let hostage = new Audio('./sounds/hostageDown.mp3');
                hostage.play();
                // ugprade score
                wynik -= 10;
                $('.score').find('span').text(wynik);
                // hide host

                clearInterval(int2);
                elem.find('span').text('3');
                elem.hide();
            }
            elem.find('span').text(counterHost2);
        },1000);
    } else if ( elem.data('id') == 3 ) {
        counterHost3 = 4;
        int3 = setInterval(function(){
            counterHost3--;

            if ( counterHost3 == 0 ){
                // audio
                let death = new Audio('./sounds/death.wav');
                death.play();
                let hostage = new Audio('./sounds/hostageDown.mp3');
                hostage.play();
                // ugprade score
                wynik -= 10;
                $('.score').find('span').text(wynik);
                // hide host

                clearInterval(int3);
                elem.find('span').text('3');
                elem.hide();
            }
            elem.find('span').text(counterHost3);
        },1000);
    } else if ( elem.data('id') == 4 ) {
        counterHost4 = 4;
        int4 = setInterval(function(){
            counterHost4--;

            if ( counterHost4 == 0 ){
                // audio
                let death = new Audio('./sounds/death.wav');
                death.play();
                let hostage = new Audio('./sounds/hostageDown.mp3');
                hostage.play();
                // ugprade score
                wynik -= 10;
                $('.score').find('span').text(wynik);
                // hide host

                clearInterval(int4);
                elem.find('span').text('3');
                elem.hide();
            }
            elem.find('span').text(counterHost4);
        },1000);
    } else {
         counterHost5 = 4;
        int5 = setInterval(function(){
            counterHost5--;

            if ( counterHost5 == 0 ){
                // audio
                let death = new Audio('./sounds/death.wav');
                death.play();
                let hostage = new Audio('./sounds/hostageDown.mp3');
                hostage.play();
                // ugprade score
                wynik -= 10;
                $('.score').find('span').text(wynik);
                // hide host

                clearInterval(int4);
                elem.find('span').text('3');
                elem.hide();
            }
            elem.find('span').text(counterHost5);
        },1000);
    }

}




function movingElem(){
    let targets = $('.cel');
    let c = targets.eq(Math.floor(Math.random() * 5));

    c.find('.hostage').hide();
    show(c);

    let showInt = setInterval(function(){
        let targets = $('.cel');
        let a = targets.eq(Math.floor(Math.random() * 5));
        let b = targets.eq(Math.floor(Math.random() * 5));
        // wylosuj bez powtarzania


        if ( a.attr('data-show') == 'false' ){
            // hostage show/hide
            let host = a.find('.hostage');
            let decission = Math.random();
            if ( decission > 0.7) {
                host.hide();
            } else {
                host.show();

                killHost1(host);
            }

            show(a);

        }
        if ( b.attr('data-show') == 'false' ){
                // hostage show/hide
            let host = b.find('.hostage');
            let decission = Math.random();
            if ( decission > 0.6) {
                host.hide();
            } else {
                host.show();

                killHost1(host);

            }
            show(b);

        }

    },1000) // int end

    function show(elem){
        if (( elem.data('nr') == 1) || (elem.data('nr') == 2 )) {
            elem.animate({top: '230px'});

        } else if ( elem.data('nr') == 3 ){
            elem.animate({top: '95px'});
        } else if ( elem.data('nr') == 4) {
            elem.animate({top: '250px'});
        } else {
            elem.animate({right: '420px'});
        }
        elem.attr('data-show', 'true');
    }
}
const tablicaWynikow = [];
function gameOver(){
    $('.game').slideUp();
    let wynik = prompt('Podaj swoje Imie');
    tablicaWynikow.push(wynik);
    console.log(wynik);

}

}) // end load DOMContent
