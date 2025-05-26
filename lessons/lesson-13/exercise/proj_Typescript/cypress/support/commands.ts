// declare namespace Cypress { //old way
declare global {
  namespace Cypress {
    interface Chainable {
      //login(username: string, password: string): Chainable<Element>; //old way
      login(username: string, password: string): Chainable<JQuery<HTMLElement>>;
      myCommand(parameter: string): void;
    }
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-testid="login-username-input"]').clear().type(username);
  cy.get('[data-testid="login-password-input"]').clear().type(password);
  return cy.get('[data-testid="login-submit-button"]').click();
});

Cypress.Commands.add('myCommand', (itmyparameter: string) => {
  cy.log(`Parameter: ${itmyparameter}`);
});

// cypress/support/index.ts
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       /**
//        * Custom command to select DOM element by data-cy attribute.
//        * @example cy.dataCy('greeting')
//        */
//       dataCy(value: string): Chainable<JQuery<HTMLElement>>
//     }
//   }
// }
export {}

