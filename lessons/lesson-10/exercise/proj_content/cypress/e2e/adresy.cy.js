/// <reference types="cypress" />
import adresy from '../fixtures/adresy.json'

describe('Search addresses tests', () => {
  
  adresy.forEach((adresa) => {
    it(`Should search address "${adresa.adresa}" and validate ruian code ${adresa.ruian} -smoke`, () => {
      // Arrange
      //cy.visit('http://127.0.0.1:5500/lessons/lesson-10/exercise/index.html');
      cy.visit('http://127.0.0.1:5500/cypress-course-for-beginners-1/lessons/lesson-10/exercise/index.html');
      
      // Act
      cy.get('input[data-testid="search-input"]').clear().type(adresa.adresa);
    });
  });
});
