/// <reference types="cypress" />

describe('Google Search tests', () => {
  it('Sould visit Google and search for Cypress', () => {
   cy.visit('http://127.0.0.1:5500/lessons/lesson-6/exercise/login.html');
   cy.url().should('eq', 'http://127.0.0.1:5500/lessons/lesson-6/exercise/login.html');

   const usernameInput = cy.get('input[data-testid="username-input"]');
   usernameInput.type("user name")
  })
});