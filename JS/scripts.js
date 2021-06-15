let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Bulbasaur",
      types: ['grass', 'poison'],
      height: .7
    },
    {
      name: "Pikachu",
      types: ['electric'],
      height: .4
    },
    {
      name: "Onix",
      types: ['ground', 'rock'],
      height: 8.8
    }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

let list = pokemonRepository.getAll();

list.forEach(function (pokemon) {
  addListItem(pokemon)
});


function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listItemPokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  button.addEventListener('click', pokemon_clicked);
  listItemPokemon.appendChild(button);
  pokemonList.appendChild(listItemPokemon);
}

function showDetails(pokemon) {
  console.log(event);
  let pokemon_button = event.target;
  console.log(pokemon_button.innerText);
}
