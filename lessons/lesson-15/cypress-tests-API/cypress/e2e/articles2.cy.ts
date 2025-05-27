it('POST Login', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/login',
      body: {
        "name": "admin",
        "password": "pass"
      }
    }).then((loginOdpoved) => {
      cy.log(JSON.stringify(loginOdpoved))
      expect(loginOdpoved.status).to.be.equal(200)
      expect(loginOdpoved.body).to.have.property('token')
      
      Cypress.env('moj-token', loginOdpoved.body.token)
    })
  })
  
  it('PUT Article', () => {
    // ...
  })
  
  it('GET Orders', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/orders',
      failOnStatusCode: false,
      headers: {
        'Authorization': Cypress.env('moj-token')
      }
    }).then((odpovedOrders) => {
      cy.log(JSON.stringify(odpovedOrders))
      expect(odpovedOrders.status).to.be.equal(200)
  
      // TODO: pridat dalsie kontroly na odpoved
    })
  })