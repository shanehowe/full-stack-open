import { useState } from 'react';

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const [showFull, setShowFull] = useState(false);

  // Styling
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const buttonStyle = {
    marginLeft: '4px'
  };

  const blogToSend = {
    author: blog.author,
    title: blog.title,
    url: blog.url,
    user: blog.user.id,
    likes: blog.likes + 1
  };


  return showFull ?
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowFull(!showFull)}  style={buttonStyle}>Hide</button></p>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={() => updateLikes(blog.id, blogToSend)}>like</button></p>
      <p>{blog.user.username}</p>
      {user === blog.user.username && <button onClick={() => deleteBlog(blog.id, blog)}>Delete</button>}
    </div>
    :
    <div style={blogStyle}>
      <p>{blog.title} {blog.author} <button onClick={() => setShowFull(!showFull)}  style={buttonStyle}>View</button></p>
    </div>;
};

export default Blog;