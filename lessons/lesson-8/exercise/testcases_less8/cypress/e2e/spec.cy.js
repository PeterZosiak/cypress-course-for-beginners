/// <reference types="cypress" />
/*
1. Overit existenciu vsetkych html elementov
2. Overit existeciu a obsah error message po zadani nespravnych udajov
3. Overit funkcnost tlacitka Vymazat ze inputy neobsahuju ziadnu hodnotu
4. Uspesne sa prihlasit a overit success message a presmerovanie na Dashboard page*/

/*describe('template spec', () => {
  it('passes', () => {
  cy.visit('http://127.0.0.1:5500/lessons/lesson-8/exercise/login.html')
  //enter username
  cy.get('[data-testid="username-input"]').should('be.visible').and('exist').and('have.value', '').and('have.attr','placeholder', 'Zadajte používateľské meno');

  cy.get('button[data-testid="login-button"]').should('be.enabled').and('have.text', 'Prihlásiť')

  cy.get('button[data-testid="login-button"]').parent().should('have.class', 'button-group')
  cy.get('input[data-testid="username-input"]').type('ussser')
  cy.get('div[data-testid="password-group"]').find('input').type('passs')
  cy.get('div[data-testid="error-message"]').should('not.be.visible').and('have.class', 'error')
  cy.get('button[data-testid="login-button"]').click()
  
  cy.get('input[data-testid="username-input"]').type('user')
  cy.get('div[data-testid="password-group"]').find('input').type('pass')
  cy.get('div[data-testid="error-message"]').should('not.be.visible').and('have.class', 'error')
*/

  //na stranke Dashboard chcem v inpute Filter poloziek, vyfiltorvat polozky podla nazvu a chcem overit ze bol zmeneny Zoznam poloziek a odpoved filtru, a ze v nom zobrazeny spravny pocet poloziek
  describe('template spec', () => {
    it('passes', () => {
      cy.visit('http://127.0.0.1:5500/lessons/lesson-8/exercise/login.html')
      // Невірний логін
      cy.get('[data-testid="username-input"]').should('be.visible').and('exist').and('have.value', '').and('have.attr','placeholder', 'Zadajte používateľské meno');

      cy.get('button[data-testid="login-button"]').should('be.enabled').and('have.text', 'Prihlásiť')
    
      cy.get('button[data-testid="login-button"]').parent().should('have.class', 'button-group')
      cy.get('input[data-testid="username-input"]').type('ussser')
      cy.get('div[data-testid="password-group"]').find('input').type('passs')
      cy.get('div[data-testid="error-message"]').should('not.be.visible').and('have.class', 'error')
      cy.wait(1000)
      //cy.get('button[data-testid="reset-button"]').click()
      
       
     // cy.get('input[type="password"]').type('user')
      //cy.get('div[data-testid="error-message"]').should('not.be.visible')
      cy.get('button[data-testid="login-button"]').click()
      cy.get('div[data-testid="error-message"]').should('be.visible').and('have.class', 'error')

      // Очищення полів
      cy.get('button[data-testid="reset-button"]').click()
      cy.wait(2000)
      cy.get('input[data-testid="username-input"]').should('have.value', '')
      cy.get('input[type="password"]').should('have.value', '')
  
      // Спроба знову
      cy.get('input[data-testid="username-input"]').type('user')
      cy.get('input[type="password"]').type('pass')
      cy.get('button[data-testid="login-button"]').click()
      cy.wait(1000)
 
      // Скидання і повторна спроба
     /* cy.get('button[data-testid="reset-button"]').click()
      cy.get('input[data-testid="username-input"]').type('user')
      cy.get('input[type="password"]').type('pass')
      cy.get('button[data-testid="login-button"]').click()*/
  
      // Перевірка URL
      cy.url().should('include', 'dashboard.html')
    //
  
   //it.only('dashboard', () => {
      //cy.visit('http://127.0.0.1:5500/lessons/lesson-8/exercise/dashboard.html')
  
      // Перевірка імені користувача
      cy.get('span[data-testid="username"]').should('have.text', 'demoUser')
  
      // Пошук і фільтрація
      cy.get('input[data-testid="search-input"]').type('dva')
      cy.get('span[data-testid="item-count"]').should('have.text', '2')
      cy.get('ul[data-testid="items-list"]').find('li').should('contain.text', 'Položka Dva')
  
      // Очистити пошук
      cy.get('input[data-testid="search-input"]').clear()
  /* 
      // Чекбокс
      cy.get('input[data-testid="checkbox1"]').check()
  
      // Перевірка клітинки в таблиці
      cy.get('tbody[data-testid="table-body"]')
        .find('tr').eq(0)
        .find('td[data-testid="cell-active-1"]')
        .should('have.text', 'Áno')
  */
  
  })
})