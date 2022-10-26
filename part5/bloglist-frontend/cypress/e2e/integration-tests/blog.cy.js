describe('Blog app', () => {
   beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.visit('http://localhost:3000');
   });

   it('Login form is shown', function () {
      cy.visit('http://localhost:3000/');
      cy.contains('log in to application');
      cy.get('form').then(() => {
         cy.get('input#username');
         cy.get('input#password');
         cy.get('button').should('have.text', 'login');
      });
   });
});
