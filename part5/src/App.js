import { useState, useEffect, useRef } from 'react';
import { LoginForm } from './components/Login';
import { BlogForm } from './components/BlogForm';
import { Blogs } from './components/Blogs';
import { Notification } from './components/Notification';
import { Togglable } from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/loginService';


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const blogFormRef = useRef();

  // Set Blogs
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>  blogs = blogs.sort((a, b) => b.likes - a.likes))
      .then(blogs => setBlogs(blogs));
  }, []);

  // Make log in session permanent
  useEffect(() => {
    const userJson = window.localStorage.getItem('LoggedInBlogUser');

    if (userJson) {
      const user = JSON.parse(userJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Log in Form
  const handleUsernameChange = ({ target }) => {
    setUsername(target.value);
  };

  // Log in Form
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  // Try log user in
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login(username, password);
      window.localStorage.setItem(
        'LoggedInBlogUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Wrong username or password');

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  // Log user out
  const handleLogOut = (e) => {
    e.preventDefault();

    setUser(null);
    window.localStorage.removeItem('LoggedInBlogUser');
  };

  // Create new Blog
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const response = await blogService.create(blogObject);
      setBlogs(blogs.concat(response));

      setMessage(`A new blog ${blogObject.title} by ${blogObject.author} has been added!`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    catch (exception) {
      setMessage('Error Creating Blog. Ensure All fields have been filled out.');

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  // Update likes of blog
  const updateLikes = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, blog);
      const updatedBlogs = blogs.map(b => b.id !== updatedBlog.id ? b : updatedBlog);
      setBlogs(updatedBlogs);
    } catch (exception) {
      setMessage('An error occured trying to like that blog.');

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };


  // Handle deletion of blog
  const deleteBlog = async (id, blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.remove(id);

        setBlogs(blogs.filter(b => b.id !== id));
      } catch (exception) {
        setMessage('Error deleting blog.');

        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }
  };

  return user === null ?
    <LoginForm
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      handleLogin={handleLogin}
      message={message}
      username={username}
      password={password}
    /> :
    <>
      <h2>Blogs</h2>
      <Notification message={message}/>
      <p>Logged in as {user.name} <button onClick={handleLogOut}>Log out</button></p>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm
          addNewBlog={addBlog}
        />
      </Togglable>
      <Blogs
        blogs={blogs}
        user={user}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
      />
    </>;

};

export default App;
