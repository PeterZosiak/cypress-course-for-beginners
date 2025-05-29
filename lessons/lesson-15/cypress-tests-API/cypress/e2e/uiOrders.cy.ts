import orderValue from "..//fixtures/pages/orderPage";

describe('UI Orders', () => {

    it('Search ORDERS by Name', () => {
      cy.visit('http://localhost:3000/orders')
      cy.intercept('http://localhost:3000/api/orders?search=Order').as('searchOrders')
      // change on a POM (orderPage)
      // cy.get('input[data-testid="search-input"]').clear()
      // cy.wait(1000) // wait for the input to clear
      // cy.get('input[data-testid="search-input"]').type('Order')
      // cy.get('button[data-testid="search-button"]').click()

      orderValue.orderValue('Order')
  
      cy.wait('@searchOrders', { timeout: 6000 }).then((responseIntercept) => {

        cy.log(JSON.stringify(responseIntercept));
        expect(responseIntercept.response.statusCode).to.be.equal(200)
        // body is array
        expect(responseIntercept.response.body).to.be.an('array')  
        // validation 1st element of body
        expect(responseIntercept.response.body[0].id).to.equal(1);
        expect(responseIntercept.response.body[0].item).to.equal('Order One');
        expect(responseIntercept.response.body[0].quantity).to.equal(2);
        expect(responseIntercept.response.body[0].status).to.equal('Shipped');
        // number of fields of the first element
        expect(Object.keys(responseIntercept.response.body[0])).to.have.length(4);
        // every elem. must have 4 fields
        responseIntercept.response.body.forEach(order => {
          expect(Object.keys(order)).to.have.length(4);
        });
        // every item include 'order'
        responseIntercept.response.body.forEach(order => {
        expect(order.item).to.include('Order');
        });
        //the number of elements in the array
        cy.get('.order-item').should('have.length', 3);
      }) 
      cy.get('[data-testid="order-1"]', { timeout: 1000 }).should('exist')
     })
  
  })
//   Domaca uloha: Pridate validacie (asserts) na GET Orders