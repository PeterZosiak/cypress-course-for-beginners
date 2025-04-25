//npm install --save-dev @faker-js/faker
  describe('template spec', () => {
    it('passes', () => {
      cy.fixture('environ.json').then((environs) => {
        cy.visit(environ.url2)
  // act
      cy.fixture('user.json').then((user) => {
      cy.get('input[data-testid="reg-username-input"]').type(user.username)
      cy.get('input[data-testid="login-password-input"]').type(user.password)
      cy.get('[data-testid="login-submit-button"]').click()
  
      cy.get('[data-testid="login-success-message"]').should('be.visible')
      })
    })


    })
  })