const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // video: true,
  // videoCompression: 32, 
  // videoUploadOnPasses: false,
  e2e: {
    supportFile: 'cypress/support/index.js',
    baseUrl: 'yourURL',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
