import interestComponent, { NavigationInterest } from "../pages/component/registr.Inter.component"   
import substrComponent, { NavigationSubscription } from "../pages/component/registr.Substr.component" 

export default new class regisrtPage {
    // enter data
    nameInput = () => cy.get('input[data-testid="reg-name-input"]')  
    emailInput = () => cy.get('input[data-testid="reg-email-input"]') 
    roleSelect = () => cy.get('select[data-testid="reg-role-select"]')
    addressInput = () => cy.get('input[data-testid="reg-address-input"]')
    interestsCheck = () => cy.get('div[class="checkbox-group"]')
    subscriptionCheck = () => cy.get('div[class="radio-group"]')
    avaButton = () => cy.get('label[class="avatar-button"]')
    regButton = () => cy.get('button[data-testid="reg-submit-button"]')
    
    // register data
    regResult = () => cy.get('div[data-testid="reg-result"] h2')
    resultName = () => cy.get('[data-testid="result-name"]')
    resultEmail = () => cy.get('[data-testid="result-email"]')
    resultRole = () => cy.get('[data-testid="result-role"]')
    resultAddress = () => cy.get('[data-testid="result-address"]')
    resultInterests = () => cy.get('[data-testid=result-interests]')
    resultSubscription = () => cy.get('[data-testid="result-subscription"]')
    resultAva = () => cy.get('div[class="result-avatar"] img')

    registerUser(user: RegistrUser) { 
        this.nameInput().should('be.visible').type(user.name)  
        this.emailInput().should('be.visible').type(user.email) 
        this.roleSelect().should('be.visible').select(user.role)
        this.addressInput().should('be.visible').type(user.address) 
        interestComponent.navigateToInter(NavigationInterest.Technology)  
        interestComponent.navigateToInter(NavigationInterest.Design) 
        substrComponent.navigateToSubscr(NavigationSubscription.Monthly)  
        substrComponent.navigateToSubscr(NavigationSubscription.Yearly)   
        this.avaButton().selectFile('cypress/fixtures/palma.png')
        this.regButton().should('be.visible').click()

    }

}

export interface RegistrUser {
    name: string
    email: string
    role: string
    address: string
    //interests?: string
    //subscription?: string
    //file: any

}