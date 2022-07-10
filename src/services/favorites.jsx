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

export const favorited = async (token, slug) => {
    try {
        console.log("api", `https://api.realworld.io/api/articles/${slug}/favorite`)
        const res = await axios.post(`https://api.realworld.io/api/articles/${slug}/favorite`,{slug}, options(token))
        const data = await res.data
        console.log("favorite: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}


export const unfavorited = async (token, slug) => {
    try {
        await axios.delete(`https://api.realworld.io/api/articles/${slug}/favorite`, options(token))
    } catch (error) {
        console.log("Message Error: ", error)
    }
}
