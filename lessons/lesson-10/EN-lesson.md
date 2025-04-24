## **Lesson 10: Structuring Test Suites and Test Cases**

### **Objectives**
- Organize tests using best practices for maintainability and scalability.
- Leverage Cypress commands to build clean, reusable test code.
- Implement proper setup and teardown procedures.
- Use tagging and naming conventions to categorize tests for selective execution.

---

### **Content Breakdown**

#### **A. Organizing Tests**
- **Using `describe()` and `it()` Blocks:**
  - **`describe()` Block:**  
    Used to group related tests into a test suite. Helps in logically organizing tests by feature or functionality.
    - **Example:**
      ```javascript
      describe('Login Functionality', () => {
        // Test cases related to login functionality go here.
      });
      ```
  - **`it()` Block:**  
    Defines an individual test case that asserts a specific behavior.
    - **Example:**
      ```javascript
      it('should successfully log in with valid credentials', () => {
        // Test steps and assertions.
      });
      ```
- **Grouping Related Tests:**
  - Organize tests by user journeys (e.g., login, registration, dashboard) or by functionality.
  - Use nested `describe()` blocks if needed to create subgroups for more granular organization.

##### **Example of Nested describe() Blocks**

Nested describe blocks help further group and organize tests, especially when dealing with complex user journeys or different aspects of the same feature.

**Example:**
```javascript
describe('User Account', () => {
  describe('Login Functionality', () => {
    it('should log in successfully with valid credentials', () => {
      // Test logic for login
    });

    it('should display an error with invalid credentials', () => {
      // Test logic for error case
    });
  });

  describe('Registration Functionality', () => {
    it('should register a new user with valid details', () => {
      // Test logic for registration
    });

    it('should display errors for missing fields', () => {
      // Test logic for validation errors
    });
  });
});
```

##### **Correct Naming Conventions for describe() and it()**

**Naming conventions** should be clear, descriptive, and follow a consistent pattern. A good practice is to use natural language to describe what is being tested and the expected outcome.

- **describe() Block Names:**  
  Use a noun or feature name that clearly identifies the subject of the tests.
  
  **Examples:**
  - `describe('Login Functionality', () => { ... })`
  - `describe('User Registration', () => { ... })`
  - `describe('Shopping Cart Operations', () => { ... })`

- **it() Block Names:**  
  Use a sentence or phrase that states the expected behavior. Incorporate the Arrange-Act-Assert (AAA) pattern in test names when possible.
  
  **Examples:**
  - `it('should display the welcome message when login is successful', () => { ... })`
  - `it('should show an error when required fields are missing during registration', () => { ... })`
  - `it('should add an item to the cart and update the total price accordingly', () => { ... })`

##### **Using AAA (Arrange-Act-Assert) in Tests and Test Names**

**AAA Pattern:**  
The AAA pattern structures tests into three clear phases:

- **Arrange:** Set up the test scenario, initialize data, and prepare the environment.
- **Act:** Execute the action that you want to test.
- **Assert:** Verify that the outcome matches the expected result.

**In Test Names:**  
Including hints of AAA in test names can clarify intent:
- **Example Test Name:**  
  `it('arranges valid login data, acts by submitting the form, and asserts that the welcome message is displayed', () => { ... })`

**Example Test Using AAA:**
```javascript
it('should log in successfully with valid credentials', () => {
  // Arrange
  const validUsername = 'demoUser';
  const validPassword = 'demoPass';

  // Act
  cy.get('[data-testid="username-input"]').type(validUsername);
  cy.get('[data-testid="password-input"]').type(validPassword);
  cy.get('[data-testid="login-button"]').click();

  // Assert
  cy.get('[data-testid="login-success-message"]').should('be.visible');
});
```

#### **B. Setup and Teardown Methods**
- **Hooks Overview:**
  - **`before()` Hook:**  
    Runs once before all tests in a `describe()` block.
  - **`beforeEach()` Hook:**  
    Runs before each individual test case, useful for resetting state or navigating to a common starting point.
  - **`after()` Hook:**  
    Runs once after all tests in a `describe()` block, often used for cleanup.
  - **`afterEach()` Hook:**  
    Runs after each test case, useful for resetting changes made during a test.
- **Practical Uses:**
  - **Preconditions:**  
    Setting up test data or logging in a user before running tests.
  - **Cleanup:**  
    Resetting data or clearing session storage to ensure tests are isolated.
  - **Example:**
    ```javascript
    describe('User Login', () => {
      before(() => {
        // Runs once before all tests
        cy.log('Starting Login Test Suite');
      });

      beforeEach(() => {
        // Navigate to login page before each test
        cy.visit('/login');
      });

      afterEach(() => {
        // Clear local storage or cookies if needed
        cy.clearCookies();
      });

      after(() => {
        cy.log('Login Test Suite completed');
      });
      
      it('should log in successfully with valid credentials', () => {
        // Test code
      });
    });
    ```

#### **C. Tagging and Categorizing Tests**
- **Using Naming Conventions:**
  - Prefix or suffix test titles to indicate their category (e.g., `@smoke`, `@regression`, `@login`).
  - **Example:**
    ```javascript
    describe('User Login @smoke', () => { ... });
    ```
- **Cypress Plugins for Tagging:**
  - **Cypress-Grep:**  
    Use this plugin to filter tests by tags during execution.
    - **Installation:**  
      ```bash
      npm install cypress-grep --save-dev
      ```
    - **Usage:**  
      Run tests with a specific tag:
      ```bash
      npx cypress run --env grep=@login
      ```
  - **Custom Tagging:**  
    Use comments or custom metadata if needed to further organize tests.

#### **D. Cypress Custom Commands Functionality**
- **Built-In Cypress Commands:**
  - Commands like `cy.visit()`, `cy.get()`, `cy.click()`, `cy.type()`, and more are used to interact with the application.
  - **Example:**
    ```javascript
    cy.visit('/login');
    cy.get('[data-testid="username-input"]').type('demoUser');
    cy.get('[data-testid="password-input"]').type('demoPass');
    cy.get('[data-testid="login-button"]').click();
    ```

- **Custom Commands:**

  ##### **Cypress Custom Commands**

  **What Are Custom Commands?**  
  Custom commands in Cypress are functions you define (typically in `cypress/support/commands.js`) that encapsulate repetitive actions or complex logic. They help reduce duplication, simplify test code, and promote reusability.

  **Advantages:**
  - **Reusability:**  
    Write once and reuse the command across multiple tests.
  - **Readability:**  
    Custom commands create higher-level abstractions that make tests more understandable.
  - **Maintainability:**  
    Updates to common functionality need to be made only in one place.

  **Disadvantages:**
  - **Abstraction Overhead:**  
    Overusing custom commands or creating overly abstract commands can make tests harder to debug.
  - **Potential for Hidden Logic:**  
    If the custom command encapsulates too much logic, it may be unclear what’s actually happening in the test case.

  **Example of Defining Custom Commands:**

  In **cypress/support/commands.js**:
  ```javascript
  // Custom command for logging in
  Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-testid="username-input"]').clear().type(username);
    cy.get('[data-testid="password-input"]').clear().type(password);
    cy.get('[data-testid="login-button"]').click();
  });

  // Custom command for registering a new user
  Cypress.Commands.add('registerUser', (user) => {
    cy.get('[data-testid="reg-username-input"]').clear().type(user.username);
    cy.get('[data-testid="reg-email-input"]').clear().type(user.email);
    cy.get('[data-testid="reg-password-input"]').clear().type(user.password);
    cy.get('[data-testid="reg-submit-button"]').click();
  });
  ```

  **Usage in Tests:**
  ```javascript
  describe('User Authentication', () => {
    it('should log in successfully', () => {
      // Using the custom login command
      cy.login('demoUser', 'demoPass');
      cy.get('[data-testid="login-success-message"]').should('be.visible');
    });

    it('should register a new user', () => {
      const user = {
        username: 'newUser',
        email: 'newuser@example.com',
        password: 'newPassword123'
      };

      // Using the custom registration command
      cy.registerUser(user);
      cy.get('[data-testid="reg-success-message"]').should('be.visible');
    });
  });
  ```

  **Additional Custom Commands Benefits:**
  - **Encapsulation:**  
    Encapsulate common UI interactions, reducing code repetition.
  - **Abstraction:**  
    Abstract away low-level Cypress commands to focus on higher-level test logic.
  - **Simplified Maintenance:**  
    When application changes require updates, you can adjust the custom command rather than every test that performs the same action.

  - Extend Cypress functionality by adding custom commands in the `cypress/support/commands.js` file.
  - **Example:**
    ```javascript
    // In cypress/support/commands.js
    Cypress.Commands.add('login', (username, password) => {
      cy.get('[data-testid="username-input"]').type(username);
      cy.get('[data-testid="password-input"]').type(password);
      cy.get('[data-testid="login-button"]').click();
    });
    // Usage in tests:
    cy.login('demoUser', 'demoPass');
    ```
- **Best Practices:**
  - Keep test commands descriptive and maintainable.
  - Use custom commands to reduce repetition and centralize logic.
  - Ensure that each command's purpose is clear to anyone reading the test.

#### **E. Testing Structure for Cypress Projects**

**Best Practices:**

- **Directory Structure:**
  - **cypress/fixtures:** Contains external data files (JSON, etc.) for test data.
  - **cypress/e2e:** Houses all test spec files organized by feature (e.g., login.spec.js, registration.spec.js).
  - **cypress/plugins:** Contains plugins or modifications to Cypress’s default behavior.
  - **cypress/support:**  
    - **commands.js:** Where custom commands are defined.
    - **index.js:** Global configuration and setup code for Cypress tests.
  
- **Organizing Tests:**
  - Group tests using `describe()` blocks by feature or module.
  - Use nested `describe()` blocks for sub-features.
  - Consistently use naming conventions for test files (e.g., login.spec.js for login-related tests).
  
- **Environment Configuration:**
  - Use a configuration file (cypress.config.js) to manage settings like baseUrl, timeouts, and environment variables.
  - Separate environment-specific tests with naming conventions or plugins like Cypress-grep.
  
- **Maintainability and Reusability:**
  - Write custom commands to reduce duplication.
  - Use fixtures to externalize test data, keeping tests clean and focused.
  - Follow the AAA (Arrange-Act-Assert) pattern for clarity in test structure.

- **Example Directory Layout:**
  ```
  cypress/
  ├── fixtures/
  │   └── users.json
  ├── integration/
  │   ├── login.spec.js
  │   └── registration.spec.js
  ├── plugins/
  │   └── index.js
  └── support/
      ├── commands.js
      └── index.js
  ```
---

### **Hands-On Activities**

1. **Structure Tests with `describe()` and `it()`:**
   - Create a sample test suite for a login feature.
   - Group tests into separate blocks (e.g., valid login, invalid login).
   
2. **Implement Setup and Teardown Hooks:**
   - Write tests that use `before()`, `beforeEach()`, `after()`, and `afterEach()` to manage test state.
   - Example activity: Log messages or set up conditions (like navigating to the login page) before each test.

3. **Tag and Filter Tests:**
   - Use naming conventions or tags (e.g., `@smoke`, `@regression`) in test titles.
   - Configure and demonstrate running tests with Cypress-grep plugin.
   
4. **Custom Commands:**
   - Create a custom command (e.g., `cy.login()`) and use it across multiple test cases.
   - Refactor existing test code to use this custom command.

---

### **Resources**

- **Cypress Documentation:**
  - [Cypress Testing Structure](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
  - [Cypress Commands](https://docs.cypress.io/api/commands)
- **Example Test Suites:**
  - Look for sample projects on GitHub that showcase well-organized Cypress tests.
- **Cypress-Grep Plugin:**
  - [Cypress-Grep GitHub Repository](https://github.com/cypress-io/cypress-grep)
