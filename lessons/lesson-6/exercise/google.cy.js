import data from './exercise/cypress/fixtures/example.json';

describe('Google search tests', () => {
  console.log(data);
  it.only('should type text in Google search box and hit Search button', () => {
    cy.visit('https://www.google.com');
    cy.get('textarea').eq(0).type('Cypress').type('{enter}');
  });

  data.forEach((element) => {
    it(`should type ${element} in Google search box and hit Search button`, () => {
      cy.visit('https://www.google.com');
      cy.wait(5000);
      cy.get('textarea').eq(0).type(element).type('{enter}');
    });
  });

  it('should execute empty test for each element in fixture/example.json', () => {
    cy.fixture('example.json').then((data) => {
      data.forEach((element) => {
        cy.visit('https://www.google.com');
        cy.get('textarea').eq(0).type(element).type('{enter}');
      });
    });
  });
});