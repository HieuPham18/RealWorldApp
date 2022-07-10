import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../context/userContext'
import { loginUser } from '../../services/userAuth'

const initValue = {
    email: "",
    password: ""
}

function SignIn() {
    const [input, setInput] = useState(initValue)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Set form login
        const formData = {
            user: {
                ...input
            }
        }
        //* Handle login
       await loginUser(formData)

        // Reset from input
        setInput(initValue)

        // Navigate
        navigate('/')
        window.location.reload()
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign In</h1>
                        <p className="text-xs-center">
                            <Link to="/register">
                                Need an account?
                            </Link>
                        </p>

                        {/* <ListErrors errors={this.props.errors} /> */}

                        <form >
                            <fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="email"
                                        placeholder="Email"
                                        onChange={(e) => setInput({ ...input, email: e.target.value })}
                                        value={input.email}
                                    />
                                </fieldset>

                                <fieldset className="form-group">
                                    <input
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        onChange={(e) => setInput({ ...input, password: e.target.value })}
                                        value={input.password}
                                    />
                                </fieldset>

                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    type="submit"
                                    onClick={handleSubmit}
                                >
                                    Sign in
                                </button>

                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignIn