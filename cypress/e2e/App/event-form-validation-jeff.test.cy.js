/* globals cy */
    
describe ('Test Event Form Validation', () => {
  
  it ('Creating an event with an empty field should yield a warning', () => {
    cy.visit ('/');
    cy.get('[data-cy=open-add-button]').click();
    cy.get('[data-cy=create-event-button]').click();
    cy.get('[data-cy=create-event-form]').should('contain', 'Event name');
    cy.get('[data-cy=create-event-form]').should('contain', 'Start date and start time');
    cy.get('[data-cy=create-event-form]').should('contain', 'Create Event');
    cy.get('[data-cy=create-event-submit-button]').click();
    cy.get('[data-cy=create-event-form]').should('contain', 'Missing Fields');
  });

});