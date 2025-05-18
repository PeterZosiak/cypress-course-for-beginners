import homePage from "../pages/homePage"

import navigationComponent from "../pages/component/navig.component"
import { NavigationLinks } from "../pages/component/navig.component";

describe('Example tests', () => {

    it('should open home page and validate heading', () => {
        cy.visit('/');
        homePage.nadpis().should('be.visible').and('have.text', 'Welcome to Our Demo App');
    });

    it.only('should navigate to all pages and validate headings', () => {
        cy.visit('/');
        navigationComponent.navigateToPage(NavigationLinks.ABOUTUS);
        
    });
    //cy.visit('/registration');
    //cy.visit('/about');
    //cy.visit('/contact');
});