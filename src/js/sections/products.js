var pro_ani1, pro_ani2, pro_ani3;

var links = [{
  s1: 'https://jbeauty.com.tw/P448l8',
  s2: 'https://jbeauty.com.tw/sQ9UK4',
  s3: 'https://jbeauty.com.tw/BT2djY',
},{
  s1: 'https://jbeauty.com.tw/q7P5QL',
  s2: 'https://jbeauty.com.tw/7D7ILG',
  s3: 'https://jbeauty.com.tw/gFZwYf',
},{
  s1: 'https://jbeauty.com.tw/4JU1iQ',
  s2: 'https://jbeauty.com.tw/hvZhyc',
  s3: 'https://jbeauty.com.tw/QOPX4e',
}]





function init_products() {
  init_products_Slider();
  init_products_animation();
  init_product_store_link();

}

function init_product_store_link(){
  $('#products-section .productWrap .store-link').click((e)=>{
    e.preventDefault();
    var id = $(e.currentTarget).attr('data-link-id');
    
    $('#modal .store-btn').each((index,el)=>{
      console.log(links[id][`s${index+1}`]);
      $(el).attr('href',links[id][`s${index+1}`])
    })

    $("#modal").modal({
      fadeDuration: 200,
    });
  })
}


function init_products_Slider() {

  var mySwiper = new Swiper('.products .swiper-container', {
    navigation: {
      nextEl: '.products .swiper-btn-next',
      prevEl: '.products .swiper-btn-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      1000: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 3,
      }
    }
  })
}


function init_products_animation() {

  $("#products-section .pro-title .txt").lettering();

  create_pro_Ani(1);
  create_pro_Ani(2);
  create_pro_Ani(3);


  inView('#products-section .swiper-slide')
    .on('enter', el => {
      const id = $(el).index()+1
      window[`pro_ani${id}`].play();
    })
    .on('exit', el => {
      const id = $(el).index()+1
      // window[`pro_ani${id}`].seek(0);
      window[`pro_ani${id}`].pause(0);

    });
}

function create_pro_Ani(id) {

  window[`pro_ani${id}`] = new gsap.timeline({
    paused: true,
    delay: .1,
  });

  let el = $(`#products-section .pro-${id}`);

  window[`pro_ani${id}`].from(el.find('.pro-title .txt > span'), {
      y: '+=80',
      x: '+=20',
      rotate: '20deg',
      duration: .6,
      stagger: .08,
      opacity: 0,
      ease: 'back.out'
    }, 'title-in')
    .from(el.find('.pro-title .icon-x'), {
      duration: .6,
      opacity: 0,
    }, 'title-in+=.6')
    .from(el.find('.second-ani'), {
      stagger: .15,
      opacity: 0,
      duration: .6,
      y: '+=30'
    }, '-=.8')
    .from(el.find('.badge'), {
      scale: 1.8,
      opacity: 0,
      duration: .6,
    }, '-=.6')



}