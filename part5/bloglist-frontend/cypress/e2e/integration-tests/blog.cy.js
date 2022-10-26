describe('Blog app', () => {
   beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');

      const user = {
         name: 'Ubong Usoro',
         username: 'ubsly',
         password: 'secrets',
      };

      cy.request('POST', 'http://localhost:3003/api/users/', user);

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

   describe('Login', function () {
      it('succeeds with correct credentials', function () {
         cy.get('#username').type('ubsly');
         cy.get('#password').type('secrets');
         cy.contains('login').click();

         cy.contains('Ubong Usoro logged in');
         cy.contains('logout');
         cy.contains('new blog');
      });

      it('fails with wrong credentials', function () {
         cy.get('#username').type('ubslyf');
         cy.get('#password').type('secretsf');
         cy.contains('login').click();

         cy.get('.error')
            .should('have.text', 'Wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
            .and('not.contain', 'Ubong Usoro logged in');
      });
   });
});
