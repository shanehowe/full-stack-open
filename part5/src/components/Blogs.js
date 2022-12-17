import Blog from './Blog';

export const Blogs = ({ blogs, updateLikes, user, deleteBlog }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          user={user.name}
          deleteBlog={deleteBlog}/>
      )}
    </div>
  );
};