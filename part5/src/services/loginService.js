import axios from 'axios';
const baseUrl = '/api/login';

/*
    Returns reponse from the backend when trying to log in
    Will need a try catch block in App.js
    Either an error or token for user will be returned
*/

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
};

const loginService = { login };
export default loginService;