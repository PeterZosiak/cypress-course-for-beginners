import courseCardComponent from '../pages/components/courseCardComponent';     

export default class coursesPage{
    courseName1() {
        return cy.get('div[data-testid="course-1"]').find('h3')    
    }
    courseName2() {
        return cy.get('div[data-testid="course-2"]').find('h3')
    }
    courseName3() {
        return cy.get('div[data-testid="course-3"]').find('h3')
    }
}

//export default new class sendComment{}