function init_ingredient() {



  init_ingredient_video();
  init_ingredient_animation();
}


function init_ingredient_video() {
  const video = $('#ingredient-video')[0];
  const txt = $('#ingredient-section .videoTitle');
  const breaktime = 2;
  let fire = false;

  video.load();


  inView('#ingredient-section .videoBox')
    .on('enter', () => {
      txt.addClass('show');
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
      }, 1000);
    }).on('exit', () => {
      txt.addClass('show');
      setTimeout(() => {
        video.currentTime = 0;
        video.pause();
      }, 1000);
    })

  video.ontimeupdate = () => {
    if (video.currentTime > breaktime ) {
      txt.removeClass('show');
      // fire = true;
    }
  }
}


function init_ingredient_animation() {
  if(ChungTool.isPhone())return;
  
  Motus.addAnimation(new Motus.Animation({
    $el: $('#ingredient-section .textWrap')[0],
    keyframes: [{
      translateY: 100,
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
    keyframes: [
      {backgroundPositionY: 0},
      {backgroundPositionY: 100}
    ],
  }));
}