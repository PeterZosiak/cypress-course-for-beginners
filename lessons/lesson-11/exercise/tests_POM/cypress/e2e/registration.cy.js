import registrationPage from "../pages/registrationPage"

describe('registr test', () => {
  beforeEach(() => {
    //arrange
    cy.fixture('url.json').then((urls) => {
      cy.visit(`${urls.mainUrl}/register`)
      //cy.visit('http://localhost:3000/register')
    })
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
    
    it('Should username - empty and get error', () => {
      registrationPage.usernameInput().click().blur()
      registrationPage.errorMessageInputUsName().should('be.visible').and('contain', 'Username is required')
    })

    it('Should enter invalid email - without "@" and "." and get error', () => {
      // Act
      registrationPage.insertEmail('invalidEmail').blur()
      //cy.get('body').click() instead blur()
      // Assert
      registrationPage.errorMessageEmail().should('be.visible').and('contain', 'Invalid email format')
    })

    it('Should enter invalid email - without "." and get error', () => {
      // Act
      registrationPage.insertEmail('12@qw').blur()
      // Assert
      registrationPage.errorMessageEmail().should('be.visible').and('contain', 'Invalid email format')
    })

    it('Should enter invalid email - without "@" and get error', () => {
      // Act
      registrationPage.insertEmail('12qw.cz').blur()
      // Assert
      registrationPage.errorMessageEmail().should('be.visible').and('contain', 'Invalid email format')
    })

    it('Should enter invalid email - with "/" without "@" and get error', () => {
      // Act
      registrationPage.insertEmail('12qw.cz/').blur()
      // Assert
      registrationPage.errorMessageEmail().should('be.visible').and('contain', 'Invalid email format')
    })

    it('Should enter invalid email - with "!" without "@" and get error', () => {
      // Act
      registrationPage.insertEmail('!12qw.cz').blur()
      // Assert
      registrationPage.errorMessageEmail().should('be.visible').and('contain', 'Invalid email format')
    })

    /*it('Should enter invalid email - with "!" and get error', () => {
      // Act
      registrationPage.insertEmail('12@qw.cz!').blur()
      // Assert
      registrationPage.errorMessageEmail().should('be.visible').and('contain', 'Invalid email format')
    })*/

    it('Should enter invalid password and get error - 1 sign', () => {
        registrationPage.register('testuser', 'email@email.com', '1')
        registrationPage.errorMessagePassword().should('be.visible').and('contain', 'Password must be at least 6 characters long')
    })

    it('Should enter invalid password and get error - 2 sign', () => {
      registrationPage.register('testuser', 'email@email.com', '12')
      registrationPage.errorMessagePassword().should('be.visible').and('contain', 'Password must be at least 6 characters long')
    })

    it('Should enter invalid password and get error - 3 sign', () => {
      registrationPage.register('testuser', 'email@email.com', '123')
      registrationPage.errorMessagePassword().should('be.visible').and('contain', 'Password must be at least 6 characters long')
    })

    it('Should enter invalid password and get error - 4 sign', () => {
      registrationPage.register('testuser', 'email@email.com', '1234')
      registrationPage.errorMessagePassword().should('be.visible').and('contain', 'Password must be at least 6 characters long')
    })

    it('Should enter invalid password and get error - 5 sign', () => {
      registrationPage.register('testuser', 'email@email.com', '12345')
      registrationPage.errorMessagePassword().should('be.visible').and('contain', 'Password must be at least 6 characters long')
    })

    it('Should enter invalid password and get error - 6 sign', () => {
      registrationPage.register('testuser', 'email@email.com', '123456')
      registrationPage.errorMessagePassword().should('be.visible').and('contain', 'Password must contain at least one special character')
    })

    it('Should enter valid registration details, click Register and see Dashboard page', () => {
      registrationPage.register('testuser', 'email@email.com', 'Password123!')
      cy.contains('Welcome to Your Account').should('be.visible')
    })
   
  });

