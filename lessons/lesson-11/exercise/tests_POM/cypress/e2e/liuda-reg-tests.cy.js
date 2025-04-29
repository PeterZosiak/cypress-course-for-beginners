import registrationPage from "../pages/registrationPage";
import menuComponent from "../pages/components/menuComponent";

describe('lne registracne testy', () => {
  it('toto je test', () => {
    cy.visit('http://localhost:3000');
    menuComponent.registerButton().click();
    registrationPage.register('testuser','user@email.com','Userpasswrod13!')
  });
});