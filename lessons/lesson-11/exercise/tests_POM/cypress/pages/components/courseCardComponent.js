export default class CourseCardComponent {

    constructor(testid) {
      this.componentSelector = testid; //testid = "course-1", "course-2", "course-3"
    }
    
    // creating parrent component
    nadradenyElement() {
      return cy.get(`div[data-testid=${this.componentSelector}]`)
      // analog. work code:
      //return cy.get('div[data-testid="' + this.componentSelector + '"]')
    }
    
    // attempt to make the following comment dynamic
    /*getcommentNumber = () => {
      return cy.get('li[data-testid="comment-"]').then(($comments) => {
        return $comments.length;
        });
    }*/
    
    nazovKurzu = () => this.nadradenyElement().find('h3') 
    descripCourse = () => this.nadradenyElement().find('p').first()
    cenaKurzu = () => this.nadradenyElement().find('p[class="price"]') 
    komentare = () => this.nadradenyElement().find('h4')

    authorComment = (commentNumber) => this.nadradenyElement().find(`li[data-testid="comment-${commentNumber}"] strong`);
  
    textComment = (commentNumber) => this.nadradenyElement().find(`li[data-testid="comment-${commentNumber}"]`).then($el => {
      const fullText = $el.text(); // "John: Great course for beginners!"
      const author = $el.find('strong').text(); // "John"
      return fullText.replace(`${author}:`, '').trim(); // "Great course for beginners!"
     });

    inputComment = (courseNumber) => this.nadradenyElement().find(`input[data-testid="comment-input-${courseNumber}"]`);
    addCommentButton = (courseNumber) => this.nadradenyElement().find(`button[data-testid="submit-comment-${courseNumber}"]`);  

  }

  //Na stranke Course (localhost:3000/courses)  pridat komentar pre kazdy jeden kurz. 
  //Kto sa citi, zvalidovat pridany komentar, ze bol pridany, je viditelny, a zhoduje sa so zadanym komentarom
  
  