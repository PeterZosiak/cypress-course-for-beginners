import navigComponent, { NavigationLinks } from "../pages/component/navig.component"   
import regisrtPage from "../pages/regisrtPage";

describe('Registr tests', () => {
    beforeEach(() => {

        cy.visit('/')
        navigComponent.navigateToPage(NavigationLinks.REGISTRATION)
    })

    it('', () => {
        regisrtPage.nameInput().should('be.visible')

    })

    it('', () => {
        regisrtPage.nameInput().type('Liuda')  
    })


})
//v lesson 13 v exercise, na stranke Registration (Vite App)
//  vyplnit registracny formular a zvalidovat vyplnene udaje, 
// tak aby obsahovali len udaje ktore mozu obsahovat