// Cypress Test
import usersData from '../../fixtures/users.json';

describe('User Registration', () => {
  beforeEach(() => {
    cy.fixture('users').as('usersData');
  });

  it('Registers multiple users from JSON data', function () {
    usersData.forEach(user => {
      cy.visit('https://www.sleepcentrum.cz/vyprodej');
      cy.get('[data-testid="signin"]').click();


      cy.get('[data-testid="searchInput"]').type("vankus");


      cy.get('#email').type(user.email);
      cy.get('#role').select(user.role);
      cy.get('#submit').click();
      cy.contains('Registration Successful!').should('be.visible');
    });
  });


});
