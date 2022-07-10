import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { getArticleFeed, getArticleGlobal, getArticleGlobalUser } from "../../services/articles"
import { favorited, unfavorited } from "../../services/favorites";
import { getTags, getTagsUser } from "../../services/tags";
import { articleContext } from "../../context/articleContext";

function ArticleGlobalUser() {
    const { accessToken } = useContext(userContext)
    const [temp, setTemp] = useState(false)
    const [articleGlobalUser, setArticleGlobalUser] = useState([])

    useEffect(() => {
        (async () => {
            if (accessToken) {
                // console.log("token", props.token)
                const res = await getArticleGlobalUser(accessToken)
                setArticleGlobalUser(res)
            }
        })()
    }, [accessToken, temp])

    const handleLike = async (status, slug) => {
        if (!status) {
            await favorited(accessToken, slug)
            setTemp(!temp)
        }
        else {
            await unfavorited(accessToken, slug)
            setTemp(!temp)
        }
    }

    return (
        <>
            {
                articleGlobalUser.length === 0 ? <div className="article-preview">Loading...</div> : articleGlobalUser.map((item, index) => {
                    return (
                        <div className="article-preview" key={index}>
                            <div className="article-meta">
                                <a href="profile.html"><img src={item.author.image} /></a>
                                <div className="info">
                                    <Link to={`/profile/@${item.author.username}`} className="author">{item.author.username}</Link>
                                    <span className="date">{new Date(item.createdAt).toDateString()}</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={() => handleLike(item.favorited, item.slug)}>
                                    <i className="ion-heart"></i> {item.favoritesCount}
                                </button>
                            </div>
                            <Link to={`/article/${item.slug}`} className="preview-link">
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <Link to={`/article/${item.slug}`}>Read more...</Link>
                                <ul className="tag-list">
                                    {
                                        item.tagList.map(tag => {
                                            return (
                                                <li className="tag-default tag-pill tag-outline" key={tag}>
                                                    {tag}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

function ArticleTag(props) {
    const articleTag = props.item
    const index = props.index
    return (
        <div className="article-preview" key={index}>
            <div className="article-meta">
                <a href="profile.html"><img src={articleTag.author.image} /></a>
                <div className="info">
                    <Link to={`/profile/@${articleTag.author.username}`} className="author">{articleTag.author.username}</Link>
                    <span className="date">{new Date(articleTag.createdAt).toDateString()}</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> {articleTag.favoritesCount}
                </button>
                {/* <p>fav: {item.favorited.toString()}</p> */}
            </div>
            <Link to={`/article/${articleTag.slug}`} className="preview-link">
                <h1>{articleTag.title}</h1>
                <p>{articleTag.description}</p>
                <Link to={`/article/${articleTag.slug}`}>Read more...</Link>
                <ul className="tag-list">
                    {
                        articleTag.tagList.map(tag => {
                            return (
                                <li className="tag-default tag-pill tag-outline" key={tag}>
                                    {tag}
                                </li>
                            )
                        })
                    }
                </ul>
            </Link>
        </div>
    )
}

function NavLogined(props) {
    const { accessToken } = useContext(userContext)
    const { tagContext, setTagContext } = useContext(articleContext)
    const refFeed = useRef(null)
    const refGlobal = useRef(null)
    const [changed, setChanged] = useState(true)
    const [temp, setTemp] = useState(false)
    const [checkedTag, setCheckedTag] = useState(false)
    const [articleFeed, setArticleFeed] = useState(null)
    const [articleGlobalUser, setArticleGlobalUser] = useState([])

    useEffect(() => {
        (async () => {
            if (props.token) {
                const res = await getArticleFeed(props.token)
                setArticleFeed(res)
            }
        })()
    }, [accessToken, temp])


    useEffect(() => {
        (async () => {
            if (accessToken) {
                // console.log("token", props.token)
                const res = await getArticleGlobalUser(accessToken)
                setArticleGlobalUser(res)
            }
        })()
    }, [accessToken, temp])

    // Handle Like
    const handleLike = async (status, slug) => {
        if (!status) {
            await favorited(accessToken, slug)
            setTemp(!temp)
        }
        else {
            await unfavorited(accessToken, slug)
            setTemp(!temp)
        }
    }

    // Handle change tab feed
    const handleChangeFeed = () => {
        setChanged(true)
        refFeed.current.classList.toggle('active')
        refGlobal.current.classList.toggle('active')
        setTagContext(null)
    }

    // Handle change tab global
    const handleChangeGlobal = () => {
        setChanged(false)
        refFeed.current.classList.toggle('active')
        refGlobal.current.classList.toggle('active')
        setTagContext(null)
    }




    return (
        <>
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <span className="nav-link active" ref={refFeed} style={{ cursor: 'pointer' }} href="" onClick={handleChangeFeed}>Your Feed</span>
                </li>
                <li className="nav-item">
                    <span className="nav-link disabled" ref={refGlobal} style={{ cursor: 'pointer' }} href="" onClick={handleChangeGlobal}>Global Feed</span>
                </li>
                {
                    tagContext ? <li className="nav-item">
                        <span className="nav-link disabled" style={{ cursor: 'pointer' }} href="" onClick={handleChangeGlobal}>#{tagContext}</span>
                    </li> : ''
                }
            </ul>
            {
                tagContext ?
                    articleGlobalUser.length > 0 &&
                    articleGlobalUser.filter(item => item.tagList.includes(tagContext)).map((item, index) => <ArticleTag item={item} index={index} />)
                    :
                    <div>
                        {
                            changed ? <div>
                                {
                                    articleFeed === null ? <div className="article-preview">Loading...</div> : articleFeed.length === 0 ? <div>No articles are here... yet.</div> : articleFeed.map((item, index) => {
                                        // setLike(item.favorited)
                                        return (
                                            <div className="article-preview" key={index}>
                                                <div className="article-meta">
                                                    <a href="profile.html"><img src={item.author.image} /></a>
                                                    <div className="info">
                                                        <Link to={`/profile/@${item.author.username}`} className="author">{item.author.username}</Link>
                                                        <span className="date">{new Date(item.createdAt).toDateString()}</span>
                                                    </div>
                                                    <button className="btn btn-outline-primary btn-sm pull-xs-right" onClick={() => handleLike(item.favorited, item.slug)} >
                                                        <i className="ion-heart"></i> {item.favoritesCount}
                                                    </button>
                                                    {/* <p>fav: {item.favorited.toString()}</p> */}
                                                </div>
                                                <Link to={`/article/${item.slug}`} className="preview-link">
                                                    <h1>{item.title}</h1>
                                                    <p>{item.description}</p>
                                                    <Link to={`/article/${item.slug}`}>Read more...</Link>
                                                    <ul className="tag-list">
                                                        {
                                                            item.tagList.map(tag => {
                                                                return (
                                                                    <li className="tag-default tag-pill tag-outline" key={tag}>
                                                                        {tag}
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                                : <ArticleGlobalUser />
                        }
                    </div>
            }

        </>
    )
}

function NavLogout() {
    const [article, setArticle] = useState([])

    useEffect(() => {
        (async () => {
            const res = await getArticleGlobal()
            setArticle(res)
        })()
    }, [])

    return (
        <>
            <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                    <a className="nav-link active" href="">Global Feed</a>
                </li>
            </ul>
            {
                article.length === 0 ? <div className="article-preview">Loading...</div> : article.map((item, index) => {
                    return (
                        <div className="article-preview" key={index}>
                            <div className="article-meta">
                                <a href="profile.html"><img src={item.author.image} /></a>
                                <div className="info">
                                    <a href="" className="author">{item.author.username}</a>
                                    <span className="date">{new Date(item.createdAt).toDateString()}</span>
                                </div>
                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                    <i className="ion-heart"></i>
                                </button>
                            </div>
                            <Link to={`/article/${item.slug}`} className="preview-link">
                                <h1>{item.title}</h1>
                                <p>{item.description}</p>
                                <Link to={`/article/${item.slug}`}>Read more...</Link>
                                <ul className="tag-list">
                                    {
                                        item.tagList.map((tag, index) => {
                                            return (
                                                <li className="tag-default tag-pill tag-outline" key={index} style={{ cursor: "pointer" }}>
                                                    {tag}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </Link>
                        </div>
                    )
                })
            }
        </>
    )
}

function Home() {
    const { accessToken } = useContext(userContext)
    const { setTagContext } = useContext(articleContext)
    const [tag, setTag] = useState('')
    const [tagArticle, setTagArticle] = useState([])

    useEffect(() => {
        (async () => {
            if (accessToken) {
                const res = await getTagsUser(accessToken)
                setTagArticle(res.tags)
            }
            else {
                const res = await getTags(accessToken)
                setTagArticle(res.tags)
            }
        })()
    }, [])

    const handleTags = async (tag) => {
        setTagContext(tag)
    }

    return (
        <div className="home-page">

            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div className="container page">
                <div className="row">

                    <div className="col-md-9">
                        <div className="feed-toggle">
                            {
                                accessToken ? <NavLogined token={accessToken} tag={tag} /> : <NavLogout />
                            }
                        </div>

                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>

                            <div className="tag-list">
                                {
                                    tagArticle.length > 0 && tagArticle.map((item, index) => <span style={{ cursor: 'pointer' }} key={index} className="tag-default tag-pill ng-binding ng-scope" onClick={() => handleTags(item)}>{item}</span>)
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Home;