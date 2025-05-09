/// <reference types="cypress" />

import coursesPage from '../pages/coursesPage';
import courseCardComponent from '../pages/components/courseCardComponent';     

describe('Courses tests', () => {   
  beforeEach(() => {
  //it('should validate courses names', () => {
    cy.fixture('url.json').then((urls) => {
    cy.visit(`${urls.mainUrl}/courses`)
    })  
  })

    it('should validate courses names', () => {
      const card1 = new courseCardComponent('course-1')
      card1.nazovKurzu().should('have.text', 'Cypress Basics')
      card1.descripCourse().should('have.text', 'Learn the fundamentals of Cypress testing framework')
      card1.cenaKurzu().should('have.text', '99€')
      card1.komentare().should('have.text', 'Comments')

      card1.authorComment(1).should('have.text', 'John')
      card1.textComment(1).then(commentText => {
        expect(commentText).to.equal('Great course for beginners!');
      })

      const card2 = new courseCardComponent('course-2')
      card2.nazovKurzu().should('have.text', 'Advanced E2E Testing')
      card2.descripCourse().should('have.text', 'Master end-to-end testing with real-world examples')
      card2.cenaKurzu().should('have.text', '149€')
      card2.komentare().should('have.text', 'Comments')
      
      card2.authorComment(1).should('have.text', 'Sarah')
      card2.textComment(1).then(commentText => {
        expect(commentText).to.equal('Very comprehensive material.');
      })

      const card3 = new courseCardComponent('course-3')
      card3.nazovKurzu().should('have.text', 'Test Automation Patterns')
      card3.descripCourse().should('have.text', 'Learn best practices for test automation')
      card3.cenaKurzu().should('have.text', '129€')
      card3.komentare().should('have.text', 'Comments')
    })  
    
    it('should write a message for 1st course', () => {
      cy.visit('http://localhost:3000/courses')    
      const page = new coursesPage()
      page.inputComment().type('Great course for me')

      // !!! error
      //page.addCommentButton().click()

    })
   /* it('should write a message for 2nd course', () => {
      cy.visit('http://localhost:3000/courses')    
      const page = new coursesPage()
      page.inputComment().type('good')

    })*/



})

