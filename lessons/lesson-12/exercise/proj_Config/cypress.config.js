const { defineConfig } = require("cypress");
const { readFileSyns } = require("fb");
const config = process.env.config || "test1";
console.log("config", config)

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 1000,
  pageLoadTimeout: 60000,
  watchForFileChanges: false,
  video: true,
  screenshotOnRunFailure: true,
  retries: {
    openMode: 0,
    runMode: 2,
  },
e2e: {
  baseUrl: config === "prod"
    ? 'https://www.google.com' : 'https://www.facebook.com',

  setupNodeEvents(on, config) {
    // Implement node event listeners here

    
  },
},

env: {
  userRole: "admin",
  apiCode: "123456",
  apiUrl: "https://jsonplaceholder.typicode.com",
}
});