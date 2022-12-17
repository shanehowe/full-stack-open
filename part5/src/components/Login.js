import { Notification } from './Notification';
import PropTypes from 'prop-types';

export const LoginForm = ({
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  message,
  username,
  password
}) => {
  return (
    <>
      <h3>Log In</h3>
      <Notification message={message}/>
      <form onSubmit={handleLogin}>
        <div>
          <p>Username: <input
            value={username}
            type="text"
            placeholder="username"
            autoComplete="off"
            onChange={handleUsernameChange}
          /></p>

          <p>Password: <input
            value={password}
            type="password"
            autoComplete="off"
            placeholder="password"
            onChange={handlePasswordChange}
          /></p>
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};