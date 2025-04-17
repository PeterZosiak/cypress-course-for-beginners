## **Lesson 8: Handling Assertions and Validations**

### **1. Content Outline**

#### **A. Introduction to Assertions**
- **Definition:**
  - Assertions are statements in your test code that check if a certain condition is true. They are critical to verifying that the application state matches expected outcomes.
- **Why Assertions Matter:**
  - **Error Detection:** They help quickly identify when an application is not behaving as expected.
  - **Test Reliability:** Ensure that changes in code don’t break the expected functionality.
  - **Documentation:** Serve as living documentation of what the application should do.

#### **B. Cypress Assertions and Chai Integration**
- **Cypress’s Built-In Assertions:**
  - Cypress uses Chai under the hood for assertions.
- **Chai Assertion Styles:**
  - **Should:** Chainable assertions using `should()`.
  - **Expect:** Function style assertions using `expect()`.
  - **Assert:** Classic assertion style using `assert`.
- **Examples:**
  - `cy.get(selector).should('be.visible')`
  - `expect(value).to.equal(expectedValue)`

**Definition:**
Chai is a popular assertion library for JavaScript that provides a variety of styles for writing tests. It enables developers to write human-readable tests with clear, descriptive assertions.

**How to Use Chai:**
- **Integration with Cypress:**  
  Cypress includes Chai out of the box, so you can use its assertions directly in your tests without any additional setup.
- **Common Assertion Styles in Chai:**
  - **Should Style:**  
    Uses a chainable language to build assertions that read like natural language.
    ```javascript
    cy.get('[data-testid="login-button"]').should('be.visible');
    ```
  - **Expect Style:**  
    Uses function calls to assert expectations.
    ```javascript
    cy.get('[data-testid="login-button"]').then(($btn) => {
      expect($btn).to.be.visible;
    });
    ```
  - **Assert Style:**  
    Uses classic assertion functions.
    ```javascript
    cy.get('[data-testid="login-button"]').then(($btn) => {
      assert.isTrue($btn.is(':visible'), 'Login button is visible');
    });
    ```

    #### Most Used Assertions in Cypress

    **1. `should('exist')`**
    Checks that the element exists in the DOM.

    ```javascript
    cy.get('[data-testid="login-button"]').should('exist');
    ```
    **Use when:** You want to verify that an element has been rendered.
    ---

    **2. `should('be.visible')`**
    Checks that the element is **visible** to the user.

    ```javascript
    cy.get('[data-testid="modal"]').should('be.visible');
    ```
    **Use when:** You want to ensure the user can see/interact with the element.

    ---
    **3. `should('not.exist')`** / `should('not.be.visible')`  
    Opposite of the above – great for testing **removal or hiding** of elements.

    ```javascript
    cy.get('[data-testid="loading-spinner"]').should('not.exist');
    ```

    ---
    **4. `should('have.text', 'some text')`**
    Checks for **exact** text content inside an element.

    ```javascript
    cy.get('[data-testid="welcome-message"]').should('have.text', 'Welcome back!');
    ```

    **Alternative:**  
    Use `contains()` for partial match, or `.should('include.text', 'Welcome')`.

    ---
    **5. `should('include.text', 'partial text')`**
    Verifies that the element contains a substring (not exact match required).

    ```javascript
    cy.get('.alert').should('include.text', 'Error');
    ```
    
    ---
    **6. `should('have.value', 'text')`**
    Checks the value of input fields.

    ```javascript
    cy.get('[data-testid="email-input"]').should('have.value', 'user@example.com');
    ```

    **Use when:** You want to confirm that a field was filled correctly.

    ---
    **7. `should('be.checked')` / `should('not.be.checked')`**
    Used for checkboxes or radio buttons.

    ```javascript
    cy.get('#terms-checkbox').should('be.checked');
    ```

    ---
    **8. `should('be.disabled')` / `should('be.enabled')`**
    Ensures that form elements are active/inactive as expected.

    ```javascript
    cy.get('[data-testid="submit-btn"]').should('be.disabled');
    ```

    ---
    **9. `should('have.class', 'class-name')`**
    Asserts that the element has a specific class applied.

    ```javascript
    cy.get('button').should('have.class', 'active');
    ```

    ---
    **10. `should('have.attr', 'attribute', 'value')`**
    Asserts that an element has a specific attribute with a value.

    ```javascript
    cy.get('a').should('have.attr', 'href', '/dashboard');
    ```

    Also useful for checking presence of `data-*` attributes or `target`, `src`, `disabled`, etc.

    ----
    **11. `should('have.length', number)`**
    Checks how many elements were returned by `cy.get()`.

    ```javascript
    cy.get('.list-item').should('have.length', 5);
    ```

    **Use when:** You want to check if a list contains the expected number of items.

    ---
    **12. `should('match', /regex/)`**
    Asserts that the string matches a regular expression.

    ```javascript
    cy.get('[data-testid="email"]').invoke('text').should('match', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    ```


    Use `expect()` inside a `.then()` block when working with logic or custom data:

    ```javascript
    cy.get('#price').then(($el) => {
      const price = parseFloat($el.text().replace('€', ''));
      expect(price).to.be.lessThan(100);
    });
    ```


- **Should Style:**  
  - **Pros:**  
    - Very readable and expressive (e.g., `should('be.visible')`).
    - Supports chaining multiple assertions in a natural, fluent syntax.
    - Automatically retries assertions when used with Cypress commands.
  - **Cons:**  
    - Requires extending object prototypes, which may not be preferred in all environments.
- **Expect Style:**  
  - **Pros:**  
    - Clear function-based syntax that many developers find familiar.
    - No need to extend prototypes.
  - **Cons:**  
    - When used with Cypress commands, it does not auto-retry since it’s usually used inside a `.then()` callback.
- **Assert Style:**  
  - **Pros:**  
    - More traditional and straightforward, similar to assertions in other languages.
  - **Cons:**  
    - Can be less readable and requires more boilerplate code.


#### **C. Common Assertion Methods in Cypress**
- **Visibility and Existence:**
  - `should('be.visible')`, `should('exist')`, `should('not.exist')`
- **Content Validation:**
  - `should('have.text', 'expected text')`
  - `should('contain', 'partial text')`
- **Attribute Checks:**
  - `should('have.attr', 'attributeName', 'value')`
- **CSS and Style Checks:**
  - `should('have.css', 'property', 'value')`
- **State Checks:**
  - `should('be.disabled')`, `should('be.enabled')`, `should('be.checked')`

#### **D. Advanced Assertions**
- **Multiple Assertions:**
  - Chain multiple `should()` commands for comprehensive validation.
  - Example: Check that an element is visible and contains specific text.
- **Conditional Assertions:**
  - Use `.then()` to perform assertions based on dynamic content or conditions.
- **Custom Assertions:**
  - Define custom assertion logic when the built-in ones are insufficient.


##### **Multiple Assertions and Chaining Assertions**

**Chaining Assertions with `should()`:**
- **Example:**
  ```javascript
  cy.get('[data-testid="username-input"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Enter your username')
    .and(($input) => {
      // Custom check to ensure the input is empty by default
      expect($input.val()).to.equal('');
    });
  ```
- **Explanation:**  
  The above chain:
  - Verifies the element is visible.
  - Checks that the placeholder attribute has the expected value.
  - Performs a custom assertion to ensure the input value is empty.
  
**Multiple Assertions in a Single Command:**
- Using multiple `should()` calls or chaining with `and()` allows you to confirm several conditions on the same element without re-querying the DOM, which is efficient and improves readability.


### **Why Use `should()` Instead of `expect()` in Cypress**

- **Auto-Retry Mechanism:**
  - **`should()`** is integrated with Cypress’s retry-ability. If an assertion fails initially because of a temporary state (like an element loading asynchronously), Cypress will automatically retry the assertion until it passes or the timeout is reached.
  - **`expect()`** is used within `.then()` blocks, meaning it executes only once. If the element isn’t in the expected state at that moment, the test fails immediately.
  
- **Chainability:**
  - `should()` allows for chaining multiple assertions on the same subject, reducing the need for repeated DOM queries and making tests more concise.
  
- **Readability:**
  - The fluent, natural language style of `should()` makes the test assertions easy to read and understand at a glance.

- **Consistency with Cypress Commands:**
  - Using `should()` directly on Cypress commands integrates seamlessly with the Cypress command queue, ensuring that assertions are retried along with command execution.

**Example Comparison:**

Using **`should()`** (preferred):
```javascript
cy.get('[data-testid="submit-button"]')
  .should('be.visible')
  .and('not.be.disabled');
```

Using **`expect()`** (less ideal in Cypress context):
```javascript
cy.get('[data-testid="submit-button"]').then(($btn) => {
  expect($btn).to.be.visible;
  expect($btn).to.not.be.disabled;
});
```
- In the second example, if the button is not visible immediately, the test fails without retrying.


#### **E. Best Practices for Assertions and Validations**
- **Clear and Descriptive Assertions:**
  - Write assertions that clearly explain what they are checking.
  - Use custom messages or additional logging if necessary.
  - Write assertions that clearly state what you expect to happen.  
     _Example:_  
     ```javascript
     cy.get('[data-testid="error-message"]')
       .should('be.visible')
       .and('contain', 'Invalid credentials');
     ```
   - Avoid ambiguous or overly complex assertions that mix multiple checks without clear separation.

- **Granular Testing:**
  - Test one condition per assertion when possible. This helps in pinpointing failures.
  - Prefer testing one condition per assertion when possible to isolate issues.  
     However, when conditions are related (e.g., element visibility and content), chaining with `should()` is appropriate.
- **Avoid Overlapping Assertions:**
  - Ensure assertions are logically separated to avoid confusion when debugging failures.
  - Don’t assert the same condition in multiple ways within a single test step; instead, ensure each assertion has a unique purpose.

- **Leverage Cypress’s Retry-ability:**
  - Cypress automatically retries assertions until they pass or time out, so write assertions that are resilient to timing issues.
- **Use Proper Chaining:**
  - Chain assertions to reduce code redundancy and improve readability.

---

### **2. Code Examples**

#### **A. Basic Assertions Using `should`**

```javascript
// Verify that the login button is visible and enabled
cy.get('[data-testid="login-button"]')
  .should('be.visible')
  .and('not.be.disabled');
```

#### **B. Asserting Text Content**

```javascript
// Check if a success message contains the expected text
cy.get('[data-testid="success-message"]')
  .should('be.visible')
  .and('contain', 'Login successful');
```

#### **C. Checking Element Attributes**

```javascript
// Verify that an image element has the correct src attribute
cy.get('[data-testid="hero-image"]')
  .should('have.attr', 'src', 'images/hero.jpg');
```

#### **D. Using `expect` for Assertions**

```javascript
// Using expect for variable-based assertions
cy.get('[data-testid="user-count"]').then(($count) => {
  const countText = $count.text();
  expect(parseInt(countText)).to.be.greaterThan(0);
});
```

#### **E. Chaining Multiple Assertions**

```javascript
// Chain assertions to check multiple conditions on a form input
cy.get('[data-testid="username-input"]')
  .should('be.visible')
  .and('have.attr', 'placeholder', 'Enter your username')
  .and(($input) => {
    // Custom assertion to check if the input is not empty after typing
    expect($input.val()).to.not.be.empty;
  });
```

#### **F. Conditional Assertions with `.then()`**

```javascript
// Using .then() to assert conditionally based on dynamic content
cy.get('[data-testid="error-message"]').then(($el) => {
  if ($el.is(':visible')) {
    expect($el).to.contain('Invalid credentials');
  } else {
    cy.log('Error message not visible, test may have passed.');
  }
});
```

---

### **3. Potential Student Questions**

1. **What is the difference between `should` and `expect` in Cypress?**
   - **Answer:**  
     `should()` is a chainable command that automatically retries until the assertion passes, while `expect()` is used for one-time assertions within a `.then()` block.

2. **How does Cypress handle assertions if elements take time to load?**
   - **Answer:**  
     Cypress automatically retries assertions until they pass or until the default timeout is reached, ensuring asynchronous elements are handled gracefully.

3. **Can I write custom assertions in Cypress?**
   - **Answer:**  
     Yes, you can write custom assertions within `.then()` blocks to handle complex validation logic.

4. **Why should I avoid overlapping assertions?**
   - **Answer:**  
     Overlapping assertions can make it harder to pinpoint which condition failed. Keeping them separate makes debugging and maintaining tests easier.

5. **What happens if an assertion fails?**
   - **Answer:**  
     Cypress will stop executing the test and log an error, providing details about the failure, including snapshots and logs for debugging.

---

### **4. Additional Recommendations**

- **Interactive Debugging:**
  - Encourage students to use Cypress's interactive Test Runner to observe how assertions are retried.
- **Group Exercises:**
  - Pair up students to write test cases that include multiple assertions and discuss the logic behind each one.
- **Documentation Review:**
  - Have students explore the [Cypress Assertions Documentation](https://docs.cypress.io/guides/references/assertions) for further learning.
