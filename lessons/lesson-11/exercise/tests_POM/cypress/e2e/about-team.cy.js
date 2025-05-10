import aboutPage from '../pages/aboutPage'
import menuComponent from '../pages/components/menuComponent';     
import teamMemberComponent from '../pages/components/teamMemberComponent';

describe('Check About Page', () => {
    beforeEach(() => {
        cy.fixture('url.json').then((urls) => {
            cy.visit(`${urls.mainUrl}/about`)
            aboutPage.teamGrid().should('be.visible')
        })
    })
        it('should be visible name of page', () => {
            aboutPage.headingH1().should('be.visible').and('contain', 'About Us')
        }) 
      
        it('validation member1', () => {
            const teamMember1 = new teamMemberComponent(0, 'team-member-1')
            teamMember1.name().should('contain', 'Jane Smith') // looking for as an index
            teamMember1.nameByNadradenyElement().should('contain', 'Jane Smith') // looking for as a parrent element
            teamMember1.roleByNadradenyElement().should('contain', 'Lead Instructor') 
            teamMember1.descriptionByNadradenyElement().should('contain', '10+ years of testing experience, specializing in E2E testing.')

        })   
        
        it('validation member2', () => {
            const teamMember2 = new teamMemberComponent(1, 'team-member-2')
            teamMember2.nameByNadradenyElement().should('contain', 'Mike Johnson') 
            teamMember2.roleByNadradenyElement().should('contain', 'Course Developer') 
            teamMember2.descriptionByNadradenyElement().should('contain', 'Expert in test automation and CI/CD practices.')

        }) 

        it('validation member3', () => {
            const teamMember3 = new teamMemberComponent(2, 'team-member-3')
            teamMember3.nameByNadradenyElement().should('contain', 'Anna Brown') 
            teamMember3.roleByNadradenyElement().should('contain', 'Technical Mentor') 
            teamMember3.descriptionByNadradenyElement().should('contain', 'Passionate about helping students master testing concepts.')

        }) 

})