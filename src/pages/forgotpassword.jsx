import React, { useEffect, useState } from 'react'
import './signin.css'
import axios from 'axios';
import logo from '../assets/images/f.png';
import logof from '../assets/images/ff.png';
import swal from 'sweetalert';
import {Routes, Route, useNavigate} from 'react-router-dom';
const ForgotPassword = () => {

    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [disableforgotpassword, setForgotpassword] = React.useState(false);
    const [disableerroremail, setDisableerroremail] = React.useState(true);
    const [touchedemail, setTouchedemail] = useState(false);
    const [loading,setLoading] = useState(false);

    const Send = event => {
        event.preventDefault()
        setLoading(true)
        axios.post('http://localhost:3000/users/forgotpassword/'+email)
        .then(response =>{navigate('/auth');setLoading(false);})
        .catch(error => {
            setLoading(false)
            if(error.response.data.statusCode === 401){
                swal("Unauthorized!", "Unauthorized!", "error");
            }else{
                swal("Check Your Email!", "Specified account does not exist!", "error");
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
        if(emailRegex.test(email) === false ){
            setForgotpassword(true);
        }else {
            setForgotpassword(false);
        }

        if(emailRegex.test(email) === false && touchedemail){
            setDisableerroremail(false);

        }else {
            setDisableerroremail(true);
        }

    });
    
    return (
        <div className="container cont" id="container">
            <div className="form-container sign-in-container">
                <form>
                    <h1>Forgot Password</h1>
                    <div className="social-container">
                    </div>
                    <span></span>
                    <input type="email" name="email" className="form-control"  placeholder="Enter email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value);setTouchedemail(true)}}
                    />
                    <span className="left-side" hidden={disableerroremail}>enter a valid address</span>

                    <a href="/auth">Already Have an Account? Sign in</a>
                    <div hidden={!loading} className="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <button hidden={disableforgotpassword}  onClick={Send}>Send</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <img src={logof}/>
                        <button className="ghost" id="signIn">Switch</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, Friend!</h1>
                        <img src={logo}/>
                        <button className="ghost" id="signUp">Switch</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ForgotPassword
