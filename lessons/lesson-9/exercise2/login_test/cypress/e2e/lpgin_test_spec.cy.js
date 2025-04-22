describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/lessons/lesson-9/exercise2/login.html')
// act
cy.fixture('user.json').then((user) => {
    cy.get('input[data-testid="login-username-input"]').type(user.username)
    cy.get('input[data-testid="login-password-input"]').type(user.password)
    cy.get('[data-testid="login-submit-button"]').click()

    cy.get('[data-testid="login-success-message"]').should('be.visible')
    })
  })
})