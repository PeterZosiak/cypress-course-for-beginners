 export default new class NavigationComponent {
  homeLink = () => cy.get('[id=data-testid="menu-home"]').find('a');
  registrationLink = () => cy.get('[id=data-testid="menu-registration"]').find('a');
  aboutUsLink = () => cy.get('[id=data-testid="menu-about"]').find('a');
  contactLink = () => cy.get('[id=data-testid="menu-contact"]').find('a');

  navigateToPage (page: NavigationLinks) {
    switch (page) {
      case NavigationLinks.HOME:
        this.homeLink().click();
        break;
      case NavigationLinks.REGISTRATION:
        this.registrationLink().click();
        break;
      case NavigationLinks.ABOUTUS:
        this.aboutUsLink().click();
        break;
      case NavigationLinks.CONTACT:
        this.contactLink().click();
        break;

      default:
        throw new Error(`Page ${page} is not implemented in navigation component`);
    }
  }
}

export enum NavigationLinks {
  HOME,
  REGISTRATION,
  ABOUTUS,
  CONTACT
}

