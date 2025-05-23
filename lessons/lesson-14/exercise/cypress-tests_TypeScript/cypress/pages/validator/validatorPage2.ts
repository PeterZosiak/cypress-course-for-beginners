export default new class validateValuePage {
    validateEnterButton = () => cy.get('[data-testid="nav-validate-button"]')
    validateValueInput1 = () => cy.get('input[data-testid="validate-input-1"]')
    validateValueInput2 = () => cy.get('input[data-testid="validate-input-2"]')
    validateValueInput3 = () => cy.get('input[data-testid="validate-input-3"]')
    validateValueButton = () => cy.get('button[data-testid="verify-button"]')
    verifiedText = () => cy.get('p[data-testid="verified-text"]')

    validateValue(valueNew: string) {
    this.validateEnterButton().click()
    this.validateValueInput1().type(valueNew, { force: true })
    this.validateValueInput2().type(valueNew, { force: true })
    this.validateValueInput3().type(valueNew, { force: true })
    this.validateValueButton().click()
    this.verifiedText().should('contain.text', 'Input cannot be empty for verification.')
  }
}