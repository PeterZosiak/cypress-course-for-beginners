let generatedRandomValue = ''

describe('Template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/')
    cy.get('a[data-testid="nav-generate-button"]').click()

    const generateValue = 'sport je super'

    cy.get('input[data-testid="input1"]').type(generateValue)
    cy.get('button[data-testid="confirm-button"]').click()
    
    cy.get('[data-testid="result-text"]').then((resultElement) => {
      generatedRandomValue = resultElement.text()
      cy.log('Generated Value:', generatedRandomValue)
      cy.task('setSharedValue', generatedRandomValue)
    })
    // noworking code
    // cy.origin('http://localhost:8081', (generatedRandomValue) => {
    //   cy.visit('http://localhost:8081/validate-data')
    //   cy.get('input[data-testid="validate-input"]').type(generatedRandomValue, {force: true})
    //   cy.get('[data-testid="verify-button"]').click()
    // })
    
  })
      it('validate', () => {
      cy.visit('http://localhost:8081/validate-data')
      cy.task('getSharedValue').then((hodnota) => {
          cy.get('input[data-testid="validate-input"]').type(hodnota, {force: true})
      })

      
    })
})