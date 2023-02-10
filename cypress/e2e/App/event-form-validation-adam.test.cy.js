/* globals cy */
    
describe ('Test Event Form Validation', () => {
  
    it ('Creating an event with an with a time in the past should yield a warning', () => {
      cy.visit ('/');
      cy.get('[data-cy=open-add-button]').click();
      cy.get('[data-cy=create-event-button]').click();
      cy.get('[data-cy=create-event-form]').should('contain', 'Event name');
      cy.get('[data-cy=create-event-form]').should('contain', 'Start date and start time');
      cy.get('[data-cy=create-event-form]').should('contain', 'Create Event');
      cy.get('[data-cy=add-event-name]').type('Archery Competition', {scrollBehavior: false});
      cy.get('[data-cy=add-event-desc]').type('Event to Create and Leave', {scrollBehavior: false});
      cy.get('[data-cy=add-event-location]').type('SPAC', {scrollBehavior: false});
      cy.get('[data-cy=add-event-start-date]').click().type('February 9, 3023', {force: true});    
      cy.get('[data-cy=add-event-start-time]').type('1000', {scrollBehavior: false});
      cy.get('[data-cy=add-event-end-date]').click().type('February 9, 3023', {force: true});       
      cy.get('[data-cy=add-event-end-time]').type('900', {scrollBehavior: false});
      
      // Submit Create Event form
      cy.get('[data-cy=create-event-submit-button]').click();
      cy.get('[data-cy=create-event-form]').should('contain', 'Missing Fields');
      cy.get('[data-cy=create-event-form]').should('contain', 'The provided start date and time, and end date and time is not valid');
    });
  
  });