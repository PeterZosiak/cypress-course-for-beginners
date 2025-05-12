export default class CourseCardComponent {

    constructor(testid) {
      this.componentSelector = testid;
    }
    
    // creating parrent component
    nadradenyElement() {
       return cy.get(`div[data-testid=${this.componentSelector}]`)
    }
    
    nazovKurzu = () => this.nadradenyElement().find('h3') 
    descripPozice = () => this.nadradenyElement().find('p') 
    cenaKurzu = () => this.nadradenyElement().find('p[class="price"]') 
    komentare = () => this.nadradenyElement().find('div[class="comments-section"]')
    //komentare = () => this.nadradenyElement().find('div[class="comments-section"]')

  }

  //Na stranke Course (localhost:3000/courses)  pridat komentar pre kazdy jeden kurz. 
  //Kto sa citi, zvalidovat pridany komentar, ze bol pridany, je viditelny, a zhoduje sa so zadanym komentarom
  