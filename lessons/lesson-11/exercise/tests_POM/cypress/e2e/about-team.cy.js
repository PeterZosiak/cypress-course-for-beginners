import aboutPage from '../page/aboutPage'

describe('About', () => {
    it('should open ', () => {
        cy.visit('http://localhost:3000/about')
        aboutPage.teamGrid().should('be.visible')
        aboutPage.teamGrid().should('be.visible').and('contain', 'Jane Smith')

    })
})