## **Lesson 15: Network Requests and Basic API Testing with Cypress**

### **Objectives**

- Learn how to intercept and manipulate network requests using Cypress.
- Understand how to stub responses to create consistent, controlled test environments.
- Perform basic API testing by sending requests and validating responses.
- Combine UI and API tests for comprehensive test coverage.

---

### **Content Breakdown**

#### **What is an API?**

**Definition:**  
An API (Application Programming Interface) is a set of rules and protocols that allows different software applications to communicate with each other. APIs define methods and data formats that applications can use to request and exchange information.

**Key Points:**
- **Interface for Communication:**  
  It allows one program to interact with another without knowing the internal workings.
- **Types:**  
  - **Web APIs:** Use HTTP/HTTPS to enable communication between clients and servers.
  - **Library/SDK APIs:** Provide functions to use a library or framework.
- **Usage:**  
  APIs are essential for integrating systems, retrieving data from remote services, or enabling third-party integrations.

#### **What is Backend and What is Frontend?**

**Frontend:**
- **Definition:**  
  The frontend is the part of the application that users interact with directly. It includes the user interface (UI), HTML, CSS, and JavaScript code running in the browser.
- **Focus in Testing:**  
  Cypress primarily focuses on end-to-end testing of the frontend, simulating user interactions and verifying UI behavior.

**Backend:**
- **Definition:**  
  The backend refers to the server side of the application. It handles business logic, database interactions, authentication, and API endpoints.
- **Testing Aspect:**  
  Although Cypress is primarily used for frontend testing, it can also test backend APIs by sending HTTP requests (using commands like `cy.request()`) and stubbing network calls with `cy.intercept()`.

#### **What is HTTP Request and HTTP Response?**

**HTTP Request:**
- **Definition:**  
  An HTTP request is a message sent by a client (such as a browser) to a server to request a resource or perform an action.
- **Components:**  
  - **Method:** GET, POST, PUT, DELETE, etc.
  - **URL:** The endpoint the client wants to access.
  - **Headers:** Key-value pairs providing additional information (e.g., Content-Type, Authorization).
  - **Body:** Data sent with the request (mostly in POST or PUT requests).

**HTTP Response:**
- **Definition:**  
  An HTTP response is a message sent by the server back to the client after processing an HTTP request.
- **Components:**  
  - **Status Code:** Numeric code indicating the result (e.g., 200 for success, 404 for not found).
  - **Headers:** Provide metadata about the response (e.g., Content-Type, Cache-Control).
  - **Body:** The actual data or content (HTML, JSON, etc.) returned by the server.


#### **HTTP Headers**

**Definition:**
- **HTTP Headers** are key-value pairs sent as part of an HTTP request or response. They provide metadata about the request or response, such as content type, encoding, caching policies, authentication tokens, and more.

**Purpose and Functions:**
- **Content Negotiation:**  
  Headers like `Accept` or `Content-Type` indicate the data format (e.g., JSON, XML, HTML) the client can handle or the format of the request body.
- **Authentication and Security:**  
  Headers such as `Authorization` (e.g., a Bearer token) are used to authenticate and authorize the client.
- **Caching Directives:**  
  Headers like `Cache-Control`, `ETag`, and `Expires` instruct clients and proxies on how to cache responses.
- **Client and Server Information:**  
  Headers such as `User-Agent` (client information) and `Server` (server information) provide details about the source and destination of the request/response.
- **Custom Headers:**  
  Applications can use custom headers (often prefixed with `X-` or `Custom-`) to pass additional information that’s not covered by standard headers.

**Example in a Request:**
```http
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
```

**Example in a Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache, no-store, must-revalidate
Expires: 0
Content-Length: 123
```

**Importance in Testing:**
- When testing with Cypress, you might modify headers (for example, to include an Authorization token) using `cy.intercept()`.
- Validating headers is critical to ensuring your application communicates correctly and securely with clients.

#### **HTTP Body**

**Definition:**
- The **HTTP Body** is the part of an HTTP request or response that contains the actual data being sent. In requests, it may contain form data, JSON, XML, or binary data. In responses, it typically contains the resource requested (such as an HTML page, JSON object, or file).

**Purpose and Functions:**
- **Data Submission:**  
  In POST, PUT, or PATCH requests, the body contains data that the client wants to send to the server (e.g., form submission or file upload).
- **Resource Representation:**  
  In GET requests, the body of the response usually contains the resource, like a web page’s HTML or a JSON payload from an API.
- **Content Negotiation:**  
  The format of the body is often dictated by the `Content-Type` header, ensuring the client and server understand the structure of the data.

**Example in a Request Body:**
- **POST Request (JSON):**
  ```json
  {
    "username": "demoUser",
    "password": "demoPass"
  }
  ```

**Example in a Response Body:**
- **GET Request (JSON):**
  ```json
  [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ]
  ```

**Importance in Testing:**
- When performing API tests with `cy.request()` or stubbing responses with `cy.intercept()`, you need to validate the body of the response to ensure it matches the expected data.
- You might also need to send specific data in the request body, ensuring the application processes the payload correctly.


#### **What is MOCK?**

**Definition:**  
Mocking refers to the practice of simulating API responses or other external services by replacing them with controlled, pre-defined data. This is used to:
- **Isolate Tests:**  
  Ensure tests do not depend on the availability or behavior of external systems.
- **Create Consistent Data:**  
  Provide fixed responses for predictable testing outcomes.
- **Speed Up Tests:**  
  Eliminate network delays and potential flakiness due to external service issues.

---

#### **A. Basic API Testing**

1. **Sending API Requests Within Cypress:**
   - **Using `cy.request()`:**
     - **Definition:**  
       `cy.request()` is used to send HTTP requests directly from your test. It’s ideal for testing API endpoints without interacting with the UI.
     - **Example:**
       ```javascript
       cy.request('GET', '/api/users').then((response) => {
         // Validate response here
       });
       ```

2. **Validating API Responses:**
   - **Status Code:**  
     Assert that the response status is as expected (e.g., 200 for success).
     ```javascript
     cy.request('/api/users').its('status').should('eq', 200);
     ```
   - **Response Body:**  
     Use assertions to verify the structure and content of the response.
     ```javascript
     cy.request('/api/users').then((response) => {
       expect(response.body).to.be.an('array');
       expect(response.body[0]).to.have.property('name', 'Alice');
     });
     ```

3. **Combining UI and API Tests:**
   - **Use Case:**  
     Verify that the UI displays data that matches what is returned from an API request. For example, you can fetch user data via `cy.request()` and then assert that the same data is rendered in the UI.
     ```javascript
     cy.request('/api/users').then((apiResponse) => {
       cy.visit('/users');
       apiResponse.body.forEach((user, index) => {
         cy.get(`[data-testid="user-${index}"]`).should('contain', user.name);
       });
     });
     ```

---

#### **B. Intercepting Network Requests**

1. **Using `cy.intercept()`:**
   - **Definition:**  
     `cy.intercept()` is a Cypress command that allows you to spy on, intercept, and modify HTTP requests and responses. This is crucial for isolating tests from backend dependencies and ensuring predictable outcomes.
   
    **Key Uses:**
    - **Spying on Requests:**  
      Capture and analyze network requests to verify they are made as expected.
    - **Stubbing Responses:**  
      Replace responses with controlled, predictable data (mocks) to isolate tests from backend dependencies.
    - **Modifying Requests/Responses:**  
      Alter headers, body content, or other properties before they reach your application.

    **Why It's Important:**
    - **Isolation:**  
      It decouples tests from backend variability, ensuring that tests remain deterministic.
    - **Control:**  
      You can simulate various scenarios (success, failure, delays) by customizing the responses.
    - **Flexibility:**  
      It allows you to test error handling, authentication flows, and more without needing to modify backend services.

   
   - **Basic Syntax:**
     ```javascript
     cy.intercept(method, url, response);
     ```
     - **method:** HTTP method (GET, POST, etc.).
     - **url:** The endpoint URL (can be a pattern or regex).
     - **response:** Optional object to stub the response.
   - **Example:**
     ```javascript
     // Intercept GET requests to "/api/users"
     cy.intercept('GET', '/api/users').as('getUsers');
     ```
   - **Stubbing Responses:**  
     Instead of letting the request hit the actual backend, you can stub it with a custom response.
     ```javascript
     cy.intercept('GET', '/api/users', {
       statusCode: 200,
       body: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
     }).as('getUsers');
     ```

      **Code Example – Stubbing a Response:**
      ```javascript
      cy.intercept('GET', '/api/users', {
        statusCode: 200,
        body: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
      }).as('getUsers');

      cy.visit('/users');
      cy.wait('@getUsers').its('response.statusCode').should('eq', 200);
      ```

      **Modifying HTTP Headers Example:**
      ```javascript
      cy.intercept(
        {
          method: 'GET',
          url: '/api/secure-data'
        },
        (req) => {
          // Modify headers before the request is sent
          req.headers['Authorization'] = 'Bearer my-secret-token';
        }
      ).as('secureData');

      cy.visit('/secure');
      cy.wait('@secureData');
      ```

      ##### **6. What is .as() in Cypress?**

      **Definition:**  
      The `.as()` command in Cypress assigns an alias to a request, element, or any chainable object. This alias can be used later in tests to reference the same object or request, improving readability and reusability.

      **Usage Example:**
      ```javascript
      // Assigning an alias to an intercepted network request
      cy.intercept('GET', '/api/users').as('getUsers');
      cy.visit('/users');
      cy.wait('@getUsers').then((interception) => {
        // Assertions can be made on the interception
        expect(interception.response.statusCode).to.eq(200);
      });

      // Assigning an alias to a DOM element
      cy.get('[data-testid="login-button"]').as('loginButton');
      cy.get('@loginButton').click();
      ```

      **Benefits:**
      - **Readability:**  
        Aliases make test steps more descriptive.
      - **Reusability:**  
        Reuse the same reference across multiple assertions or actions.

---

#### **C. Best Practices**

1. **Isolating Tests by Mocking Responses:**
   - Stub network responses with `cy.intercept()` to decouple tests from the backend.
   - This reduces flakiness caused by network variability or backend issues.

2. **Ensuring Deterministic Tests:**
   - Use fixed, predictable data for stubs.
   - Avoid relying on external services during tests to ensure consistent outcomes.

3. **Combining UI and API Tests:**
   - Validate that UI elements accurately reflect the data returned from API calls.
   - Use API tests to verify backend behavior, and UI tests to verify presentation logic.

4. **Clear Aliasing and Logging:**
   - Alias intercepted requests (e.g., `.as('getUsers')`) to make tests more readable.
   - Use logging (`cy.log()`) to help debug network issues when tests fail.

---

#### **D. Other JavaScript Frameworks or Plugins Suitable for API Tests**

While Cypress is excellent for end-to-end and API testing, there are other tools and frameworks available:
  
- **Postman/Newman:**  
  Postman is a popular tool for API testing, and Newman is its command-line companion. It’s great for running API tests as part of a CI/CD pipeline.
  
- **Jest with Supertest:**  
  For unit and integration testing of APIs, Jest combined with Supertest allows you to write expressive tests that send HTTP requests to your backend.
  
- **Mocha/Chai with Axios or Request:**  
  These frameworks can be used to write API tests outside of a browser environment, especially for more complex or backend-focused tests.
  
- **Puppeteer or Playwright:**  
  While these tools are primarily used for browser automation, they also provide robust support for intercepting network requests and performing API tests.



### **E. Hands-On Activities**

1. **Intercepting and Stubbing Network Requests:**
   - Write a test that intercepts a GET request to `/api/users` and stubs a custom response.
   - Verify that your application displays the stubbed data correctly.

2. **Basic API Testing:**
   - Use `cy.request()` to send a request to an API endpoint.
   - Validate the response status, headers, and body content.

3. **Combining UI and API Tests:**
   - Create a test that fetches data from an API using `cy.request()`, then navigates to a UI page and verifies that the displayed data matches the API response.

4. **Multidomain Testing with cy.origin:**
   - Write a test that switches context to an external domain (or a simulated external domain) and asserts specific elements or API responses.

5. **Session Management with cy.session:**
   - Write tests that use `cy.session()` to cache login state, then validate that subsequent tests benefit from the cached session by reducing setup time.

---

### **F. Resources**

- **Cypress Network Requests Documentation:**  
  [Cypress Intercept Documentation](https://docs.cypress.io/api/commands/intercept)
- **Cypress API Testing Examples:**  
  Search GitHub for examples of `cy.request()` usage.
- **Cypress Multidomain Testing:**  
  [cy.origin Documentation](https://docs.cypress.io/api/commands/origin)
- **Cypress Sessions:**  
  [cy.session Documentation](https://docs.cypress.io/api/commands/session)

- **Testing API sites for practise**
  [Fake Store API](https://fakestoreapi.com/)
  [Booking app](https://restful-booker.herokuapp.com/)

---

### **Potential Student Questions and Answers**

1. **Q:** *Why should I stub network requests in my tests?*  
   **A:** Stubbing network requests isolates your tests from backend changes and network issues, ensuring that tests run with consistent, predictable data.

2. **Q:** *How does cy.request() differ from cy.intercept()?*  
   **A:** `cy.request()` is used to send HTTP requests directly from your tests and is ideal for API testing. `cy.intercept()` is used to spy on or stub network requests made by your application during test execution.

5. **Q:** *Can I mix API and UI tests in one suite?*  
   **A:** Yes, combining API and UI tests can provide comprehensive coverage by verifying both the backend data and its correct presentation in the UI. For instance, you can use `cy.request()` to fetch data and then assert that the UI displays the correct data.

   Below is a detailed explanation of HTTP Headers and HTTP Body:

- **HTTP Headers:**  
  Provide metadata about the request or response (content type, caching, authentication, etc.). They help control and define how data should be interpreted.
  
- **HTTP Body:**  
  Contains the actual data being transmitted (such as JSON, HTML, or file content). It is the core content of the HTTP message.

Understanding both HTTP Headers and the HTTP Body is crucial when writing API tests because it enables you to verify not only that the correct data is being sent or received, but also that it’s being processed in the correct context, with the appropriate content type, authentication, and other necessary information.