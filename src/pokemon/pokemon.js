const fakeData = {
  id: '171',
  name: 'LANTURN',
  category: 'LIGHT',
  type: 'WATE/ELEC',
  height: "3'11''",
  weight: '49.6',
  description: 'This POKéMON uses the bright part of its body, which',
};

const getPokemon = () => {
  return fakeData;
};

const pokemonTemplate = ({
  id,
  name,
  category,
  type,
  height,
  weight,
  description,
}) => {
  return `
    <div id="container">
      <div id="main">
        <div class="top">
          <div class="top_left">
            <div class="top_left__image" data-cy="img_pokemon" style="background-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/${id}.png');"></div>
            <div class="top_left__number" data-cy="number">No. ${id}</div>
            <div class="top_left__page" data-cy="page_number"><p>P.1</p></div>
          </div>
          <div class="top_right" id="info">
            <div class="column" data-cy="name">${name}</div>
            <div class="column" data-cy="category">${category}</div>
            <div class="column" data-cy="type">${type}</div>
            <div class="column" data-cy="height">HT <b>${height}</b></div>
            <div class="column" data-cy="weight">WT <b>${weight}</b>lb</div>
          </div>
        </div>
        <div class="description" data-cy="description">
        ${description} 
      </div>
      <div class="bottom">
        <div class="column" data-cy="btn_page">>Page</div>
        <div class="column" data-cy="btn_cry">Cry</div>
        <div class="column" data-cy="btn_print">Print</div>
        <div class="column" data-cy="btn_back">Back</div>
      </div>
    </div>
    `;
};

document.querySelector('#pokedex').innerHTML = pokemonTemplate(getPokemon());
