/// <reference types="cypress" />

const bulbasaur = {
  id: '001',
  name: 'BULBASAUR',
  category: 'SEED',
  type: 'GRAS/POIS',
  height: "2'04''",
  weight: '15.2',
  description: {
    1: 'While it is young, it uses the nutrients that are',
    2: 'stored in the seeds on its back in order to grow.',
  },
  imageURL:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/1.png',
};

context('Controling the cursor', () => {
  beforeEach(() => {
    cy.visit('../../../src/pokemon/pokemon.html?id=001');
  });

  it('should be on "Page" by default', () => {
    cy.get('[data-cy=btn_page] i').should('be.visible');
    cy.get('[data-cy=btn_cry] i').should('not.be.visible');
    cy.get('[data-cy=btn_print] i').should('not.be.visible');
    cy.get('[data-cy=btn_back] i').should('not.be.visible');
  });

  it('should be on "Cry" if the right key is pressed 1 time', () => {
    cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    cy.get('[data-cy=btn_page] i').should('not.be.visible');
    cy.get('[data-cy=btn_cry] i').should('be.visible');
    cy.get('[data-cy=btn_print] i').should('not.be.visible');
    cy.get('[data-cy=btn_back] i').should('not.be.visible');
  });

  it('should be on "Print" if the right key is pressed 2 time', () => {
    for (let i = 0; i < 2; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=btn_page] i').should('not.be.visible');
    cy.get('[data-cy=btn_cry] i').should('not.be.visible');
    cy.get('[data-cy=btn_print] i').should('be.visible');
    cy.get('[data-cy=btn_back] i').should('not.be.visible');
  });

  it('should be on "Back" if the right key is pressed 3 time', () => {
    for (let i = 0; i < 3; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=btn_page] i').should('not.be.visible');
    cy.get('[data-cy=btn_cry] i').should('not.be.visible');
    cy.get('[data-cy=btn_print] i').should('not.be.visible');
    cy.get('[data-cy=btn_back] i').should('be.visible');
  });

  it('should be on "Page" if the right key is pressed 4 time', () => {
    for (let i = 0; i < 4; i++) {
      n;
      cy.get('body').trigger('keydown', { key: 'ArrowRight' });
    }
    cy.get('[data-cy=btn_page] i').should('be.visible');
    cy.get('[data-cy=btn_cry] i').should('not.be.visible');
    cy.get('[data-cy=btn_print] i').should('not.be.visible');
    cy.get('[data-cy=btn_back] i').should('not.be.visible');
  });

  it('should be on "Back" if the left key is pressed 1 time', () => {
    for (let i = 0; i < 1; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowLeft' });
    }
    cy.get('[data-cy=btn_page] i').should('not.be.visible');
    cy.get('[data-cy=btn_cry] i').should('not.be.visible');
    cy.get('[data-cy=btn_print] i').should('not.be.visible');
    cy.get('[data-cy=btn_back] i').should('be.visible');
  });

  it('should be on "Print" if the left key is pressed 1 time', () => {
    for (let i = 0; i < 2; i++) {
      cy.get('body').trigger('keydown', { key: 'ArrowLeft' });
    }
    cy.get('[data-cy=btn_page] i').should('not.be.visible');
    cy.get('[data-cy=btn_cry] i').should('not.be.visible');
    cy.get('[data-cy=btn_print] i').should('be.visible');
    cy.get('[data-cy=btn_back] i').should('not.be.visible');
  });
});

context('Pressing on "Page"', () => {
  beforeEach(() => {
    cy.visit('../../../src/pokemon/pokemon.html?id=001');
  });
  it('should change the page to the seconde page with the "Enter" key', () => {
    cy.get('body').trigger('keydown', { key: 'Enter' });
    cy.get('[data-cy=page_number]').should('have.text', 'P.2');
    cy.get('[data-cy=description]').should(
      'have.text',
      bulbasaur.description[2]
    );
  });
  it('should change the page to the seconde page with the "A" key', () => {
    cy.get('body').trigger('keydown', { key: 'KeyA' });
    cy.get('[data-cy=page_number]').should('have.text', 'P.2');
    cy.get('[data-cy=description]').should(
      'have.text',
      bulbasaur.description[2]
    );
  });
});
