/// <reference types="cypress" />

describe('Login Form', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:8080/login.html');
  });

  it('should show error message when credentials are invalid', () => {
    cy.get('[data-testid="username-input"]').type('wronguser');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should('be.visible').and('contain', 'Invalid credentials');
    cy.get('[data-testid="success-message"]').should('not.be.visible');
  });

  it('should show success message when credentials are valid', () => {
    cy.get('[data-testid="username-input"]').type('testuser');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="success-message"]').should('be.visible').and('contain', 'Login successful');
    cy.get('[data-testid="error-message"]').should('not.be.visible');
  });
});
