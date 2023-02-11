/* globals cy */
    
describe ('Test Event Leave and Join', () => {
  
    it ('Joining an event should add that event to user’s “My Events” section', () => {
        // Navigate to Events page
        cy.visit ('/');
        cy.get('[data-cy=to-event-button]').click();
        
        // Check if on Events page
        cy.get('[data-cy=event-list]').should('contain', 'My Events');
        
        // Check that event we're going to join is under "Other Events"
        cy.get('[data-cy=other-events]').should('contain', 'Walkathon');
        cy.get('[data-cy=my-events]').should('not.contain', 'Walkathon');

        // Join the event
        cy.get('[data-cy=join-event-Walkathon]').click();
        
        // Check that event we're going to join is under "My Events"
        cy.get('[data-cy=other-events]').should('not.contain', 'Walkathon');
        cy.get('[data-cy=my-events]').should('contain', 'Walkathon');
    }); 

});