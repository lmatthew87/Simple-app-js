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
  document.write(pokemon.name)
  document.write(" (height: ")
  document.write(pokemon.height)
  document.write(")")

  if(pokemon.height>1){
    document.write(" Wow that's big")
  }

  document.write("<br>")
});
