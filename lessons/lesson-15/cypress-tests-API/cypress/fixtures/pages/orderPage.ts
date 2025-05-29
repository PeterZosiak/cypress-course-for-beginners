export default new class OrderPage {
  orderInput  = () => cy.get('input[data-testid="search-input"]')
  orderButton  = () => cy.get('button[data-testid="search-button"]').click();
  
  orderValue(orderText: string) {  
    this.orderInput().clear()
    cy.wait(1000) 
    this.orderInput().type(orderText)  
    this.orderButton().click()
  }

}