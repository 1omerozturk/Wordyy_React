import axios from 'axios'
import showToast from '../alert/ShowToast'
const API = 'https://wordyy.onrender.com/api'
// const API = 'http://localhost:5050/api'

// -------------------------------------------------
// User API
// -------------------------------------------------

export const loginUser = async (userData) => {
  return await axios.post(`${API}/user/login`, userData)
}

export const registerUser = async (userData) => {
  return await axios.post(`${API}/user/register`, userData)
}

export const logOut = () => {
  localStorage.removeItem('token')
  return (window.location.href = '/login')
}

export const getUserProfilePicture = async (name) => {
  return await axios.get(`${API}/${name}`)
}

export const getImage = (data) => {
  return `${API + '/' + data}`
}

export const getUser = async (id) => {
  const token = getToken()
  const response = await axios.get(`${API}/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getAllUsers = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API}/user/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const updateUser = async (id, data) => {
  try {
    const token = getToken()
    if (!token) throw new Error('Token not found')

    const response = await axios.put(`${API}/user/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    console.error('Updating error:', error)

    if (error.response) {
      // Backend hatası varsa
      throw error.response
    } else if (error.request) {
      // İstek gönderildi ama yanıt alınamadı
      throw new Error('No response from server')
    } else {
      // İstek oluşturma sırasında hata oluştu
      throw new Error(error.message || 'Unexpected error')
    }
  }
}
export const deleteUser = async (id) => {
  try {
    const token = getToken()
    const response = await axios.delete(`${API}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

// -------------------------------------------------
// Wordy API
// -------------------------------------------------

export const getAllWords = async () => {
  try {
    const response = await axios.get(`${API}/wordy`)
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const getWordy = async (id) => {
  try {
    const token = getToken()
    const response = await axios.get(`${API}/wordy/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const createWordy = async (wordy) => {
  try {
    const token = getToken()
    if (!token) throw new Error('Token not found')

    const response = await axios.post(
      `${API}/wordy`,
      wordy, // Request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Header doğru yapılandırıldı
        },
      },
    )

    return response
  } catch (error) {
    console.error('Error in createWord:', error.response?.data || error.message)
  }
}

export const updateWordy = async (id, wordy) => {
  try {
    const token = getToken()
    if (!token) throw new Error('Token not found')

    const response = await axios.put(`${API}/wordy/${id}`, wordy, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const deleteWordy = async (id) => {
  try {
    const token = getToken()
    if (!token) throw new Error('Token not found')
    const response = await axios.delete(`${API}/wordy/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const getOtoWordy = async (level, difficult) => {
  try {
    const token = getToken()
    const response = await axios.post(
      `${API}/user/otocreate`,
      { level: level, difficult: difficult },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

//--------------------------------------
// Quiz API

export const getQuizData = async () => {
  try {
    const token = getToken()
    const response = await axios.get(`${API}/quiz`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const getQuizDataId = async (id) => {
  try {
    const token = getToken()
    const response = await axios.get(`${API}/quiz/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

//--------------------------------------
// WordyList API

export const getAllWordyList = async (userId) => {
  if (userId) {
    try {
      const token = getToken()
      const response = await axios.get(`${API}/wordylist/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      console.error(error.response ? error.response.data : error.message)
    }
  }
}
export const getWordyListData = async (id) => {
  if (id) {
    try {
      const token = getToken()
      const response = await axios.get(`${API}/wordylist/list/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch (error) {
      console.error(error.response ? error.response.data : error.message)
    }
  }
}
export const addWordyWordyList = async (wListId, wordyId) => {
  try {
    const token = getToken()
    const response = await axios.post(
      `${API}/wordylist/addWordy/${wListId}`,
      { wordyId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response
  } catch (error) {
    if (error.response.status === 409) {
      showToast(error.response.data.message, 'error')
    }
  }
}

export const createWordyList = async (userId, data) => {
  console.log(data)
  try {
    const token = getToken()
    const response = await axios.post(`${API}/wordylist/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const getWordyListById = async (userId, id) => {
  try {
    const token = getToken()
    const response = await axios.get(`${API}/wordylist/${userId}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

export const deleteWordyListById = async (userId, id) => {
  try {
    const token = getToken()
    const response = await axios.delete(`${API}/wordyList/${userId}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}
export const updateWordyListById = async (userId, id, data) => {
  try {
    const token = getToken()
    const response = await axios.put(`${API}/wordylist/${userId}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

// -----------------------------------------
// Translate API
// -----------------------------------------

export const translateTrToEn = async (text) => {
  try {
    const response = await axios.post(`${API}/translate/tr-en`, { text: text })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}
export const translateEnToTr = async (text) => {
  try {
    const response = await axios.post(`${API}/translate/en-tr`, { text: text })
    return response
  } catch (error) {
    console.error(error.response ? error.response.data : error.message)
  }
}

// ------------------------------------
// User Log check function
export const getToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return null
  }
  return token
}
