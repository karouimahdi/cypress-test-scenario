const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 90000, // Increase timeout to 90 seconds

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
