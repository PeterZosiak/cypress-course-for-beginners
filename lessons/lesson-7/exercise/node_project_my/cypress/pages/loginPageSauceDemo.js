export default new class LoganPage {

    usernameInput = cy.get('input[data-test="username"]').type('standard_user')
    
    passwordInput = cy.get('input[data-test="password"]').type('secret_sauce')

    loginInput = cy.get('input[data-test="login-button"]').click() 

    login(username, password) {
        this.usernameInput().type(username)
        this.usernameInput().type(password)

        this.loginButton.click()

    }
}
