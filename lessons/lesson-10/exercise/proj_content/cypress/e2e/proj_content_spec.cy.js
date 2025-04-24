describe('login tests', () => {
  it('should insert invalid user details', () => {
    cy.visit('http://127.0.0.1:5500/lessons/lesson-10/exercise/login.html')

    cy.get('input[data-testid="login-username-input"]').type(user.username)
    cy.get('input[data-testid="login-password-input"]').type(user.password)
    cy.get('[data-testid="login-submit-button"]').click()
  })
})