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
    'tolerance': 70
  });

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
  $('#menu li').click((e) => {
    var t = $(e.currentTarget);
    console.log(t);
    console.log(`#${t.attr('data-url')}-section`);
    const target = $(`#${t.attr('data-url')}-section`)

    ChungTool.pageScrollAni(target.offset().top - 100);
    slideout.close();
  });
}