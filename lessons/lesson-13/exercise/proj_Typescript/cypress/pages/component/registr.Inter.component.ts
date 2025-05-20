 export default new class RegistrationInterComponent {
  checkTechnology = () => cy.get('input[data-testid="reg-interest-tech"]');
  checkDesign = () => cy.get('input[data-testid="reg-interest-design"]');
  checkMusic = () => cy.get('input[data-testid="reg-interest-music"]');


  navigateToInter (inter: NavigationInterest) {
    switch (inter) {
      case NavigationInterest.Technology:
        this.checkTechnology().click();
        break;
      case NavigationInterest.Design:
        this.checkDesign().click();
        break;
      case NavigationInterest.Music:
        this.checkMusic().click();
        break;

      default:
        throw new Error(`Interest ${inter} is not implemented in navigation component`);
    }
  }
}

export enum NavigationInterest {
  Technology,
  Design,
  Music
}
