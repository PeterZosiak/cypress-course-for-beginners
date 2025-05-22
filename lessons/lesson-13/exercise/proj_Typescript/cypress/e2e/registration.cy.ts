import navigComponent, { NavigationLinks } from "../pages/component/navig.component"  
import interestComponent, { NavigationInterest } from "../pages/component/registr.Inter.component"   
import substrComponent, { NavigationSubscription } from "../pages/component/registr.Substr.component"   
import regisrtPage, { RegistrUser } from "../pages/regisrtPage";

const regUser: RegistrUser = {
    name: "Liuda",
    email: "liuda@com.ua",
    role: "admin",
    address: "Praha, b.6",
}
describe('Registration tests', () => {
    beforeEach(() => {

        cy.visit('/')
        navigComponent.navigateToPage(NavigationLinks.REGISTRATION)
    })

    it('validate object on page', () => {
        // enter data
        regisrtPage.registerUser(regUser)
        // validate data in reg.window
        regisrtPage.regResult().should('be.visible').and('have.text', 'Registration Complete');
        regisrtPage.resultName().should('contain.text', regUser.name)
        regisrtPage.resultEmail().should('contain.text', regUser.email)
        regisrtPage.resultRole().should('contain.text', regUser.role)     
        regisrtPage.resultInterests().should('contain.text', 'technology, design')
        regisrtPage.resultSubscription().should('contain.text', 'yearly')
        regisrtPage.resultAddress().should('contain.text', regUser.address)
        regisrtPage.resultAva().should('be.visible').should('have.attr', 'src').and('include', 'blob:')
        });

})

// // 2nd way to enter interests, more flexib. control resultInterests(AI):
//const selectedInterests: string[] = []
//interestComponent.navigateToInter(NavigationInterest.Technology)
//selectedInterests.push('technology')
//interestComponent.navigateToInter(NavigationInterest.Design)
//selectedInterests.push('design')

// // after click "Register"
//regisrtPage.resultInterests().should('contain.text', selectedInterests.join(', '))

//v lesson 13 v exercise, na stranke Registration (Vite App)
//  vyplnit registracny formular a zvalidovat vyplnene udaje, 
// tak aby obsahovali len udaje ktore mozu obsahovat