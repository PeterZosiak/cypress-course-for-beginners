describe('template spec', () => {
  it('passes', () => {

    
// act
  cy.fixture('user.json').then((user) => {
    cy.get('input[data-testid="login-username-input"]').type(user.username)
    cy.get('input[data-testid="login-password-input"]').type(user.password)
  })
  cy.get('[data-testid="login-submit-button"]').click()

//assert
    cy.get('[data-testid="login-success-message"]').should('be.visible')
  })


})