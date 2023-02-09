/* globals cy */
    
describe ('Test App', () => {
  
  it ('launches', () => {
    cy.visit ('/');
  });

  // it ('opens the nicheNU login page', () => {
  //   cy.visit ('/');
  //   cy.get('[data-cy=login-page]').should('contain', 'Welcome to');
  //   cy.get('[data-cy=login-page]').should('contain', 'nicheNU');
  //   cy.get('[data-cy=login-page]').should('contain', 'Find your niche!');
  // });

  it ('opens the hobby list page', () => {
    cy.visit ('/');
    cy.get('[data-cy=hobby-list]').should('contain', 'My Hobbies');
    cy.get('[data-cy=hobby-list]').should('contain', 'Other Hobbies');
  });

  it ('clicks to event page and checks if event list page is opened', () => {
    cy.visit ('/');
    cy.get('[data-cy=to-event-button]').click();
    cy.get('[data-cy=event-list]').should('contain', 'My Events');
    cy.get('[data-cy=event-list]').should('contain', 'Other Events');
  });
  
});