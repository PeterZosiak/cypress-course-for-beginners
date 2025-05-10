describe('Google Search tests', () => {
    it('Sould visit Google and search for Cypress', () => {
     
     
     cy.visit('https://automationexercise.com/')
     //cy.url().should('eq', 'https://www.saucedemo.com/');
  
     cy.get('a[href="#Women"]').click()
    
     cy.get('a').contains("Dress").click()

     cy.get('a[data-product-id="4"]').eq(0).click()

     cy.get('[id="cartModal"]').find('a').contains("View Cart").click()

    cy.get('[class="cart_description"]').should('contain.text',"Stylish Dress") 

    })  

  });