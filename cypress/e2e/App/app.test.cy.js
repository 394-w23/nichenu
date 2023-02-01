/* globals cy */
    
describe ('Test App', () => {
  
  it ('launches', () => {
    cy.visit ('/');
  });

  it ('opens the nicheNU login page', () => {
    cy.visit ('/');
    cy.get('[data-cy=login-page]').should('contain', 'Welcome to');
    cy.get('[data-cy=login-page]').should('contain', 'nicheNU');
    cy.get('[data-cy=login-page]').should('contain', 'Find your niche!');
  });

  // it ('clicking sign in button works', () => {
  //   cy.visit ('/');
  //   cy.get('[data-cy=login-button]').click();
    
  // });

  // it ('opens with hobby list page with My Hobbies', () => {
  //   cy.visit ('/');
  //   cy.get('[data-cy=hobby-list]').should('contain', 'My Hobbies');
  // });

  // it ('opens with hobby list page with Other Hobbies', () => {
  //   cy.visit ('/');
  //   cy.get('[data-cy=hobby-list]').should('contain', 'Other Hobbies');
  // });
  
});