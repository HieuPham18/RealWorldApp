
import axios from 'axios'
import { Link } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import { useContext, useEffect, useState } from 'react'
import { getUser } from '../../services/userAuth'

const API_USER = 'https://api.realworld.io/api/user'

const NavbarLogined = (props) => {
    if (props.currentUser && props.info) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Home
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/editor" className="nav-link">
                        <i className="ion-compose"></i>&nbsp;New Post
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/settings" className="nav-link">
                        <i className="ion-gear-a"></i>&nbsp;Settings
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/profile/@${props.info.username}`}
                        className="nav-link">
                        {/* <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} /> */}
                        {props.info.username}
                    </Link>
                </li>

            </ul>
        )
    }
    return null
}
const NavBarLogout = () => {
    return (
        <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
                <Link to='/' className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
                <Link to='/login' className="nav-link">Sign in</Link>
            </li>
            <li className="nav-item">
                <Link to='/signup' className="nav-link">Sign up</Link>
            </li>
        </ul>
    )
}

function Header() {

    const { accessToken, infoUser } = useContext(userContext)

    // console.log(">>> info by context", infoUser)
    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="index.html">conduit</a>
                {
                    accessToken ? <NavbarLogined currentUser={accessToken} info={infoUser} /> : <NavBarLogout />
                }
            </div>
        </nav>
    )
}

export default Header;

// const getUser = async (token) => {
//     const getInfo = await axios.get(API_USER, { headers: { "Authorization": `Bearer ${token}` } })
//     const response = await getInfo.data
//     return response
// }
// const [info, setInfo] = useState(null)
// useEffect(() => {
//     (async () => {
//         if (accessToken) {
//             const res = await getUser(accessToken)
//             setInfo(res)
//             setInfoUser(res)
//         }
//     })()
// }, [accessToken])
