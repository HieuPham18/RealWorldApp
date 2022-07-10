import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";

const API_USER = "https://api.realworld.io/api/user"

const initialState = {
    bio: "",
    email: "",
    image: "",
    token: "",
    username: ""
}

function Setting() {
    const { accessToken, infoUser, setAccessToken } = useContext(userContext)
    const [info, setInfo] = useState(initialState)
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (infoUser) {
            setInfo(infoUser)
        }
    }, [infoUser])


    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { token, ...rest } = info
        const formData = {
            user: {
                ...rest,
                password: password
            }
        }
        // Handle update data
        handleUpdateUser(formData, accessToken)
    }


    const handleUpdateUser = async (data, token) => {
        const res = await axios.put(API_USER, data, {
            headers: {
                'Content-Type': 'application/json',
                'Acess-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${token}`,
                'Accept': "application/json"
            }
        })

        // Update jwt localstogre
        localStorage.setItem('auth', JSON.stringify(res.data.user.token))
        setAccessToken(res.data.user.token)
        navigate('/')
        // window.location.reload()
    }

    const handleLogout = () => {
        localStorage.clear()
        window.location.href = '/';
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control" type="text" placeholder="URL of profile picture"
                                        value={info.image}
                                        onChange={(e) => setInfo({ ...info, image: e.target.value })}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Your Name"
                                        value={info.username}
                                        onChange={(e) => setInfo({ ...info, username: e.target.value })}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea className="form-control form-control-lg" rows="8"
                                        placeholder="Short bio about you"
                                        value={info.bio}
                                        onChange={(e) => setInfo({ ...info, bio: e.target.value })}
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email"
                                        value={info.email}
                                        onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" onClick={handleOnSubmit}>
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>
                        <hr />
                        <button className="btn btn-outline-danger" onClick={handleLogout}>Or click here to logout.</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Setting;

// useEffect(() => {
//     getUser()
// }, [accessToken])

// const getUser = async () => {
//     const userByToken = await axios.get(API_USER, { headers: { "Authorization": `Bearer ${accessToken}` } })
//     const res = await userByToken.data.user
//     console.log(res)
//     setInfo(res)
// }