describe ('Test Chatroom Function', () => {
  
    it ('Clicking the message button should open the chatroom', () => {
      cy.visit ('/');
      cy.get('[data-cy=open-chatroom]').click({force: true});
      cy.get('[data-cy=message-content]').should('contain', 'Welcome to');
      
    });
});