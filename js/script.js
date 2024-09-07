const pokemonName = document.querySelector('.pokemon_nome');
const pokemonNumber = document.querySelector('.pokemon_numero');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const buscarpokemon = document.querySelector('.buscarpokemon');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchpokemon = 1;

const buscarPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = ''; 

    const data = await buscarPokemon(pokemon);

    if(data){
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.style.display = 'block';
    buscarpokemon.value = '';  
    searchpokemon = data.id;
    } else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = ''; 
    }

}

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(buscarpokemon.value.toLowerCase());
});

buttonPrev.addEventListener('click', () =>{
    if (searchpokemon > 1){
        searchpokemon -= 1;
        renderPokemon(searchpokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    searchpokemon += 1
    renderPokemon(searchpokemon)
});

renderPokemon(searchpokemon);
