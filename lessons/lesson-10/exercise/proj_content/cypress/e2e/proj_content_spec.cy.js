/// <reference types="cypress" />
describe('login tests', () => {
      // Run once before all tests
      before(() => {
        cy.log('This is the before hook that runs before all tests');
      });

      // Run before each test
      beforeEach(() => {
        //cy.visit('http://127.0.0.1:5500/lessons/lesson-10/exercise/login.html');
        cy.visit('http://127.0.0.1:5500/cypress-course-for-beginners-1/lessons/lesson-10/exercise/login.html');
        
      });

      // Run once after all tests
      after(() => {
        cy.log('This is the after hook that runs after all tests');
      });

      // Run after each test
      afterEach(() => {
        cy.log('This is the afterEach hook that runs after each test');
      });


  it('1 - should insert invalid user details', () => {
    //cy.visit('http://127.0.0.1:5500/lessons/lesson-10/exercise/login.html')
    cy.visit('http://127.0.0.1:5500/cypress-course-for-beginners-1/lessons/lesson-10/exercise/login.html');

    cy.fixture('login.json').then((logins) => {
      cy.get('input[data-testid="username-input"]').clear().type(logins.invalidUser)
      cy.get('input[id="password"]').clear().type(logins.invalidPass)
      cy.get('[data-testid="login-button"]').click()

      cy.get('[data-testid="error-message"]').should('be.visible')
    });
   })

    it('2 - should insert valid user details', () => {
      //cy.visit('http://127.0.0.1:5500/lessons/lesson-10/exercise/login.html')
      cy.visit('http://127.0.0.1:5500/cypress-course-for-beginners-1/lessons/lesson-10/exercise/login.html');
      cy.fixture('login.json').then((logins) => {
        cy.get('input[data-testid="username-input"]').clear().type(logins.validUser)
        cy.get('input[id="password"]').clear().type(logins.validPass)
        cy.get('[data-testid="login-button"]').click()
  
        cy.get('[data-testid="success-message"]').should('be.visible')
        cy.url().should('contain','dashboard.html')
      });
   

  })
})