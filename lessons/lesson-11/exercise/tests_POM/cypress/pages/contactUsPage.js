export default new class contactUsPage{
    contactContainer() {
        return cy.get('div[class="contact-container"]')
    }

    headingH1 = () => cy.get ('h1')
    nameInput = () => cy.get('input[data-testid="name-input"]')
    emailInput = () => cy.get('input[data-testid="email-input"]')
    textarea = () => cy.get('textarea[data-testid="message-input"]')
    submitButton () {
        return cy.get('button[data-testid="submit-button"]')
    }    

    errorMessageInputName() {
        return cy.get('span[data-testid="name-error"]')
    }

    errorMessageEmail() {
        return cy.get('span[data-testid="email-error"]')
    }

    errorMessageMessage() {
        return cy.get('span[data-testid="message-error"]')
    }
    
    correctRegister(name, email, textMessage) {
        this.nameInput().type(name)
        this.emailInput().type(email)
        this.textarea().type(textMessage).click().blur()
        this.submitButton().should('be.visible').should('be.enabled')
        this.submitButton().click({ force: true })
        //this.submitButton().scrollIntoView().should('be.visible').click()
    }

    successMessageMessage() {
        return cy.get('span[data-testid="submit-status"]')
    }
    
}