describe('template spec', () => {

  it('toto je faky test ktory obcas padne', {
    retries: {
      runMode: 1
    }
  }, () => {

    cy.visit('https://example.cypress.io');

    // Отримання значення з env і логування
    const apiUrl = Cypress.env('apiUrl');
    cy.log(apiUrl);

    const password = Cypress.env('PASS00');
    cy.log(password);

    // Встановлення нового значення в env і логування його
    Cypress.env('apiCode', '654321');
    cy.log(Cypress.env('apiCode'));
  });
});