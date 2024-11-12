import axios from "axios";

const API='http://localhost:5050/api'

export const loginUser=(userData)=>{
    return axios.post(`${API}/users/login`,userData)
}

export const registerUser=(userData)=>{
    return axios.post(`${API}/users/register`,userData)
}

export const logOut=()=>{
    localStorage.removeItem('token')
    return(window.location.href="/login")
}