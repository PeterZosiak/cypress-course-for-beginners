export default new class GenerateValuePage {
    generateEnterButton = () => cy.get('a[data-testid="nav-generate-button"]')
    generateValueInput = () => cy.get('[data-testid="input1"]')
    generateValueButton = () => cy.get('[data-testid="confirm-button"]')
    generateValueResult = () => cy.get('[data-testid="result-text"]')

    generateValue(generateText: string) {
        this.generateEnterButton().click()
        this.generateValueInput().type(generateText)  
        this.generateValueButton().click()
    }
        saveGeneratedValueToFile(filePath: string) { // method is class
        this.generateValueResult().then((resultElement) => {
            const generatedText = resultElement.text()       
            cy.writeFile(filePath, generatedText)
        })
    }
}
