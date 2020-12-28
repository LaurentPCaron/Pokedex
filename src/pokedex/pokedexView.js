const pokedexView = index => {
  const MAX_SUB_LIST_INDEX = 6;
  let MAX_POKEMON_INDEX = 20;

  let subListIndex = 0;
  let pokemonIndex = index ? index : 0;
  let pokemons;

  const goToPokemonPage = () => {
    document.location.href = `${document.location.pathname}#${
      pokemonIndex + 1
    }`;
    location.reload();
  };

  const changeListCursor = value => {
    const MAX_PURCENTAGE_INDEX = 85;

    if (
      (subListIndex === 0 && value === -1) ||
      (subListIndex === MAX_SUB_LIST_INDEX && value === 1)
    ) {
      return;
    }

    subListIndex += value;
    if (subListIndex > MAX_SUB_LIST_INDEX) {
      subListIndex = MAX_SUB_LIST_INDEX;
    }
    if (subListIndex < 0) {
      subListIndex = 0;
    }

    const cursorLocation =
      (MAX_PURCENTAGE_INDEX / MAX_SUB_LIST_INDEX) * subListIndex;
    document
      .querySelector('#cursor')
      .style.setProperty('--list-cursor', `${cursorLocation}%`);
  };

  const changePokemonIndex = value => {
    if (
      (pokemonIndex === 0 && value <= -1) ||
      (pokemonIndex === MAX_POKEMON_INDEX && value >= 1)
    ) {
      return;
    }
    pokemonIndex += value;
    if (pokemonIndex < 0) {
      pokemonIndex = 0;
    } else if (pokemonIndex > MAX_POKEMON_INDEX) {
      pokemonIndex = MAX_POKEMON_INDEX;
    }

    if (
      (subListIndex === 0 && value === -1) ||
      (subListIndex === MAX_SUB_LIST_INDEX && value === 1) ||
      value < -1 ||
      value > 1
    ) {
      changePokemonSubList();
    }
  };

  const changeImage = () => {
    document.querySelector('#image__pokemon').src =
      pokemons[pokemonIndex].imgUrl;
  };

  const toggleListArrow = () => {
    const listUpArrow = document.querySelector('#list__up');
    const listDownArrow = document.querySelector('#list__down');
    if (pokemonIndex === 0) {
      listUpArrow.classList.add('hide');
    } else if (pokemonIndex === MAX_POKEMON_INDEX) {
      listDownArrow.classList.add('hide');
    } else if (listUpArrow.classList.contains('hide')) {
      listUpArrow.classList.remove('hide');
    } else if (listDownArrow.classList.contains('hide')) {
      listDownArrow.classList.remove('hide');
    }
  };

  const changePokemonSubList = () => {
    const sublist = document.querySelector('#pokemon_sublist');
    sublist.innerHTML = '';
    let minLimit;
    let maxLimit;

    if (subListIndex === 0) {
      minLimit = pokemonIndex;
      maxLimit = pokemonIndex + MAX_SUB_LIST_INDEX;
    } else if (subListIndex === MAX_SUB_LIST_INDEX) {
      maxLimit = pokemonIndex;
      minLimit = pokemonIndex - MAX_SUB_LIST_INDEX;
    } else {
      minLimit = pokemonIndex - subListIndex;
      maxLimit = minLimit + MAX_SUB_LIST_INDEX;
    }

    if (maxLimit > MAX_POKEMON_INDEX) {
      maxLimit = MAX_POKEMON_INDEX;
      minLimit = maxLimit - MAX_SUB_LIST_INDEX;
    }
    if (minLimit < 0) {
      minLimit = 0;
      maxLimit = minLimit + MAX_SUB_LIST_INDEX;
    }

    for (let i = minLimit; i <= maxLimit; i++) {
      const pokemonNumber = pokemons[i].id.toString().padStart(3, '0');

      const pokemon = document.createElement('li');
      pokemon.setAttribute('data-cy', `pokemon_${i + 1}`);
      pokemon.innerHTML = `${pokemonNumber}<br />${pokemons[
        i
      ].name.toUpperCase()}`;
      sublist.append(pokemon);
    }
  };

  const pokedexTemplate = () => {
    return `<div class="pokedex__container test">
    <div class="title">Pokedex Pokémon Crystal</div>
    <div class="pokedex__frame">
      <div class="pokedex__main">
        <div class="section image_container">
          <div class="image">
            <img
            id="image__pokemon"
              data-cy="image"
              src="${pokemons[pokemonIndex].imgUrl}"
            />
            <div class="image__filter"></div>
          </div>
        </div>
        <div class="statue section">
          <ul>
            <li>SEEN</li>
            <li>251</li>
            <li>OWN</li>
            <li>251</li>
          </ul>
        </div>

        <div class="list section">
          <div class="section arrow hide" id="list__up" data-cy="list-up-arrow">
            <img src="./img/arr.png" alt="up arrow" />
          </div>
          <img id="cursor" src="img/cursor.png" alt="cursor" data-cy="list_cursor"/>
          <ul id="pokemon_sublist">
          </ul>
          <div class="section arrow" id="list__down" data-cy="list-down-arrow">
            <img src="./img/arr.png" alt="up arrow" />
          </div>
        </div>
        <div class="scroll section">
          <div id="scroll__pointer" class="section" data-cy="scroll__pointer"></div>
        </div>
      </div>
      <div class="pokedex__bottom">
        <div class="option pokedex__btn">
          SELECT
          <span class="right_arrow">
            <img src="img/arr.png" alt="right arrow" /></span
          >OPTION
        </div>
        <div class="credit">
          <div class="search pokedex__btn">
            START
            <span class="right_arrow">
              <img src="img/arr.png" alt="right arrow"
            /></span>
            SEARCH
          </div>
        </div>
      </div>
    </div>
  </div>`;
  };

  new pokedex().fetchPokemonList().then(res => {
    pokemons = res;
    MAX_POKEMON_INDEX = pokemons.length - 1;
    document.querySelector('#pokedex').innerHTML = pokedexTemplate();
    changePokemonSubList();
  });

  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        changePokemonIndex(-1);
        changeListCursor(-1);
        toggleListArrow();
        break;
      case 'ArrowDown':
        changePokemonIndex(1);
        changeListCursor(1);
        break;
      case 'ArrowRight':
        changePokemonIndex(7);
        if (pokemonIndex === MAX_POKEMON_INDEX) {
          changeListCursor(MAX_SUB_LIST_INDEX);
        }
        break;
      case 'ArrowLeft':
        changePokemonIndex(-7);
        if (pokemonIndex === 0) {
          changeListCursor(-MAX_SUB_LIST_INDEX);
        }
        break;
      case 'Enter':
        goToPokemonPage();
      default:
        return;
    }
    changeImage();
    toggleListArrow();
  });
};
