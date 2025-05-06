export default class teamMemberComponent {
    constructor(index) {
        this.poziciaVGide = index
        this.parentElementSelector = testid

    }

    nadrazenyElement () {
        return cy.get('h3[data-testid="member-name"]').eq(this.poziciaVGide)

    }
    name() {
        return cy.get('h3[data-testid="member-name"]').eq(this.poziciaVGide)
    }

    role() {
        return cy.get('h3[data-testid="member-role"]').eq(this.poziciaVGide)
    }
    description() {
        return cy.get('h3[data-testid="member-description"]').eq(this.poziciaVGide)
    }
}
