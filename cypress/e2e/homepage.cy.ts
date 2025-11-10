describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
  });

  describe('Page Load', () => {
    it('should load successfully', () => {
      cy.get('body').should('be.visible');
      cy.title().should('not.be.empty');
    });

    it('should display brand name', () => {
      cy.contains(/playful|smarlify/i).should('be.visible');
    });
  });

  describe('Game Cards', () => {
    it('should display all game cards', () => {
      cy.get('[data-testid="game-card"], .game-card, [class*="GameCard"]')
        .should('have.length.at.least', 3);
    });

    it('should show Traffic Run', () => {
      cy.contains(/traffic run/i).should('be.visible');
    });

    it('should show Crossy Road', () => {
      cy.contains(/crossy road/i).should('be.visible');
    });

    it('should show Space Shooter', () => {
      cy.contains(/space shooter/i).should('be.visible');
    });

    it('should navigate to game when clicked', () => {
      cy.contains(/traffic run/i)
        .parents('[data-testid="game-card"], .game-card, [class*="GameCard"]')
        .first()
        .click();
      cy.url().should('include', '/traffic-run');
    });
  });

  describe('Footer', () => {
    it('should display footer', () => {
      cy.scrollToElement('footer');
      cy.get('footer').should('be.visible');
    });
  });
});
