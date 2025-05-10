## **Lesson 6: Installing and Configuring Cypress**

### **1. Content Outline**

#### **A. Introduction to Cypress Installation**

- **Why Installation Matters:**
  - Before writing Cypress tests, the environment must be properly set up to ensure compatibility and smooth execution.
- **Prerequisites for Installation:**
  - Node.js installed on the system.
  - A basic understanding of package managers like `npm` or `yarn`.

1. **Node.js Installed:**

   - Cypress requires Node.js to manage its installation and dependencies.
   - Install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/).
   - Verify the installation using:
     ```bash
     node -v
     npm -v
     ```

2. **A Package Manager:**

   - Node.js includes `npm` (Node Package Manager) by default. Alternatively, you can use `yarn`, `pnpm`, or others.

3. **A JavaScript Project Initialized:**

   - Your project should have a `package.json` file, which is created using `npm init` or `yarn init`. This file tracks dependencies like Cypress and other project metadata.

4. **Basic Understanding of Command Line:**
   - You'll need to execute commands in the terminal to install and run Cypress.

##### **What is npm and How it Works?**

**What is npm?**

- `npm` (Node Package Manager) is a tool that comes with Node.js and is used to manage JavaScript packages and dependencies.
- It helps developers:
  - Install libraries and tools.
  - Share their own libraries with the community.
  - Manage project-specific or global dependencies.

**How npm Works:**

1. **Installing Packages:**

   - Install a package locally (specific to the project):
     ```bash
     npm install package-name
     ```
   - Install a package globally (accessible across all projects):
     ```bash
     npm install -g package-name
     ```

2. **Managing Dependencies:**

   - Installed packages are listed in `package.json` under the `dependencies` or `devDependencies` section.

3. **Scripts Automation:**
   - `npm` can run custom scripts defined in `package.json`:
     ```json
     {
       "scripts": {
         "start": "node app.js",
         "test": "cypress open"
       }
     }
     ```
   - Run a script:
     ```bash
     npm run test
     ```

---

### **Difference Between npm, yarn, bum, and pnpm**

| Feature              | **npm**                     | **yarn**                               | **bun**                    | **pnpm**                                   |
| -------------------- | --------------------------- | -------------------------------------- | -------------------------- | ------------------------------------------ |
| **Speed**            | Moderate                    | Faster than npm                        | Fastest                    | Faster than npm/yarn                       |
| **Disk Space Usage** | Higher (duplicate packages) | Moderate                               | Efficient                  | Low (uses hard links to avoid duplication) |
| **Dependency Tree**  | Flat tree                   | Flat tree                              | Flat tree                  | Hierarchical tree (better isolation)       |
| **Offline Mode**     | Limited                     | Supported                              | Supported                  | Supported                                  |
| **Adoption**         | Widely used                 | Popular in larger projects             | New (emerging)             | Increasing adoption in enterprise          |
| **Best Use Case**    | General                     | Large or performance-critical projects | Fast development workflows | Projects needing efficient storage         |

#### **B. Step-by-Step Installation Process**

1. **Initialize the Project:**
   - Create a new project folder.
   - Run `npm init` or `yarn init` to initialize a `package.json` file.
2. **Install Cypress:**
   - Use the command `npm install cypress --save-dev` or `yarn add cypress --dev`.
3. **Verify Installation:**
   - Run `npx cypress open` or `yarn cypress open` to open the Cypress Test Runner.

##### **What is `npm init`?**

**Purpose:**
`npm init` initializes a new Node.js project by creating a `package.json` file, which serves as a configuration file for managing project dependencies and scripts.

**How it Works:**

1. Run `npm init` in your project directory:
   ```bash
   npm init
   ```
2. Answer the prompts (project name, version, description, etc.) or skip them using the `-y` flag for default values:
   ```bash
   npm init -y
   ```
3. A `package.json` file is created, containing metadata like:
   ```json
   {
     "name": "my-project",
     "version": "1.0.0",
     "scripts": {},
     "dependencies": {},
     "devDependencies": {}
   }
   ```

#### **C. Cypress Folder Structure Overview**

- **Default Directories:**
  - `cypress/fixtures`: Store JSON files for test data.
  - `cypress/e2e`: Write test files here.
  - `cypress/plugins`: Extend Cypress functionality.
  - `cypress/support`: Add reusable utilities and global configurations.
- **Purpose of Each Directory:**
  - **`fixtures`:** Centralize mock data for tests.
  - **`integration`:** Organize test cases by feature or functionality.
  - **`support`:** Customize commands and configure global behavior.

##### **Purpose of Cypress Folders**

1. **`fixtures`:**

   - Store mock data in JSON format.
   - Used for simulating API responses or providing test inputs.
   - Example: `cypress/fixtures/users.json`
     ```json
     [
       { "id": 1, "name": "Alice", "role": "admin" },
       { "id": 2, "name": "Bob", "role": "user" }
     ]
     ```
   - Access in tests:
     ```javascript
     cy.fixture("users").then((users) => {
       cy.log(users[0].name); // Logs "Alice"
     });
     ```

2. **`e2e` (or `integration` in older versions):**

   - Store actual test files, typically organized by feature or functionality.
   - Example:
     ```
     cypress/integration/login.spec.js
     cypress/integration/dashboard.spec.js
     ```

3. **`plugins`:**

   - Extend Cypress functionality, such as modifying browser behavior or configuring plugins.
   - Example:
     ```javascript
     module.exports = (on, config) => {
       // Modify configuration or set up event listeners
     };
     ```

4. **`support`:**
   - Contains reusable code like custom commands or global configurations.
   - Example: Add a custom command for login in `cypress/support/commands.js`:
     ```javascript
     Cypress.Commands.add("login", (username, password) => {
       cy.get('[data-testid="username"]').type(username);
       cy.get('[data-testid="password"]').type(password);
       cy.get('[data-testid="login-button"]').click();
     });
     ```

#### **D. Configuration Files**

- **Overview of `cypress.config.js`:**

  - Configure base URL, viewport size, timeouts, and more.
  - Example:

    ```javascript
    const { defineConfig } = require("cypress");

    module.exports = defineConfig({
      e2e: {
        baseUrl: "http://localhost:3000",
        viewportWidth: 1280,
        viewportHeight: 720,
        defaultCommandTimeout: 8000,
        supportFile: "cypress/support/index.js",
      },
    });
    ```

##### **What is `baseUrl` in Cypress Context?**

**Definition:**
`baseUrl` is a configuration property in `cypress.config.js` that sets a default root URL for the application being tested. It simplifies test code by eliminating the need to repeatedly specify the full URL in `cy.visit()` commands.

**Example:**

- In `cypress.config.js`:
  ```javascript
  module.exports = {
    e2e: {
      baseUrl: "http://localhost:3000",
    },
  };
  ```
- Usage in tests:
  ```javascript
  cy.visit("/login"); // Resolves to 'http://localhost:3000/login'
  ```

**Benefits:**

- Reduces redundancy in test files.
- Makes tests easier to update if the root URL changes (e.g., moving from `localhost` to a staging server).

- **Setting Environment Variables:**
  - Use `env` in the configuration file for sensitive data or reusable values.
  - Example:
    ```javascript
    module.exports = defineConfig({
      env: {
        apiUrl: "https://api.example.com",
      },
    });
    ```
  - Access in tests using `Cypress.env('apiUrl')`.

### **`env` Property in `cypress.config.js`**

**Definition:**
The `env` property in `cypress.config.js` stores environment-specific variables, such as API endpoints, credentials, or flags. These values can be accessed in tests using `Cypress.env()`.

**Example:**

- In `cypress.config.js`:
  ```javascript
  module.exports = {
    e2e: {
      env: {
        apiUrl: "https://api.example.com",
        userRole: "admin",
      },
    },
  };
  ```
- Usage in tests:
  ```javascript
  describe("API Tests", () => {
    it("should fetch data from the API", () => {
      const apiUrl = Cypress.env("apiUrl");
      cy.request(`${apiUrl}/users`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
  ```

**Benefits:**

- Centralizes environment-specific values, making them easier to update.
- Keeps sensitive data (e.g., API keys) out of the test code.

#### **E. Running Cypress Tests**

- **Open Mode:**
  - Use `npx cypress open` to launch the Test Runner UI.
- **Headless Mode:**
  - Use `npx cypress run` to execute tests in the terminal.
  - Useful for CI/CD pipelines.
- **Example Command:**
  ```bash
  npx cypress run --spec cypress/integration/login.spec.js
  ```

**`npx`** is a tool that comes with `npm` (starting from version 5.2.0) and is used to execute Node.js packages directly from the command line without globally installing them. It allows you to run the binaries of packages that are either installed locally in your project or fetched directly from the npm registry.

##### **Why Use `npx`?**

1. **Temporary Execution:**

   - With `npx`, you can run a package temporarily without permanently installing it on your system.
   - For example:
     ```bash
     npx create-react-app my-app
     ```
     This runs the `create-react-app` package without requiring a global installation.

2. **Avoid Global Installs:**

   - Instead of installing a package globally (e.g., `npm install -g some-package`), `npx` fetches and executes the package directly.
   - This keeps your global environment clean and avoids version conflicts.

3. **Run Locally Installed Packages:**

   - If a package is installed locally in your project (`node_modules`), `npx` automatically runs it without needing to reference the full path.
   - Example:
     ```bash
     npx cypress open
     ```
     This runs Cypress from your local `node_modules` folder if it's already installed.

4. **Specific Version Execution:**

   - You can specify a specific version of a package to execute:
     ```bash
     npx some-package@1.2.3
     ```

5. **Scaffolding and Generators:**
   - `npx` is commonly used to run tools that generate new projects or configuration files without installing the tool globally.
   - Example:
     ```bash
     npx eslint --init
     ```

### **How Does `npx` Work?**

- When you run a command using `npx`:
  1. It checks if the package exists locally in your `node_modules`.
  2. If the package is not found locally, it downloads the package temporarily and executes it.
  3. Once the package is executed, it cleans up by removing the temporary files (if it was fetched).

---

### **When to Use `npx` vs `npm`?**

| **Feature**         | **`npm`**                               | **`npx`**                              |
| ------------------- | --------------------------------------- | -------------------------------------- |
| **Installation**    | Installs a package locally or globally. | Runs a package without installation.   |
| **Usage**           | Requires installing the package first.  | No need to install; executes directly. |
| **Global Packages** | Often used for managing global tools.   | Replaces the need for global installs. |
| **One-Time Use**    | Not suitable without installation.      | Perfect for one-time executions.       |

---

### **Examples of Using `npx`**

1. **Run Cypress Without Installing Globally:**

   ```bash
   npx cypress open
   ```

2. **Generate a New React App:**

   ```bash
   npx create-react-app my-app
   ```

3. **Lint Files Without Installing ESLint Globally:**

   ```bash
   npx eslint myfile.js
   ```

4. **Run Specific Package Versions:**

   ```bash
   npx some-package@2.0.0
   ```

5. **Temporary Execution for Testing:**
   - Run `npx cowsay` for a fun example:
     `bash
     npx cowsay "Hello, World!"
     `
     `npx` is a versatile tool that simplifies package execution and helps avoid cluttering your system with unnecessary global installations, making it ideal for developers who frequently work with JavaScript tools and frameworks.

#### **F. Best Practices for Setup**

- **Keep Cypress Updated:**
  - Regularly update Cypress to access new features and bug fixes.
- **Use Version Control for Configuration Files:**
  - Track changes in `cypress.config.js` and other setup files.
- **Create a Base URL:**
  - Define a base URL in the configuration file to simplify test commands like `cy.visit()`.

---

### **2. Hands-On Activities**

#### **A. Installing Cypress Exercise**

- **Objective:**
  - Guide students through installing Cypress in their environment.
- **Steps:**
  1. Install Node.js if not already installed.
  2. Initialize a new project with `npm init`.
  3. Install Cypress using `npm install cypress --save-dev`.
  4. Run `npx cypress open` and explore the default folder structure.
- **Outcome:**
  - Students should see the Cypress Test Runner open successfully.

#### **B. Setting Up Configuration File Exercise**

- **Objective:**
  - Edit the `cypress.config.js` file to add a base URL and viewport settings.
- **Steps:**
  1. Open `cypress.config.js`.
  2. Add the following:
     ```javascript
     module.exports = {
       e2e: {
         baseUrl: "http://localhost:3000",
         viewportWidth: 1366,
         viewportHeight: 768,
       },
     };
     ```
  3. Save the file and re-run `npx cypress open`.
- **Outcome:**
  - Students should be able to navigate to the base URL by running `cy.visit('/')` in their tests.

---

### **3. Potential Student Questions**

1. **What happens if I don’t have Node.js installed?**

   - **Answer:** Cypress requires Node.js to be installed, as it is managed using npm (Node Package Manager). Students must download and install Node.js before proceeding.

2. **Do I need to install Cypress globally?**

   - **Answer:** No, Cypress is typically installed locally within a project for better version management and reproducibility.

3. **What is the difference between Cypress open mode and headless mode?**

   - **Answer:** Open mode launches the interactive Cypress Test Runner, allowing students to see test execution visually. Headless mode runs tests in the terminal without opening the UI, suitable for automation pipelines.

4. **Why should I use a base URL in the configuration?**

   - **Answer:** Setting a base URL simplifies test commands. Instead of writing `cy.visit('http://localhost:3000/login')`, you can write `cy.visit('/login')`.

5. **Can I use Cypress with existing projects?**
   - **Answer:** Yes, Cypress can be added to any JavaScript project by installing it as a development dependency.

---

### **4. Supplementary Materials**

#### **A. Official Documentation:**

- [Cypress Installation Guide](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [Cypress Configuration](https://docs.cypress.io/guides/references/configuration)

#### **B. Tutorials and Articles:**

- [Cypress Folder Structure and Setup](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests)
- [Beginner's Guide to Installing Cypress](https://blog.testproject.io/2021/01/05/getting-started-with-cypress/)

#### **C. Videos:**

- **Traversy Media:** Cypress Crash Course
- **The Net Ninja:** Getting Started with Cypress Testing

#### **D. Practice Platforms:**

- Set up Cypress in a simple TodoMVC application or an online demo like `http://todomvc.com`.

---

### **5. Suggested Lesson Breakdown for 3 Hours**

#### **Hour 1: Introduction and Installation (60 minutes)**

- **Install Cypress (30 minutes):**
  - Guide students step-by-step through installation.
  - Verify the setup with `npx cypress open`.
- **Folder Structure Overview (20 minutes):**
  - Explain the purpose of each folder.
  - Discuss where to write tests and store mock data.
- **Q&A (10 minutes):**
  - Address any installation-related queries.

#### **Hour 2: Configuring Cypress (60 minutes)**

- **Creating and Editing `cypress.config.js` (30 minutes):**
  - Set up base URL, viewport size, and custom environment variables.
  - Discuss the importance of configuration files.
- **Hands-On Activity (20 minutes):**
  - Edit the configuration file and run the Test Runner to confirm changes.
- **Q&A (10 minutes):**
  - Clarify any configuration-related doubts.

#### **Hour 3: Running Cypress Tests (60 minutes)**

- **Open and Headless Modes (20 minutes):**
  - Demonstrate both modes and explain their use cases.
- **Exploring Example Tests (30 minutes):**
  - Run the default example tests in Cypress to show built-in features.
  - Discuss how to structure custom tests in the `integration` folder.
- **Recap and Q&A (10 minutes):**
  - Review installation and configuration steps.
  - Answer final questions and prepare students for the next lesson.

---

### **6. Additional Recommendations**

#### **Interactive Demonstrations:**

- Show students how to troubleshoot common installation issues (e.g., permissions, missing Node.js).
- Demonstrate live edits to `cypress.config.js` and their immediate effects.

#### **Encourage Participation:**

- Have students install Cypress independently and help each other with setup issues.
- Let students experiment with configuration settings like timeouts and viewport sizes.

#### **Provide Clear Instructions:**

- Step-by-step commands for installation and configuration.
- Tips for organizing the `integration` folder for scalable test cases.

#### **Focus on Practicality:**

- Use relatable examples, like setting up a base URL for a sample application.
- Explain how proper setup impacts the maintainability and scalability of test automation projects.
