const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('form');
const input = document.querySelector('input');
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!APIResponse.ok) throw new Error('Pokémon não encontrado');
        const data = await APIResponse.json();
        return data;
    } catch (error) {
        alert(error.message);
        pokemonName.innerHTML = '';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = '';
    }
}

    const renderPokemon = async (pokemon) => {
        const data = await fetchPokemon(pokemon);

        pokemonName.innerHTML = 'carregando...';
        pokemonNumber.innerHTML = '';
    
        if (data) { 
            pokemonImage.style.display = 'block';
            pokemonName.innerHTML = data.name;
            pokemonNumber.innerHTML = data.id;
            searchPokemon = data.id;
            
            const animatedSprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    
            
            pokemonImage.src = animatedSprite ? animatedSprite : data.sprites.front_default;

            
        }else{
            pokemonImage.style.display = 'none';
        }
        
    }

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});


buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1){
    searchPokemon -= 1;;
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', (event) => {
    searchPokemon += 1;;
    renderPokemon(searchPokemon);
   });
   

renderPokemon(searchPokemon);