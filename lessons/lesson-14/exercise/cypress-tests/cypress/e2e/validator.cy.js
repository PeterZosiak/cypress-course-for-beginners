describe('Template spec', () => {
  it('should generate value and store it', () => {
    let generatedValue = '';

    beforeEach(() => {
      generatedValue = sharedText
    })

    cy.fixture('generateText.txt').then((text) => {
    })

    cy.visit('http://localhost:8080/generate-value');

    cy.get('[data-testid="input1"]').type('Pivo');
    cy.get('[data-testid="confirm-button"]').click();

    cy.get('[data-testid="result-text"]').then((result) => {
      generatedValue = result.text();
      cy.log('Generated value:', generatedValue);

      cy.writeFile('cypress/fixtures/generateText.txt', generatedValue)
      cy.task('saveValue', generatedValue)
    });
  });

  it('validate', () => {
    cy.visit('http://localhost:8081/validate-data')

    // cy.fixture('generateText.txt').then((obsahText) => {
    //   cy.log.apply('Obsah textu:', obsahText)

    //   cy.get('[data-testid="validate-input"]').type(obsahText, { force: true })

    //   cy.get('[data-testid="verify-button"]').click()
    //   cy.get('[data-testid="verified-text"]').should('contain.text', obsahText)
  

    //  })
    // cy.get('[data-testid="validate-input"]').type(generatedValue, { force: true})
    // })
    
    // way 2:
  // cy.task('getValue').then((vratenyText) => {
  //   cy.log('Vrácený text:', vratenyText)
  
  //   cy.get('[data-testid="validate-input"]').type(vratenyText, { force: true })
  
  //   cy.get('[data-testid="verify-button"]').click()
  //   cy.get('[data-testid="verified-text"]').should('contain.text', vratenyText)
  // })
  
   
  })
  
  it('nexrt validation', () => {
  
  })

  })
