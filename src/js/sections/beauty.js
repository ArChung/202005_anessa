function init_beauty() {
  if ($('#beauty-section').hasClass('hide')) {
    $('#beauty-section').empty();
    $('#menu .beautyMenuBtn').addClass('hide');
  } else {
    init_beauty_Slider();
    init_beauty_animation();
  }
}



function init_beauty_Slider() {

  var mySwiper = new Swiper('.beauty .swiper-container', {
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 5,
    grabCursor: true,
    speed: 800,
    autoplay: {
      delay: 800,
    }
  })
}

function init_beauty_animation() {
  if (ChungTool.isPhone()) return;

  Motus.addAnimation(new Motus.Animation({
    $el: $('#beauty-section .textWrap')[0],
    keyframes: [{
      translateY: 50,
    }, {
      translateY: -60,
    }, ],
  }));

  // Motus.addAnimation(new Motus.Animation({
  //   $el: $('#beauty-section')[0],
  //   keyframes: [{
  //       backgroundPositionX: 0
  //     },
  //     {
  //       backgroundPositionX: 100
  //     }
  //   ],
  // }));
}