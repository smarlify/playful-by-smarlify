describe('User Flows', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('Browse and Play', () => {
    it('should browse homepage and play a game', () => {
      // User lands on homepage
      cy.get('body').should('be.visible');
      cy.contains(/playful|smarlify/i).should('be.visible');

      // User sees game cards
      cy.get('[data-testid="game-card"], .game-card').should('have.length.at.least', 3);

      // User clicks on Traffic Run
      cy.contains(/traffic run/i)
        .parents('[data-testid="game-card"], .game-card')
        .first()
        .click();

      // User is taken to game page
      cy.url().should('include', '/traffic-run');

      // Game loads
      cy.get('iframe', { timeout: 10000 }).should('be.visible');
    });
  });

  describe('Play and Return', () => {
    it('should use browser back button', () => {
      // Go to game page
      cy.visit('/traffic-run');
      cy.get('iframe').should('be.visible');

      // Use browser back
      cy.go('back');

      // Should be back on homepage
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Browse Multiple Games', () => {
    it('should navigate between games', () => {
      // Play Traffic Run
      cy.visit('/traffic-run');
      cy.get('iframe').should('be.visible');

      // Go back using browser
      cy.go('back');

      // Play Crossy Road
      cy.contains(/crossy road/i).click();
      cy.url().should('include', '/crossy-road');
      cy.get('iframe').should('be.visible');
    });
  });
});
