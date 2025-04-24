//npm install cypress @cypress/grep --save-dev
//npx cypress run --env grepTags=SMOKE
//npx cypress run --env grep="smokeTest"

describe('Dashboard tests', () => {

    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/lessons/lesson-10/exercise/login.html');
    });
  
    it('Should validate all HTML elements on Dashboard page - smokeTest', () => {
      // Custom command to log in (make sure it's defined in support/commands.js)
        cy.login('user', 'pass');
        // Check redirect to dashboard
        cy.url().should('include', '/dashboard');


    });

    it('Should search.. ', () => {
        cy.login('user', 'pass')

        // act
          cy.get('input[data-testid="search-input"]').clear().type('Položka Jeden')

        //assert
          cy.get('ul[data-testid="items-list"]').find('li').eq(0).should('contain', 'Položka Jeden')
          
    });
  
  });