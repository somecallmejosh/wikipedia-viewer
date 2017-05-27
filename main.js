const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
searchInput.focus();

function returnErrorContent(message) {
  return `
  <div class="uk-width-1-1 uk-text-center">
    <div class="uk-card uk-card-default uk-card-body">
      <p>${message}</p>
    </div>
  </div>
  `;
}

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
  searchResults.innerHTML = '';
  const searchTerm = searchInput.value;

  if(searchTerm) {
    var jqxhr = $.getJSON( `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&format=json&callback=?`, function() {
      console.log( "success" );
    })
      .done(function(data) {
        const returnedData = data[1].length;

        if(returnedData) {
          for(let i = 0; i < data[1].length; i++) {
            const headerText = data[1][i];
            const descriptionText = data[2][i];
            const url = data[3][i];

            const card = document.createElement('div');
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('uk-card', 'uk-card-default', 'uk-card-body');
            card.appendChild(cardWrapper);

            // Only build out DOM elements if necessary
            // And don't dump empty containers into the DOM.

            if(headerText) {
              const header = document.createElement('h3');
              header.classList.add('uk-card-title')
              header.textContent = headerText;
              cardWrapper.appendChild(header);
            }

            if(descriptionText) {
              const description = document.createElement('p');
              description.classList.add('uk-text-small');
              description.textContent = descriptionText;
              cardWrapper.appendChild(description);
            }

            if(url) {
              const link = document.createElement('a');
              link.classList.add('uk-button', 'uk-button-primary')
              link.setAttribute('href', url);
              link.textContent = "View";
              cardWrapper.appendChild(link);
            }

            searchResults.appendChild(card);
          }
        } else {
          const noResultsContent = returnErrorContent(`Your search of <em>${searchTerm}</em> didn't return any results. Want to try another search term?`);
          searchResults.innerHTML = noResultsContent;
        }

      })
      .fail(function() {
        const endPointFail = returnErrorContent(`<em>We're sorry</em>, but we're unable to connect to Wikipedia right now. Please try again later.`);
        searchResults.innerHTML = endPointFail;
      })
      .always(function() {
        console.log( "complete" );
      });
  } else {
    const noSearchInputText = returnErrorContent(`<em>Hmmm... looks like the search field is blank.</em> Probably my mistake. Try typing something in the search field above before pressing the "Search" button.`);
    searchResults.innerHTML = noSearchInputText;
  }

  searchInput.focus();
});
