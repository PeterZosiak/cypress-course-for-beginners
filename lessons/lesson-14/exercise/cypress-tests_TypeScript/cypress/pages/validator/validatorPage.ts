export default new class validateValuePage {
    validateEnterButton = () => cy.get('[data-testid="nav-validate-button"]')
    validateValueInput = () => cy.get('input[data-testid="validate-input"]')
    validateValueButton = () => cy.get('button[data-testid="verify-button"]')
    verifiedText = () => cy.get('p[data-testid="verified-text"]')

    validateValue(value: string) {
    this.validateEnterButton().click()
    this.validateValueInput().type(value, { force: true })
    this.validateValueButton().click()
    
  }
}