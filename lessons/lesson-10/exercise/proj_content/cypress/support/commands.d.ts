declare namespace Cypress {
    interface Chainable {
      /**
       * Custom command to login by filling the form
       * @example cy.login('user', 'pass')
       */
      login(username: string, password: string): Chainable<void>;
    }
  }