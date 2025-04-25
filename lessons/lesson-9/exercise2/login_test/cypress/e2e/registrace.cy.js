//npm install --save-dev @faker-js/faker
  describe('template spec', () => {
    it('passes', () => {
      cy.fixture('environ.json').then((environs) => {
        cy.visit(environs.url3)
  // act
      cy.fixture('user.json').then((user) => {
      cy.get('input[data-testid="reg-username-input"]').type('testuser')
      cy.get('input[data-testid="reg-email-input"]').type('email@email.com')
      cy.get('input[data-testid="reg-password-input"]').type('password')
      cy.get('[data-testid="reg-submit-button"]').click()
  
      cy.get('[data-testid="reg-success-message"]').should('be.visible')
      })
    })


    })
  })