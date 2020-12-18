const pokedexView = () => {
  let listIndex = 0;

  const changeListCursor = value => {
    const MAX_PURCENTAGE_INDEX = 85;
    const QTE_LIST_ITEMS = 6;
    if (
      (listIndex === 0 && value === -1) ||
      (listIndex === QTE_LIST_ITEMS && value === 1)
    ) {
      return;
    }
    listIndex += value;
    const cursorLocation = (MAX_PURCENTAGE_INDEX / QTE_LIST_ITEMS) * listIndex;
    document
      .querySelector('#cursor')
      .style.setProperty('--list-cursor', `${cursorLocation}%`);
  };

  const pokedexTemplate = () => {
    return `<div class="pokedex__container test">
    <div class="title">Pokedex Pokémon Crystal</div>
    <div class="pokedex__frame">
      <div class="pokedex__main">
        <div class="section image_container">
          <div class="image">
            <img
              data-cy="image"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/34.png"
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
          <div class="section arrow" id="list__up">
            <img src="./img/arr.png" alt="up arrow" />
          </div>
          <img id="cursor" src="img/cursor.png" alt="cursor" data-cy="list_cursor"/>
          <ul>
            <li>000<br />FORRETRESSS</li>
            <li>000<br />Pokemon</li>
            <li>000<br />Pokemon</li>
            <li>000<br />Pokemon</li>
            <li>000<br />Pokemon</li>
            <li>000<br />Pokemon</li>
            <li>000<br />Pokemon</li>
          </ul>
          <div class="section arrow" id="list__down">
            <img src="./img/arr.png" alt="up arrow" />
          </div>
        </div>
        <div class="scroll section">
          <div id="scroll__pointer" class="section"></div>
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

  document.querySelector('#pokedex').innerHTML = pokedexTemplate();

  document.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowUp':
        changeListCursor(-1);
        break;
      case 'ArrowDown':
        changeListCursor(1);
        break;
      default:
        return;
    }
  });
};
