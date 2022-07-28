import React, { useEffect, useState } from 'react'
import './signin.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/r.png';
import logor from '../assets/images/rr.png';
import swal from 'sweetalert';
import {Routes, Route, useNavigate} from 'react-router-dom';
const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const [disableresetpassword, setResetpassword] = React.useState(false);
    const [disableerrorpassword, setDisableerrorpassword] = React.useState(true);
    const [disableerrorconfirmpassword, setDisableerrorconfirmpassword] = React.useState(true);
    const [touchedpassword, setTouchedpassword] = useState(false);
    const [loading,setLoading] = useState(false);

    

    const params = useParams()

    const Send = event => {
        event.preventDefault();
        setLoading(true)
        const pass = JSON.stringify({
            "password" : password
        });
        axios.post('http://localhost:3000/users/resetpassword/'+params.email+'/'+params.token,pass, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => {setLoading(false);swal({
            position: 'top-end',
            icon: 'success',
            title: 'You Con Login With Your New Password',
            showConfirmButton: false,
            timer: 2500
          })})
        .catch(error => {
            setLoading(false)
            console.log(error)
            swal("Try Again!", "Unknown error has occurred!", "error");
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

    const passwordRegex = RegExp(
        /^[A-Za-z0-9]*$/
    );


    useEffect(() => {    
        if((password === '' || passwordRegex.test(password) === false) && touchedpassword){
            setResetpassword(true);
            setDisableerrorpassword(false)
        }else{
            setResetpassword(false);
            setDisableerrorpassword(true)
        }

        if(confirmpassword !== password){
            setResetpassword(true);
            setDisableerrorconfirmpassword(false)
        }else{
            setDisableerrorconfirmpassword(true)
        }
    });
    
    return (
        <div className="container cont" id="container">

            <div className="form-container sign-in-container">
                <form>
                    <h1>Reset Password</h1>
                    <div className="social-container">
                    </div>
                    <span></span>
                    <input type="password" name="password" className="form-control" placeholder="Password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value);setTouchedpassword(true)}}
                    />
                    <span className="left-side" hidden={disableerrorpassword}>Password does not meet the requirements</span>

                    <input type="password" name="confirmpassword" className="form-control" placeholder="Confirm password"
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <span className="left-side" hidden={disableerrorconfirmpassword}>Password Doesn't Match</span>

                    <div hidden={!loading} className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <button hidden={disableresetpassword} onClick={Send}>Send</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Did You Forget Your Password?</h1>
                        <img src={logo}/>
                        <button className="ghost" id="signIn">Switch</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <img src={logor}/>
                        <button className="ghost" id="signUp">Switch</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ResetPassword
