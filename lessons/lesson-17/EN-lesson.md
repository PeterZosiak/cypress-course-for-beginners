## **Lesson 17: Real World Cypress Problems and Solutions – Examples from Practical World**

### **Objectives**

- Identify common challenges in using Cypress for end-to-end testing in real-world applications.
- Provide practical solutions and strategies to handle dynamic content, asynchronous behavior, flaky tests, and complex interactions.
- Share best practices for writing maintainable, scalable, and reliable tests.
- Present real-world case studies and examples, and engage in hands-on activities to troubleshoot and refactor problematic tests.

---

### **Content Breakdown**

#### **A. Common Cypress Challenges**

1. **Handling Dynamic Content and Asynchronous Behavior**
   - **Problem:**  
     Many web applications update the UI dynamically, which can result in elements not being immediately available when a test expects them.
   - **Challenges:**  
     - Waiting for elements to appear.
     - Ensuring that asynchronous API calls and animations complete before assertions.
     - Dealing with inconsistent element states.

2. **Dealing with Flaky Tests and Ensuring Test Reliability**
   - **Problem:**  
     Flaky tests are tests that sometimes pass and sometimes fail without changes in the code, often due to timing issues, network delays, or unstable selectors.
   - **Challenges:**  
     - Inconsistent timing for element rendering.
     - Transient network conditions.
     - Environmental differences in local vs. CI environments.

3. **Managing Complex User Interactions and Stateful Applications**
   - **Problem:**  
     Applications with complex workflows, multiple states, or nested components can be difficult to test reliably.
   - **Challenges:**  
     - Simulating multi-step user interactions (e.g., drag-and-drop, nested modals).
     - Maintaining application state across tests.
     - Handling interactions that depend on data from multiple sources or API responses.

---

#### **B. Practical Solutions and Strategies**

1. **Effective Waiting Strategies**
   - **cy.wait():**  
     Use `cy.wait()` to pause execution for a fixed amount of time if necessary.  
     **Example:**  
     ```javascript
     cy.wait(1000); // Wait for 1 second
     ```
   - **Smart Assertions:**  
     Leverage Cypress’s automatic retry mechanism by asserting for the presence or state of elements.  
     **Example:**  
     ```javascript
     cy.get('[data-testid="dynamic-element"]').should('be.visible');
     ```
   - **Custom Waits with cy.waitUntil:**  
     Use the `cypress-wait-until` plugin to wait for a condition to be true.  
     **Example:**  
     ```javascript
     cy.waitUntil(() => cy.get('[data-testid="status"]').should('contain', 'Ready'));
     ```

   - **Why Avoid Explicit `cy.wait()`**
    **1. Test Brittleness and Unpredictability:**

    - **Fixed Delays Are Arbitrary:**  
      Explicitly waiting for a fixed duration (e.g., `cy.wait(2000)`) assumes that the application will always be ready after that time. In real-world scenarios, network latency, server response times, or client-side rendering can vary. This can lead to tests that sometimes pass and sometimes fail—making them flaky.

    - **Wasted Time:**  
      Fixed waits unnecessarily extend test execution time even when the application is ready sooner. For instance, if an element loads in 500ms but you wait 2000ms, you’re wasting valuable test time.

    **2. Better Alternatives:**

    - **Timeouts in Assertions:**  
      Cypress’s built‑in assertions like `.should()` include an implicit retry mechanism. When you assert an element is visible with `.should('be.visible')`, Cypress keeps checking until the element appears or the default timeout expires.  
      **Example:**
      ```javascript
      // Cypress will retry this assertion until the element is visible or 4 seconds (default) pass.
      cy.get('[data-testid="login-button"]').should('be.visible');
      ```

    - **cy.waitUntil() Plugin:**  
      The `cypress-wait-until` plugin offers a more dynamic waiting mechanism by repeatedly checking for a condition until it is met. This avoids the arbitrary delay of `cy.wait()` and makes tests more robust.
      **Example:**
      ```javascript
      // Wait until the status element contains the text "Ready"
      cy.waitUntil(() => cy.get('[data-testid="status"]').should('contain', 'Ready'), {
        timeout: 10000,  // Wait up to 10 seconds
        interval: 500,   // Check every 500ms
      });
      ```

2. **Reducing Flakiness with Intelligent Selectors and Retries**
   - **Intelligent Selectors:**  
     Use stable selectors like `data-testid` or `data-cy` to avoid relying on fragile CSS classes or element positions.
   - **Retries:**  
     Configure test retries in Cypress to automatically re-run flaky tests.  
     **Example (global in cypress.config.js):**
     ```javascript
     retries: {
       runMode: 2,
       openMode: 0,
     }
     ```
   - **Timeout Adjustments:**  
     Increase default timeouts when interacting with slow-loading elements or external APIs.

3. **Managing Application State**

2. **cy.session: Managing Sessions Across Tests**
   - **Purpose:**  
     `cy.session` caches and restores the state (like cookies, localStorage) to reduce the need for repetitive setup (such as logging in) across multiple tests.
   - **Example Usage:**
     ```javascript
     // Example: Using cy.session to cache login state
     cy.session('loginSession', () => {
       cy.visit('/login');
       cy.get('[data-testid="login-username-input"]').type('demoUser');
       cy.get('[data-testid="login-password-input"]').type('demoPass');
       cy.get('[data-testid="login-submit-button"]').click();
       cy.get('[data-testid="login-success-message"]').should('be.visible');
     });
     
     // Later in tests, the session is automatically restored
     cy.visit('/dashboard');
     ```
   - **Benefits:**  
     Speeds up tests by avoiding re-login; ensures consistent test state.

    #### Importance of `cy.session()` from Performance perspective

    **What is `cy.session()`?**  
    `cy.session()` caches and restores session state (e.g., cookies, localStorage, sessionStorage) across tests. This is particularly useful in multidomain testing and performance optimization.

    **Importance in Multidomain Testing:**

    - **Consistent Session Across Domains:**  
      When your tests require a login or session state that spans multiple domains, `cy.session()` can help preserve the authenticated state. For example, if your application’s authentication occurs on one domain and the user is then redirected to another domain, caching the session can simplify test setup.

    - **Reduced Setup Overhead:**  
      Instead of logging in before every test, `cy.session()` allows you to set up a session once and then reuse it. This is especially beneficial when dealing with multidomain scenarios where login actions might be complex.

    **Performance Perspective:**

    - **Faster Test Execution:**  
      By caching session data, tests run faster because repetitive login or setup actions are not re-executed for each test. This reduces overall test run time.
      
    - **Stability:**  
      Consistent session states across tests lead to fewer flaky tests caused by inconsistent login flows or network delays.

    **Example Usage of `cy.session()` in a Multidomain Scenario:**

    ```javascript
    describe('Dashboard Tests with Session Management', () => {
      // Create a session that caches the login process including the multidomain flow.
      beforeEach(() => {
        cy.session('loginSession', () => {
          // Visit main application login page
          cy.visit('/login');
          cy.get('[data-testid="login-with-oauth"]').click();

          // Use cy.origin to handle external authentication
          cy.origin('https://auth.example.com', () => {
            cy.get('[data-testid="auth-username"]').type('externalUser');
            cy.get('[data-testid="auth-password"]').type('externalPass');
            cy.get('[data-testid="auth-submit"]').click();
          });

          // Verify we land on dashboard after authentication
          cy.url().should('include', '/dashboard');
          cy.get('[data-testid="welcome-message"]').should('contain', 'Welcome');
        });
      });

      it('should display dashboard elements using cached session', () => {
        cy.session('loginSession'); // Restore the session
        cy.visit('/dashboard');
        cy.get('[data-testid="dashboard-title"]').should('be.visible');
      });
    });
    ```
   - **cy.session():**  
     Use `cy.session()` to cache login sessions or any repetitive setup steps. This reduces redundant operations and ensures consistency across tests.
     ```javascript
     cy.session('userSession', () => {
       cy.visit('/login');
       cy.login('demoUser', 'demoPass');
       cy.get('[data-testid="login-success-message"]').should('be.visible');
     });
     ```
   - **Custom Commands:**  
     Abstract complex interactions into custom commands so that you centralize state management logic.
     ```javascript
     Cypress.Commands.add('login', (username, password) => {
       cy.get('[data-testid="login-username-input"]').clear().type(username);
       cy.get('[data-testid="login-password-input"]').clear().type(password);
       cy.get('[data-testid="login-submit-button"]').click();
     });
     ```

4. **Handling Complex User Interactions**
   - **cy.origin():**  
     For multidomain or cross-origin interactions, use `cy.origin()` to switch context.  
     **Example:**
     ```javascript
     cy.origin('https://external.example.com', () => {
       cy.get('[data-testid="external-element"]').should('be.visible');
     });
     ```

---

#### **C. Best Practices**

1. **Write Maintainable and Scalable Tests**
   - Use modular test structures (e.g., nested describe blocks).
   - Keep tests independent and stateless wherever possible.
   - Group similar tests into contexts and use custom commands for common actions.

2. **Organize Test Code for Readability and Reuse**
   - Separate test logic from utility functions.
   - Use meaningful names for tests, contexts, and custom commands.
   - Maintain a clear directory structure for test files, custom commands, and fixtures.

3. **Leverage Cypress Features**
   - Use Cypress’s built‑in retry-ability and wait mechanisms to handle dynamic content.
   - Take advantage of Cypress plugins (like cypress-wait-until, cypress-drag-drop, cypress-axe, etc.) to cover specific testing needs.
   - Configure global settings (e.g., baseUrl, timeouts, retries) appropriately to improve test stability.

---

#### **D. Case Studies and Real-World Examples**

1. **Handling Dynamic Content:**
   - **Scenario:**  
     A page loads a list of items after an API call.
   - **Solution:**  
     Use smart assertions to wait for the list to render, and use retries if necessary.
   - **Example:**
     ```javascript
     cy.get('[data-testid="item-list"]').should('be.visible');
     ```

2. **Flaky Test Due to Slow Network:**
   - **Scenario:**  
     An API call sometimes takes longer than expected.
   - **Solution:**  
     Increase timeout for that specific command or use a custom wait function.
   - **Example:**
     ```javascript
     cy.get('[data-testid="status"]').should('contain', 'Loaded', { timeout: 10000 });
     ```

3. **Complex Interaction (Multidomain Login):**
   - **Scenario:**  
     A user logs in on one domain and is redirected to another.
   - **Solution:**  
     Use `cy.origin()` to switch domain context, and use `cy.session()` to preserve authentication state.
   - **Example:**
     ```javascript
     cy.session('loginSession', () => {
       cy.visit('/login');
       cy.login('demoUser', 'demoPass');
       cy.get('[data-testid="login-success-message"]').should('be.visible');
     });
     
     cy.origin('https://external.example.com', () => {
       cy.visit('/external-dashboard');
       cy.get('[data-testid="external-dashboard"]').should('be.visible');
     });
     ```

---

#### **E. Hands-On Activities**

1. **Analyze and Troubleshoot Problems of students personal project:**
   - Open disscusion to demonstrate and solve problems on students personal project.

---

#### **F. Additional Resources**

- **Cypress Best Practices Documentation:**  
  [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- **Case Study Examples:**  
  Look for community blog posts and GitHub repositories that document how teams overcame flaky tests and dynamic content issues.

---

### **Real-World Problems in Cypress Testing**

**1. Flaky Tests Due to Asynchronous Behavior:**

- **Issue:**  
  Tests sometimes fail because elements appear or change state at unpredictable times due to network latency or dynamic content updates.
- **Solution:**  
  Use implicit waits with assertions (e.g., `.should('be.visible')`) or `cy.waitUntil()` to dynamically wait for conditions rather than fixed delays.

**2. Race Conditions:**

- **Issue:**  
  When multiple asynchronous actions occur (e.g., simultaneous API calls), tests might assert state before all actions are completed.
- **Solution:**  
  Use `cy.intercept()` to wait for API responses (`cy.wait('@alias')`) and chain assertions after ensuring all relevant actions have completed.

**3. Element Selection Issues:**

- **Issue:**  
  Dynamic applications might change element identifiers, causing tests to fail if selectors are based on CSS classes or positions.
- **Solution:**  
  Use stable, dedicated selectors such as `data-testid` or `data-cy` attributes that are less likely to change.

**4. Session and State Management:**

- **Issue:**  
  Tests that depend on application state (like logged-in user sessions) might fail if the state isn’t properly reset or shared between tests.
- **Solution:**  
  Use `cy.session()` to cache and restore session data, ensuring tests have a consistent starting state.

**5. Handling Multiple Domains:**

- **Issue:**  
  Testing applications that span multiple domains can run into same-origin policy issues.
- **Solution:**  
  Utilize `cy.origin()` to safely interact with elements on external domains without breaking the same-origin policy.

**6. Environmental Variability:**

- **Issue:**  
  Differences between local, staging, and production environments can cause tests to behave inconsistently.
- **Solution:**  
  Use environment variables (configured in `.env` files and loaded via `VITE_` prefix) to manage configurations like `baseUrl`, credentials, and API endpoints. This keeps tests adaptable to different environments.

**7. Network Instability:**

- **Issue:**  
  Unpredictable network responses may cause API-dependent tests to be flaky.
- **Solution:**  
  Use `cy.intercept()` to stub network responses, ensuring consistent data for tests and reducing dependencies on external systems.

---

### **Potential Student Questions and Answers**

1. **Q:** *Why are tests flaky and how can we mitigate this?*  
   **A:** Tests can be flaky due to asynchronous content, network delays, or dynamic elements. Mitigate flakiness by using smart assertions, appropriate wait times, retries, and stable selectors. Using plugins like `cypress-wait-until` can also help manage dynamic conditions.

2. **Q:** *What is the importance of using cy.origin() in multidomain testing?*  
   **A:** `cy.origin()` allows you to execute commands on a different domain than your main application, enabling you to test flows that cross domain boundaries (such as third-party logins or external content) without running into same-origin policy issues.

3. **Q:** *How does cy.session() improve test performance in multidomain scenarios?*  
   **A:** `cy.session()` caches and restores session data (e.g., cookies and localStorage), reducing the need for repetitive logins or setup steps. This leads to faster tests and more reliable results, especially when interactions span multiple domains.

4. **Q:** *What are the best practices for organizing tests to avoid flakiness?*  
   **A:** Write modular tests using nested describe blocks, use stable selectors (data-testid), set appropriate timeouts, and leverage retries. Keeping tests isolated and independent also minimizes interference between tests.

5. **Q:** *What role do plugins play in solving real-world Cypress challenges?*  
   **A:** Plugins can add capabilities (like advanced waiting, accessibility checks, or enhanced logging) that help overcome common issues such as dynamic content and flaky tests. They reduce boilerplate code and can make tests more robust.

6. **Q:** *How do you decide when to use cy.wait() vs. smarter strategies like cy.waitUntil()?*  
   **A:** Use `cy.wait()` for fixed delays in predictable scenarios. For dynamic content, `cy.waitUntil()` or chaining assertions with built-in retryability are preferred because they wait until a condition is met without unnecessarily delaying the test.
