//npm install --save-dev @faker-js/faker
import { faker } from '@faker-js/faker';

  describe('template spec', () => {
    it('passes', () => {
      cy.fixture('environ.json').then((environs) => {
        cy.visit(environs.url3)

    // using a faker without saving
      
      /*cy.get('input[data-testid="reg-username-input"]').type(faker.internet.username())
      cy.get('input[data-testid="reg-email-input"]').type(faker.internet.email())
      cy.get('input[data-testid="reg-password-input"]').type(faker.internet.password())
      cy.get('[data-testid="reg-submit-button"]').click()*/

      // using a faker with saving in users.json
        const users = faker.helpers.multiple(() => {
          return {
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password()
          } 
        }, {count: 5})

        cy.writeFile('cypress/fixtures/users.json', users)

        users.forEach((user) => {
          cy.get('input[data-testid="reg-username-input"]').clear().type(user.username)
          cy.get('input[data-testid="reg-email-input"]').clear().type(user.email)
          cy.get('input[data-testid="reg-password-input"]').clear().type(user.password)
          cy.get('[data-testid="reg-submit-button"]').click()

        })
  
      })

    })
  })