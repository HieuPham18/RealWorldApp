import axios from "axios"

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

export const getTagsUser = async (token) => {
    try {
        const res = await axios.get('https://api.realworld.io/api/tags', options(token))
        const data = await res.data
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}


export const getTags = async (token) => {
    try {
        const res = await axios.get('https://api.realworld.io/api/tags')
        const data = await res.data
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}
