/// <reference types="cypress" />

import coursesPage from '../pages/coursesPage';
import courseCardComponent from '../pages/components/courseCardComponent';     

describe('Courses tests', () => {   
  it('should validate courses names', () => {
    cy.fixture('url.json').then((urls) => {
      cy.visit(`${urls.mainUrl}/courses`)

      //coursesPage. courseName1(). should('have.text', 'Cypress Basics')
      //coursesPage. courseName2(). should('have.text', 'Advanced E2E Testing')
      //coursesPage. courseName3(). should('have.text', 'Test Automation Patterns')

      const card1 = new courseCardComponent('course-1')
      card1.nazovKurzu().should('have.text', 'Cypress Basics')
      card1.cenaKurzu().should('have.text', '99€')


      const card2 = new courseCardComponent('course-2')
      card2.nazovKurzu().should('have.text', 'Advanced E2E Testing')
      card2.cenaKurzu().should('have.text', '149€')

      const card3 = new courseCardComponent('course-3')
      card3.nazovKurzu().should('have.text', 'Test Automation Patterns')
      card3.cenaKurzu().should('have.text', '129€')

      //courseCardComponent.nazovKurzu().eq(0).should('have.text', 'Cypress Basics')

    })
  }) 

})

