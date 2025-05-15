//import { rmdir, readFileSync} from 'fs'
const { defineConfig } = require("cypress");
const { readFileSync } = require("fs");
const config = process.env.CONFIG || "test1";

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
  //baseUrl: config === "prod" ? 'https://www.google.com' : 'https://www.facebook.com',

  setupNodeEvents(on, config) {
    // Implement node event listeners here
    var envName = config.env.envName;
    console.log("envName", envName)  
    

    let envconfig = readFileSync(`./cypress/config/data.${envName}.json`, 'utf-8');
    const configValues = JSON.parse(envconfig);

    config.env = { ...configValues};
    return config;
  },
},

env: {
  userRole: "admin",
  apiCode: "123456",
  apiUrl: "https://jsonplaceholder.typicode.com",
}
});