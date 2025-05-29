import { post } from "cypress/types/jquery"

 describe('API tests articles Page', () => { 
  it('GET article by ID', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/articles/3'
      //failOnStatusCode: false,
      // headers: {
      //   'Authorization': Cypress.env('moj-token')
      // }
    }).then((odpovedOrders) => {
      cy.log(JSON.stringify(odpovedOrders))
      expect(odpovedOrders.status).to.be.equal(200)
      expect(odpovedOrders.body.id).to.have.equal(3)
      expect(odpovedOrders.body.title).to.have.equal("Modern Web")
      expect(odpovedOrders.body.content).to.have.equal("Trends in modern web development.")
      // TODO: pridat dalsie kontroly na odpoved
    })
  })

  it('POST Login', () => { // this part of code navigates to file commands.ts
    // cy.request({
    //   method: 'POST',
    //   url: 'http://localhost:3000/api/login',
    //   body: {
    //     "name": "admin",
    //     "password": "pass"
    //   }
    // }).then((loginOdpoved) => {
    //   cy.log(JSON.stringify(loginOdpoved))
    //   expect(loginOdpoved.status).to.be.equal(200)
    //   expect(loginOdpoved.body).to.have.property('token')
      
    //   Cypress.env('moj-token', loginOdpoved.body.token)
    // })
  })
  
  it.only('PUT Article', () => {
    const updateArticle = { 
        id: 3, 
        title: "Eded Modern Web", 
        content: "Eded Trends in modern web development."
      }
    cy.request({
      method: 'PUT',
      url: 'http://localhost:3000/api/articles/3',
      body: {
        "id": updateArticle.id,
        "title": updateArticle.title,
        "content": updateArticle.content
      }
    }).then((responseArticles) => {
      cy.log(JSON.stringify(responseArticles))
      expect(responseArticles.status).to.be.equal(200)
      expect(responseArticles.body.article).to.have.property('id', updateArticle.id)
      expect(responseArticles.body.article).to.have.property('title', updateArticle.title)
      expect(responseArticles.body.article).to.have.property('content', updateArticle.content)
      // TODO: pridat dalsie kontroly na odpoved
    })
  })
  
  it.only('GET Orders', () => {
    cy.login('admin', 'pass').then(() => {
      cy.request({
      method: 'GET',
      url: 'http://localhost:3000/api/orders',
      failOnStatusCode: false, // without this row test falls on url: 'http://localhost:3000/api/orders',
      headers: {
        'Authorization': Cypress.env('moj-token')
      }
      }).then((odpovedOrders) => {
        cy.log(JSON.stringify(odpovedOrders))
        expect(odpovedOrders.status).to.be.equal(200)
    
        // TODO: pridat dalsie kontroly na odpoved
      })
    })
  })
})