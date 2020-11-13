/// <reference types="cypress" />

context('On the pokemon info page', () => {
  before(() => {
    cy.visit('../../../src/pokemon/pokemon.html');
  });
  it('should have a image', () => {
    cy.get('[data-cy=img_pokemon]').should('exist');
  });

  context('In the description part', () => {
    it('should have the name', () => {
      cy.get('[data-cy=name]').should('exist');
    });
    it('should have a category', () => {
      cy.get('[data-cy=category]').should('exist');
    });
    it('should have the types', () => {
      cy.get('[data-cy=type]').should('exist');
    });
    it('should have the heigth', () => {
      cy.get('[data-cy=height]').should('exist');
    });
    it('should have the weight', () => {
      cy.get('[data-cy=weight]').should('exist');
    });
    it('should have his number', () => {
      cy.get('[data-cy=number]').should('exist');
    });
  });

  it('should have page indicator', () => {
    cy.get('[data-cy=category]').should('exist');
  });

  it('should gave a page section', () => {
    cy.get('[data-cy=description]').should('exist');
  });

  context('In the action menu', () => {
    it('should have a "Page" button', () => {
      cy.get('[data-cy=btn_page]').should('exist');
    });

    it('should have a "Cry" button', () => {
      cy.get('[data-cy=btn_cry]').should('exist');
    });

    it('should have a "Print" button', () => {
      cy.get('[data-cy=btn_print]').should('exist');
    });

    it('should have a "Back" button', () => {
      cy.get('[data-cy=btn_back]').should('exist');
    });
  });
});
