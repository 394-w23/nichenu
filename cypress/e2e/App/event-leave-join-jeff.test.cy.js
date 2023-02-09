/* globals cy */
    
describe ('Test Event Leave and Join', () => {
  
    it ('Leaving an event as the last participant deletes the event', () => {
        // Navigate to Create Event page
        cy.visit ('/');
        cy.get('[data-cy=open-add-button]').click();
        cy.get('[data-cy=create-event-button]').click();
        
        // Check if on Create Event page
        cy.get('[data-cy=create-event-form]').should('contain', 'Event name');
        cy.get('[data-cy=create-event-form]').should('contain', 'Start date and start time');
        cy.get('[data-cy=create-event-form]').should('contain', 'Create Event');

        // Fill in required fields
        cy.get('[data-cy=add-event-name]').type('Archery Competition', {scrollBehavior: false});
        cy.get('[data-cy=add-event-desc]').type('Event to Create and Leave', {scrollBehavior: false});
        // cy.get('[data-cy=add-event-associated-hobby]').type('Archery', {scrollBehavior: false});
        cy.get('[data-cy=add-event-location]').type('SPAC', {scrollBehavior: false});
        cy.get('[data-cy=add-event-start-date]').click().type('February 8, 3023', {force: true});    
        cy.get('[data-cy=add-event-start-time]').type('0900', {scrollBehavior: false});
        cy.get('[data-cy=add-event-end-date]').click().type('February 9, 3023', {force: true});       
        cy.get('[data-cy=add-event-end-time]').type('1000', {scrollBehavior: false});
        
        // Submit Create Event form
        cy.get('[data-cy=create-event-submit-button]').click();
        
        // Check if on Event List page with new event
        cy.get('[data-cy=event-list]').should('contain', 'Archery Competition');

        // Leave event
        cy.get('[data-cy=leave-event-ArcheryCompetition]').click();

        // Check if on Event List page with new event
        cy.get('[data-cy=leave-event-ArcheryCompetition]').should('not.exist');
    }); 

});