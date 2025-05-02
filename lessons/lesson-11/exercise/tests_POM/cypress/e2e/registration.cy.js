import registrationPage from "../pages/registrationPage"

describe('registr test', () => {
  beforeEach(() => {
    //arrange
    cy.visit('http://localhost:3000/register')
  })

  it('should open registr. page', () => {
    //act

    //assert
    registrationPage.headingH1().should('be.visible')
    registrationPage.usernameInput().should('be.visible')
    registrationPage.emailInput().should('be.visible')
    registrationPage.passwordInput().should('be.visible') 
    registrationPage.registerButton().should('be.visible')
    //})
  })
    it('Should enter invalid registration details', () => {
      // Act
      registrationPage.insertEmail('invalidEmail')

      // Assert
      registrationPage.errorMessage().should('be.visible').and('contain', 'Invalid email format')
    })

    it('Should enter valid registration details, click Register and see Dashboard page', () => {
      // Act
      registrationPage.register('testuser', 'email@email.com', 'Password123!')

      // Assert
      cy.contains('Welcome to Your Account').should('be.visible')

    })
   
  });

