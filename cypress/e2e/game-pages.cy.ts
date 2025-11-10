describe('Game Pages', () => {
  const games = [
    { name: 'Traffic Run', url: '/traffic-run' },
    { name: 'Crossy Road', url: '/crossy-road' },
    { name: 'Space Shooter', url: '/space-shooter' },
  ];

  describe('Game Navigation', () => {
    games.forEach((game) => {
      it(`should load ${game.name} game page`, () => {
        cy.visit(game.url);
        cy.get('iframe', { timeout: 10000 }).should('be.visible');
        cy.contains(new RegExp(game.name, 'i')).should('be.visible');
      });
    });

    it('should navigate back to homepage using browser back', () => {
      cy.visit('/');
      cy.contains(/traffic run/i)
        .parents('[data-testid="game-card"], .game-card, [class*="GameCard"]')
        .first()
        .click();
      cy.url().should('include', '/traffic-run');
      cy.go('back');
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Coming Soon Game', () => {
    it('should show coming soon message', () => {
      cy.visit('/crazy-vacuum-3d', { failOnStatusCode: false });
      cy.get('body').then(($body) => {
        const text = $body.text().toLowerCase();
        expect(text).to.match(/coming soon|stay tuned|launching soon/i);
      });
    });
  });
});
