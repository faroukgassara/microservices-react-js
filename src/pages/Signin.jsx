import React, { useEffect, useState } from 'react'
import './signin.css'
import logo from '../assets/images/signupp.png';
import logoo from '../assets/images/ab.png';
import axios from 'axios';
import swal from 'sweetalert';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../actions/index';
import Modal from './modal';
import ReCAPTCHA from 'react-google-recaptcha';
import { API_URL } from '../constants/apiUrl';
const SignIn = () => {

    const state = useSelector((state) => state);

    const dispatch = useDispatch();

    const { signIn, jwt, logOut } = bindActionCreators(actionsCreators, dispatch)


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [age, setAge] = useState();
    const [address, setAddress] = useState("");
    const [cin, setCin] = useState();
    const [phone, setPhone] = useState();
    const [confirmpassword, setConfirmpassword] = useState("");

    const [disablelogin, setDisablelogin] = React.useState(true);
    const [disablesignup, setDisableSignup] = React.useState(true);
    const [disableerroremail, setDisableerroremail] = React.useState(true);
    const [disableerrorpassword, setDisableerrorpassword] = React.useState(true);
    const [disableerrorage, setDisableerrorage] = React.useState(true);
    const [disableerrorcin, setDisableerrorcin] = React.useState(true);
    const [disableerroraddress, setDisableerroraddress] = React.useState(true);
    const [disableerrorphone, setDisableerrorphone] = React.useState(true);
    const [disableerrorfirstname, setDisableerrorfirstname] = React.useState(true);
    const [disableerrorlastname, setDisableerrorlastname] = React.useState(true);
    const [disableerrorconfirmpassword, setDisableerrorconfirmpassword] = React.useState(true);
    const [loading, setLoading] = useState(false);
    const [application, setApplication] = useState();


    const [touchedemail, setTouchedemail] = useState(false);
    const [touchedpassword, setTouchedpassword] = useState(false);
    const [touchedage, setTouchedage] = useState(false);
    const [touchedcin, setTouchedcin] = useState(false);
    const [touchedaddress, setTouchedaddress] = useState(false);
    const [touchedphone, setTouchedphone] = useState(false);
    const [touchedfirstname, setTouchedfirstname] = useState(false);
    const [touchedlastname, setTouchedlastname] = useState(false);
    const [touchedconfirmpassword, setTouchedconfirmpassword] = useState(false);

    const [applications, setApplications] = useState([])
    const [IsOpen, setIsOpen] = useState(false)


    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const passwordRegex = RegExp(
        /^[A-Za-z0-9]*$/
    );

    const navigate = useNavigate();

    const SignUp = event => {
        event.preventDefault()
        setLoading(true)
        const user = JSON.stringify({
            "email": email,
            "password": password,
            "firstname": firstname,
            "lastname": lastname,
            "age": 15,
            "address": address,
            "cin": Number(cin),
            "locked": false,
            "enabled": false,
            "picture": "efef",
            "phone": Number(phone)
        });
        axios.post(API_URL+'users/signup', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => { window.location.reload(); setLoading(false) })
            .catch(error => {
                setLoading(false)
                if (error.response.data.statusCode == 500) {
                    swal("USER EXISTSl!", "Try To Login or Confirm you account!", "error");
                } else {
                    swal("Try Again!", "Unknown error has occurred!", "error");
                }
            });
    }


    const LogIn = event => {
        event.preventDefault()
        setLoading(true)
        axios.post(API_URL+'login', {
            "email": email,
            "password": password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                jwt(response.data.access_token);
                signIn(response.data.user);
                setLoading(false);
                navigate('/')
            })
            .catch(error => {
                setLoading(false)
                if (error.response.data.statusCode == 401) {
                    swal("Unauthorized!", "Incorrect password!", "error");
                } else if (error.response.data.statusCode == 500) {
                    swal("Check Your Email!", "Specified account does not exist!", "error");
                } else {
                    swal("Try Again!", "Unknown error has occurred!", "error");
                }
            });
    }

    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });
    }, []);

    useEffect(() => {
        axios.get(API_URL+'applications')
        .then(response => {
            setApplications(response.data)
        })
        .catch(error => {
            console.error(error);
        });
    }, [applications]);

    useEffect(() => {



        if (emailRegex.test(email) === false || passwordRegex.test(password) === false) {
            setDisablelogin(true);
            setDisableSignup(true)

        } else {
            setDisablelogin(false);
            setDisableSignup(false)
        }

        if ((password === '' && touchedpassword) || (passwordRegex.test(password) === false && touchedpassword)) {
            setDisableerrorpassword(false)
        } else {
            setDisableerrorpassword(true)
        }

        if (lastname === '' || firstname === '' || address === '' || cin === '' || phone === '') {
            setDisableSignup(true)

        } else {
            setDisableSignup(false)
        }

        if (emailRegex.test(email) === false && touchedemail) {
            setDisableerroremail(false);

        } else {
            setDisableerroremail(true);
        }

        if (lastname === '' && touchedlastname) {
            setDisableerrorlastname(false)
        } else {
            setDisableerrorlastname(true)
        }

        if (firstname === '' && touchedfirstname) {
            setDisableerrorfirstname(false)
        } else {
            setDisableerrorfirstname(true)
        }

        if (address === '' && touchedaddress) {
            setDisableerroraddress(false)
        } else {
            setDisableerroraddress(true)
        }

        if (cin === '' && touchedcin) {
            setDisableerrorcin(false)
        } else {
            setDisableerrorcin(true)
        }

        if (phone === '' && touchedphone) {
            setDisableerrorphone(false)
        } else {
            setDisableerrorphone(true)
        }

        if (confirmpassword !== password && touchedconfirmpassword) {
            setDisableerrorconfirmpassword(false)
        } else {
            setDisableerrorconfirmpassword(true)
        }
    });

    const [captcha, setcaptcha] = useState(true)

    function onChange(value) {
        setcaptcha(false)
    }

    return (
        <div className="container cont" id="container">
            <Modal onClose={() => setIsOpen(false)} open={IsOpen} application={application}>Hello</Modal>
            <div className="form-container sign-up-container">
                <form>
                    <h1>Sign up With</h1>
                    <div className="social-container">
                        {
                            applications.map((data, index) => {
                                return (
                                    <a onClick={() => { setApplication(data); setIsOpen(true) }} href="#" className="social"><i className="fab fa-facebook-f"></i>{data.name}</a>
                                )
                            })
                        }

                    </div>
                    <h1>Sign up</h1>
                    <input type="email" name="email" className="form-control" placeholder="Enter email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setTouchedemail(true); }}
                    />
                    <span className="left-side" hidden={disableerroremail}>enter a valid address</span>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <input type="text" name="lastname" className="form-control" placeholder="Lastname"
                                value={lastname}
                                onChange={(e) => { setLastname(e.target.value); setTouchedlastname(true) }}
                            />
                             <span className="left-side" hidden={disableerrorlastname}>enter a lastname</span>
                        </div>
                       

                        <div className="form-group col-md-6">
                            <input type="text" name="firstname" className="form-control" placeholder="Firstname"
                                value={firstname}
                                onChange={(e) => { setFirstname(e.target.value); setTouchedfirstname(true) }}
                            />
                            <span className="left-side" hidden={disableerrorfirstname}>enter a firstname</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <input type="password" name="password" className="form-control" placeholder="Password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setTouchedpassword(true) }}
                            />
                            <span className="left-side" hidden={disableerrorpassword}>Password does not meet the requirements</span>
                        </div>

                        <div className="form-group col-md-6">
                            <input type="confirmpassword" name="confirmpassword" className="form-control" placeholder="Confirm password"
                                value={confirmpassword}
                                onChange={(e) => { setConfirmpassword(e.target.value); setTouchedconfirmpassword(true) }}
                            />
                            <span className="left-side" hidden={disableerrorconfirmpassword}>password doesn't match </span>
                        </div>
                    </div>

                    <input type="text" name="address" className="form-control" placeholder="Address"
                        value={address}
                        onChange={(e) => { setAddress(e.target.value); setTouchedaddress(true) }}
                    />
                    <span className="left-side" hidden={disableerroraddress}>enter an address</span>

                    <div className="row">
                        <div className="form-group col-md-6">
                            <input type="number" name="cin" className="form-control" placeholder="CIN"
                                value={cin}
                                onChange={(e) => { setCin(e.target.value); setTouchedcin(true) }}
                            />
                            <span className="left-side" hidden={disableerrorcin}>enter a cin</span>
                        </div>

                        <div className="form-group col-md-6">
                            <input type="number" name="phone" className="form-control" placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => { setPhone(e.target.value); setTouchedphone(true) }}
                            />
                            <span className="left-side" hidden={disableerrorphone}>enter a phone number</span>
                        </div>
                    </div>
                    <div hidden={!loading} className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <button hidden={disablesignup} onClick={SignUp}>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form>
                    <h1>Sign in With</h1>
                    <div className="social-container">
                        {
                            applications.map((data, index) => {
                                return (
                                    <a onClick={() => { setApplication(data); setIsOpen(true) }} href="#" className="social"><i className="fab fa-facebook-f"></i>{data.name}</a>
                                )
                            })
                        }

                    </div>
                    <h1>Sign in</h1>
                    <div className="social-container"></div>

                    <input type="email" name="email" className="form-control" placeholder="Enter email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setTouchedemail(true); }}
                    />
                    <span className="left-side" hidden={disableerroremail}>enter a valid address</span>

                    <input type="password" name="password" className="form-control" placeholder="Enter password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setTouchedpassword(true); }}
                    />
                    <span className="left-side" hidden={disableerrorpassword}>enter a password</span>

                    <a href="/forgotpassword">Forgot your password?</a>

                    <ReCAPTCHA
                        sitekey="6LfZyCwhAAAAADxqFnNejf5L8Ro54zqn1U2fs9dl"
                        onChange={onChange}
                    />

                    <div hidden={!loading} className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <button disabled={captcha} hidden={disablelogin} onClick={LogIn}>Sign In</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <img src={logo} height="280px" />
                        <button className="ghost" id="signIn">Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <p>Enter your personal details and start journey with us</p>
                        <img src={logoo} height="280px" />
                        <button className="ghost" id="signUp">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SignIn
