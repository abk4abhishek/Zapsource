function redbox1(){
  $( document ).ready(function(){
    $(".button-collapse").sideNav({
  menuWidth: 300, // Default is 240
  closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
});

    $('.parallax').parallax();
    $('.collapsible').collapsible();
    $('select').material_select();
  });
}
