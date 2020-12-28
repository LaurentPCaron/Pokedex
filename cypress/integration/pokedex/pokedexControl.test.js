/// <reference types="cypress" />

context('The list cursor', () => {
  beforeEach(() => {
    cy.visit('../../../src/main.html');
  });

  it('should be on the the first item by default', () => {
    cy.get('[data-cy=list_cursor]')
      .should('have.css', 'top')
      .and('match', /^0px$/);
  });

  it('should stop at the first item', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.get('[data-cy=list_cursor]')
      .should('have.css', 'top')
      .and('match', /^0px$/);
  });

  it('should change postion when down key is pressed', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('[data-cy=list_cursor]')
      .should('have.css', 'top')
      .and('match', /^(58).*px$/);
  });

  it('should be able to go back up', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('[data-cy=list_cursor]')
      .should('have.css', 'top')
      .and('match', /^(58).*px$/);
    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.get('[data-cy=list_cursor]')
      .should('have.css', 'top')
      .and('match', /^0px$/);
  });

  it('should stop at the last items', () => {
    for (let i = 0; i <= 7; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    }
    cy.get('[data-cy=list_cursor]')
      .should('have.css', 'top')
      .and('match', /^(350).*px$/);
  });
});

context('The pokemon listed', () => {
  beforeEach(() => {
    cy.visit('../../../src/main.html');
  });

  it('should start at the first pokemon', () => {
    cy.get('[data-cy=pokemon_1]').contains(/^001/);
    cy.get('[data-cy=pokemon_8]').should('not.exist');
  });

  it('should remove the up arrow only when the cursor is on the first pokemon', () => {
    cy.get('[data-cy=list-up-arrow]').should('not.be.visible');
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('[data-cy=list-up-arrow]').should('be.visible');
    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.get('[data-cy=list-up-arrow]').should('not.be.visible');
  });

  it('should increment when the cursor is a the top bottom of the the sub-list and down key is pressed', () => {
    for (let i = 1; i <= 7; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    }
    cy.get('[data-cy=pokemon_1]').should('not.exist');
    cy.get('[data-cy=pokemon_8]').contains(/^008/);
    cy.get('[data-cy=pokemon_9]').should('not.exist');
  });

  it('should decrement when the cursor is a the top up of the the sub-list and up key is pressed', () => {
    for (let i = 1; i <= 8; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    }
    for (let i = 1; i <= 7; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    }
    cy.get('[data-cy=pokemon_1]').should('not.exist');
    cy.get('[data-cy=pokemon_2]').contains(/^002/);
    cy.get('[data-cy=pokemon_9]').should('not.exist');
  });

  it('should increment by 7 if the right key is push', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    cy.get('[data-cy=pokemon_7]').should('not.exist');
    cy.get('[data-cy=pokemon_8]').contains(/^008/);
    cy.get('[data-cy=pokemon_15]').should('not.exist');
  });

  it('should decrement by 7 if the left key is push', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    cy.get('body').trigger('keydown', { key: 'ArrowLeft' });
    cy.get('[data-cy=pokemon_1]').contains(/^001/);
    cy.get('[data-cy=pokemon_8]').should('not.exist');
  });

  it('should stop at the last pokemon', () => {
    for (let i = 0; i < 36; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=pokemon_244]').should('not.exist');
    cy.get('[data-cy=pokemon_251]').contains(/^251/);
  });

  it('should stop at the first pokemon', () => {
    for (let i = 1; i <= 8; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    for (let i = 1; i <= 8; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowLeft' });
    }
    cy.get('[data-cy=pokemon_8]').should('not.exist');
    cy.get('[data-cy=pokemon_1]').contains(/^001/);
  });

  it('should remove the down arrow when the cursor is on the last pokemon', () => {
    for (let i = 0; i < 36; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=list-down-arrow]').should('not.be.visible');
    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.get('[data-cy=list-down-arrow]').should('be.visible');
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('[data-cy=list-down-arrow]').should('not.be.visible');
  });
});

context('The scroll bar pointer', () => {
  beforeEach(() => {
    cy.visit('../../../src/main.html');
  });

  it('should not go higher than the top limit of the scroll bar', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.get('[data-cy=scroll__pointer]').should(
      'have.attr',
      'style',
      '--scroler-pointer:0%;'
    );
  });
  it('should be at the top when the first pokemon is selected', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.get('[data-cy=scroll__pointer]').should(
      'have.attr',
      'style',
      '--scroler-pointer:0%;'
    );
  });
  it('should be at 50% (#127) when the middle pokemon is selected', () => {
    for (let i = 0; i < 18; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=scroll__pointer]').should(
      'have.attr',
      'style',
      '--scroler-pointer:48.888%;'
    );
  });
  it('should be a the end when the last pokemon is selected', () => {
    for (let i = 0; i < 36; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=scroll__pointer]').should(
      'have.attr',
      'style',
      '--scroler-pointer:97%;'
    );
  });
  it('should not go lower than the top limit of the scroll bar', () => {
    for (let i = 0; i < 36; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('[data-cy=scroll__pointer]').should(
      'have.attr',
      'style',
      '--scroler-pointer:97%;'
    );
  });
});

context('By pressing the Enter key', () => {
  beforeEach(() => {
    cy.visit('../../../src/main.html');
  });

  it('should switch to the pokemon page of the pokemon selected', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('body').trigger('keydown', { key: 'Enter' });
    cy.url().should('include', '#p2');
  });
  it('should go back on the good pokemon wehn you go back', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('body').trigger('keydown', { key: 'Enter' });
    cy.get('body').trigger('keydown', { key: 'ArrowLeft' });
    cy.get('body').trigger('keydown', { key: 'Enter' });
    cy.get('[data-cy=pokemon_1]').should('not.exist');
    cy.get('[data-cy=pokemon_2]').contains(/^002/);
    cy.get('[data-cy=pokemon_9]').should('not.exist');
  });
  it('should have the cursor on the good pokemon if the pokemon index is bigger than maxIndex -5', () => {
    for (let i = 0; i < 35; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('body').trigger('keydown', { key: 'Enter' });
    cy.get('body').trigger('keydown', { key: 'ArrowLeft' });
    cy.get('body').trigger('keydown', { key: 'Enter' });
    cy.get('[data-cy=list_cursor]')
      .should('have.css', 'top')
      .and('match', /^(58).*px$/);
    cy.get('[data-cy=pokemon_244]').should('not.exist');
    cy.get('[data-cy=pokemon_246]').contains(/^246/);
  });
});
