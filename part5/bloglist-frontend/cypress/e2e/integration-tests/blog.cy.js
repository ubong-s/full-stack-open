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

         //  cy.login({ username: 'ublsyy', password: 'secretsd' });

         cy.get('.error')
            .should('have.text', 'Wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
            .and('have.css', 'border-style', 'solid')
            .and('not.contain', 'Ubong Usoro logged in');
      });
   });

   describe('When logged in', function () {
      beforeEach(function () {
         //  cy.get('#username').type('ubsly');
         //  cy.get('#password').type('secrets');
         //  cy.get('button').click();

         cy.login({ username: 'ubsly', password: 'secrets' });
      });

      it('A blog can be created', function () {
         cy.contains('new blog')
            .click()
            .then(() => {
               cy.get('#title').type('A new blog created');
               cy.get('#author').type('Matty');
               cy.get('#url').type('a-new-blog-created');
               cy.get('#create-blog').click();
            });

         cy.contains('A new blog created');
         cy.contains('Matty');
      });

      describe('first', () => {
         beforeEach(function () {
            cy.createBlog({
               title: 'Blog Post One',
               author: 'Matty',
               url: 'blog-post-one',
            })
               .createBlog({
                  title: 'Blog Post Two',
                  author: 'Kalle',
                  url: 'blog-post-two',
               })
               .createBlog({
                  title: 'Blog Post Three',
                  author: 'IIves',
                  url: 'blog-post-three',
               })
               .createBlog({
                  title: 'Blog Post Four',
                  author: 'Ubongy',
                  url: 'blog-post-four',
               });

            cy.contains('Blog Post One')
               .parent()
               .find('#toggle-details')
               .as('viewHideButton')
               .click();
         });

         it('user can like a blog', function () {
            cy.contains('Blog Post One')
               .parent()
               .parent()
               .find('.like-btn')

               .click();
         });

         it.only('user can delete a blog', function () {
            cy.contains('Blog Post One')
               .parent()
               .parent()
               .find('.delete-btn')
               .click();

            cy.get('.success')
               .should('have.text', 'Blog Post One deleted')
               .and('have.css', 'color', 'rgb(0, 128, 0)')
               .and('have.css', 'border-style', 'solid');
         });
      });
   });
});
