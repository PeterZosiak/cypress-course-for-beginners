describe('UI Orders', () => {

    it('Search ORDERS by Name', () => {
      cy.visit('http://localhost:3000/orders')
      cy.intercept('http://localhost:3000/api/orders?search=Order').as('searchOrders')
  
      cy.get('input[data-testid="search-input"]').clear()
      cy.wait(1000) // wait for the input to clear
      cy.get('input[data-testid="search-input"]').type('Order')
  
      cy.get('button[data-testid="search-button"]').click()
  
      cy.wait('@searchOrders', { timeout: 10000 })
  
      cy.get('[data-testid="order-1"]', { timeout: 1000 }).should('exist')
    })
  
  })
//   Domaca uloha: Pridate validacie (asserts) na GET Orders