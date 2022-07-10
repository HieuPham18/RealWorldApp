import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/userAuth";

const initValue = {
    username: '',
    email: '',
    password: '',
}

function SignUp() {
    const [infoResgister, setInfoResgister] = useState(initValue)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        //Set form data 
        const formData = {
            user: {
                ...infoResgister
            }
        }
        // Handle register
        await registerUser(formData)

        // Reset input form
        setInfoResgister(initValue)

        // Navigate
        navigate('/login')
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="">Have an account?</a>
                        </p>

                        <ul className="error-messages">
                            <li>That email is already taken</li>
                        </ul>

                        <form>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    onChange={(e) => setInfoResgister({ ...infoResgister, username: e.target.value })}
                                    value={infoResgister.username}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Email"
                                    onChange={(e) => setInfoResgister({ ...infoResgister, email: e.target.value })}
                                    value={infoResgister.email}
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input className="form-control form-control-lg"
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setInfoResgister({ ...infoResgister, password: e.target.value })}
                                    value={infoResgister.password}
                                />
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right" onClick={handleSubmit}>
                                Sign up
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SignUp;