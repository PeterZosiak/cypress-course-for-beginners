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