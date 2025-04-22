/// <reference types="cypress" />
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/lessons/lesson-8/exercise/login.html')

    /*1. Overit existenciu vsetkych html elementov
    2. Overit existeciu a obsah error message po zadani nespravnych udajov
    3. Overit funkcnost tlacitka Vymazat ze inputy neobsahuju ziadnu hodnotu
    4. Uspesne sa prihlasit a overit success message a presmerovanie na
Dashboard page*/

    //check exist elem
    it('1. Checks the existence of all HTML elements', () => {
      cy.get('[data-testid="username-input"]').should('be.visible').and('exist').and('have.value',
'').and('have.attr','placeholder', 'Zadajte používateľské meno');
      cy.get('input[id="password"]').should('exist')
      cy.get('button[data-testid="login-button"]').should('be.enabled').and('have.text', 'Prihlásiť')
      cy.get('button[data-testid="login-button"]').parent().should('have.class', 'button-group')
      cy.get('[data-testid="clear-button"]').should('exist')
      cy.get('[data-testid="reset-button"]').should('exist')
      cy.get('[data-testid="success-message"]').should('exist')
    })

    // error login and passw
    cy.get('input[data-testid="username-input"]').type("111")
    cy.get('input[id="password"]').type("111")
    cy.get('div[data-testid="error-message"]').should('not.be.visible').and('have.class', 'error')
    cy.get('[data-testid="login-button"]').click()
    cy.get('div[data-testid="error-message"]').should('be.visible').and('have.class', 'error')
    //cy.get('div[data-testid="password-group"]').find('input').type('pass') - analog previous line with help class
    cy.get('[data-testid="reset-button"]').click()

    // right login and passw
    cy.get('input[data-testid="username-input"]').type("user")
    cy.get('input[id="password"]').type("pass")
    cy.get('[data-testid="login-button"]').click()

    cy.get('div[data-testid="success-message"]').should('be.visible',
{timeout: 1000})


    // Control URL
    cy.url().should('include', 'dashboard.html', {timeout: 1000})

    // work on page dashboard
  })

  it('dashboard', () => {
    cy.visit('http://127.0.0.1:5500/lessons/lesson-8/exercise/dashboard.html')

    // Перевірка користувача
    cy.get('span[data-testid="username"]').should('have.text', 'demoUser')

    // Фільтрація через пошук
    cy.get('input[data-testid="search-input"]').type('dva')
    //cy.get('span[data-testid="item-count"]').should('contain', '2')
    cy.get('ul[data-testid="items-list"]li').first().should('contain.text', 'Položka Dva')

    // Очистити фільтр
    cy.get('input[data-testid="search-input"]').clear()

    cy.get('input[data-testid="checkbox1"]').check()

    // Перевірка клітинки в таблиці
    cy.get('tbody[data-testid="table-body"]')
      .find('tr').eq(0)
      .find('td[data-testid="cell-active-1"]')
      .should('have.text', 'Áno')


  })
})