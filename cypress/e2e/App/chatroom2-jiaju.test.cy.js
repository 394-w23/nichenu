describe ('Test Chatroom Function', () => {
  
    it ('Sending a message in chat room adds message to chat room feed', () => {
      cy.visit ('/');
      cy.get('[data-cy=open-chatroom]').click({force: true});
 
      cy.get('[data-cy=message-input]').first().type('Test message.');
      cy.get('[data-cy="message-submit"]').should('be.visible');
      cy.get('[data-cy="message-submit"]').click();
      cy.get('[data-cy=message-content]').should('contain', 'Test message');
      
    });
});