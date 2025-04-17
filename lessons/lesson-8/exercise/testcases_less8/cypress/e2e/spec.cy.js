/// <reference types="cypress" />
/*
1. Overit existenciu vsetkych html elementov
2. Overit existeciu a obsah error message po zadani nespravnych udajov
3. Overit funkcnost tlacitka Vymazat ze inputy neobsahuju ziadnu hodnotu
4. Uspesne sa prihlasit a overit success message a presmerovanie na Dashboard page*/

describe('template spec', () => {
  it('passes', () => {
  cy.visit('http://127.0.0.1:5500/lessons/lesson-8/exercise/login.html')
  //enter username
  cy.get('[data-testid="username-input"]').should('be.visible').and('exist').and('have.value', '').and('have.attr','placeholder', 'Zadajte používateľské meno');

  cy.get('button[data-testid="login-button"]').should('be.enabled').and('have.text', 'Prihlásiť')

  cy.get('button[data-testid="login-button"]').parent().should('have.class', 'button-group')
  cy.get('input[data-testid="username-input"]').type('ussser')
  cy.get('div[data-testid="password-group"]').find('input').type('passs')
  cy.get('div[data-testid="error-message"]').should('not.be.visible').and('have.class', 'error')

  //cy.get('[data-testid="username-input"]').type("user");

  //cy.get('[data-testid="password-input"]').type("pass");
  //cy.get('[data-testid="login-button"]').


  })
})