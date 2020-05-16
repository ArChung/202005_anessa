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
  inView('.tempHide')
    .on('enter', (el) => {
      $(el).addClass('show');
    })
    .on('exit', (el) => {
      $(el).removeClass('show');
    })
}


