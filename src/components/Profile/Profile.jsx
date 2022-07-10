import { userContext } from "../../context/userContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProfileUser, unfollowUser, followUser } from "../../services/profile";
import { getArticleFavorite, getArticlelUser } from "../../services/articles"

function ButtonFollow(props) {
    const { accessToken } = useContext(userContext)
    const follow = props.profile.following
    const username = props.profile.username


    const handleClick = async (status) => {
        if (status) {
            await unfollowUser(accessToken, username)
            props.reload()
        }
        else {
            await followUser(accessToken, username)
            props.reload()
        }
    }

    return (
        <button
            className={props.profile.following ? 'btn btn-sm action-btn text-success font-italic' : 'btn btn-sm action-btn '}
            onClick={() => handleClick(follow)}>
            <i className="ion-plus-round"></i>
            &nbsp;
            {props.profile.following ? 'Unfollow' : 'Follow'} {props.profile.username}
        </button>
    )
}

function BottonSetting() {
    return (
        <Link
            to="/settings"
            className="btn btn-sm btn-outline-secondary action-btn">
            <i className="ion-gear-a"></i> Edit Profile Settings
        </Link>
    )
}

function Profile() {
    const { infoUser, accessToken } = useContext(userContext)
    const myArticleRef = useRef(null)
    const myArticleRef1 = useRef(null)
    const { username } = useParams()
    const [tmp, setTemp] = useState(false)
    const [status, setStatus] = useState(true)
    const [profile, setProfile] = useState(null)
    const [article, setArticle] = useState([])
    const [articleFavorite, setArticleFavorite] = useState([])

    useEffect(() => {
        (async () => {
            if (accessToken && infoUser) {
                const res1 = await getProfileUser(username, accessToken)
                const res2 = await getArticlelUser(username, accessToken)
                console.log("re", res1)
                setProfile(res1)
                setArticle(res2)
            }
        })()
    }, [infoUser, username, tmp])

    const handleMyArticles = () => {
        setStatus(true)
        myArticleRef.current.classList.toggle('active')
        myArticleRef1.current.classList.toggle('active')
    }

    const handleFavoriteArticles = async () => {
        setStatus(false)
        myArticleRef.current.classList.remove('active')
        myArticleRef1.current.classList.toggle('active')

        // Get article favorite
        const res = await getArticleFavorite(accessToken, username)
        setArticleFavorite(res)
    }

    const reset = () => {
        setTemp(!tmp)
    }


    return (

        <div className="profile-page">
            <div className="user-info">
                <div className="container">
                    <div className="row">
                        {
                            profile && <div className="col-xs-12 col-md-10 offset-md-1">
                                <img src={profile.image} className="user-img" />
                                <h4>{profile.username}</h4>
                                <h3>{profile.bio}</h3>

                                {
                                    profile.username === infoUser.username ? <BottonSetting /> : <ButtonFollow profile={profile} reload={reset} />
                                }

                            </div>
                        }

                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">

                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <div className="articles-toggle">
                            <ul className="nav nav-pills outline-active">
                                <li className="nav-item" >
                                    <span className="nav-link active" ref={myArticleRef} style={{ cursor: 'pointer' }} href="" onClick={handleMyArticles}>My Articles</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link" href="" ref={myArticleRef1} style={{ cursor: 'pointer' }} onClick={handleFavoriteArticles}>Favorited Articles</span>
                                </li>
                            </ul>
                        </div>

                        {
                            status ?
                                article && article.map((item, index) => {
                                    return (
                                        <div className="article-preview" key={index}>
                                            <div className="article-meta">
                                                <a href=""><img src={item.author.image} /></a>
                                                <div className="info">
                                                    <a href="" className="author">{item.author.username}</a>
                                                    <span className="date">{new Date(item.createdAt).toDateString()}</span>
                                                </div>
                                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                                    <i className="ion-heart"></i> {item.favoritesCount}
                                                </button>
                                            </div>
                                            <a href="" className="preview-link">
                                                <h1>{item.title}</h1>
                                                <p>{item.description}</p>
                                                <span>Read more...</span>
                                            </a>
                                        </div>
                                    )
                                })
                                :
                                articleFavorite.length === 0 ? <div className="article-preview">No article</div> : articleFavorite.length > 0 && articleFavorite.map((item, index) => {
                                    return (
                                        <div className="article-preview" key={index}>
                                            <div className="article-meta">
                                                <a href=""><img src={item.author.image} /></a>
                                                <div className="info">
                                                    <a href="" className="author">{item.author.username}</a>
                                                    <span className="date">{new Date(item.createdAt).toDateString()}</span>
                                                </div>
                                                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                                                    <i className="ion-heart"></i> {item.favoritesCount}
                                                </button>
                                            </div>
                                            <a href="" className="preview-link">
                                                <h1>{item.title}</h1>
                                                <p>{item.description}</p>
                                                <span>Read more...</span>
                                            </a>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;


