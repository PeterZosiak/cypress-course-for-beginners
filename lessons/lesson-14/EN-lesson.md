## **Lesson 14: Using baseUrl and Contexts in Cypress**

### **Objectives**

- Utilize the `baseUrl` configuration to simplify test navigation and relative URL usage.
- Understand and organize tests using contexts to manage different scenarios.
- Leverage advanced Cypress commands like `cy.origin` for handling multiple domains
- Implement best practices for test structure and maintainability.

---

### **Content Breakdown**

#### **A. baseUrl**

1. **Setting baseUrl in Cypress Configuration:**
   - **Definition:**  
     `baseUrl` is a configuration setting in Cypress that defines a root URL for all your tests. This enables you to use relative URLs in commands like `cy.visit('/')`.
   - **Example:**
     ```javascript
     // cypress.config.js
     import { defineConfig } from 'cypress';

     export default defineConfig({
       e2e: {
         baseUrl: 'http://localhost:3000',
         // Other settings…
       },
     });
     ```

2. **Benefits of Using baseUrl:**
   - **Simplification:**  
     Avoid repeating full URLs in tests; use relative paths.
   - **Flexibility:**  
     Easily switch between environments by overriding baseUrl (e.g., development, staging, production).
   - **Maintainability:**  
     Centralizes URL configuration; if the host changes, update one file.

3. **Overriding baseUrl for Different Environments:**
   - Use environment variables or separate configuration files to change the baseUrl.
   - **Example:**
     ```javascript
     // In cypress.config.js using loadEnv (see Lesson 12)
     import { defineConfig, loadEnv } from 'vite';
     export default defineConfig(({ mode }) => {
       const env = loadEnv(mode, process.cwd(), ['VITE_']);
       return {
         e2e: {
           baseUrl: env.VITE_API_BASE_URL || 'http://localhost:3000',
           // other settings...
         }
       };
     });
     ```
   - With different .env files (e.g., `.env.development`, `.env.production`), the baseUrl can be switched accordingly.

---

#### **B. Contexts in Cypress**

1. **Understanding Cypress Contexts:**
   - **Definition:**  
     Contexts (or logical groupings) are used to organize tests that share a common setup or belong to a specific user scenario.
     
    
   - **Usage:**  
     While Cypress doesn’t have a built‑in context function (as `context()` is just an alias for `describe()`), you can use nested `describe()` blocks to create meaningful groups.

2. **Using Contexts to Manage Different Test Scenarios:**
   - **Example:**  
     Group tests based on different application states or flows (e.g., "When user is logged in", "When user is not logged in").
   - **Nested describe Example:**
     ```javascript
     describe('Login Page @login', () => {
       beforeEach(() => {
         cy.visit('/');
       });

       describe('Validation Errors', () => {
         it('should display error when username is missing', () => {
           // Test code
         });
         it('should display error when password is missing', () => {
           // Test code
         });
       });

       describe('Successful Login', () => {
         it('should log in successfully with valid credentials', () => {
           // Test code
         });
       });
     });
     ```

      In the Cypress world, a test context usually refers to the test’s execution environment — this includes:
        - the JavaScript scope Cypress runs your code in,
        - the domain (origin) of the page you're visiting,
        - the browser state like cookies, localStorage, sessions, and even variables in memory.
---

## Multidomain Testing in Cypress

##### **What is Multidomain Testing?**

Multidomain testing refers to scenarios where your application spans more than one domain or subdomain. This is common when your application:

- Uses third-party authentication (e.g., OAuth providers, social logins).
- Has separate domains for the main application and the API.
- Needs to interact with external services or widgets hosted on a different domain.

### **Challenges in Multidomain Testing**

- **Same-Origin Policy:**  
  Browsers restrict JavaScript from accessing resources across different domains. This can make it difficult to test interactions between pages on different domains.
  
- **Session Management:**  
  Maintaining and verifying session state across domains can be challenging, as cookies and localStorage might not be shared across domains by default.

- **Consistent Data Flow:**  
  Ensuring that data from one domain flows correctly to another (for example, when a login on one domain grants access on another) requires special handling in tests.


#### **C. Advanced Cypress Commands: cy.origin and cy.session**

1. **cy.origin: Handling Multiple Domains**
   - **Purpose:**  
     `cy.origin` allows you to execute commands in the context of a different origin (domain). This is useful when your application interacts with multiple domains (e.g., authentication from a third-party provider).
   - **Example Usage:**
     ```javascript
     // Example: Navigate to an external domain to perform an action
     cy.origin('https://external-domain.com', () => {
       cy.get('[data-testid="external-login"]').click();
     });
     ```
   - **Benefits:**  
     Allows testing of cross-origin interactions while maintaining security boundaries.

    #### Importance of `cy.origin()` in Multidomain Testing

    **What is `cy.origin()`?**  
    `cy.origin()` is a Cypress command that lets you execute commands in the context of a different origin (domain) than your primary `baseUrl`. This is crucial for testing multidomain interactions.

    **Why It’s Important:**

    - **Bypassing Same-Origin Restrictions:**  
      It enables you to interact with elements or pages hosted on a different domain. Without `cy.origin()`, Cypress would throw errors when attempting to access resources on another domain.

    - **Realistic User Interactions:**  
      When a user is redirected to or interacts with a different domain (for instance, a payment gateway or OAuth provider), `cy.origin()` lets you simulate those interactions in your test.

    - **Seamless Integration:**  
      You can switch between domains within a single test, which allows you to verify the full user journey across different parts of your application.

    **Example Usage of `cy.origin()`:**

    Imagine your application requires authentication via a third-party service on `https://auth.example.com`, while your main application runs on `http://localhost:3000`.

    ```javascript
    // In your test file for multidomain login
    describe('Multidomain Login Test', () => {
      it('should handle login via a third-party authentication service', () => {
        // Visit your main application page
        cy.visit('/login');

        // Assume clicking a button redirects to an external authentication domain
        cy.get('[data-testid="login-with-oauth"]').click();

        // Use cy.origin() to switch context to the external authentication domain
        cy.origin('https://auth.example.com', () => {
          // Interact with the authentication page
          cy.get('[data-testid="auth-username"]').type('externalUser');
          cy.get('[data-testid="auth-password"]').type('externalPass');
          cy.get('[data-testid="auth-submit"]').click();
        });

        // Return to your main domain to verify login success
        cy.url().should('include', '/dashboard');
        cy.get('[data-testid="welcome-message"]').should('contain', 'Welcome');
      });
    });
    ```



### Additional Code Examples for Multidomain Testing

**Example: Switching Between Multiple Domains**

Imagine your test needs to visit a marketing site on a different domain after logging into your main application:

```javascript
describe('Multidomain Navigation', () => {
  it('should navigate from the main app to the marketing site', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-with-oauth"]').click();

    cy.origin('https://auth.example.com', () => {
      cy.get('[data-testid="auth-username"]').type('externalUser');
      cy.get('[data-testid="auth-password"]').type('externalPass');
      cy.get('[data-testid="auth-submit"]').click();
    });

    // Assume after login, user is taken to a marketing page on another domain
    cy.origin('https://marketing.example.com', () => {
      cy.visit('/special-offers');
      cy.get('[data-testid="offer-banner"]').should('be.visible');
    });
  });
});
```
---

#### **D. Activities**

1. **Configure baseUrl and Update Tests:**
   - **Task:**  
     Modify tests to use `cy.visit('/')` with the `baseUrl` configured in `cypress.config.js`. 
   - **Objective:**  
     Ensure tests use relative URLs and confirm the correct base URL is applied based on the environment.

3. **Experiment with cy.origin and cy.session:**
   - **Task:**  
     Write a test that navigates to a different domain using `cy.origin` (simulate external authentication).
   - **Objective:**  
     Demonstrate how to handle multi-domain scenarios and reduce setup overhead.

---

#### **E. Cypress Commands and Configuration Examples**

**Using baseUrl in a Test:**
```javascript
describe('Home Page Navigation', () => {
  it('should load the login page using relative URL', () => {
    cy.visit('/login'); // Resolves to baseUrl + /login
    cy.get('[data-testid="page-title"]').should('contain', 'Login');
  });
});
```

**Using cy.origin:**
```javascript
describe('Cross-Origin Login', () => {
  it('should perform login on external domain', () => {
    cy.origin('https://external.example.com', () => {
      cy.get('[data-testid="external-login"]').click();
    });
  });
});
```

---

### **Potential Student Questions and Answers**

1. **Q:** *How does baseUrl help simplify our tests?*  
   **A:** By setting a baseUrl in the configuration, you can use relative paths in `cy.visit()`, making your tests cleaner and easier to update when switching environments.

2. **Q:** *What are contexts in Cypress and why are they useful?*  
   **A:** Contexts, implemented with nested `describe()` blocks, allow you to group tests logically (e.g., by user scenario). They help keep your test suite organized and isolated, making it easier to maintain and debug.

3. **Q:** *What is the purpose of cy.origin?*  
   **A:** `cy.origin` allows you to execute commands in the context of a different domain. This is useful when testing cross-origin interactions, such as third-party authentication.

5. **Q:** *Can I override baseUrl for specific tests?*  
   **A:** While baseUrl is a global configuration, you can override it in individual tests using absolute URLs in `cy.visit()`. However, it’s best to use the global baseUrl for consistency unless you have a specific need to do otherwise.

6. **Q:** *What are some best practices for using contexts in Cypress?*  
   **A:** Organize tests into nested `describe()` blocks with clear, descriptive names. Use hooks (beforeEach/afterEach) to set up or clean up states within each context, ensuring tests remain isolated and maintainable.

---

### **Common Cross-domain problem**

```javascript
describe('Cypress lost value', () => {
  var value1
  var value2;
  
  it('10 - navigate and login to domain1 and save value to variable', () => {
    cy.visit('https://domain1.com');
    cy.loginDomain1().then((value) => {
      value1 = value
    })
    value2 = 100
  });

  it('20 - navigate and login to domain2 and with value1 variable', () => {
    cy.visit('https://domain2.com');
    cy.log(value2) 
    cy.loginDomain2(value1)
  })
});
```

#### Why Does Cypress Reset Everything When You Change the Domain?

This is rooted in **web browser security rules**:

##### What’s happening?

When you do something like:

```javascript
cy.visit('https://domain1.com');
// do something...
cy.visit('https://domain2.com');
// test fails or loses variables...
```

Cypress will **automatically reset the entire browser context** when the domain origin changes.

### 🔹 Why?

Because of **Same-Origin Policy (SOP)** in browsers:

* JavaScript from one origin (`https://domain1.com`) cannot directly interact with content on another origin (`https://domain2.com`).
* Cypress enforces this rule to protect the **consistency of your tests** and to avoid **leaking data or scope** across domains.

When Cypress detects an origin change:

* It **resets the test iframe**
* All **in-memory variables**, DOM, cookies, and JavaScript **scope is cleared**
* This ensures test isolation and security

---

#### Example: Why Variable is `undefined` on domain change

```javascript
let token;

it('gets token from domain1', () => {
  cy.visit('https://domain1.com');
  cy.getCookie('authToken').then((cookie) => {
    token = cookie.value;
  });
});

it('tries to use token on domain2', () => {
  cy.visit('https://domain2.com');
  cy.log(token); // 🔴 token is undefined here
});
```

##### What’s the problem?

* Variable `token` was declared **in the main test file scope**.
* When Cypress navigates to a new domain, it clears the execution context.
* So `token` is lost — Cypress starts from a clean slate.


In Cypress, each test (`it` block) runs in isolation, meaning that variables set in one test are not reliably carried over to another. Even if you declare a global variable like `var value1`, Cypress resets state between tests for test isolation and to ensure tests don't have hidden dependencies. Additionally, Cypress commands are asynchronous, so the assignment to `value1` in the first test might not be fully resolved or might be reset by the time the second test runs.

**Key Points:**

- **Test Isolation:**  
  Cypress runs each `it` block in isolation to prevent side effects between tests. Global variables are not guaranteed to persist across tests.

- **Asynchronous Commands:**  
  The `.then()` callback in the first test assigns `value1`, but by the time the second test starts, Cypress's isolation mechanism resets the state.

- **Best Practice:**  
  Instead of relying on global variables across tests, use Cypress commands like `cy.session()`, or chain commands within the same test block. If you need to share data, consider storing it in the test context using closures or leveraging Cypress’s custom tasks.

**Example Explanation:**

```javascript
describe('Cypress lost value', () => {
  var value1;
  
  it('10 - navigate and login to domain1 and save value to variable', () => {
    cy.visit('https://domain1.com');
    cy.loginDomain1().then((value) => {
      value1 = value // value1 gets assigned here
    });
    value2 = 100 // value1 gets assigned here
  });

  it('20 - navigate and login to domain2 and with value1 variable', () => {
    cy.visit('https://domain2.com');
    // When this test runs, value1, value2 is undefined because the test isolation reset it
    cy.log(value2) //-> value2 is undefined
    cy.loginDomain2(value1); //-> value1 is undefined
  });  
});
```

In the second test, `value1` is `undefined` because:
- **Test Isolation:** Each `it` block is isolated.
- **Asynchronous Nature:** Even if value1 was set, it might not persist due to the asynchronous execution and state resets between tests.


By understanding Cypress’s test isolation and asynchronous command nature, you can design tests that don't rely on external shared variables.


When you need to share a value between tests—especially across different domains—it’s important to remember that Cypress intentionally isolates each `it()` block. This isolation ensures that tests remain independent, but it means that any variables set in one test won't persist into another. Here are some best practices and solutions for handling this situation:

### **Best Practices for Sharing State Across Tests**

1. **Keep Tests Independent:**  
   Ideally, each test should be independent. If you need to use a value from a login on one domain in another, consider combining the related steps into a single test so that the value is available when needed.

2. **Combine Related Flows:**  
   If the two domains are part of one user flow (e.g., logging in on domain1 and then performing an action on domain2), combine these steps into one test block. This approach keeps the test self-contained.

4. **Persisting Data with cy.task():**  
   You can use a custom task to save data (e.g., writing to a file or using an in-memory store) that can be accessed across tests. This is useful for sharing data between tests, even across domains.

#### **Example Solutions**

##### **Solution 1: Combining Tests into a Single Test Block**

If the flow from domain1 to domain2 is part of one user journey, combine them:
  
```javascript
describe('Multidomain Login Flow', () => {
  it('logs in on domain1 and uses the value on domain2', () => {
    // Step 1: Visit domain1 and retrieve value
    cy.visit('https://domain1.com');
    cy.loginDomain1().then((value) => {
      // value is available here
      // Step 2: Switch to domain2 using cy.origin()
      cy.visit('https://domain2.com');
      cy.origin('https://domain2.com', () => {
        // Use the retrieved value in domain2
        cy.loginDomain2(value).should('succeed');
      });
    });
  });
});
```

##### **Solution 2: Using cy.task() to Persist Data Across Tests**

If combining tests isn’t feasible, you can use a custom task to store the value outside of the test context:

1. **Define a Task in cypress.config.js or a separate file:**

```javascript
// In cypress.config.js or in your support file
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      let sharedValue; // In-memory store

      on('task', {
        saveValue(value) {
          sharedValue = value;
          return null;
        },
        getValue() {
          return sharedValue;
        }
      });
      return config;
    }
  }
});
```

2. **Use cy.task() in Tests:**

```javascript
describe('Multidomain Flow with Persisted Value', () => {
  it('saves a value from domain1', () => {
    cy.visit('https://domain1.com');
    cy.loginDomain1().then((value) => {
      cy.task('saveValue', value);
    });
  });

  it('retrieves the value and uses it on domain2', () => {
    cy.visit('https://domain2.com');
    cy.task('getValue').then((value) => {
      // Now use the value in domain2
      cy.loginDomain2(value).should('succeed');
    });
  });
});
```


##### **Solution 3: Store in files**

1. **Define Tasks in the `setupNodeEvents` Function:**

   In your `cypress.config.js` (or within a file imported by it), you can set up custom tasks to write to and read from a file. For example:

   ```javascript
   const fs = require('fs');
   const path = require('path');

   module.exports = defineConfig({
     e2e: {
       setupNodeEvents(on, config) {
         // Define a task to write a value to a file
         on('task', {
           writeValue({ filename, value }) {
             const filePath = path.join(__dirname, filename);
             fs.writeFileSync(filePath, JSON.stringify(value));
             return null;
           },
           // Define a task to read a value from a file
           readValue({ filename }) {
             const filePath = path.join(__dirname, filename);
             if (fs.existsSync(filePath)) {
               const data = fs.readFileSync(filePath, 'utf8');
               return JSON.parse(data);
             }
             return null;
           }
         });
         return config;
       },
       baseUrl: 'http://localhost:3000'
     },
     env: {
       // Environment-specific variables...
     }
   });
   ```

2. **Usage in Tests:**

   You can then use `cy.task('writeValue', { filename, value })` in one test to store a value, and `cy.task('readValue', { filename })` in another test to retrieve it.

   **Example:**

   ```javascript
   describe('Store and Retrieve Value from File', () => {
     it('should save a value from domain1 to a file', () => {
       cy.visit('https://domain1.com');
       // Assume cy.loginDomain1() returns a value you want to store
       cy.loginDomain1().then((value) => {
         // Save value to file "sharedValue.json"
         cy.task('writeValue', { filename: 'cypress/sharedValue.json', value });
       });
     });

     it('should retrieve the value from file and use it on domain2', () => {
       cy.visit('https://domain2.com');
       cy.task('readValue', { filename: 'cypress/sharedValue.json' }).then((value) => {
         // Use the retrieved value; it should not be undefined now
         cy.loginDomain2(value).should('succeed');
       });
     });
   });
   ```

  ##### **Advantages of Using File Storage:**

  - **Persistence:**  
    Data persists even if tests are run in separate processes or sessions.
    
  - **Debugging:**  
    You can inspect the file manually to see what data was stored.

  - **Decoupling:**  
    It decouples the tests from in-memory storage, which is useful when tests run in parallel or when you need to share data between completely separate test suites.

  ### **Disadvantages:**

  - **I/O Overhead:**  
    File operations can be slower than in-memory operations.
    
  - **Complexity:**  
    Managing file storage and ensuring proper cleanup can add complexity to your test suite.

  - **Potential Flakiness:**  
    If file operations fail or if tests run concurrently and try to write/read the same file, you might run into race conditions. Proper isolation and cleanup are essential.

  ### **Best Practices:**

  - **Unique File Names:**  
    Use unique filenames per test suite or scenario to avoid conflicts.
    
  - **Cleanup:**  
    Consider deleting or resetting the file after tests run to avoid stale data.
    
  - **Error Handling:**  
    Ensure your tasks properly handle errors (e.g., file not found) so tests can fail gracefully.

  Using file storage via `cy.task()` is a robust solution for persisting values across tests, especially when other methods (like global variables or `cy.session()`) don’t fit your needs. It’s particularly useful in multidomain or multi-session scenarios where you need to share data externally.