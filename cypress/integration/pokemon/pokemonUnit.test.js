/// <reference types="cypress" />

const missingno = {
  id: '000',
};

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

context('For invalid value as pokemon id', () => {
  context('Without id value', () => {
    it('Should show MISSINGNO', () => {
      cy.visit('../../../src/pokemon/pokemon.html');
      cy.get('[data-cy=number]').should('have.text', `No.${missingno.id}`);
    });
  });

  context('If the value is less than 1', () => {
    it('Should show MISSINGNO', () => {
      cy.visit('../../../src/pokemon/pokemon.html?id=-1');
      cy.get('[data-cy=number]').should('have.text', `No.${missingno.id}`);
    });
  });

  context('If the value is bigger than 251', () => {
    it('Should show MISSINGNO', () => {
      cy.get('[data-cy=number]').should('have.text', `No.${missingno.id}`);
      cy.visit('../../../src/pokemon/pokemon.html?id=252');
    });
  });

  context('If the id value is not a number', () => {
    it('Should show MISSINGNO', () => {
      cy.visit('../../../src/pokemon/pokemon.html?id=a');
      cy.get('[data-cy=number]').should('have.text', `No.${missingno.id}`);
    });
  });
});

context('If the value of the pokemon is 001', () => {
  before(() => {
    cy.visit('../../../src/pokemon/pokemon.html?id=001');
  });

  it('should show the number as 001', () => {
    cy.get('[data-cy=number]').should('have.text', `No.${bulbasaur.id}`);
  });

  it('should have a image of Bulbasaur', () => {
    cy.get('[data-cy=img_pokemon]').should(
      'have.css',
      'background-image',
      `url("${bulbasaur.imageURL}")`
    );
  });

  it('should have the name BULBASAUR', () => {
    cy.get('[data-cy=name]').should('have.text', bulbasaur.name);
  });

  it('should have the category as SEED', () => {
    cy.get('[data-cy=category]').should('have.text', bulbasaur.category);
  });

  it('should have the type as GRAS/POIS', () => {
    cy.get('[data-cy=type]').should('have.text', bulbasaur.type);
  });

  it("should have the height as HT 2'04''", () => {
    cy.get('[data-cy=height]').should('have.text', `HT ${bulbasaur.height}`);
  });

  it('should have the weight of WT 15.2lb', () => {
    cy.get('[data-cy=weight]').should('have.text', `WT ${bulbasaur.weight}lb`);
  });

  it('should have first page of the description of Bubalsaur', () => {
    cy.get('[data-cy=description]').should(
      'have.text',
      bulbasaur.description[1]
    );
  });
});
