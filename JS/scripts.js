let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll(){
    return pokemonList;
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItemPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal")

    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
    listItemPokemon.appendChild(button);
    pokemonList.appendChild(listItemPokemon);
  };
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    add: addListItem,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

(function(){
  let form = document.querySelector('#register-form');
  let emailInput = document.querySelector('#email');
  let passwordInput = document.querySelector('#password')

  function validateEmail(){
    let value = emailInput.value;
    let hasAtSign = value.indexOf('@')> -1;
    let hasDot = value.indexOf('.') > -1;
    return value && hasAtSign && hasDot;
  }

  function validatePassword() {
    let  value = passwordInput.value;
    return value && value.length >=8;
  }

  function showErrorMessage(input, message) {
    let container = input.parentElement;
    let error = container.querySelector('.error-message;');
    if(error){
      conatiner.removeChild(error);
    }

    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  }

  function validateEmail() {
    let value = emailInput.value;
    if (!value){
      showErrorMessage(emailInput, 'Email is a required field');
      return false;
    }
    if (value .indexOf('@') === -1){
      showErrorMessage(emailInput, 'You must enter a valid email address.');
      return false
    }
    showErrorMessage(emailInput, null);
    return true;
  }

  function validatePassword(){
    let value = passwordInput.value;
    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }
    if (value.length < 8){
      showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
      return false
    }
    showErrorMessage(passwordInput, null);
    return true;
  }
  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()){
      alert('Success!');
    }
  });

  emailInput.addEventListener('input', validateEmail);
  passwordInput.addEventListener('input' , validatePassword);
})();


function showModal(pokemon) {
  console.log("Show modal");
  let modalContainer = document.querySelector('#modal-container');

  let modalBody = document.querySelector('.modal-body');
  let modalTitle = document.querySelector('.modal-title');

  modalTitle.innerText = pokemon.name;

  modalBody.innerHtml = "";
  let contentElement = document.createElement('p');
  contentElement.innerText = pokemon.height;

  let imageElement = document.createElement('img');
  imageElement.setAttribute('src', pokemon.imageUrl);
  modalBody.appendChild(contentElement);
  modalBody.appendChild(imageElement);

  $("#pokemonModal").modal("toggle");
}

let dialogPromiseReject; // This can be set later, by showDialog

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

function showDialog(title, text) {
  showModal(title, text);

  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', hideModal);
    confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null; // Reset this
      hideModal();
      resolve();
    });

    // This can be used to reject from other functions
    dialogPromiseReject = reject;
  });

  // We have defined modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  // We want to add a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);
}

window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});

let modalContainer = document.querySelector('#modal-container');
modalContainer.addEventListener('click', (e) => {
  console.log("click inside");
  //    let target = e.target;
  //    if (target === modalContainer) {
  hideModal();
  //    }
});

// This is the actual program
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.add(pokemon);
  });
});
