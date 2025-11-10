// ***********************************************************
// This support file is loaded before all tests
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands
import './commands';

// Preserve cookies between tests
Cypress.Cookies.debug(true);

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // that might come from third-party scripts or iframes
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('hydration')) {
    return false;
  }
  if (err.message.includes('Application offline') || err.message.includes('installations/app-offline')) {
    return false;
  }
  // Let other exceptions fail the test
  return true;
});

// Before each test
beforeEach(() => {
  // Clear local storage and session storage
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Add custom viewport sizes
Cypress.Commands.add('setMobileViewport', () => {
  cy.viewport(375, 667); // iPhone SE
});

Cypress.Commands.add('setTabletViewport', () => {
  cy.viewport(768, 1024); // iPad
});

Cypress.Commands.add('setDesktopViewport', () => {
  cy.viewport(1920, 1080); // Full HD
});

// Type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      setMobileViewport(): Chainable<void>;
      setTabletViewport(): Chainable<void>;
      setDesktopViewport(): Chainable<void>;
    }
  }
}

export {};
