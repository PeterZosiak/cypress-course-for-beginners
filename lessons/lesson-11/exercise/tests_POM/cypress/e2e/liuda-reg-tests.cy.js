import registrationPage from "../pages/registrationPage";
import menuComponent from "../pages/components/menuComponent";

describe('Ine registracne testy', () => {
  it('toto je test', () => {
    cy.fixture('url.json').then((url) => {
      cy.visit(url.mainUrl);
      //menuComponent.registerButton().click();
      // same work code with navigate:
      menuComponent.navigate('register')
      registrationPage.register('testuser','user@email.com','Userpasswrod13!')
    });
  });
});