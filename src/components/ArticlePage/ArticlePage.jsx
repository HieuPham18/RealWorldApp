import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { deleteArticle, getArticlelBySlug } from "../../services/articles";
import { Link } from "react-router-dom"
import { addComment, getCommentBySlug, deleteComment } from "../../services/comments";

function ActionsUser(props) {
    const slugArticle = props.slug
    const { accessToken } = useContext(userContext)
    const navigate = useNavigate()

    const handleDel = async (slug) => {
        await deleteArticle(accessToken, slug)
        navigate('/')
    }

    return (
        <span>
            <Link
                to={`/editor/${slugArticle}`}
                className="btn btn-outline-secondary btn-sm">
                <i className="ion-edit"></i> Edit Article
            </Link>

            <button className="btn btn-outline-danger btn-sm" style={{ marginLeft: 8 }} onClick={() => handleDel(slugArticle)}>
                <i className="ion-trash-a"></i> Delete Article
            </button>

        </span>
    )
}

function ActionMeta(props) {
    const favoritePost = props.favorite

    return (
        <>
            <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp;
                Follow Eric Simons <span className="counter"></span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp;
                Favorite Post <span className="counter">{`(${favoritePost.favoritesCount})`}</span>
            </button>
        </>
    )
}

function ArticlePageLogout() {

    return (
        <>
            <div className="banner">
                <div className="container">

                    <h1>How to build webapps that scale</h1>

                    <div className="article-meta">
                        <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                        <div className="info">
                            <a href="" className="author">Eric Simons</a>
                            <span className="date">January 20th</span>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            Follow Eric Simons <span className="counter">(10)</span>
                        </button>
                        &nbsp;&nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Favorite Post <span className="counter">(29)</span>
                        </button>
                    </div>

                </div>
            </div>

            <div className="container page">

                <div className="row article-content">
                    <div className="col-md-12">
                        <p>
                            Web development technologies have evolved at an incredible clip over the past few years.
                        </p>
                        <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                        <p>It's a great solution for learning how other frameworks work.</p>
                    </div>
                </div>

                <hr />

                <div className="article-actions">
                    <div className="article-meta">
                        <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                        <div className="info">
                            <a href="" className="author">Eric Simons</a>
                            <span className="date">January 20th</span>
                        </div>

                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp;
                            Follow Eric Simons
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp;
                            Favorite Post <span className="counter">(29)</span>
                        </button>
                    </div>
                </div>

                <div className="row">

                    <div className="col-xs-12 col-md-8 offset-md-2">

                        <form className="card comment-form">
                            <div className="card-block">
                                <textarea className="form-control" placeholder="Write a comment..." rows="3"></textarea>
                            </div>
                            <div className="card-footer">
                                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                <button className="btn btn-sm btn-primary">
                                    Post Comment
                                </button>
                            </div>
                        </form>

                        <div className="card">
                            <div className="card-block">
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className="card-footer">
                                <a href="" className="comment-author">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                </a>
                                &nbsp;
                                <a href="" className="comment-author">Jacob Schmidt</a>
                                <span className="date-posted">Dec 29th</span>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-block">
                                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            </div>
                            <div className="card-footer">
                                <a href="" className="comment-author">
                                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                                </a>
                                &nbsp;
                                <a href="" className="comment-author">Jacob Schmidt</a>
                                <span className="date-posted">Dec 29th</span>
                                <span className="mod-options">
                                    <i className="ion-edit"></i>
                                    <i className="ion-trash-a"></i>
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}

function ArticlePageUserLogin(props) {
    const { accessToken, infoUser } = useContext(userContext)
    const [temp, setTemp] = useState(false)
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [articleSlug, setArticleSlug] = useState()


    useEffect(() => {
        (async () => {
            if (accessToken) {
                const res = await getArticlelBySlug(accessToken, props.slug)
                setArticleSlug(res)
            }
        })()
    }, [props.slug])


    useEffect(() => {
        (async () => {
            if (accessToken) {
                const res = await getCommentBySlug(accessToken, props.slug)
                setComments(res)
            }
        })()
    }, [props.slug, temp])

    const handleComment = async (e) => {
        e.preventDefault();
        const formData = {
            comment: {
                body: comment
            }
        }
        await addComment(accessToken, props.slug, formData)
        setComment('')
        setTemp(!temp)
    }

    const handleDelComment = async (id) => {
        const idComment = id
        await deleteComment(accessToken, props.slug, idComment)
        setTemp(!temp)
    }

    return (
        <>
            {
                articleSlug !== undefined && infoUser !== null ?
                    <div>
                        <div className="banner">
                            <div className="container">
                                <h1>{articleSlug.title}</h1>
                                <div className="article-meta">
                                    <a href=""><img src={articleSlug.author.image} /></a>
                                    <div className="info">
                                        <a href="" className="author">{articleSlug.author.username}</a>
                                        <span className="date">{new Date(articleSlug.createdAt).toDateString()}</span>
                                    </div>
                                    {
                                        infoUser.username === articleSlug.author.username ? <ActionsUser slug={articleSlug.slug} /> : <ActionMeta favorite={articleSlug} />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="container page">
                            <div className="row article-content">
                                <div className="col-md-12">
                                    <p>
                                        {articleSlug.body}
                                    </p>
                                    <ul className="tag-list">
                                        {
                                            articleSlug.tagList.map((item, index) => <li key={index} className="tag-default tag-pill tag-outline ng-binding ng-scope">{item}</li>)
                                        }
                                    </ul>
                                </div>
                            </div>

                            <hr />

                            <div className="article-actions">
                                <div className="article-meta">
                                    <a href="profile.html"><img src={articleSlug.author.image} /></a>
                                    <div className="info">
                                        <a href="" className="author">Eric Simons</a>
                                        <span className="date">January 20th</span>
                                    </div>
                                    {
                                        infoUser.username === articleSlug.author.username ? <ActionsUser slug={articleSlug.slug} /> : <ActionMeta favorite={articleSlug} />
                                    }
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-xs-12 col-md-8 offset-md-2">

                                    <form className="card comment-form">
                                        <div className="card-block">
                                            <textarea className="form-control" placeholder="Write a comment..." rows="3" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                        </div>
                                        <div className="card-footer">

                                            <img src={articleSlug.author.image} className="comment-author-img" />

                                            <button className="btn btn-sm btn-primary" onClick={handleComment}>
                                                Post Comment
                                            </button>
                                        </div>
                                    </form>

                                    {
                                        comments.sort((a, b) => b.id - a.id).map((item, index) => <div className="card" key={index}>
                                            <div className="card-block">
                                                <p className="card-text">{item.body}</p>
                                            </div>
                                            <div className="card-footer">
                                                <a href="" className="comment-author">
                                                    <img src={item.author.image} className="comment-author-img" />
                                                </a>
                                                &nbsp;
                                                <a href="" className="comment-author">{item.author.username}</a>
                                                <span className="date-posted">{new Date(item.createdAt).toDateString()}</span>
                                                {item.author.username === infoUser.username ? <span className="mod-options">
                                                    <i className="ion-trash-a" onClick={() => handleDelComment(item.id)}></i>
                                                </span> : ''
                                                }
                                            </div>
                                        </div>

                                        )
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                    : ''
            }
        </>
    )
}

function ArticlePage() {
    const { slug } = useParams()
    const { accessToken, infoUser } = useContext(userContext)

    return (
        <div className="article-page">
            {
                accessToken ? <ArticlePageUserLogin token={accessToken} info={infoUser} slug={slug} /> : <ArticlePageLogout slug={slug} />
            }
        </div>
    );
}

export default ArticlePage