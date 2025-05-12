export default class teamMemberComponent {
    constructor(index, testid) {
        this.poziciaVGide = index
        this.parentElementSelector = testid
    }

    nadradenyElement() {
        return cy.get('div[data-testid="' + this.parentElementSelector + '"]')
    }

    nameByNadradenyElement() {
        return this.nadradenyElement().find('h3[data-testid="member-name"]')
    }

    roleByNadradenyElement() {
        return this.nadradenyElement().find('p[data-testid="member-role"]')
    }

    descriptionByNadradenyElement() {
        return this.nadradenyElement().find('p[data-testid="member-description"]')
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
