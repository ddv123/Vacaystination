// init Masonry
var $grid = $('.grid').masonry({
  // options...
  columnWidth: 0,
  gutter: 10,
  fitWidth: true,
  itemSelector: '.grid-item'
});
// layout Masonry after each image loads
$grid.imagesLoaded().progress( function() {
  $grid.masonry('layout');
});