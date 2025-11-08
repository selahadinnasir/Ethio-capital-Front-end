import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

// Set up the Authorization header globally with the token (middleware)
const setupAxios = () => {
  const token = localStorage.getItem('authToken');

  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('No token found');
  }

  // Optionally set a base URL if needed
  axios.defaults.baseURL = `${API_URL}`; // Example base URL
};

export default setupAxios;
