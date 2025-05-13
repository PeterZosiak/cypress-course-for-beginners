describe('template spec', () => {
  //arrange
  it('enter invalid username detail', () => {
      cy.fixture('environ.json').then((url) => {
      cy.visit(url.url2)
    //act
      cy.fixture('user.json').then((user) => {
      cy.get('input[data-testid="login-username-input"]').type(user.invalidusername)
      cy.get('input[data-testid="login-password-input"]').type(user.invalidpassword)
      cy.get('[data-testid="login-submit-button"]').click()
    //assert
      cy.get('[data-testid="login-success-message"]').should('not.be.visible')
      cy.get('[data-testid="login-error-message"]').should('be.visible')
      })
    }) 
  })

  it('enter valid username detail', () => {
      cy.fixture('environ.json').then((url) => {
      cy.visit(url.url2)
    //act
      cy.fixture('user.json').then((user) => {
      cy.get('input[data-testid="login-username-input"]').clear().type(user.username)
      cy.get('input[data-testid="login-password-input"]').clear().type(user.password)
      cy.get('[data-testid="login-submit-button"]').click()
    //assert
      cy.get('[data-testid="login-success-message"]').should('be.visible')
      })
    }) 
  })



})
