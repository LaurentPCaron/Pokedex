/// <reference types="cypress" />

context('On the pokemon info page', () => {
  before(() => {
    cy.visit('../../../src/pokemon/pokemon.html');
  });
  it('should have a image of Lanturn', () => {
    cy.get('[data-cy=img_pokemon]').should(
      'have.css',
      'background-image',
      'url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/171.png")'
    );
  });

  context('In the description part', () => {
    it('should have the name of Lanturn', () => {
      cy.get('[data-cy=name]').contains('LANTURN');
    });
    it('should have a category', () => {
      cy.get('[data-cy=category]').contains('LIGHT');
    });
    it('should have the types', () => {
      cy.get('[data-cy=type]').contains('WATE/ELEC');
    });
    it('should have the heigth', () => {
      cy.get('[data-cy=height]').contains("HT 3'11''");
    });
    it('should have the weight', () => {
      cy.get('[data-cy=weight]').contains('WT 49.6lb');
    });
    it('should have his number', () => {
      cy.get('[data-cy=number]').contains('No. 171');
    });
  });

  it('should have page indicator', () => {
    cy.get('[data-cy=page_number]').contains('P.1');
  });
  it('should gave a description', () => {
    cy.get('[data-cy=description]').contains(
      'This POKéMON uses the bright part of its body, which'
    );
  });
});
