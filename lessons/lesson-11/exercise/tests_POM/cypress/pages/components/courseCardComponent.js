export default class CourseCardComponent {

    constructor(testid) {
      this.componentSelector = testid;
    }
  
    nadradenyElement() {
      return cy.get(`div[data-testid]`)
    }
  
    nazovKurzu = () => this.nadradenyElement().find('h3')
  
    cenaKurzu() {
      return this.nadradenyElement().find('p[class="price"]')
    }
  
    komentare() {
      return this.nadradenyElement().find('div[class="comments-section"]')
    }
  }

  //Na stranke Course (localhost:3000/courses)  pridat komentar pre kazdy jeden kurz. 
  //Kto sa citi, zvalidovat pridany komentar, ze bol pridany, je viditelny, a zhoduje sa so zadanym komentarom
  