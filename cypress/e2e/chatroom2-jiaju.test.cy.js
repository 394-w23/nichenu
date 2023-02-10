describe ('Test Chatroom Function', () => {
  
    it ('Sending a message in chat room adds message to chat room feed', () => {
      cy.visit ('/');
      cy.get('[data-cy=open-chatroom]').click({force: true});
      cy.get('[data-cy=message-input]').type('Test message.');
      cy.get('[data-cy=open-submit]').click({force: true});
      cy.get('[data-cy=message-content]').should('contain', 'Test message');
      
    });
});