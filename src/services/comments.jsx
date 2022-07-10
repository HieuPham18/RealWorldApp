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


export const getCommentBySlug = async (token, slug) => {
    try {
        const res = await axios.get(`https://api.realworld.io/api/articles/${slug}/comments`, options(token))
        const data = await res.data.comments
        console.log("Get_All_Comment: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const addComment = async (token, slug, inputData) => {
    try {
        const res = await axios.post(`https://api.realworld.io/api/articles/${slug}/comments`, inputData, options(token))
        const data = await res.data
        console.log("Res_post_commnet: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}


export const deleteComment = async (token, slug, id) => {
    try {
        await axios.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`, options(token))
    } catch (error) {
        console.log("Message Error: ", error)
    }
}
