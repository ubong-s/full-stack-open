// eslint-disable-next-line
const dummy = (blogs) => {
   return 1;
};

const totalLikes = (blogs) => {
   const reducer = (sum, item) => {
      return sum + item['likes'];
   };

   return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
   const sortedBlogs = blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1));
   let result = {};

   if (blogs.length > 0) {
      result.title = sortedBlogs[0].title;
      result.author = sortedBlogs[0].author;
      result.likes = sortedBlogs[0].likes;
   }

   return blogs.length > 0 ? result : null;
};

const mostBlogs = (blogs) => {
   let result = {};
   if (blogs.length > 0) {
      const authors = [];
      for (let i = 0; i < blogs.length; i++) {
         authors.push(blogs[i].author);
      }

      const authorCount = authors.reduce((allAuthors, author) => {
         allAuthors[author] = (allAuthors[author] || 0) + 1;

         return allAuthors;
      }, {});

      const authorWithMostArticles = Object.keys(authorCount).reduce((a, b) => {
         return authorCount[a] > authorCount[b] ? a : b;
      });

      result.author = authorWithMostArticles;
      result.blogs = authorCount[authorWithMostArticles];
   }

   return blogs.length > 0 ? result : null;
};

const mostLikes = (blogs) => {
   let result = {};

   if (blogs.length > 0) {
      let authorLikesCount = [
         ...new Set(
            blogs.map((blog) => {
               return {
                  name: blog.author,
                  likes: blog.likes,
               };
            })
         ),
      ].reduce((allAuthors, author) => {
         console.log(allAuthors[author.likes]);

         if (allAuthors[author.name]) {
            allAuthors[author.name] += author.likes;
         } else {
            allAuthors[author.name] = author.likes;
         }

         return allAuthors;
      }, {});

      const authorWithMostLikes = Object.keys(authorLikesCount).reduce(
         (a, b) => {
            return authorLikesCount[a] > authorLikesCount[b] ? a : b;
         }
      );

      result.author = authorWithMostLikes;
      result.likes = authorLikesCount[authorWithMostLikes];
   }

   return blogs.length > 0 ? result : null;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
