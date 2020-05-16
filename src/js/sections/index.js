function init_index() {
  init_index_video();
  init_index_intro();
  waitIndexImgs();
  init_phone_eventBtn_position();
}


function init_index_video() {
  if (ChungTool.isPhone()) return

  const index_video = $('#index-video-bg')[0];
  const breaktime = 1.7;
  let fire = false;


  index_video.ontimeupdate = () => {
    if (index_video.currentTime > breaktime && !fire) {
      $('#event-btn').addClass('show');
      fire = true;
    }
  }

  index_video.onended = () => {
    index_video.currentTime = breaktime;
    index_video.play();
  }

  index_video.play();

}

function init_phone_eventBtn_position() {
  if (!ChungTool.isPhone()) return

  window.onscroll = function () {
    if (window.pageYOffset < 100) {

      adjuctPos();

    } else {

      $('#event-btn').css({
        'top': '100%',
        'margin-top': '0px'
      });
      $('#event-btn').removeClass('in-index');
    }
  }

  $('#event-btn').addClass('show');

  adjuctPos();

  function adjuctPos() {
    if ($('#event-btn').hasClass('in-index')) return;

    console.log(46546546546);
    const indexHeight = $('#index-section').height();
    const screenHeight = document.documentElement.clientHeight;
    const headerHeight = $('#header').height();
    const btnHeight = $('#event-btn').height();
    if (screenHeight > indexHeight + btnHeight / 3 + headerHeight) {
      $('#event-btn').css({
        'top': (indexHeight + headerHeight) / screenHeight * 100 + '%',
        'margin-top': btnHeight / 3 + 'px'
      })
    }

    $('#event-btn').addClass('in-index')
  }
}

function waitIndexImgs() {
  $('#index-section').imagesLoaded({
      background: 'div'
    })
    .done(function (instance) {
      index_play_intro();
    })
    .progress(function (instance, image) {
      // var result = image.isLoaded ? 'loaded' : 'broken';
      // console.log('image is ' + result + ' for ' + image.img.src);
    });
}


function init_index_intro() {
  if (ChungTool.isPhone()) return

  gsap.set('#index-section .aniTxt,#index-section .aniTxt2', {
    scale: 2.5,
    opacity: 0
  })
}


function index_play_intro() {
  if (ChungTool.isPhone()) return

  let delay = 0;

  $('.aniTxt').each((index, el) => {
    delay = (index === 2) ? delay + .6 : delay + .2;
    drop($(el), delay)
  })




  function drop(el, delay = 0) {
    let tl = new gsap.timeline();

    tl.to(el, {
        delay: delay,
        scale: 1,
        opacity: 1,
        duration: .5,
        ease: "power2.in",
      })
      .to(el, {
        x: '+=8',
        y: '+=1',
        repeat: 8,
        duration: .02,
        yoyo: true,
      })

  }
}