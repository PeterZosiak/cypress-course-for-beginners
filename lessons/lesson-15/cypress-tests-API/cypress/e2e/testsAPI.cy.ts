describe('template spec', () => {
  it('Get Users', () => {
    cy.request('GET', Cypress.env('baseUrlApi') + '/users')
      .then((response) => {
        expect(response.status).to.be.equal(200)

        expect(response.body).to.be.an('array')

        expect(response.body[0]).to.have.property('id')
        expect(response.body[0]).to.have.property('name')

        expect(response.body[0].id).to.be.equal(1)
        expect(response.body[0].name).to.be.equal("User One")

      })   

  })

  it('login admin', () => {
    // cy.request({
    //   method: 'POST',
    //   url: Cypress.env('baseUrlApi') + '/login',
    //   body: {
    //     name: 'admin',
    //     password: 'pass',
    //   },

    cy.request('POST', Cypress.env('baseUrlApi') + '/login', {
      name: 'admin',
      password: 'pass'
    }).then((odpoved) => {
      cy.log(JSON.stringify(odpoved));
      expect(odpoved.status).to.be.equal(200);
      expect(odpoved.body).to.have.property('token');
      expect(odpoved.body.token).to.contain('Bearer');
  
      Cypress.env('token', odpoved.body.token);
    });
  });
  
  // Отримання замовлень з авторизацією
  it('GET Orders', () => {
    cy.request({
      url: Cypress.env('baseUrlApi') + '/orders',
      method: 'GET',
      failOnStatusCode: false,
      headers: {
        Authorization: Cypress.env('token')
      }
    }).then((odpoved) => {
      expect(odpoved.status).to.be.equal(200);
    });
  });

  it('login admin with wrong password should return 401', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrlApi') + '/login',
      body: {
        name: 'admin',
        password: 'pass11'
      },
      failOnStatusCode: false 
    }).then((odpoved) => {
      cy.log(JSON.stringify(odpoved));
      expect(odpoved.status).to.be.equal(401);
    });
  });

  it('404', () => {
    cy.request({
      url: Cypress.env('baseUrlApi') + '/neexistujucaurl',
      method: 'GET',
      failOnStatusCode: false
    }).then((odpoved404) => {
      expect(odpoved404.status).to.be.equal(404);
    });
  });
})