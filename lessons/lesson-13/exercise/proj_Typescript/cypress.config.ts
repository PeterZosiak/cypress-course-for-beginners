import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
       cy.visit('http://localhost:5173/')
      // implement node event listeners here
    },
  },
});
