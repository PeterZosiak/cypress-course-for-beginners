import { addSyntheticLeadingComment } from "typescript"

interface User {
name: string,
email: string,
age: number,
pohlave?: string,
userRole: UserRoles
}

enum UserRoles {
  ADMIN = 'admin',
  UESR = 'user',
  GUEST = 'guest'
} 

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')

    const newUser: User = {
      name: 'Liuda',
      email: 'liuda@meta.ua',
      age: 22,
      userRole: UserRoles.ADMIN
    }

    cy.get('input[name="name"]').type(newUser.email)
    const pivo = 5
    const pivoString = "5"
    cy.get('input').type(pivoString)
    cy.get('input').type(pivo.toString()) // change type on string
    
  })

/*  function sendForm() {

    cy.get('form').submit()

  function navigate(page: string) {
    switch (page) {
      case page.HOME
      cy.visit('http://localhost:5173/')

    }
  }
  }*/
})