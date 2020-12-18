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
  it('should start at the first pokemon');
  it('should remove the up arrow when the cursor is on the first pokemon');
  it(
    'should stop to decrement if the first pokemon is listed when the up key is pressed'
  );
  it('should increment when the cursor is a the top limite of the the list');
  it('should decrement when the cursor is a the bottom limite of the the list');
  it('should increment by 5 if the right key is push');
  it(
    'should stop at he first pokemon if the number of the pokemon is lower than 6'
  );
  it('should decrement by 5 if the left key is push');
  it(
    'should stop at he first pokemon if the number of the pokemon is higher than 246'
  );
  it(
    'should stop to increment if the last pokemon is listed when the down key is pressed'
  );
  it('should remove the down arrow when the cursor is on the last pokemon');
});
