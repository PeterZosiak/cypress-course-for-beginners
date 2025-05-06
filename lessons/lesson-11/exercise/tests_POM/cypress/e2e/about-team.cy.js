import aboutPage from '../pages/aboutPage'
import menuComponent from '../pages/components/menuComponent';     

describe('About', () => {
    it('should open About page and contol members of team', () => {
        cy.fixture('url.json').then((urls) => {
            cy.visit(`${urls.mainUrl}/about`)
            //cy.visit('http://localhost:3000/about')
            //menuComponent.navigate('about') // work code to go on about page
            aboutPage.teamGrid().should('be.visible')
            aboutPage.teamMember1().should('be.visible').and('contain', 'Jane Smith')
            aboutPage.roleMember1().should('be.visible').and('contain', 'Lead Instructor')
            aboutPage.descriptionMember1().should('be.visible').and('contain', '10+ years of testing experience, specializing in E2E testing.')
        })
        //aboutPage.teamMember2().should('be.visible').and('contain', 'Mike Johnson')
        //aboutPage.teamMember3().should('be.visible').and('contain', 'Anna Brown')
    })

    /*it('should open About page and contol members of team', () => {
        cy.visit('http://localhost:3000/about')
        menuComponent.navigate('about')
        aboutPage.teamGrid().should('be.visible')
        aboutPage.teamMember2().should('be.visible').and('contain', 'Mike Johnson')
    })

    it('should open About page and contol members of team', () => {
        cy.visit('http://localhost:3000/about')
        menuComponent.navigate('about')
        aboutPage.teamGrid().should('be.visible')
        aboutPage.teamMember3().should('be.visible').and('contain', 'Anna Brown')
    })*/
})