//npm install --save-dev @faker-js/faker

import { faker } from '@faker-js/faker';

describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5500/lessons/lesson-9/exercise2/registration.html')
  // act
  cy.fixture('user.json').then((user) => {
      cy.get('input[data-testid="reg-username-input"]').type(user.username)
      cy.get('input[data-testid="login-password-input"]').type(user.password)
      cy.get('[data-testid="login-submit-button"]').click()
  
      cy.get('[data-testid="login-success-message"]').should('be.visible')
      })
    })
  })