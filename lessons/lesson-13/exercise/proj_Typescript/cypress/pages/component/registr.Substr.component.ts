 export default new class RegistrationSubstrComponent {
  radioMonthly = () => cy.get('input[data-testid="reg-subscription-monthly"]');
  radioYearly = () => cy.get('input[data-testid="reg-subscription-yearly"]');

  navigateToSubscr (subscr: NavigationSubscription) {
    switch (subscr) {
      case NavigationSubscription.Monthly:
        this.radioMonthly().click();
        break;
      case NavigationSubscription.Yearly:
        this.radioYearly().click();
        break;
        
      default:
        throw new Error(`Subscription ${subscr} is not implemented in navigation component`);
    }
  }
}

export enum NavigationSubscription {
  Monthly,
  Yearly
}