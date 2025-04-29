 export default new class registrationPage {
    headingH1 = () => cy.get ('h1')
    usernameInput = () => cy.get('input[data-testid="username-input"]')
    emailInput = () => cy.get('input[data-testid="email-input"]')
    passwordInput = () => cy.get('input[data-testid="password-input"]')
    registerButton () {
        return cy.get('[data-testid="register-btn"]').click()
    }
    errorMessage() {
            return cy.get('span[class="error"]')
    }
    register(username, email, password) {
            this.usernameInput().type(username)
            this.emailInput().type(email)
            this.passwordInput().type(password)
            this.registerButton().should('be.enabled').click()
    }
    
}