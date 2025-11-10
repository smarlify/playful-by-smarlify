// ***********************************************************
// This support file is loaded for component tests
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands
import './commands';

// Mount command for React components
import { mount } from 'cypress/react18';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);

export {};
