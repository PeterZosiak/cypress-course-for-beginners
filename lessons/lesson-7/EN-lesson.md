### **Lesson 7: Interacting with Web Elements and Handling User Inputs**

## **1. Content Outline**

### **A. Introduction**
- **Why Web Element Interaction is Important:**
  - Verifies how users interact with elements like buttons, input fields, checkboxes, dropdowns, etc.
  - Ensures web applications behave as expected in response to user inputs.


##### Why Web Element Interaction is Important

**Explanation:**
- **Real-World Simulation:**  
  Interacting with web elements simulates how real users interact with a web application. Automated tests that replicate clicks, typing, and other actions help ensure that the UI responds correctly in every scenario.

- **Validation of UI Behavior:**  
  It confirms that user actions (like submitting a form, selecting an option, or triggering a modal) lead to the expected changes in the DOM, such as displaying error messages, updating content, or navigating to a new page.

- **Catch Regression Issues:**  
  Automated interactions can catch UI regressions quickly. If a developer makes a change that affects how a button works, interaction tests will flag the issue immediately.

- **End-to-End Testing:**  
  Interaction testing is critical for end-to-end (E2E) tests where the complete user journey is verified—from loading the page to performing a sequence of actions and observing the outcomes.


### **B. Selecting Elements in Cypress**
- **CSS Selectors (Core Methodology):**
  - Basic selectors: `.class`, `#id`, `tag`.
  - Complex selectors: `div > button`, `input[type="text"]`.
- **Using `data-*` Attributes:**
  - Best practice for stable selectors in automation:
    ```javascript
    cy.get('[data-testid="login-button"]');
    ```
- **Traversal Methods:**
  - Find child elements: `cy.get('div').find('button')`.
  - Navigate DOM structure: `.parent()`, `.children()`, `.next()`, `.prev()`.
- **Best Practices:**
  - Use `data-*` attributes for test stability.
  - Avoid brittle selectors like `nth-child`.

  ##### cy.get() vs cy.find()
  **Key Difference:**  
  Use `cy.get()` to query the global DOM. Use `cy.find()` when you need to narrow down the search to elements inside a specific container or context.

  **cy.get():**
  - **Usage:**  
    `cy.get()` is used to select elements from the entire DOM using a given selector.
  - **Example:**
    ```javascript
    // Selects an element with a data-testid attribute from the entire page
    cy.get('[data-testid="login-form"]');
    ```

  **cy.find():**
  - **Usage:**  
    `cy.find()` is used to search for descendant elements within a previously selected element.
  - **Example:**
    ```javascript
    // First, select a parent element
    cy.get('[data-testid="login-form"]')
      // Then find a child input element within that form
      .find('[data-testid="username-input"]');
    ```

##### Why `data-testid` Attribute is Better than ID or CLASS Selector

**Explanation:**
- **Stability Across UI Changes:**  
  `data-testid` attributes are dedicated solely to testing. They’re not typically affected by CSS redesigns or refactoring, unlike IDs or classes which may change based on design requirements.

- **Separation of Concerns:**  
  Keeping test selectors separate from styling or structural selectors ensures that tests remain robust and are not broken by visual updates.

- **Descriptive and Intent-Revealing:**  
  They clearly indicate that the attribute is used for testing (e.g., `data-testid="login-button"`), making the tests easier to understand and maintain.

- **Avoiding Conflicts:**  
  IDs and classes are used for styling and layout, so relying on them can lead to conflicts or unexpected behavior if the same selectors are repurposed.

**Example:**
```html
<!-- Using data-testid for testing -->
<button data-testid="submit-button">Submit</button>
```
```javascript
// Cypress test using data-testid
cy.get('[data-testid="submit-button"]').click();
```

---

### **C. Actions on Web Elements**
1. **Clicking Elements:**
   - Use `cy.click()` to simulate clicks.
   - Example:
     ```javascript
     cy.get('[data-testid="submit-button"]').click();
     ```

2. **Typing Into Input Fields:**
   - Use `cy.type()` to simulate typing.
   - Example:
     ```javascript
     cy.get('[data-testid="username-input"]').type('testUser');
     ```
    - **Simulating Keyboard Events:**
      - Use `.type()` with special keys like `{enter}`, `{backspace}`.
      - Example:
        ```javascript
        cy.get('[data-testid="search-input"]').type('Cypress{enter}');
        ```

3. **Clearing Input Fields:**
   - Use `.clear()` to remove content.
   - Example:
     ```javascript
     cy.get('[data-testid="username-input"]').clear();
     ```

4. **Selecting Dropdown Options:**
   - Use `.select()` for `<select>` elements.
   - Example:
     ```javascript
     cy.get('[data-testid="dropdown"]').select('Option 1');
     ```

5. **Checkboxes and Radio Buttons:**
   - `.check()` to select, `.uncheck()` to deselect checkboxes.
   - Example:
     ```javascript
     cy.get('[data-testid="accept-terms"]').check();
     ```

6. **Submitting Forms:**
   - Use `.submit()` to simulate form submission.
   - Example:
     ```javascript
     cy.get('[data-testid="login-form"]').submit();
     ```

7. **Hovering Over Elements:**
   - Cypress does not have a dedicated hover action; use `.trigger('mouseover')`.
   - Example:
     ```javascript
     cy.get('[data-testid="menu-item"]').trigger('mouseover');
     ```
---

### **D. Validating Interactions**
- **Assertions:**
  - Confirm that actions result in the expected state or behavior.
  - Example:
    ```javascript
    cy.get('[data-testid="success-message"]')
      .should('be.visible')
      .and('contain', 'Login Successful!');
    ```
- **Chaining Commands:**
  - Combine actions and assertions for clear, concise tests.
  - Example:
    ```javascript
    cy.get('[data-testid="submit-button"]')
      .click()
      .get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
    ```

---

### **E. Advanced Input Handling**
- **File Uploads:**
  - Use `cy.selectFile()` for file input elements.
  - Example:
    ```javascript
    cy.get('[data-testid="file-upload"]').selectFile('cypress/fixtures/sample.pdf');
    ```

- **Interacting with Disabled Elements:**
  - Validate or trigger events on disabled elements:
    ```javascript
    cy.get('[data-testid="submit-button"]').should('be.disabled');
    ```

##### cy.trigger()

**Explanation:**
- **Purpose:**  
  `cy.trigger()` is used to simulate events that don’t have a dedicated Cypress command (like `mouseover`, `keydown`, etc.). This is useful for testing how elements react to custom or complex user interactions.

- **Example:**
  ```javascript
  // Trigger a mouseover event on an element
  cy.get('[data-testid="menu-item"]').trigger('mouseover');
  ```

- **When to Use:**  
  Use `cy.trigger()` when you need to simulate events beyond the standard click or type actions—especially useful for testing dynamic UI changes like tooltips or dropdown menus that appear on hover.


##### cy.within()

**Explanation:**
- **Purpose:**  
  `cy.within()` scopes subsequent Cypress commands to a specific element. This is helpful when you want to limit your query context to a particular container, ensuring that your selectors only search within that container.

- **Example:**
  ```javascript
  // Limit all subsequent commands to within the form element
  cy.get('[data-testid="login-form"]').within(() => {
    cy.get('[data-testid="username-input"]').type('testUser');
    cy.get('[data-testid="password-input"]').type('password123');
  });
  ```

- **Benefits:**  
  - Increases test reliability by preventing false positives from similar elements elsewhere on the page.
  - Simplifies selectors by narrowing the search context.


##### Why Use Cypress Real Events Plugin (`cypress-real-events`) Instead of Cypress Native Events

**Explanation:**
- **Native Limitations:**  
  Cypress’s built-in commands (like `cy.click()`, `cy.type()`) work well for many interactions but sometimes do not fully simulate real user behavior. For example, complex mouse movements or more nuanced event sequences might not be triggered exactly as they would in a real browser.

- **Cypress Real Events Plugin:**
  - **Purpose:**  
    The `cypress-real-events` plugin sends actual browser events (e.g., real mouse movements or keyboard events), which can be more representative of true user behavior.
  - **Advantages:**  
    - **More Accurate Simulation:** It replicates the native event behavior better, especially for interactions that require more than a simple click.
    - **Improved Test Reliability:** Helps in scenarios where native Cypress events might not trigger certain event handlers, such as complex drag-and-drop or hover interactions.
  - **Example:**
    ```javascript
    // First, install the plugin:
    // npm install cypress-real-events --save-dev

    // In your Cypress support file (e.g., cypress/support/commands.js), import the plugin:
    import 'cypress-real-events/support';

    // Then, use it in a test:
    cy.get('[data-testid="drag-item"]').realMouseDown();
    cy.get('[data-testid="drop-zone"]').realMouseUp();
    ```

- **When to Use:**  
  Use the real events plugin when you need to simulate a sequence of events that closely mimic user interactions—for example, drag-and-drop, hover effects with delays, or complex mouse movement scenarios.


---

## **2. Hands-On Activities**

### **A. Exercise 1: Form Submission**
- **Objective:**
  - Create a login form with `data-testid` attributes.
  - Simulate user inputs (username, password), click the login button, and validate success or error messages.
- **Web Functionality Suggestion:**
  - A simple login form with validation.

### **B. Exercise 2: Dropdown and Checkbox Interaction**
- **Objective:**
  - Add a dropdown to select a user role and a checkbox for agreeing to terms.
  - Validate the form is only submitted when all fields are filled and the checkbox is checked.
- **Web Functionality Suggestion:**
  - A form that prevents submission until validation criteria are met.

### **C. Exercise 3: Simulating Keyboard Events**
- **Objective:**
  - Create a search bar that filters results dynamically as the user types.
  - Test the behavior of the search feature using `.type()` and `.clear()`.
- **Web Functionality Suggestion:**
  - A real-time search bar that displays matching results.

---

## **3. Potential Student Questions**

1. **Why should I use `data-*` attributes instead of CSS selectors?**
   - **Answer:** CSS selectors can change due to design updates, while `data-*` attributes are stable and reserved for developers/testing, ensuring reliable test scripts.

2. **How can I simulate hovering over an element in Cypress?**
   - **Answer:** Use `.trigger('mouseover')` as Cypress does not have a dedicated hover method.

3. **Can I interact with elements that are hidden or disabled?**
   - **Answer:** Cypress prevents interacting with hidden or disabled elements by default, but you can use `.invoke('show')` or modify attributes to simulate interactions.

4. **How do I validate a form is working correctly?**
   - **Answer:** Combine actions (e.g., typing, clicking) with assertions to confirm expected results like showing success/error messages.

---

## **4. Supplementary Materials**

- **Official Documentation:**
  - [Cypress Commands](https://docs.cypress.io/api/commands)
  - [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

- **Videos and Tutorials:**
  - [Traversy Media: Cypress Crash Course](https://www.youtube.com/watch?v=pk4z4k8I8fU)
  - [The Net Ninja: Cypress Testing Tutorials](https://www.youtube.com/watch?v=zLtqULPDuE8)

- **Interactive Tools:**
  - Practice with tools like [TodoMVC](http://todomvc.com).

- **Websites for practice Test Automation**
  - [Advantage eshop demo](https://advantageonlineshopping.com)
  - [DemoBlaze eshop](https://www.demoblaze.com)
  - [Tools QA](https://demoqa.com)
  - [UI Test Automation Playground](http://uitestingplayground.com)
  - [Sauce Labs](https://www.saucedemo.com)
  - [Cypress Playground](https://cypress-playground.s3.eu-central-1.amazonaws.com/index.html)
  - [Automation Exercise](https://automationexercise.com)
  - [Practice Test Automation Website for Web UI & API](https://practice.expandtesting.com)

---

### Suggested Lesson Breakdown for 3 Hours

#### **Hour 1: Basics of Selecting and Interacting with Elements (60 minutes)**
- Introduction to element selectors.
- Performing basic actions like clicking and typing.
- Hands-on activity: Fill out and submit a form.

#### **Hour 2: Advanced Interactions and Input Handling (60 minutes)**
- Handling dropdowns, checkboxes, and file uploads.
- Simulating keyboard events and handling disabled elements.
- Hands-on activity: Dynamic dropdown and search bar interaction.

#### **Hour 3: Validating User Actions (60 minutes)**
- Writing assertions for different scenarios.
- Combining actions and assertions in test cases.
- Hands-on activity: Test and validate form behavior based on input.
