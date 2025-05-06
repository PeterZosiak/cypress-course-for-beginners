import contactUsPage from '../pages/contactUsPage'
import menuComponent from '../pages/components/menuComponent';     

describe('Check ContactUs Page', () => {
    beforeEach(() => {
        cy.fixture('url.json').then((urls) => {
            cy.visit(`${urls.mainUrl}/contact`)
            //cy.visit('http://localhost:3000/contact')          
            menuComponent.navigate('contact')
        })  

    it('should open ContactUs page and control all fields on page', () => {
            contactUsPage.headingH1().should('be.visible')
            contactUsPage.nameInput().should('be.visible')
            contactUsPage.emailInput().should('be.visible')
            contactUsPage.textarea().should('be.visible') 
            contactUsPage.submitButton().should('be.visible').should('be.disabled') 
        })   
    });
// invalid Name
    it('Should enter invalid name, less 2 signs and get error - empty', () => {
        contactUsPage.nameInput().click().blur()
        contactUsPage.errorMessageInputName().should('be.visible').and('contain', 'Name must be at least 2 characters long')
    })

    it('Should enter invalid name, less 2 signs and get error - number', () => {
        contactUsPage.nameInput('1').click().blur()
        contactUsPage.errorMessageInputName().should('be.visible').and('contain', 'Name must be at least 2 characters long')
    })

    it('Should enter invalid name, less 2 signs and get error - letter', () => {
        contactUsPage.nameInput('a').click().blur()
        contactUsPage.errorMessageInputName().should('be.visible').and('contain', 'Name must be at least 2 characters long')    
    })

    it('Should enter invalid name, less 2 signs and get error - sign', () => {
        contactUsPage.nameInput('@').click().blur()
        contactUsPage.errorMessageInputName().should('be.visible').and('contain', 'Name must be at least 2 characters long')    
    })

// invalid email
        it('Should enter invalid email - without "." and get error', () => {
          contactUsPage.emailInput('12@qw').click().blur()
          contactUsPage.errorMessageEmail().should('be.visible').and('contain', 'Please enter a valid email address')
        })
    
        it('Should enter invalid email - without "@" and get error', () => {
          contactUsPage.emailInput('12qw.cz').click().blur()
          contactUsPage.errorMessageEmail().should('be.visible').and('contain', 'Please enter a valid email address')
        })
    
        it('Should enter invalid email - with "/" without "@" and get error', () => {
          contactUsPage.emailInput('12qw.cz/').click().blur()
          contactUsPage.errorMessageEmail().should('be.visible').and('contain', 'Please enter a valid email address')
        })
    
        it('Should enter invalid email - with "!" without "@" and get error', () => {
          contactUsPage.emailInput('!12qw.cz').click().blur()
          contactUsPage.errorMessageEmail().should('be.visible').and('contain', 'Please enter a valid email address')
        })
        // !!!there is no error on the production
        it('Should enter invalid email - with "!" after . and get error', () => {
            contactUsPage.emailInput('12@qw.cz!').click().blur()
            contactUsPage.errorMessageEmail().should('be.visible').and('contain', 'Please enter a valid email address')
        })

// invalid message
        it('Should enter invalid message less 10 characters - 1', () => {
            contactUsPage.textarea('1').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 2', () => {
            contactUsPage.textarea('12').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 3', () => {
            contactUsPage.textarea('123').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 4', () => {
            contactUsPage.textarea('1234').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 5', () => {
            contactUsPage.textarea('12345').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 6', () => {
            contactUsPage.textarea('123456').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 7', () => {
            contactUsPage.textarea('1234567').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 8', () => {
            contactUsPage.textarea('12345678').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
        it('Should enter invalid message less 10 characters - 9', () => {
            contactUsPage.textarea('123456789').click().blur()
            contactUsPage.errorMessageMessage().should('be.visible').and('contain', 'Message must be at least 10 characters long')
        })
// correct data for sending a message
        it('Should enter valid registration details, click Register and go to new page', () => {
            contactUsPage.correctRegister('12', 'lyusitta@meta.ua', '0123456789')
            cy.contains('Message sent successfully!').should('be.visible')
            })
})