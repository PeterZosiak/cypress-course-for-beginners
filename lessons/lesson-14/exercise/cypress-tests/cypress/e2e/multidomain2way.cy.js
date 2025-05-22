let generatedRandomValue = ''

describe('Template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
    cy.get('a[data-testid="nav-generate-button"]').click()

    const newGenerateValue = 'sport'

    cy.get('input[data-testid="input1"]').type(newGenerateValue)
    cy.get('button[data-testid="confirm-button"]').click()
    
    cy.get('[data-testid="result-text"]').then((resultElement) => {
      generatedRandomValue = resultElement.text()
      cy.task('setSharedValue', generatedRandomValue)

      cy.writeFile('cypress/fixtures/generateText.txt', generatedRandomValue)
    })

  })
    it('validate', () => {
        cy.visit('http://localhost:8081/validate-data')
        cy.readFile('cypress/fixtures/generateText.txt').then((value) => {
            cy.get('input[data-testid="validate-input"]').type(value, {force: true})
            })
        })
})