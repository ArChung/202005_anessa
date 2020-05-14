"use strict";var ChungTool = ChungTool || {};
var simpleShow = simpleShow || {};
var simpleHide = simpleHide || {};

(function () {




  function isIOS() {
    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      return true;
    } else {
      return false;
    }
  }

  function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  }

  function isOnline() {
    if (window.location.protocol == 'file:') {
      console.log('在本機端喔');
      return false;
    } else {
      return true;
    }
  }

  function c_simpleShow(el, during) {
    if (isNull(during)) {
      during = 0.3;
    }
    el.each(function () {
      var t = $(this);
      t.removeClass('hide');
      TweenMax.killTweensOf(t);
      var tl = new TimelineMax();
      tl.set(t, {
        autoAlpha: 0 }).

      to(t, during, {
        autoAlpha: 1 });

    });
  }

  function c_simpleHide(el, during) {
    if (isNull(during)) {
      during = 0.3;
    }
    el.each(function () {
      var t = $(this);
      var tl = new TimelineMax();
      TweenMax.killTweensOf(t);
      tl.to(t, during, {
        autoAlpha: 0 }).

      call(function () {
        t.addClass('hide');
      });
    });
    // console.log(123)
  }

  function isNull(val) {
    return typeof val === "undefined";
  }

  function initLimitText() {
    $('.limitTxt').each(function () {
      var t = $(this);
      var limitNum = parseInt(t.attr('data-limitTxtNum'), 10);
      var showBtn = t.attr('data-showBtn') == 'true' ? true : false;

      if (!isNull(limitNum)) {

        var str = t.text(); // Getting the text
        str = str.replace(/ {2,}/g, ' ');
        str = str.replace(/\n\s*\n/g, '\n');

        if (str.length > limitNum) {

          var strtemp = '<span class="hide">' + str.substr(limitNum, str.length) + '</span><a href="#" class="seeMoreContentBtn">more</a>';
          str = str.substr(0, limitNum) + '<i class="dot"> ...</i>';

          if (showBtn) {
            str += strtemp;
          }

          t.html(str);
        }
      }
    });

    $('.seeMoreContentBtn').on('click', function (e) {
      e.preventDefault();
      $(this).addClass('hide').siblings('.hide').removeClass('hide').siblings('.dot').addClass('hide');
    });

  }

  function addSwipeEvent(t, funcL, funcR) {
    // var touchObj = document.getElementById("index_banner_swipe");
    var start_x;
    var end_x;

    t.get(0).addEventListener('touchstart', touchStart, false);
    t.get(0).addEventListener('touchmove', touchMove, false);
    t.get(0).addEventListener('touchend', touchSwipe);

    function touchStart(event) {
      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控

      console.log(123);
      start_x = event.targetTouches[0].pageX;
      //alert(start_x);
    }

    function touchMove(event) {
      event.preventDefault();
      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控
      end_x = event.targetTouches[0].pageX;
      //alert(end_x - start_x);
    }

    function touchSwipe(event) {
      if (end_x - start_x > 60) {
        funcR();

      } else if (end_x - start_x < -60) {
        funcL();
      }
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  /* 清除以prefix開頭的所有class*/
  function removeClassWithFilter(elemt, prefix) {
    elemt.each(function (i, el) {
      var classes = el.className.split(" ").filter(function (c) {
        return c.lastIndexOf(prefix, 0) !== 0;
      });
      el.className = $.trim(classes.join(" "));
    });
  };

  /* 回傳以prefix開頭的class拿掉以prefix開頭後的文字*/
  function returnClassNameWithFilter(elemt, prefix) {
    var arr;
    elemt.each(function (i, el) {
      arr = el.className.split(" ").filter(function (c) {
        return c.lastIndexOf(prefix, 0) == 0;
      });
    });

    $.each(arr, function (index, value) {
      arr[index] = value.replace(prefix, "");
    });
    return arr;
  };

  /* 用來算中英混合的長度 */
  function txtByteLength(str) {

    if (str == null) return 0;
    if (typeof str != "string") {
      str += "";
    }
    return str.replace(/[^\x00-\xff]/g, "01").length;

  }

  function maxlengthInpout(el, num) {
    el.on('keyup', function () {
      //get the limit from maxlength attribute  
      var limit = num;
      //get the current text inside the textarea  
      var text = $(this).val();
      //count the number of characters in the text  
      var chars = text.length;

      console.log(chars);
      //check if there are more characters then allowed  
      if (chars > limit) {
        //and if there are use substr to get the text before the limit  
        var new_text = text.substr(0, limit);

        //and change the current text with the new text  
        $(this).val(new_text);
      }
    });
  }



  function addYouTube(el, vid) {
    el.empty().append('<iframe allowfullscreen="" frameborder="0" height="100%" width="100%" src="http://www.youtube.com/embed/' + vid + '?rel=0&autoplay=1"></iframe>');
  }

  function getDivBgImage(el) {
    return el.css('background-image').replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
  }

  function replayCssAni(el, className) {
    el.removeClass(className);
    el.offset().width = el.offset().width;
    el.addClass(className);

  }

  function int(s) {
    return parseInt(s, 10);
  }

  // $.fn.enterKey = function(fnc) {
  //     return this.each(function() {
  //         $(this).keypress(function(ev) {
  //             var keycode = (ev.keyCode ? ev.keyCode : ev.which);
  //             if (keycode == '13') {
  //                 fnc.call(this, ev);
  //             }
  //         })
  //     })
  // }


  function getAtagElement() {
    var element = document.getElementById('share-a-tag');
    if (element === null) {
      element = document.createElement('a');
      element.style = "display: none;";
      element.id = 'share-a-tag';
      element.target = "_blank";
      document.getElementsByTagName('body')[0].appendChild(element);
    }
    return element;
  };

  function shareToLine(s) {
    var element = getAtagElement();
    element.href = 'http://line.naver.jp/R/msg/text/?' + encodeURIComponent(s);

    element.click();

  }

  function pageScrollAni(top) {
    var $body = window.opera ? document.compatMode == "CSS1Compat" ? $('html') : $('body') : $('html,body');
    $body.animate({
      scrollTop: top },
    800);
  }

  function isPhone() {
    var testExp = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|' +
    'Opera Mini|IEMobile|Mobile',
    'i');
    return testExp.test(navigator.userAgent);
  }

  function lockScroll() {

    var scrollPosition = [
    self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
    self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];

    var html = jQuery('body'); // it would make more sense to apply this to body, but IE7 won't have that
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    $(document.body).on("touchmove", preventScroll);
  }

  function unLockScroll() {
    var html = jQuery('body');
    var scrollPosition = html.data('scroll-position');

    if (!isNull(scrollPosition)) {
      html.css('overflow', html.data('previous-overflow'));
      window.scrollTo(scrollPosition[0], scrollPosition[1]);
      $(document.body).off("touchmove", preventScroll);
    }


  }

  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // scrollTop() ie 都只會傳回0
  function windoePosTop() {
    return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
  }
  function addSwipeUpDownEvent(el, upFunc, downFunc) {
    // var touchObj = document.getElementById("index_banner_swipe");
    var start_y;
    var end_y;
    var t = el;

    t.get(0).addEventListener('touchstart', touchStart, false);
    t.get(0).addEventListener('touchmove', touchMove, false);
    t.get(0).addEventListener('touchend', touchSwipe);

    function touchStart(event) {

      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控
      start_y = end_y = event.targetTouches[0].pageY;

    }

    function touchMove(event) {
      event.preventDefault();
      if (event.targetTouches.length != 1) {
        return false;
      } //單點觸控
      end_y = event.targetTouches[0].pageY;
      t.css('margin-top', end_y - start_y);
    }

    function touchSwipe(event) {


      t.css('margin-top', 0);
      if (end_y - start_y > 100) {
        upFunc();

      } else if (end_y - start_y < -100) {
        downFunc();
      }
    }
  }

  function addWheelEvent(el, upFunc, downFunc) {
    var mousewheelevt = /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x
    var scrollable = true;
    var timer = null;





    el.mousewheel(function (event) {
      // console.log(event.deltaX, event.deltaY, event.deltaFactor);

      if (timer) {
        clearTimeout(timer);
        timer = null;

      }

      timer = setTimeout(function () {
        // console.log('done');
        timer = null;
        scrollable = true;
      }, 100);


      if (!scrollable) {
        return;
      } else {
        scrollable = false;
      }


      if (event.deltaY > 0) {
        upFunc();
      } else {
        downFunc();
      }


    });


  }

  function isIe() {
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {

      return true;
    } else {

      return false;
    }

  }

  function scrollReachEnd(el) {
    return el.scrollTop() + el.innerHeight() >= el[0].scrollHeight;
  }
  function scrollReachTop(el) {
    return el.scrollTop() == 0;
  }


  function checkIdle(delay, func, func2) {
    idleTimer = null;
    idleState = false;
    idleWait = delay;

    $('*').bind('touchend touchmove touchstart', function () {


      clearTimeout(idleTimer);

      if (idleState == true) {
        func2();
      }

      idleState = false;

      idleTimer = setTimeout(function () {

        // Idle Event
        func();

        idleState = true;
      }, idleWait);
    });

    $("body").trigger("touchend");
  }

  function openGoogleApp(s) {
    var element = getAtagElement();
    if (isIOS()) {
      element.href = 'comgooglemaps://?q=' + encodeURIComponent(s);
    } else {
      element.href = 'https://maps.google.com/?q=' + encodeURIComponent(s);
    }
    element.click();
  }


  ChungTool.openGoogleApp = openGoogleApp;

  ChungTool.checkIdle = checkIdle;
  ChungTool.scrollReachTop = scrollReachTop;
  ChungTool.scrollReachEnd = scrollReachEnd;
  ChungTool.isIe = isIe;
  ChungTool.addWheelEvent = addWheelEvent;

  ChungTool.addSwipeUpDownEvent = addSwipeUpDownEvent;

  ChungTool.windoePosTop = windoePosTop;
  ChungTool.lockScroll = lockScroll;
  ChungTool.unLockScroll = unLockScroll;
  ChungTool.isPhone = isPhone;

  ChungTool.pageScrollAni = pageScrollAni;
  //shareToLine
  ChungTool.shareToLine = shareToLine;
  //a tag
  ChungTool.getAtagElement = getAtagElement;
  // 轉成數字
  ChungTool.int = int;
  // 重跑css animation
  ChungTool.replayCssAni = replayCssAni;
  // 取得背景圖案
  ChungTool.getDivBgImage = getDivBgImage;
  // 加 youtube 到 el 裡
  ChungTool.addYouTube = addYouTube;
  // 限制input的最大輸入數
  ChungTool.maxlengthInpout = maxlengthInpout;
  // 計算中英文的長度 (中文2英文1)
  ChungTool.txtByteLength = txtByteLength;
  // 移除特定開頭的class
  ChungTool.removeClassWithFilter = removeClassWithFilter;
  // 回傳以prefix開頭的class拿掉以prefix開頭後的文字 
  ChungTool.returnClassNameWithFilter = returnClassNameWithFilter;
  ChungTool.capitalizeFirstLetter = capitalizeFirstLetter;
  ChungTool.addSwipeEvent = addSwipeEvent;
  ChungTool.initLimitText = initLimitText;
  ChungTool.getUrlParameter = getUrlParameter;
  ChungTool.isOnline = isOnline;
  ChungTool.isNull = isNull;
  ChungTool.isIOS = isIOS;
  simpleShow = c_simpleShow;
  simpleHide = c_simpleHide;


})();

function init_base() {
  const INIT_VIEWPORT = true;
  const VIEWPORT_WIDTH = 600;


  /////////////////////////////////////////////
  //        更改 meta 上的 viewport           //
  /////////////////////////////////////////////

  if (INIT_VIEWPORT) {
    const sUserAgent = navigator.userAgent.toLowerCase();
    const bIsAndroid = sUserAgent.match(/android/i) == "android";
    const viewport = document.querySelector("meta[name=viewport]");

    if (bIsAndroid) {
      const deviceWidth = screen.width;
      const getTargetDensitydpi = VIEWPORT_WIDTH / deviceWidth * window.devicePixelRatio * 160;
      const targetDensitydpi = `target-densitydpi=${getTargetDensitydpi}, width=${VIEWPORT_WIDTH}, user-scalable=no`;

      viewport.setAttribute('content', targetDensitydpi);
    } else {
      viewport.setAttribute('content', `width=${VIEWPORT_WIDTH} user-scalable=0`);

    }
  }



  /////////////////////////////////////////////
  //              fastclick                  //
  /////////////////////////////////////////////

  FastClick.attach(document.body);

}




init_base();



inView.offset(150);


$(document).ready(() => {


  // init section
  init_sider();
  init_index();
  init_beauty();
  init_products();
  init_form();
  init_ingredient();
  init_ingredient2();
  init_header();



  // init common
  init_simple_ani();
});


function init_simple_ani() {
  inView('.tempHide').
  on('enter', el => {
    $(el).addClass('show');
  }).
  on('exit', el => {
    $(el).removeClass('show');
  });
}





function init_beauty() {
  init_beauty_Slider();
  init_beauty_animation();
}



function init_beauty_Slider() {

  var mySwiper = new Swiper('.beauty .swiper-container', {
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 5,
    grabCursor: true,
    speed: 800,
    autoplay: {
      delay: 800 } });


}

function init_beauty_animation() {
  if (ChungTool.isPhone()) return;

  Motus.addAnimation(new Motus.Animation({
    $el: $('#beauty-section .textWrap')[0],
    keyframes: [{
      translateY: 50 },
    {
      translateY: -60 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#beauty-section')[0],
    keyframes: [{
      backgroundPositionX: 0 },

    {
      backgroundPositionX: 100 }] }));



}
function init_form() {
  initEventBtn();
  init_form_slider();
}

var formSwiper;

function initEventBtn() {
  const topBtn = $('#top-btn');
  const eventBtn = $('#event-btn');



  inView('#form-section').
  on('enter', () => {
    eventBtn.removeClass('show');
    setTimeout(() => {
      topBtn.addClass('show');
    }, 600);

  }).
  on('exit', el => {
    topBtn.removeClass('show');
    setTimeout(() => {
      eventBtn.addClass('show');
    }, 600);
  });

  topBtn.click(() => {
    ChungTool.pageScrollAni(0);
  });

  eventBtn.click(function () {
    ChungTool.pageScrollAni($('#form-section').offset().top - 100);
    slideout.close();
  });

}

function init_form_slider() {
  formSwiper = new Swiper('#form-section .swiper-container', {

    speed: 600,
    allowTouchMove: false,
    spaceBetween: 40,
    on: {
      slideChangeTransitionStart: () => {
        ChungTool.pageScrollAni($('#form').offset().top - 120);
      } } });



  $('#form-section');
}

function form_next() {
  formSwiper.slideNext();
}

function form_prev() {
  formSwiper.slidePrev();
}
function init_header() {

}



function init_index() {
  init_index_video();
  init_index_intro();
  waitIndexImgs();
}


function init_index_video() {
  const index_video = $('#index-video-bg')[0];
  const breaktime = 1.7;
  let fire = false;



  index_video.oncanplay = () => {
    if (ChungTool.isPhone()) {
      index_video.currentTime = breaktime;
    }
  };

  index_video.ontimeupdate = () => {
    if (index_video.currentTime > breaktime && !fire) {
      $('#event-btn').addClass('show');
      fire = true;
    }
  };

  index_video.onended = () => {
    index_video.currentTime = breaktime;
    index_video.play();
  };
}


function waitIndexImgs() {
  $('#index-section').imagesLoaded({
    background: 'div' }).

  done(function (instance) {
    index_play_intro();
  }).
  progress(function (instance, image) {
    // var result = image.isLoaded ? 'loaded' : 'broken';
    // console.log('image is ' + result + ' for ' + image.img.src);
  });
}


function init_index_intro() {
  if (ChungTool.isPhone()) return;

  gsap.set('#index-section .aniTxt,#index-section .aniTxt2', {
    scale: 2.5,
    opacity: 0 });

}


function index_play_intro() {
  if (ChungTool.isPhone()) return;

  let delay = 0;

  $('.aniTxt').each((index, el) => {
    delay = index === 2 ? delay + .6 : delay + .2;
    drop($(el), delay);
  });




  function drop(el, delay = 0) {
    let tl = new gsap.timeline();

    tl.to(el, {
      delay: delay,
      scale: 1,
      opacity: 1,
      duration: .5,
      ease: "power2.in" }).

    to(el, {
      x: '+=8',
      y: '+=1',
      repeat: 8,
      duration: .02,
      yoyo: true });


  }
}
function init_ingredient() {



  init_ingredient_video();
  init_ingredient_animation();
}


function init_ingredient_video() {
  const video = $('#ingredient-video')[0];
  const txt = $('#ingredient-section .videoTitle');
  const breaktime = .6;
  let fire = false;

  video.load();


  inView('#ingredient-section .videoBox').
  once('enter', () => {
    txt.addClass('show');
    setTimeout(() => {
      txt.removeClass('show');
      video.play();
    }, 3000);
  });

  // video.ontimeupdate = () => {
  //   if (video.currentTime > breaktime && !fire) {
  //     txt.removeClass('show');
  //     fire = true;
  //   }
  // }
}


function init_ingredient_animation() {
  if (ChungTool.isPhone()) return;

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ingredient-section .textWrap')[0],
    keyframes: [{
      translateY: 100 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ingredient-section .videoWrap')[0],
    keyframes: [{
      translateY: 100 },
    {
      translateY: -100 }] }));



  Motus.addAnimation(new Motus.Animation({
    $el: $('#ingredient-section')[0],
    keyframes: [
    { backgroundPositionY: 0 },
    { backgroundPositionY: 100 }] }));


}
function init_ingredient2() {



  init_ingredient2_animation();
}



function init_ingredient2_animation() {

  // if(ChungTool.isPhone())return;

  // Motus.addAnimation(new Motus.Animation({
  //   $el: $('#ingredient2-section')[0],
  //   keyframes: [
  //     {backgroundPositionX: '50%'},
  //     {backgroundPositionX: '0%'}
  //   ],
  // }));
}
var pro_ani1, pro_ani2, pro_ani3;

var links = [{
  s1: 'https://jbeauty.com.tw/P448l8',
  s2: 'https://jbeauty.com.tw/sQ9UK4',
  s3: 'https://jbeauty.com.tw/BT2djY' },
{
  s1: 'https://jbeauty.com.tw/q7P5QL',
  s2: 'https://jbeauty.com.tw/7D7ILG',
  s3: 'https://jbeauty.com.tw/gFZwYf' },
{
  s1: 'https://jbeauty.com.tw/4JU1iQ',
  s2: 'https://jbeauty.com.tw/hvZhyc',
  s3: 'https://jbeauty.com.tw/QOPX4e' }];






function init_products() {
  init_products_Slider();
  init_products_animation();
  init_product_store_link();

}

function init_product_store_link() {
  $('#products-section .productWrap .store-link').click(e => {
    e.preventDefault();
    var id = $(e.currentTarget).attr('data-link-id');

    $('#modal .store-btn').each((index, el) => {
      console.log(links[id][`s${index + 1}`]);
      $(el).attr('href', links[id][`s${index + 1}`]);
    });

    $("#modal").modal({
      fadeDuration: 200 });

  });
}


function init_products_Slider() {

  var mySwiper = new Swiper('.products .swiper-container', {
    navigation: {
      nextEl: '.products .swiper-btn-next',
      prevEl: '.products .swiper-btn-prev' },

    breakpoints: {
      0: {
        slidesPerView: 1 },

      1000: {
        slidesPerView: 2 },

      1300: {
        slidesPerView: 3 } } });



}


function init_products_animation() {

  $("#products-section .pro-title .txt").lettering();

  create_pro_Ani(1);
  create_pro_Ani(2);
  create_pro_Ani(3);


  inView('#products-section .swiper-slide').
  on('enter', el => {
    const id = $(el).index() + 1;
    window[`pro_ani${id}`].play();
  }).
  on('exit', el => {
    const id = $(el).index() + 1;
    // window[`pro_ani${id}`].seek(0);
    window[`pro_ani${id}`].pause(0);

  });
}

function create_pro_Ani(id) {

  window[`pro_ani${id}`] = new gsap.timeline({
    paused: true,
    delay: .1 });


  let el = $(`#products-section .pro-${id}`);

  window[`pro_ani${id}`].from(el.find('.pro-title .txt > span'), {
    y: '+=80',
    x: '+=20',
    rotate: '20deg',
    duration: .6,
    stagger: .08,
    opacity: 0,
    ease: 'back.out' },
  'title-in').
  from(el.find('.pro-title .icon-x'), {
    duration: .6,
    opacity: 0 },
  'title-in+=.6').
  from(el.find('.second-ani'), {
    stagger: .15,
    opacity: 0,
    duration: .6,
    y: '+=30' },
  '-=.8').
  from(el.find('.badge'), {
    scale: 1.8,
    opacity: 0,
    duration: .6 },
  '-=.6');



}
var slideout;

function init_sider() {

  init_sider_component();
  init_sider_menuBtn();
}

function init_sider_component() {
  var padding = 320;

  slideout = new Slideout({
    'panel': $('.panel')[0],
    'menu': document.getElementById('menu'),
    'padding': padding,
    'tolerance': 70 });


  document.querySelector('.header .menuBtn').addEventListener('click', function () {
    slideout.toggle();
  });

  var fixed = document.querySelector('.header');

  slideout.on('translate', function (translated) {
    fixed.style.transform = 'translateX(' + translated + 'px)';
  });

  slideout.on('beforeopen', function () {
    fixed.style.transition = 'transform 300ms ease';
    fixed.style.transform = `translateX(${padding}px)`;

    this.panel.classList.add('panel-open');

    $('.header .menuBtn').addClass('cloz');

  });

  slideout.on('beforeclose', function () {
    fixed.style.transition = 'transform 300ms ease';
    fixed.style.transform = 'translateX(0px)';

    this.panel.classList.remove('panel-open');
    this.panel.removeEventListener('click', close);

    $('.header .menuBtn').removeClass('cloz');

  });

  slideout.on('open', function () {
    fixed.style.transition = '';

    this.panel.addEventListener('click', close);

  });

  slideout.on('close', function () {
    fixed.style.transition = '';
  });


  function close(e) {
    e.preventDefault();
    slideout.close();
  }
}

function init_sider_menuBtn() {
  $('#menu li').click(e => {
    var t = $(e.currentTarget);
    console.log(t);
    console.log(`#${t.attr('data-url')}-section`);
    const target = $(`#${t.attr('data-url')}-section`);

    ChungTool.pageScrollAni(target.offset().top - 100);
    slideout.close();
  });
}
//# sourceMappingURL=all.js.map
