import generateValuePage from "..//pages/generator/generatePage"
import validateValuePage from "..//pages/validator/validatorPage"
import validateValuePage2 from "..//pages/validator/validatorPage2"

describe('template spec', () => {
  it('passes', () => {
    cy.fixture('config.test.json').then((config) => { //cy.visit('http://localhost:8080/')
    cy.visit(config.urlGener)
    })

    const newGenerateValue = 'sport'
    generateValuePage.generateValue(newGenerateValue)
    generateValuePage.saveGeneratedValueToFile('cypress/fixtures/generateText.txt')
  })

  it('validate', () => {
    cy.fixture('config.test.json').then((config) => { //cy.visit('http://localhost:8081')
    cy.visit(config.urlValid)
    })

    cy.readFile('cypress/fixtures/generateText.txt').then((value) => {
    validateValuePage.validateValue(value)
    })
  })
// my test
  it('validate', () => {
    cy.fixture('config.test.json').then((config) => { //cy.visit('http://localhost:8082')
    cy.visit(config.urlValid2)
    })

    cy.readFile('cypress/fixtures/generateText.txt').then((valueNew) => {
    validateValuePage2.validateValue(valueNew)
    })
  })
})
