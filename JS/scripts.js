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
for (let i = 0; i < pokemonList.length; i++){

  document.write(pokemonList[i].name)
  document.write(" (height: ")
  document.write(pokemonList[i].height)
  document.write(")")

  if(pokemonList[i].height>1){
    document.write(" Wow that's big")
  }

  document.write("<br>")
}
