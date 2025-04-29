class Component {
    homeButton() {
        return cy.get('a[data-testid="nav-home"]')
    }

    courseButton() {
        return cy.get('a[data-testid="nav-courses"]')
    }

    aboutButton() {
        return cy.get('a[data-testid="nav-about"]')
    }

    contactButton() {
        return cy.get('a[data-testid="nav-contact"]')
    }

    loginButton() {
        return cy.get('a[data-testid="nav-login"]')
    }

    registerButton() {
        return cy.get('a[data-testid="nav-register"]')
    }
    navigate(page) {
        switch (page) {
            case 'home':
                this.homeButton().click()
                break
            case 'courses':
                this.coursesButton().click()
                break
            case 'about':
                this.aboutButton().click()
                break
            case 'contact':
                this.contactButton().click()
                break
            case 'login':
                this.loginButton().click()
                break
            case 'register':
                this.registerButton().click()
                break
            default:
                throw new Error('Unknown page: ' + page)
        }
    }

}