describe('template spec', () => {
  it('passes', () => {
    //
    cy.visit('http://127.0.0.1:5500/lessons/lesson-9/exercise/index.html')


    cy.fixture('adresy.json').then((mojeAdresy) => {
      mojeAdresy.forEach((adresa) => {
      cy.log(adresa.address)
      cy.get('input[data-testid="search-input"]').clear().type(adresa.address)
      cy.get('button[data-testid="search-button"]').click()

       // Assert
      if (adresa.count > 0) {
        cy.get('div[data-testid="result-display"]').find('p[data-testid*="ruian-code"]').eq(0).should('contain.text', adresa.ruian_code) ;
    
        cy.get('p[data-testid*="ruian-code"]').should('have.length', adresa.count);
      } else {
        cy.get('p[data-testid="not-found-message"]').should('be.visible').and('contain.text', 'Adresa sa nenašla')
      }

      })
    })
  })
})

