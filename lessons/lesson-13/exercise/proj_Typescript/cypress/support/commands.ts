// cypress/support/commands.ts
declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<Element>;
    myCommand(parametr: string): void
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.get('[data-testid="login-username-input"]').clear().type(username);
  cy.get('[data-testid="login-password-input"]').clear().type(password);
  return cy.get('[data-testid="login-submit-button"]').click();
});

Cypress.Commands.add('myCommand', () => {
    //cy.log('That is my command');
    cy.myCommand("qwerty");
}
   
)