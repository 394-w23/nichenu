/* globals cy */
// WARNING: This test depend on the existence of a specific eve
describe('Test Hobby Leave and Join', () => {

    it('Leaving an hobby should remove the hobby from My Hobbies section', () => {
        // Navigate to Hobbies page
        cy.visit('/');
        cy.get('[data-cy=to-hobby-button]').click();
        
        // Check if on Hobbies page
        cy.get('[data-cy=hobby-list]').should('contain', 'My Hobbies');

        // My hobbies should not have Test User Hobby yet
        cy.get('[data-cy=my-hobbies]').should('not.contain', 'Test User Hobby');

        // Join a hobby called Test User Hobby 
        cy.get('[data-cy=join-hobby-Test-User-Hobby]').click();

        // Test User Hobby should now be in 'my hobbies'
        cy.get('[data-cy=my-hobbies]').should('contain', 'Test User Hobby');

        // Click hobby to expand tand reveal leave button
        cy.get('[data-cy=hobby-expand-Test-User-Hobby]').click();

        // Leave hobby
        cy.get('[data-cy=leave-hobby-Test-User-Hobby]').click();

        // Test User Hobby should not be under 'my hobbies'.
        cy.get('[data-cy=my-hobbies]').should('not.contain', 'Test User Hobby');

        // Check that hobby is back under "Other Hobbies"
        cy.get('[data-cy=other-hobbies]').should('contain', 'Test User Hobby');
    });

});