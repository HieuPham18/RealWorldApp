import axios from "axios"

const API_PROFILE = "https://api.realworld.io/api/profiles"
const API_PROFILE_FOLLOW = "https://api.realworld.io/api/profiles"

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

export const getProfileUser = async (username, token) => {
    try {
        const res = await axios.get(`${API_PROFILE}/${username}`, options(token))
        const data = await res.data.profile
        console.log("Res_profile: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const followUser = async (token, username) => {
    try {
        const res = await axios.post(`https://api.realworld.io/api/profiles/${username}/follow`, {}, options(token))
        const data = await res.data
        console.log("Res_profile: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const unfollowUser = async (token, username) => {
    try {
        const res = await axios.delete(`https://api.realworld.io/api/profiles/${username}/follow`, options(token))
        const data = await res.data
        console.log("Res_profile: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}