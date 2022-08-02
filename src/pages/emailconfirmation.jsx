import React, { useEffect, useState } from 'react'
import './signin.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import logoo from '../assets/images/conf.png';
import { API_URL } from '../constants/apiUrl';
const EmailConfirmation = () => {

    const params = useParams()

    useEffect(() => {
        axios.post(API_URL+'users/confirmaccount/'+params.email+'/'+params.token)
        .then(response => console.log(response))
        .catch(error => {
            console.error(error);
        });
    }, []);
    
    return (
        <div className="container cont" id="container">
            <img src={logoo} />
        </div>
    )
}

export default EmailConfirmation
