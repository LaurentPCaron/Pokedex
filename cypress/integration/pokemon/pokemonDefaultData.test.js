/// <reference types="cypress" />

const missingno = {
  id: '000',
  id: 'MISSINGNO',
  category: '???',
  type: 'BIRD/NORM',
  height: "10'0''",
  weight: '3507.2',
  description1: "This POKéMON doesn't existed, something wrong happened.",
  description2: 'The number of the pokemon is not valide. HELP!',
  imageURL:
    'https://tcrf.net/images/archive/1/18/20160605004755%21Pokemon_RGB-MissingNo.png',
};

context('If invalide data or no data was sent to the api', () => {
  before(() => {
    cy.visit('../../../src/pokemon/pokemon.html');
  });

  it('should have his number of MissingNO', () => {
    cy.get('[data-cy=number]').contains(`No. ${missingno.id}`);
  });

  it('should have a image of MissingNO', () => {
    cy.get('[data-cy=img_pokemon]').should(
      'have.css',
      'background-image',
      `url("${missingno.imageURL}")`
    );
  });

  it('should have the name of MissingNO', () => {
    cy.get('[data-cy=name]').contains(missingno.id);
  });

  it('should have a category of MissingNO', () => {
    cy.get('[data-cy=category]').contains(missingno.category);
  });

  it('should have the types of MissingNO', () => {
    cy.get('[data-cy=type]').contains(missingno.type);
  });

  it('should have the heigth of MissingNO', () => {
    cy.get('[data-cy=height]').contains(`HT ${missingno.height}`);
  });

  it('should have the weight of MissingNO', () => {
    cy.get('[data-cy=weight]').contains(`WT ${missingno.weight}lb`);
  });

  it('should have page indicator', () => {
    cy.get('[data-cy=page_number]').contains('P.1');
  });

  it('should gave a description of MissingNO', () => {
    cy.get('[data-cy=description]').contains(
      "This POKéMON doesn't existed, something wrong happened."
    );
  });
});
