const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      let sharedValue = ''

      on("task", {
        saveValue(value) { 
          sharedValue = value
          return ''
        }, 

        getValue() {
          return sharedValue
         }
      })
    },
  },
});