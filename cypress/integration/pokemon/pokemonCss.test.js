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

  context('In desktop view', () => {
    it('should show the control tutorial', () => {
      cy.get('[data-cy=tutorial]').should('be.visible');
    });
    it('should not show the mobile control', () => {
      cy.get('[data-cy=mobile_control]').should('not.be.visible');
    });
  });

  context('In mobile mode', () => {
    beforeEach(() => {
      cy.viewport('ipad-2');
    });
    it('should not show the control tutorial', () => {
      cy.get('[data-cy=tutorial]').should('not.be.visible');
    });
    it('should show the mobile control', () => {
      cy.get('[data-cy=mobile_control]').should('be.visible');
    });
    it('should not show the cursor', () => {
      cy.get('.cursor').should('not.be.visible');
    });
  });
});
