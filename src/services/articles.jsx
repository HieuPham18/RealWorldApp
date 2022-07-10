import axios from "axios"

const API_ARTICLE = "https://api.realworld.io/api/articles"
const API_ARTICLE_GLOBAL_USER = "https://api.realworld.io/api/articles?limit=10&offset=0"
const API_ARTICLE_USER = "https://api.realworld.io/api/articles?author="

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


export const getArticleGlobal = async () => {
    try {
        const res = await axios.get(API_ARTICLE)
        const data = await res.data.articles
        console.log("Res_article_global: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const getArticleGlobalUser = async (token) => {
    try {
        const res = await axios.get(API_ARTICLE_GLOBAL_USER, options(token))
        const data = await res.data.articles
        console.log("Res_article_global_user: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const getArticlelUser = async (username, token) => {
    try {
        // console.log("api", `${API_ARTICLE_USER}/${username}`)
        const res = await axios.get(`${API_ARTICLE_USER}${username}`, options(token))
        const data = await res.data.articles
        console.log("Res_article_user: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const getArticlelBySlug = async (token, slug) => {
    try {
        const res = await axios.get(`${API_ARTICLE}/${slug}`, options(token))
        const data = await res.data.article
        console.log("Res_article_slug: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const getArticleFavorite = async (token, username) => {
    try {
        const res = await axios.get(`https://api.realworld.io/api/articles?favorited=${username}&limit=5&offset=0`, options(token))
        const data = await res.data.articles
        console.log("Res_article_favorite: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const getArticleFeed = async (token) => {
    try {
        const res = await axios.get(`https://api.realworld.io/api/articles/feed?limit=10&offset=0`, options(token))
        const data = await res.data.articles
        console.log("Res_article_Feed: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }

}

export const addArticle = async (token, inputData) => {
    try {
        const res = await axios.post(API_ARTICLE, inputData, options(token),)
        const data = await res.data.article
        console.log("Res_add_article_user: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const updateArticle = async (token, slug, inputData) => {
    try {
        const res = await axios.put(`${API_ARTICLE}/${slug}`, inputData, options(token))
        const data = await res.data
        console.log("Res_update_article_user: ", data)
        return data
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

export const deleteArticle = async (token, slug) => {
    try {
        await axios.delete(`${API_ARTICLE}/${slug}`, options(token))
    } catch (error) {
        console.log("Message Error: ", error)
    }
}

