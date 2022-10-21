import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import Blog from './Blog';

test('<Blog/> renders only blog title and author by default', () => {
   const blog = {
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
   };

   const updateLikesHandler = jest.fn();
   const deleteBlogHandler = jest.fn();

   const { container } = render(
      <Blog
         blog={blog}
         updateLikes={updateLikesHandler}
         deleteBlog={deleteBlogHandler}
      />
   );

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
