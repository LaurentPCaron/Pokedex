/// <reference types="cypress" />
context('When the pokedex call the API', () => {
  beforeEach(() => {
    cy.visit('../../../src/main.html');
  });
  it('should list the name of the pokemon', () => {
    cy.get('[data-cy=pokemon_1]').contains(/^001*BULBASAUR$/);
    for (let i = 0; i <= 35; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=pokemon_251]').contains(/^251*CELEBI$/);
  });
  it('should show the pokemon image when the cursor is on it', () => {
    cy.get('[data-cy=image]')
      .should('have.attr', 'src')
      .should('match', /1\.png$/);
    for (let i = 0; i <= 35; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=image]')
      .should('have.attr', 'src')
      .should('match', /251\.png$/);
  });
});
