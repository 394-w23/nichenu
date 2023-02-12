/* globals cy */
    
describe ('Test Hobby Form Validation', () => {
  
    it ('Creating an hobby with an empty field should yield a warning', () => {
      cy.visit ('/');
      cy.get('[data-cy=open-add-button]').click();
      cy.get('[data-cy=create-hobby-button]').click();
      cy.get('[data-cy=create-hobby-form]').should('contain', 'Hobby Name');
    //   cy.get('[data-cy=create-hobby-form]').should('contain', 'Description');
      cy.get('[data-cy=create-hobby-form]').should('contain', 'Create Hobby');
      cy.get('[data-cy=create-hobby-submit-button]').click();
      cy.get('[data-cy=create-hobby-form]').should('contain', 'Missing Fields');
    });
  
  });