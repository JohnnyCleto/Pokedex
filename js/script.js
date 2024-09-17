const tipoCores = {
    fairy: "#F4A6B4",
    steel: "#798899",
    dark: "#000000",
    ghost: "#735797",
    dragon: "#6D28D9",
    electric: "#F6D02F",  
    ice: "#98D8D8",
    water: "#6390F0",
    grass: "#7AC74C",
    fire: "#ff0e0e",      
    fighting: "#6e6e6e;",  
    poison: "#A0338C",
    ground: "#E2BF65",    
    flying: "#A0A0E0",    
    psychic: "#F37176",   
    bug: "#A6B91A",       
    rock: "#B6A136",     
    normal: "#f79839"     
};



const pokemonName = document.querySelector('.pokemon_nome');
const pokemonNumber = document.querySelector('.pokemon_numero');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonInfo = document.querySelector('.pokemon_info');

const form = document.querySelector('.form');
const buscarpokemon = document.querySelector('.buscarpokemon');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const leftSide = document.getElementById('left-side');
const rightSide = document.getElementById('right-side');

let searchpokemon = 1;


const buscarPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIResponse.status === 200) {
            return await APIResponse.json();
        } else {
            throw new Error('Pokémon não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        return null;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = ''; 
    pokemonInfo.innerHTML = '';  
    

    const data = await buscarPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        pokemonNumber.innerHTML = `#${data.id.toString().padStart(3, '0')}`;

        const imageUrl = data.sprites?.versions?.['generation-v']?.['black-white']?.animated?.['front_default'];
        pokemonImage.src = imageUrl || 'https://via.placeholder.com/200'; 
        pokemonImage.style.display = 'block'; 

        buscarpokemon.value = '';
        searchpokemon = data.id;

        const tipos = data.types.map(typeInfo => tipoCores[typeInfo.type.name] || '#fff');
        if (leftSide && rightSide) {
            if (tipos.length > 1) {
                leftSide.style.backgroundColor = tipos[0];
                rightSide.style.backgroundColor = tipos[1];
            } else {
                leftSide.style.backgroundColor = tipos[0];
                rightSide.style.backgroundColor = tipos[0];
            }
        }

        const pokemonInfoHTML = `
            <h2>${data.name.toUpperCase()} (#${data.id})</h2>
            <p>Altura: ${data.height / 10} m</p>
            <p>Peso: ${data.weight / 10} kg</p>
            <p>Tipos: ${data.types.map(type => `<span style="color: ${tipoCores[type.type.name] || '#000'}">${type.type.name}</span>`).join(', ')}</p>
        `;
        pokemonInfo.innerHTML = pokemonInfoHTML;

    } else {
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
        buscarpokemon.classList.add('error');
        setTimeout(() => {
            buscarpokemon.classList.remove('error');
        }, 1500);
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(buscarpokemon.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchpokemon > 1) {
        searchpokemon -= 1;
        renderPokemon(searchpokemon);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchpokemon < 1010) {
        searchpokemon += 1;
        renderPokemon(searchpokemon);
    }
});

renderPokemon(searchpokemon);
