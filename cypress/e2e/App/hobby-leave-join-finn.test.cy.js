/* globals cy */
    
describe ('Test Event Leave and Join', () => {
  
    it ('Joining an event should add that event to user’s “My Events” section', () => {
        // Navigate to Hobbies page
        cy.visit ('/');
        cy.get('[data-cy=to-hobby-button]').click();
        
        // Check if on Hobbies page
        cy.get('[data-cy=hobby-list]').should('contain', 'My Hobbies');
        
        // Check that event we're going to join is under "Other Hobbies"
        cy.get('[data-cy=other-hobbies]').should('contain', 'Just Dance squad');
        cy.get('[data-cy=my-hobbies]').should('not.contain', 'Just Dance squad');

        // Join the event
        cy.get('[data-cy=join-hobby-Just-Dance-squad]').click();
        
        // Check that event we're going to join is under "My Events"
        cy.get('[data-cy=other-hobbies]').should('not.contain', 'Just Dance squad');
        cy.get('[data-cy=my-hobbies]').should('contain', 'Just Dance squad');
    }); 

});