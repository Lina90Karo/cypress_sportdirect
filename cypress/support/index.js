import './commands'

// unfortunately needed for cypress to not crash on console errors like CORS
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});