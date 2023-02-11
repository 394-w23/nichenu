/* globals cy */

describe('Test Hobby Duplicate Invalidation', () => {

    it('Creating an event with an empty field should yield a warning', () => {
        let eventName = `TestEvent${Math.floor(Math.random() * 100000)}` // create an event name with a random id attached
        cy.visit('/');
        // go the create hobby
        cy.get('[data-cy=open-add-button]').click();
        cy.get('[data-cy=create-hobby-button]').click();

        // Create a hobby called TestHobby2048
        cy.get('[data-cy=add-hobby-name]').type(eventName, {scrollBehavior: false});
        cy.get('[data-cy=add-hobby-desc]').type('This hobby will be deleted', {scrollBehavior: false});

        // Submit Create Hobby form
        cy.get('[data-cy=create-hobby-submit-button]').click();

        // should see the my hobbies page
        cy.get('[data-cy=hobby-list]').should('exist');

        // Now try to add the same hobby again
         // go the create hobby
         cy.get('[data-cy=open-add-button]').click();
         cy.get('[data-cy=create-hobby-button]').click();

        // Create a hobby called TestHobby2048
        cy.get('[data-cy=add-hobby-name]').type(eventName, {scrollBehavior: false});
        cy.get('[data-cy=add-hobby-desc]').type('This hobby will be deleted', {scrollBehavior: false});
 
         // Submit Create Hobby form
         cy.get('[data-cy=create-hobby-submit-button]').click();
         
         // Now the redirection to hobbies page should not work
         cy.get('[data-cy=hobby-list]').should('not.exist');

         // Check the duplicate error
         cy.get('[data-cy=alert]').should('exist');
         cy.get('[data-cy=alert]').should('contain', 'Hobby name already exists');


    })
})