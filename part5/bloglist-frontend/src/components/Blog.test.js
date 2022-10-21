import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
   let container;

   const blog = {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
   };

   const updateLikesHandler = jest.fn();
   const deleteBlogHandler = jest.fn();

   beforeEach(() => {
      container = render(
         <Blog
            blog={blog}
            updateLikes={updateLikesHandler}
            deleteBlog={deleteBlogHandler}
         />
      ).container;
   });

   test('<Blog/> renders only blog title and author by default', () => {
      const author = screen.getByText(blog.author);
      const title = screen.getByText(blog.title);
      const url = screen.queryByText(blog.url);
      const likes = container.querySelector('.likes');
      const toggledSection = container.querySelector('.toggled-section');

      expect(author).toBeDefined();
      expect(title).toBeDefined();
      expect(url).not.toBeInTheDocument();
      expect(likes).not.toBeInTheDocument();
      expect(toggledSection).not.toBeInTheDocument();
   });

   test('blog url and number of likes are shown when the button controlling the shown details has been clicked', async () => {
      const user = userEvent.setup();
      const button = screen.getByText('view');
      await user.click(button);

      const author = screen.getByText(blog.author);
      const title = screen.getByText(blog.title);
      const url = screen.queryByText(blog.url);
      const likes = container.querySelector('.likes');
      const toggledSection = container.querySelector('.toggled-section');

      expect(author).toBeDefined();
      expect(title).toBeDefined();
      expect(url).toBeInTheDocument();
      expect(likes).toBeInTheDocument();
      expect(toggledSection).toBeInTheDocument();
   });
});
