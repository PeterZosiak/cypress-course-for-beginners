/// <reference types="cypress" />

import courses from '../pages/courses';
import CourseCardComponent from '../pages/components/courseCardComponent';

describe('Courses tests', () => {
  it('should validate courses names', () => {
    cy.visit('http://localhost:3000/courses')

    // coursePage. courseName1(). should('have.text', 'Cypress Basics')
    // coursePage. courseName2(). should('have.text', 'Advanced E2E Testing')
    // coursePage. courseName3(). should('have.text', 'Test Automation Patterns')

    //const card1 = new CourseCardComponent('course-2')
    //card1.nazovKurzu().should('have.text', 'Advanced E2E Testing')
    //card1.cenaKurzu().should('have.text', '149€')
  });
});