const getPkmnId = () => {
  let pkmnIdParam = parseInt(
    new URLSearchParams(window.location.search).get('id')
  );

  if (!pkmnIdParam || pkmnIdParam < 1 || pkmnIdParam > 251) {
    return 0;
  }

  return pkmnIdParam;
};

const pokemonTemplate = ({
  number,
  name,
  category,
  type,
  height,
  weight,
  description,
  imageURL,
}) => {
  let stingNumber = `${number}`;
  while (stingNumber.length < 3) {
    stingNumber = `0${stingNumber}`;
  }
  return `
    <div id="container">
      <div id="main">
        <div class="top">
          <div class="top_left">
            <div class="top_left__image" data-cy="img_pokemon" style="background-image: url(${imageURL});"></div>
            <div class="top_left__number" data-cy="number">No.${stingNumber}</div>
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
        <div class="description" data-cy="description">${description[1]}</div>
      <div class="bottom">
        <div class="column" data-cy="btn_page">>Page</div>
        <div class="column" data-cy="btn_cry">Cry</div>
        <div class="column" data-cy="btn_print">Print</div>
        <div class="column" data-cy="btn_back">Back</div>
      </div>
    </div>
    `;
};

const _pokemon = new Pokemon(getPkmnId());

if (document.querySelector('#pokedex')) {
  _pokemon.getPokemonInfo().then(res => {
    document.querySelector('#pokedex').innerHTML = pokemonTemplate(res);
    document.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        new Audio(res.cry).play();
      }
    });
  });
}
