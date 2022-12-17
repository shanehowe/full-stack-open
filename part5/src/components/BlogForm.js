import { useState } from 'react';

export const BlogForm = ({ addNewBlog }) => {

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  // Blog form
  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  // Blog form
  const handleAuthorChange = ({ target }) => {
    setAuthor(target.value);
  };

  // Blog Form
  const handleUrlChange = ({ target }) => {
    setUrl(target.value);
  };

  const addBlog = (e) => {
    e.preventDefault();

    addNewBlog({ title, author, url });
    setAuthor('');
    setTitle('');
    setUrl('');
  };

  return (
    <div>
      <h3>Create New</h3>
      <form onSubmit={addBlog}>
        <p>Title:  <input
          id='titleInput'
          onChange={handleTitleChange}
          type="text"
          value={title}
        /></p>
        <p>Author: <input
          id='authorInput'
          type="text"
          onChange={handleAuthorChange}
          value={author}
        /></p>
        <p>Url:    <input
          id='urlInput'
          onChange={handleUrlChange}
          type="text"
          value={url}
        /></p>
        <button type="submit">Create</button>
      </form>

    </div>
  );
};