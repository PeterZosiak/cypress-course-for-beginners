export default new class aboutPage{
    headingH1 = () => cy.get ('h1')
    teamGrid() {
        return cy.get('div[class="team-grid"]')
    }
    teamMember1() {
        return cy.get('div[data-testid="team-member-1"]')        
    }
    roleMember1() {
        return cy.get('div[data-testid="team-member-1"]')       
    }
    descriptionMember1() {
        return cy.get('div[data-testid="team-member-1"]')       
    }
    teamMember2() {   
        return cy.get('div[data-testid="team-member-2"]')
    }
    teamMember3() {   
        return cy.get('div[data-testid="team-member-3"]')
    }
    teamMember() {
        return this.teamMember1().find('hr[data-testid="team-member-1"]')
    }
    
}
/*Domaci ukol: Napisat testy na stranku Contact
Test 1: Skomntroluje ze vsetky element su viditelne a v spravnom stave (button is disabled) 
Test2: Ak je name value mensia ako dva (vlozeny retazec je mensi ako 2 znaky) zobrazi sa error message
Test3: Ak je vlozeny nevalidny email, zobrazi sa error message
Test4: Ak je sprava kratsia ako 10 znakov, zobrazi sa error message
Test5: Ak su vsetky inputy validne, je mozne odoslat email a je zobrazena Success message*/