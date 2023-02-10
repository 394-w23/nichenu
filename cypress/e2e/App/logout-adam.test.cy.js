/* globals cy */


describe ('Test Logout Function', () => {
  
    it ('Logging in as a test user and then logging out should return to the landing page', () => {
      cy.visit ('/');
      cy.get('[data-cy=logout-button]').click();
      cy.get('[data-cy=login-page]').should('contain', 'Welcome to');
      cy.get('[data-cy=login-page]').should('contain', 'nicheNU');
      
    });
});