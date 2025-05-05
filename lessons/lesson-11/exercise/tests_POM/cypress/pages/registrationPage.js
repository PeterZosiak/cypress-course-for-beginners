 export default new class registrationPage { // class registrationPage is exported
    headingH1 = () => cy.get ('h1')
    usernameInput = () => cy.get('input[data-testid="username-input"]')
    emailInput = () => cy.get('input[data-testid="email-input"]')
    passwordInput = () => cy.get('input[data-testid="password-input"]')
    registerButton () {
        return cy.get('[data-testid="register-btn"]')
    }

    errorMessageInputName() {
        return cy.get('span[class="error"]')
        //return cy.get('span.error')
    }
    
    errorMessageEmail() {
        return cy.get('span[class="error"]')
        //return cy.get('span.error')
    }

    errorMessagePassword() {
        return cy.get('span[class="error"]')
        //return cy.get('span.error')
    }

    insertEmail(email) {
        return this.emailInput().type(email)
    }

    register(username, email, password) {
            this.usernameInput().type(username)
            this.emailInput().type(email)
            this.passwordInput().type(password)
            this.registerButton().should('be.enabled').click()
    }
    
}