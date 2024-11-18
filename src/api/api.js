import axios from 'axios'

const API = 'http://localhost:5050/api'

// User API

export const loginUser = (userData) => {
  return axios.post(`${API}/users/login`, userData)
}

export const registerUser = (userData) => {
  return axios.post(`${API}/users/register`, userData)
}

export const logOut = () => {
  localStorage.removeItem('token')
  return (window.location.href = '/login')
}

// Wordy API

export const getAllWords = async () => {
  try {
    const token = getToken()

    const response = await axios.get(
      `${API}/wordy`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const createWord = async (wordy) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found');

    const response = await axios.post(
      `${API}/wordy`, 
      wordy, // Request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Header doğru yapılandırıldı
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error in createWord:', error.response?.data || error.message);
  }
};



// User Log check function
export const getToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null;
  }
  return token
}
