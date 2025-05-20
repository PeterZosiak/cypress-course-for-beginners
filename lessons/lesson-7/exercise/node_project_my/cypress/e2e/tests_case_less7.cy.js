/// <reference types="cypress" />
/*describe('template spec', () => {
  const url = 'http://127.0.0.1:5500/lessons/lesson-7/exercise/index.html'
  it('passes', () => {
    // Arrange
    cy.visit(url)
    cy.url().should('eq', url)
    Act
    cy.fixture('users.json').then((users) => {
      users.forEach((user) => {
        cy.get('input[data-testid="username-input"]').clear().type(user.name)
        cy.wait(1000)
      })
    })

  })
})
*/


describe('Web Elements', () => {
  it('Actions on Web Elements', () => {
   cy.visit('http://127.0.0.1:5500/lessons/lesson-7/exercise/index.html')

  //enter username
   cy.get('[data-testid="username-input"]').type("userLess7");

   //enter password

   cy.get('[data-testid="password-input"]').type("passLess7");

   //select option from list
   cy.get('select[data-testid="role-select"]').select('Administrátor');
   cy.wait(1000)

   //select option from list (index=0)
   cy.get('select[data-testid="role-select"]').select(0);
   cy.wait(1000)

   //select radiobutton
   cy.get('[data-testid="accept-terms"]').check();
   cy.wait(1000)

   //unselect radiobutton
   cy.get('[data-testid="accept-terms"]').uncheck();

   //select radiobutton
   cy.get('input[data-testid="gender-male"]').check();

   cy.wait(1000)
   cy.contains('label', 'Žena').click();

   cy.get('input[data-testid="file-upload"]').selectFile('cypress/fixtures/example.json')

  })

});
