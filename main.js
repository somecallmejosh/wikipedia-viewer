const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
function getSearch() {
  search.input();
}

let searchTerm = "Freddie Mercury";
var jqxhr = $.getJSON( `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&callback=?`, function() {
  console.log( "success" );
})
  .done(function(data) {
    console.log(data);
    console.log(data[1].length);
    console.log(`${data[1][0]}: ${data[2][0]} \n ${data[3][0]}`);
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
