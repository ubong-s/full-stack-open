import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CreateBlogForm from './CreateBlogForm';

describe('Create Blog Form', () => {
   const createBlog = jest.fn();
   const user = userEvent.setup();

   test('create new blog', async () => {
      const { container } = render(<CreateBlogForm createBlog={createBlog} />);

      const titleInput = container.querySelector('#title');
      const authorInput = container.querySelector('#author');
      const urlInput = container.querySelector('#url');
      const sendButton = screen.getByRole('button');

      await user.type(titleInput, 'A new form by from Ubong');
      await user.type(authorInput, 'Ubong');
      await user.type(urlInput, 'a-new-form-by-from');
      await user.click(sendButton);

      expect(createBlog.mock.calls).toHaveLength(1);
      expect(createBlog.mock.calls[0][0].title).toBe(
         'A new form by from Ubong'
      );
      expect(createBlog.mock.calls[0][0].author).toBe('Ubong');
      expect(createBlog.mock.calls[0][0].url).toBe('a-new-form-by-from');
   });
});
