/*interface User {
name: string,
email: string,
age: number,
pohlave?: string
}

enum UesrRoles {
  ADMIN = 'admin',
  UESR = 'user',
  GUEST = 'guest'
}

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')

    const newUser: User = {
      name: 'Liuda',
      email: 'liuda@meta.ua',
      age: 22
      
    }

    cy.get('input[name="name"]').type(newUser.email)
    /*const pivo = 5
    const pivoString = "5"
    cy.get('input').type(pivoString)
    cy.get('input').type(pivo.toString()) // change type on string
    
  })

  function sendForm() {

    cy.get('form').submit()

  function navigate(page: string) {
    switch (page) {
      case page.HOME
      cy.visit('http://localhost:5173/')

    }
  }
  }
})*/


//import homePage from "../pages/homePage"

import navigationComponent from "../pages/component/navig.component"
import { NavigationLinks } from "../pages/component/navig.component";

describe('Example tests', () => {

    // it('should open home page and validate heading', () => {
    //     cy.visit('/');
    //     homePage.nadpis().should('be.visible').and('have.text', 'Welcome to Our Demo App');
    // });

    it.only('should navigate to all pages and validate headings', () => {
        cy.visit('/');
        navigationComponent.navigateToPage(NavigationLinks.ABOUTUS);
    });

});