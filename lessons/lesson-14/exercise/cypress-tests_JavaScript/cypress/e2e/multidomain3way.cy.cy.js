// In cases where we have multiple tests for domain2, we optimize the code using beforeEach
// This code is optimal variant code of multidomain1way.cy.js and multidomain2way.cy.js

describe('Template spec', () => {
  let generatedValue = '';
  let generatedValueFile = '';

  beforeEach(() => {
    // with using task
    cy.task('getSharedValue').then((sharedText) => {
    generatedValue = sharedText
    })
    // with using file
    cy.fixture('generateText.txt').then((text) => {
    generatedValueFile = text
    })
  })

  it('generate', () => {
    cy.visit('http://localhost:8080/')
    cy.get('a[data-testid="nav-generate-button"]').click()

    const newGenerateValue = 'sport'
    cy.get('input[data-testid="input1"]').type(newGenerateValue)
    cy.get('button[data-testid="confirm-button"]').click()
    
    cy.get('[data-testid="result-text"]').then((resultElement) => {
      generatedValue = resultElement.text()
      cy.log('Generated Value:', generatedValue)
      cy.task('setSharedValue', generatedValue) // called function from cypress.config.js
    })
  });

  it('validate', () => {
    // with using task
    cy.visit('http://localhost:8081/validate-data')
    // moving this part of the code to beforeEach
    // cy.task('getSharedValue').then((hodnota) => {
    // })  
    cy.get('input[data-testid="validate-input"]').type(generatedValue, {force: true})
    cy.get('button[data-testid="verify-button"]').click()
    cy.get('p[data-testid="verified-text"]').should('contain.text', generatedValue)
  })

  it('next validation', () => {
    // with using file
    cy.visit('http://localhost:8081/validate-data')
    cy.get('input[data-testid="validate-input"]').type(generatedValueFile, {force: true})

  })
})
