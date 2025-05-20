describe('template spec', () => {

  it('toto je faky test ktory obcas padne', {
    retries: {
      runMode: 4
    }
  }, () => {

    cy.visit('https://example.cypress.io');

    
    const apiUrl = Cypress.env('apiUrl');
    cy.log(apiUrl); // Отримання значення з файлу cypress.config.js (env) і покаже в логах

    const password = Cypress.env('PASS00');
    cy.log(password);

    // Встановлення нового значення в env і логування його
    Cypress.env('apiCode', '654321');
    cy.log(Cypress.env('apiCode'));

    const userName = Cypress.env('testUser')
    cy.log(userName)
    
  });
});