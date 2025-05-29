/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('login', (email, password) => { // custom command
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/login',
      body: {
        "name": "admin",
        "password": "pass"
      }
    }).then((loginOdpoved) => {
      cy.log(JSON.stringify(loginOdpoved))
      expect(loginOdpoved.status).to.be.equal(200)
      //expect(loginOdpoved.body).to.have.property('token')
      Cypress.env('moj-token', loginOdpoved.body.token)
    })


 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
export {}
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}