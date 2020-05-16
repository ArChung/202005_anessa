function init_ingredient() {



  init_ingredient_video();
  init_ingredient_animation();
}


function init_ingredient_video() {
  const video = $('#ingredient-video')[0];
  // const txt = $('#ingredient-section .videoTitle');
  // const breaktime = 2;
  // let fire = false;

  video.load();


  inView('#ingredient-section .videoBox')
    .on('enter', () => {

    }).on('exit', () => {

      if (!video.paused) {
        video.pause();
      }

    })


  video.onpause = () => {
    $('#ingredient-section .videoPlayBtn').addClass('show');
  }

  video.onplay = () => {
    $('#ingredient-section .videoPlayBtn').removeClass('show');
  }

  $('#ingredient-section .videoPlayBtn').click(function () {
    if (!video.paused) {
      video.pause();
    } else {
      video.play();
    }

  });
  // video.ontimeupdate = () => {
  //   if (video.currentTime > breaktime ) {
  //     txt.removeClass('show');
  //     // fire = true;
  //   }
  // }
}


function init_ingredient_animation() {
  if (ChungTool.isPhone()) return;

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ingredient-section .textWrap')[0],
    keyframes: [{
      translateY: 50,
    }, ],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ingredient-section .videoWrap')[0],
    keyframes: [{
      translateY: 100,
    }, {
      translateY: -100,
    }],
  }));

  Motus.addAnimation(new Motus.Animation({
    $el: $('#ingredient-section')[0],
    keyframes: [{
        backgroundPositionY: 0
      },
      {
        backgroundPositionY: 100
      }
    ],
  }));
}