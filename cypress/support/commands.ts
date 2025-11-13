// ***********************************************
// Custom commands for Cypress tests
// ***********************************************

/**
 * Wait for iframe to load and switch context
 */
Cypress.Commands.add('getIframeBody', (iframeSelector: string) => {
  return cy
    .get(iframeSelector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then(cy.wrap);
});

/**
 * Wait for page to be fully loaded
 */
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'document');
  cy.document().its('readyState').should('eq', 'complete');
});

/**
 * Check if element is in viewport
 */
Cypress.Commands.add('isInViewport', { prevSubject: true }, (subject) => {
  const rect = subject[0].getBoundingClientRect();
  const windowHeight = Cypress.config('viewportHeight');
  const windowWidth = Cypress.config('viewportWidth');

  expect(rect.top).to.be.at.least(0);
  expect(rect.left).to.be.at.least(0);
  expect(rect.bottom).to.be.at.most(windowHeight);
  expect(rect.right).to.be.at.most(windowWidth);

  return subject;
});

/**
 * Wait for animation to complete
 */
Cypress.Commands.add('waitForAnimation', (selector: string, timeout = 2000) => {
  cy.get(selector, { timeout }).should('exist');
  cy.wait(500); // Wait for animation to complete
});

/**
 * Scroll to element smoothly
 */
Cypress.Commands.add('scrollToElement', (selector: string) => {
  cy.get(selector).scrollIntoView({ duration: 500 });
  cy.wait(500);
});

/**
 * Check external link without navigating
 */
Cypress.Commands.add('checkExternalLink', (selector: string) => {
  cy.get(selector)
    .should('have.attr', 'href')
    .and('not.be.empty')
    .then((href) => {
      expect(href).to.match(/^https?:\/\//);
    });
});

/**
 * Mock Firebase authentication (for future use)
 */
Cypress.Commands.add('loginWithFirebase', (email: string, password: string) => {
  // This will be implemented when Firebase is integrated
  cy.log('Firebase login not implemented yet');
});

/**
 * Check for responsive image loading
 */
Cypress.Commands.add('checkImageLoading', (selector: string) => {
  cy.get(selector)
    .should('be.visible')
    .and((img) => {
      expect(img[0].naturalWidth).to.be.greaterThan(0);
      expect(img[0].naturalHeight).to.be.greaterThan(0);
    });
});

// Type definitions
declare global {
  namespace Cypress {
    interface Chainable {
      getIframeBody(iframeSelector: string): Chainable<JQuery<HTMLBodyElement>>;
      waitForPageLoad(): Chainable<void>;
      isInViewport(): Chainable<JQuery<HTMLElement>>;
      waitForAnimation(selector: string, timeout?: number): Chainable<void>;
      scrollToElement(selector: string): Chainable<void>;
      checkExternalLink(selector: string): Chainable<void>;
      loginWithFirebase(email: string, password: string): Chainable<void>;
      checkImageLoading(selector: string): Chainable<void>;
    }
  }
}

export {};
