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
import { Select } from '@material-ui/core';
import { API_URL } from '../constants/apiUrl';
const AddUserModal = ({ open, children, onClose }) => {

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

    const [applications, setApplications] = useState([]);

    const [IsOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState([])
    const [previousaccounts, setPreviousaccounts] = useState(false);

    const [items, setItems] = useState([]);

    const [checked, setChecked] = useState(false);
    const toggleChecked = () => setChecked(value => !value);

    const [checkedd, setCheckedd] = useState(false);
    const toggleCheckedd = () => setCheckedd(value => !value);

    useEffect(() => {
        axios.get(API_URL+'applications')
            .then(response => {
                setApplications(response.data)
            })

    }, [applications])


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
            "locked": checked,
            "enabled": checkedd,
            "picture": "efef",
            "phone": Number(phone)
        });
        axios.post(API_URL+'users/signup', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const aff = JSON.stringify({
                    "users": response.data._id,
                    "applications": app_id,
                });
                axios.post(API_URL+'affectation', aff, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        onClose(); setLoading(false); swal({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 2500
                        })
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

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.get(API_URL+'applications')
            .then(response => { setTableData(response.data); })
            .catch(error => {
                console.error(error)
            });
    }, [tableData])


    const [disablesignin, setDisablesignin] = useState(false);
    const [disablessignup, setDisablessignup] = useState(true);
    const [app_id, setAppid] = useState("");


    if (!open) { return null }
    return (
        <div style={OVERLAY_STYLES}>
            <div style={MODAL_STYLES}>
                <form>
                    <h1>Add User</h1>
                    <input type="email" name="email" className="form-control" placeholder="Enter email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setTouchedemail(true); }}
                    />
                    <span className="left-side" hidden={disableerroremail}>enter a valid email</span>

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

                    <div className="row">
                        <div className="form-group col-md-6">

                            <div className="row">
                                <div className="form-group col-md-6">


                                    <span>Locked : </span>
                                </div>
                                <div className="form-group col-md-6">


                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={toggleChecked}
                                    />
                                </div>
                            </div>



                        </div>

                        <div className="form-group col-md-6">

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <span>Enabled : </span>
                                </div>
                                <div className="form-group col-md-6">
                                    <input
                                        type="checkbox"
                                        checked={checkedd}
                                        onChange={toggleCheckedd}
                                    />
                                </div>
                            </div>



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




                    <select
                        className="select-box"

                        onChange={(e) => { setAppid(e.target.value); }}
                    >
                        <option defaultValue>Choose App</option>
                        {tableData.map((item, index) => (
                            <option key={index} value={item._id}>
                                {item.url}
                            </option>
                        ))}
                    </select>




                    <div hidden={!loading} className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <button onClick={SignUp}>Add</button>
                </form>
            </div>

        </div>

    )
}
export default AddUserModal
