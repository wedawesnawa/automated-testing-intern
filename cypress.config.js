const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // video: true,
  // videoCompression: 32, 
  // videoUploadOnPasses: false,
  e2e: {
    supportFile: 'cypress/support/index.js',
    baseUrl: 'http://e-ticket-staging.sanatasystem.net',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
