const tipoCores = {
    fairy: "#F5A6B4",
    steel: "#BCC6CC",
    dark: "#4A4A4A",
    ghost: "#6A5ACD",
    dragon: "#6F42C1",
    electric: "#F5A623",
    ice: "#50E3C2",
    water: "#4A90E2",
    grass: "#7ED321",
    fire: "#FF6F61",
    fighting: "#D0021B",
    poison: "#8B5C9D",
    ground: "#D4A24A",
    flying: "#5B6F9F",
    psychic: "#F85C6A",
    bug: "#9BCE40",
    rock: "#BDB76B",
    normal: "#A8A77A"
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
    pokemonImage.src = '';  // Limpa a imagem anterior
    pokemonImage.style.display = 'none';  // Oculta a imagem enquanto carrega
    pokemonInfo.innerHTML = '';  // Limpa informações anteriores
    

    const data = await buscarPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        pokemonNumber.innerHTML = `#${data.id.toString().padStart(3, '0')}`;

        const imageUrl = data.sprites?.versions?.['generation-v']?.['black-white']?.animated?.['front_default'];
        pokemonImage.src = imageUrl || 'https://via.placeholder.com/200'; // Imagem padrão
        pokemonImage.style.display = 'block'; // Mostra a imagem

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