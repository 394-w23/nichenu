/* globals cy */
// WARNING: This test depend on the existence of a specific eve
describe('Test Event Leave and Join', () => {

    it('Leaving an event should remove the event from My Events section', () => {
        // Navigate to Events page
        cy.visit('/');
        cy.get('[data-cy=to-event-button]').click();

        // My events should not have Walkathon yet
        cy.get('[data-cy=my-event-list]').should('not.contain', 'Walkathon');

        // Join an event called Walkathon 
        cy.get('[data-cy=join-event-Walkathon]').click();

        // Walkathon should now be in the list
        cy.get('[data-cy=my-event-list]').should('contain', 'Walkathon');

        // Leave event
        cy.get('[data-cy=leave-event-Walkathon]').click();

        // Walkathon should not be in the event list.
        cy.get('[data-cy=my-event-list]').should('not.contain', 'Walkathon');
    });

});