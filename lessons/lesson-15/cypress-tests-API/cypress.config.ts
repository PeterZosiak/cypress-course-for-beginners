import { defineConfig } from "cypress";
import { readFileSync } from "fs";

export default defineConfig({
  watchForFileChanges: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const customConfig = readFileSync('cypress/config/configuration.json', 'utf-8')
      const parsedConfig = JSON.parse(customConfig)
      
      config.env = { ...parsedConfig }
      return config

    },
  },
});
