describe('elements testing', () => {
    it('should fill username & password', () => {
     cy.visit('https://www.saucedemo.com/')
     cy.url().should('eq', 'https://www.saucedemo.com/');
  
     cy.get('input[data-test="username"]').type('standard_user')
    
     cy.get('input[data-test="password"]').type('secret_sauce')

     cy.get('input[data-test="login-button"]').click() 
     cy.get('div[data-test="inventory-item-name"]').click() 
     cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click() 
     

    })
    
   

  });