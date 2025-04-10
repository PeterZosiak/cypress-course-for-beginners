## **Lesson 5: Introduction to DOM: Properties, Methods, and the Global `window` Object**

### **1. Content Outline**

#### **A. Introduction to the DOM (Document Object Model)**
- **What is the DOM?**
  - Definition and purpose.
  - Representation of the web page as a tree structure.
- **Accessing DOM Elements:**
  - `document.getElementById()`.
  - `document.querySelector()` and `document.querySelectorAll()`.
- **Manipulating DOM Elements:**
  - Changing content (`innerText`, `innerHTML`).
  - Modifying attributes (`setAttribute()`, `getAttribute()`).
  - Adding and removing classes (`classList.add()`, `classList.remove()`).
- **Event Handling:**
  - Adding event listeners (`addEventListener()`).
  - Common events (click, input, submit).


##### What is the DOM?

**Definition:**
The Document Object Model (DOM) is a programming interface that represents the structure of an HTML or XML document as a tree of objects. Each element, attribute, and piece of text becomes an object, allowing developers to programmatically manipulate the page’s structure, style, and content.

**Key Characteristics:**
- **Tree-Like Structure:** The document is represented as a hierarchical node tree.
- **Scripting Interface:** JavaScript can interact with DOM nodes to change what’s displayed in the browser.
- **Dynamic Updates:** Modify elements, attributes, and content on-the-fly without reloading the entire page.

**Use Cases in Test Automation:**
- Selecting elements to verify their presence, attributes, or text.
- Simulating user actions (clicks, typing) on DOM elements.
- Asserting that elements appear or disappear as expected after certain actions.


##### Event Handling in the DOM

**Definition:**
Event handling refers to the process of detecting and responding to user interactions or browser-driven events on the webpage. Events can include clicks, key presses, form submissions, mouse movements, or other user actions.

**Key Characteristics:**
- **Event Listeners:** Functions that execute in response to specific events.
- **Asynchronous Behavior:** Events occur asynchronously, triggered by user interaction or timed actions.
- **Control over User Interaction:** Allows developers (and testers) to simulate and verify how the application responds to user input.

**Use Cases in Test Automation:**
- Testing UI interactions, ensuring that clicking a button triggers the correct behavior.
- Validating form submission logic or error handling.
- Confirming that keyboard input events result in expected on-screen changes.

#### **B. DOM Properties and Methods**

**What Are DOM Element Properties?**  
When a web page is loaded into a browser, the browser creates a Document Object Model (DOM) that represents the structure of the page as a tree of objects. Each HTML element on the page becomes a DOM element object that has properties and methods you can access and manipulate using JavaScript.

- **Properties of DOM Elements:**
  - `innerText`, `textContent`, `innerHTML`: Access or modify the text and HTML content of an element.
  - `value`: For form elements like input, access or set the user-entered value.
  - `style`: Access inline CSS properties.
  - `classList`: Add, remove, or toggle CSS classes without altering HTML strings directly.
- **Common DOM Methods:**
  - **Selection Methods:**
    - `document.getElementById('id')`: Selects an element by ID.
    - `document.querySelector('selector')`: Selects the first element matching a CSS selector.
    - `document.querySelectorAll('selector')`: Selects all elements matching a CSS selector, returning a NodeList.
  - **Custom attributes:**
    - `data-*`: Attributes are custom attributes that allow you to store extra information about an element without affecting its presentation or behavior by default. They are particularly useful in JavaScript as a way to assign additional context or configuration to elements.
    - Data attributes are incredibly powerful in test automation. By assigning data-cy, data-test, or data-testid attributes, you create stable selectors that are resilient to UI changes. These attributes are not visible to users and can be changed without affecting the UI’s layout or style. Test scripts can reliably select elements using cy.get('[data-test="login-button"]') in Cypress, for example.
  
  - **Manipulation Methods:**
    - `element.appendChild(node)`: Adds a new child node to an element.
    - `element.removeChild(node)`: Removes a child node.
    - `element.setAttribute('name', 'value')`: Sets or changes an attribute on an element.
    - `element.removeAttribute('name')`: Removes an attribute.
  - **Event Handling (brief mention):**
    - `element.addEventListener('event', callback)`: Attach event listeners to DOM elements.
  - **Use of Control Structures and Data Structures:**
    - Loops and conditions to dynamically update DOM elements (e.g., iterating over an array of data to create a list of items).
    - Objects to store selectors or DOM references for reusability.
    - JSON data can be fetched and used to populate elements, updating the DOM on-the-fly.


1. **`innerText` / `textContent`:**
   - **Purpose:** Access or change the text content of an element.
   - **Example:**
     ```javascript
     const heading = document.getElementById('main-title');
     console.log(heading.innerText); // Reads the displayed text of the heading
     heading.innerText = "Welcome to the Dashboard!";
     ```
   - **Difference:** `innerText` respects style and hidden elements, `textContent` shows all text including hidden elements and line breaks.

2. **`innerHTML`:**
   - **Purpose:** Access or change the HTML markup inside an element.
   - **Example:**
     ```javascript
     const container = document.querySelector('#content');
     container.innerHTML = "<p>New paragraph!</p>"; // Injects HTML code
     ```
   - **Caution:** Using `innerHTML` with untrusted data can expose your page to security risks like XSS (Cross-Site Scripting).

3. **`value`:**
   - **Purpose:** For form elements (inputs, textareas), `value` gets or sets the user-entered value.
   - **Example:**
     ```javascript
     const input = document.getElementById('username');
     input.value = "testUser";
     ```

4. **`classList`:**
   - **Purpose:** Manage the element’s CSS classes without manually manipulating the `class` attribute string.
   - **Example:**
     ```javascript
     const button = document.querySelector('.btn');
     button.classList.add('active');
     button.classList.remove('disabled');
     button.classList.toggle('hidden');
     ```

5. **`style`:**
   - **Purpose:** Access or change inline CSS styles of an element.
   - **Example:**
     ```javascript
     const box = document.querySelector('.box');
     box.style.backgroundColor = "blue";
     box.style.color = "white";
     ```
   - **Note:** It’s generally better to manipulate classes and use external CSS rather than setting styles inline for maintainability.

##### Accessing DOM Elements

**Selecting Elements:**
```html
<!-- index.html -->
<div id="container">
  <h1 class="title">Hello, World!</h1>
  <button id="clickMeBtn">Click Me</button>
</div>
```

```javascript
// JavaScript
const container = document.getElementById("container");
const title = document.querySelector(".title");
const button = document.querySelector("#clickMeBtn");
```

**Best Practices:**
- Use `document.getElementById()` when selecting by ID for performance.
- Use `document.querySelector()` and `document.querySelectorAll()` for complex or flexible selectors.
- Keep IDs and class names descriptive to make selectors more understandable.

##### Manipulating DOM Elements

**Changing Content:**
```javascript
title.innerText = "Welcome to the Test Page!";
```

**Modifying Attributes:**
```javascript
button.setAttribute("disabled", "true");
console.log(button.getAttribute("id")); // "clickMeBtn"
```

**Modifying Classes:**
```javascript
title.classList.add("highlight");
title.classList.remove("old-class");
```

**Best Practices:**
- Minimize direct DOM manipulation by caching references to elements.
- Use classes and CSS for style changes rather than inline styles.
- Keep DOM operations batch or group together to reduce performance overhead.

##### Event Handling

**Adding Event Listeners:**
```javascript
button.addEventListener("click", function () {
  console.log("Button was clicked!");
  container.innerHTML += "<p>Button Clicked!</p>";
});
```

**Best Practices:**
- Use unobtrusive event handling (i.e., `addEventListener`) rather than inline `onclick` attributes.
- Name event handler functions descriptively:
  
```javascript
function handleButtonClick(event) {
  console.log("Button clicked:", event.target);
}

button.addEventListener("click", handleButtonClick);
```

- Remove event listeners when they’re no longer needed to prevent memory leaks:
  
```javascript
button.removeEventListener("click", handleButtonClick);
```


#### **B. The Global `window` Object**
**Definition:**  
In web browsers, the `window` object is the global object that represents the browser window containing your webpage. All global variables, functions, and objects become properties of `window`.

- **What is the `window` Object?**
  - The `window` object is the global object in the browser environment.
  - Represents the browser window and provides methods and properties for controlling it.
- **Key Properties and Methods of `window`:**
  - **Properties:**
    - `window.document`: Refers to the current page’s DOM.
    - `window.location`: Information about the current URL and navigation.
    - `window.history`: Access to the browser’s session history.
    - `window.localStorage` and `window.sessionStorage`: Store and retrieve data in the browser.
  - **Methods:**
    - `window.alert('message')`: Displays an alert dialog.
    - `window.confirm('message')`: Displays a confirmation dialog, returning true or false.
    - `window.setTimeout(callback, milliseconds)`: Delays code execution.
    - `window.setInterval(callback, milliseconds)`: Executes code periodically.
  - **Implicit Global Scope:**
    - Variables declared at the top level (without `let`, `const`, or `var` in older code) can become properties of `window`—a practice to avoid.
    - Understanding scope (from previous lessons) helps avoid pollution of the global namespace.


**Key Points About `window`:**  
- **Global Scope:** Variables declared globally (without `let`, `const`, or `var` in older code) might become properties of `window`. Modern best practices discourage relying on this behavior.
- **Access to Document and Browser APIs:**  
  - `window.document` gives you the DOM for the current page.  
  - `window.location` provides info and methods for the current URL.  
  - `window.history` allows navigation in the browser’s session history.  
  - `window.alert()`, `window.confirm()`, `window.prompt()` show dialogs.  
  - `window.setTimeout()` and `window.setInterval()` schedule code execution.

**Example:**
```javascript
console.log(window.location.href); // Logs the current page URL
window.alert("Welcome to the site!");
```

**Best Practice:**  
Avoid attaching unnecessary data to `window`. Keep variables scoped to functions or modules to prevent global namespace pollution.

#### **D. Best Practices for Working with the DOM and `window`**
- **Code Maintainability:**
  - Store references to frequently accessed elements in variables.
  - Use descriptive variable names for DOM references and avoid “magic strings.”
- **Performance Considerations:**
  - Minimize unnecessary DOM manipulations—batch changes or use techniques to limit reflows and repaints.
  - Reuse arrays, objects, and JSON data to generate or update the DOM rather than hardcoding elements.
- **Security and Data Validation:**
  - Avoid setting `innerHTML` with untrusted data (risk of XSS).
  - Validate JSON and user input before injecting into the DOM.
- **Using Control Structures:**
  - Use loops and conditions to dynamically update DOM based on user actions or data fetched from APIs.
  - For example, if you have a JSON array of product objects, you can loop over them to create DOM elements for each product.

#### **E. Practical Examples**

1. **Accessing and Updating Element Content:**
   ```javascript
   const title = document.getElementById('page-title');
   title.innerText = "Welcome to the Dashboard!";
   ```

2. **Modifying Element Attributes and Classes:**
   ```javascript
   const loginButton = document.querySelector('#login-btn');
   loginButton.setAttribute('disabled', 'true');

   const mainHeader = document.querySelector('h1');
   mainHeader.classList.add('highlighted');
   mainHeader.classList.remove('old-class');
   ```

3. **Creating and Appending Elements Dynamically:**
   ```javascript
   const userList = document.getElementById('user-list');
   const users = [
     { name: "Alice", role: "admin" },
     { name: "Bob", role: "user" },
     { name: "Charlie", role: "moderator" }
   ];

   users.forEach(user => {
     const li = document.createElement('li');
     li.innerText = `${user.name} (${user.role})`;
     userList.appendChild(li);
   });
   ```

4. **Fetching JSON Data and Updating the DOM:**
   
**What is `fetch()`?**  
`fetch()` is a built-in JavaScript function (part of the Fetch API) that allows you to make network requests, such as retrieving data from a URL. It returns a Promise, making it easy to handle asynchronous operations without blocking the main thread.

   ```javascript
   fetch('users.json')
     .then(response => response.json())
     .then(data => {
       const userContainer = document.querySelector('#user-container');
       data.forEach(user => {
         const div = document.createElement('div');
         div.innerText = `${user.name} - ${user.email}`;
         userContainer.appendChild(div);
       });
     });
   ```


  5. **setTimeout**
  **What is `setTimeout()`?**  
`setTimeout()` is a function provided by the browser (via `window`) that allows you to execute a specified function after a set delay (in milliseconds).

**Syntax:**
```javascript
window.setTimeout(() => {
  console.log("This message appears after 2 seconds");
}, 2000);
```

**Parameters:**
1. **Callback Function:** The function you want to run after the delay.
2. **Delay (milliseconds):** The time to wait before calling the callback. 1000 ms = 1 second.

**Behavior:**
- The callback is not executed until after the specified delay.
- The code doesn’t block; it schedules the callback and continues running the rest of the script. When the time expires, the callback function is executed.

**Use Cases in Test Automation:**
- **Simulating user wait times:** If you want to test how the UI behaves after a delay (like a loading spinner disappearing after a few seconds).
- **Scheduling asynchronous checks:** Running a piece of code after a delay to verify if some condition in the DOM is met.

**Stopping the Timeout:**
- You can assign `setTimeout()` to a variable and use `clearTimeout()` to cancel it if needed.
  ```javascript
  const timeoutId = setTimeout(() => {
    console.log("Will this message appear?");
  }, 5000);

  // Cancel the timeout before it triggers
  clearTimeout(timeoutId);
  ```
   
**Importance of JSON in Test Automation:**  
JSON (JavaScript Object Notation) is a lightweight data format that’s easy for both humans and machines to read and write. It’s language-independent and widely used for communication between clients and servers. In test automation:

1. **Fixtures and Test Data:**  
   You can store test inputs and expected results in JSON files. This separates data from the test logic, making it easier to update, maintain, and reuse test scenarios.

2. **API Testing:**  
   When testing applications that communicate with backends (APIs), responses are often in JSON. Parsing JSON responses and asserting that the returned data matches expectations is straightforward.

3. **Mocking Responses:**  
   In automated tests, you can serve predefined JSON data as mock responses. This ensures deterministic tests without relying on external services.

**Parsing and Handling JSON:**
- **`response.json()` method:**  
  After calling `fetch()`, you often convert the raw response to JSON:
  ```javascript
  fetch('users.json')
    .then(response => response.json()) // parse JSON from response
    .then(data => {
      console.log(data);
      // data is now a JavaScript object/array you can loop over, assert, or manipulate
    });
  ```

#### What is `then` in the `fetch()` Function?

**Explanation:**
`then()` is a method available on Promises. When you call `fetch()`, it returns a Promise. The `then()` method defines what should happen when that Promise is resolved (i.e., when the asynchronous operation completes successfully).

- **First `.then()`:** Often used to handle the raw response from `fetch()` and convert it to a usable format (like JSON).
- **Second `.then()`:** Once you have the parsed data, you can chain another `then()` to process that data (e.g., update the DOM, run assertions, etc.).

**Example:**
```javascript
fetch('users.json')
  .then(response => response.json())    // Converts the response body to JSON
  .then(data => {
    console.log(data);                  // Use the parsed data here
  })
  .catch(error => console.error(error));
```

**Key Point:**  
- **`then()`** is how you chain operations in an asynchronous flow. Each `then()` returns a new Promise, allowing you to continue the chain.
- **`catch()`** is used to handle errors if any part of the chain fails.


5. **Using the `window` Object:**
   ```javascript
   console.log(window.location.href); // Current page URL
   window.setTimeout(() => {
     alert("Time’s up!");
   }, 2000);
   ```

#### **F. Connecting to Previous Lessons**
- **Arrays and Objects:**
  - Use arrays to store lists of data and loop over them to create DOM elements dynamically.
  - Use objects to hold selectors or DOM references for easier DOM manipulation.
- **JSON and API Interactions:**
  - Fetch JSON data and use it to populate elements on the page.
- **Control Structures:**
  - Use `if/else` statements, loops, and logical conditions to decide how and when to update the DOM, handle certain user inputs, or modify the `window` properties.
- **Combining Concepts:**
  - Everything learned—variables, functions, arrays, objects, JSON, DOM manipulation, event handling—can now be integrated to build interactive and dynamic web experiences.

---

### **2. Hands-On Activities: Exercises and Web Functionality Suggestions**

#### **A. Interacting with the DOM in Tests Exercise**
- **Exercise:**
  - Create an HTML page with various elements like buttons, input fields, and containers.
  - Write Cypress tests that:
    - Select and interact with DOM elements using selectors.
    - Assert the presence and content of elements.
    - Simulate user interactions like clicks and form submissions.
  - **Example:**
    ```html
    <!-- index.html -->
    <!DOCTYPE html>
    <html>
    <head>
      <title>DOM Interaction Test</title>
    </head>
    <body>
      <h1 id="title">Welcome to the Test Page</h1>
      <button id="changeTitle">Change Title</button>
      <input type="text" id="username" placeholder="Enter username" />
      <button id="submitForm">Submit</button>
      <div id="output"></div>

      <script>
        document.getElementById('changeTitle').addEventListener('click', () => {
          document.getElementById('title').innerText = 'Title Changed!';
        });

        document.getElementById('submitForm').addEventListener('click', () => {
          const username = document.getElementById('username').value;
          document.getElementById('output').innerText = `Hello, ${username}!`;
        });
      </script>
    </body>
    </html>
    ```

    ```javascript
    // Cypress Test
    describe('DOM Interaction Test', () => {
      beforeEach(() => {
        cy.visit('/index.html');
      });

      it('Changes the title when button is clicked', () => {
        cy.get('#changeTitle').click();
        cy.get('#title').should('have.text', 'Title Changed!');
      });

      it('Submits the form and displays greeting', () => {
        cy.get('#username').type('TestUser');
        cy.get('#submitForm').click();
        cy.get('#output').should('have.text', 'Hello, TestUser!');
      });
    });
    ```

- **Web Functionality Suggestion:**
  - Develop a dynamic webpage where users can:
    - Change the page title by clicking a button.
    - Submit a form with their username and see a personalized greeting.
  - Write Cypress tests to automate and verify these interactions.


#### **B. DOM Content Update Exercise**
- **Exercise:**
  - Create a simple webpage with a title, a paragraph, and a button.
  - Write JavaScript code to:
    - Change the title’s text using `innerText` when the page loads.
    - Update the paragraph’s text content when the button is clicked.
  - **Web Functionality Suggestion:**
    - A “Welcome” page that shows a generic message initially and personalizes the greeting when the user clicks a button.

#### **C. Dynamic List Creation from JSON Exercise**
- **Exercise:**
  - Create a JSON file (`products.json`) with an array of product objects (`name`, `price`, `category`).
  - Use `fetch()` to load the JSON data.
  - Dynamically create a list of products on the webpage, displaying each product’s name and price.
  - **Web Functionality Suggestion:**
    - A product listing page that fetches product data and renders it into a table or list, updated whenever the data changes.

#### **D. Using `window` Methods Exercise**
- **Exercise:**
  - Display an alert after 2 seconds using `window.setTimeout()`.
  - Log the current page URL using `window.location.href`.
  - Implement a “Reload” button that uses `window.location.reload()` to refresh the page.
  - **Web Functionality Suggestion:**
    - A page with a timed notification and a button to reload the page, demonstrating `window` manipulations.

---

### **3. Potential Student Questions**

1. **What is the difference between `document.getElementById()` and `document.querySelector()`?**
   - **Answer:**  
     `document.getElementById()` selects an element by its unique ID and is generally faster. `document.querySelector()` allows selecting elements using any CSS selector, providing more flexibility.

2. **How can I modify the content of a DOM element using JavaScript?**
   - **Answer:**  
     You can modify the content using properties like `innerText`, `innerHTML`, or `textContent`. For example:
     ```javascript
     document.getElementById('title').innerText = 'New Title';
     ```

3. **When should I use `innerText` vs. `innerHTML`?**  
   **Answer:**  
   - `innerText` sets or gets the human-readable text inside an element, ignoring HTML tags.
   - `innerHTML` allows you to add or modify HTML directly. Use caution with `innerHTML` to avoid security risks like XSS.

4. **How do I avoid global variable pollution with the `window` object?**  
   **Answer:**  
   - Always declare variables with `let` or `const` inside functions or blocks.
   - Use modules or closures to keep variables scoped locally.
   - Don’t rely on attaching data to `window`—store it in objects or modules instead.

5. **What’s the difference between `document.getElementById()` and `document.querySelector()`?**  
   **Answer:**  
   - `getElementById()` selects an element by its unique ID and returns a single element.
   - `querySelector()` uses CSS selectors, can select any element matching the selector, and returns the first match.
   - `querySelector()` is more flexible but `getElementById()` is faster for a single ID lookup.

6. **Can I iterate over DOM element collections like arrays?**  
   **Answer:**  
   - `querySelectorAll()` returns a NodeList, which can be iterated using `forEach()`.
   - You can also convert NodeLists or HTMLCollections to arrays using `Array.from()` and then use array methods.

---

### **4. Supplementary Materials: Recommendations**

#### **A. Official Documentation and Guides:**
- [MDN Web Docs - DOM Introduction](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN Web Docs - Window Object](https://developer.mozilla.org/en-US/docs/Web/API/Window)
- [MDN Web Docs - Manipulating the DOM](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

#### **B. Tutorials and Articles:**
- **W3Schools DOM Tutorial:** [https://www.w3schools.com/js/js_htmldom.asp](https://www.w3schools.com/js/js_htmldom.asp)
- **JavaScript.info DOM Tutorial:** [https://javascript.info/document](https://javascript.info/document)

#### **C. Interactive Learning Platforms:**
- **FreeCodeCamp:** Exercises on DOM manipulation and event handling.
- **Codecademy:** Interactive lessons on working with the DOM.

#### **D. Video Tutorials:**
- **Traversy Media on YouTube:** Videos on DOM manipulation basics.
- **The Net Ninja:** DOM tutorials, explaining properties, methods, and `window` object usage.

#### **E. Practice Platforms:**
- Create small demo pages to experiment with different DOM methods.
- Use JSON files as data sources and dynamically render UI elements based on the fetched data.

#### **F. Community and Support:**
- **Stack Overflow** and **Reddit** (`r/javascript`): Great resources for specific DOM-related questions.
- **Discord Communities:** Join JavaScript or front-end focused channels to discuss DOM challenges.

---

### **5. Suggested Lesson Breakdown for 3 Hours**

#### **Hour 1: DOM Properties and Methods (60 minutes)**
- **Recap of DOM Concepts (10 minutes):**
  - Review the DOM structure and how JavaScript sees the webpage.
- **DOM Properties and Methods (40 minutes):**
  - `innerText`, `innerHTML`, `textContent`.
  - `classList` and `style`.
  - Creation, modification, and removal of elements.
- **Short Q&A (10 minutes):**
  - Address immediate questions.

#### **Hour 2: The Global Window Object and Integrations (60 minutes)**
- **Exploring `window` (20 minutes):**
  - `window.document`, `window.location`, `window.history`.
  - Timed actions (`setTimeout`, `setInterval`).
- **Practical Integration with Data (20 minutes):**
  - Fetch JSON data and update DOM elements.
  - Use loops and conditions to decide what to display.
- **Short Q&A (10 minutes):**
  - Clarify any uncertainties.
- **Break (10 minutes):**
  - Quick pause.

#### **Hour 3: Hands-On Activities and Best Practices (60 minutes)**
- **Hands-On Exercises (40 minutes):**
  - Updating text and attributes.
  - Creating lists from arrays or JSON.
  - Using `window` methods to show alerts or reload the page.
- **Review and Q&A (20 minutes):**
  - Recap key concepts and best practices.
  - Encourage students to experiment and try more complex DOM manipulations.

---

### **6. Additional Recommendations**

#### **A. Interactive Demonstrations:**
- Show live coding examples:
  - Fetch a JSON file and display the data on the page.
  - Update element classes on button clicks.
  - Show a timed alert using `setTimeout()`.

#### **B. Engaging Visuals:**
- Use diagrams to show the DOM tree.
- Flowcharts to visualize how data flows from JSON to DOM elements.
- Highlight how `window` sits at the top level of the browser environment.

#### **C. Encourage Participation:**
- Ask students to find and log the `window.location.href`.
- Have students create and remove elements on the fly.
- Let them try selecting elements using different methods and properties.

#### **D. Provide Clear Instructions:**
- Step-by-step mini assignments, e.g., “Change the heading text and add a new paragraph below it.”
- Troubleshooting tips for common mistakes (e.g., selecting the wrong ID, misspelling a selector).

#### **E. Foster a Supportive Environment:**
- Encourage students to share their code snippets.
- Offer to review and give feedback on their approaches.