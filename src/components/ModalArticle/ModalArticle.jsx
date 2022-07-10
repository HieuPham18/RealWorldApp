import { useContext, useEffect, useState } from "react";
import axios from "axios"
import { userContext } from "../../context/userContext";
import { addArticle, getArticlelBySlug, updateArticle } from "../../services/articles";
import { useNavigate, useParams } from "react-router-dom";

const initialValue = {
    title: "",
    description: "",
    body: "",
}

function ModalArticle() {
    const { accessToken, } = useContext(userContext)
    const { slug } = useParams()
    const [err, setErr] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState([])
    const [post, setPost] = useState(initialValue)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            if (slug) {
                const res = await getArticlelBySlug(accessToken, slug)
                const { title, body, description, tagList, ...rest } = res
                const inputData = {
                    title: title,
                    body: body,
                    description: description
                }
                setPost(inputData)
                setTags(tagList)
            }
        })()
    }, [])


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!post.title) {
            setErr("title can't be blank")
            return
        }
        else if (!post.description) {
            setErr("description can't be blank")
            return
        }
        else if (!post.body) {
            setErr("body can't be blank")
            return
        }
        //Create form data
        const formData = {
            article: {
                ...post,
                tagList: tags
            }
        }

        if (slug) {
            //  Update
            await updateArticle(accessToken, slug, formData)
            // const slug = res.article.slug
            // console.log("s", slug)
            // navigate(`/article/${slug}`)
            navigate('/')
        } else {
            // Post
            const res = await addArticle(accessToken, formData)
            const slug = res.slug
            navigate(`/article/${slug}`)
        }
    }

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setTags([...tags, text])
            setText('')
        }
    };

    const hanhleDel = (id) => {
        const newarray = tags.filter(tag => tag !== tags[id])
        setTags(newarray)
    }

    return (

        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {
                            err ? <li style={{ color: '#990000', fontWeight: 600 }}>{err}</li> : ''
                        }
                        <form >
                            <fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg" placeholder="Article Title" onChange={(e) => setPost({ ...post, title: e.target.value })} value={post.title} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control" placeholder="What's this article about?" value={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control" rows="8"
                                        placeholder="Write your article (in markdown)" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })}></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control input-tags" placeholder="Enter tags"
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <div className="tag-list">
                                        {
                                            tags.length > 0 && tags.map((item, index) => <span className="tag-default tag-pill" key={index}><i className="ion-close-round" onClick={() => hanhleDel(index)} ></i> {item}
                                            </span>)
                                        }
                                    </div>
                                </fieldset>
                                <button className="btn btn-lg pull-xs-right btn-primary" type="button" onClick={handleOnSubmit}>
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default ModalArticle;

// axios.post("https://api.realworld.io/api/articles",
// formData,
// {
//     headers: {
//         'Content-Type': 'application/json',
//         'Acess-Control-Allow-Origin': '*',
//         'Authorization': `Bearer ${accessToken}`,
//         'Accept': "application/json"
//     }
// }
// )
//     .then(res => console.log("post-ar", res))
//     .catch(err => console.log("Error:", err))