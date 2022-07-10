import axios from "axios"

const API_LOGIN = "https://api.realworld.io/api/users/login"
const API_REGISTER = "https://api.realworld.io/api/users"
const API_USER = "https://api.realworld.io/api/user"

const options = (token) => {
    return {
        headers: {
            'Content-Type': 'application/json',
            'Acess-Control-Allow-Origin': '*',
            'Authorization': `Bearer ${token}`,
            'Accept': "application/json"
        }
    }
}

// Register
export const registerUser = async (inputData) => {
    try {
        const res = await axios.post(API_REGISTER, inputData)
        const data = await res.data
        console.log("Res_register: ", data)
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

// Login
export const loginUser = async (inputData) => {
    try {
        const res = await axios.post(API_LOGIN, inputData)
        const data = await res.data.user
        const token = await data.token
        localStorage.setItem('auth', JSON.stringify(token))
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

// Get user
export const getUser = async (token) => {
    try {
        const res = await axios.get(API_USER, options(token))
        const data = await res.data.user
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

// Update user
export const updateUser = async (token, data) => {
    try {
        const res = await axios.put(API_USER, options(token), data)
        const data = res.data
        console.log("Res_updateUser", data)
    } catch (error) {
        console.log("Message Error: ", error)
    }
}