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
   const card1 = new courseCardComponent('course-1')
   const card2 = new courseCardComponent('course-2')
    it('should validate courses-1 names', () => {
   
      card1.nazovKurzu().should('have.text', 'Cypress Basics')
      card1.descripCourse().should('have.text', 'Learn the fundamentals of Cypress testing framework')
      card1.cenaKurzu().should('have.text', '99€')
      card1.komentare().should('have.text', 'Comments')

      card1.authorComment(1).should('have.text', 'John')
      card1.textComment(1).then(commentText => {
        expect(commentText).to.equal('Great course for beginners!');
      card1.inputComment(1).type('Great course for me')
      })
    })
  
    it('should validate courses-2 names', () => {
      //const card2 = new courseCardComponent('course-2')
      card2.nazovKurzu().should('have.text', 'Advanced E2E Testing')
      card2.descripCourse().should('have.text', 'Master end-to-end testing with real-world examples')
      card2.cenaKurzu().should('have.text', '149€')
      card2.komentare().should('have.text', 'Comments')
      
      card2.authorComment(1).should('have.text', 'Sarah')
      card2.textComment(1).then(commentText => {
        expect(commentText).to.equal('Very comprehensive material.');
      })
    })

    it('should validate courses-3 names', () => {
      const card3 = new courseCardComponent('course-3')
      card3.nazovKurzu().should('have.text', 'Test Automation Patterns')
      card3.descripCourse().should('have.text', 'Learn best practices for test automation')
      card3.cenaKurzu().should('have.text', '129€')
      card3.komentare().should('have.text', 'Comments')
      })  
  
    it('should write a message for course-1', () => {
      card1.inputComment(1).type('Great course for me');
      card1.addCommentButton(1).click();
      card1.authorComment(2).should('have.text', 'Anonymous');
      card1.textComment(2).then(commentText => {
      expect(commentText).to.equal('Great course for me');
      })
    })

    it('should write a message for course-2', () => {
      card2.inputComment(2).type('Excellent!');
      card2.addCommentButton(2).click();
      card2.authorComment(2).should('have.text', 'Anonymous');
      card2.textComment(2).then(commentText => {
      expect(commentText).to.equal('Excellent!');
      })
    })


})

