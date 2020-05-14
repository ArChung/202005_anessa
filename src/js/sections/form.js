function init_form() {
  initEventBtn();
  init_form_slider();
}

var formSwiper;

function initEventBtn() {
  const topBtn = $('#top-btn');
  const eventBtn = $('#event-btn');



  inView('#form-section')
    .on('enter', () => {
      eventBtn.removeClass('show');
      setTimeout(() => {
        topBtn.addClass('show');
      }, 600);

    })
    .on('exit', el => {
      topBtn.removeClass('show');
      setTimeout(() => {
        eventBtn.addClass('show');
      }, 600);
    });

  topBtn.click(() => {
    ChungTool.pageScrollAni(0)
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
        ChungTool.pageScrollAni($('#form').offset().top - 120)
      }
    }
  })

  $('#form-section')
}

function form_next() {
  formSwiper.slideNext();
}

function form_prev() {
  formSwiper.slidePrev();
}