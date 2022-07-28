import React, { useEffect, useState } from 'react'
import './modal.scss'
import logo from '../assets/images/signupp.png';
import logoo from '../assets/images/ab.png';
import axios from 'axios';
import swal from 'sweetalert';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionsCreators } from '../actions/index';
import SignIn from './Signin';
const Modal = ({ open, children, onClose, application }) => {

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );

    const passwordRegex = RegExp(
        /^[A-Za-z0-9]*$/
    );

    const navigate = useNavigate();

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
    const [users, setUsers] = useState([])
    const [previousaccounts, setPreviousaccounts] = useState(false);

    const [items, setItems] = useState([]);
    const [accounts, setAccounts] = useState([JSON.parse(localStorage.getItem('items'))][0]);

    const [pass, setPass] = useState(true); 





    useEffect(() => {
        if (accounts != null) {
            localStorage.setItem('items', JSON.stringify(accounts));
        }

    }, [accounts]);

    const LogIn = event => {
        event.preventDefault()
        setLoading(true)
        const log = JSON.stringify({
            "email": email,
            "application": application._id,
            "password": password
        });
        axios.post('http://localhost:3000/users/signin', log, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {


                setAccounts([...accounts, {
                    items: response.data,
                    app: application.name,
                }])
                setLoading(false);

                axios.post('http://localhost:3000/login', {
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
            })
            .catch(error => {
                setLoading(false)
                swal("Unauthorized!", "Try Again!", "error");

            });
    }

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
            "locked": true,
            "enabled": true,
            "picture": "efef",
            "phone": Number(phone)
        });
        axios.post('http://localhost:3000/users/signup', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const aff = JSON.stringify({
                    "users": response.data._id,
                    "applications": application._id,
                });
                axios.post('http://localhost:3000/affectation', aff, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        setLoading(false);
                        navigate('/');
                    })
                    .catch(error => {
                        setLoading(false)
                        swal("Try Again!", "Unknown error has occurred!", "error");

                    });
            })
            .catch(error => {
                setLoading(false)
                if (error.response.data.statusCode == 500) {
                    swal("USER EXISTSl!", "Try To Login or Confirm you account!", "error");
                } else {
                    swal("Try Again!", "Unknown error has occurred!", "error");
                }
            });
    }

    const MODAL_STYLES = {
        position: 'fixed',
        top: '-25%',
        left: '50%',
        transform: 'translate(-50%,+50%)',
        backgroundColor: '#FFF',
        width: '600px',
        maxWidth: '100%',
        height: '600px',
        maxHeight: '100%',
        zIndex: 1000,
        paddingTop: '100px'
    }

    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.7)',
        zIndex: 1000,
        overflow: 'auto',

    }

    useEffect(() => {

        axios.get('http://localhost:3000/applications')
            .then(response => {
                setApplications(response.data)
            })

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

    useEffect(() => {

        if (accounts != undefined) {
            accounts.map((data, index) => {
                if (application !== undefined) {
                    if (data.app == application.name) {
                        setPreviousaccounts(true)
                    }
                } else {
                    return;
                }
            })
        }
    }, [application])

    const [disablesignin, setDisablesignin] = useState(false);
    const [disablessignup, setDisablessignup] = useState(true);


    if (!open) { return null }

    const changeSignin = () => {
        setDisablesignin(true);
        setDisablessignup(false);

    };

    const changeSignup = () => {
        setDisablessignup(true);
        setDisablesignin(false);
        setPreviousaccounts(false)
    };


   


    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>

                <input type="password" name="password" className="form-control" placeholder="Password"
                    value={password}
                    hidden={pass}
                    onChange={(e) => { setPassword(e.target.value); setTouchedpassword(true) }}
                />

                {previousaccounts ?
                    accounts.map((data, index) => {
                        if (application !== undefined) {
                            if (data.app == application.name) {
                                return (<a onClick={() => { setPass(!pass);setEmail(data.items.email) }}>
                                    <main class="leaderboard__profiles">
                                        <article class="leaderboard__profile">

                                            <span class="leaderboard__name">{data.items.email}</span>
                                            <a onClick={LogIn}><span class="leaderboard__value">{35.7}<span>B</span></span></a>
                                        </article>

                                    </main></a>
                                )
                            }
                        } else {
                            return;
                        }
                    })
                    :
                    <div>
                        <div hidden={disablesignin}>


                            <form>
                                <h1>Sign in</h1>With {application.name}
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


                                <div hidden={!loading} className="loader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <a onClick={changeSignin}>Create Account?</a>
                                <button hidden={disablelogin} onClick={LogIn}>Sign In</button>
                            </form>

                        </div>
                        <div hidden={disablessignup}>
                            <form>
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
                                <a onClick={changeSignup}>Login With Your Account?</a>
                                <button onClick={SignUp}>Sign Up</button>
                            </form>
                        </div>
                    </div>}
                <a hidden={!previousaccounts} onClick={changeSignup}>Login With Another Account?</a>
            </div>

        </div>
    )
}
export default Modal
