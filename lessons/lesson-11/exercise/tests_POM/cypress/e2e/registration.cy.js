import registrationPage from "../pages/registrationPage"

describe('registr test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register')
  })

  it('should open', () => {
    registrationPage.headingH1().should('be.visible')
    registrationPage.usernameInput().should('be.visible')
    registrationPage.emailInput().should('be.visible')
    registrationPage.passwordInput().should('be.visible') 

    //})
  })
  it('Should enter valid registration details, click Register and see Dashboard page', () => {
    // Act
    registrationPage.emailInput().type('user@example.com');
    registrationPage.passwordInput().type('ValidPass123!');
    registrationPage.confirmPasswordInput().type('ValidPass123!');
    registrationPage.registerButton().click();

    // Assert
    cy.contains('Welcome to Your Account').should('be.visible')
   
  });

})