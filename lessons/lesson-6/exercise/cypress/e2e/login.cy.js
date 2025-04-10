describe('Login form tests', () => {
  it('Should open Login page and validate html objects on page', () => {
    cy.visit('http://127.0.0.1:5500/lessons/lesson-6/exercise/login.html');
    
    cy.url().should('eq', 'http://127.0.0.1:5500/lessons/lesson-6/exercise/login.html');
  });
});