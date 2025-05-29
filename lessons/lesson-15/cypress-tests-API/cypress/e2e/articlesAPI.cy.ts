describe('API tests articles Page', () => {
    //beforeEach 
  it('validate file structure', () => {
    cy.request('GET', Cypress.env('baseUrlApi') + '/articles')
      .then((response) => {
        cy.log(JSON.stringify(response))
        expect(response.status).to.be.equal(200)
        expect(response.body).to.be.an('array')
        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('title')
        expect(response.body[0]).to.have.property('content')
        
     })   
  })
  
  it('validate body contant', () => {
    cy.request('GET', Cypress.env('baseUrlApi') + '/articles')
      .then((response) => {
        // articles1
        expect(response.body[0].id).to.be.equal(1)
        expect(response.body[0].title).to.be.equal("Nuxt 3 Guide")
        expect(response.body[0].content).to.be.equal("Learn Nuxt 3 step-by-step.")
        // articles2
        expect(response.body[1].id).to.be.equal(2)
        expect(response.body[1].title).to.be.equal("Vue Tips")
        expect(response.body[1].content).to.be.equal("Useful tips for Vue developers.")
        // articles3
        expect(response.body[2].id).to.be.equal(3)
        expect(response.body[2].title).to.be.equal("Modern Web")
        expect(response.body[2].content).to.be.equal("Trends in modern web development.")        
     })   
  })

  it('error 404 - url not exists', () => {
      cy.request({
        url: Cypress.env('baseUrlApi') + '/articless',
        method: 'GET',
        failOnStatusCode: false
      }).then((odpoved404) => {
        expect(odpoved404.status).to.be.equal(404);
      })
  })

  it('should return 200 and contain valid body', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrlApi') + '/articles',
      body: {
        title: "New Article",
        content: "Some content"
      },
      headers: {
        "content-type": "application/json"
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id');
      expect(response.body.title).to.eq("New Article");
      expect(response.body.content).to.eq("Some content");
    });
  });

}) 