import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { newNotification } from './notificationReducer';

const initialState = [];

export const blogsSlice = createSlice({
   name: 'blogs',
   initialState,
   reducers: {
      setBlogs: (state, action) => {
         return action.payload;
      },
      createBlog: (state, action) => {
         return [...state, action.payload];
      },
      updateBlog: (state, action) => {
         const { id } = action.payload;
         const blogToChange = state.find((blog) => blog.id === id);
         const newBlog = {
            ...blogToChange,
            likes: blogToChange.likes + 1,
         };

         return state.map((blog) => {
            return blog.id === id ? newBlog : blog;
         });
      },
      deleteBlog: (state, action) => {
         return state.filter((blog) => blog.id !== action.payload);
      },

      addComment: (state, action) => {
         let updatedBlog = action.payload;

         return state.map((blog) => {
            if (blog.id === updatedBlog.id) {
               return updatedBlog;
            } else {
               return blog;
            }
         });
      },
   },
});

export const initializeBlogsAsync = () => {
   return async (dispatch) => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
   };
};

export const createBlogAsync = (payload) => {
   return async (dispatch) => {
      try {
         const blog = await blogService.create(payload);
         dispatch(createBlog(blog));
         dispatch(
            newNotification(
               {
                  type: 'success',

                  text: `a new blog ${blog.title} by ${blog.author} added`,
               },
               5
            )
         );
      } catch (error) {
         dispatch(
            newNotification(
               {
                  type: 'error',
                  text: error.message,
               },
               5
            )
         );
      }
   };
};

export const updateBlogAsync = (payload) => {
   return async (dispatch) => {
      try {
         const blog = await blogService.update(payload);
         dispatch(updateBlog(payload));
         dispatch(
            newNotification(
               {
                  type: 'success',
                  text: `you liked ${blog.title}`,
               },
               5
            )
         );
      } catch (error) {
         dispatch(
            newNotification(
               {
                  type: 'error',
                  text: error.message,
               },
               5
            )
         );
      }
   };
};

export const deleteBlogAsync = (payload) => {
   return async (dispatch) => {
      try {
         await blogService.deleteBlog(payload);
         dispatch(deleteBlog(payload));
         dispatch(
            newNotification(
               {
                  type: 'success',
                  text: 'blog deleted',
               },
               5
            )
         );
      } catch (error) {
         dispatch(
            newNotification(
               {
                  type: 'error',
                  text: error.msg,
               },
               5
            )
         );
      }
   };
};

export const addCommentAsync = (payload) => {
   return async (dispatch) => {
      try {
         const { blog, msg } = await blogService.addCommentToBlog(payload);
         dispatch(addComment(blog));
         dispatch(
            newNotification(
               {
                  type: 'success',
                  text: msg,
               },
               5
            )
         );
      } catch (error) {
         dispatch(
            newNotification(
               {
                  type: 'error',
                  text: error.response.data.msg,
               },
               5
            )
         );
      }
   };
};

// Action creators are generated for each case reducer function
export const { setBlogs, createBlog, updateBlog, deleteBlog, addComment } =
   blogsSlice.actions;

export default blogsSlice.reducer;
