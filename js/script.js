const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
    const data = await APIResponse.json();

    return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    

    const data = await fetchPokemon(pokemon);

    if(data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    input.value = '';
    searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Pokemon não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    if(input.value <= 151){
    renderPokemon(input.value.toLowerCase());
    } else {
        pokemonName.innerHTML = 'Pokemon não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
});
buttonPrev.addEventListener('click', () => {
    if(searchPokemon>1){
    searchPokemon--;
    renderPokemon(searchPokemon);
    }


});
buttonNext.addEventListener('click', () => {
    if(searchPokemon<151)
    searchPokemon++;
    renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);

