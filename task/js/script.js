// pokemonRepository
let pokemonRepository = (function () {
    let pokemonList = [];
  
    function add(pokemon) {
      if (typeof pokemon === 'object' && 'name' in pokemon) {
        pokemonList.push(pokemon);
      } else {
        console.log('pokemon is not correct');
      }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemonModal');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }
  
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }
  
    function loadList() {
      showLoadingMessage();
      return fetch('https://pokeapi.co/api/v2/pokemon/')
        .then(function (response) {
          hideLoadingMessage();
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        })
        .catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        });
    }
  
    function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      showLoadingMessage();
      return fetch(url)
        .then(function (response) {
          hideLoadingMessage();
          return response.json();
        })
        .then(function (details) {
          // Now we add the details to the pokemon
          pokemon.imgUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.types = details.types;
        })
        .catch(function (e) {
          hideLoadingMessage();
          console.error(e);
        });
    }
    
    function showLoadingMessage() {
        let loading = document.createElement('div');
        loading.innerText = 'Loading...';
        loading.style.position = 'fixed';
        loading.style.top = 0;
        loading.style.left = 0;
        loading.style.width = '100%';
        loading.style.backgroundColor = 'white';
        loading.style.color = 'black';
        loading.style.padding = '10px';
        document.querySelector('.pokemon-list').appendChild(loading);
        // document.body.appendChild(loading);
      }
      

    // function showLoadingMessage() {
    //     let loading = document.createElement('div');
    //     loading.innerText = 'Loading...';
    //     document.querySelector('.pokemon-list').appendChild(loading);
    //   }

    function hideLoadingMessage() {
        let loading = document.querySelector('.pokemon-list div');
        if (loading) {
            loading.remove();
        }
    }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();
  
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  
  